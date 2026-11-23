import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ChevronDown, TriangleAlert, Copy, ExternalLink, Check, RotateCcw, ArrowRight, X, BookOpen } from 'lucide-react';
import { LIBRARY } from '../data';
import { GROUPS, GOLDEN_RULES, HANDOFF_STEPS, LINKS } from '../data/artifactKnowledge';
import Objections from './Objections';
import { PageHeader, useCopy } from '../lib/ui';

// Hiển thị văn bản thô theo dòng: gạch đầu dòng thụt lề, tiêu đề nhóm đậm.
function RichText({ text }) {
  const lines = text.split('\n');
  return (
    <div className="space-y-1.5 text-[15px] leading-relaxed">
      {lines.map((ln, i) => {
        if (!ln.trim()) return <div key={i} className="h-2" />;
        const bullet = /^\s*([-•])\s+/.test(ln);
        const indent = ln.match(/^\s*/)[0].length;
        const body = ln.replace(/^\s*([-•])\s+/, '');
        const isHead = !bullet && (/^\p{Extended_Pictographic}/u.test(ln.trim()) || /:$/.test(ln.trim()));
        if (bullet)
          return (
            <p key={i} className="flex gap-2" style={{ paddingLeft: indent * 6 }}>
              <span className="text-cam mt-[0.55em] h-1.5 w-1.5 rounded-full bg-cam shrink-0" />
              <span>{body}</span>
            </p>
          );
        return <p key={i} className={isHead ? 'font-bold text-cara pt-1' : ''}>{ln}</p>;
      })}
    </div>
  );
}

// Thang nhóm khách: màu từ xanh (gần chốt) đến xám/đỏ (xa chốt)
const G_TONES = {
  G0: 'bg-[#12a150] text-white', G1: 'bg-[#43b56f] text-white', G2: 'bg-[#8fc255] text-cara', G3: 'bg-[#f4c542] text-cara',
  'G4.5': 'bg-[#5b9bd5] text-white', G4: 'bg-[#8aa5c4] text-white', G5: 'bg-[#a8a29e] text-white', G6: 'bg-[#e5243b] text-white',
};
function GScale({ section }) {
  const rows = section.details[0].content.split('\n').map((l) => l.match(/^- (G[\d.]+): (.*)$/)).filter(Boolean);
  return (
    <div className="space-y-2">
      <p className="text-sm text-nau">G càng nhỏ, càng gần chốt. Ghi CRM ngay sau mỗi lần tương tác.</p>
      {rows.map(([, g, text]) => (
        <div key={g} className="flex items-center gap-3 rounded-2xl bg-white border border-kem-deep shadow-card p-3">
          <span className={`h-12 w-14 rounded-xl grid place-items-center font-heading font-extrabold text-lg shrink-0 ${G_TONES[g]}`}>{g}</span>
          <span className="text-[15px] leading-snug">{text}</span>
        </div>
      ))}
    </div>
  );
}

