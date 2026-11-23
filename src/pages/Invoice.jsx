import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import QRCode from 'qrcode';
import { Download, Share2, ImageDown, ExternalLink, ArrowLeft } from 'lucide-react';
import { PageHeader, Chip, useToast } from '../lib/ui';
import { BANK_ACCOUNTS, INVOICE } from '../config';
import { fmtNum, todayVN, maskDate, isValidDate } from '../lib/format';
import { stripVi } from '../lib/vietqr';

// Hóa đơn tải lên trang kích hoạt tài khoản MemoSchool. Toạ độ vẽ theo mẫu hóa đơn gốc, nhân đôi cho nét.
const W = 960;
const H = 1360;
const ORANGE = '#e8743a';
const YELLOW = '#f2bc3b';
const digits = (s) => parseInt(String(s).replace(/\D/g, ''), 10) || 0;

const readQuote = () => {
  try { return JSON.parse(localStorage.getItem('last_quote') || 'null'); } catch { return null; }
};

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function wrap(ctx, text, maxW, maxLines = 3) {
  const words = String(text).split(/\s+/).filter(Boolean);
  const lines = [];
  let cur = '';
  for (const w of words) {
    const t = cur ? `${cur} ${w}` : w;
    if (ctx.measureText(t).width > maxW && cur) { lines.push(cur); cur = w; } else cur = t;
  }
  if (cur) lines.push(cur);
  if (lines.length > maxLines) {
    lines.length = maxLines;
    lines[maxLines - 1] = lines[maxLines - 1].replace(/.{1,2}$/, '') + '…';
  }
  return lines;
}

const loadImg = (src) => new Promise((res) => {
  const img = new Image();
  img.onload = () => res(img);
  img.onerror = () => res(null);
  img.src = src;
});

