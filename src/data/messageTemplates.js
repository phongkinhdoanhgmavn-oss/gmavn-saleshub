import { fmtNum, isValidDate, weekdayOf } from '../lib/format';

// Tin soạn sẵn: Sales nhập thông tin, app ghép thành tin nhắn để copy gửi vào nhóm.
// Muốn thêm mẫu mới hoặc đổi chữ, sửa tại đây.

export const COURSE_OPTIONS = [
  { id: 'mmh12', label: 'MMH 12 tháng', quoteIds: ['memohack'] },
  { id: 'mmh11', label: 'MMH 1:1', quoteIds: ['memohack_3t_1v1'] },
  { id: 'hyper', label: 'Hyperhack', quoteIds: ['hyperhack'] },
];

// Người được tag trong nhóm. Đổi/thêm tên tại đây.
export const TAG_PEOPLE = ['Thu Hoàn', 'Ngọc Hà', 'Tuyết'];
// Mỗi mẫu có bộ tag mặc định riêng (Sales vẫn bật/tắt được)

export const WEEKDAYS = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];

// Định dạng ô: money | date | text | email | tel | textarea | chips
const COMMON_TAIL = [
  { key: 'phone', label: 'Số điện thoại di động của Phụ huynh', type: 'tel', required: true, placeholder: '0912 345 678' },
  { key: 'parent', label: 'Họ tên Phụ huynh', type: 'text', required: true, placeholder: 'Nguyễn Thị A' },
  { key: 'address', label: 'Địa chỉ', type: 'text', required: true, wide: true, placeholder: 'Số nhà, đường, quận/huyện, tỉnh/thành' },
  { key: 'note', label: 'Ghi chú', type: 'textarea', wide: true, placeholder: 'Điền thêm thông tin cần lưu ý cho các cô...' },
];

const STUDENT = [
  { key: 'regDate', label: 'Ngày đăng ký', type: 'date', required: true },
  { key: 'student', label: 'Họ tên học viên đầy đủ', type: 'text', required: true, placeholder: 'Nguyễn Minh B', wide: true },
  { key: 'dob', label: 'Ngày tháng năm sinh của con', type: 'date', required: true },
  { key: 'email', label: 'Email của PH (con sẽ dùng để nhận thông tin đăng nhập tài khoản)', type: 'email', required: true, wide: true, placeholder: 'email@gmail.com' },
];

export const MESSAGE_TEMPLATES = [
  {
    id: 'ketoan',
    icon: 'Receipt',
    title: 'Gửi Kế toán khi tiền về',
    group: 'Nhóm Kinh Doanh x Kế toán',
    defaultTags: ['Thu Hoàn', 'Tuyết'],
    rule: 'Bắt buộc gửi vào nhóm này khi tiền về, và nhớ tag Kế toán.',
    fields: [
      { key: 'fee', label: 'Học phí', type: 'money', required: true, placeholder: '42.500.000' },
      { key: 'pay1', label: 'Trả lần 1', type: 'money', required: true, placeholder: '0' },
      { key: 'pay2', label: 'Trả lần 2', type: 'money', placeholder: '0' },
      { key: 'date2', label: 'Ngày thanh toán lần 2', type: 'date' },
      ...STUDENT,
      ...COMMON_TAIL,
    ],
    closing: (tags) => `Em gửi bill khóa học ạ ${tags}, các chị xác nhận tiền về giúp em ạ.`,
  },
  {
    id: 'trainer',
    icon: 'CalendarClock',
    title: 'Gửi Trainer xếp lịch học',
    group: 'Nhóm Kinh Doanh x Trainer',
    defaultTags: ['Thu Hoàn', 'Ngọc Hà'],
    rule: 'Gửi sau khi đã gửi vào nhóm Kế toán, để các cô phân công giáo viên phụ trách.',
    fields: [
      ...STUDENT,
      { key: 'freeEvening', label: 'Con rảnh vào tối', type: 'chips', options: WEEKDAYS, wide: true, required: true, placeholder: 'Chọn các tối con rảnh' },
      { key: 'freeHours', label: 'Con rảnh vào giờ', type: 'text', required: true, placeholder: '19h - 20h' },
      { key: 'sundayShift', label: 'Con học Offline chủ nhật ca', type: 'text', placeholder: 'Nếu có học Offline' },
      ...COMMON_TAIL,
    ],
    closing: (tags) => `Em nhờ các chị sắp xếp GV và lịch học giúp PKD ạ ${tags}`,
  },
];

const fmtMoney = (v) => (v ? `${fmtNum(v)}đ` : '');

export function formatValue(field, v) {
  if (field.type === 'money') return fmtMoney(v);
  if (field.type === 'date') return (v ?? '').trim();
  return (v ?? '').toString().trim();
}

/** Ghép tin nhắn theo đúng khuôn mẫu. Ô để trống vẫn giữ dòng để Sales điền thêm sau khi dán. */
export function buildMessage(tpl, form, tags) {
  const course = COURSE_OPTIONS.find((c) => c.id === form.course)?.label ?? '';
  const tagText = tags.map((t) => `@${t}`).join(' ');
  const lines = tpl.fields.map((f) => {
    const val = f.key === 'pay2' && form.payOnce ? 'Không có (thanh toán 1 lần)' : f.key === 'date2' && form.payOnce ? 'Không có' : formatValue(f, form[f.key]);
    if (f.key === 'note') return `- ${f.label}: ${val}`;
    return `- ${f.label}: ${val}`;
  });
  return [`Em gửi thông tin khóa học ${course}`.trimEnd(), ...lines, '', tpl.closing(tagText), '', 'Em cảm ơn ạ!'].join('\n');
}

