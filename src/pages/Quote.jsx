import { useEffect, useMemo, useState } from 'react';
import { Check, Copy, Minus, Plus, AlertTriangle, Send, Table2, Info, QrCode, Building2, User, Gift, ChevronDown, Users } from 'lucide-react';
import { PageHeader, Chip, useCopy, useTyping } from '../lib/ui';
import { PACKAGES, TENURES, BANKS, GROUP_RULES, calcQuote, giftValue, groupRateFor, fmt, fmtShort, fmtTr } from '../lib/pricing';
import { POLICY, BANK_ACCOUNTS, COMPANY_ACCOUNT_THRESHOLD } from '../config';
import PaymentQr from '../components/PaymentQr';
import { useSalesInfo } from '../lib/sales';

const digits = (s) => parseInt(String(s).replace(/\D/g, ''), 10) || 0;
// Giá gói chưa có giá chính thức được nhớ trên máy (dùng chung với trang KPI).
const storedPrice = (id) => {
  try { return digits(localStorage.getItem('price_' + id)) || undefined; } catch { return undefined; }
};

// Điều kiện mua chung, theo đúng văn bản chính sách.
const GROUP_TERMS = [
  {
    title: 'Mua chung 2 tài khoản: giảm 5% trên tổng tiền',
    note: 'Cộng tổng tiền 2 tài khoản rồi giảm 5%.',
    conds: ['Mua và thanh toán 2 tài khoản.', 'Tài khoản đã thanh toán trước sẽ không tính lũy kế cho tài khoản mua sau.'],
    example: 'Khách hàng A mua 1 tài khoản vào ngày 01, giới thiệu khách hàng B. Khách hàng B thanh toán ngày 10 thì tài khoản của B không được giảm 5%.',
  },
  {
    title: 'Mua chung 3 tài khoản: giảm 10% trên tổng tiền',
    note: 'Cộng tổng tiền 3 tài khoản rồi giảm 10%.',
    conds: ['Mua và thanh toán 3 tài khoản.', 'Tài khoản đã thanh toán trước sẽ không tính lũy kế cho tài khoản mua sau.'],
    example: 'Khách hàng A mua 1 hoặc 2 tài khoản vào ngày 01, giới thiệu khách hàng B. Khách hàng B thanh toán ngày 10 thì tài khoản của B không được giảm 10%.',
  },
];

function Switch({ checked, onChange, label }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-8 w-14 shrink-0 rounded-full transition-colors ${checked ? 'bg-cam' : 'bg-kem-deep border border-nau-soft/40'}`}
    >
      <span className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-all ${checked ? 'left-7' : 'left-1'}`} />
    </button>
  );
}

