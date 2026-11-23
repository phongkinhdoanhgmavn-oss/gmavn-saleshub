import { useState } from 'react';
import { ChevronDown, Copy, TriangleAlert, Check, X, ArrowRight } from 'lucide-react';
import { useCopy } from '../lib/ui';
import {
  METHOD_NOTE, COMPARE, SENSES, FORMULA, FOUNDATIONS, compareText, sensesText, formulaText,
} from '../data/methodContent';

function Block({ id, title, sub, open, onToggle, onCopy, children }) {
  return (
    <section className={`rounded-2xl border-2 bg-white overflow-hidden ${open ? 'border-cam shadow-card' : 'border-kem-deep'}`}>
      <div className="flex items-stretch">
        <button onClick={() => onToggle(id)} aria-expanded={open} className="flex-1 min-w-0 min-h-16 px-4 py-3 flex items-center gap-3 text-left">
          <span className="flex-1 min-w-0">
            <span className="block font-heading font-extrabold leading-snug">{title}</span>
            {sub && <span className="block text-sm text-nau leading-tight">{sub}</span>}
          </span>
          <ChevronDown className={`w-5 h-5 text-nau shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
        {onCopy && (
          <button onClick={onCopy} aria-label={`Copy ${title}`} title="Copy để gửi phụ huynh" className="w-12 shrink-0 grid place-items-center text-cam-dark border-l border-kem-deep active:bg-cam-soft">
            <Copy className="w-4 h-4" />
          </button>
        )}
      </div>
      {open && <div className="px-4 pb-4 pt-1 space-y-3">{children}</div>}
    </section>
  );
}

function CompareCard({ side, tone }) {
  const bad = tone === 'bad';
  return (
    <div className={`rounded-2xl p-4 border-2 ${bad ? 'bg-white border-bad/30' : 'bg-gradient-to-br from-white to-cam-soft border-cam'}`}>
      <span className={`inline-block rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wide ${bad ? 'bg-[#fdecee] text-bad' : 'bg-cam text-white'}`}>{side.badge}</span>
      <h3 className={`mt-2 font-heading font-extrabold text-lg leading-snug ${bad ? 'text-cara' : 'text-cam-dark'}`}>{side.title}</h3>
      <ul className="mt-3 space-y-2.5">
        {side.rows.map(([k, v, chips]) => (
          <li key={k} className="flex gap-2.5">
            <span className={`mt-0.5 h-5 w-5 rounded-full grid place-items-center shrink-0 ${bad ? 'bg-[#fdecee] text-bad' : 'bg-cam text-white'}`}>
              {bad ? <X className="w-3 h-3" strokeWidth={3} /> : <Check className="w-3 h-3" strokeWidth={3} />}
            </span>
            <span className="text-[15px] leading-relaxed">
              <b>{k}:</b> {v}
              {chips && (
                <span className="mt-2 flex flex-wrap gap-1.5">
                  {chips.map((c) => <span key={c} className="rounded-full border border-cam/50 bg-white px-2.5 py-0.5 text-xs font-bold text-cam-dark">{c}</span>)}
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>
      <p className={`mt-3 rounded-xl px-3 py-2.5 text-sm font-bold ${bad ? 'bg-[#fdecee] text-bad' : 'bg-cam-soft text-cam-dark'}`}>{side.outcome}</p>
    </div>
  );
}

export default function Method() {
  const copy = useCopy();
  // Vào là thu hết, bấm mới mở
  const [open, setOpen] = useState([]);
  const toggle = (id) => setOpen((o) => (o.includes(id) ? o.filter((x) => x !== id) : [...o, id]));

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-pas bg-cam-soft p-3.5 text-sm flex gap-2.5">
        <TriangleAlert className="w-5 h-5 text-cam-dark shrink-0" />
        <p><b>Lưu ý khi dùng:</b> {METHOD_NOTE}</p>
      </div>

      <Block id="compare" title={COMPARE.title} sub="Chữa phần ngọn hay nâng cấp từ gốc" open={open.includes('compare')} onToggle={toggle} onCopy={() => copy(compareText(), 'Đã copy bản so sánh')}>
        <p className="text-[15px] leading-relaxed text-cara">{COMPARE.intro}</p>
        <div className="grid gap-3 lg:grid-cols-2">
          <CompareCard side={COMPARE.trad} tone="bad" />
          <CompareCard side={COMPARE.gma} tone="gma" />
        </div>
      </Block>

      <Block id="senses" title={SENSES.title} sub="6 giác quan tiếp nhận tự nhiên, Brain Gym, Balavisx" open={open.includes('senses')} onToggle={toggle} onCopy={() => copy(sensesText(), 'Đã copy phương pháp Memohack')}>
        <h3 className="font-heading font-extrabold text-lg leading-snug">{SENSES.heading}</h3>
        <p className="text-[15px] text-nau">{SENSES.intro}</p>
        <div className="rounded-xl border border-cam/40 overflow-hidden">
          <p className="bg-cam-soft px-3 py-2 text-xs font-extrabold uppercase tracking-wide text-cam-dark">{SENSES.tableTitle}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            {SENSES.senses.map(([vi, en, b], i) => (
              <div key={vi} className={`p-2.5 text-center border-t border-l border-kem-deep first:border-l-0 ${i === SENSES.senses.length - 1 ? 'bg-cam-soft' : 'bg-white'}`}>
                <p className={`font-heading font-extrabold text-sm uppercase ${i === SENSES.senses.length - 1 ? 'text-cam-dark' : 'text-white bg-cam rounded-md py-1'}`}>{vi}</p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-nau">{en}</p>
                <p className="mt-1 text-sm font-semibold leading-snug">{b}</p>
              </div>
            ))}
          </div>
        </div>
        <ul className="space-y-2">
          {SENSES.points.map(([k, v]) => (
            <li key={k} className="flex gap-2.5"><Check className="w-5 h-5 text-cam shrink-0 mt-0.5" strokeWidth={3} /> <span className="text-[15px] leading-relaxed"><b>{k}:</b> {v}</span></li>
          ))}
        </ul>
        <div className="rounded-xl border-2 border-cam/60 p-3">
          <p className="text-xs font-extrabold uppercase tracking-wide text-cam-dark mb-2">Độc quyền huấn luyện não bộ tại GMA Việt Nam</p>
          <div className="flex flex-wrap gap-2">
            {SENSES.exclusive.map((e) => <span key={e} className="rounded-full border border-cam/50 px-3 py-1.5 text-sm font-bold">{e}</span>)}
          </div>
        </div>
        <p className="text-sm text-nau">Sáu điều con được khai mở: {SENSES.orbit.join(', ')}.</p>
      </Block>

      <Block id="formula" title={FORMULA.title} sub="3 phần cộng lại ra học sinh tự chủ, qua 4 giai đoạn thay đổi" open={open.includes('formula')} onToggle={toggle} onCopy={() => copy(formulaText(), 'Đã copy công thức chuyển hóa')}>
        <span className="inline-block rounded-full bg-cam-soft px-3 py-1 text-xs font-extrabold text-cam-dark">{FORMULA.tag}</span>
        <p className="text-[15px] leading-relaxed text-cara">{FORMULA.intro}</p>
        <div className="grid gap-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-stretch">
          {FORMULA.parts.map(([t, rows], i) => (
            <div key={t} className="contents">
              <div className="rounded-2xl border border-cam/50 bg-white p-3.5">
                <p className="font-heading font-extrabold text-sm uppercase leading-snug">{t}</p>
                <ul className="mt-2 space-y-1.5 text-[15px]">
                  {rows.map((r) => <li key={r} className="flex gap-2"><span className="text-cam">✦</span> <span>{r}</span></li>)}
                </ul>
              </div>
              <span className="grid place-items-center text-2xl font-extrabold text-cam">{i < 2 ? '+' : '='}</span>
            </div>
          ))}
          <div className="rounded-2xl bg-gradient-to-br from-cam to-cam-dark text-white p-3.5">
            <p className="font-heading font-extrabold uppercase leading-snug">{FORMULA.result[0]}</p>
            <p className="mt-2 text-[15px] leading-relaxed">{FORMULA.result[1]}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {FORMULA.stages.map(([a, b], i) => (
            <div key={a} className={`rounded-xl border p-3 ${i === 3 ? 'border-cam bg-cam-soft' : 'border-kem-deep bg-white'}`}>
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-cam-dark">{a}</p>
              <p className="font-heading font-bold leading-snug flex items-center gap-1">{b}{i < 3 && <ArrowRight className="w-4 h-4 text-cam hidden lg:inline" />}</p>
            </div>
          ))}
        </div>
      </Block>

      <Block id="found" title={FOUNDATIONS.title} sub="Thiết bị đo, nhạc sóng não, Brain Gym và 6 năng lực" open={open.includes('found')} onToggle={toggle}>
        <div className="space-y-2">
          {FOUNDATIONS.platforms.map(([t, d], i) => (
            <div key={t} className="rounded-xl bg-kem p-3">
              <p className="font-bold"><span className="inline-grid place-items-center h-6 w-6 rounded-full bg-cam text-white text-xs mr-2">{i + 1}</span>{t}</p>
              <p className="mt-1 text-[15px] leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
        <p className="font-heading font-bold pt-1">Sáu năng lực não bộ con được rèn luyện</p>
        <div className="grid sm:grid-cols-2 gap-2">
          {FOUNDATIONS.abilities.map(([t, d]) => (
            <div key={t} className="rounded-xl border border-kem-deep bg-white p-3">
              <p className="font-bold text-cam-dark">{t}</p>
              <p className="text-[15px] leading-relaxed mt-0.5">{d}</p>
            </div>
          ))}
        </div>
      </Block>
    </div>
  );
}
