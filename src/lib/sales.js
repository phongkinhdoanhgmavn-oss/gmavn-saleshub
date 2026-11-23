import { useSyncExternalStore } from 'react';

// Thông tin Sales (Cô/Thầy + tên, số điện thoại) và danh sách người đã lưu, nhớ trên máy.
// Dùng chung cho Báo giá, Tin soạn sẵn và Kịch bản: lưu một lần thì chỗ nào cần điền thông tin Sales cũng chọn được.
const KEY = 'sales_info';
const LIST_KEY = 'sales_profiles';
const empty = { title: 'Cô', name: '', phone: '' };

const read = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback; } catch { return fallback; }
};
export const sameProfile = (a, b) => a.title === b.title && a.name.trim() === b.name.trim() && a.phone.trim() === b.phone.trim();
const complete = (p) => !!(p.name.trim() && p.phone.trim());

function load() {
  const info = { ...empty, ...read(KEY, {}) };
  const profiles = read(LIST_KEY, []).filter((p) => p && p.name && p.phone);
  if (complete(info) && !profiles.some((p) => sameProfile(p, info))) profiles.push({ ...info });
  return { info, profiles };
}

let state = load();
const listeners = new Set();
const subscribe = (l) => { listeners.add(l); return () => listeners.delete(l); };
const getSnapshot = () => state;

function commit(next) {
  state = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(state.info));
    localStorage.setItem(LIST_KEY, JSON.stringify(state.profiles));
  } catch { /* bỏ qua */ }
  listeners.forEach((l) => l());
}

const setInfo = (v) => {
  const info = typeof v === 'function' ? v(state.info) : v;
  commit({ ...state, info });
};
const addProfile = (p) => {
  const item = { title: p.title, name: p.name.trim(), phone: p.phone.trim() };
  const profiles = state.profiles.some((x) => sameProfile(x, item)) ? state.profiles : [...state.profiles, item];
  commit({ info: item, profiles });
};
const removeProfile = (p) => commit({ ...state, profiles: state.profiles.filter((x) => !sameProfile(x, p)) });

export function useSalesInfo() {
  const { info } = useSyncExternalStore(subscribe, getSnapshot);
  const label = info.name.trim() ? `${info.title} ${info.name.trim()}` : '';
  return { info, setInfo, label, phone: info.phone.trim() };
}

export function useSalesProfiles() {
  const { profiles } = useSyncExternalStore(subscribe, getSnapshot);
  return { profiles, add: addProfile, remove: removeProfile, select: setInfo };
}