export default function Quote() {
  const copy = useCopy();
  const typing = useTyping();
  const [editingSales, setEditingSales] = useState(false);
  const [items, setItems] = useState({ memohack: { qty: 1, addon: false } });
  const [groupOn, setGroupOn] = useState(true);
  const [termsOpen, setTermsOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState({}); // bật/tắt phần "Gói bao gồm" và "Tặng kèm" của từng gói
  const [customPct, setCustomPct] = useState('');
  const [customVnd, setCustomVnd] = useState('');
  const [installment, setInstallment] = useState(false);
  const [tenureId, setTenureId] = useState(6);
  const [bank, setBank] = useState(BANKS[0]);
  const { info, setInfo, label: salesLabel, phone: salesPhone } = useSalesInfo();

  const q = useMemo(
    () => calcQuote({ items, groupOn, customPct: parseFloat(customPct) || 0, customVnd: digits(customVnd), installment, tenureId, bank }),
    [items, groupOn, customPct, customVnd, installment, tenureId, bank],
  );

  const selected = Object.keys(items);
  const needApproval = q.customAmt > 0; // chỉ phần giảm thêm ngoài chính sách mới cần Đại ca duyệt
  const missingPrice = selected.some((id) => !(items[id].price ?? PACKAGES.find((p) => p.id === id).price));
  const nextTier = GROUP_RULES.find((r) => q.qtyTotal < r.accounts);

  // Tài khoản nhận tiền: quy tắc cũ, đơn lớn vào công ty, đơn nhỏ vào cá nhân. Sales có thể đổi tay.
  const [acctPick, setAcctPick] = useState(null);
  const suggested = q.total >= COMPANY_ACCOUNT_THRESHOLD ? 'company' : 'personal';
  const acctKey = acctPick ?? suggested;
  const acct = BANK_ACCOUNTS[acctKey];
  const payAmount = Math.round(q.total);
  // Nội dung chuyển khoản: tự gợi ý từ tên phụ huynh/bé, Sales có thể sửa tay. Khi tạo QR sẽ tự bỏ dấu.
  const [noteCustom, setNoteCustom] = useState(null);
  const autoNote = 'Hoc phi GMA';
  const noteRaw = noteCustom ?? autoNote;
  const transferNote = (noteRaw.trim() || autoNote).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
  const payText = `STK: ${acct.number}\n${acct.bankName}\nChu TK: ${acct.holder}\nNoi dung: ${transferNote}\nSo tien: ${fmt(payAmount)}`;

  const toggle = (id) =>
    setItems((s) => {
      const n = { ...s };
      if (n[id]) delete n[id];
      else n[id] = { qty: 1, addon: false, price: storedPrice(id) };
      return n;
    });
  const setPrice = (id, v) => {
    try { localStorage.setItem('price_' + id, String(digits(v))); } catch { /* bỏ qua */ }
    setItems((s) => ({ ...s, [id]: { ...s[id], price: digits(v) || undefined } }));
  };
  const setQty = (id, d) => setItems((s) => ({ ...s, [id]: { ...s[id], qty: Math.min(10, Math.max(1, s[id].qty + d)) } }));
  const setAddon = (id) => setItems((s) => ({ ...s, [id]: { ...s[id], addon: !s[id].addon } }));

  const pkgOf = (id) => PACKAGES.find((x) => x.id === id);
  const courseLabel = selected
    .map((id) => `${pkgOf(id).name}${items[id].qty > 1 ? ` x${items[id].qty}` : ''}${items[id].addon ? ' + Offline' : ''}`)
    .join(' + ');
  const lines = selected.map((id) => {
    const p = pkgOf(id);
    return `${p.name}${items[id].qty > 1 ? ` x${items[id].qty}` : ''}${items[id].addon ? ` (+ suất Offline bổ sung${p.addonNote ? ', ' + p.addonNote : ''})` : ''}`;
  });
  // Gộp quà tặng của các gói đã chọn (nhân theo số suất)
  const gifts = selected.flatMap((id) => pkgOf(id).gifts.map((g) => ({ ...g, qty: items[id].qty })));
  const giftTotal = gifts.reduce((a, g) => a + g.value * g.qty, 0);

  const message = () =>
    [
      `Dạ, ${salesLabel ? salesLabel + ' (GMA Việt Nam)' : 'GMA Việt Nam'} xin gửi anh/chị báo giá:`,
      '',
      `• Chương trình: ${lines.join(' + ') || '—'}`,
      q.discount > 0 ? `• Giá niêm yết: ${fmt(q.gross)}` : null,
      q.groupAmt > 0 ? `• Ưu đãi mua chung ${q.qtyTotal} tài khoản (giảm ${Math.round(q.groupRate * 100)}%): -${fmt(q.groupAmt)}` : null,
      q.customAmt > 0 ? `• Ưu đãi thêm: -${fmt(q.customAmt)}` : null,
      `• Học phí: ${fmt(q.final)}`,
      `• Tương đương khoảng ${fmt(q.perDay)}/ngày`,
      gifts.length ? `\nQuà tặng kèm (trị giá ${fmt(giftTotal)}):\n${gifts.map((g) => `🎁 ${g.name}${g.qty > 1 ? ` x${g.qty}` : ''} (${fmt(g.value * g.qty)})`).join('\n')}` : null,
      installment ? `\nTrả góp ${tenureId} tháng qua thẻ ${bank}:\n• Phí chuyển đổi: ${fmt(q.fee)}\n• Mỗi tháng: ${fmt(q.monthly)}` : null,
      '',
      POLICY.vatNote,
      salesLabel || salesPhone ? `
Hỗ trợ: ${[salesLabel, salesPhone].filter(Boolean).join(' · ')}` : null,
    ]
      .filter((x) => x !== null)
      .join('\n');

  const requestApproval = () =>
    copy(
      `Xin duyệt giảm thêm ${fmt(q.customAmt)} cho đơn: ${lines.join(' + ')}. Giá sau ưu đãi: ${fmt(q.final)}. Sales: ${salesLabel || '[tên]'}${salesPhone ? ' ' + salesPhone : ''}.`,
      'Đã copy tin xin duyệt, dán gửi Đại ca',
    );

  const copyQuote = () => copy(message(), 'Đã copy báo giá, dán vào Zalo');
  const canCopy = selected.length > 0 && !missingPrice;
  // Lưu báo giá gần nhất để trang Tin soạn sẵn điền sẵn khóa học và học phí
  useEffect(() => {
    try { localStorage.setItem('last_quote', JSON.stringify({ ids: selected, final: Math.round(q.final), total: payAmount })); } catch { /* bỏ qua */ }
  }, [selected.join(','), q.final, payAmount]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <PageHeader title="Báo giá & trả góp" sub="Chọn gói, áp ưu đãi mua chung, copy tin nhắn và mã QR gửi phụ huynh." />

      <div className="xl:grid xl:grid-cols-[1fr_380px] xl:gap-6 xl:items-start">
        <div className="space-y-6 min-w-0">
          {/* Thông tin Sales: hiện trên ảnh mã chuyển khoản và tin báo giá */}
          {salesLabel && salesPhone && !editingSales ? (
            <section className="rounded-2xl bg-white border border-kem-deep shadow-card px-4 py-3 flex items-center gap-3">
              <span className="h-10 w-10 rounded-full bg-cam-soft text-cam-dark grid place-items-center shrink-0"><User className="w-5 h-5" /></span>
              <span className="flex-1 min-w-0">
                <span className="block text-xs text-nau">Người tư vấn (hiện trên bill)</span>
                <span className="block font-semibold truncate">{salesLabel} · {salesPhone}</span>
              </span>
              <button onClick={() => setEditingSales(true)} className="h-11 px-3 text-sm font-semibold text-cam-dark">Sửa</button>
            </section>
          ) : (
          <section className="rounded-2xl bg-white border border-kem-deep shadow-card p-4">
            <p className="text-sm font-semibold">Người tư vấn <span className="font-normal text-nau">(hiện trên bill gửi phụ huynh, nhớ trên máy này)</span></p>
            <div className="mt-2 grid grid-cols-[auto_1fr] gap-2 md:grid-cols-[auto_1fr_1fr]">
              <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-kem-deep" role="group" aria-label="Xưng hô">
                {['Cô', 'Thầy'].map((t) => (
                  <button key={t} onClick={() => setInfo((p) => ({ ...p, title: t }))} aria-pressed={info.title === t} className={`h-10 px-4 rounded-lg text-sm font-semibold ${info.title === t ? 'bg-white shadow-card' : 'text-nau'}`}>{t}</button>
                ))}
              </div>
              <input className="field" placeholder="Tên của bạn, ví dụ Lan" autoComplete="given-name" value={info.name} onChange={(e) => { const v = e.target.value; setInfo((p) => ({ ...p, name: v })); }} aria-label="Tên Sales" />
              <input className="field col-span-2 md:col-span-1" placeholder="Số điện thoại" inputMode="tel" autoComplete="tel" value={info.phone} onChange={(e) => { const v = e.target.value.replace(/[^0-9+ .]/g, ''); setInfo((p) => ({ ...p, phone: v })); }} aria-label="Số điện thoại Sales" />
            </div>
            {salesLabel && salesPhone && <button onClick={() => setEditingSales(false)} className="btn-primary mt-3 w-full">Xong</button>}
          </section>
          )}

          {/* Chọn gói */}
          <section>
            <h2 className="font-heading font-bold text-lg mb-3">1. Chọn gói</h2>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-1 items-start">
              {PACKAGES.map((p) => {
                const on = !!items[p.id];
                const gv = giftValue(p);
                const price = items[p.id]?.price ?? p.price;
                return (
                  <div key={p.id} className={`rounded-2xl bg-white border-2 transition-colors ${on ? 'border-cam shadow-card md:col-span-2 xl:col-span-1' : 'border-kem-deep'}`}>
                    <button onClick={() => toggle(p.id)} className="w-full p-4 flex items-start gap-3 text-left" aria-pressed={on}>
                      <span className={`mt-0.5 h-6 w-6 rounded-full border-2 grid place-items-center shrink-0 ${on ? 'bg-cam border-cam text-white' : 'border-nau-soft'}`}>
                        {on && <Check className="w-4 h-4" strokeWidth={3} />}
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block font-heading font-bold leading-snug">{p.name}</span>
                        <span className="block text-sm text-nau">{p.desc}</span>
                        {gv > 0 && (
                          <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-cam-soft px-2.5 py-0.5 text-xs font-bold text-cam-dark">
                            <Gift className="w-3.5 h-3.5" /> Tặng kèm trị giá {fmtShort(gv)}
                          </span>
                        )}
                      </span>
                      <span className="font-heading font-extrabold text-lg whitespace-nowrap">
                        {price ? fmtShort(price) : <span className="text-sm text-nau font-semibold">Chưa có giá</span>}
                      </span>
                    </button>

                    {on && (
                      <div className="px-4 pb-4 space-y-3">
                        {p.price == null && (
                          <label className="block">
                            <span className="text-sm font-semibold">Học phí gói này (đ)</span>
                            <input className="field mt-1" inputMode="numeric" placeholder="Nhập học phí" value={items[p.id].price ? items[p.id].price.toLocaleString('vi-VN') : ''} onChange={(e) => setPrice(p.id, e.target.value)} />
                          </label>
                        )}

                        <button
                          onClick={() => setDetailOpen((s) => ({ ...s, [p.id]: !s[p.id] }))}
                          aria-expanded={!!detailOpen[p.id]}
                          className="w-full min-h-11 flex items-center justify-between gap-2 rounded-xl bg-kem px-3.5 text-sm font-semibold text-cara"
                        >
                          <span>{gv > 0 ? 'Gói bao gồm & quà tặng kèm' : 'Gói bao gồm'}</span>
                          <ChevronDown className={`w-5 h-5 text-nau transition-transform ${detailOpen[p.id] ? 'rotate-180' : ''}`} />
                        </button>
                        {detailOpen[p.id] && (
                          <div className="grid sm:grid-cols-2 gap-3 text-sm">
                            <div className="rounded-xl bg-kem p-3">
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <p className="text-xs font-bold uppercase tracking-wider text-nau">Gói bao gồm</p>
                                <button
                                  className="h-9 px-2.5 rounded-lg text-xs font-bold text-cam-dark inline-flex items-center gap-1 hover:bg-white"
                                  onClick={() => copy([`${p.name} bao gồm:`, ...p.includes.map((x) => '- ' + x)].join('\n'), 'Đã copy phần gói bao gồm')}
                                >
                                  <Copy className="w-3.5 h-3.5" /> Copy
                                </button>
                              </div>
                              <ul>
                                {p.includes.map((x) => (
                                  <li key={x}>
                                    <button className="w-full text-left flex gap-2 py-1.5 rounded-lg active:bg-white" onClick={() => copy(x, 'Đã copy dòng này')} title="Bấm để copy riêng dòng này">
                                      <Check className="w-4 h-4 text-ok shrink-0 mt-0.5" /> <span>{x}</span>
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            {p.gifts.length > 0 && (
                              <div className="rounded-xl bg-cam-soft/70 p-3">
                                <div className="flex items-center justify-between gap-2 mb-1">
                                  <p className="text-xs font-bold uppercase tracking-wider text-cam-dark flex items-center gap-1.5"><Gift className="w-3.5 h-3.5" /> Tặng kèm</p>
                                  <button
                                    className="h-9 px-2.5 rounded-lg text-xs font-bold text-cam-dark inline-flex items-center gap-1 hover:bg-white"
                                    onClick={() => copy([`Quà tặng kèm ${p.name} (trị giá ${fmt(gv)}):`, ...p.gifts.map((g) => `🎁 ${g.name} (${fmt(g.value)})`)].join('\n'), 'Đã copy phần tặng kèm')}
                                  >
                                    <Copy className="w-3.5 h-3.5" /> Copy
                                  </button>
                                </div>
                                <ul>
                                  {p.gifts.map((g) => (
                                    <li key={g.name}>
                                      <button className="w-full text-left flex justify-between gap-3 py-1.5 rounded-lg active:bg-white" onClick={() => copy(`🎁 ${g.name} (${fmt(g.value)})`, 'Đã copy quà này')} title="Bấm để copy riêng quà này">
                                        <span>{g.name}</span>
                                        <b className="whitespace-nowrap">{fmtShort(g.value)}</b>
                                      </button>
                                    </li>
                                  ))}
                                </ul>
                                <p className="mt-2 pt-2 border-t border-pas/70 flex justify-between font-bold">
                                  <span>Tổng trị giá quà tặng</span><span className="text-cam-dark">{fmt(gv)}</span>
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                        <div className="flex flex-wrap items-center gap-3">
                          <div className="inline-flex items-center rounded-xl border border-kem-deep bg-kem">
                            <button className="h-11 w-11 grid place-items-center" onClick={() => setQty(p.id, -1)} aria-label="Giảm số suất"><Minus className="w-4 h-4" /></button>
                            <span className="w-9 text-center font-bold">{items[p.id].qty}</span>
                            <button className="h-11 w-11 grid place-items-center" onClick={() => setQty(p.id, 1)} aria-label="Tăng số suất"><Plus className="w-4 h-4" /></button>
                          </div>
                          <span className="text-sm text-nau">tài khoản</span>
                          {p.addon > 0 && (
                            <button
                              onClick={() => setAddon(p.id)}
                              className={`min-h-11 px-3.5 py-2 rounded-xl border text-sm font-semibold text-left ${items[p.id].addon ? 'bg-cam-soft border-cam text-cam-dark' : 'bg-white border-kem-deep'}`}
                            >
                              {items[p.id].addon ? '✓ ' : '+ '}Suất Offline bổ sung ({fmtShort(p.addon)})
                            </button>
                          )}
                        </div>
                        {p.addonNote && items[p.id].addon && (
                          <p className="text-sm font-semibold text-cam-dark">🎁 Mua suất Offline bổ sung: {p.addonNote}</p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Ưu đãi mua chung */}
          <section>
            <h2 className="font-heading font-bold text-lg mb-3">2. Ưu đãi mua chung</h2>
            <div className="rounded-2xl bg-white border border-kem-deep shadow-card p-4">
              <div className="flex items-start gap-3">
                <span className="h-10 w-10 rounded-xl bg-cam-soft text-cam-dark grid place-items-center shrink-0"><Users className="w-5 h-5" /></span>
                <div className="flex-1 min-w-0">
                  <p className="font-heading font-bold leading-snug">
                    {q.groupRate > 0 && groupOn
                      ? `Đang áp dụng: ${q.qtyTotal} tài khoản, giảm ${Math.round(q.groupRate * 100)}% (-${fmt(q.groupAmt)})`
                      : q.groupRate > 0
                        ? `Đủ điều kiện giảm ${Math.round(q.groupRate * 100)}% nhưng đang tắt`
                        : `Đang chọn ${q.qtyTotal} tài khoản`}
                  </p>
                  <p className="text-sm text-nau mt-0.5">
                    {nextTier
                      ? `Thêm ${nextTier.accounts - q.qtyTotal} tài khoản nữa để được giảm ${Math.round(nextTier.rate * 100)}% trên tổng tiền.`
                      : 'Đã ở mức giảm cao nhất của chính sách mua chung.'}
                  </p>
                  {q.qtyTotal > 3 && <p className="text-xs text-nau mt-1">Chính sách ghi rõ mức 2 và 3 tài khoản. Từ 4 tài khoản đang tính mức 10%, hỏi Đại ca nếu cần xác nhận.</p>}
                </div>
                <Switch checked={groupOn} onChange={setGroupOn} label="Áp dụng ưu đãi mua chung" />
              </div>

              <div className="grid grid-cols-2 gap-2 mt-3">
                {GROUP_RULES.map((r) => {
                  const active = groupOn && groupRateFor(q.qtyTotal) === r.rate && q.qtyTotal >= r.accounts;
                  return (
                    <div key={r.accounts} className={`rounded-xl border px-3 py-2.5 text-sm ${active ? 'border-cam bg-cam-soft font-bold text-cam-dark' : 'border-kem-deep text-nau'}`}>
                      {r.accounts} tài khoản <span className="font-heading font-extrabold">-{Math.round(r.rate * 100)}%</span>
                    </div>
                  );
                })}
              </div>

              <button onClick={() => setTermsOpen(!termsOpen)} className="mt-3 w-full flex items-center justify-between h-11 text-sm font-semibold text-cara" aria-expanded={termsOpen}>
                Điều kiện mua chung
                <ChevronDown className={`w-5 h-5 text-nau transition-transform ${termsOpen ? 'rotate-180' : ''}`} />
              </button>
              {termsOpen && (
                <div className="space-y-3 pt-1 text-sm">
                  {GROUP_TERMS.map((t) => (
                    <div key={t.title} className="rounded-xl bg-kem p-3.5">
                      <p className="font-bold">{t.title}</p>
                      <p className="text-nau mt-0.5">{t.note}</p>
                      <p className="mt-2 text-xs font-bold uppercase tracking-wider text-nau">Điều kiện</p>
                      <ul className="mt-1 space-y-1">
                        {t.conds.map((c) => <li key={c} className="flex gap-2"><Check className="w-4 h-4 text-ok shrink-0 mt-0.5" /> <span>{c}</span></li>)}
                      </ul>
                      <p className="mt-2 text-xs font-bold uppercase tracking-wider text-nau">Ví dụ</p>
                      <p className="mt-1">{t.example}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4 rounded-2xl bg-white border border-kem-deep p-4">
              <p className="font-semibold text-sm">Giảm thêm ngoài chính sách <span className="text-bad">(phải báo Đại ca duyệt)</span></p>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <label className="block">
                  <span className="text-sm text-nau">Giảm thêm (%)</span>
                  <input className="field mt-1" inputMode="decimal" placeholder="0" value={customPct} onChange={(e) => setCustomPct(e.target.value)} />
                </label>
                <label className="block">
                  <span className="text-sm text-nau">Giảm thêm (đ)</span>
                  <input className="field mt-1" inputMode="numeric" placeholder="0" value={customVnd} onChange={(e) => setCustomVnd(digits(e.target.value) ? digits(e.target.value).toLocaleString('vi-VN') : '')} />
                </label>
              </div>
              {needApproval && (
                <div className="mt-3 rounded-xl border border-bad/40 bg-[#fdecee] p-3.5 flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-bad shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-bold text-bad">Giảm thêm {fmt(q.customAmt)} cần Đại ca duyệt</p>
                    <p className="mt-0.5">Quy tắc: không tự giảm giá, báo Đại ca duyệt trước khi báo cho phụ huynh.</p>
                    <button onClick={requestApproval} className="mt-2 min-h-10 px-3.5 py-2 rounded-lg bg-bad text-white font-semibold inline-flex items-center gap-2">
                      <Send className="w-4 h-4" /> Copy tin xin duyệt gửi Đại ca
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Trả góp */}
          <section>
            <h2 className="font-heading font-bold text-lg mb-3">3. Hình thức thanh toán</h2>
            <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-kem-deep">
              {[[false, 'Trả một lần'], [true, 'Trả góp thẻ tín dụng']].map(([v, label]) => (
                <button key={label} onClick={() => setInstallment(v)} className={`min-h-11 rounded-lg text-sm font-semibold ${installment === v ? 'bg-white shadow-card' : 'text-nau'}`}>
                  {label}
                </button>
              ))}
            </div>
            {installment && (
              <div className="mt-3 space-y-3">
                <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
                  {TENURES.map((t) => <Chip key={t.id} active={tenureId === t.id} onClick={() => setTenureId(t.id)}>{t.label}</Chip>)}
                </div>
                <label className="block max-w-md">
                  <span className="text-sm font-semibold">Ngân hàng phát hành thẻ</span>
                  <select className="field mt-1" value={bank} onChange={(e) => setBank(e.target.value)}>
                    {BANKS.map((b) => <option key={b}>{b}</option>)}
                  </select>
                </label>
              </div>
            )}
          </section>
        </div>

        {/* Tóm tắt: dưới nội dung trên điện thoại, 2 cột trên máy tính bảng, cột phải cố định trên màn hình lớn */}
        <aside id="summary" className="mt-6 xl:mt-0 xl:sticky xl:top-6 xl:max-h-[calc(100vh-3rem)] xl:overflow-y-auto xl:pr-1 grid gap-4 md:grid-cols-2 xl:grid-cols-1 xl:gap-3 items-start scroll-mt-20">
          <div className="space-y-3 min-w-0">
            <div className="rounded-2xl bg-cara text-kem p-5 relative overflow-hidden">
              <div className="absolute -right-8 -top-10 h-28 w-28 rounded-full bg-cam" />
              <div className="relative">
                <p className="text-xs font-bold uppercase tracking-wider text-pas">Học phí sau ưu đãi</p>
                <p className="font-heading font-extrabold text-4xl mt-1">{fmt(q.final)}</p>
                {/* Chi tiết giá: mỗi khoản một dòng, số màu vàng */}
                <dl className="mt-4 pt-4 border-t border-white/15 space-y-2.5">
                  <div className="flex items-baseline justify-between gap-3">
                    <dt className="text-kem/85">Giá niêm yết</dt>
                    <dd className="font-heading font-extrabold text-lg text-pas">{fmt(q.gross)}</dd>
                  </div>
                  {q.groupAmt > 0 && (
                    <div className="flex items-baseline justify-between gap-3">
                      <dt className="text-kem/85">Mua chung <span className="text-kem/65">({q.qtyTotal} tài khoản, -{Math.round(q.groupRate * 100)}%)</span></dt>
                      <dd className="font-heading font-extrabold text-lg text-pas">-{fmt(q.groupAmt)}</dd>
                    </div>
                  )}
                  {q.customAmt > 0 && (
                    <div className="flex items-baseline justify-between gap-3">
                      <dt className="text-kem/85">Giảm thêm <span className="text-kem/65">(chờ duyệt)</span></dt>
                      <dd className="font-heading font-extrabold text-lg text-pas">-{fmt(q.customAmt)}</dd>
                    </div>
                  )}
                  <div className="flex items-baseline justify-between gap-3">
                    <dt className="text-kem/85">Mỗi ngày</dt>
                    <dd className="font-heading font-extrabold text-lg text-pas">{fmt(q.perDay)}</dd>
                  </div>
                  {q.sessions > 0 && (
                    <div className="flex items-baseline justify-between gap-3">
                      <dt className="text-kem/85">Mỗi buổi</dt>
                      <dd className="font-heading font-extrabold text-lg text-pas">{fmt(q.perSession)}</dd>
                    </div>
                  )}
                </dl>

                {giftTotal > 0 && (
                  <p className="mt-3 text-sm flex items-center justify-between gap-2 rounded-xl bg-white/10 px-3 py-2"><span className="flex items-center gap-2"><Gift className="w-4 h-4 text-pas shrink-0" /> Quà tặng kèm trị giá</span><b className="text-pas">{fmt(giftTotal)}</b></p>
                )}

                {installment && (
                  <div className="mt-3 rounded-xl bg-white/10 p-3 space-y-1.5 text-sm">
                    <div className="flex justify-between"><span className="text-kem/85">Phí chuyển đổi</span><b className="text-pas">{fmt(q.fee)}</b></div>
                    <div className="flex justify-between"><span className="text-kem/85">Tổng phải trả</span><b className="text-pas">{fmt(q.total)}</b></div>
                    <div className="flex justify-between text-pas text-base pt-1.5 border-t border-white/15">
                      <span>Mỗi tháng ({tenureId} tháng)</span><b className="font-heading">{fmt(q.monthly)}</b>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button className="btn-cam w-full h-12 text-[15px]" disabled={!canCopy} onClick={copyQuote}>
              <Copy className="w-4 h-4" /> Copy báo giá gửi Zalo
            </button>
            {missingPrice && <p className="text-sm text-bad px-1">Nhập học phí cho gói chưa có giá để tạo báo giá.</p>}
            <button className="btn-ghost w-full opacity-70 cursor-not-allowed" disabled>
              <Table2 className="w-4 h-4" /> Lưu vào Google Sheet (sắp có)
            </button>
            <p className="text-xs text-nau leading-relaxed px-1">{POLICY.vatNote}</p>
          </div>

          {/* Thanh toán bằng QR */}
          <div id="qr" className="scroll-mt-20 rounded-2xl bg-white border border-kem-deep shadow-card p-4 min-w-0">
            <div className="flex items-center gap-2 mb-3">
              <QrCode className="w-5 h-5 text-cam" />
              <h3 className="font-heading font-bold">Thanh toán bằng QR</h3>
            </div>
            <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-kem-deep">
              {[['company', Building2, 'Công ty'], ['personal', User, 'Cá nhân']].map(([k, I, label]) => (
                <button key={k} onClick={() => setAcctPick(k)} className={`min-h-11 rounded-lg text-sm font-semibold inline-flex items-center justify-center gap-1.5 ${acctKey === k ? 'bg-white shadow-card' : 'text-nau'}`}>
                  <I className="w-4 h-4" /> {label}
                </button>
              ))}
            </div>
            {acctKey === suggested ? (
              <p className="text-xs text-nau mt-2">Gợi ý theo quy tắc: đơn từ {fmtShort(COMPANY_ACCOUNT_THRESHOLD)} trở lên chuyển vào tài khoản công ty.</p>
            ) : (
              <p className="text-xs text-bad mt-2">Đang khác với gợi ý ({BANK_ACCOUNTS[suggested].label}). Kiểm tra lại trước khi gửi phụ huynh.</p>
            )}
            {payAmount > 0 && !missingPrice ? (
              <>
                <label className="block mt-3">
                  <span className="text-sm font-semibold flex items-center justify-between">
                    Nội dung chuyển khoản
                    {noteCustom !== null && (
                      <button type="button" onClick={() => setNoteCustom(null)} className="text-xs font-semibold text-cam-dark hover:underline">Về mặc định</button>
                    )}
                  </span>
                  <input className="field mt-1" value={noteRaw} onChange={(e) => setNoteCustom(e.target.value)} placeholder="Họ tên bé, ví dụ Nguyen Minh" maxLength={25} />
                  <span className="text-xs text-nau">Tối đa 25 ký tự, tự bỏ dấu để ngân hàng nhận đúng.</span>
                </label>
                {!salesLabel && !salesPhone && (
                  <p className="mt-3 rounded-xl bg-cam-soft px-3 py-2 text-sm text-cam-dark">Điền tên và số điện thoại ở phần "Người tư vấn" để hiện trên bill. Đang dùng hotline GMA.</p>
                )}
                <div className="mt-3">
                  <PaymentQr acct={acct} amount={payAmount} course={courseLabel} gross={q.gross} discount={q.discount} fee={q.fee} note={transferNote} salesLabel={salesLabel} salesPhone={salesPhone} fileLabel={`gma-${acctKey}`} />
                </div>
                <button className="btn-ghost w-full mt-3" onClick={() => copy(payText, 'Đã copy thông tin chuyển khoản')}>
                  <Copy className="w-4 h-4" /> Copy thông tin chuyển khoản
                </button>
              </>
            ) : (
              <p className="text-sm text-nau mt-3">Chọn gói và nhập học phí để hiện mã QR.</p>
            )}
          </div>
        </aside>
      </div>

      {/* Chừa chỗ cho thanh tổng tiền cố định */}
      <div className={`xl:hidden ${q.discount > 0 ? 'h-40' : 'h-24'}`} />
      <div
        className={`xl:hidden fixed inset-x-0 lg:left-64 z-30 px-3 bottom-[calc(4rem+env(safe-area-inset-bottom))] lg:bottom-3 transition-transform duration-150 ${typing ? 'translate-y-[140%]' : ''}`}
      >
        <div className="max-w-6xl mx-auto bg-cara text-kem rounded-2xl shadow-pop pl-4 pr-2 py-2">
        <div className="flex items-center gap-3">
          <button className="flex-1 min-w-0 text-left" onClick={() => document.getElementById('summary')?.scrollIntoView({ behavior: 'smooth' })} aria-label="Xem chi tiết tổng tiền">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-pas">Học phí sau ưu đãi</span>
            <span className="block font-heading font-extrabold text-xl leading-tight whitespace-nowrap">{fmt(q.final)}</span>
          </button>
          <button className="h-11 w-11 shrink-0 rounded-xl bg-white/15 grid place-items-center" disabled={!canCopy} onClick={() => document.getElementById('qr')?.scrollIntoView({ behavior: 'smooth' })} aria-label="Đến mã QR thanh toán">
            <QrCode className="w-5 h-5" />
          </button>
          <button className="btn-cam h-11 px-4 shrink-0" disabled={!canCopy} onClick={copyQuote}>
            <Copy className="w-4 h-4" /> <span className="min-[400px]:hidden">Copy</span><span className="hidden min-[400px]:inline">Copy báo giá</span>
          </button>
        </div>
        {q.discount > 0 && (
          <div className="mt-2 mr-2 grid gap-1 text-center" style={{ gridTemplateColumns: `repeat(${1 + (q.groupAmt > 0 ? 1 : 0) + (q.customAmt > 0 ? 1 : 0)}, minmax(0, 1fr))` }}>
            {[
              ['Giá niêm yết', fmtTr(q.gross), true],
              ...(q.groupAmt > 0 ? [[`Mua chung -${Math.round(q.groupRate * 100)}%`, `-${fmtTr(q.groupAmt)}`, false]] : []),
              ...(q.customAmt > 0 ? [['Giảm thêm', `-${fmtTr(q.customAmt)}`, false]] : []),
            ].map(([label, val]) => (
              <span key={label} className="block rounded-lg bg-white/10 px-1 py-1.5">
                <span className="block text-[10px] leading-tight text-kem/75">{label}</span>
                <span className="block font-heading font-extrabold text-[15px] leading-tight text-pas whitespace-nowrap">{val}</span>
              </span>
            ))}
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
