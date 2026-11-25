import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { Lock, LogOut, Plus, Trash2, Printer, Wand2 } from 'lucide-react';
import { PageHeader, Chip, Card, useToast } from '../lib/ui';
import { fmtNum, maskDate, todayVN } from '../lib/format';
import { isUnlocked, lock, tryUnlock, waitSeconds, loadState, saveState, uid, PRODUCTS, blankSalesRow, salesCalc, mktCalc, adsRevenue, payTotal, periodLabel } from '../lib/manager';
import { PayDoc, SalesDoc, MktDoc } from '../components/ManageDocs';

const digits = (s) => parseInt(String(s).replace(/\D/g, ''), 10) || 0;
const money = (n) => (n ? fmtNum(n) : '');
const lbl = 'text-sm font-semibold';

function Gate({ onOk }) {
  const [code, setCode] = useState('');
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!code.trim()) return;
    setBusy(true);
    const r = await tryUnlock(code, false); // luôn hỏi mã mỗi lần vào, không nhớ máy
    setBusy(false);
    if (r === 'ok') return onOk();
    setCode('');
    setMsg(
      r === 'wait' ? `Nhập sai nhiều lần, chờ ${waitSeconds()} giây rồi thử lại.`
        : r === 'nocrypto' ? 'Trình duyệt này chưa hỗ trợ kiểm tra mã. Hãy mở bằng trang https hoặc dùng Chrome, Safari bản mới.'
          : 'Mã chưa đúng.',
    );
  };

  return (
    <div className="max-w-sm mx-auto mt-10">
      <Card className="p-6">
        <span className="h-12 w-12 rounded-xl bg-cam-soft text-cam-dark grid place-items-center"><Lock className="w-6 h-6" /></span>
        <h1 className="font-heading font-extrabold text-2xl mt-4">Khu Đại ca</h1>
        <p className="text-nau text-sm mt-1">Dành cho Đại ca, xin các em á</p>
        <form onSubmit={submit} className="mt-4 space-y-3">
          <input
            className="field text-lg tracking-widest font-bold uppercase" type="password" autoComplete="off" autoFocus
            value={code} onChange={(e) => { setCode(e.target.value); setMsg(''); }} placeholder="Mã quản lý" aria-label="Mã quản lý"
          />
          {msg && <p className="text-sm text-bad">{msg}</p>}
          <button className="btn-primary w-full h-12" disabled={busy}>{busy ? 'Đang kiểm tra...' : 'Mở khóa'}</button>
        </form>
      </Card>
    </div>
  );
}

function Money({ value, onChange, ...p }) {
  return <input className="field" inputMode="numeric" value={money(value)} onChange={(e) => onChange(digits(e.target.value))} {...p} />;
}

function Txt({ label, value, onChange, ...p }) {
  return (
    <label className="block">
      <span className={lbl}>{label}</span>
      <input className="field mt-1" value={value} onChange={(e) => onChange(e.target.value)} autoComplete="off" {...p} />
    </label>
  );
}

function PeriodInput({ period, onChange }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className={lbl}>Đối soát tháng</span>
      <input className="field !w-16 text-center" inputMode="numeric" value={period.m} onChange={(e) => onChange({ ...period, m: Math.min(12, digits(e.target.value)) || '' })} aria-label="Tháng" />
      <span>/</span>
      <input className="field !w-24 text-center" inputMode="numeric" value={period.y} onChange={(e) => onChange({ ...period, y: digits(e.target.value) || '' })} aria-label="Năm" />
    </div>
  );
}

const decimal =(s) => String(s).replace(',', '.').replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');