export function missingFields(tpl, form) {
  return tpl.fields.filter((f) => f.required && (f.type === 'date' ? !isValidDate(form[f.key]) : !formatValue(f, form[f.key]))).map((f) => f.label)
    .concat(form.course ? [] : ['Khóa học']);
}

// Tin xác nhận cho phụ huynh đến lớp trải nghiệm Offline. Địa điểm và link bản đồ tự ra khi chọn cơ sở.
export const TRIAL_BRANCHES = [
  {
    id: 'hadong', label: 'Cơ sở Hà Đông',
    address: 'Tầng 5 - Tòa nhà 7 tầng NO24 - LK829 Khu Bờ Hội - La Khê - Hà Đông - Hà Nội (Đối diện số 10 Ngô Đình Mẫn - Hà Đông)',
    map: 'https://maps.app.goo.gl/hGrhFAZttm4Apsyo6',
  },
  {
    id: 'caugiay', label: 'Cơ sở Cầu Giấy',
    address: '21 Trần Kim Xuyến - Yên Hòa - Cầu Giấy - Hà Nội',
    map: 'https://maps.app.goo.gl/iZoFjj2W1dA1o4pQ7',
  },
];

export const TRIAL_MINUTES = 90; // buổi Trial và đo sóng não kéo dài 90 phút
export const TRIAL_EARLY = 10; // đến sớm 10 phút

/** "9h", "9h30", "09:00", "9g15" -> { h, m } hoặc null nếu chưa đúng */
export function parseTime(s) {
  const m = /^(\d{1,2})\s*(?:h|:|g|giờ)?\s*(\d{0,2})$/i.exec(String(s || '').trim());
  if (!m) return null;
  const h = Number(m[1]);
  const mi = m[2] === '' ? 0 : Number(m[2]);
  if (h > 23 || mi > 59 || (m[2] !== '' && m[2].length !== 2)) return null;
  return { h, m: mi };
}
const pad2 = (n) => String(n).padStart(2, '0');
const fmtClock = (mins) => {
  const t = ((mins % 1440) + 1440) % 1440;
  return `${Math.floor(t / 60)}h${pad2(t % 60)}`;
};
/** Từ giờ bắt đầu tính giờ đến (sớm 10 phút) và giờ kết thúc (+90 phút) */
export function trialTimes(s) {
  const t = parseTime(s);
  if (!t) return null;
  const start = t.h * 60 + t.m;
  return { start: fmtClock(start), arrive: fmtClock(start - TRIAL_EARLY), end: fmtClock(start + TRIAL_MINUTES) };
}

/** Cách gọi phụ huynh: "Mẹ Lan", "Ba Hùng" theo xưng hô đã chọn */
export function parentCall(f) {
  const name = (f.parent || '').trim();
  if (f.role && name) return `${f.role} ${name}`;
  if (f.role) return `${f.role} [Tên]`;
  return name ? `Ba/Mẹ ${name}` : '[Ba/Mẹ + tên]';
}

export function buildTrialMessage(f, sales) {
  const branch = TRIAL_BRANCHES.find((b) => b.id === f.branch);
  const who = sales.label || 'Cô/Thầy';
  const title = sales.title || 'Cô';
  const phone = sales.phone || '[Số điện thoại]';
  const call = parentCall(f);
  const day = weekdayOf(f.date);
  const tm = trialTimes(f.time);
  const when = [day, f.date, tm ? `${tm.start} - ${tm.end} (${TRIAL_MINUTES} phút)` : ''].filter(Boolean).join(', ');
  const kids = `${Math.max(1, parseInt(f.qty, 10) || 1)} x ${(f.kid || '').trim()}`.trimEnd();
  return [
    `${call} ơi,`,
    '',
    `Cảm ơn ${call} đã đăng ký cho bé tham gia lớp học trải nghiệm Memohack của GMA Việt Nam ạ, ${title} xin gửi lại ${call} thông tin ạ.`,
    `Số lượng bé: ${kids}`,
    `📅 Thời gian: ${when}`,
    `⏰ Giờ đến: ${tm ? tm.arrive : ''} (đến sớm ${TRIAL_EARLY} phút)`,
    `📍 Địa điểm: ${branch ? branch.address : ''}`,
    `📍 Link Google Map: ${branch ? branch.map : ''}`,
    '',
    `Để buổi trải nghiệm diễn ra suôn sẻ, ${call} vui lòng đến sớm ${TRIAL_EARLY} phút trước giờ học. Bé sẽ được trải nghiệm phương pháp học tập tiên tiến, còn phụ huynh sẽ tham gia chia sẻ về cách giúp con phát triển tư duy vượt trội ạ.`,
    '',
    `Nếu có bất kỳ thắc mắc hoặc cần hỗ trợ, ${call} có thể liên hệ qua số ${phone} hoặc nhắn tin cho ${title} qua Zalo ạ.`,
    '',
    `Hẹn gặp ${call} và bé tại buổi trải nghiệm!`,
    '',
    `${who} - ${phone}`,
  ].join('\n');
}

export function missingTrial(f, sales) {
  return [
    !f.role && 'Xưng hô Ba hoặc Mẹ',
    !(f.parent || '').trim() && 'Tên phụ huynh',
    !(f.kid || '').trim() && 'Tên bé',
    !isValidDate(f.date) && 'Ngày',
    !trialTimes(f.time) && 'Giờ bắt đầu',
    !f.branch && 'Cơ sở',
    !sales.label && 'Tên Sales',
    !sales.phone && 'Số điện thoại Sales',
  ].filter(Boolean);
}