function Handoff() {
  const [done, setDone] = useState([]);
  const toggle = (i) => setDone((d) => (d.includes(i) ? d.filter((x) => x !== i) : [...d, i]));
  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-3">
        <p className="text-sm text-nau">Tích từng bước khi làm xong. Bước nào có sẵn công cụ thì bấm nút bên dưới.</p>
        {done.length > 0 && (
          <button onClick={() => setDone([])} className="h-9 px-2.5 rounded-lg text-xs font-bold text-nau inline-flex items-center gap-1.5 hover:bg-kem-deep shrink-0">
            <RotateCcw className="w-3.5 h-3.5" /> Làm lại
          </button>
        )}
      </div>
      <ol className="space-y-3">
        {HANDOFF_STEPS.map((s, i) => {
          const on = done.includes(i);
          return (
            <li key={s.title} className={`rounded-2xl border bg-white shadow-card p-4 ${on ? 'border-ok/50' : 'border-kem-deep'}`}>
              <div className="flex items-start gap-3">
                <button onClick={() => toggle(i)} aria-pressed={on} aria-label={`Đánh dấu xong: ${s.title}`}
                  className={`h-8 w-8 rounded-full border-2 grid place-items-center shrink-0 mt-0.5 ${on ? 'bg-ok border-ok text-white' : 'border-nau-soft text-nau font-bold text-sm'}`}>
                  {on ? <Check className="w-4 h-4" strokeWidth={3} /> : i + 1}
                </button>
                <div className="min-w-0 flex-1">
                  <p className={`font-heading font-bold leading-snug ${on ? 'text-nau line-through' : ''}`}>{s.title}</p>
                  <p className="text-[15px] mt-0.5 leading-relaxed">{s.desc}</p>
                  {s.link && (
                    <Link to={s.link} className="mt-2.5 inline-flex items-center gap-1.5 h-10 px-3.5 rounded-xl bg-cam-soft text-cam-dark text-sm font-bold">
                      {s.linkLabel} <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
      <p className="text-sm font-semibold text-cam-dark mt-3">{done.length}/{HANDOFF_STEPS.length} bước đã xong</p>
    </div>
  );
}

function Rules() {
  return (
    <div className="space-y-2">
      <p className="text-sm text-nau">Chạm một điều trong số này là chưa đạt.</p>
      {GOLDEN_RULES.map((r) => (
        <div key={r} className="flex items-center gap-3 rounded-2xl bg-white border border-bad/30 shadow-card p-3.5">
          <span className="h-9 w-9 rounded-full bg-[#fdecee] text-bad grid place-items-center shrink-0"><X className="w-5 h-5" strokeWidth={3} /></span>
          <span className="font-semibold leading-snug">{r}</span>
        </div>
      ))}
    </div>
  );
}

function LinkList() {
  const copy = useCopy();
  return (
    <div className="space-y-2">
      <p className="text-sm text-nau">Bấm Copy để dán gửi phụ huynh, hoặc Mở để xem trang.</p>
      {LINKS.map((l) => (
        <div key={l.label} className="rounded-2xl bg-white border border-kem-deep shadow-card p-3.5 flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="font-semibold leading-snug">{l.label}</p>
            <p className="text-sm text-nau break-all">{l.value}</p>
          </div>
          <button className="h-11 px-3.5 rounded-xl border border-kem-deep text-sm font-semibold inline-flex items-center gap-1.5 shrink-0" onClick={() => copy(l.value, 'Đã copy')}>
            <Copy className="w-4 h-4" /> Copy
          </button>
          {l.url && (
            <a href={l.url} target="_blank" rel="noopener noreferrer" aria-label={`Mở ${l.label}`} className="h-11 w-11 rounded-xl bg-cam-soft text-cam-dark grid place-items-center shrink-0">
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

export default function Library() {
  const [params] = useSearchParams();
  const copy = useCopy();
  const parseSid = (v) => (v == null || v === '' ? null : Number.isNaN(Number(v)) ? v : Number(v));
  const [sid, setSid] = useState(parseSid(params.get('s')) ?? LIBRARY[0].id);
  const [openH, setOpenH] = useState(params.get('h') !== null ? Number(params.get('h')) : 0);

  useEffect(() => {
    const s = parseSid(params.get('s'));
    if (s) { setSid(s); setOpenH(Number(params.get('h')) || 0); }
  }, [params]);

  const current = LIBRARY.find((s) => s.id === sid) ?? LIBRARY[0];
  const Icon = current.icon;
  const byGroup = useMemo(() => GROUPS.map((g) => ({ ...g, items: LIBRARY.filter((s) => s.group === g.id) })).filter((g) => g.items.length), []);
  const pick = (id) => { setSid(id); setOpenH(0); };
  const activeGroup = byGroup.find((g) => g.id === current.group) ?? byGroup[0];
  // Nội dung chữ (thu phóng) chỉ hiện khi mục không có giao diện riêng
  const hasCustomUI = ['gscale', 'handoff', 'rules', 'links'].includes(current.kind) || current.special;

  return (
    <div>
      <PageHeader title="Kho kiến thức" sub="Mọi thứ Sales cần, chia theo nhóm: sản phẩm, bán hàng, sau khi chốt, quy tắc, liên kết." />

      <div className="lg:grid lg:grid-cols-[230px_1fr] lg:gap-6 lg:items-start">
        {/* Điện thoại và máy tính bảng: tab nhóm rồi tới mục trong nhóm */}
        <div className="lg:hidden space-y-2">
          <div className="-mx-4 px-4 flex gap-2 overflow-x-auto no-scrollbar" role="tablist" aria-label="Nhóm kiến thức">
            {byGroup.map((g) => (
              <button key={g.id} role="tab" aria-selected={g.id === activeGroup.id} onClick={() => pick(g.items[0].id)}
                className={`shrink-0 h-11 px-4 rounded-full text-sm font-bold border ${g.id === activeGroup.id ? 'bg-cara text-kem border-cara' : 'bg-white text-cara border-kem-deep'}`}>
                {g.title}
              </button>
            ))}
          </div>
          <div className="-mx-4 px-4 flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {activeGroup.items.map((s) => {
              const I = s.icon;
              const on = s.id === current.id;
              return (
                <button key={s.id} onClick={() => pick(s.id)} aria-pressed={on}
                  className={`shrink-0 h-11 px-3.5 rounded-xl flex items-center gap-2 border text-sm font-semibold ${on ? 'bg-cam text-white border-cam' : 'bg-white border-kem-deep'}`}>
                  <I className="w-[18px] h-[18px] shrink-0" /> <span className="whitespace-nowrap">{s.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Máy tính: danh sách chia nhóm bên trái */}
        <nav className="hidden lg:block lg:sticky lg:top-6 space-y-4" aria-label="Mục kiến thức">
          {byGroup.map((g) => (
            <div key={g.id}>
              <p className="px-1 mb-1.5 text-[11px] font-bold uppercase tracking-wider text-nau">{g.title}</p>
              <div className="space-y-1">
                {g.items.map((s) => {
                  const I = s.icon;
                  const on = s.id === current.id;
                  return (
                    <button key={s.id} onClick={() => pick(s.id)} aria-current={on ? 'page' : undefined}
                      className={`w-full text-left rounded-xl px-3 min-h-11 py-2 flex items-center gap-2.5 text-sm font-semibold transition-colors ${on ? 'bg-cara text-kem' : 'text-cara hover:bg-kem-deep'}`}>
                      <I className="w-[18px] h-[18px] shrink-0" /> <span>{s.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <section className="mt-4 lg:mt-0 min-w-0">
          <div className="flex items-center gap-3 mb-3">
            <span className={`h-11 w-11 rounded-xl grid place-items-center shrink-0 ${current.tone}`}><Icon className="w-6 h-6" /></span>
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-wider text-nau">{activeGroup.title}</p>
              <h2 className="font-heading font-extrabold text-xl leading-tight">{current.title}</h2>
              <p className="text-sm text-nau">{current.shortDesc}</p>
            </div>
          </div>

          {current.verify && (
            <div className="rounded-xl border border-pas bg-cam-soft p-3.5 text-sm flex gap-2.5 mb-3">
              <TriangleAlert className="w-5 h-5 text-cam-dark shrink-0" />
              <p><b>Chờ xác nhận:</b> {current.verify}</p>
            </div>
          )}

          {current.special && <Objections embedded />}
          {current.kind === 'gscale' && <GScale section={current} />}
          {current.kind === 'handoff' && <Handoff />}
          {current.kind === 'rules' && <Rules />}
          {current.kind === 'links' && <LinkList />}

          {/* Nội dung chữ: dạng thu phóng. Mục có giao diện riêng chỉ hiện phần "Nhớ nhé" bổ sung */}
          {!current.special && (
            <div className={`space-y-3 ${hasCustomUI ? 'mt-4' : ''}`}>
              {current.details
                .map((d, i) => ({ d, i }))
                .filter(({ d }) => !hasCustomUI || d.heading === 'Nhớ nhé')
                .map(({ d, i }) => {
                  const on = openH === i;
                  return (
                    <article key={i} className={`rounded-2xl bg-white border shadow-card ${on ? 'border-cam' : 'border-kem-deep'}`}>
                      <button onClick={() => setOpenH(on ? -1 : i)} className="w-full text-left p-4 flex items-center gap-3 min-h-14" aria-expanded={on}>
                        <h3 className="flex-1 font-heading font-bold leading-snug">{d.heading}</h3>
                        <ChevronDown className={`w-5 h-5 text-nau transition-transform ${on ? 'rotate-180' : ''}`} />
                      </button>
                      {on && (
                        <div className="px-4 pb-4">
                          <RichText text={d.content} />
                          <button className="btn-ghost mt-4 h-10" onClick={() => copy(`${d.heading}\n\n${d.content}`, 'Đã copy nội dung')}>
                            <Copy className="w-4 h-4" /> Copy nội dung
                          </button>
                        </div>
                      )}
                    </article>
                  );
                })}
            </div>
          )}

          {current.source === 'tai-lieu' && (
            <p className="mt-4 text-xs text-nau flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> Nguồn: tài liệu đào tạo Học viện Trí tuệ Thiên tài của GMA VN.</p>
          )}
        </section>
      </div>
    </div>
  );
}
