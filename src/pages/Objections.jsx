import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Copy, ChevronDown, Search } from 'lucide-react';
import { OBJECTIONS, OBJ_CATS } from '../data';
import { PageHeader, Chip, useCopy } from '../lib/ui';
import { norm } from '../lib/search';

export default function Objections({ embedded = false }) {
  const [params] = useSearchParams();
  const target = Number(params.get('n')) || null;
  const [cat, setCat] = useState('all');
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(target);
  const copy = useCopy();
  const refs = useRef({});

  useEffect(() => {
    if (target) {
      setOpen(target);
      setCat('all');
      setTimeout(() => refs.current[target]?.scrollIntoView({ block: 'center', behavior: 'smooth' }), 80);
    }
  }, [target]);

  const list = useMemo(() => {
    const nq = norm(q.trim());
    return OBJECTIONS.filter((o) => (cat === 'all' || o.cat === cat) && (!nq || norm(o.q + ' ' + o.a).includes(nq)));
  }, [cat, q]);

  return (
    <div>
      {!embedded && <PageHeader title="Xử lý từ chối" sub="Chọn điều khách vừa nói, bấm Copy để dùng câu đáp." />}

      <div className="relative mb-4">
        <Search className="w-4 h-4 text-nau absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input className="field pl-10" placeholder="Lọc nhanh: đắt, thời gian, online..." value={q} onChange={(e) => setQ(e.target.value)} />
      </div>

      <div className="-mx-4 px-4 lg:mx-0 lg:px-0 flex gap-2 overflow-x-auto no-scrollbar pb-3 lg:flex-wrap">
        <Chip active={cat === 'all'} onClick={() => setCat('all')}>Tất cả · {OBJECTIONS.length}</Chip>
        {OBJ_CATS.map((c) => (
          <Chip key={c.cat} active={cat === c.cat} onClick={() => setCat(c.cat)}>
            {c.emoji} {c.cat} · {c.count}
          </Chip>
        ))}
      </div>

      <div className="mt-2 space-y-3">
        {list.length === 0 && <p className="text-center text-nau py-12">Không có tình huống nào khớp.</p>}
        {list.map((o) => {
          const isOpen = open === o.n;
          return (
            <article
              key={o.n}
              ref={(el) => (refs.current[o.n] = el)}
              className={`rounded-2xl bg-white border shadow-card transition-colors ${isOpen ? 'border-cam' : 'border-kem-deep'}`}
            >
              <button onClick={() => setOpen(isOpen ? null : o.n)} className="w-full text-left p-4 flex items-start gap-3" aria-expanded={isOpen}>
                <span className="text-xl leading-none mt-0.5">{o.emoji}</span>
                <span className="flex-1 min-w-0">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-nau">{o.cat}</span>
                  <span className="block font-heading font-bold text-[17px] leading-snug mt-0.5">"{o.q}"</span>
                  {!isOpen && <span className="block text-sm text-nau mt-1 line-clamp-2">{o.a}</span>}
                </span>
                <ChevronDown className={`w-5 h-5 text-nau mt-1 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && (
                <div className="px-4 pb-4">
                  <div className="rounded-xl bg-cam-soft/60 border border-pas/60 p-4 text-[15px] leading-relaxed">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-cam-dark mb-1.5">Câu đáp gợi ý</p>
                    {o.a}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button className="btn-primary" onClick={() => copy(o.a, 'Đã copy câu đáp')}>
                      <Copy className="w-4 h-4" /> Copy câu đáp
                    </button>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
