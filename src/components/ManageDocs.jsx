// Các mẫu giấy để in hoặc lưu PDF: giấy đề nghị thanh toán và 2 bảng đối soát hoa hồng. Mẫu bám theo file Excel và PDF của công ty.
import { fmtNum, todayVN } from '../lib/format';
import { payTotal, periodLabel, salesCalc, mktCalc } from '../lib/manager';

const COMPANY = 'CÔNG TY CỔ PHẦN GIÁO DỤC GMA VIỆT NAM';
const ADDRESS = 'N024, LK 829 Khu Bờ Hội, Phường La Khê, Quận Hà Đông, Thành phố Hà Nội, Việt Nam';
const SITE = 'https://gmavietnam.com/';
const MAIL = 'gmavietnam.edu@gmail.com';
const PHONE = '0981 586 907';

const money = (n) => (n ? fmtNum(n) : '');
const dash = (s, w = 'w-40') => (s ? <b className="font-semibold">{s}</b> : <span className={`inline-block ${w} border-b border-dotted border-black align-baseline`}>&nbsp;</span>);

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
      <div className="text-right text-[10.5px] max-w-[110mm]">
        <p className="font-extrabold text-[13px]">{COMPANY}</p>
        <p className="mt-1">{ADDRESS}</p>
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
          {c.date !== undefined && <p className="text-[11px] mt-1">Ngày: {c.date}</p>}
          <div className="h-20" />
          <p className="font-bold uppercase">{c.name}</p>
        </div>
      ))}
    </div>
  );
}

const th = 'border border-black px-1.5 py-1 font-bold text-center';
const td = 'border border-black px-1.5 py-1';

export function PayDoc({ s }) {
  const { who, pay } = s;
  const total = payTotal(pay);
  const date = pay.docDate || todayVN();
  const box = (on) => <span className="inline-block w-3.5 h-3.5 border border-black text-center leading-[12px] text-[11px] font-bold align-middle mx-1">{on ? 'X' : ''}</span>;
  const rows = [...pay.rows];
  while (rows.length < 6) rows.push(null);
  return (
    <Sheet>
      <Letterhead />
      <h1 className="text-center text-[17px] font-extrabold tracking-wide">GIẤY ĐỀ NGHỊ THANH TOÁN</h1>
      <p className="text-center italic">(Công ty cổ phần giáo dục GMA Việt Nam)</p>

      <div className="mt-5 grid grid-cols-[1fr_auto] gap-x-6 gap-y-1.5">
        <p>Họ và tên: {dash(who.name, 'w-52')}</p>
        <p>Chức danh: {dash(who.title, 'w-28')}</p>
        <p>Phòng/Ban: {dash(who.dept, 'w-52')}</p>
      </div>
      <p className="mt-2">Thanh toán cho: {box(pay.payTo === 'nv')} N/viên {box(pay.payTo === 'ncc')} Nhà cung cấp</p>

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
            <tr key={r?.id ?? `e${i}`} className="h-7 align-top">
              <td className={`${td} text-center`}>{r ? i + 1 : ''}</td>
              <td className={td}>{r?.inv}</td>
              <td className={`${td} text-center`}>{r?.date}</td>
              <td className={td}>{r?.content}</td>
              <td className={`${td} text-right`}>{r ? money(r.amount) : ''}</td>
              <td className={td}>{r?.note}</td>
            </tr>
          ))}
          <tr>
            <td className={`${td} font-bold`} colSpan={4}>
              Tổng cộng / Total
              <span className="ml-4 font-normal">{box(pay.currency === 'VND')} VND {box(pay.currency === 'USD')} USD {box(pay.currency === 'JPY')} JPY</span>
            </td>
            <td className={`${td} text-right font-bold`}>{fmtNum(total)}</td>
            <td className={td} />
          </tr>
        </tbody>
      </table>

      <p className="mt-4 font-bold text-center">Phương thức thanh toán</p>
      <p className="mt-1">{box(pay.method === 'cash')} Tiền mặt {box(pay.method === 'cheque')} Séc {box(pay.method === 'transfer')} Chuyển khoản</p>
      <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1.5">
        <div className="space-y-1.5">
          <p>Tên người nhận tiền: {dash(pay.recvName, 'w-40')}</p>
          <p>Số CMND/CCCD: {dash(pay.idNo, 'w-40')}</p>
          <p>Ngày cấp: {dash(pay.idDate, 'w-40')}</p>
        </div>
        <div className="space-y-1.5">
          <p>Tên người thụ hưởng: {dash(pay.benName, 'w-36')}</p>
          <p>Số tài khoản: {dash(pay.acctNo, 'w-40')}</p>
          <p>Tên ngân hàng: {dash(pay.bank, 'w-40')}</p>
        </div>
      </div>

      <Signs
        cols={[
          { role: 'Giám đốc', date: date, name: who.gd },
          { role: 'Kế toán trưởng', date: date, name: who.kt },
          { role: 'Trưởng Phòng/Ban', date: date, name: who.name },
          { role: 'Người đề nghị', date: date, name: who.name },
        ]}
      />
    </Sheet>
  );
}