async function drawInvoice(canvas, d) {
  try { await Promise.all([document.fonts.load('800 60px Montserrat'), document.fonts.load('700 30px Inter'), document.fonts.load('500 20px Inter')]); } catch { /* dùng font dự phòng */ }
  const [logo, qr] = await Promise.all([
    loadImg('/logo.png'),
    QRCode.toCanvas(document.createElement('canvas'), INVOICE.siteUrl, { errorCorrectionLevel: 'M', margin: 1, width: 280, color: { dark: '#111111', light: '#ffffff' } }),
  ]);
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  const F = (w, s) => `${w} ${s}px Inter, sans-serif`;
  const FH = (w, s) => `${w} ${s}px Montserrat, Inter, sans-serif`;

  // Nền cam và vàng
  ctx.fillStyle = YELLOW; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = ORANGE;
  ctx.beginPath();
  ctx.moveTo(0, 0); ctx.lineTo(560, 0);
  ctx.bezierCurveTo(520, 220, 330, 260, 150, 430);
  ctx.bezierCurveTo(60, 520, 0, 640, 0, 760);
  ctx.closePath(); ctx.fill();
  ctx.beginPath();
  ctx.moveTo(0, 1320); ctx.bezierCurveTo(260, 1270, 560, 1390, 960, 1300); ctx.lineTo(960, H); ctx.lineTo(0, H); ctx.closePath(); ctx.fill();

  // Đầu trang: logo, tiêu đề, mã QR website
  if (logo) { const lh = 150; ctx.drawImage(logo, 26, 22, (logo.width / logo.height) * lh, lh); }
  ctx.fillStyle = '#ffffff'; ctx.textAlign = 'center';
  ctx.font = FH(800, 76); ctx.fillText('Hóa đơn', 420, 118);
  roundRect(ctx, 730, 14, 156, 156, 10); ctx.fillStyle = '#ffffff'; ctx.fill();
  ctx.drawImage(qr, 738, 22, 140, 140);
  ctx.fillStyle = '#222222'; ctx.font = FH(600, 22); ctx.fillText(INVOICE.siteText, 808, 198);

  // Thẻ trắng
  roundRect(ctx, 72, 200, 816, 1110, 44); ctx.fillStyle = '#ffffff'; ctx.fill();
  ctx.beginPath(); ctx.arc(352, 214, 13, 0, Math.PI * 2); ctx.fillStyle = ORANGE; ctx.fill();
  ctx.beginPath(); ctx.arc(414, 214, 13, 0, Math.PI * 2); ctx.fillStyle = YELLOW; ctx.fill();

  // Tên khách hàng: tối đa 2 dòng, tự thu nhỏ chữ nếu dài
  ctx.textAlign = 'left'; ctx.fillStyle = '#111111';
  let ns = 50, nameLines = [];
  for (; ns >= 30; ns -= 2) {
    ctx.font = FH(800, ns);
    nameLines = wrap(ctx, d.name || 'Tên khách hàng', 400, 9);
    if (nameLines.length <= 2) break;
  }
  ctx.font = FH(800, ns);
  nameLines = wrap(ctx, d.name || 'Tên khách hàng', 400, 2);
  nameLines.forEach((ln, i) => ctx.fillText(ln, 130, 268 + i * (ns + 8)));

  ctx.font = F(500, 21); ctx.fillStyle = '#222222';
  ctx.fillText(`HOÁ ĐƠN #${d.no || ''}`, 558, 292);
  ctx.fillText(d.date || '', 558, 324);

  ctx.strokeStyle = '#ffd98a'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(124, 376); ctx.lineTo(830, 376); ctx.stroke();

  // Logo memoSCHOOL và memohack (vẽ bằng chữ)
  ctx.lineJoin = 'round'; ctx.lineWidth = 8; ctx.strokeStyle = '#161616';
  ctx.font = `italic 900 36px Montserrat, Inter, sans-serif`;
  ctx.fillStyle = '#ffd23f'; ctx.strokeText('#memoSCHOOL', 130, 430); ctx.fillText('#memoSCHOOL', 130, 430);
  ctx.fillStyle = '#b13cf2'; ctx.strokeText('#memohack', 130, 482); ctx.fillText('#memohack', 130, 482);

  // Điện thoại, địa chỉ khách
  ctx.font = F(500, 18); ctx.fillStyle = '#333333';
  ctx.fillText('Điện thoại khách hàng:', 464, 424);
  ctx.fillText(d.phone || '', 668, 424);
  ctx.fillText('Địa chỉ khách hàng:', 464, 452);
  wrap(ctx, d.address || '', 160, 2).forEach((ln, i) => ctx.fillText(ln, 668, 452 + i * 24));

  // Bảng
  const L = 124, R = 830, T = 510, HB = 600, B = 850;
  const cols = [350, 486, 684];
  ctx.strokeStyle = '#ffd98a'; ctx.lineWidth = 2;
  ctx.strokeRect(L, T, R - L, B - T);
  ctx.beginPath();
  ctx.moveTo(L, HB); ctx.lineTo(R, HB);
  cols.forEach((x) => { ctx.moveTo(x, T); ctx.lineTo(x, B); });
  ctx.stroke();

  // Hình mờ giữa hóa đơn
  if (logo) { ctx.globalAlpha = 0.09; ctx.drawImage(logo, 250, 560, 460, (logo.height / logo.width) * 460); ctx.globalAlpha = 1; }
  ctx.textAlign = 'left';

  ctx.fillStyle = '#111111'; ctx.font = F(700, 22);
  ctx.fillText('Mục', 134, 556); ctx.fillText('Số lượng', 364, 556); ctx.fillText('Đơn giá', 500, 556); ctx.fillText('Thành tiền', 704, 556);
  ctx.font = F(500, 20);
  wrap(ctx, d.item || '', 200, 4).forEach((ln, i) => ctx.fillText(ln, 134, 650 + i * 28));
  ctx.fillText(String(d.qty), 364, 650);
  ctx.fillText(`${fmtNum(d.price)}đ`, 500, 650);
  ctx.fillText(`${fmtNum(d.subtotal)}đ`, 704, 650);

  // Tổng tiền
  ctx.font = F(500, 20); ctx.fillStyle = '#222222';
  ctx.fillText('Tổng tiền đơn hàng:', 130, 884);
  ctx.fillText(`Thuế (${d.taxPct}%):`, 130, 912);
  ctx.textAlign = 'right';
  ctx.fillText(fmtNum(d.subtotal), 830, 896);
  if (d.tax > 0) ctx.fillText(fmtNum(d.tax), 830, 924);
  ctx.textAlign = 'left';
  ctx.fillStyle = ORANGE; ctx.font = FH(800, 27);
  ctx.fillText('TỔNG TIỀN THANH TOÁN:', 130, 978);
  ctx.textAlign = 'right'; ctx.fillText(fmtNum(d.total), 830, 976);
  ctx.textAlign = 'left'; ctx.fillText('XÁC NHẬN THANH TOÁN:', 130, 1044);
  ctx.textAlign = 'right'; ctx.fillText('ĐÃ THANH TOÁN', 830, 1042);
  ctx.textAlign = 'left';

  ctx.strokeStyle = '#ffd98a'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(124, 1086); ctx.lineTo(830, 1086); ctx.stroke();

  // Thông tin liên hệ và thanh toán
  ctx.fillStyle = '#111111';
  ctx.font = F(700, 22); ctx.fillText('THÔNG TIN LIÊN HỆ:', 130, 1124); ctx.fillText('THÔNG TIN THANH TOÁN:', 524, 1124);
  ctx.font = F(500, 18);
  const bullets = (items, x, y, maxW) => {
    let yy = y;
    items.forEach((t) => {
      const lines = wrap(ctx, t, maxW, 3);
      ctx.fillText('•', x, yy);
      lines.forEach((ln, i) => { ctx.fillText(ln, x + 24, yy + i * 23); });
      yy += lines.length * 23 + 6;
    });
  };
  bullets([INVOICE.email, INVOICE.address, INVOICE.phone], 138, 1158, 350);
  bullets([`Số tài khoản: ${d.acct.number}`, `Chủ tài khoản: ${stripVi(d.acct.holder).toUpperCase()}`, `Ngân hàng ${d.acct.shortName}`], 532, 1158, 292);
}

