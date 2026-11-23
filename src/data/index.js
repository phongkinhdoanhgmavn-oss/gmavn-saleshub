import rawObjections from './objections.json';
import rawKnowledge from './knowledge.json';
import {
  Box, Users, MessageSquare, CreditCard, Headset, GraduationCap, ShieldQuestion,
  Brain, Map, Route, Gauge, ListOrdered, Repeat, PackageCheck, ShieldAlert, Link2,
} from 'lucide-react';
import { ARTIFACT_SECTIONS } from './artifactKnowledge';
import { pipelineSearchDetails } from './pipelineScripts';
import { compareText, sensesText, formulaText } from './methodContent';

const methodSearchDetails = () => [
  { heading: 'So sánh giáo dục truyền thống và giáo dục não bộ GMA', content: compareText() },
  { heading: 'Phương pháp Memohack học mà chơi, 6 giác quan', content: sensesText() },
  { heading: 'Công thức chuyển hóa năng lực học tập', content: formulaText() },
];

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

export const OBJECTIONS = rawObjections.map((o) => {
  const i = o.category.indexOf(' ');
  return { ...o, emoji: o.category.slice(0, i), cat: cap(o.category.slice(i + 1)) };
});
export const OBJ_CATS = [...new Set(OBJECTIONS.map((o) => o.cat))].map((cat) => ({
  cat,
  emoji: OBJECTIONS.find((o) => o.cat === cat).emoji,
  count: OBJECTIONS.filter((o) => o.cat === cat).length,
}));

// verify: nội dung cần anh xác nhận (số liệu, chứng nhận, cam kết)
const OLD = {
  1: { group: 'sp', icon: Box, tone: 'bg-cam-soft text-cam-dark' },
  2: { group: 'ban', icon: Users, tone: 'bg-kem-deep text-cara' },
  4: { group: 'ban', icon: MessageSquare, tone: 'bg-kem-deep text-cara' },
  6: { group: 'sp', icon: CreditCard, tone: 'bg-cam-soft text-cam-dark' },
  8: { group: 'sau', icon: Headset, verify: 'Quy trình sau bán và email CSKH cần đối chiếu với mục "Bàn giao sau khi thanh toán" (bản mới nhất).', tone: 'bg-kem-deep text-cara' },
  9: { group: 'luat', icon: GraduationCap, verify: 'Cần xác nhận các chứng nhận (FDA, CE) và cách nêu hiệu quả trước khi dùng với khách. Nhớ quy tắc "không hứa quá".', tone: 'bg-cam-soft text-cam-dark' },
};

const ICONS = { Map, Route, Gauge, ListOrdered, Repeat, PackageCheck, ShieldAlert, Link2 };

// Nội dung cũ còn dùng: Sản phẩm, Chân dung KH, Kịch bản, Chính sách, CSKH, Kiến thức chuyên môn.
// "Quy trình Sale" và "Media & Case Study" cũ đã thay bằng nội dung từ tài liệu đào tạo.
const old = Object.fromEntries(
  rawKnowledge.filter((s) => OLD[s.id]).map((s) => [s.id, { ...s, ...OLD[s.id], source: 'cu' }]),
);
const art = Object.fromEntries(
  ARTIFACT_SECTIONS.map((s) => [s.id, { ...s, icon: ICONS[s.icon], tone: 'bg-cam-soft text-cam-dark', source: 'tai-lieu' }]),
);

const OBJECTION_SECTION = {
  id: 'tu-choi',
  group: 'ban',
  title: 'Xử lý từ chối',
  shortDesc: '57 tình huống, bấm là có câu đáp',
  icon: ShieldQuestion,
  tone: 'bg-cam-soft text-cam-dark',
  special: true,
  verify: 'Một số câu đáp có cam kết (hoàn tiền 100%, FDA, "an toàn 100%", số liệu khảo sát) có thể trái quy tắc "không hứa quá". Cần rà lại trước khi dùng với phụ huynh.',
  details: [],
};

const METHOD_SECTION = {
  id: 'phuong-phap',
  group: 'sp',
  title: 'Phương pháp & điểm khác biệt',
  shortDesc: 'So sánh với giáo dục truyền thống, 6 giác quan, công thức chuyển hóa',
  icon: Brain,
  tone: 'bg-cam-soft text-cam-dark',
  kind: 'method',
  details: methodSearchDetails(),
};

const SCRIPT_SECTION = {
  id: 'kich-ban',
  group: 'kb',
  title: 'Kịch bản theo Pipeline',
  shortDesc: 'Câu hỏi và cách trả lời theo 6 bước và 3 khóa, điền tên là ra kịch bản',
  icon: MessageSquare,
  tone: 'bg-kb-soft text-kb-dark',
  kind: 'pipeline',
  details: pipelineSearchDetails(),
};

// Thứ tự hiển thị trong Kho, theo từng nhóm
export const LIBRARY = [
  METHOD_SECTION, old[1], old[6], art['lo-trinh'],
  art['hanh-trinh'], SCRIPT_SECTION, art['nhom-g'], art['tu-van-5'], art['nhip-313'], OBJECTION_SECTION, old[2],
  art['ban-giao'], old[8],
  art['vung-an-toan'], old[9],
  art['lien-ket'],
];
