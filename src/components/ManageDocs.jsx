// Các mẫu giấy để in hoặc lưu PDF: giấy đề nghị thanh toán và 2 bảng đối soát hoa hồng. Mẫu bám theo file Excel và PDF của công ty.
import { fmtNum, todayVN, maskDate } from '../lib/format';
import { payTotal, periodLabel, salesCalc, mktCalc, PRODUCTS } from '../lib/manager';

const COMPANY = 'CÔNG TY CỔ PHẦN GIÁO DỤC GMA VIỆT NAM';
const ADDRESS_1 = 'N024, LK 829 Khu Bờ Hội, Phường La Khê, Quận Hà Đông,';
const ADDRESS_2 = 'Thành phố Hà Nội, Việt Nam';
const SITE = 'https://gmavietnam.com/';
const MAIL = 'gmavietnam.edu@gmail.com';
const PHONE = '0981 586 907';

const money = (n) => (n ? fmtNum(n) : '');
const dash = (s, w = 'w-40') => (s ? <b className="font-semibold">{s}</b> : <span className={`inline-block ${w} border-b border-dotted border-black align-baseline`}>&nbsp;</span>);

// Chế độ điền trực tiếp: ô nhập trong suốt nằm ngay trên giấy, rê chuột thì sáng lên. Khi in thì vẽ chữ thường (ed = null).
const inCls = 'bg-transparent outline-none w-full min-w-0 rounded-sm px-0.5 hover:bg-cam-soft/70 focus:bg-cam-soft placeholder:font-normal placeholder:text-black/25';
function In({ value, onChange, className = '', ...p }) {
  return <input className={`${inCls} ${className}`} value={value ?? ''} onChange={(e) => onChange(e.target.value)} autoComplete="off" {...p} />;
}
function Chk({ on, onClick }) {
  const cls = 'inline-block w-3.5 h-3.5 border border-black text-center leading-[12px] text-[11px] font-bold align-middle mx-1';
  return onClick
    ? <button type="button" onClick={onClick} className={`${cls} bg-white hover:bg-cam-soft cursor-pointer`} aria-pressed={on}>{on ? 'X' : ''}</button>
    : <span className={cls}>{on ? 'X' : ''}</span>;
}
const digitsOf = (s) => parseInt(String(s).replace(/\D/g, ''), 10) || 0;

export function Sheet({ children }) {
  return (
    <div className="print-sheet bg-white text-black text-[12px] leading-snug" style={{ width: '210mm', minHeight: '297mm', padding: '12mm 14mm', boxSizing: 'border-box', fontFamily: 'Inter, Arial, sans-serif' }}>
      {children}
    </div>
  );
}

function Letterhead() {
  return (
    <div className="flex items-start justify-between gap-4 mb-5">
      <img src="/logo.png" alt="GMA" className="h-20 object-contain" />
      {/* Mỗi ý một dòng, không cho tự xuống dòng giữa chừng (trước đây chữ "Nam" rơi xuống dòng dưới) */}
      <div className="text-right text-[10.5px] leading-[1.5] whitespace-nowrap">
        <p className="font-extrabold text-[13px]">{COMPANY}</p>
        <p className="mt-1">{ADDRESS_1}</p>
        <p>{ADDRESS_2}</p>
        <p>{PHONE} · {SITE} · {MAIL}</p>
      </div>
    </div>
  );
}

function Signs({ cols }) {
  return (
    <div className="mt-8 grid text-center" style={{ gridTemplateColumns: `repeat(${cols.length}, 1fr)` }}>
      {cols.map((c) => (
        <div key={c.role} className="px-1">
          <p className="font-bold uppercase">{c.role}</p>
          {c.date !== undefined && (c.onDate
            ? <p className="text-[11px] mt-1 flex items-center justify-center gap-1">Ngày: <In value={c.date} onChange={c.onDate} className="!w-[22mm] text-center" inputMode="numeric" /></p>
            : <p className="text-[11px] mt-1">Ngày: {c.date}</p>)}
          <div className="h-20" />
          {c.onName ? <In value={c.name} onChange={c.onName} className="text-center font-bold uppercase" placeholder="Họ tên" /> : <p className="font-bold uppercase">{c.name}</p>}
        </div>
      ))}
    </div>
  );
}

const th = 'border border-black px-1.5 py-1 font-bold text-center';
const td = 'border border-black px-1.5 py-1';

