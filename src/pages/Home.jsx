import { Link } from 'react-router-dom';
import { Search, Target, Calculator, MessageSquareText, BookOpen, ArrowRight, Gift, Phone, MapPin, Clock } from 'lucide-react';
import { CONTACT, PROMOS } from '../config';
import { kpiSummary, BAR_MAX, MARKS } from '../lib/kpi';
import { fmt, fmtShort } from '../lib/pricing';

const greeting = () => {
  const h = new Date().getHours();
  return h < 11 ? 'Chào buổi sáng' : h < 14 ? 'Chào buổi trưa' : h < 18 ? 'Chào buổi chiều' : 'Chào buổi tối';
};

const TOOLS = [
  { to: '/bao-gia', icon: Calculator, title: 'Báo giá & trả góp', sub: 'Tính nhanh, tạo mã QR gửi phụ huynh', accent: true },
  { to: '/tin-soan', icon: MessageSquareText, title: 'Tin soạn sẵn', sub: 'Gửi nhóm Kế toán, Trainer: điền là có tin' },
  { to: '/kpi', icon: Target, title: 'KPI và thu nhập', sub: 'Nhập doanh thu, xem hoa hồng và cần chốt thêm gì' },
  { to: '/kho', icon: BookOpen, title: 'Kho kiến thức', sub: 'Sản phẩm, xử lý từ chối, chính sách' },
];

export default function Home() {
  const today = new Date();
  // Ưu đãi chỉ hiện khi có cập nhật trong config.js và còn hạn.
  const K = kpiSummary();
  const promos = PROMOS.filter((p) => new Date(p.expires + 'T23:59:59') >= today);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-nau">
          {today.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'numeric' })}
        </p>
        <h1 className="font-heading font-extrabold text-3xl lg:text-4xl mt-1">{greeting()} 👋</h1>
        <p className="text-nau mt-1">Hôm nay bạn cần hỗ trợ gì?</p>
      </div>

      {/* Nhấn để tìm, giống thanh tìm của điện thoại */}
      <button
        onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))}
        className="w-full h-14 rounded-2xl bg-white shadow-card border border-kem-deep flex items-center gap-3 px-5 text-left text-nau hover:border-nau-soft"
      >
        <Search className="w-5 h-5 text-cam" />
        <span className="flex-1">Tìm: "đắt", "trả góp", "sóng não"</span>
        <kbd className="hidden sm:block text-[11px] font-semibold bg-kem-deep rounded px-2 py-1">Ctrl K</kbd>
      </button>

      <section>
        <h2 className="font-heading font-bold text-lg mb-3">Công cụ</h2>
        <div className="grid grid-cols-2 gap-3">
          {TOOLS.map(({ to, icon: Icon, title, sub, accent }) => (
            <Link
              key={to}
              to={to}
              className={`group flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4 rounded-2xl p-4 border shadow-card transition-colors min-h-[8.5rem] sm:min-h-0 ${accent ? 'bg-cam text-white border-cam hover:bg-cam-dark' : 'bg-white border-kem-deep hover:border-cam'}`}
            >
              <span className={`h-12 w-12 rounded-xl grid place-items-center shrink-0 ${accent ? 'bg-white/20' : 'bg-cam-soft text-cam-dark'}`}>
                <Icon className="w-6 h-6" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-heading font-bold leading-snug">{title}</span>
                <span className={`block text-xs sm:text-sm mt-0.5 line-clamp-2 sm:line-clamp-none ${accent ? 'text-white/90' : 'text-nau'}`}>{sub}</span>
              </span>
              <ArrowRight className="hidden sm:block w-5 h-5 opacity-60 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          ))}
        </div>
      </section>

      {/* KPI tháng này: số liệu Sales nhập ở trang KPI */}
      <Link to="/kpi" className="block rounded-2xl bg-cara text-kem p-4 shadow-card hover:bg-[#573419] transition-colors" aria-label="Mở KPI và thu nhập">
        <span className="flex items-end justify-between gap-3">
          <span className="min-w-0">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-pas">KPI tháng {today.getMonth() + 1}</span>
            {K.touched ? (
              <span className="block font-heading font-extrabold text-2xl leading-tight truncate">{fmt(K.revenue)}</span>
            ) : (
              <span className="block font-heading font-bold text-lg leading-tight">Nhập doanh thu để xem tiến độ</span>
            )}
            <span className="block text-sm text-kem/80">Mục tiêu {fmtShort(K.kpi)}{K.touched ? ` · thu nhập ${fmtShort(K.income)}` : ''}</span>
          </span>
          <span className="text-right shrink-0">
            <span className="block font-heading font-extrabold text-3xl leading-none">{Math.round(K.pct * 1000) / 10}%</span>
            <span className="block text-[11px] text-kem/80 mt-1">{K.tier}</span>
          </span>
        </span>
        <span className="relative block h-2.5 rounded-full bg-white/20 mt-3 overflow-hidden">
          <span className="block h-full rounded-full bg-cam" style={{ width: `${Math.min(100, (K.pct / BAR_MAX) * 100)}%` }} />
          {MARKS.map(([m]) => (
            <span key={m} className="absolute top-0 bottom-0 w-px bg-white/50" style={{ left: `${(m / BAR_MAX) * 100}%` }} />
          ))}
        </span>
      </Link>

      {promos.map((p) => {
        const days = Math.max(0, Math.ceil((new Date(p.expires + 'T23:59:59') - today) / 86400000));
        return (
          <section key={p.id} className="rounded-2xl bg-cara text-kem p-5 relative overflow-hidden">
            <div className="absolute -right-10 -top-12 h-36 w-36 rounded-full bg-cam" />
            <div className="absolute right-16 -bottom-10 h-24 w-24 rounded-full bg-pas/80" />
            <div className="relative">
              <div className="flex items-center gap-2 text-pas text-xs font-bold uppercase tracking-wider">
                <Gift className="w-4 h-4" /> Ưu đãi đang chạy
                <span className="ml-1 inline-flex items-center gap-1 bg-white/15 rounded-full px-2 py-0.5 normal-case tracking-normal">
                  <Clock className="w-3 h-3" /> còn {days} ngày
                </span>
              </div>
              <h3 className="font-heading font-extrabold text-xl mt-2">{p.title}</h3>
              <ul className="mt-2 space-y-1 text-[15px] max-w-lg">
                {p.lines.map((l) => (
                  <li key={l}>• {l}</li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      <section className="rounded-2xl bg-white border border-kem-deep shadow-card p-4 grid sm:grid-cols-3 gap-4 text-sm">
        <a href={CONTACT.hotlineHref} className="flex items-center gap-3">
          <span className="h-10 w-10 rounded-xl bg-cam-soft text-cam-dark grid place-items-center"><Phone className="w-5 h-5" /></span>
          <span><span className="block text-nau">Hotline</span><span className="font-bold text-base">{CONTACT.hotline}</span></span>
        </a>
        {CONTACT.branches.map((b) => (
          <div key={b.name} className="flex items-center gap-3">
            <span className="h-10 w-10 rounded-xl bg-cam-soft text-cam-dark grid place-items-center"><MapPin className="w-5 h-5" /></span>
            <span><span className="block text-nau">{b.name}</span><span className="font-bold">{b.area}</span></span>
          </div>
        ))}
      </section>
    </div>
  );
}
