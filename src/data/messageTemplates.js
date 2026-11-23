import { fmtNum, isValidDate } from '../lib/format';

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