export function PayDoc({ s, ed = null }) {
  const { who, pay } = s;
  const total = payTotal(pay);
  const date = pay.docDate || todayVN();
  const box = (on, onClick) => <Chk on={on} onClick={ed ? onClick : undefined} />;
  const rows = [...pay.rows];
  while (rows.length < 6) rows.push(null);
  // Ô gạch chấm: điền trực tiếp khi ed, còn lại in chữ
  const fld = (val, key, w) => (ed
    ? <span className={`inline-block align-baseline ${w}`}><In value={val} onChange={(v) => ed.pay({ [key]: v })} className="border-b border-dotted border-black rounded-none font-semibold" /></span>
    : dash(val, w));
  const whoFld = (val, key, w, ph) => (ed
    ? <span className={`inline-block align-baseline ${w}`}><In value={val} onChange={(v) => ed.who({ [key]: v })} className="border-b border-dotted border-black rounded-none font-semibold" placeholder={ph} /></span>
    : dash(val, w));
  const cell = (r, i, key, cls, props = {}) => {
    if (!ed) return <td className={`${td} ${cls}`}>{key === 'amount' ? (r ? money(r.amount) : '') : r?.[key]}</td>;
    const v = r ? r[key] : '';
    const isAmt = key === 'amount';
    return (
      <td className={`${td} ${cls} !p-0.5`}>
        <In
          value={isAmt ? money(v) : v}
          onChange={(x) => ed.row(i, { [key]: isAmt ? digitsOf(x) : key === 'date' ? maskDate(x) : x })}
          className={cls.includes('text-right') ? 'text-right' : cls.includes('text-center') ? 'text-center' : ''}
          inputMode={isAmt || key === 'date' ? 'numeric' : undefined}
          {...props}
        />
      </td>
    );
  };
  return (
    <Sheet>
      <Letterhead />
      <h1 className="text-center text-[17px] font-extrabold tracking-wide">GIẤY ĐỀ NGHỊ THANH TOÁN</h1>
      <p className="text-center italic">(Công ty cổ phần giáo dục GMA Việt Nam)</p>

      <div className="mt-5 grid grid-cols-[1fr_auto] gap-x-6 gap-y-1.5">
        <p>Họ và tên: {whoFld(who.name, 'name', 'w-52', 'Họ và tên')}</p>
        <p>Chức danh: {whoFld(who.title, 'title', ed ? 'w-52' : 'w-28', 'Chức danh')}</p>
        <p>Phòng/Ban: {whoFld(who.dept, 'dept', 'w-52', 'Phòng/Ban')}</p>
      </div>
      <p className="mt-2">Thanh toán cho: {box(pay.payTo === 'nv', () => ed.pay({ payTo: 'nv' }))} N/viên {box(pay.payTo === 'ncc', () => ed.pay({ payTo: 'ncc' }))} Nhà cung cấp</p>

      <table className="w-full border-collapse mt-3">
        <thead>
          <tr>
            <th className={`${th} w-8`}>TT</th>
            <th className={`${th} w-24`}>Số hóa đơn</th>
            <th className={`${th} w-24`}>Ngày hóa đơn</th>
            <th className={th}>Nội dung</th>
            <th className={`${th} w-28`}>Số tiền</th>
            <th className={`${th} w-24`}>Ghi chú</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={ed ? i : (r?.id ?? `e${i}`)} className="h-7 align-top group">
              <td className={`${td} text-center relative`}>
                {r ? i + 1 : ''}
                {ed && r && pay.rows.length > 0 && (
                  <button type="button" onClick={() => ed.del(i)} title="Xóa dòng này" aria-label={`Xóa dòng ${i + 1}`} className="hidden group-hover:grid absolute inset-0 place-items-center bg-white text-bad font-bold">×</button>
                )}
              </td>
              {cell(r, i, 'inv', '')}
              {cell(r, i, 'date', 'text-center', { placeholder: 'dd/mm/yyyy' })}
              {cell(r, i, 'content', '', { placeholder: i === 0 ? 'Nội dung' : '' })}
              {cell(r, i, 'amount', 'text-right', { placeholder: i === 0 ? '0' : '' })}
              {cell(r, i, 'note', '')}
            </tr>
          ))}
          <tr>
            <td className={`${td} font-bold`} colSpan={4}>
              Tổng cộng / Total
              <span className="ml-4 font-normal">
                {box(pay.currency === 'VND', () => ed.pay({ currency: 'VND' }))} VND {box(pay.currency === 'USD', () => ed.pay({ currency: 'USD' }))} USD {box(pay.currency === 'JPY', () => ed.pay({ currency: 'JPY' }))} JPY
              </span>
            </td>
            <td className={`${td} text-right font-bold`}>{fmtNum(total)}</td>
            <td className={td} />
          </tr>
        </tbody>
      </table>
      {ed && <button type="button" onClick={() => ed.row(Math.max(6, pay.rows.length), {})} className="mt-1 text-[11px] font-semibold text-cam-dark hover:underline">+ Thêm dòng</button>}

      <p className="mt-4 font-bold text-center">Phương thức thanh toán</p>
      <p className="mt-1">
        {box(pay.method === 'cash', () => ed.pay({ method: 'cash' }))} Tiền mặt {box(pay.method === 'cheque', () => ed.pay({ method: 'cheque' }))} Séc {box(pay.method === 'transfer', () => ed.pay({ method: 'transfer' }))} Chuyển khoản
      </p>
      <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1.5">
        <div className="space-y-1.5">
          <p>Tên người nhận tiền: {fld(pay.recvName, 'recvName', 'w-40')}</p>
          <p>Số CMND/CCCD: {fld(pay.idNo, 'idNo', 'w-40')}</p>
          <p>Ngày cấp: {fld(pay.idDate, 'idDate', 'w-40')}</p>
        </div>
        <div className="space-y-1.5">
          <p>Tên người thụ hưởng: {fld(pay.benName, 'benName', 'w-36')}</p>
          <p>Số tài khoản: {fld(pay.acctNo, 'acctNo', 'w-40')}</p>
          <p>Tên ngân hàng: {fld(pay.bank, 'bank', 'w-40')}</p>
        </div>
      </div>

      <Signs
        cols={[
          { role: 'Giám đốc', date, name: who.gd, onDate: ed && ((v) => ed.pay({ docDate: maskDate(v) })), onName: ed && ((v) => ed.who({ gd: v })) },
          { role: 'Kế toán trưởng', date, name: who.kt, onDate: ed && ((v) => ed.pay({ docDate: maskDate(v) })), onName: ed && ((v) => ed.who({ kt: v })) },
          { role: 'Trưởng Phòng/Ban', date, name: who.name, onDate: ed && ((v) => ed.pay({ docDate: maskDate(v) })), onName: ed && ((v) => ed.who({ name: v })) },
          { role: 'Người đề nghị', date, name: who.name, onDate: ed && ((v) => ed.pay({ docDate: maskDate(v) })), onName: ed && ((v) => ed.who({ name: v })) },
        ]}
      />
    </Sheet>
  );
}

