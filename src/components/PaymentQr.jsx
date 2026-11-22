import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { Download, Share2, ImageDown } from 'lucide-react';
import { buildVietQR } from '../lib/vietqr';
import { fmt } from '../lib/pricing';
import { CONTACT } from '../config';
import { useToast } from '../lib/ui';

const W = 900;

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

async function loadLogo() {
  return new Promise((res) => {
    const img = new Image();
    img.onload = () => res(img);
    img.onerror = () => res(null);
    img.src = '/logo.png';
  });
}

function wrapLines(ctx, text, maxW, maxLines = 3) {
  const words = String(text).split(' ');
  const lines = [];
  let cur = '';
  for (const w of words) {
    const t = cur ? `${cur} ${w}` : w;
    if (ctx.measureText(t).width > maxW && cur) {
      lines.push(cur);
      cur = w;
    } else cur = t;
  }
  if (cur) lines.push(cur);
  if (lines.length > maxLines) {
    lines.length = maxLines;
    lines[maxLines - 1] = lines[maxLines - 1].replace(/.{2}$/, '') + '…';
  }
  return lines;
}

/**
 * Vẽ "bill" gửi phụ huynh: mã QR, khóa học, học phí, ưu đãi, thông tin chuyển khoản và cuối cùng là số tiền.
 * Chân ảnh ghi tên và số điện thoại của Sales đang tư vấn.
 */
async function drawCard(canvas, { acct, amount, note, course, gross, discount, fee, salesLabel, salesPhone }) {
  const payload = buildVietQR({ bankBin: acct.bankBin, account: acct.number, amount, note });
  const qr = await QRCode.toCanvas(document.createElement('canvas'), payload, {
    errorCorrectionLevel: 'M',
    margin: 1,
    width: 560,
    color: { dark: '#111111', light: '#ffffff' },
  });
  try { await document.fonts.load('800 44px Montserrat'); await document.fonts.load('600 30px Inter'); } catch { /* dùng font dự phòng */ }
  const logo = await loadLogo();

  // Đo trước để biết chiều cao ảnh
  const measure = document.createElement('canvas').getContext('2d');
  measure.font = '700 28px Inter, sans-serif';
  const LABEL_X = 60;
  const VALUE_RIGHT = W - 60;
  const VALUE_W = 520;

  const billRows = [
    ...(course ? [['Khóa học', course]] : []),
    ...(gross > 0 ? [['Học phí', fmt(gross)]] : []),
    ...(discount > 0 ? [['Ưu đãi', `-${fmt(discount)}`, 'green']] : []),
    ...(fee > 0 ? [['Phí trả góp', `+${fmt(fee)}`]] : []),
  ];
  const bankRows = [
    ['Ngân hàng', acct.bankName],
    ['Số tài khoản', acct.number],
    ['Chủ tài khoản', acct.holder],
    ['Nội dung', note || '—'],
  ];
  const layout = (rows) => rows.map((r) => ({ r, lines: wrapLines(measure, r[1], VALUE_W) }));
  const bill = layout(billRows);
  const bank = layout(bankRows);
  const rowH = (n) => n * 36 + 14;
  const billH = bill.reduce((a, x) => a + rowH(x.lines.length), 0);
  const bankH = bank.reduce((a, x) => a + rowH(x.lines.length), 0);
  const top = 985;
  const H = top + billH + (billH ? 30 : 0) + bankH + 60 + 130;

  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#f9f4ec';
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#fbc278';
  ctx.beginPath(); ctx.arc(W - 40, 40, 150, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#eb7c16';
  ctx.beginPath(); ctx.arc(W - 20, 10, 90, 0, Math.PI * 2); ctx.fill();

  if (logo) {
    const lh = 80;
    ctx.drawImage(logo, 60, 50, (logo.width / logo.height) * lh, lh);
  }
  ctx.textAlign = 'left';
  ctx.fillStyle = '#6b4226';
  ctx.font = '800 46px Montserrat, Inter, sans-serif';
  ctx.fillText('Thông tin thanh toán', 60, 210);
  ctx.font = '500 28px Inter, sans-serif';
  ctx.fillStyle = '#8b5a36';
  ctx.fillText('Học phí GMA Việt Nam', 60, 255);

  roundRect(ctx, 130, 290, 640, 640, 32);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#eb7c16';
  ctx.stroke();
  ctx.drawImage(qr, 170, 330, 560, 560);

  let y = top;
  const drawRows = (rows) => {
    rows.forEach(({ r, lines }) => {
      ctx.textAlign = 'left';
      ctx.font = '500 26px Inter, sans-serif';
      ctx.fillStyle = '#8b5a36';
      ctx.fillText(r[0], LABEL_X, y);
      ctx.textAlign = 'right';
      ctx.font = '700 28px Inter, sans-serif';
      ctx.fillStyle = r[2] === 'green' ? '#12a150' : '#6b4226';
      lines.forEach((ln, i) => ctx.fillText(ln, VALUE_RIGHT, y + i * 36));
      y += rowH(lines.length);
    });
  };
  drawRows(bill);
  if (billH) {
    y += 2;
    ctx.strokeStyle = '#e6d9c4';
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 8]);
    ctx.beginPath(); ctx.moveTo(60, y - 18); ctx.lineTo(W - 60, y - 18); ctx.stroke();
    ctx.setLineDash([]);
    y += 12;
  }
  drawRows(bank);

  // Số tiền nằm cuối bill
  y += 20;
  roundRect(ctx, 50, y - 40, W - 100, 90, 22);
  ctx.fillStyle = '#fdebd3';
  ctx.fill();
  ctx.textAlign = 'left';
  ctx.font = '600 28px Inter, sans-serif';
  ctx.fillStyle = '#6b4226';
  ctx.fillText('Số tiền', 80, y + 17);
  ctx.textAlign = 'right';
  ctx.font = '800 48px Montserrat, Inter, sans-serif';
  ctx.fillStyle = '#b85a07';
  ctx.fillText(amount > 0 ? fmt(amount) : '—', W - 80, y + 20);

  // Chân ảnh: tên và số điện thoại Sales
  const who = salesLabel || 'GMA Việt Nam';
  const phone = salesPhone || CONTACT.hotline;
  ctx.textAlign = 'center';
  ctx.font = '500 24px Inter, sans-serif';
  ctx.fillStyle = '#8b5a36';
  ctx.fillText('Quét mã bằng app ngân hàng để thanh toán', W / 2, H - 82);
  let size = 30;
  const supportText = `Hỗ trợ: ${who} · ${phone}`;
  ctx.font = `700 ${size}px Inter, sans-serif`;
  while (ctx.measureText(supportText).width > W - 100 && size > 18) {
    size -= 1;
    ctx.font = `700 ${size}px Inter, sans-serif`;
  }
  ctx.fillStyle = '#6b4226';
  ctx.fillText(supportText, W / 2, H - 38);
  canvas.style.aspectRatio = `${W} / ${H}`;
}

