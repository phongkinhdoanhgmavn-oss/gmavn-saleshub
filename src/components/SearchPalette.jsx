import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, CornerDownLeft, X } from 'lucide-react';
import { search } from '../lib/search';

const SUGGEST = ['đắt', 'trả góp', 'sóng não', 'hoàn tiền', '1:1', 'hyperhack'];

export default function SearchPalette({ open, onClose }) {
  const [q, setQ] = useState('');
  const [idx, setIdx] = useState(0);
  const nav = useNavigate();
  const inputRef = useRef(null);
  const results = useMemo(() => search(q), [q]);

  useEffect(() => {
    if (open) {
      setQ('');
      setIdx(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  useEffect(() => {
    setIdx(0);
  }, [q]);

  if (!open) return null;

  const go = (r) => {
    nav(r.to);
    onClose();
  };
  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setIdx((i) => Math.min(i + 1, results.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setIdx((i) => Math.max(i - 1, 0)); }
    if (e.key === 'Enter' && results[idx]) go(results[idx]);
    if (e.key === 'Escape') onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] bg-cara/50 backdrop-blur-sm flex items-start justify-center p-3 pt-[8vh]" onClick={onClose}>
      <div
        role="dialog"
        aria-label="Tìm kiếm"
        className="w-full max-w-xl bg-kem rounded-2xl shadow-pop overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 h-14 border-b border-kem-deep bg-white">
          <Search className="w-5 h-5 text-nau" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKey}
            placeholder="Tìm nhanh: đắt, trả góp, sóng não..."
            className="flex-1 bg-transparent outline-none text-base placeholder:text-nau-soft"
          />
          <button onClick={onClose} aria-label="Đóng" className="p-1 text-nau hover:text-cara">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {q.trim().length < 2 && (
            <div className="p-3">
              <p className="text-xs font-bold uppercase tracking-wider text-nau mb-2">Gợi ý</p>
              <div className="flex flex-wrap gap-2">
                {SUGGEST.map((s) => (
                  <button key={s} onClick={() => setQ(s)} className="h-9 px-3.5 rounded-full bg-white border border-kem-deep text-sm font-semibold hover:border-nau-soft">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
          {q.trim().length >= 2 && results.length === 0 && (
            <p className="p-6 text-center text-nau">Không thấy kết quả cho "{q}". Thử từ khác ngắn hơn nhé.</p>
          )}
          {results.map((r, i) => (
            <button
              key={r.to + i}
              onClick={() => go(r)}
              onMouseEnter={() => setIdx(i)}
              className={`w-full text-left rounded-xl px-3.5 py-3 flex items-start gap-3 ${i === idx ? 'bg-white shadow-card' : ''}`}
            >
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-bold uppercase tracking-wider text-cam-dark">{r.type}</p>
                <p className="font-semibold leading-snug line-clamp-1">{r.title}</p>
                <p className="text-sm text-nau line-clamp-1">{r.text.replace(/\n/g, ' ')}</p>
              </div>
              {i === idx && <CornerDownLeft className="w-4 h-4 text-nau mt-1 shrink-0" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