const decimalOf = (s) => String(s).replace(',', '.').replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');

// Tiêu đề có ô tháng/năm gõ thẳng được
function PeriodTitle({ prefix, period, ed }) {
  return (
    <h1 className="text-center text-[17px] font-extrabold mt-2 flex items-center justify-center gap-1 flex-wrap">
      <span>{prefix} THÁNG</span>
      {ed ? (
        <span className="inline-flex items-center">
          <In value={period.m} onChange={(v) => ed.period({ m: Math.min(12, digitsOf(v)) || '' })} className="!w-9 text-center font-extrabold" inputMode="numeric" aria-label="Tháng" />
          <span>/</span>
          <In value={period.y} onChange={(v) => ed.period({ y: digitsOf(v) || '' })} className="!w-14 text-center font-extrabold" inputMode="numeric" aria-label="Năm" />
        </span>
      ) : <span>{periodLabel(period)}</span>}
    </h1>
  );
}

function Meta({ who, ed }) {
  const row = (label, key, ph) => (
    <>
      <b>{label}</b>
      {ed ? <In value={who[key]} onChange={(v) => ed.who({ [key]: v })} placeholder={ph} /> : <span>{who[key]}</span>}
    </>
  );
  return (
    <div className="mt-5 grid grid-cols-[22mm_1fr] gap-y-0.5 text-[11px] items-center">
      {row('Tên người lập:', 'name', 'Họ và tên')}
      {row('Vị trí:', 'title', 'Chức danh')}
      {row('Phòng ban:', 'dept', 'Phòng ban')}
    </div>
  );
}

