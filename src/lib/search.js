import Fuse from 'fuse.js';
import { OBJECTIONS, LIBRARY } from '../data';
import { PACKAGES } from './pricing';

export const norm = (s) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');

const records = [];

OBJECTIONS.forEach((o) =>
  records.push({ type: 'Từ chối', title: `"${o.q}"`, text: o.a, to: `/kho?s=tu-choi&n=${o.n}` }),
);
LIBRARY.forEach((s) =>
  s.details.forEach((d, i) =>
    records.push({ type: s.title, title: d.heading, text: d.content, to: `/kho?s=${s.id}&h=${i}` }),
  ),
);
PACKAGES.forEach((p) =>
  records.push({ type: 'Báo giá', title: p.name, text: p.desc, to: '/bao-gia' }),
);

const indexed = records.map((r) => ({ ...r, nTitle: norm(r.title), nText: norm(r.text) }));
const fuse = new Fuse(indexed, {
  keys: [
    { name: 'nTitle', weight: 0.7 },
    { name: 'nText', weight: 0.3 },
  ],
  threshold: 0.32,
  ignoreLocation: true,
  minMatchCharLength: 2,
});

export function search(query) {
  const q = norm(query.trim());
  if (q.length < 2) return [];
  return fuse
    .search(q, { limit: 40 })
    .map((r) => r.item)
    .slice(0, 8);
}
