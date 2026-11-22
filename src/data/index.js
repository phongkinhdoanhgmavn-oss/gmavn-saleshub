import rawObjections from './objections.json';
import rawKnowledge from './knowledge.json';
import {
  Box, Users, GitMerge, MessageSquare, CreditCard, FolderOpen, Headset, GraduationCap, ShieldQuestion,
} from 'lucide-react';

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
const META = {
  1: { icon: Box, tone: 'bg-cam-soft text-cam-dark' },
  2: { icon: Users, tone: 'bg-kem-deep text-cara' },
  3: { icon: GitMerge, tone: 'bg-kem-deep text-cara' },
  4: { icon: MessageSquare, tone: 'bg-kem-deep text-cara' },
  6: { icon: CreditCard, verify: 'Chính sách hoàn tiền, ưu đãi và hình thức trả góp cần đối chiếu lại với quy định hiện hành.', tone: 'bg-cam-soft text-cam-dark' },
  7: { icon: FolderOpen, verify: 'Link video và số liệu khảo sát chưa được xác minh nguồn.', tone: 'bg-cam-soft text-cam-dark' },
  8: { icon: Headset, tone: 'bg-kem-deep text-cara' },
  9: { icon: GraduationCap, verify: 'Cần xác nhận các chứng nhận (FDA, CE) và cách nêu hiệu quả trước khi dùng với khách.', tone: 'bg-cam-soft text-cam-dark' },
};

const BASE = rawKnowledge
  .filter((s) => s.id !== 5) // Xử lý từ chối hiển thị bằng giao diện riêng ngay trong Kho
  .map((s) => ({ ...s, ...META[s.id] }));

const OBJECTION_SECTION = {
  id: 'tu-choi',
  title: 'Xử lý từ chối',
  shortDesc: '57 tình huống, bấm là có câu đáp',
  icon: ShieldQuestion,
  tone: 'bg-cam-soft text-cam-dark',
  special: true,
  details: [],
};

// Xử lý từ chối đứng ngay sau Sản phẩm & Giải pháp
export const LIBRARY = [BASE[0], OBJECTION_SECTION, ...BASE.slice(1)];
