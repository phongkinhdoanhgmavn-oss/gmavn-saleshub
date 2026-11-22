// Tạo nội dung mã VietQR (chuẩn NAPAS 247 / EMVCo) ngay trong app, không phụ thuộc dịch vụ ngoài.
// Đã đối chiếu từng ký tự với mã do img.vietqr.io tạo cho cùng tài khoản, số tiền và nội dung.
const tlv = (id, value) => id + String(value.length).padStart(2, '0') + value;

export function crc16(str) {
  let crc = 0xffff;
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8;
    for (let b = 0; b < 8; b++) crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

export const stripVi = (s) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');

/** bankBin: mã 6 số của ngân hàng (MB 970422, VietinBank 970415). amount: số nguyên VND (0 = không cố định số tiền). */
export function buildVietQR({ bankBin, account, amount = 0, note = '' }) {
  const beneficiary = tlv('00', bankBin) + tlv('01', account);
  const merchant = tlv('00', 'A000000727') + tlv('01', beneficiary) + tlv('02', 'QRIBFTTA');
  const cleanNote = stripVi(note).replace(/[^A-Za-z0-9 .,\-_/]/g, '').slice(0, 25).trim();
  let s =
    tlv('00', '01') +
    tlv('01', amount > 0 ? '12' : '11') +
    tlv('38', merchant) +
    tlv('53', '704') +
    (amount > 0 ? tlv('54', String(Math.round(amount))) : '') +
    tlv('58', 'VN') +
    (cleanNote ? tlv('62', tlv('08', cleanNote)) : '') +
    '6304';
  return s + crc16(s);
}