export function SalesDoc({ s }) {
  const { who, period, sales } = s;
  const C = salesCalc(sales);
  const rows = C.rows;
  const pct = Math.round(C.pct * 10000) / 100;
  const sumRows = [
    ['Tổng DT ghi nhận', fmtNum(C.recogTotal), true],
    ['KPIs', fmtNum(sales.kpi), false],
    ['Tỷ lệ hoàn thành', `${String(pct).replace('.', ',')}%`, false],
    [`Hoa hồng ${Math.round(C.rate * 100)}%`, fmtNum(C.comm), false],
    ['Thưởng vượt KPIs', fmtNum(C.bonus), false],
    ['Lương cơ bản', fmtNum(C.salary), false],
    ['Tổng hoa hồng + Thưởng', fmtNum(C.grand), true],
  ];
  return (
    <Sheet>
      <Letterhead />
      <h1 className="text-center text-[17px] font-extrabold mt-2">BẢNG ĐỐI SOÁT HOA HỒNG PKD THÁNG {periodLabel(period)}</h1>
      <div className="mt-5 grid grid-cols-[22mm_1fr] gap-y-0.5 text-[11px]">
        <b>Tên người lập:</b><span>{who.name}</span>
        <b>Vị trí:</b><span>{who.title}</span>
        <b>Phòng ban:</b><span>{who.dept}</span>
      </div>
      <p className="mt-3 text-[11px]">PKD đề xuất bảng đối soát hoa hồng của {who.dept || 'Phòng kinh doanh'} tháng {periodLabel(period)} như sau ạ:</p>

      <table className="w-full border-collapse mt-2 text-[11px]">
        <thead>
          <tr>
            <th className={`${th} w-8`}>STT</th>
            <th className={th}>Sản phẩm</th>
            <th className={th}>Khách hàng</th>
            <th className={th}>Nguồn</th>
            <th className={th}>Doanh thu thực tế</th>
            <th className={th}>% Doanh thu ghi nhận</th>
            <th className={th}>Doanh thu ghi nhận</th>
            <th className={th}>NV Sale</th>
            <th className={th}>Notes</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.id} className="align-top">
              <td className={`${td} text-center`}>{i + 1}</td>
              <td className={td}>{r.product}</td>
              <td className={td}>{r.customer}</td>
              <td className={`${td} text-center`}>{r.source}</td>
              <td className={`${td} text-right`}>{money(r.actual)}</td>
              <td className={`${td} text-center`}>{r.pct}%</td>
              <td className={`${td} text-right`}>{money(r.recog)}</td>
              <td className={`${td} text-center`}>{r.sale}</td>
              <td className={td}>{r.note}</td>
            </tr>
          ))}
          <tr className="font-bold">
            <td className={`${td} text-center`} colSpan={4}>TOTAL</td>
            <td className={`${td} text-right`}>{fmtNum(C.actualTotal)}</td>
            <td className={td} />
            <td className={`${td} text-right`}>{fmtNum(C.recogTotal)}</td>
            <td className={td} colSpan={2} />
          </tr>
        </tbody>
      </table>

      <table className="border-collapse mt-0 ml-auto text-[11px]" style={{ width: '58mm' }}>
        <tbody>
          {sumRows.map(([label, val, strong]) => (
            <tr key={label}>
              <td className={`${td} font-bold`}>{label}</td>
              <td className={`${td} text-right ${strong ? 'font-extrabold text-[12.5px]' : ''}`}>{val}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Signs cols={[{ role: 'Giám đốc', name: who.gd }, { role: 'Kế toán', name: who.kt }, { role: 'TP. Kinh doanh', name: who.name }]} />
    </Sheet>
  );
}

export function MktDoc({ s }) {
  const { who, period, mkt } = s;
  const M = mktCalc(mkt);
  const pct = Math.round(M.pct * 10000) / 100;
  return (
    <Sheet>
      <Letterhead />
      <h1 className="text-center text-[17px] font-extrabold mt-2">BẢNG ĐỐI SOÁT HOA HỒNG PKD - MARKETING THÁNG {periodLabel(period)}</h1>
      <div className="mt-5 grid grid-cols-[22mm_1fr] gap-y-0.5 text-[11px]">
        <b>Tên người lập:</b><span>{who.name}</span>
        <b>Vị trí:</b><span>{who.title}</span>
        <b>Phòng ban:</b><span>{who.dept}</span>
      </div>
      <p className="mt-3 text-[11px]">PKD đề xuất bảng đối soát hoa hồng của {who.dept || 'Phòng kinh doanh'} - MKT Ads tháng {periodLabel(period)} như sau ạ:</p>

      <table className="w-full border-collapse mt-2 text-[11px]">
        <thead>
          <tr>
            <th className={th}>Chi phí đề xuất</th>
            <th className={th}>Chi phí thực tế</th>
            <th className={th}>Doanh thu mục tiêu</th>
            <th className={th}>Doanh thu thực tế</th>
            <th className={th}>% Hoàn thành</th>
            <th className={th}>Thưởng {mkt.rate}% {mkt.base === 'over' ? 'phần vượt kế hoạch' : 'doanh thu thực tế'}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={`${td} text-right`}>{fmtNum(mkt.costProposed)}</td>
            <td className={`${td} text-right`}>{fmtNum(mkt.costActual)}</td>
            <td className={`${td} text-right`}>{fmtNum(mkt.target)}</td>
            <td className={`${td} text-right`}>{fmtNum(mkt.actual)}</td>
            <td className={`${td} text-center`}>{String(pct).replace('.', ',')}%</td>
            <td className={`${td} text-right font-bold`}>{fmtNum(M.reward)}</td>
          </tr>
        </tbody>
      </table>

      <Signs cols={[{ role: 'Giám đốc', name: who.gd }, { role: 'Kế toán', name: who.kt }, { role: 'TP. Kinh doanh', name: who.name }]} />
    </Sheet>
  );
}