const toBlob = (canvas) => new Promise((res) => canvas.toBlob(res, 'image/png'));

export default function PaymentQr({ acct, amount, note, course, gross = 0, discount = 0, fee = 0, salesLabel = '', salesPhone = '', fileLabel = 'thanh-toan-gma' }) {
  const ref = useRef(null);
  const toast = useToast();
  const [err, setErr] = useState(false);

  useEffect(() => {
    let live = true;
    drawCard(ref.current, { acct, amount, note, course, gross, discount, fee, salesLabel, salesPhone })
      .then(() => live && setErr(false))
      .catch(() => live && setErr(true));
    return () => { live = false; };
  }, [acct, amount, note, course, gross, discount, fee, salesLabel, salesPhone]);

  const filename = `${fileLabel}-${amount || 'qr'}.png`;

  const save = async () => {
    const blob = await toBlob(ref.current);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    toast('Đã lưu ảnh mã chuyển khoản');
  };
  const copyImg = async () => {
    try {
      const blob = await toBlob(ref.current);
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      toast('Đã copy ảnh, dán vào Zalo');
    } catch {
      toast('Trình duyệt chưa cho copy ảnh, hãy dùng nút Lưu ảnh');
    }
  };
  const share = async () => {
    const blob = await toBlob(ref.current);
    const file = new File([blob], filename, { type: 'image/png' });
    if (navigator.canShare?.({ files: [file] })) {
      try { await navigator.share({ files: [file], title: 'Thông tin thanh toán GMA' }); } catch { /* người dùng đóng */ }
    } else {
      toast('Máy này chưa hỗ trợ chia sẻ trực tiếp, hãy bấm Lưu ảnh');
    }
  };

  return (
    <div>
      <canvas ref={ref} className="w-full rounded-xl border border-kem-deep bg-kem" aria-label="Bill thanh toán có mã QR" />
      {err && <p className="text-sm text-bad mt-2">Không tạo được mã QR, thử lại sau.</p>}
      <div className="grid grid-cols-2 gap-2 mt-3">
        <button className="btn-primary h-12 col-span-2" onClick={save}><Download className="w-4 h-4" /> Lưu ảnh mã chuyển khoản</button>
        <button className="btn-ghost h-12" onClick={copyImg}><ImageDown className="w-4 h-4" /> Copy ảnh</button>
        <button className="btn-ghost h-12" onClick={share}><Share2 className="w-4 h-4" /> Chia sẻ</button>
      </div>
    </div>
  );
}
