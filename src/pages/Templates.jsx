import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Receipt, CalendarClock, CalendarCheck, Copy, RotateCcw, Check, AlertCircle, Wand2, Plus, User, Minus } from 'lucide-react';
import { fmtNum, maskDate, isValidDate, todayVN, weekdayOf } from '../lib/format';
import { useSalesInfo } from '../lib/sales';
import { PageHeader, Card, useCopy, useToast, useTyping } from '../lib/ui';
import { COURSE_OPTIONS, TAG_PEOPLE, MESSAGE_TEMPLATES, TRIAL_BRANCHES, buildMessage, missingFields, buildTrialMessage, missingTrial, trialTimes } from '../data/messageTemplates';

const ICONS = { Receipt, CalendarClock, CalendarCheck };
// Mẫu gửi riêng cho phụ huynh nằm cạnh 2 mẫu gửi nhóm nội bộ
const TRIAL_TAB = { id: 'trial', icon: 'CalendarCheck', title: 'Xác nhận Phụ huynh tới Trial Offline', group: 'Nhắn riêng cho Phụ huynh' };
const TABS = [...MESSAGE_TEMPLATES, TRIAL_TAB];
const digits = (s) => String(s).replace(/\D/g, '');

// Thông tin học viên là dữ liệu cá nhân: chỉ giữ trong bộ nhớ khi app đang mở (không lưu xuống máy).
const defaultTagMap = () => Object.fromEntries(MESSAGE_TEMPLATES.map((t) => [t.id, t.defaultTags]));
let draft = { form: { regDate: todayVN() }, tagMap: defaultTagMap(), tpl: MESSAGE_TEMPLATES[0].id };

function readLastQuote() {
  try { return JSON.parse(localStorage.getItem('last_quote') || 'null'); } catch { return null; }
}

function Field({ f, value, onChange, disabled }) {
  const base = 'field';
  const label = (
    <span className="text-sm font-semibold flex items-start gap-1">
      <span>{f.label}{f.type === 'date' && <span className="font-normal text-nau"> (ngày/tháng/năm)</span>}</span>
      {f.required && <span className="text-bad" aria-hidden="true">*</span>}
    </span>
  );
  let control;
  if (f.type === 'money') {
    control = (
      <input
        className={base} inputMode="numeric" placeholder={f.placeholder} disabled={disabled}
        value={value ? fmtNum(value) : ''}
        onChange={(e) => onChange(digits(e.target.value))}
      />
    );
  } else if (f.type === 'date') {
    // Ô ngày tự định dạng ngày/tháng/năm bằng số, không dùng lịch của trình duyệt (tránh hiện "Nov" bằng tiếng Anh)
    const bad = (value || '').length === 10 && !isValidDate(value);
    control = (
      <span className="block">
        <span className="flex gap-2">
          <input
            className={`${base} ${bad ? 'border-bad focus:border-bad focus:ring-bad/25' : ''}`}
            inputMode="numeric" autoComplete="off" maxLength={10} placeholder="22/11/2026" aria-invalid={bad}
            value={value || ''} onChange={(e) => onChange(maskDate(e.target.value))} disabled={disabled}
          />
          {f.key === 'regDate' && (
            <button type="button" onClick={() => onChange(todayVN())} className="h-11 px-3.5 shrink-0 rounded-xl bg-cam-soft text-cam-dark text-sm font-semibold">Hôm nay</button>
          )}
        </span>
        {bad && <span className="block text-xs text-bad mt-1">Ngày chưa đúng, nhập theo dạng ngày/tháng/năm, ví dụ 22/11/2026.</span>}
      </span>
    );
  } else if (f.type === 'textarea') {
    control = (
      <textarea
        className="w-full min-h-36 rounded-xl border border-kem-deep bg-white px-3.5 py-3 text-base text-cara placeholder:text-nau-soft/70 focus:border-cam focus:outline-none focus:ring-2 focus:ring-cam/25"
        placeholder={f.placeholder} value={value || ''} onChange={(e) => onChange(e.target.value)}
      />
    );
  } else if (f.type === 'chips') {
    const picked = (value || '').split(', ').filter(Boolean);
    const toggle = (o) => onChange((prev) => {
      const cur = (prev || '').split(', ').filter(Boolean);
      return (cur.includes(o) ? cur.filter((x) => x !== o) : [...cur, o]).sort((a, b) => f.options.indexOf(a) - f.options.indexOf(b)).join(', ');
    });
    control = (
      <span className="flex flex-wrap gap-2 mt-1">
        {f.options.map((o) => {
          const on = picked.includes(o);
          return (
            <button key={o} type="button" onClick={() => toggle(o)} aria-pressed={on}
              className={`h-11 px-3.5 rounded-full text-sm font-semibold border ${on ? 'bg-cara text-kem border-cara' : 'bg-white text-cara border-kem-deep'}`}>
              {o}
            </button>
          );
        })}
      </span>
    );
  } else {
    control = (
      <input
        className={base} placeholder={f.placeholder} value={value || ''}
        type={f.type === 'email' ? 'email' : f.type === 'tel' ? 'tel' : 'text'}
        inputMode={f.type === 'tel' ? 'tel' : f.type === 'email' ? 'email' : undefined}
        autoComplete="off" onChange={(e) => onChange(f.type === 'tel' ? e.target.value.replace(/[^0-9+ .]/g, '') : e.target.value)}
      />
    );
  }
  return (
    <label className={`block ${f.wide || f.type === 'textarea' ? 'sm:col-span-2' : ''}`}>
      {label}
      <span className={f.type === 'chips' ? 'block' : 'block mt-1'}>{control}</span>
    </label>
  );
}

