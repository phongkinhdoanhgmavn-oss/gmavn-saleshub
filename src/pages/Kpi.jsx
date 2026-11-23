import { useEffect, useState } from 'react';
import { Plus, Minus, Info, Trophy, Flag } from 'lucide-react';
import { PageHeader, Card, useTyping } from '../lib/ui';
import { PACKAGES, fmt, fmtShort, fmtTr as trieu } from '../lib/pricing';
import { fmtNum } from '../lib/format';
import { KPI_DEFAULT, MARKS, BAR_MAX, KPI_STORAGE_KEY, kpiCalc, readKpiState } from '../lib/kpi';

const digits = (s) => parseInt(String(s).replace(/\D/g, ''), 10) || 0;
const fmtInput = (n) => (n ? fmtNum(n) : '');

export default function Kpi() {
  const typing = useTyping();
  const saved = readKpiState();
  const [kpi, setKpi] = useState(saved.kpi ?? KPI_DEFAULT);
  const [salary, setSalary] = useState(saved.salary ?? 0);
  const [tab, setTab] = useState(saved.tab ?? 'rev');
  const [rev, setRev] = useState(saved.rev ?? 0);
  const [qty, setQty] = useState(saved.qty ?? {});
  const [price, setPrice] = useState(saved.price ?? {});

  useEffect(() => {
    try { localStorage.setItem(KPI_STORAGE_KEY, JSON.stringify({ kpi, salary, tab, rev, qty, price })); } catch { /* bỏ qua */ }
  }, [kpi, salary, tab, rev, qty, price]);

  const courses = PACKAGES.map((p) => ({ id: p.id, name: p.name, short: p.short, list: p.price }));
  const priceOf = (c) => price[c.id] ?? c.list;
  const revenue = tab === 'rev' ? rev : courses.reduce((a, c) => a + (qty[c.id] || 0) * priceOf(c), 0);

  const R = kpiCalc(revenue, kpi);
  const chal = Math.round(kpi * 0.3);
  const pct = Math.round(R.pct * 1000) / 10;
  const next = MARKS.find((m) => R.pct < m[0]);
  const need = next ? Math.max(0, Math.ceil(next[0] * kpi - revenue)) : 0;
  const incAfter = (c) => kpiCalc(revenue + c.list, kpi).total - R.total;
  const reset = () => { setRev(0); setQty({}); };

  return (
    <div>
      <PageHeader
        title="KPI và thu nhập"
        sub="Nhập doanh thu thực thu hiện tại, app tính hoa hồng, thưởng và gợi ý cần chốt thêm khóa nào."
      />

      <div className="xl:grid xl:grid-cols-[1fr_380px] xl:gap-6 xl:items-start">
        <div className="space-y-5">
          {/* 1. KPI */}
          <Card className="p-4 space-y-4">
            <h2 className="font-heading font-bold text-lg">1. KPI của bạn</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <label className="block">
                <span className="text-sm font-semibold">KPI đủ mỗi tháng (đ)</span>
                <input className="field mt-1 text-lg font-bold" inputMode="numeric" value={fmtInput(kpi)} onChange={(e) => setKpi(digits(e.target.value))} />
                <span className="text-xs text-nau">Mặc định {fmt(KPI_DEFAULT)}. Do Đại ca đặt cho từng người, sửa nếu khác.</span>
              </label>
              <label className="block">
                <span className="text-sm font-semibold">Lương cứng/tháng (đ, nếu muốn tính tổng)</span>
                <input className="field mt-1 text-lg font-bold" inputMode="numeric" placeholder="0" value={fmtInput(salary)} onChange={(e) => setSalary(digits(e.target.value))} />
              </label>
            </div>
            <div className="rounded-xl border-2 border-cam bg-[#fff3df] p-3.5 text-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-cara flex items-center gap-1.5"><Flag className="w-4 h-4" /> Thử thách tháng đầu tiên</p>
              <p className="mt-1">
                Trong <b>tháng đầu tiên</b>, mục tiêu thử thách là đạt <b>30% KPI = {fmt(chal)}</b>. Đây là thử thách để vượt qua, không phải mức KPI dùng để tính thu nhập. Từ tháng thứ 2 tính đủ KPI.
              </p>
              <div className="h-3 rounded-full bg-white border-2 border-nau mt-2.5 overflow-hidden">
                <div className="h-full bg-cam" style={{ width: `${Math.min(100, chal ? (revenue / chal) * 100 : 0)}%` }} />
              </div>
              <p className="text-xs text-nau mt-1">
                {fmt(revenue)} · {chal ? Math.round((revenue / chal) * 100) : 0}% thử thách{revenue >= chal && chal > 0 ? ' 🎉 Đã vượt thử thách!' : ''}
              </p>
            </div>
          </Card>

          {/* 2. Doanh thu */}
          <Card className="p-4">
            <h2 className="font-heading font-bold text-lg mb-3">2. Doanh thu thực thu trong tháng</h2>
            <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-kem-deep">
              {[['rev', 'Nhập doanh thu'], ['course', 'Chọn khóa và số lượng']].map(([k, label]) => (
                <button key={k} onClick={() => setTab(k)} className={`h-11 rounded-lg text-sm font-semibold ${tab === k ? 'bg-white shadow-card' : 'text-nau'}`}>{label}</button>
              ))}
            </div>

            {tab === 'rev' ? (
              <label className="block mt-3">
                <span className="text-sm font-semibold">Doanh thu thực thu (đồng)</span>
                <input className="field mt-1 text-lg font-bold max-w-sm" inputMode="numeric" placeholder="Ví dụ 30.000.000" value={fmtInput(rev)} onChange={(e) => setRev(digits(e.target.value))} />
              </label>
            ) : (
              <div className="mt-3 space-y-3">
                {courses.map((c) => (
                  <div key={c.id} className="rounded-xl border border-kem-deep p-3 flex flex-wrap items-center gap-3">
                    <div className="flex-1 min-w-[200px]">
                      <p className="font-semibold">{c.name}</p>
                      <p className="text-xs text-nau">Thực thu mỗi khóa (sửa nếu có ưu đãi)</p>
                      <input
                        className="field mt-1 h-10 max-w-[180px]"
                        inputMode="numeric"
                        value={fmtInput(priceOf(c))}
                        onChange={(e) => setPrice({ ...price, [c.id]: digits(e.target.value) })}
                      />
                    </div>
                    <div className="inline-flex items-center rounded-xl border border-kem-deep bg-kem">
                      <button className="h-11 w-11 grid place-items-center" aria-label="Giảm" onClick={() => setQty({ ...qty, [c.id]: Math.max(0, (qty[c.id] || 0) - 1) })}><Minus className="w-4 h-4" /></button>
                      <span className="w-10 text-center font-heading font-extrabold text-xl">{qty[c.id] || 0}</span>
                      <button className="h-11 w-11 grid place-items-center" aria-label="Tăng" onClick={() => setQty({ ...qty, [c.id]: (qty[c.id] || 0) + 1 })}><Plus className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
                <p className="text-sm text-nau">Tổng doanh thu: <b className="text-cara">{fmt(revenue)}</b></p>
              </div>
            )}
            <button onClick={reset} className="mt-3 text-sm font-semibold text-nau hover:text-cara underline underline-offset-2">Xóa hết số đã nhập</button>
          </Card>

          {/* 3. Bảng tỷ lệ */}
          <Card className="p-4">
            <h2 className="font-heading font-bold text-lg mb-3">3. Bảng tỷ lệ hoa hồng và thưởng</h2>
            <div className="overflow-hidden rounded-xl border border-kem-deep text-sm">
              {[
                ['Dưới 80%', '0%', 'Hưởng lương cứng'],
                ['80% đến 90%', '4%', '-'],
                ['91% đến dưới 100%', '5%', '-'],
                ['Từ 100%', '5%', '2.000.000đ'],
                ['Từ 120%', '5%', '5.000.000đ'],
              ].map((r, i) => (
                <div key={r[0]} className={`grid grid-cols-[1.4fr_.6fr_1fr] gap-2 px-3 py-2.5 ${i === 0 ? '' : 'border-t border-kem-deep'} ${R.tier.startsWith(r[0].split(' ')[0]) && false ? 'bg-cam-soft' : ''}`}>
                  <span className="font-semibold">{r[0]}</span><span>{r[1]}</span><span className="text-nau">{r[2]}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-nau mt-2">Hoa hồng tính trên toàn bộ doanh thu thực thu. Thưởng 2tr và 5tr không cộng dồn.</p>
          </Card>
        </div>

        {/* Kết quả */}
        <aside id="kpi-summary" className="scroll-mt-20 mt-5 xl:mt-0 xl:sticky xl:top-6 xl:max-h-[calc(100vh-3rem)] xl:overflow-y-auto xl:pr-1 grid gap-3 md:grid-cols-2 xl:grid-cols-1 items-start">
          <div className="rounded-2xl bg-cara text-kem p-5 relative overflow-hidden">
            <div className="absolute -right-8 -top-10 h-28 w-28 rounded-full bg-cam" />
            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-wider text-pas">{salary > 0 ? 'Tổng thu nhập tháng' : 'Thu nhập thêm'}</p>
              <p className="font-heading font-extrabold text-4xl mt-1">{fmt(salary + R.total)}</p>
              <dl className="mt-4 pt-4 border-t border-white/15 space-y-3">
                {salary > 0 && (
                  <div className="flex items-baseline justify-between gap-3">
                    <dt className="text-kem/85">Lương cứng</dt>
                    <dd className="font-heading font-extrabold text-xl text-pas">{fmt(salary)}</dd>
                  </div>
                )}
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-kem/85">
                    Hoa hồng
                    <span className="block text-xs text-kem/65">{(R.rate * 100).toFixed(0)}% trên {fmt(revenue)}</span>
                  </dt>
                  <dd className="font-heading font-extrabold text-xl text-pas">{fmt(R.comm)}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-kem/85">Thưởng</dt>
                  <dd className="font-heading font-extrabold text-xl text-pas">{fmt(R.bonus)}</dd>
                </div>
              </dl>
            </div>
          </div>

          <Card className="p-4">
            <p className="text-sm text-nau">Bạn đang ở mức</p>
            <p className="font-heading font-bold">{R.tier}</p>
            <p className="font-heading font-extrabold text-3xl text-cara">{pct}% KPI</p>
            <div className="relative h-4 rounded-full bg-kem border-2 border-nau mt-3 mb-7">
              <div className="h-full rounded-full" style={{ width: `${Math.min(100, (R.pct / BAR_MAX) * 100)}%`, background: 'linear-gradient(90deg,#fbc278,#ee7d12)' }} />
              {MARKS.map(([m, label]) => (
                <div key={label} className="absolute -top-1 -bottom-1 border-l-2 border-dashed border-nau" style={{ left: `${(m / BAR_MAX) * 100}%` }}>
                  <span className="absolute top-6 -left-3.5 text-[11px] font-bold">{label}</span>
                </div>
              ))}
            </div>
            <p className="text-sm">
              {next ? (<>Còn thiếu <b>{fmt(need)}</b> để lên mốc <b>{next[1]}</b>.</>) : (<span className="inline-flex items-center gap-1.5"><Trophy className="w-4 h-4 text-cam" /> Bạn đã vượt mốc cao nhất. Tuyệt vời!</span>)}
            </p>
            {next && need > 0 && (
              <div className="mt-3 rounded-xl bg-cam-soft/70 p-3 text-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-cam-dark mb-1.5">Gợi ý để lên mốc {next[1]}</p>
                <ul className="space-y-1">
                  {courses.map((c) => (
                    <li key={c.id} className="flex justify-between gap-3">
                      <span>Chỉ chốt {c.short}</span><b>{Math.ceil(need / c.list)} khóa</b>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>

          <Card className="p-4">
            <h3 className="font-heading font-bold mb-2">Nếu chốt thêm 1 khóa</h3>
            {courses.map((c) => (
              <div key={c.id} className="flex justify-between gap-3 text-sm py-1.5">
                <span>{c.name}</span><b className="text-ok whitespace-nowrap">+{fmt(incAfter(c))}</b>
              </div>
            ))}
            <p className="text-xs text-nau mt-1">Tính theo giá niêm yết, so với thu nhập hiện tại ở trên (kể cả khi chốt thêm giúp vượt mốc).</p>
          </Card>

          <p className="text-xs text-nau flex gap-2 px-1"><Info className="w-4 h-4 shrink-0 mt-0.5" /> Số bạn nhập lưu trên máy này. Giai đoạn sau sẽ đồng bộ với Google Sheet của team.</p>
        </aside>
      </div>

      {/* Chừa chỗ và thanh cố định: dù đang ở đâu Sales cũng thấy doanh thu và tỷ lệ KPI */}
      <div className="h-40 xl:hidden" />
      <div className={`xl:hidden fixed inset-x-0 lg:left-64 z-30 px-3 bottom-[calc(4rem+env(safe-area-inset-bottom))] lg:bottom-3 transition-transform duration-150 ${typing ? 'translate-y-[140%]' : ''}`}>
        <button
          onClick={() => document.getElementById('kpi-summary')?.scrollIntoView({ behavior: 'smooth' })}
          className="block w-full max-w-6xl mx-auto bg-cara text-kem rounded-2xl shadow-pop px-4 pt-2.5 pb-3 text-left"
          aria-label="Xem chi tiết KPI và thu nhập"
        >
          <span className="flex items-end justify-between gap-3">
            <span className="min-w-0">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-pas">Doanh thu · KPI {fmtShort(kpi)}</span>
              <span className="block font-heading font-extrabold text-xl leading-tight truncate">{fmt(revenue)}</span>
            </span>
            <span className="text-right shrink-0">
              <span className="block font-heading font-extrabold text-2xl leading-none">{pct}%</span>
            </span>
          </span>
          <span className="relative block h-2 rounded-full bg-white/20 mt-2 overflow-hidden">
            <span className="block h-full rounded-full bg-cam" style={{ width: `${Math.min(100, (R.pct / BAR_MAX) * 100)}%` }} />
            {MARKS.map(([m]) => (
              <span key={m} className="absolute top-0 bottom-0 w-px bg-white/50" style={{ left: `${(m / BAR_MAX) * 100}%` }} />
            ))}
          </span>
          <span className="grid grid-cols-4 gap-1 mt-3 text-center">
            {[['Lương cứng', salary], ['Hoa hồng', R.comm], ['Thưởng', R.bonus], ['Tổng', salary + R.total]].map(([label, val], i) => (
              <span key={label} className={`block rounded-lg px-1 py-1.5 ${i === 3 ? 'bg-white/15' : ''}`}>
                <span className="block text-[10px] leading-tight text-kem/75">{label}</span>
                <span className="block font-heading font-extrabold text-[15px] leading-tight text-pas whitespace-nowrap">{trieu(val)}</span>
              </span>
            ))}
          </span>
        </button>
      </div>
    </div>
  );
}
