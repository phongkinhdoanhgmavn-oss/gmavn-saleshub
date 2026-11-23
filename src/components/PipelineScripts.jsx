import { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Copy, ChevronDown, ArrowRight, Info, Check, SlidersHorizontal, ChevronsUpDown, ChevronsDownUp, TriangleAlert, Ban, CornerDownRight } from 'lucide-react';
import SalesPicker from './SalesPicker';
import { useSalesInfo } from '../lib/sales';
import { useCopy } from '../lib/ui';
import { maskDate, weekdayOf } from '../lib/format';
import { trialTimes, TRIAL_BRANCHES } from '../data/messageTemplates';
import { PIPELINE, COURSES, QUOTE_TO_COURSE, QUICK_FACTS, CHOOSE_COURSE } from '../data/pipelineScripts';

// Khu Kịch bản Pipeline dùng tông màu xanh ngọc riêng (kb) để tách khỏi phần còn lại của Kho.
// Thông tin phụ huynh chỉ giữ trong bộ nhớ khi app đang mở, không lưu xuống máy.
let draft = { role: '', parent: '', kid: '', branch: '', date: '', time: '', slots: '5', course: '' };

function lastCourse() {
  try {
    const q = JSON.parse(localStorage.getItem('last_quote') || 'null');
    return q?.ids?.map((x) => QUOTE_TO_COURSE[x]).find(Boolean) || '';
  } catch { return ''; }
}

/** Thay {khóa} bằng thông tin đã nhập. Chỗ chưa nhập hiện [ngoặc vuông] để Sales biết cần điền. */
function makeFill(f, sales) {
  const name = f.parent.trim();
  const goi = f.role && name ? `${f.role} ${name}` : f.role ? `${f.role} [Tên]` : name ? `Ba/Mẹ ${name}` : '[Ba/Mẹ + tên]';
  const tm = trialTimes(f.time);
  const day = weekdayOf(f.date);
  const branch = TRIAL_BRANCHES.find((b) => b.id === f.branch);
  const map = {
    goi,
    be: f.kid.trim() || '[Tên bé]',
    xung: sales.title || 'Cô',
    sales: sales.label || '[Cô/Thầy + tên]',
    tensales: sales.name || '[tên]',
    sdt: sales.phone || '[SĐT]',
    coso: branch ? branch.label.replace('Cơ sở ', '') : '[Hà Đông/Cầu Giấy]',
    ngay: day ? `${day}, ${f.date}` : '[ngày]',
    gio: tm ? `${tm.start} - ${tm.end}` : '[giờ]',
    gioden: tm ? tm.arrive : '[giờ đến]',
    suat: f.slots.trim() || '[số suất]',
  };
  return (text) => text.replace(/\{(\w+)\}/g, (m, k) => (k in map ? map[k] : m));
}

function Highlighted({ text }) {
  return text.split('\n').map((line, i) => (
    <p key={i} className={line.startsWith('- ') || line.startsWith('• ') ? 'pl-3' : ''}>
      {line.split(/(\[[^\]]+\])/).map((part, j) =>
        part.startsWith('[') ? <mark key={j} className="rounded bg-kb-soft px-1 text-kb-dark font-semibold">{part}</mark> : <span key={j}>{part}</span>,
      )}
    </p>
  ));
}

const toggleIn = (arr, v) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