export default function Manage() {
  const toast = useToast();
  const [ok, setOk] = useState(isUnlocked);
  const [s, setS] = useState(loadState);
  const [tab, setTab] = useState('pay');

  useEffect(() => { if (ok) saveState(s); }, [s, ok]);

  const set = (k, patch) => setS((o) => ({ ...o, [k]: { ...o[k], ...patch } }));

  // Cần nút in nằm ngoài #root: tờ in là một bản riêng gắn vào body, CSS trong index.css ẩn phần còn lại khi in
  const [host, setHost] = useState(null);
  useEffect(() => {
    if (!ok) return undefined;
    const el = document.createElement('div');
    el.id = 'print-root';
    document.body.appendChild(el);
    setHost(el);
    return () => { el.remove(); setHost(null); };
  }, [ok]);

  const SC = useMemo(() => salesCalc(s.sales), [s.sales]);
  const MC = useMemo(() => mktCalc(s.mkt), [s.mkt]);

  if (!ok) return <Gate onOk={() => setOk(true)} />;

  const Doc = tab === 'pay' ? PayDoc : tab === 'sales' ? SalesDoc : MktDoc;
  const docName = tab === 'pay' ? 'giay-de-nghi-thanh-toan' : tab === 'sales' ? 'doi-soat-hoa-hong-pkd' : 'doi-soat-marketing';
  const print = () => {
    const old = document.title;
    document.title = `${docName}-${s.period.y}-${String(s.period.m).padStart(2, '0')}`; // tên file PDF gợi ý khi "Lưu thành PDF"
    window.print();
    setTimeout(() => { document.title = old; }, 500);
  };

  // ----- Giấy đề nghị thanh toán -----
  const { pay } = s;
  const setRow = (id, patch) => set('pay', { rows: pay.rows.map((r) => (r.id === id ? { ...r, ...patch } : r)) });
  const addRow = (row = {}) => {
    const blank = { id: uid(), inv: '', date: '', content: '', amount: 0, note: '' };
    // Dòng trống duy nhất thì thay luôn, không để dòng trống thừa
    const only = pay.rows.length === 1 && !pay.rows[0].content && !pay.rows[0].amount && !pay.rows[0].inv;
    set('pay', { rows: [...(only ? [] : pay.rows), { ...blank, ...row }] });
  };
  const delRow = (id) => set('pay', { rows: pay.rows.length > 1 ? pay.rows.filter((r) => r.id !== id) : [{ id: uid(), inv: '', date: '', content: '', amount: 0, note: '' }] });
  const per = periodLabel(s.period);
  // Điền trực tiếp trên giấy xem trước (giấy đề nghị thanh toán)
  const ed = {
    who: (p) => set('who', p),
    pay: (p) => set('pay', p),
    row: (i, patch) => {
      const rows = [...pay.rows];
      while (rows.length <= i) rows.push({ id: uid(), inv: '', date: '', content: '', amount: 0, note: '' });
      rows[i] = { ...rows[i], ...patch };
      set('pay', { rows });
    },
    del: (i) => delRow(pay.rows[i].id),
  };

  // ----- Hoa hồng Sales -----
  const { sales, mkt } = s;
  const setSRow = (id, patch) => set('sales', { rows: sales.rows.map((r) => (r.id === id ? { ...r, ...patch } : r)) });
  const addSRow = () => set('sales', { rows: [...sales.rows, blankSalesRow()] });
  const delSRow = (id) => set('sales', { rows: sales.rows.length > 1 ? sales.rows.filter((r) => r.id !== id) : sales.rows });

  const pctShown = Math.round(SC.pct * 10000) / 100;
  const mPct = Math.round(MC.pct * 10000) / 100;

  return (
    <div>
      <PageHeader
        title="Quản lý"
        sub="Giấy đề nghị thanh toán và đối soát hoa hồng. Điền biến số bên dưới, xem trước rồi in hoặc lưu PDF."
        right={<button className="btn-ghost shrink-0" onClick={() => { lock(); setOk(false); }}><LogOut className="w-4 h-4" /> Khóa lại</button>}
      />

      <Card className="p-4 space-y-3">
        <h2 className="font-heading font-bold">Thông tin chung (lưu trên máy này, điền một lần)</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          <Txt label="Người lập" value={s.who.name} onChange={(v) => set('who', { name: v })} placeholder="Họ và tên" />
          <Txt label="Chức danh" value={s.who.title} onChange={(v) => set('who', { title: v })} placeholder="Trưởng phòng kinh doanh" />
          <Txt label="Phòng ban" value={s.who.dept} onChange={(v) => set('who', { dept: v })} placeholder="Phòng kinh doanh" />
          <Txt label="Giám đốc (ký)" value={s.who.gd} onChange={(v) => set('who', { gd: v })} />
          <Txt label="Kế toán (ký)" value={s.who.kt} onChange={(v) => set('who', { kt: v })} />
          <div>
            <span className={lbl}>Kỳ đối soát (tháng / năm)</span>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <input className="field" inputMode="numeric" value={s.period.m} onChange={(e) => set('period', { m: Math.min(12, digits(e.target.value)) || '' })} aria-label="Tháng" />
              <input className="field" inputMode="numeric" value={s.period.y} onChange={(e) => set('period', { y: digits(e.target.value) || '' })} aria-label="Năm" />
            </div>
          </div>
        </div>
      </Card>

      <div className="flex flex-wrap gap-2 mt-5">
        <Chip active={tab === 'pay'} onClick={() => setTab('pay')}>Đề nghị thanh toán</Chip>
        <Chip active={tab === 'sales'} onClick={() => setTab('sales')}>Hoa hồng Sales</Chip>
        <Chip active={tab === 'mkt'} onClick={() => setTab('mkt')}>Thưởng Marketing</Chip>
      </div>

      {tab === 'pay' && (
        <div className="mt-4 space-y-4">
          {/* Máy tính: điền thẳng trên giấy bên dưới. Các thẻ nhập bên dưới chỉ hiện trên điện thoại cho dễ gõ. */}
          <Card className="p-4 hidden lg:block">
            <p className="text-sm text-nau">Điền thẳng trên giấy bên dưới: bấm vào ô để gõ, bấm vào ô vuông để chọn. Tổng cộng tự cộng. Rê chuột vào số thứ tự dòng rồi bấm × để xóa dòng.</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <button className="btn-ghost" onClick={() => { addRow({ content: `Hoa hồng PKD tháng ${per}`, amount: SC.grand, date: '' }); toast('Đã thêm khoản hoa hồng PKD'); }} disabled={!SC.grand}>
                <Wand2 className="w-4 h-4" /> Thêm hoa hồng PKD ({fmtNum(SC.grand)}đ)
              </button>
              <button className="btn-ghost" onClick={() => { addRow({ content: `Thưởng Marketing tháng ${per}`, amount: MC.reward, date: '' }); toast('Đã thêm khoản thưởng Marketing'); }} disabled={!MC.reward}>
                <Wand2 className="w-4 h-4" /> Thêm thưởng Marketing ({fmtNum(MC.reward)}đ)
              </button>
            </div>
          </Card>
          <Card className="p-4 space-y-3 lg:hidden">
            <h2 className="font-heading font-bold">Các khoản đề nghị thanh toán</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <label className="block"><span className={lbl}>Ngày ký (mặc định hôm nay, sửa được)</span>
                <div className="flex gap-2 mt-1">
                  <input className="field" inputMode="numeric" value={pay.docDate || todayVN()} onChange={(e) => set('pay', { docDate: maskDate(e.target.value) })} />
                  <button type="button" className="btn-ghost shrink-0" onClick={() => set('pay', { docDate: '' })}>Hôm nay</button>
                </div></label>
              <div><span className={lbl}>Thanh toán cho</span>
                <div className="flex gap-2 mt-1">
                  <Chip active={pay.payTo === 'nv'} onClick={() => set('pay', { payTo: 'nv' })}>Nhân viên</Chip>
                  <Chip active={pay.payTo === 'ncc'} onClick={() => set('pay', { payTo: 'ncc' })}>Nhà cung cấp</Chip>
                </div></div>
            </div>

            <div className="space-y-3">
              {pay.rows.map((r, i) => (
                <div key={r.id} className="rounded-xl border border-kem-deep p-3 space-y-2.5 bg-kem/40">
                  <div className="flex items-center justify-between">
                    <b className="text-sm">Khoản {i + 1}</b>
                    <button className="h-9 w-9 grid place-items-center rounded-lg text-nau hover:text-bad" onClick={() => delRow(r.id)} aria-label={`Xóa khoản ${i + 1}`}><Trash2 className="w-4 h-4" /></button>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Txt label="Ngày hóa đơn" value={r.date} onChange={(v) => setRow(r.id, { date: maskDate(v) })} inputMode="numeric" placeholder="17/11/2026" />
                    <Txt label="Số hóa đơn (nếu có)" value={r.inv} onChange={(v) => setRow(r.id, { inv: v })} />
                  </div>
                  <Txt label="Nội dung" value={r.content} onChange={(v) => setRow(r.id, { content: v })} placeholder="Ví dụ: Claude tháng 11" />
                  <div className="grid sm:grid-cols-2 gap-3">
                    <label className="block"><span className={lbl}>Số tiền (đ)</span><div className="mt-1"><Money value={r.amount} onChange={(v) => setRow(r.id, { amount: v })} placeholder="0" /></div></label>
                    <Txt label="Ghi chú" value={r.note} onChange={(v) => setRow(r.id, { note: v })} />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <button className="btn-ghost" onClick={() => addRow()}><Plus className="w-4 h-4" /> Thêm khoản</button>
              <button className="btn-ghost" onClick={() => { addRow({ content: `Hoa hồng PKD tháng ${per}`, amount: SC.grand, date: '' }); toast('Đã thêm khoản hoa hồng PKD'); }} disabled={!SC.grand}>
                <Wand2 className="w-4 h-4" /> Thêm hoa hồng PKD ({fmtNum(SC.grand)}đ)
              </button>
              <button className="btn-ghost" onClick={() => { addRow({ content: `Thưởng Marketing tháng ${per}`, amount: MC.reward, date: '' }); toast('Đã thêm khoản thưởng Marketing'); }} disabled={!MC.reward}>
                <Wand2 className="w-4 h-4" /> Thêm thưởng Marketing ({fmtNum(MC.reward)}đ)
              </button>
            </div>
            <div className="rounded-xl bg-cara text-kem px-4 py-3 flex items-baseline justify-between gap-3">
              <span className="text-sm">Tổng cộng = cộng cột "Số tiền" ({pay.rows.filter((r) => r.amount).length} khoản)</span>
              <b className="font-heading font-extrabold text-xl text-pas">{fmtNum(payTotal(pay))} {pay.currency}</b>
            </div>
          </Card>

          <Card className="p-4 space-y-3 lg:hidden">
            <h2 className="font-heading font-bold">Phương thức thanh toán</h2>
            <div className="flex flex-wrap gap-2">
              {[['transfer', 'Chuyển khoản'], ['cash', 'Tiền mặt'], ['cheque', 'Séc']].map(([k, l]) => <Chip key={k} active={pay.method === k} onClick={() => set('pay', { method: k })}>{l}</Chip>)}
              <span className="w-px bg-kem-deep mx-1" />
              {['VND', 'USD', 'JPY'].map((c) => <Chip key={c} active={pay.currency === c} onClick={() => set('pay', { currency: c })}>{c}</Chip>)}
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <Txt label="Tên người nhận tiền" value={pay.recvName} onChange={(v) => set('pay', { recvName: v })} />
              <Txt label="Tên người thụ hưởng" value={pay.benName} onChange={(v) => set('pay', { benName: v })} />
              <Txt label="Số CMND/CCCD" value={pay.idNo} onChange={(v) => set('pay', { idNo: v })} inputMode="numeric" />
              <Txt label="Số tài khoản" value={pay.acctNo} onChange={(v) => set('pay', { acctNo: v })} inputMode="numeric" />
              <Txt label="Ngày cấp" value={pay.idDate} onChange={(v) => set('pay', { idDate: maskDate(v) })} inputMode="numeric" placeholder="ngày/tháng/năm" />
              <Txt label="Tên ngân hàng" value={pay.bank} onChange={(v) => set('pay', { bank: v })} />
            </div>
            <p className="text-xs text-nau">Số CMND và số tài khoản chỉ lưu trên máy này, không nằm trong mã web.</p>
          </Card>
        </div>
      )}

      {tab === 'sales' && (
        <div className="mt-4 space-y-4">
          <Card className="p-4 space-y-3">
            <h2 className="font-heading font-bold">Đối soát hoa hồng Phòng kinh doanh tháng {per}</h2>
            <PeriodInput period={s.period} onChange={(p) => set('period', p)} />
            <div className="grid sm:grid-cols-2 gap-3">
              <label className="block"><span className={lbl}>KPIs (đ)</span><div className="mt-1"><Money value={sales.kpi} onChange={(v) => set('sales', { kpi: v })} /></div></label>
              <label className="block"><span className={lbl}>Lương cơ bản (đ)</span><div className="mt-1"><Money value={sales.salary} onChange={(v) => set('sales', { salary: v })} placeholder="0" /></div></label>
            </div>
            <div className="space-y-3">
              {sales.rows.map((r, i) => (
                <div key={r.id} className="rounded-xl border border-kem-deep p-3 space-y-2.5 bg-kem/40">
                  <div className="flex items-center justify-between">
                    <b className="text-sm">Đơn {i + 1}</b>
                    <button className="h-9 w-9 grid place-items-center rounded-lg text-nau hover:text-bad" onClick={() => delSRow(r.id)} aria-label={`Xóa đơn ${i + 1}`}><Trash2 className="w-4 h-4" /></button>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-3">
                    <label className="block"><span className={lbl}>Sản phẩm</span>
                      <select className="field mt-1" value={r.product} onChange={(e) => setSRow(r.id, { product: e.target.value })}>
                        {[...PRODUCTS, ...(r.product && !PRODUCTS.includes(r.product) ? [r.product] : [])].map((p) => <option key={p} value={p}>{p}</option>)}
                      </select></label>
                    <Txt label="Khách hàng" value={r.customer} onChange={(v) => setSRow(r.id, { customer: v })} />
                    <Txt label="Nguồn" value={r.source} onChange={(v) => setSRow(r.id, { source: v })} placeholder="CS1 - Ads" />
                  </div>
                  <div className="grid sm:grid-cols-4 gap-3">
                    <label className="block"><span className={lbl}>Doanh thu thực tế (đ)</span><div className="mt-1"><Money value={r.actual} onChange={(v) => setSRow(r.id, { actual: v })} placeholder="0" /></div></label>
                    <Txt label="% ghi nhận" value={r.pct} onChange={(v) => setSRow(r.id, { pct: decimal(v) })} inputMode="decimal" />
                    <Txt label="NV Sale" value={r.sale} onChange={(v) => setSRow(r.id, { sale: v })} />
                    <Txt label="Notes" value={r.note} onChange={(v) => setSRow(r.id, { note: v })} />
                  </div>
                  <p className="text-xs text-nau">
                    <b>Doanh thu ghi nhận</b> = doanh thu thực tế × % ghi nhận = {fmtNum(r.actual)} × {r.pct || 0}% = <b className="text-cam-dark text-sm">{fmtNum(SC.rows[i]?.recog)}đ</b>
                  </p>
                </div>
              ))}
            </div>
            <button className="btn-ghost" onClick={addSRow}><Plus className="w-4 h-4" /> Thêm đơn</button>
          </Card>

          <div className="rounded-2xl bg-cara text-kem p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-pas">Kết quả tính</p>
            <dl className="mt-3 space-y-2 text-sm">
              {[
                ['Tổng doanh thu thực tế', fmtNum(SC.actualTotal), 'Cộng cột "Doanh thu thực tế"'],
                ['Tổng doanh thu ghi nhận', fmtNum(SC.recogTotal), 'Cộng từng đơn: doanh thu thực tế × % ghi nhận'],
                ['Tỷ lệ hoàn thành KPI', `${String(pctShown).replace('.', ',')}% (${SC.tier})`, `= ${fmtNum(SC.recogTotal)} ÷ ${fmtNum(sales.kpi)} (KPI)`],
                [`Hoa hồng ${Math.round(SC.rate * 100)}%`, fmtNum(SC.comm), `= ${fmtNum(SC.recogTotal)} × ${Math.round(SC.rate * 100)}% (dưới 80% KPI: 0%, 80 đến 90%: 4%, từ 91%: 5%)`],
                ['Thưởng vượt KPI', fmtNum(SC.bonus), 'Từ 100% KPI: 2.000.000. Từ 120% KPI: 5.000.000. Không cộng dồn'],
                ['Lương cơ bản', fmtNum(SC.salary), 'Anh nhập ở trên'],
              ].map(([k, v, f]) => (
                <div key={k}>
                  <div className="flex justify-between gap-3"><dt className="text-kem/85">{k}</dt><dd className="font-bold">{v}</dd></div>
                  <p className="text-[11px] text-kem/60 mt-0.5">{f}</p>
                </div>
              ))}
              <div className="pt-2 border-t border-white/20">
                <div className="flex justify-between gap-3 text-base"><dt>Tổng hoa hồng + thưởng</dt><dd className="font-heading font-extrabold text-pas">{fmtNum(SC.grand)}đ</dd></div>
                <p className="text-[11px] text-kem/60 mt-0.5">= hoa hồng + thưởng vượt KPI + lương cơ bản = {fmtNum(SC.comm)} + {fmtNum(SC.bonus)} + {fmtNum(SC.salary)}</p>
              </div>
            </dl>
            <p className="text-xs text-kem/70 mt-3">Công thức giống trang KPI: hoa hồng tính trên toàn bộ doanh thu ghi nhận, từ 80% KPI mới có (4% hoặc 5%), thưởng 2 triệu từ 100% và 5 triệu từ 120%.</p>
          </div>
        </div>
      )}

      {tab === 'mkt' && (
        <div className="mt-4 space-y-4">
          <Card className="p-4 space-y-3">
            <h2 className="font-heading font-bold">Đối soát thưởng Marketing tháng {per}</h2>
            <PeriodInput period={s.period} onChange={(p) => set('period', p)} />
            <div className="grid sm:grid-cols-2 gap-3">
              <label className="block"><span className={lbl}>Chi phí đề xuất (đ)</span><div className="mt-1"><Money value={mkt.costProposed} onChange={(v) => set('mkt', { costProposed: v })} placeholder="0" /></div></label>
              <label className="block"><span className={lbl}>Chi phí thực tế (đ)</span><div className="mt-1"><Money value={mkt.costActual} onChange={(v) => set('mkt', { costActual: v })} placeholder="0" /></div></label>
              <label className="block"><span className={lbl}>Doanh thu mục tiêu / kế hoạch (đ)</span><div className="mt-1"><Money value={mkt.target} onChange={(v) => set('mkt', { target: v })} placeholder="0" /></div></label>
              <label className="block"><span className={lbl}>Doanh thu thực tế (đ)</span><div className="mt-1"><Money value={mkt.actual} onChange={(v) => set('mkt', { actual: v })} placeholder="0" /></div></label>
              <Txt label="Tỷ lệ thưởng (%)" value={mkt.rate} onChange={(v) => set('mkt', { rate: decimal(v) })} inputMode="decimal" />
              <div><span className={lbl}>Thưởng tính trên</span>
                <div className="flex gap-2 mt-1 flex-wrap">
                  <Chip active={mkt.base === 'actual'} onClick={() => set('mkt', { base: 'actual' })}>Doanh thu thực tế</Chip>
                  <Chip active={mkt.base === 'over'} onClick={() => set('mkt', { base: 'over' })}>Phần vượt kế hoạch</Chip>
                </div></div>
            </div>
            <button className="btn-ghost" onClick={() => { set('mkt', { actual: adsRevenue(sales) }); toast('Đã lấy doanh thu các đơn nguồn Ads'); }} disabled={!adsRevenue(sales)}>
              <Wand2 className="w-4 h-4" /> Lấy doanh thu thực tế từ các đơn nguồn Ads ({fmtNum(adsRevenue(sales))}đ)
            </button>
          </Card>

          <div className="rounded-2xl bg-cara text-kem p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-pas">Kết quả tính (tự nhảy khi anh điền số)</p>
            <dl className="mt-3 space-y-2 text-sm">
              <div>
                <div className="flex justify-between gap-3"><dt className="text-kem/85">% hoàn thành kế hoạch</dt><dd className="font-bold">{String(mPct).replace('.', ',')}%</dd></div>
                <p className="text-[11px] text-kem/60 mt-0.5">= doanh thu thực tế ÷ doanh thu mục tiêu = {fmtNum(mkt.actual)} ÷ {fmtNum(mkt.target)}</p>
              </div>
              <div>
                <div className="flex justify-between gap-3"><dt className="text-kem/85">Tính thưởng trên</dt><dd className="font-bold">{fmtNum(MC.base)}đ</dd></div>
                <p className="text-[11px] text-kem/60 mt-0.5">{mkt.base === 'over' ? `= phần vượt kế hoạch = ${fmtNum(mkt.actual)} − ${fmtNum(mkt.target)}` : '= doanh thu thực tế'}</p>
              </div>
              <div className="pt-2 border-t border-white/20">
                <div className="flex justify-between gap-3 text-base"><dt>Thưởng {mkt.rate || 0}%</dt><dd className="font-heading font-extrabold text-pas">{fmtNum(MC.reward)}đ</dd></div>
                <p className="text-[11px] text-kem/60 mt-0.5">= {fmtNum(MC.base)} × {mkt.rate || 0}%</p>
              </div>
            </dl>
          </div>
        </div>
      )}

      <section className="mt-6">
        <div className="flex items-center justify-between gap-3 mb-2">
          <h2 className="font-heading font-bold">Xem trước</h2>
          <button className="btn-primary" onClick={print}><Printer className="w-4 h-4" /> In hoặc lưu PDF</button>
        </div>
        <div className="overflow-x-auto rounded-xl border border-kem-deep bg-kem-deep/50 p-3">
          <div className="mx-auto w-max shadow-card"><Doc s={s} ed={tab === 'pay' ? ed : null} /></div>
        </div>
        <p className="text-xs text-nau mt-2">Bấm nút trên, chọn "Lưu thành PDF" (hoặc chọn máy in), khổ A4, tắt "Đầu trang và chân trang" cho gọn.</p>
      </section>

      {host && createPortal(<Doc s={s} />, host)}
    </div>
  );
}