function StaffTemplates({ tplId }) {
  const copy = useCopy();
  const toast = useToast();
  const typing = useTyping();
  const [form, setForm] = useState(draft.form);
  const [tagMap, setTagMap] = useState(draft.tagMap);
  useEffect(() => { draft = { form, tagMap, tpl: tplId }; }, [form, tagMap, tplId]);

  const tpl = MESSAGE_TEMPLATES.find((t) => t.id === tplId);
  const tags = tagMap[tplId];
  const isAccounting = tpl.id === 'ketoan';
  // Trả một lần: Trả lần 1 = Học phí, bỏ qua lần 2
  const eff = useMemo(() => (form.payOnce ? { ...form, pay1: form.fee } : form), [form]);
  const fields = tpl.fields.filter((f) => !(form.payOnce && (f.key === 'pay2' || f.key === 'date2')));
  const missing = missingFields(tpl, eff);
  const message = useMemo(() => buildMessage(tpl, eff, tags), [tpl, eff, tags]);
  // v có thể là giá trị hoặc hàm (giá trị cũ) => giá trị mới, để bấm liên tiếp nhiều lựa chọn không bị mất
  const set = (k) => (v) => setForm((p) => ({ ...p, [k]: typeof v === 'function' ? v(p[k]) : v }));
  const lastQuote = readLastQuote();

  const fillFromQuote = () => {
    const course = COURSE_OPTIONS.find((c) => lastQuote?.ids?.some((id) => c.quoteIds.includes(id)));
    setForm((p) => ({ ...p, ...(course ? { course: course.id } : {}), ...(lastQuote?.final ? { fee: String(Math.round(lastQuote.final)) } : {}) }));
    toast('Đã điền khóa học và học phí từ báo giá gần nhất');
  };
  const remain = Math.max(0, Number(form.fee || 0) - Number(form.pay1 || 0));
  const reset = () => { setForm({ regDate: todayVN() }); setTagMap(defaultTagMap()); };
  const toggleTag = (t) => setTagMap((m) => ({ ...m, [tplId]: m[tplId].includes(t) ? m[tplId].filter((x) => x !== t) : [...m[tplId], t] }));
  const doCopy = () => copy(message, missing.length ? `Đã copy, còn thiếu ${missing.length} mục` : 'Đã copy tin nhắn, dán vào nhóm');

  return (
    <div>
      <div className="rounded-xl border border-pas bg-cam-soft p-3.5 text-sm flex gap-2.5 mb-5">
        <AlertCircle className="w-5 h-5 text-cam-dark shrink-0" />
        <p><b>{tpl.group}:</b> {tpl.rule}</p>
      </div>

      <div className="xl:grid xl:grid-cols-[1fr_400px] xl:gap-6 xl:items-start">
        <div className="space-y-5 min-w-0">
          {/* Khóa học */}
          <Card className="p-4">
            <div className="flex items-center justify-between gap-2 mb-2">
              <p className="text-sm font-semibold">Khóa học <span className="text-bad">*</span></p>
              {isAccounting && lastQuote && (
                <button onClick={fillFromQuote} className="h-9 px-3 rounded-lg text-xs font-bold text-cam-dark inline-flex items-center gap-1.5 bg-cam-soft hover:bg-pas/50">
                  <Wand2 className="w-3.5 h-3.5" /> Điền từ báo giá gần nhất
                </button>
              )}
            </div>
            <div className="grid grid-cols-3 gap-2 p-1 rounded-xl bg-kem-deep" role="radiogroup" aria-label="Khóa học">
              {COURSE_OPTIONS.map((c) => (
                <button key={c.id} role="radio" aria-checked={form.course === c.id} onClick={() => set('course')(c.id)}
                  className={`min-h-11 rounded-lg text-sm font-semibold px-1 ${form.course === c.id ? 'bg-white shadow-card text-cara' : 'text-nau'}`}>
                  {c.label}
                </button>
              ))}
            </div>
          </Card>

          {/* Thông tin */}
          <Card className="p-4">
            <div className="flex items-center justify-between gap-2 mb-3">
              <h2 className="font-heading font-bold text-lg">Thông tin điền vào tin</h2>
              <button onClick={reset} className="h-9 px-2.5 rounded-lg text-xs font-bold text-nau inline-flex items-center gap-1.5 hover:bg-kem-deep">
                <RotateCcw className="w-3.5 h-3.5" /> Làm mới
              </button>
            </div>

            {isAccounting && (
              <div className="mb-4 flex items-center justify-between gap-3 rounded-xl bg-kem p-3">
                <span className="text-sm"><b>Thanh toán 1 lần</b><span className="block text-xs text-nau">Trả lần 1 = học phí, bỏ lần 2</span></span>
                <button role="switch" aria-checked={!!form.payOnce} aria-label="Thanh toán 1 lần" onClick={() => set('payOnce')(!form.payOnce)}
                  className={`relative h-8 w-14 shrink-0 rounded-full transition-colors ${form.payOnce ? 'bg-cam' : 'bg-kem-deep border border-nau-soft/40'}`}>
                  <span className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-all ${form.payOnce ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-x-4 gap-y-4">
              {fields.map((f) => (
                <Field key={f.key} f={f} value={eff[f.key]} onChange={set(f.key)} disabled={form.payOnce && f.key === 'pay1'} />
              ))}
            </div>

            {isAccounting && !form.payOnce && remain > 0 && !form.pay2 && (
              <button onClick={() => set('pay2')(String(remain))} className="mt-3 h-10 px-3.5 rounded-lg text-sm font-semibold text-cam-dark bg-cam-soft">
                Điền Trả lần 2 = phần còn lại ({fmtNum(remain)}đ)
              </button>
            )}
          </Card>

          {/* Tag */}
          <Card className="p-4">
            <p className="text-sm font-semibold">Người cần tag</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {TAG_PEOPLE.map((t) => {
                const on = tags.includes(t);
                return (
                  <button key={t} onClick={() => toggleTag(t)} aria-pressed={on}
                    className={`h-11 px-3.5 rounded-full text-sm font-semibold border inline-flex items-center gap-1.5 ${on ? 'bg-cara text-kem border-cara' : 'bg-white text-cara border-kem-deep'}`}>
                    {on ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />} @{t}
                  </button>
                );
              })}
            </div>
            {tags.length === 0 && <p className="text-sm text-bad mt-2">Chưa chọn người tag. Tin này cần tag Kế toán/Trainer.</p>}
          </Card>
        </div>

        {/* Xem trước và copy */}
        <aside className="mt-5 xl:mt-0 xl:sticky xl:top-6 space-y-3">
          <Card className="p-4">
            <div className="flex items-center justify-between gap-2 mb-2">
              <h3 className="font-heading font-bold">Xem trước tin nhắn</h3>
              {missing.length > 0 ? (
                <span className="text-xs font-bold rounded-full bg-cam-soft text-cam-dark px-2.5 py-1">Còn thiếu {missing.length}</span>
              ) : (
                <span className="text-xs font-bold rounded-full bg-[#e3f5ea] text-ok px-2.5 py-1 inline-flex items-center gap-1"><Check className="w-3 h-3" /> Đủ thông tin</span>
              )}
            </div>
            <pre className="whitespace-pre-wrap break-words font-sans text-[15px] leading-relaxed bg-kem rounded-xl p-3.5 max-h-[60vh] overflow-y-auto">{message}</pre>
            {missing.length > 0 && (
              <p className="text-xs text-nau mt-2">Còn thiếu: {missing.join(', ')}.</p>
            )}
            <button className="btn-cam w-full h-12 mt-3 text-[15px]" onClick={doCopy}><Copy className="w-4 h-4" /> Copy tin nhắn</button>
          </Card>
        </aside>
      </div>

      {/* Thanh cố định trên điện thoại */}
      <div className="h-24 xl:hidden" />
      <div className={`xl:hidden fixed inset-x-0 lg:left-64 z-30 px-3 bottom-[calc(4rem+env(safe-area-inset-bottom))] lg:bottom-3 transition-transform duration-150 ${typing ? 'translate-y-[140%]' : ''}`}>
        <div className="max-w-6xl mx-auto bg-cara text-kem rounded-2xl shadow-pop pl-4 pr-2 py-2 flex items-center gap-3">
          <span className="flex-1 min-w-0">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-pas">{tpl.title}</span>
            <span className={`block text-sm font-semibold ${missing.length ? 'text-kem/85' : 'text-pas'}`}>{missing.length ? `Còn thiếu ${missing.length} mục` : 'Đủ thông tin'}</span>
          </span>
          <button className="btn-cam h-11 px-4 shrink-0" onClick={doCopy}><Copy className="w-4 h-4" /> Copy tin</button>
        </div>
      </div>
    </div>
  );
}

// Tin xác nhận Trial Offline gửi riêng cho phụ huynh. Chỉ giữ trong bộ nhớ khi app đang mở.
let trialDraft = { role: '', parent: '', qty: '1', kid: '', date: '', time: '', branch: '' };

function TrialTemplate() {
  const copy = useCopy();
  const typing = useTyping();
  const { info, setInfo, label, phone } = useSalesInfo();
  const [editing, setEditing] = useState(false);
  const [f, setF] = useState(trialDraft);
  useEffect(() => { trialDraft = f; }, [f]);
  const set = (k) => (v) => setF((p) => ({ ...p, [k]: v }));
  const sales = { title: info.title, label, phone };
  const message = useMemo(() => buildTrialMessage(f, sales), [f, info.title, label, phone]); // eslint-disable-line react-hooks/exhaustive-deps
  const missing = missingTrial(f, sales);
  const day = weekdayOf(f.date);
  const tm = trialTimes(f.time);
  const notSunday = day && day !== 'Chủ nhật';
  const doCopy = () => copy(message, missing.length ? `Đã copy, còn thiếu ${missing.length} mục` : 'Đã copy tin, dán vào Zalo phụ huynh');
  const qtyN = Math.max(1, parseInt(f.qty, 10) || 1);

  return (
    <div className="xl:grid xl:grid-cols-[1fr_400px] xl:gap-6 xl:items-start">
      <div className="space-y-5 min-w-0">
        <div className="rounded-xl border border-pas bg-cam-soft p-3.5 text-sm flex gap-2.5">
          <AlertCircle className="w-5 h-5 text-cam-dark shrink-0" />
          <p><b>Nhắn riêng cho Phụ huynh:</b> gửi qua Zalo sau khi phụ huynh đăng ký lớp trải nghiệm. Địa điểm và link bản đồ tự điền theo cơ sở.</p>
        </div>

        {/* Người gửi: nhập một lần, máy nhớ */}
        {label && phone && !editing ? (
          <Card className="px-4 py-3 flex items-center gap-3">
            <span className="h-10 w-10 rounded-full bg-cam-soft text-cam-dark grid place-items-center shrink-0"><User className="w-5 h-5" /></span>
            <span className="flex-1 min-w-0">
              <span className="block text-xs text-nau">Người gửi (nhớ trên máy này)</span>
              <span className="block font-semibold truncate">{label} · {phone}</span>
            </span>
            <button onClick={() => setEditing(true)} className="h-11 px-3 text-sm font-semibold text-cam-dark">Sửa</button>
          </Card>
        ) : (
          <Card className="p-4">
            <p className="text-sm font-semibold">Người gửi <span className="font-normal text-nau">(điền một lần, lần sau tự có)</span></p>
            <div className="mt-2 grid grid-cols-[auto_1fr] gap-2 md:grid-cols-[auto_1fr_1fr]">
              <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-kem-deep" role="group" aria-label="Xưng hô">
                {['Cô', 'Thầy'].map((t) => (
                  <button key={t} onClick={() => setInfo((p) => ({ ...p, title: t }))} aria-pressed={info.title === t} className={`h-10 px-4 rounded-lg text-sm font-semibold ${info.title === t ? 'bg-white shadow-card' : 'text-nau'}`}>{t}</button>
                ))}
              </div>
              <input className="field" placeholder="Tên của bạn, ví dụ Lan" autoComplete="given-name" value={info.name} onChange={(e) => { const v = e.target.value; setInfo((p) => ({ ...p, name: v })); }} aria-label="Tên Sales" />
              <input className="field col-span-2 md:col-span-1" placeholder="Số điện thoại" inputMode="tel" autoComplete="tel" value={info.phone} onChange={(e) => { const v = e.target.value.replace(/[^0-9+ .]/g, ''); setInfo((p) => ({ ...p, phone: v })); }} aria-label="Số điện thoại Sales" />
            </div>
            {label && phone && <button onClick={() => setEditing(false)} className="btn-primary mt-3 w-full">Xong</button>}
          </Card>
        )}

        <Card className="p-4 space-y-4">
          <h2 className="font-heading font-bold text-lg">Thông tin điền vào tin</h2>
          <div>
            <p className="text-sm font-semibold">Xưng hô với phụ huynh <span className="text-bad">*</span></p>
            <div className="mt-1 grid grid-cols-2 gap-2 p-1 rounded-xl bg-kem-deep" role="radiogroup" aria-label="Xưng hô với phụ huynh">
              {['Ba', 'Mẹ'].map((r) => (
                <button key={r} role="radio" aria-checked={f.role === r} onClick={() => set('role')(r)}
                  className={`min-h-11 rounded-lg text-sm font-semibold ${f.role === r ? 'bg-white shadow-card text-cara' : 'text-nau'}`}>{r}</button>
              ))}
            </div>
          </div>
          <label className="block"><span className="text-sm font-semibold">Tên phụ huynh <span className="font-normal text-nau">(chỉ tên, tin sẽ ghi {f.role || 'Ba/Mẹ'} + tên)</span> <span className="text-bad">*</span></span>
            <input className="field mt-1" value={f.parent} onChange={(e) => set('parent')(e.target.value)} placeholder="Ví dụ: Lan" autoComplete="off" /></label>
          <div className="grid grid-cols-[auto_1fr] gap-3 items-end">
            <div>
              <span className="text-sm font-semibold block">Số bé</span>
              <div className="mt-1 inline-flex items-center rounded-xl border border-kem-deep bg-kem">
                <button type="button" className="h-11 w-11 grid place-items-center" onClick={() => set('qty')(String(Math.max(1, qtyN - 1)))} aria-label="Giảm số bé"><Minus className="w-4 h-4" /></button>
                <span className="w-9 text-center font-bold">{qtyN}</span>
                <button type="button" className="h-11 w-11 grid place-items-center" onClick={() => set('qty')(String(Math.min(9, qtyN + 1)))} aria-label="Tăng số bé"><Plus className="w-4 h-4" /></button>
              </div>
            </div>
            <label className="block min-w-0"><span className="text-sm font-semibold">Tên bé <span className="text-bad">*</span></span>
              <input className="field mt-1" value={f.kid} onChange={(e) => set('kid')(e.target.value)} placeholder={qtyN > 1 ? 'Minh Anh, Bảo An' : 'Minh Anh'} autoComplete="off" /></label>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <label className="block"><span className="text-sm font-semibold">Ngày <span className="font-normal text-nau">(ngày/tháng/năm)</span> <span className="text-bad">*</span></span>
              <input className="field mt-1" inputMode="numeric" maxLength={10} placeholder="29/11/2026" autoComplete="off" value={f.date} onChange={(e) => set('date')(maskDate(e.target.value))} /></label>
            <label className="block"><span className="text-sm font-semibold">Giờ bắt đầu <span className="text-bad">*</span></span>
              <input className="field mt-1" inputMode="text" placeholder="9h00" autoComplete="off" value={f.time} onChange={(e) => set('time')(e.target.value.replace(/[^0-9hHgG:giờ ]/g, ''))} /></label>
          </div>
          {f.time && (tm ? (
            <p className="text-sm -mt-2 rounded-xl bg-kem px-3 py-2">Buổi {tm.start} - {tm.end} (90 phút). Giờ đến: <b className="text-cam-dark">{tm.arrive}</b> (sớm 10 phút). Tin tự ghi các giờ này.</p>
          ) : (
            <p className="text-sm -mt-2 text-bad">Giờ chưa đúng, nhập dạng 9h00, 9h30 hoặc 14:00.</p>
          ))}
          {day && <p className={`text-sm -mt-2 ${notSunday ? 'text-bad font-semibold' : 'text-nau'}`}>{day}{notSunday ? '. Lớp trải nghiệm Offline thường vào Chủ nhật, kiểm tra lại ngày.' : ''}</p>}
          <div>
            <p className="text-sm font-semibold">Cơ sở <span className="text-bad">*</span></p>
            <div className="mt-2 grid grid-cols-2 gap-2 p-1 rounded-xl bg-kem-deep" role="radiogroup" aria-label="Cơ sở">
              {TRIAL_BRANCHES.map((b) => (
                <button key={b.id} role="radio" aria-checked={f.branch === b.id} onClick={() => set('branch')(b.id)}
                  className={`min-h-11 rounded-lg text-sm font-semibold px-1 ${f.branch === b.id ? 'bg-white shadow-card text-cara' : 'text-nau'}`}>{b.label}</button>
              ))}
            </div>
            {f.branch && <p className="text-xs text-nau mt-2">{TRIAL_BRANCHES.find((b) => b.id === f.branch).address}</p>}
          </div>
          <button onClick={() => setF({ role: '', parent: '', qty: '1', kid: '', date: '', time: '', branch: '' })} className="h-9 px-2.5 rounded-lg text-xs font-bold text-nau inline-flex items-center gap-1.5 hover:bg-kem-deep">
            <RotateCcw className="w-3.5 h-3.5" /> Làm mới
          </button>
        </Card>
      </div>

      <aside className="mt-5 xl:mt-0 xl:sticky xl:top-6 space-y-3">
        <Card className="p-4">
          <div className="flex items-center justify-between gap-2 mb-2">
            <h3 className="font-heading font-bold">Xem trước tin nhắn</h3>
            {missing.length > 0 ? (
              <span className="text-xs font-bold rounded-full bg-cam-soft text-cam-dark px-2.5 py-1">Còn thiếu {missing.length}</span>
            ) : (
              <span className="text-xs font-bold rounded-full bg-[#e3f5ea] text-ok px-2.5 py-1 inline-flex items-center gap-1"><Check className="w-3 h-3" /> Đủ thông tin</span>
            )}
          </div>
          <pre className="whitespace-pre-wrap break-words font-sans text-[15px] leading-relaxed bg-kem rounded-xl p-3.5 max-h-[60vh] overflow-y-auto">{message}</pre>
          {missing.length > 0 && <p className="text-xs text-nau mt-2">Còn thiếu: {missing.join(', ')}.</p>}
          <button className="btn-cam w-full h-12 mt-3 text-[15px]" onClick={doCopy}><Copy className="w-4 h-4" /> Copy tin nhắn</button>
        </Card>
      </aside>

      <div className="h-24 xl:hidden" />
      <div className={`xl:hidden fixed inset-x-0 lg:left-64 z-30 px-3 bottom-[calc(4rem+env(safe-area-inset-bottom))] lg:bottom-3 transition-transform duration-150 ${typing ? 'translate-y-[140%]' : ''}`}>
        <div className="max-w-6xl mx-auto bg-cara text-kem rounded-2xl shadow-pop pl-4 pr-2 py-2 flex items-center gap-3">
          <span className="flex-1 min-w-0">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-pas">{TRIAL_TAB.title}</span>
            <span className={`block text-sm font-semibold ${missing.length ? 'text-kem/85' : 'text-pas'}`}>{missing.length ? `Còn thiếu ${missing.length} mục` : 'Đủ thông tin'}</span>
          </span>
          <button className="btn-cam h-11 px-4 shrink-0" onClick={doCopy}><Copy className="w-4 h-4" /> Copy tin</button>
        </div>
      </div>
    </div>
  );
}

export default function Templates() {
  // /tin-soan?tpl=ketoan, trainer hoặc trial: mở thẳng mẫu cần dùng (ví dụ từ mục Bàn giao trong Kho)
  const [params] = useSearchParams();
  const [tplId, setTplId] = useState(TABS.some((t) => t.id === params.get('tpl')) ? params.get('tpl') : draft.tpl);
  return (
    <div>
      <PageHeader title="Tin soạn sẵn" sub="Điền thông tin, copy tin nhắn dán vào đúng nhóm hoặc gửi phụ huynh. Ô nào để trống vẫn giữ dòng để điền thêm sau khi dán." />
      <div className="grid sm:grid-cols-3 gap-3 mb-5" role="tablist" aria-label="Chọn mẫu tin">
        {TABS.map((t) => {
          const Icon = ICONS[t.icon];
          const on = t.id === tplId;
          return (
            <button key={t.id} role="tab" aria-selected={on} onClick={() => setTplId(t.id)}
              className={`text-left rounded-2xl border-2 p-4 flex items-center gap-3 transition-colors ${on ? 'border-cam bg-white shadow-card' : 'border-kem-deep bg-white/60 hover:border-nau-soft'}`}>
              <span className={`h-12 w-12 rounded-xl grid place-items-center shrink-0 ${on ? 'bg-cam text-white' : 'bg-cam-soft text-cam-dark'}`}><Icon className="w-6 h-6" /></span>
              <span className="min-w-0">
                <span className="block font-heading font-bold leading-snug">{t.title}</span>
                <span className="block text-sm text-nau">{t.group}</span>
              </span>
            </button>
          );
        })}
      </div>
      {tplId === 'trial' ? <TrialTemplate /> : <StaffTemplates tplId={tplId} />}
    </div>
  );
}
