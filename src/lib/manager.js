// Khu Quản lý: khóa bằng mã, tính toán đối soát hoa hồng, lưu dữ liệu nhập trên máy.
// Lưu ý: web này chạy hoàn toàn trên trình duyệt (không có máy chủ), nên mã chỉ là "khóa cửa" để Sales không vào nhầm.
// Chỉ lưu dấu vết đã băm của mã trong mã web. Dữ liệu anh nhập (tên, số tài khoản...) chỉ nằm trên máy anh, không đưa vào mã web.
import { MANAGER_CODE } from './managerCode';
import { kpiCalc } from './kpi';

const OK_KEY = 'mg_ok';
const FAIL_KEY = 'mg_fail';
const DAY = 86400000;

const bytes = (s) => new TextEncoder().encode(s);
const hex = (buf) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');

async function derive(code) {
  const key = await crypto.subtle.importKey('raw', bytes(code), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', salt: bytes(MANAGER_CODE.salt), iterations: MANAGER_CODE.iterations },
    key,
    256,
  );
  return hex(bits);
}

/** Đã mở khóa chưa (còn hạn và còn đúng mã hiện tại; đổi mã thì mọi máy phải nhập lại). */
export function isUnlocked() {
  for (const store of [sessionStorage, localStorage]) {
    try {
      const v = JSON.parse(store.getItem(OK_KEY) || 'null');
      if (v && v.h === MANAGER_CODE.hash && v.exp > Date.now()) return true;
    } catch { /* bỏ qua */ }
  }
  return false;
}

export function lock() {
  try { sessionStorage.removeItem(OK_KEY); localStorage.removeItem(OK_KEY); } catch { /* bỏ qua */ }
}

/** Còn bị khóa nhập sai bao nhiêu giây (nhập sai 5 lần thì chờ 60 giây). */
export function waitSeconds() {
  try {
    const f = JSON.parse(localStorage.getItem(FAIL_KEY) || 'null');
    if (f && f.until > Date.now()) return Math.ceil((f.until - Date.now()) / 1000);
  } catch { /* bỏ qua */ }
  return 0;
}

/** Trả về 'ok' | 'wrong' | 'wait' | 'nocrypto' */
export async function tryUnlock(code, remember) {
  if (waitSeconds() > 0) return 'wait';
  if (!globalThis.crypto?.subtle) return 'nocrypto';
  const h = await derive(String(code).trim().toUpperCase()); // mã không phân biệt hoa thường
  if (h === MANAGER_CODE.hash) {
    const rec = JSON.stringify({ h, exp: Date.now() + (remember ? 7 * DAY : 12 * 3600000) });
    try { (remember ? localStorage : sessionStorage).setItem(OK_KEY, rec); localStorage.removeItem(FAIL_KEY); } catch { /* bỏ qua */ }
    return 'ok';
  }
  try {
    const f = JSON.parse(localStorage.getItem(FAIL_KEY) || '{}');
    const n = (f.n || 0) + 1;
    localStorage.setItem(FAIL_KEY, JSON.stringify(n >= 5 ? { n: 0, until: Date.now() + 60000 } : { n, until: 0 }));
  } catch { /* bỏ qua */ }
  return 'wrong';
}

// ---------- Dữ liệu nhập ----------
export const uid = () => Math.random().toString(36).slice(2, 9);
export const PRODUCTS = ['Memohack 12T', 'Memohack 1:1', 'Hyperhack'];
export const blankSalesRow = () => ({ id: uid(), product: PRODUCTS[0], customer: '', source: '', actual: 0, pct: 100, sale: '', note: '' });
const now = new Date();

export const emptyState = () => ({
  // Người lập, chức danh, phòng ban, giám đốc, kế toán: điền sẵn theo mẫu hiện tại, sửa trên trang thì máy tự nhớ
  who: { name: 'Vũ Anh Tuấn', title: 'Trưởng phòng kinh doanh', dept: 'Phòng kinh doanh', gd: 'Nguyễn Hương Giang', kt: 'Nguyễn Thị Ánh Tuyết' },
  period: { m: now.getMonth() + 1, y: now.getFullYear() },
  pay: {
    payTo: 'nv', // nv = nhân viên, ncc = nhà cung cấp
    docDate: '', // ngày lập giấy, để trống thì lấy hôm nay
    rows: [{ id: uid(), inv: '', date: '', content: '', amount: 0, note: '' }],
    currency: 'VND',
    method: 'transfer', // cash | cheque | transfer
    recvName: '', idNo: '', idDate: '',
    benName: '', acctNo: '', bank: '',
  },
  sales: {
    kpi: 112500000,
    salary: 0,
    rows: [blankSalesRow()],
  },
  mkt: { costProposed: 0, costActual: 0, target: 0, actual: 0, rate: 2, base: 'actual' },
});

const KEY = 'manager_state';
export function loadState() {
  const base = emptyState();
  try {
    const s = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (!s) return base;
    return {
      ...base, ...s,
      who: { ...base.who, ...s.who },
      period: { ...base.period, ...s.period },
      pay: { ...base.pay, ...s.pay },
      sales: { ...base.sales, ...s.sales },
      mkt: { ...base.mkt, ...s.mkt },
    };
  } catch { return base; }
}
export function saveState(s) {
  try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* bỏ qua */ }
}

// ---------- Tính toán ----------
const num = (v) => Number(v) || 0;

/** Bảng đối soát hoa hồng Sales: doanh thu ghi nhận = thực tế x % ghi nhận, hoa hồng và thưởng theo bảng KPI của app. */
export function salesCalc(sales) {
  const rows = sales.rows.map((r) => ({ ...r, recog: Math.round((num(r.actual) * num(r.pct)) / 100) }));
  const actualTotal = rows.reduce((a, r) => a + num(r.actual), 0);
  const recogTotal = rows.reduce((a, r) => a + r.recog, 0);
  const K = kpiCalc(recogTotal, num(sales.kpi));
  return { rows, actualTotal, recogTotal, ...K, salary: num(sales.salary), grand: K.total + num(sales.salary) };
}

/** Doanh thu thực tế của các dòng có nguồn Ads (để đẩy sang bảng Marketing). */
export function adsRevenue(sales) {
  return sales.rows.filter((r) => /ads/i.test(r.source || '')).reduce((a, r) => a + Math.round((num(r.actual) * num(r.pct)) / 100), 0);
}

/** Thưởng Marketing: mặc định 2% trên doanh thu thực tế; chọn "over" thì chỉ tính trên phần vượt kế hoạch. */
export function mktCalc(m) {
  const target = num(m.target);
  const actual = num(m.actual);
  const pct = target > 0 ? actual / target : 0;
  const base = m.base === 'over' ? Math.max(0, actual - target) : actual;
  return { pct, base, reward: Math.round((base * num(m.rate)) / 100) };
}

export const payTotal = (pay) => pay.rows.reduce((a, r) => a + num(r.amount), 0);

export const periodLabel = (p) => `${String(p.m).padStart(2, '0')}/${p.y}`;
