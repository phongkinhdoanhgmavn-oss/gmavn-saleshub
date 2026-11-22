import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronDown, TriangleAlert } from 'lucide-react';
import { LIBRARY } from '../data';
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

export default function Library() {
  const [params] = useSearchParams();
  const copy = useCopy();
  const sections = LIBRARY;
  const parseSid = (v) => (v == null || v === '' ? null : Number.isNaN(Number(v)) ? v : Number(v));
  const [sid, setSid] = useState(parseSid(params.get('s')) ?? sections[0].id);
  const [openH, setOpenH] = useState(params.get('h') !== null ? Number(params.get('h')) : 0);

  useEffect(() => {
    const s = parseSid(params.get('s'));
    if (s) { setSid(s); setOpenH(Number(params.get('h')) || 0); }
  }, [params]);

  const current = sections.find((s) => s.id === sid) ?? sections[0];
  const Icon = current.icon;

  return (
    <div>
      <PageHeader title="Kho kiến thức" sub="Sản phẩm, xử lý từ chối, quy trình và chính sách ở một nơi." />

      <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-6 lg:items-start">
        <div className="-mx-4 px-4 lg:mx-0 lg:px-0 flex lg:flex-col gap-2 overflow-x-auto no-scrollbar pb-3 lg:pb-0 lg:sticky lg:top-6">
          {sections.map((s) => {
            const I = s.icon;
            const on = s.id === current.id;
            return (
              <button
                key={s.id}
                onClick={() => { setSid(s.id); setOpenH(0); }}
                className={`shrink-0 lg:w-full text-left rounded-xl px-3.5 h-12 flex items-center gap-3 border text-sm font-semibold transition-colors ${on ? 'bg-cara text-kem border-cara' : 'bg-white border-kem-deep hover:border-nau-soft'}`}
              >
                <I className="w-[18px] h-[18px] shrink-0" />
                <span className="whitespace-nowrap lg:whitespace-normal">{s.title}</span>
              </button>
            );
          })}
        </div>

        <section className="mt-3 lg:mt-0">
          <div className="flex items-center gap-3 mb-3">
            <span className={`h-11 w-11 rounded-xl grid place-items-center ${current.tone}`}><Icon className="w-6 h-6" /></span>
            <div>
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

          {current.special ? (
            <Objections embedded />
          ) : (
          <div className="space-y-3">
            {current.details.map((d, i) => {
              const on = openH === i;
              return (
                <article key={i} className={`rounded-2xl bg-white border shadow-card ${on ? 'border-cam' : 'border-kem-deep'}`}>
                  <button onClick={() => setOpenH(on ? -1 : i)} className="w-full text-left p-4 flex items-center gap-3" aria-expanded={on}>
                    <h3 className="flex-1 font-heading font-bold leading-snug">{d.heading}</h3>
                    <ChevronDown className={`w-5 h-5 text-nau transition-transform ${on ? 'rotate-180' : ''}`} />
                  </button>
                  {on && (
                    <div className="px-4 pb-4">
                      <RichText text={d.content} />
                      <button className="btn-ghost mt-4 h-10" onClick={() => copy(`${d.heading}\n\n${d.content}`, 'Đã copy nội dung')}>Copy nội dung</button>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
          )}
        </section>
      </div>
    </div>
  );
}