function comSigns(who, ed) {
  return [
    { role: 'Giám đốc', name: who.gd, onName: ed && ((v) => ed.who({ gd: v })) },
    { role: 'Kế toán', name: who.kt, onName: ed && ((v) => ed.who({ kt: v })) },
    { role: 'TP. Kinh doanh', name: who.name, onName: ed && ((v) => ed.who({ name: v })) },
  ];
}

export function SalesDoc({ s, ed = null }) {
  const { who, period, sales } = s;
  const C = salesCalc(sales);
  const rows = C.rows;
  const pct = Math.round(C.pct * 10000) / 100;
  const kpiCell = ed
    ? <In value={money(sales.kpi)} onChange={(v) => ed.sales({ kpi: digitsOf(v) })} className="text-right" inputMode="numeric" />
    : fmtNum(sales.kpi);
  const salaryCell = ed
    ? <In value={money(sales.salary)} onChange={(v) => ed.sales({ salary: digitsOf(v) })} className="text-right" inputMode="numeric" placeholder="0" />
    : fmtNum(C.salary);
  const sumRows = [
    ['Tổng DT ghi nhận', fmtNum(C.recogTotal), true],
    ['KPIs', kpiCell, false, true],
    ['Tỷ lệ hoàn thành', `${String(pct).replace('.', ',')}%`, false],
    [`Hoa hồng ${Math.round(C.rate * 100)}%`, fmtNum(C.comm), false],
    ['Thưởng vượt KPIs', fmtNum(C.bonus), false],
    ['Lương cơ bản', salaryCell, false, true],
    ['Tổng hoa hồng + Thưởng', fmtNum(C.grand), true],
  ];
  const cellIn = (i, key, cls = '', props = {}) => (
    <td className={`${td} ${cls} ${ed ? '!p-0.5' : ''}`}>
      {ed
        ? <In value={sales.rows[i][key]} onChange={(v) => ed.srow(i, { [key]: v })} className={cls.includes('text-center') ? 'text-center' : ''} {...props} />
        : sales.rows[i][key]}
    </td>
  );
  return (
    <Sheet>
      <Letterhead />
      <PeriodTitle prefix="BẢNG ĐỐI SOÁT HOA HỒNG PKD" period={period} ed={ed} />
      <Meta who={who} ed={ed} />
      <p className="mt-3 text-[11px]">PKD đề xuất bảng đối soát hoa hồng của {who.dept || 'Phòng kinh doanh'} tháng {periodLabel(period)} như sau ạ:</p>

      <table className="w-full border-collapse mt-2 text-[11px]">
        <thead>
          <tr>
            <th className={`${th} w-8`}>STT</th>
            <th className={`${th} w-[27mm]`}>Sản phẩm</th>
            <th className={`${th} w-[32mm]`}>Khách hàng</th>
            <th className={`${th} w-[18mm]`}>Nguồn</th>
            <th className={th}>Doanh thu thực tế</th>
            <th className={th}>% Doanh thu ghi nhận</th>
            <th className={th}>Doanh thu ghi nhận<span className="block font-normal text-[9px]">(= thực tế × %)</span></th>
            <th className={th}>NV Sale</th>
            <th className={th}>Notes</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={ed ? i : r.id} className="align-top group">
              <td className={`${td} text-center relative`}>
                {i + 1}
                {ed && rows.length > 1 && (
                  <button type="button" onClick={() => ed.sdel(i)} title="Xóa đơn này" aria-label={`Xóa đơn ${i + 1}`} className="hidden group-hover:grid absolute inset-0 place-items-center bg-white text-bad font-bold">×</button>
                )}
              </td>
              <td className={`${td} ${ed ? '!p-0.5' : ''}`}>
                {ed ? (
                  <select value={r.product} onChange={(e) => ed.srow(i, { product: e.target.value })} className="bg-transparent outline-none w-full rounded-sm hover:bg-cam-soft/70 focus:bg-cam-soft cursor-pointer appearance-none">
                    {[...PRODUCTS, ...(r.product && !PRODUCTS.includes(r.product) ? [r.product] : [])].map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                ) : r.product}
              </td>
              {cellIn(i, 'customer')}
              {cellIn(i, 'source', 'text-center', { placeholder: 'CS1 - Ads' })}
              <td className={`${td} text-right ${ed ? '!p-0.5' : ''}`}>
                {ed ? <In value={money(r.actual)} onChange={(v) => ed.srow(i, { actual: digitsOf(v) })} className="text-right" inputMode="numeric" placeholder="0" /> : money(r.actual)}
              </td>
              <td className={`${td} text-center ${ed ? '!p-0.5' : ''}`}>
                {ed ? (
                  <span className="flex items-center justify-center"><In value={r.pct} onChange={(v) => ed.srow(i, { pct: decimalOf(v) })} className="!w-10 text-center" inputMode="decimal" />%</span>
                ) : `${r.pct}%`}
              </td>
              <td className={`${td} text-right`}>{money(r.recog)}</td>
              {cellIn(i, 'sale', 'text-center')}
              {cellIn(i, 'note')}
            </tr>
          ))}
          <tr className="font-bold">
            <td className={`${td} text-center`} colSpan={4}>TOTAL</td>
            <td className={`${td} text-right`}>{fmtNum(C.actualTotal)}</td>
            <td className={td} />
            <td className={`${td} text-right`}>{fmtNum(C.recogTotal)}</td>
            <td className={td} colSpan={2} />
          </tr>
          {/* Khoảng cách rồi tới khối tổng hợp: số nằm thẳng cột "Doanh thu ghi nhận" */}
          <tr aria-hidden="true"><td colSpan={9} className="h-4" /></tr>
          {sumRows.map(([label, val, strong, editable]) => (
            <tr key={label}>
              <td colSpan={4} />
              <td className={`${td} font-bold`} colSpan={2}>{label}</td>
              <td className={`${td} text-right ${strong ? 'font-extrabold text-[12.5px]' : ''} ${ed && editable ? '!p-0.5' : ''}`}>{val}</td>
              <td colSpan={2} />
            </tr>
          ))}
        </tbody>
      </table>
      {ed && <button type="button" onClick={ed.sadd} className="mt-1 text-[11px] font-semibold text-cam-dark hover:underline print:hidden">+ Thêm đơn</button>}

      <Signs cols={comSigns(who, ed)} />
    </Sheet>
  );
}

