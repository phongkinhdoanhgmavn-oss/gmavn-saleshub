// Công thức KPI lấy nguyên từ công cụ "KPIs cá nhân và thu nhập" trong artifact đào tạo GMA.
import { PACKAGES } from './pricing';

export const KPI_DEFAULT = 112500000;
export const MARKS = [[0.8, '80%'], [0.91, '91%'], [1, '100%'], [1.2, '120%']];
export const BAR_MAX = 1.3;

export function kpiCalc(rev, target) {
  const pct = target > 0 ? rev / target : 0;
  let rate = 0;
  let tier = 'Chưa đạt 80%';
  if (pct >= 0.8) {
    rate = pct >= 0.91 ? 0.05 : 0.04;
    tier = pct >= 1.2 ? 'Vượt 120%' : pct >= 1 ? 'Đạt 100%' : pct >= 0.91 ? '91% đến dưới 100%' : '80% đến 90%';
  }
  const bonus = pct >= 1.2 ? 5000000 : pct >= 1 ? 2000000 : 0;
  const comm = pct >= 0.8 ? Math.round(rev * rate) : 0; // hoa hồng tính trên TOÀN BỘ doanh thu thực thu
  return { pct, rate, comm, bonus, total: comm + bonus, tier };
}

export const KPI_STORAGE_KEY = 'kpi_state';

export function readKpiState() {
  try { return JSON.parse(localStorage.getItem(KPI_STORAGE_KEY) || '{}'); } catch { return {}; }
}

/** Doanh thu theo cách Sales đang nhập (nhập số hoặc chọn khóa + số lượng). */
export function kpiRevenue(s) {
  if ((s.tab ?? 'rev') === 'rev') return s.rev ?? 0;
  return PACKAGES.reduce((a, p) => a + ((s.qty ?? {})[p.id] || 0) * ((s.price ?? {})[p.id] ?? p.price), 0);
}

export function kpiSummary() {
  const s = readKpiState();
  const kpi = s.kpi ?? KPI_DEFAULT;
  const revenue = kpiRevenue(s);
  const R = kpiCalc(revenue, kpi);
  return { kpi, revenue, salary: s.salary ?? 0, ...R, income: (s.salary ?? 0) + R.total, touched: revenue > 0 };
}
