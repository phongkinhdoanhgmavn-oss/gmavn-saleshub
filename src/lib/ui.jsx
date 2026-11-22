import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';

const ToastCtx = createContext(() => {});
export const useToast = () => useContext(ToastCtx);

export function ToastProvider({ children }) {
  const [msg, setMsg] = useState(null);
  const timer = useRef();
  const show = useCallback((m) => {
    setMsg(m);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMsg(null), 1800);
  }, []);
  return (
    <ToastCtx.Provider value={show}>
      {children}
      <div
        aria-live="polite"
        className={`fixed left-1/2 -translate-x-1/2 bottom-24 lg:bottom-8 z-[80] transition-all duration-200 ${msg ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'}`}
      >
        <div className="flex items-center gap-2 bg-cara text-kem px-4 py-2.5 rounded-full shadow-pop text-sm font-semibold">
          <Check className="w-4 h-4" /> {msg}
        </div>
      </div>
    </ToastCtx.Provider>
  );
}

export function useCopy() {
  const toast = useToast();
  return useCallback(
    async (text, label = 'Đã copy') => {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const t = document.createElement('textarea');
        t.value = text;
        document.body.appendChild(t);
        t.select();
        document.execCommand('copy');
        t.remove();
      }
      toast(label);
    },
    [toast],
  );
}

export function PageHeader({ title, sub, right }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-5">
      <div>
        <h1 className="font-heading font-extrabold text-2xl lg:text-3xl text-cara">{title}</h1>
        {sub && <p className="text-nau mt-1 text-sm lg:text-base">{sub}</p>}
      </div>
      {right}
    </div>
  );
}

export function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 h-11 px-4 rounded-full text-sm font-semibold border transition-colors ${active ? 'bg-cara text-kem border-cara' : 'bg-white text-cara border-kem-deep hover:border-nau-soft'}`}
    >
      {children}
    </button>
  );
}

export function Card({ className = '', children }) {
  return <div className={`bg-white rounded-xl2 shadow-card border border-kem-deep/60 ${className}`}>{children}</div>;
}

/** True khi đang gõ vào ô nhập (bàn phím điện thoại mở): dùng để ẩn thanh cố định phía dưới cho khỏi che ô đang gõ. */
export function useTyping() {
  const [typing, setTyping] = useState(false);
  useEffect(() => {
    const isField = (el) => el && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName);
    const on = (e) => { if (isField(e.target)) setTyping(true); };
    const off = () => setTimeout(() => { if (!isField(document.activeElement)) setTyping(false); }, 120);
    // Chạm ra ngoài ô nhập cũng coi như đã gõ xong, tránh thanh bị ẩn mãi
    const tap = (e) => { if (!isField(e.target)) setTyping(false); };
    window.addEventListener('focusin', on);
    window.addEventListener('focusout', off);
    window.addEventListener('pointerdown', tap);
    window.addEventListener('blur', off);
    return () => {
      window.removeEventListener('focusin', on);
      window.removeEventListener('focusout', off);
      window.removeEventListener('pointerdown', tap);
      window.removeEventListener('blur', off);
    };
  }, []);
  return typing;
}
