import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Home, Target, MessageSquareText, Calculator, BookOpen, Search, Phone, MapPin } from 'lucide-react';
import SearchPalette from './SearchPalette';
import { CONTACT } from '../config';

const NAV = [
  { to: '/', label: 'Hôm nay', icon: Home, end: true },
  { to: '/bao-gia', label: 'Báo giá', icon: Calculator },
  { to: '/tin-soan', label: 'Tin soạn sẵn', icon: MessageSquareText },
  { to: '/kpi', label: 'KPI', icon: Target },
  { to: '/kho', label: 'Kho', icon: BookOpen },
];

export default function Layout() {
  const [searchOpen, setSearchOpen] = useState(false);
  const loc = useLocation();
  const items = NAV;

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [loc.pathname]);

  return (
    <div className="min-h-screen lg:flex">
      {/* Sidebar (máy tính) */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col sticky top-0 h-screen p-4 border-r border-kem-deep bg-kem">
        <div className="flex items-center gap-3 px-2 py-3">
          <img src="/logo.png" alt="GMA" className="h-10 w-10 object-contain" />
          <div>
            <p className="font-heading font-extrabold leading-none text-lg">Sales Hub</p>
            <p className="text-xs text-nau mt-1">GMA Việt Nam</p>
          </div>
        </div>

        <button
          onClick={() => setSearchOpen(true)}
          className="mt-3 h-11 rounded-xl bg-white border border-kem-deep flex items-center gap-2 px-3 text-nau hover:border-nau-soft"
        >
          <Search className="w-4 h-4" />
          <span className="text-sm flex-1 text-left">Tìm nhanh...</span>
          <kbd className="text-[11px] font-semibold bg-kem-deep rounded px-1.5 py-0.5">Ctrl K</kbd>
        </button>

        <nav className="mt-5 flex flex-col gap-1">
          {items.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `h-11 px-3 rounded-xl flex items-center gap-3 text-[15px] font-semibold transition-colors ${isActive ? 'bg-cara text-kem' : 'text-cara hover:bg-kem-deep'}`
              }
            >
              <Icon className="w-5 h-5" /> {label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto space-y-3">
          <div className="rounded-xl bg-white border border-kem-deep p-3 text-sm">
            <a href={CONTACT.hotlineHref} className="flex items-center gap-2 font-bold text-cara">
              <Phone className="w-4 h-4 text-cam" /> {CONTACT.hotline}
            </a>
            {CONTACT.branches.map((b) => (
              <p key={b.name} className="flex items-center gap-2 text-nau mt-1.5">
                <MapPin className="w-4 h-4 shrink-0" /> {b.name}
              </p>
            ))}
          </div>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        {/* Thanh trên (điện thoại) */}
        <header className="lg:hidden sticky top-0 z-30 bg-kem/90 backdrop-blur border-b border-kem-deep">
          <div className="h-14 px-4 flex items-center gap-3">
            <img src="/logo.png" alt="GMA" className="h-8 w-8 object-contain" />
            <p className="font-heading font-extrabold flex-1">Sales Hub</p>
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Tìm kiếm"
              className="h-10 w-10 rounded-xl bg-white border border-kem-deep grid place-items-center"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-5 lg:py-8 pb-28 lg:pb-12">
          <Outlet />
        </main>
      </div>

      {/* Thanh dưới (điện thoại) */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-kem-deep pb-safe">
        <div className="grid" style={{ gridTemplateColumns: `repeat(${items.length}, 1fr)` }}>
          {items.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `h-16 flex flex-col items-center justify-center gap-1 text-[11px] font-semibold ${isActive ? 'text-cam-dark' : 'text-nau'}`
              }
            >
              {({ isActive }) => (
                <>
                  <span className={`h-7 w-12 rounded-full grid place-items-center transition-colors ${isActive ? 'bg-cam-soft' : ''}`}>
                    <Icon className="w-5 h-5" />
                  </span>
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
