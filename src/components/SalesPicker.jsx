import { useState } from 'react';
import { User, Plus, Check, X } from 'lucide-react';
import { useSalesInfo, useSalesProfiles, sameProfile } from '../lib/sales';

/**
 * Chọn người tư vấn (Cô/Thầy + tên + số điện thoại): chọn từ danh sách đã lưu hoặc nhập người mới (tự lưu).
 * Dùng ở mọi chỗ cần thông tin Sales: Báo giá, Tin soạn sẵn, Kịch bản.
 */
export default function SalesPicker({ caption = 'Người tư vấn' }) {
  const { info, setInfo, label, phone } = useSalesInfo();
  const { profiles, add, remove } = useSalesProfiles();
  const filled = !!(label && phone);
  const [open, setOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState({ title: 'Cô', name: '', phone: '' });

  const showPanel = open || !filled;
  const canSave = draft.name.trim() && draft.phone.trim();
  const save = () => {
    add(draft);
    setDraft({ title: draft.title, name: '', phone: '' });
    setAdding(false);
    setOpen(false);
  };

  return (
    <div className="rounded-2xl bg-white border border-kem-deep shadow-card">
      <div className="px-4 py-3 flex items-center gap-3">
        <span className="h-10 w-10 rounded-full bg-cam-soft text-cam-dark grid place-items-center shrink-0"><User className="w-5 h-5" /></span>
        <span className="flex-1 min-w-0">
          <span className="block text-xs text-nau">{caption}</span>
          <span className="block font-semibold truncate">{filled ? `${label} · ${phone}` : 'Chưa chọn, chọn hoặc thêm bên dưới'}</span>
        </span>
        {filled && (
          <button onClick={() => setOpen(!open)} aria-expanded={open} className="h-11 px-3 text-sm font-semibold text-cam-dark">{open ? 'Đóng' : 'Đổi'}</button>
        )}
      </div>

      {showPanel && (
        <div className="px-4 pb-4 border-t border-kem-deep pt-3 space-y-3">
          {profiles.length > 0 && (
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-nau mb-2">Đã lưu trên máy này</p>
              <div className="flex flex-wrap gap-2">
                {profiles.map((p) => {
                  const on = filled && sameProfile(p, info);
                  return (
                    <span key={`${p.title}${p.name}${p.phone}`} className={`inline-flex items-center rounded-full border ${on ? 'bg-cara text-kem border-cara' : 'bg-white border-kem-deep'}`}>
                      <button onClick={() => { setInfo(p); setOpen(false); }} aria-pressed={on} className="h-11 pl-3.5 pr-2 text-sm font-semibold inline-flex items-center gap-1.5">
                        {on && <Check className="w-4 h-4" />} {p.title} {p.name} · {p.phone}
                      </button>
                      <button onClick={() => remove(p)} aria-label={`Xóa ${p.title} ${p.name} khỏi danh sách`} className="h-11 w-9 grid place-items-center opacity-70 hover:opacity-100"><X className="w-4 h-4" /></button>
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {adding || profiles.length === 0 ? (
            <div>
              <p className="text-sm font-semibold">Thêm người mới <span className="font-normal text-nau">(nhập một lần, lần sau chọn là xong)</span></p>
              <div className="mt-2 grid grid-cols-[auto_1fr] gap-2 md:grid-cols-[auto_1fr_1fr]">
                <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-kem-deep" role="group" aria-label="Xưng hô">
                  {['Cô', 'Thầy'].map((t) => (
                    <button key={t} onClick={() => setDraft((d) => ({ ...d, title: t }))} aria-pressed={draft.title === t} className={`h-10 px-4 rounded-lg text-sm font-semibold ${draft.title === t ? 'bg-white shadow-card' : 'text-nau'}`}>{t}</button>
                  ))}
                </div>
                <input className="field" placeholder="Tên, ví dụ Lan" autoComplete="given-name" value={draft.name} onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))} aria-label="Tên Sales" />
                <input className="field col-span-2 md:col-span-1" placeholder="Số điện thoại" inputMode="tel" autoComplete="tel" value={draft.phone} onChange={(e) => setDraft((d) => ({ ...d, phone: e.target.value.replace(/[^0-9+ .]/g, '') }))} aria-label="Số điện thoại Sales" />
              </div>
              <button onClick={save} disabled={!canSave} className="btn-primary mt-3 w-full">Lưu và dùng người này</button>
            </div>
          ) : (
            <button onClick={() => setAdding(true)} className="h-11 px-3.5 rounded-xl bg-cam-soft text-cam-dark text-sm font-bold inline-flex items-center gap-1.5">
              <Plus className="w-4 h-4" /> Thêm người mới
            </button>
          )}
        </div>
      )}
    </div>
  );
}
