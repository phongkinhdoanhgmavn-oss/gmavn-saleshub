import { useEffect, useState } from 'react';

// Thông tin Sales (Cô/Thầy + tên, số điện thoại) nhớ trên máy, hiện trên ảnh mã chuyển khoản và tin báo giá.
const KEY = 'sales_info';
const empty = { title: 'Cô', name: '', phone: '' };

export function useSalesInfo() {
  const [info, setInfo] = useState(() => {
    try { return { ...empty, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; } catch { return empty; }
  });
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(info)); } catch { /* bỏ qua */ }
  }, [info]);
  const label = info.name.trim() ? `${info.title} ${info.name.trim()}` : '';
  const phone = info.phone.trim();
  return { info, setInfo, label, phone };
}
