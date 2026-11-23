// Định dạng số và ngày theo kiểu Việt Nam, không phụ thuộc ngôn ngữ cài trên điện thoại hay trình duyệt:
// số có dấu chấm ngăn cách hàng nghìn, ngày luôn là ngày/tháng/năm bằng số.

/** 42500000 -> "42.500.000" */
export const fmtNum = (n) => String(Math.round(Number(n) || 0)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

const pad = (n) => String(n).padStart(2, '0');

/** Ngày hôm nay theo giờ máy, dạng "22/11/2026" */
export function todayVN(d = new Date()) {
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
}

const WEEKDAYS = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
/** "Chủ nhật, 22/11/2026" */
export function dateLabelVN(d = new Date()) {
  return `${WEEKDAYS[d.getDay()]}, ${todayVN(d)}`;
}

/** Gõ số liền nhau, tự chèn dấu "/": 22112026 -> "22/11/2026" */
export function maskDate(raw) {
  const d = String(raw).replace(/\D/g, '').slice(0, 8);
  let out = d.slice(0, 2);
  if (d.length > 2) out += '/' + d.slice(2, 4);
  if (d.length > 4) out += '/' + d.slice(4);
  return out;
}

/** Đủ ngày/tháng/năm và là ngày có thật */
export function isValidDate(s) {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(s || '');
  if (!m) return false;
  const [d, mo, y] = [Number(m[1]), Number(m[2]), Number(m[3])];
  if (y < 1900 || y > 2100) return false;
  const dt = new Date(y, mo - 1, d);
  return dt.getFullYear() === y && dt.getMonth() === mo - 1 && dt.getDate() === d;
}