const toBlob = (canvas) => new Promise((res) => canvas.toBlob(res, 'image/png'));
const LAST_KEY = 'invoice_no';
const readLast = () => {
  try { const n = parseInt(localStorage.getItem(LAST_KEY) || '', 10); if (Number.isFinite(n)) return Math.max(n, INVOICE.firstNo - 1); } catch { /* bỏ qua */ }
  return INVOICE.firstNo - 1;
};

export default function Invoice() {
  const toast = useToast();
  const ref = useRef(null);
  const quote = useMemo(readQuote, []);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState(todayVN());
  const [productId, setProductId] = useState(quote?.ids?.includes('hyperhack') && !quote?.ids?.includes('memohack') ? 'hyperhack' : 'memohack');
  const [qty, setQty] = useState('1');
  const [last, setLast] = useState(readLast);
  const [issuedNo, setIssuedNo] = useState(null); // số đã dùng cho hóa đơn đang soạn, giữ nguyên khi lưu/copy/chia sẻ nhiều lần
  const [err, setErr] = useState(false);

  const product = INVOICE.products.find((p) => p.id === productId);
  const acct = BANK_ACCOUNTS[INVOICE.account];
  const no = issuedNo ?? last + 1;
  const qtyN = Math.max(1, digits(qty));
  const priceN = product.price;
  const subtotal = qtyN * priceN;
  const tax = Math.round((subtotal * INVOICE.taxPct) / 100);
  const total = subtotal + tax;

  // Sửa thông tin khách hoặc sản phẩm sau khi đã xuất ảnh nghĩa là bắt đầu hóa đơn mới, số tiếp theo
  useEffect(() => { setIssuedNo(null); }, [name, phone, address, productId, qty, date]);

  useEffect(() => {
    let live = true;
    drawInvoice(ref.current, { name: name.trim(), phone, address: address.trim(), no: String(no), date, item: product.name, qty: qtyN, price: priceN, subtotal, taxPct: String(INVOICE.taxPct), tax, total, acct })
      .then(() => live && setErr(false))
      .catch(() => live && setErr(true));
    return () => { live = false; };
  }, [name, phone, address, no, date, product, qtyN, priceN, subtotal, tax, total, acct]);

  const missing = [!name.trim() && 'tên khách hàng', !phone.trim() && 'số điện thoại', !isValidDate(date) && 'ngày hợp lệ'].filter(Boolean);
  const filename = `hoa-don-${stripVi(name.trim() || 'gma').toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${no}.png`;

  // Hóa đơn xuất ra lần đầu thì ghi nhận số, hóa đơn sau tự dùng số tiếp theo
  const markIssued = () => {
    if (issuedNo !== null) return;
    setIssuedNo(no);
    setLast(no);
    try { localStorage.setItem(LAST_KEY, String(no)); } catch { /* bỏ qua */ }
  };

  const save = async () => {
    const blob = await toBlob(ref.current);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    markIssued();
    toast(`Đã lưu hóa đơn số ${no}, tải lên trang kích hoạt`);
  };
  const copyImg = async () => {
    try {
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': await toBlob(ref.current) })]);
      markIssued();
      toast(`Đã copy hóa đơn số ${no}`);
    } catch { toast('Trình duyệt chưa cho copy ảnh, hãy dùng nút Lưu ảnh'); }
  };
  const share = async () => {
    const file = new File([await toBlob(ref.current)], filename, { type: 'image/png' });
    if (navigator.canShare?.({ files: [file] })) {
      try { await navigator.share({ files: [file], title: 'Hóa đơn GMA' }); markIssued(); } catch { /* người dùng đóng */ }
    } else toast('Máy này chưa hỗ trợ chia sẻ trực tiếp, hãy bấm Lưu ảnh');
  };

  const field = 'field mt-1';
  const lbl = 'text-sm font-semibold';
  return (
    <div>
      <Link to="/kho?s=ban-giao" className="inline-flex items-center gap-1.5 h-10 text-sm font-semibold text-cam-dark -mt-1 mb-1"><ArrowLeft className="w-4 h-4" /> Về bước bàn giao</Link>
      <PageHeader title="Hóa đơn kích hoạt tài khoản" sub="Chọn khóa, điền thông tin khách, tải ảnh hóa đơn rồi tải lên trang kích hoạt MemoSchool." />

      <div className="xl:grid xl:grid-cols-[1fr_440px] xl:gap-6 xl:items-start">
        <div className="space-y-4 min-w-0">
          <section className="rounded-2xl bg-white border border-kem-deep shadow-card p-4 space-y-3">
            <h2 className="font-heading font-bold">Khóa học</h2>
            <div className="flex flex-wrap gap-2">
              {INVOICE.products.map((p) => (
                <Chip key={p.id} active={productId === p.id} onClick={() => setProductId(p.id)}>{p.label}</Chip>
              ))}
            </div>
            <p className="text-sm text-nau">Đơn giá cố định: <b className="text-cam-dark">{fmtNum(product.price)}đ</b></p>
          </section>

          <section className="rounded-2xl bg-white border border-kem-deep shadow-card p-4 space-y-3">
            <h2 className="font-heading font-bold">Thông tin khách hàng</h2>
            <label className="block"><span className={lbl}>Tên khách hàng (học viên hoặc phụ huynh)</span>
              <input className={field} value={name} onChange={(e) => setName(e.target.value)} placeholder="Ví dụ: Mạc Duy Hoàng Phúc" autoComplete="off" /></label>
            <div className="grid sm:grid-cols-2 gap-3">
              <label className="block"><span className={lbl}>Số điện thoại khách hàng</span>
                <input className={field} inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value.replace(/[^0-9+ .]/g, ''))} placeholder="0943394134" autoComplete="off" /></label>
              <label className="block"><span className={lbl}>Địa chỉ khách hàng</span>
                <input className={field} value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Hà Nội" autoComplete="off" /></label>
            </div>
          </section>

          <section className="rounded-2xl bg-white border border-kem-deep shadow-card p-4 space-y-3">
            <h2 className="font-heading font-bold">Hóa đơn</h2>
            <div className="grid grid-cols-2 gap-3">
              <label className="block"><span className={lbl}>Ngày (ngày/tháng/năm)</span>
                <input className={field} inputMode="numeric" value={date} onChange={(e) => setDate(maskDate(e.target.value))} placeholder="25/10/2026" /></label>
              <label className="block"><span className={lbl}>Số lượng</span>
                <input className={field} inputMode="numeric" value={qty} onChange={(e) => setQty(e.target.value.replace(/\D/g, '').slice(0, 2))} /></label>
            </div>
            <p className="text-sm text-nau">Số hóa đơn: <b className="text-cam-dark">#{no}</b> (tự tăng sau mỗi hóa đơn). Tổng thanh toán: <b className="text-cam-dark">{fmtNum(total)}đ</b>. Thuế {INVOICE.taxPct}%. In tài khoản {acct.shortName} {acct.number}.</p>
            <p className="text-xs text-nau">Mua nhiều tài khoản thì tạo mỗi tài khoản một hóa đơn.</p>
          </section>
        </div>

        <aside className="mt-6 xl:mt-0 xl:sticky xl:top-6 min-w-0">
          <div className="rounded-2xl bg-white border border-kem-deep shadow-card p-4">
            <h2 className="font-heading font-bold mb-3">Xem trước</h2>
            <canvas ref={ref} style={{ aspectRatio: `${W} / ${H}` }} className="w-full rounded-xl border border-kem-deep bg-kem" aria-label="Hóa đơn kích hoạt tài khoản" />
            {err && <p className="text-sm text-bad mt-2">Không vẽ được hóa đơn, thử tải lại trang.</p>}
            {missing.length > 0 && <p className="mt-3 rounded-xl bg-cam-soft px-3 py-2 text-sm text-cam-dark">Còn thiếu: {missing.join(', ')}.</p>}
            <div className="grid grid-cols-2 gap-2 mt-3">
              <button className="btn-primary h-12 col-span-2" onClick={save}><Download className="w-4 h-4" /> Lưu ảnh hóa đơn</button>
              <button className="btn-ghost h-12" onClick={copyImg}><ImageDown className="w-4 h-4" /> Copy ảnh</button>
              <button className="btn-ghost h-12" onClick={share}><Share2 className="w-4 h-4" /> Chia sẻ</button>
              <a className="btn-cam h-12 col-span-2" href="https://memoschool.com/memoschool-vietnam/" target="_blank" rel="noopener noreferrer">
                Mở trang kích hoạt tài khoản <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
