import { useEffect, useMemo, useState } from 'react';
import { Receipt, CalendarClock, Copy, RotateCcw, Check, AlertCircle, Wand2, Plus } from 'lucide-react';
import { PageHeader, Card, useCopy, useToast, useTyping } from '../lib/ui';
import { COURSE_OPTIONS, TAG_PEOPLE, MESSAGE_TEMPLATES, buildMessage, missingFields } from '../data/messageTemplates';

const ICONS = { Receipt, CalendarClock };
const digits = (s) => String(s).replace(/\D/g, '');
const today = () => new Date().toISOString().slice(0, 10);

// Thông tin học viên là dữ liệu cá nhân: chỉ giữ trong bộ nhớ khi app đang mở (không lưu xuống máy).
const defaultTagMap = () => Object.fromEntries(MESSAGE_TEMPLATES.map((t) => [t.id, t.defaultTags]));
let draft = { form: { regDate: today() }, tagMap: defaultTagMap(), tpl: MESSAGE_TEMPLATES[0].id };

function readLastQuote() {
  try { return JSON.parse(localStorage.getItem('last_quote') || 'null'); } catch { return null; }
}

function Field({ f, value, onChange, disabled }) {
  const base = 'field';
  const label = (
    <span className="text-sm font-semibold flex items-start gap-1">
      <span>{f.label}</span>
      {f.required && <span className="text-bad" aria-hidden="true">*</span>}
    </span>
  );
  let control;
  if (f.type === 'money') {
    control = (
      <input
        className={base} inputMode="numeric" placeholder={f.placeholder} disabled={disabled}
        value={value ? Number(value).toLocaleString('vi-VN') : ''}
        onChange={(e) => onChange(digits(e.target.value))}
      />
    );
  } else if (f.type === 'date') {
    control = <input className={base} type="date" value={value || ''} onChange={(e) => onChange(e.target.value)} disabled={disabled} />;
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

export default function Templates() {
  const copy = useCopy();
  const toast = useToast();
  const typing = useTyping();
  const [tplId, setTplId] = useState(draft.tpl);
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
  const reset = () => { setForm({ regDate: today() }); setTagMap(defaultTagMap()); };
  const toggleTag = (t) => setTagMap((m) => ({ ...m, [tplId]: m[tplId].includes(t) ? m[tplId].filter((x) => x !== t) : [...m[tplId], t] }));
  const doCopy = () => copy(message, missing.length ? `Đã copy, còn thiếu ${missing.length} mục` : 'Đã copy tin nhắn, dán vào nhóm');

  return (
    <div>
      <PageHeader title="Tin soạn sẵn" sub="Điền thông tin, copy tin nhắn dán vào đúng nhóm. Ô nào để trống vẫn giữ dòng để điền thêm sau khi dán." />

      {/* Chọn mẫu */}
      <div className="grid sm:grid-cols-2 gap-3 mb-5" role="tablist" aria-label="Chọn mẫu tin">
        {MESSAGE_TEMPLATES.map((t) => {
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
                Điền Trả lần 2 = phần còn lại ({remain.toLocaleString('vi-VN')}đ)
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