export default function PipelineScripts() {
  const copy = useCopy();
  const sales = useSalesInfo();
  const [f, setF] = useState(draft);
  useEffect(() => { draft = f; }, [f]);
  const set = (k) => (v) => setF((p) => ({ ...p, [k]: v }));
  useEffect(() => { if (!f.course) setF((p) => ({ ...p, course: lastCourse() || 'mmh12' })); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Mở vào là thu hết, bấm mới phóng
  const [setup, setSetup] = useState(false);
  const [facts, setFacts] = useState(false);
  const [openStages, setOpenStages] = useState([]);
  const [openItems, setOpenItems] = useState([]);
  const [view, setView] = useState({}); // bước nào đang xem tab nào: qa (câu hỏi) hoặc msg (tin nhắn mẫu)
  const allOpen = openStages.length === PIPELINE.length;

  const fill = useMemo(() => makeFill(f, { title: sales.info.title, name: sales.info.name.trim(), label: sales.label, phone: sales.phone }), [f, sales.info.title, sales.info.name, sales.label, sales.phone]);
  const course = f.course || 'mmh12';
  const courseLabel = COURSES.find((c) => c.id === course).label;
  const tm = trialTimes(f.time);
  const ready = !!(sales.label && sales.phone && f.role && f.parent.trim());

  return (
    <div className="space-y-3">
      {/* Thiết lập: thu gọn, tóm tắt một dòng */}
      <div className={`rounded-2xl border-2 bg-white overflow-hidden ${setup ? 'border-kb' : 'border-kb/40'}`}>
        <button onClick={() => setSetup(!setup)} aria-expanded={setup} className="w-full min-h-16 px-3.5 py-2.5 flex items-center gap-3 text-left">
          <span className="h-10 w-10 rounded-xl bg-kb-soft text-kb-dark grid place-items-center shrink-0"><SlidersHorizontal className="w-5 h-5" /></span>
          <span className="flex-1 min-w-0">
            <span className="block font-heading font-bold leading-tight">Thông tin điền vào kịch bản</span>
            <span className={`block text-sm truncate ${ready ? 'text-kb-dark font-semibold' : 'text-nau'}`}>
              {ready ? `${sales.label} · ${fill('{goi}')}${f.kid.trim() ? ` · bé ${f.kid.trim()}` : ''} · ${courseLabel}` : 'Chạm để chọn người tư vấn, xưng hô và tên phụ huynh'}
            </span>
          </span>
          <ChevronDown className={`w-5 h-5 text-nau shrink-0 transition-transform ${setup ? 'rotate-180' : ''}`} />
        </button>

        {setup && (
          <div className="px-3.5 pb-4 pt-1 space-y-4 border-t border-kb/20">
            <p className="text-sm text-nau pt-2">Chọn người tư vấn, nhập xưng hô và tên phụ huynh để kịch bản ra luôn câu hoàn chỉnh. Chỗ còn <mark className="rounded bg-kb-soft px-1 text-kb-dark font-semibold">[ngoặc vuông]</mark> là phần cần điền thêm.</p>

            <SalesPicker caption="Người tư vấn (tên và số điện thoại trong kịch bản)" />

            <div className="rounded-2xl border border-kem-deep p-3.5 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-heading font-bold">Phụ huynh và bé</h3>
                <span className="text-xs font-bold rounded-full bg-kb-soft text-kb-dark px-2.5 py-1 max-w-[60%] truncate">Đang gọi: {fill('{goi}')}</span>
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-3 items-end">
                <div>
                  <span className="text-sm font-semibold block">Xưng hô</span>
                  <div className="mt-1 grid grid-cols-2 gap-1 p-1 rounded-xl bg-kem-deep" role="radiogroup" aria-label="Xưng hô với phụ huynh">
                    {['Ba', 'Mẹ'].map((r) => (
                      <button key={r} role="radio" aria-checked={f.role === r} onClick={() => set('role')(r)}
                        className={`h-10 px-5 rounded-lg text-sm font-semibold ${f.role === r ? 'bg-kb text-white shadow-card' : 'text-nau'}`}>{r}</button>
                    ))}
                  </div>
                </div>
                <label className="block min-w-0"><span className="text-sm font-semibold">Tên phụ huynh</span>
                  <input className="field mt-1" value={f.parent} onChange={(e) => set('parent')(e.target.value)} placeholder="Chỉ tên, ví dụ Lan" autoComplete="off" /></label>
              </div>
              <label className="block"><span className="text-sm font-semibold">Tên bé <span className="font-normal text-nau">(không bắt buộc)</span></span>
                <input className="field mt-1" value={f.kid} onChange={(e) => set('kid')(e.target.value)} placeholder="Ví dụ: Minh Anh" autoComplete="off" /></label>
              <p className="text-xs text-nau">Gợi ý: chọn Mẹ và nhập Lan thì kịch bản ghi "Mẹ Lan". Đổi lúc nào kịch bản đổi theo lúc đó.</p>
            </div>

            <div className="rounded-2xl border border-kem-deep p-3.5 space-y-3">
              <h3 className="font-heading font-bold">Thông tin Trial <span className="text-sm font-normal text-nau">(không bắt buộc, điền thì tin ra sẵn)</span></h3>
              <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-kem-deep" role="radiogroup" aria-label="Cơ sở Trial Offline">
                {TRIAL_BRANCHES.map((b) => (
                  <button key={b.id} role="radio" aria-checked={f.branch === b.id} onClick={() => set('branch')(f.branch === b.id ? '' : b.id)}
                    className={`min-h-10 rounded-lg text-sm font-semibold ${f.branch === b.id ? 'bg-kb text-white shadow-card' : 'text-nau'}`}>{b.label}</button>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3">
                <label className="block col-span-2 sm:col-span-1"><span className="text-sm font-semibold">Ngày Trial</span>
                  <input className="field mt-1" inputMode="numeric" maxLength={10} placeholder="29/11/2026" autoComplete="off" value={f.date} onChange={(e) => set('date')(maskDate(e.target.value))} /></label>
                <label className="block"><span className="text-sm font-semibold">Giờ bắt đầu</span>
                  <input className="field mt-1" placeholder="9h00" autoComplete="off" value={f.time} onChange={(e) => set('time')(e.target.value.replace(/[^0-9hHgG:giờ ]/g, ''))} /></label>
                <label className="block"><span className="text-sm font-semibold">Số suất còn</span>
                  <input className="field mt-1" inputMode="numeric" value={f.slots} onChange={(e) => set('slots')(e.target.value.replace(/\D/g, '').slice(0, 2))} /></label>
              </div>
              {f.time && (tm
                ? <p className="text-sm rounded-xl bg-kb-soft px-3 py-2">Buổi {tm.start} - {tm.end}. Giờ đến: <b className="text-kb-dark">{tm.arrive}</b>.</p>
                : <p className="text-sm text-bad">Giờ chưa đúng, nhập dạng 9h00 hoặc 14:00.</p>)}
            </div>

            <div>
              <p className="text-sm font-semibold mb-1.5">Khóa Ba Mẹ quan tâm</p>
              <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-kem-deep" role="radiogroup" aria-label="Khóa học">
                {COURSES.map((c) => (
                  <button key={c.id} role="radio" aria-checked={course === c.id} onClick={() => set('course')(c.id)}
                    className={`min-h-11 rounded-lg text-sm font-semibold px-1 leading-tight ${course === c.id ? 'bg-kb text-white shadow-card' : 'text-nau'}`}>{c.label}</button>
                ))}
              </div>
            </div>
            <button onClick={() => setSetup(false)} className="w-full h-11 rounded-xl bg-kb text-white font-bold">Xong, xem kịch bản</button>
          </div>
        )}
      </div>

      {/* Thông tin cần nhớ */}
      <div className="rounded-2xl border border-kem-deep bg-white overflow-hidden">
        <button onClick={() => setFacts(!facts)} aria-expanded={facts} className="w-full min-h-12 px-3.5 flex items-center gap-2.5 text-left">
          <Info className="w-5 h-5 text-kb shrink-0" />
          <span className="flex-1 font-semibold">Thông tin cần nhớ: Trial, mốc đo, quy tắc</span>
          <ChevronDown className={`w-5 h-5 text-nau transition-transform ${facts ? 'rotate-180' : ''}`} />
        </button>
        {facts && (
          <ul className="px-3.5 pb-3.5 space-y-1.5 text-[15px] border-t border-kem-deep pt-3">
            {QUICK_FACTS.map((t) => <li key={t} className="flex gap-2"><Check className="w-4 h-4 text-kb shrink-0 mt-1" /> <span><Highlighted text={fill(t)} /></span></li>)}
          </ul>
        )}
      </div>

      {/* Nút thu phóng tất cả các bước */}
      <button onClick={() => { if (allOpen) { setOpenStages([]); setOpenItems([]); } else setOpenStages(PIPELINE.map((s) => s.n)); }}
        className="w-full h-12 rounded-2xl bg-kb text-white font-bold inline-flex items-center justify-center gap-2 shadow-card">
        {allOpen ? <><ChevronsDownUp className="w-5 h-5" /> Thu gọn tất cả các bước</> : <><ChevronsUpDown className="w-5 h-5" /> Mở tất cả các bước</>}
      </button>

      {/* 6 bước Pipeline: thu gọn, bấm để mở */}
      {PIPELINE.map((st) => {
        const open = openStages.includes(st.n);
        const hasCourse = st.items.some((it) => it.byCourse) || st.qa.some((q) => typeof q.say === 'object');
        const tab = view[st.n] || 'qa';
        return (
          <section key={st.n} className={`rounded-2xl border-2 bg-white overflow-hidden ${open ? 'border-kb shadow-card' : 'border-kb/30'}`}>
            <button onClick={() => setOpenStages((o) => toggleIn(o, st.n))} aria-expanded={open}
              className={`w-full min-h-16 px-3.5 py-2.5 flex items-center gap-3 text-left ${open ? 'bg-kb-deep text-white' : 'bg-kb-soft text-kb-dark'}`}>
              <span className={`h-10 w-10 rounded-full grid place-items-center font-heading font-extrabold text-lg shrink-0 ${open ? 'bg-white text-kb-deep' : 'bg-kb text-white'}`}>{st.n}</span>
              <span className="flex-1 min-w-0">
                <span className="block font-heading font-extrabold leading-tight">{st.title}</span>
                <span className={`block text-sm leading-tight ${open ? 'text-white/80' : 'text-kb-dark/80'}`}>{st.short}</span>
              </span>
              <span className={`text-xs font-bold rounded-full px-2 py-0.5 ${open ? 'bg-white/20' : 'bg-white/70'}`}>{st.items.length}</span>
              <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && (
              <div className="p-3 space-y-2.5">
                <p className="text-[15px] leading-relaxed text-cara">{st.goal}</p>

                {hasCourse && (
                  <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-kem-deep" role="radiogroup" aria-label="Khóa học">
                    {COURSES.map((c) => (
                      <button key={c.id} role="radio" aria-checked={course === c.id} onClick={() => set('course')(c.id)}
                        className={`min-h-10 rounded-lg text-xs sm:text-sm font-semibold px-1 leading-tight ${course === c.id ? 'bg-kb text-white shadow-card' : 'text-nau'}`}>{c.label}</button>
                    ))}
                  </div>
                )}

                {st.showChooseCourse && (
                  <div className="rounded-xl border border-kb/30 bg-kb-soft/50 p-3 space-y-2 text-sm">
                    <p className="font-heading font-bold text-kb-dark">Chọn khóa nào</p>
                    {CHOOSE_COURSE.map((c) => (
                      <div key={c.course} className="rounded-lg bg-white p-2.5">
                        <p className="font-bold">{c.course}</p>
                        <p className="text-nau">Hợp khi: {c.fit}</p>
                        <p className="mt-1">{c.point}</p>
                      </div>
                    ))}
                  </div>
                )}

                {st.notes && (
                  <ul className="rounded-xl border border-kb/30 bg-kb-soft/50 p-3 space-y-1.5 text-[15px]">
                    {st.notes.map((t) => <li key={t} className="flex gap-2"><Info className="w-4 h-4 text-kb shrink-0 mt-1" /> <span>{t}</span></li>)}
                  </ul>
                )}

                <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-kem-deep" role="tablist" aria-label="Nội dung của bước">
                  {[['qa', `Câu hỏi và cách trả lời (${st.qa.length})`], ['msg', `Tin nhắn mẫu (${st.items.length})`]].map(([k, label]) => (
                    <button key={k} role="tab" aria-selected={tab === k} onClick={() => setView((v) => ({ ...v, [st.n]: k }))}
                      className={`min-h-11 rounded-lg text-sm font-semibold px-1 leading-tight ${tab === k ? 'bg-white shadow-card text-kb-dark' : 'text-nau'}`}>{label}</button>
                  ))}
                </div>

                {tab === 'qa' && st.qa.map((qa) => {
                  const key = `${st.n}-${qa.id}`;
                  const itemOpen = openItems.includes(key);
                  const say = fill(typeof qa.say === 'string' ? qa.say : qa.say[course]);
                  const ph = qa.who === 'ph';
                  return (
                    <article key={key} className={`rounded-xl border bg-white ${itemOpen ? 'border-kb/60' : 'border-kem-deep'}`}>
                      <div className="flex items-stretch">
                        <button onClick={() => setOpenItems((o) => toggleIn(o, key))} aria-expanded={itemOpen}
                          className="flex-1 min-w-0 min-h-14 pl-3 pr-1 py-2 flex items-center gap-2.5 text-left">
                          <span className={`text-[11px] font-bold rounded-md px-1.5 py-0.5 shrink-0 ${ph ? 'bg-kb-soft text-kb-dark' : 'bg-cam-soft text-cam-dark'}`}>{ph ? 'Ba Mẹ hỏi' : 'Cô hỏi'}</span>
                          <span className="min-w-0 flex-1">
                            <span className="block font-semibold leading-snug">{ph ? `“${qa.q}”` : qa.q}</span>
                            {qa.verify && <span className="block text-[11px] font-bold text-cam-dark leading-tight mt-0.5">Cần xác nhận</span>}
                          </span>
                          <ChevronDown className={`w-5 h-5 text-nau shrink-0 transition-transform ${itemOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <button onClick={() => copy(say, 'Đã copy câu trả lời')} aria-label="Copy câu trả lời" title="Copy luôn, không cần mở"
                          className="w-12 shrink-0 grid place-items-center text-kb-dark border-l border-kem-deep active:bg-kb-soft rounded-r-xl">
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                      {itemOpen && (
                        <div className="px-3 pb-3 space-y-2.5">
                          {typeof qa.say === 'object' && <p className="text-xs font-bold text-kb-dark">Bản cho {courseLabel}</p>}
                          <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-kb-dark mb-1">{ph ? 'Cô trả lời' : 'Cô hỏi'}</p>
                            <div className="rounded-lg bg-kem p-3 text-[15px] leading-relaxed space-y-1.5"><Highlighted text={say} /></div>
                            <button className="mt-2 h-11 px-4 rounded-xl bg-kb text-white font-bold inline-flex items-center gap-2" onClick={() => copy(say, 'Đã copy câu trả lời')}><Copy className="w-4 h-4" /> Copy</button>
                          </div>
                          {qa.points?.length > 0 && (
                            <div>
                              <p className="text-xs font-bold uppercase tracking-wider text-nau mb-1">Ý chính để nắm</p>
                              <ul className="space-y-1 text-[15px]">
                                {qa.points.map((t) => <li key={t} className="flex gap-2"><Check className="w-4 h-4 text-kb shrink-0 mt-1" /> <span>{t}</span></li>)}
                              </ul>
                            </div>
                          )}
                          {qa.avoid && (
                            <div className="rounded-lg border border-bad/30 bg-[#fdecee] p-2.5 text-sm flex gap-2"><Ban className="w-4 h-4 text-bad shrink-0 mt-0.5" /> <span><b className="text-bad">Tránh:</b> {qa.avoid}</span></div>
                          )}
                          {qa.next && (
                            <div className="rounded-lg bg-kb-soft p-2.5 text-sm flex gap-2">
                              <CornerDownRight className="w-4 h-4 text-kb-dark shrink-0 mt-0.5" />
                              <span className="flex-1"><b className="text-kb-dark">Hỏi tiếp:</b> <Highlighted text={fill(qa.next)} /></span>
                              <button onClick={() => copy(fill(qa.next), 'Đã copy câu hỏi tiếp')} aria-label="Copy câu hỏi tiếp" className="h-9 w-9 shrink-0 grid place-items-center rounded-lg text-kb-dark"><Copy className="w-4 h-4" /></button>
                            </div>
                          )}
                          {qa.verify && (
                            <div className="rounded-lg border border-pas bg-cam-soft p-2.5 text-sm flex gap-2"><TriangleAlert className="w-4 h-4 text-cam-dark shrink-0 mt-0.5" /> <span><b>Cần xác nhận:</b> {qa.verify}</span></div>
                          )}
                        </div>
                      )}
                    </article>
                  );
                })}

                {tab === 'msg' && st.items.map((it) => {
                  const key = `${st.n}-${it.id}`;
                  const itemOpen = openItems.includes(key);
                  const text = fill(it.text ?? it.byCourse[course]);
                  return (
                    <article key={key} className={`rounded-xl border bg-white ${itemOpen ? 'border-kb/60' : 'border-kem-deep'}`}>
                      <div className="flex items-stretch">
                        <button onClick={() => setOpenItems((o) => toggleIn(o, key))} aria-expanded={itemOpen}
                          className="flex-1 min-w-0 min-h-14 pl-3 pr-1 py-2 flex items-center gap-2.5 text-left">
                          <span className="text-xs font-bold rounded-md bg-kb-soft text-kb-dark px-1.5 py-0.5 shrink-0">{it.id}</span>
                          <span className="min-w-0 flex-1">
                            <span className="block font-semibold leading-snug">{it.title}</span>
                            {it.when && <span className="block text-xs text-nau leading-tight">{it.when}</span>}
                          </span>
                          <ChevronDown className={`w-5 h-5 text-nau shrink-0 transition-transform ${itemOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <button onClick={() => copy(text, 'Đã copy kịch bản')} aria-label={`Copy ${it.title}`} title="Copy luôn, không cần mở"
                          className="w-12 shrink-0 grid place-items-center text-kb-dark border-l border-kem-deep active:bg-kb-soft rounded-r-xl">
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                      {itemOpen && (
                        <div className="px-3 pb-3 space-y-2.5">
                          {it.byCourse && <p className="text-xs font-bold text-kb-dark">Bản cho {courseLabel}</p>}
                          <div className="rounded-lg bg-kem p-3 text-[15px] leading-relaxed space-y-1.5">
                            <Highlighted text={text} />
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <button className="h-11 px-4 rounded-xl bg-kb text-white font-bold inline-flex items-center gap-2" onClick={() => copy(text, 'Đã copy kịch bản')}><Copy className="w-4 h-4" /> Copy</button>
                            {it.link && (
                              <Link to={it.link.to} className="inline-flex items-center gap-1.5 h-11 px-3.5 rounded-xl bg-kb-soft text-kb-dark text-sm font-bold">
                                {it.link.label} <ArrowRight className="w-4 h-4" />
                              </Link>
                            )}
                          </div>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