export function MktDoc({ s, ed = null }) {
  const { who, period, mkt } = s;
  const M = mktCalc(mkt);
  const pct = Math.round(M.pct * 10000) / 100;
  const moneyCell = (key) => (
    <td className={`${td} text-right ${ed ? '!p-0.5' : ''}`}>
      {ed
        ? <In value={money(mkt[key])} onChange={(v) => ed.mkt({ [key]: digitsOf(v) })} className="text-right" inputMode="numeric" placeholder="0" />
        : fmtNum(mkt[key])}
    </td>
  );
  return (
    <Sheet>
      <Letterhead />
      <PeriodTitle prefix="BẢNG ĐỐI SOÁT HOA HỒNG PKD - MARKETING" period={period} ed={ed} />
      <Meta who={who} ed={ed} />
      <p className="mt-3 text-[11px]">PKD đề xuất bảng đối soát hoa hồng của {who.dept || 'Phòng kinh doanh'} - MKT Ads tháng {periodLabel(period)} như sau ạ:</p>

      <table className="w-full border-collapse mt-2 text-[11px]">
        <thead>
          <tr>
            <th className={th}>Chi phí đề xuất</th>
            <th className={th}>Chi phí thực tế</th>
            <th className={th}>Doanh thu mục tiêu</th>
            <th className={th}>Doanh thu thực tế</th>
            <th className={th}>% Hoàn thành<span className="block font-normal text-[9px]">(= thực tế ÷ mục tiêu)</span></th>
            <th className={th}>
              <span>
                Thưởng{' '}
                {ed
                  ? <span className="inline-block w-8 align-baseline"><In value={mkt.rate} onChange={(v) => ed.mkt({ rate: decimalOf(v) })} className="text-center font-bold" inputMode="decimal" /></span>
                  : mkt.rate}
                % {mkt.base === 'over' ? 'phần vượt kế hoạch' : 'doanh thu thực tế'}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {moneyCell('costProposed')}
            {moneyCell('costActual')}
            {moneyCell('target')}
            {moneyCell('actual')}
            <td className={`${td} text-center`}>{String(pct).replace('.', ',')}%</td>
            <td className={`${td} text-right font-bold`}>{fmtNum(M.reward)}</td>
          </tr>
        </tbody>
      </table>

      <Signs cols={comSigns(who, ed)} />
    </Sheet>
  );
}
