import React, { useState, useMemo, useEffect } from 'react';
import { 
  X, Calculator, CreditCard, Percent, ChevronDown, CheckCircle, Sparkles, Tag, 
  TrendingDown, Users, PlusCircle, CreditCard as CardIcon, Receipt, ChevronLeft,
  Info, AlertCircle, Copy, Edit3, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PACKAGES = [
  {
    id: 'memohack',
    name: 'Memohack 12T',
    subtitle: '5-15 tuổi · 48 Offline + 96 Online',
    price: 42500000,
    color: 'bg-orange-500',
    colorLight: 'bg-orange-50',
    colorText: 'text-orange-600',
    colorBorder: 'border-orange-200',
  },
  {
    id: 'memohack_9t',
    name: 'Memohack 9T',
    subtitle: '5-15 tuổi · 36 Offline + 72 Online',
    price: 34500000,
    color: 'bg-indigo-500',
    colorLight: 'bg-indigo-50',
    colorText: 'text-indigo-600',
    colorBorder: 'border-indigo-200',
  },
  {
    id: 'memohack_3t_36b',
    name: 'Memohack 3T (36B)',
    subtitle: '5-15 tuổi · 12 Offline + 24 Online',
    price: 12500000,
    color: 'bg-amber-500',
    colorLight: 'bg-amber-50',
    colorText: 'text-amber-600',
    colorBorder: 'border-amber-200',
  },
  {
    id: 'memohack_3t_24b',
    name: 'Memohack 3T (24B)',
    subtitle: '5-15 tuổi · 24 Offline',
    price: 8000000,
    color: 'bg-rose-500',
    colorLight: 'bg-rose-50',
    colorText: 'text-rose-600',
    colorBorder: 'border-rose-200',
  },
  {
    id: 'hyperhack',
    name: 'Hyperhack',
    subtitle: 'Trẻ đặc biệt · 120 buổi Online',
    price: 13000000,
    color: 'bg-blue-500',
    colorLight: 'bg-blue-50',
    colorText: 'text-blue-600',
    colorBorder: 'border-blue-200',
  },
];

const OFF_PKG_PRICE_DEFAULT = 5500000;
const OFF_PKG_PRICE_3T_36B = 2200000;

const TENURES = [
  { id: 3, label: '3T', rate: 0.03 },
  { id: 6, label: '6T', rate: 0.045 },
  { id: 9, label: '9T', rate: 0.057 },
  { id: 12, label: '12T', rate: 0.07 },
  { id: 18, label: '18T', rate: 0.10 },
  { id: 24, label: '24T', rate: 0.10 },
];

const BANKS = [
  { id: 'vcb', name: 'Vietcombank' },
  { id: 'tcb', name: 'Techcombank' },
  { id: 'bidv', name: 'BIDV' },
  { id: 'vietinbank', name: 'VietinBank' },
  { id: 'sacombank', name: 'Sacombank' },
  { id: 'mbbank', name: 'MB Bank' },
  { id: 'vpbank', name: 'VPBank' },
  { id: 'acb', name: 'ACB' },
  { id: 'shb', name: 'SHB' },
  { id: 'vib', name: 'VIB' },
  { id: 'tpbank', name: 'TPBank' },
  { id: 'msb', name: 'Maritime Bank (MSB)' },
  { id: 'mcredit', name: 'MCredit' },
  { id: 'shinhan', name: 'Shinhan Bank' },
  { id: 'hsbc', name: 'HSBC' },
  { id: 'scb', name: 'SCB' },
  { id: 'ocb', name: 'OCB' },
  { id: 'hdbank', name: 'HDBank' },
  { id: 'eximbank', name: 'Eximbank' }
];

const fmt = (num) =>
  num.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

const fmtShort = (num) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1).replace('.0', '')} triệu`;
  if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
  return num.toLocaleString('vi-VN');
};

export default function InstallmentCalc({ isOpen, onClose }) {
  const [activeView, setActiveView] = useState('calc'); // 'calc' or 'payment'
  const [selectedPkgs, setSelectedPkgs] = useState({
    [PACKAGES[0].id]: { quantity: 1, hasAddon: false }
  });
  const [selectedTenure, setSelectedTenure] = useState(TENURES[1]); // 6 months
  const [isInstallment, setIsInstallment] = useState(false);
  const [installmentAmtStr, setInstallmentAmtStr] = useState('');
  const [studentName, setStudentName] = useState('');
  const [copied, setCopied] = useState(false);
  const [showPaymentWarning, setShowPaymentWarning] = useState(false);
  const [paymentAccountType, setPaymentAccountType] = useState('company'); // 'company' or 'individual'
  const [selectedBank, setSelectedBank] = useState(BANKS[0]);
  const [showInstallmentNotes, setShowInstallmentNotes] = useState(false);

  // Stackable Discounts
  const [groupDiscount, setGroupDiscount] = useState('none'); // 'none', '5', '10'
  const [isCustomActive, setIsCustomActive] = useState(false);
  const [customDiscountPctStr, setCustomDiscountPctStr] = useState('');
  const [customDiscountVndStr, setCustomDiscountVndStr] = useState('');

  // Auto-reset tenure if selected bank is MCredit and tenure is 18T or 24T
  useEffect(() => {
    if (selectedBank.id === 'mcredit' && (selectedTenure.id === 18 || selectedTenure.id === 24)) {
      setSelectedTenure(TENURES.find(t => t.id === 6) || TENURES[1]);
    }
  }, [selectedBank, selectedTenure]);

  const availableTenures = useMemo(() => {
    if (selectedBank.id === 'mcredit') {
      return TENURES.filter(t => [3, 6, 9, 12].includes(t.id));
    }
    return TENURES;
  }, [selectedBank]);

  // Handlers for selected packages
  const togglePkg = (pkgId) => {
    setSelectedPkgs(prev => {
      const isSelected = !!prev[pkgId];
      if (isSelected) {
        if (Object.keys(prev).length <= 1) return prev; // keep at least one
        const newPkgs = { ...prev };
        delete newPkgs[pkgId];
        return newPkgs;
      } else {
        return {
          ...prev,
          [pkgId]: { quantity: 1, hasAddon: false }
        };
      }
    });
  };

  const updatePkgQty = (pkgId, newQty) => {
    setSelectedPkgs(prev => {
      if (!prev[pkgId]) return prev;
      return {
        ...prev,
        [pkgId]: { ...prev[pkgId], quantity: newQty }
      };
    });
  };

  const togglePkgAddon = (pkgId) => {
    setSelectedPkgs(prev => {
      if (!prev[pkgId]) return prev;
      return {
        ...prev,
        [pkgId]: { ...prev[pkgId], hasAddon: !prev[pkgId].hasAddon }
      };
    });
  };

  // Calculate total quantity of all selected packages combined
  const totalQty = useMemo(() => {
    return Object.values(selectedPkgs).reduce((sum, item) => sum + item.quantity, 0);
  }, [selectedPkgs]);

  // Auto-reset group discount if quantity requirements aren't met
  useEffect(() => {
    if (totalQty < 2 && groupDiscount === '5') setGroupDiscount('none');
    if (totalQty < 3 && groupDiscount === '10') setGroupDiscount('none');
  }, [totalQty, groupDiscount]);

  const calc = useMemo(() => {
    let baseTotal = 0;
    let addonTotal = 0;

    Object.entries(selectedPkgs).forEach(([pkgId, config]) => {
      const pkg = PACKAGES.find(p => p.id === pkgId);
      if (pkg) {
        baseTotal += pkg.price * config.quantity;
        if (config.hasAddon) {
          const pkgAddonPrice = pkg.id === 'memohack_3t_36b' ? OFF_PKG_PRICE_3T_36B : OFF_PKG_PRICE_DEFAULT;
          addonTotal += pkgAddonPrice * config.quantity;
        }
      }
    });

    const totalBeforeDiscount = baseTotal + addonTotal;

    // Calculate total quantity of all selected packages combined
    const totalQtyVal = Object.values(selectedPkgs).reduce((sum, item) => sum + item.quantity, 0);

    // 1. Group Discount
    let groupAmt = 0;
    let groupRate = 0;
    if (groupDiscount === '5' && totalQtyVal >= 2) {
      groupRate = 0.05;
      groupAmt = Math.round(totalBeforeDiscount * groupRate);
    } else if (groupDiscount === '10' && totalQtyVal >= 3) {
      groupRate = 0.10;
      groupAmt = Math.round(totalBeforeDiscount * groupRate);
    }

    // 2. Custom Discount
    const customPct = isCustomActive ? (parseFloat(customDiscountPctStr) || 0) : 0;
    const customVnd = isCustomActive ? (parseInt(customDiscountVndStr.replace(/\D/g, '')) || 0) : 0;
    const customAmt = Math.round(totalBeforeDiscount * (customPct / 100)) + customVnd;

    const totalDiscount = groupAmt + customAmt;
    const finalPrice = totalBeforeDiscount - totalDiscount;

    const installmentPrinciple = isInstallment 
      ? (parseInt(installmentAmtStr.replace(/\D/g, '')) || finalPrice) 
      : 0;
    
    const clampedPrinciple = Math.min(installmentPrinciple, finalPrice);
    
    let fee = 0;
    if (isInstallment) {
      if (selectedBank.id === 'mcredit') {
        if (clampedPrinciple >= 3000000) {
          let mcreditRate = 0;
          if (selectedTenure.id === 3) mcreditRate = 0.0299;
          else if (selectedTenure.id === 6) mcreditRate = 0.0599;
          else if (selectedTenure.id === 9) mcreditRate = 0.0999;
          else if (selectedTenure.id === 12) mcreditRate = 0.1249;
          fee = Math.round(clampedPrinciple * mcreditRate);
        } else if (clampedPrinciple >= 50000) {
          fee = 50000;
        } else {
          fee = 0;
        }
      } else if (selectedBank.id === 'msb') {
        const standardRate = selectedTenure.rate;
        const extraRate = [3, 6, 9, 12].includes(selectedTenure.id) ? 0.03 : 0;
        fee = Math.round(clampedPrinciple * (standardRate + extraRate));
      } else {
        fee = Math.round(clampedPrinciple * selectedTenure.rate);
      }
    }

    const totalWithFee = finalPrice + fee;
    const monthly = isInstallment ? Math.ceil((clampedPrinciple + fee) / selectedTenure.id) : 0;
    const downPayment = finalPrice - clampedPrinciple;

    return { 
      baseTotal, addonTotal, totalBeforeDiscount, 
      groupAmt, customAmt, totalDiscount,
      finalPrice, fee, totalWithFee, 
      monthly, downPayment, principle: clampedPrinciple,
      groupRate: groupRate * 100,
      totalQty: totalQtyVal
    };
  }, [selectedPkgs, isInstallment, installmentAmtStr, selectedTenure, groupDiscount, isCustomActive, customDiscountPctStr, customDiscountVndStr, selectedBank]);

  const bankDetails = useMemo(() => {
    if (paymentAccountType === 'company') {
      return {
        stk: '226661368',
        name: 'CTCP GIAO DUC GMA VIET NAM',
        bank: 'Ngân hàng MB Bank',
        qr: `https://img.vietqr.io/image/MB-226661368-compact.jpg?amount=${calc.totalWithFee}&addInfo=${encodeURIComponent(studentName || 'Ho va ten ba hoac me')}`,
        logo: 'https://api.vietqr.io/img/MB.png',
        placeholder: 'Họ và tên ba hoặc mẹ...',
        copyFormat: `STK: 226661368\nMB Bank\nCT: CTCP GIAO DUC GMA VIET NAM\nNoi dung: ${studentName || '[Ho va ten ba hoac me]'}\nSo tien: ${fmt(calc.totalWithFee)}`
      };
    } else {
      return {
        stk: '103884261840',
        name: 'TRƯƠNG THỊ THU HOÀN',
        bank: 'Vietinbank CN DO THANH - PGD HOANG VAN THU',
        qr: `https://img.vietqr.io/image/ICB-103884261840-compact.jpg?amount=${calc.totalWithFee}&addInfo=${encodeURIComponent(studentName || 'Ho va ten ba hoac me')}`,
        logo: 'https://api.vietqr.io/img/ICB.png',
        placeholder: 'Họ và tên ba hoặc mẹ...',
        copyFormat: `STK: 103884261840\nVietinbank CN DO THANH - PGD HOANG VAN THU\nCT: TRƯƠNG THỊ THU HOÀN\nNoi dung: ${studentName || '[Ho va ten ba hoac me]'}\nSo tien: ${fmt(calc.totalWithFee)}`
      };
    }
  }, [paymentAccountType, calc.totalWithFee, studentName]);

  const handleProceedToPayment = () => {
    const hasMemohack12T = !!selectedPkgs['memohack'];
    const isCombo = Object.keys(selectedPkgs).length > 1;
    const finalAmount = isInstallment ? calc.totalWithFee : calc.finalPrice;
    const isCompany = (hasMemohack12T && finalAmount > 37000000) || (isCombo && finalAmount > 37000000);
    
    setPaymentAccountType(isCompany ? 'company' : 'individual');
    setShowPaymentWarning(true);
  };

  const handleConfirmWarning = () => {
    setShowPaymentWarning(false);
    setActiveView('payment');
  };

  // Update installment amount if total changes
  useEffect(() => {
    if (!installmentAmtStr || installmentAmtStr === '0') {
      setInstallmentAmtStr(calc.finalPrice.toLocaleString('vi-VN'));
    }
  }, [calc.finalPrice]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const qrUrl = `https://img.vietqr.io/image/MB-226661368-compact.png?amount=${calc.totalWithFee}&addInfo=${encodeURIComponent(studentName || 'Hoc vien GMA')}`;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        />

        <motion.div
          initial={{ y: '100%', opacity: 0.5 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0.5 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-h-[96vh] max-w-2xl bg-slate-50 rounded-t-[2.5rem] sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="px-6 py-5 flex items-center justify-between border-b border-slate-100 bg-white/90 backdrop-blur-md sticky top-0 z-10 transition-all">
            <div className="flex items-center gap-4">
              {activeView === 'payment' && (
                <button 
                  onClick={() => setActiveView('calc')}
                  className="p-2 bg-slate-100 rounded-full text-slate-600 hover:bg-slate-200"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}
              <div className="p-3 rounded-2xl bg-gradient-to-br from-brand-orange to-orange-400 shadow-lg shadow-orange-100 ring-4 ring-orange-50">
                {activeView === 'calc' ? <Calculator className="w-6 h-6 text-white" /> : <Receipt className="w-6 h-6 text-white" />}
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900 leading-tight">
                  {activeView === 'calc' ? 'Tính Học Phí' : 'Thanh Toán'}
                </h2>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Genius Mind Academy</p>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-slate-100 text-slate-400 rounded-full hover:bg-slate-200 hover:text-slate-600 transition-all font-black text-[11px] px-4"
            >
              ĐÓNG
            </button>
          </div>

          <div className="p-6 overflow-y-auto flex-1 custom-scrollbar space-y-8 pb-10">
            {activeView === 'calc' ? (
              <>
                {/* Section 1: Product & Qty */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px]">1</span> 
                      Chọn các gói học
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {PACKAGES.map((pkg) => {
                      const isSelected = !!selectedPkgs[pkg.id];
                      return (
                        <button
                          key={pkg.id}
                          onClick={() => togglePkg(pkg.id)}
                          className={`p-5 rounded-[2rem] border-2 text-left transition-all relative ${
                            pkg.id === 'hyperhack' ? 'col-span-2' : ''
                          } ${
                            isSelected
                              ? `${pkg.colorBorder} ${pkg.colorLight} border-[3px] shadow-lg shadow-slate-100 scale-[1.02]`
                              : 'border-slate-100 bg-white hover:border-slate-200 opacity-60 grayscale-[0.5]'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <p className={`font-black text-[16px] ${isSelected ? pkg.colorText : 'text-slate-800'}`}>
                              {pkg.name}
                            </p>
                            {isSelected && (
                              <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black text-white ${pkg.color}`}>
                                ✓ ĐÃ CHỌN
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400 font-bold leading-tight line-clamp-2 mb-3">{pkg.subtitle}</p>
                          <p className={`font-black text-[15px] ${isSelected ? pkg.colorText : 'text-slate-600'}`}>
                            {fmtShort(pkg.price)}
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  {/* Section 1b: Detailed Config for Selected Packages */}
                  <div className="space-y-3 pt-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px]">*</span> 
                      Cấu hình chi tiết gói đã chọn
                    </p>
                    
                    {PACKAGES.filter(pkg => !!selectedPkgs[pkg.id]).map((pkg) => {
                      const config = selectedPkgs[pkg.id];
                      const isHybrid = pkg.id === 'memohack' || pkg.id === 'memohack_9t' || pkg.id === 'memohack_3t_36b';
                      const pkgAddonPrice = pkg.id === 'memohack_3t_36b' ? OFF_PKG_PRICE_3T_36B : OFF_PKG_PRICE_DEFAULT;
                      
                      return (
                        <div key={pkg.id} className="bg-white border-2 border-slate-100 rounded-[2rem] p-5 shadow-sm space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-black text-white ${pkg.color} mb-1`}>
                                {pkg.name}
                              </span>
                              <h4 className="font-black text-sm text-slate-800">{fmt(pkg.price)}</h4>
                            </div>
                            
                            {/* Quantity Selector for this specific package */}
                            <div className="flex items-center bg-slate-50 border border-slate-100 rounded-xl p-1 gap-1">
                              <button 
                                onClick={() => updatePkgQty(pkg.id, Math.max(1, config.quantity - 1))}
                                className="w-8 h-8 flex items-center justify-center font-black text-slate-400 hover:text-brand-orange hover:bg-orange-50 rounded-lg transition-all"
                              >
                                -
                              </button>
                              <span className="w-6 text-center font-black text-slate-800 text-sm">{config.quantity}</span>
                              <button 
                                onClick={() => updatePkgQty(pkg.id, Math.min(10, config.quantity + 1))}
                                className="w-8 h-8 flex items-center justify-center font-black text-slate-400 hover:text-brand-orange hover:bg-orange-50 rounded-lg transition-all"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          
                          {/* Addon Selector for this specific package if hybrid */}
                          {isHybrid && (
                            <button
                              onClick={() => togglePkgAddon(pkg.id)}
                              className={`w-full p-4 rounded-2xl border flex items-center justify-between transition-all ${
                                config.hasAddon ? 'border-green-300 bg-green-50/50' : 'border-slate-100 bg-slate-50/50 hover:border-slate-200'
                              }`}
                            >
                              <div className="flex items-center gap-3 text-left">
                                <div className={`p-2 rounded-xl transition-all ${config.hasAddon ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
                                  <PlusCircle className="w-4 h-4" />
                                </div>
                                <div>
                                  <p className="font-black text-[12px] text-slate-700">
                                    {pkg.id === 'memohack_3t_36b' 
                                      ? 'Suất học Offline bổ sung (3T 36b)' 
                                      : 'Suất học Offline bổ sung'}
                                  </p>
                                  <p className={`text-[10px] font-black ${config.hasAddon ? 'text-green-600' : 'text-slate-400'}`}>
                                    +{fmt(pkgAddonPrice)} / suất
                                  </p>
                                </div>
                              </div>
                              {config.hasAddon ? (
                                <CheckCircle className="w-5 h-5 text-green-500 fill-green-50" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-slate-300" />
                              )}
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Section 2: Discounts (Stackable) */}
                <div className="space-y-4 bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm ring-8 ring-slate-100/50">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                       <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px]">2</span>
                       Ưu đãi Sales chủ động
                    </p>
                    <button 
                      onClick={() => { 
                        setGroupDiscount('none'); 
                        setIsCustomActive(false); 
                        setCustomDiscountPctStr('');
                        setCustomDiscountVndStr('');
                      }}
                      className="text-[10px] font-black text-slate-300 hover:text-red-500 transition-colors uppercase tracking-widest"
                    >
                      Reset
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => {
                        if (totalQty < 2) return;
                        setGroupDiscount(groupDiscount === '5' ? 'none' : '5');
                      }}
                      className={`flex flex-col items-center justify-center p-4 rounded-[1.5rem] border-2 transition-all gap-1.5 ${
                        groupDiscount === '5' 
                          ? 'border-brand-orange bg-orange-50 text-brand-orange shadow-md scale-105' 
                          : totalQty < 2 ? 'border-slate-50 opacity-30 grayscale cursor-not-allowed' : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200 hover:text-slate-600'
                      }`}
                    >
                      <Users className="w-5 h-5" />
                      <span className="font-black text-[11px]">Mua chung 5%</span>
                    </button>

                    <button
                      onClick={() => {
                        if (totalQty < 3) return;
                        setGroupDiscount(groupDiscount === '10' ? 'none' : '10');
                      }}
                      className={`flex flex-col items-center justify-center p-4 rounded-[1.5rem] border-2 transition-all gap-1.5 ${
                        groupDiscount === '10' 
                          ? 'border-brand-orange bg-orange-50 text-brand-orange shadow-md scale-105' 
                          : totalQty < 3 ? 'border-slate-50 opacity-30 grayscale cursor-not-allowed' : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200 hover:text-slate-600'
                      }`}
                    >
                      <Users className="w-5 h-5" />
                      <span className="font-black text-[11px]">Mua chung 10%</span>
                    </button>

                    <button
                      onClick={() => setIsCustomActive(!isCustomActive)}
                      className={`flex flex-col items-center justify-center p-4 rounded-[1.5rem] border-2 transition-all gap-1.5 ${
                        isCustomActive 
                          ? 'border-blue-500 bg-blue-50 text-blue-600 shadow-md scale-105' 
                          : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200 hover:text-slate-600'
                      }`}
                    >
                      <Edit3 className="w-5 h-5" />
                      <span className="font-black text-[11px]">Tùy chỉnh</span>
                    </button>
                  </div>

                  <AnimatePresence>
                    {isCustomActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="bg-blue-600 rounded-2xl p-5 text-white shadow-xl shadow-blue-100 space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            {/* % Discount Input */}
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-white/70">Giảm theo %</label>
                                <Percent className="w-3.5 h-3.5 text-white/50" />
                              </div>
                              <div className="relative">
                                <input
                                  type="number"
                                  min="0"
                                  max="100"
                                  placeholder="0"
                                  value={customDiscountPctStr}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    if (val === '' || (parseFloat(val) >= 0 && parseFloat(val) <= 100)) {
                                      setCustomDiscountPctStr(val);
                                    }
                                  }}
                                  className="w-full bg-white/10 border-b-2 border-white/20 focus:border-white p-2 pr-8 font-black text-xl outline-none placeholder:text-white/25 transition-all rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="absolute right-2 top-1/2 -translate-y-1/2 font-black text-lg text-white/50">%</span>
                              </div>
                            </div>

                            {/* VND Discount Input */}
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-white/70">Giảm tiền mặt</label>
                                <TrendingDown className="w-3.5 h-3.5 text-white/50" />
                              </div>
                              <div className="relative">
                                <input
                                  type="text"
                                  placeholder="0"
                                  value={customDiscountVndStr}
                                  onChange={(e) => {
                                    const rawVal = e.target.value.replace(/\D/g, '');
                                    setCustomDiscountVndStr(rawVal ? parseInt(rawVal).toLocaleString('vi-VN') : '');
                                  }}
                                  className="w-full bg-white/10 border-b-2 border-white/20 focus:border-white p-2 pr-8 font-black text-xl outline-none placeholder:text-white/25 transition-all rounded-lg"
                                />
                                <span className="absolute right-2 top-1/2 -translate-y-1/2 font-black text-lg text-white/50">₫</span>
                              </div>
                            </div>
                          </div>

                          {calc.customAmt > 0 && (
                            <div className="text-[10px] font-black text-blue-100/90 bg-white/10 px-3 py-2 rounded-xl border border-white/10 flex items-center justify-between">
                              <span>Tổng giảm tự chọn:</span>
                              <span className="text-white text-xs">{fmt(calc.customAmt)}</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Section 3: Payment Plan */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                       <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px]">3</span>
                       Kế hoạch thanh toán
                    </p>
                    {isInstallment && (
                      <button
                        onClick={() => setShowInstallmentNotes(true)}
                        className="relative flex items-center gap-1.5 px-3 py-1 bg-amber-500 text-white text-[10px] font-black uppercase tracking-wider rounded-full shadow-md shadow-amber-500/20 hover:bg-amber-600 active:scale-95 transition-all ring-2 ring-amber-400/20"
                      >
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                        </span>
                        LƯU Ý TRẢ GÓP
                      </button>
                    )}
                  </div>
                  
                  <div className="flex gap-3 p-1.5 bg-slate-100/50 rounded-[1.5rem] border border-slate-100">
                    <button 
                      onClick={() => setIsInstallment(false)}
                      className={`flex-1 py-4 rounded-[1.2rem] font-black text-[13px] transition-all flex items-center justify-center gap-2 ${!isInstallment ? 'bg-white shadow-md text-brand-blue ring-1 ring-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      {!isInstallment && <CheckCircle className="w-4 h-4" />}
                      Trả 1 lần
                    </button>
                    <button 
                      onClick={() => setIsInstallment(true)}
                      className={`flex-1 py-4 rounded-[1.2rem] font-black text-[13px] transition-all flex items-center justify-center gap-2 ${isInstallment ? 'bg-white shadow-md text-brand-orange ring-1 ring-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      {isInstallment && <CheckCircle className="w-4 h-4" />}
                      Góp qua thẻ
                    </button>
                  </div>

                  {isInstallment && (
                    <motion.div layout className="space-y-4">
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2 px-1">Số tiền đăng ký trả góp</label>
                        <div className="relative group">
                          <input 
                            type="text" 
                            value={installmentAmtStr}
                            onChange={(e) => setInstallmentAmtStr(e.target.value)}
                            className="w-full p-5 bg-white border-2 border-slate-100 rounded-[1.5rem] font-black text-slate-800 text-lg outline-none focus:border-brand-orange/30 transition-all pl-12 shadow-sm"
                          />
                          <CardIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-200 group-focus-within:text-brand-orange transition-colors" />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2 px-1">Ngân hàng phát hành thẻ</label>
                        <div className="relative">
                          <select
                            value={selectedBank.id}
                            onChange={(e) => {
                              const bank = BANKS.find(b => b.id === e.target.value);
                              if (bank) setSelectedBank(bank);
                            }}
                            className="w-full p-5 bg-white border-2 border-slate-100 rounded-[1.5rem] font-black text-slate-800 text-[14px] outline-none focus:border-brand-orange/30 transition-all shadow-sm appearance-none cursor-pointer pr-12"
                          >
                            {BANKS.map(b => (
                              <option key={b.id} value={b.id}>{b.name}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-6 gap-2">
                        {availableTenures.map(t => (
                          <button
                            key={t.id}
                            onClick={() => setSelectedTenure(t)}
                            className={`py-4 rounded-[1rem] font-black text-[13px] border-2 transition-all ${
                              selectedTenure.id === t.id 
                                ? 'border-brand-orange bg-orange-50 text-brand-orange shadow-md scale-105' 
                                : 'border-slate-50 bg-white text-slate-300 hover:border-slate-100 hover:text-slate-500'
                            }`}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Final Result Card (Refined Priority) */}
                <div className="bg-slate-900 rounded-[2.8rem] p-7 text-white shadow-2xl relative overflow-hidden transition-all duration-500">
                  {/* Background Accents for Premium Look */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-orange/20 rounded-full blur-[60px]" />
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-blue/20 rounded-full blur-[60px]" />
                  
                  <div className="relative space-y-6">
                    {/* Priority Section: Hero Metric */}
                    <div className="border-b border-white/10 pb-6">
                      {isInstallment ? (
                        <div className="space-y-4">
                          <div className="bg-white/10 rounded-[2rem] p-6 border border-white/10 shadow-inner group">
                            <p className="text-brand-orange text-[10px] font-black uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                              <Sparkles className="w-3 h-3" /> Thanh toán mỗi tháng chỉ
                            </p>
                            <div className="flex items-baseline gap-2">
                              <h3 className="text-5xl font-black text-white tracking-tight leading-none group-hover:scale-105 transition-transform duration-300">
                                {fmt(calc.monthly)}
                              </h3>
                              <span className="text-white/40 font-bold text-sm">/ {selectedTenure.label}</span>
                            </div>
                            <p className="text-white/20 text-[9px] mt-3 font-bold uppercase tracking-tighter flex items-center gap-2">
                              <CheckCircle className="w-3 h-3 text-brand-orange" /> Hỗ trợ góp 0% qua 30+ Ngân hàng
                            </p>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                              <p className="text-white/40 text-[9px] font-black uppercase tracking-widest mb-1">Tổng phải trả</p>
                              <p className="text-xl font-black text-brand-orange">{fmt(calc.totalWithFee)}</p>
                            </div>
                            <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                              <p className="text-white/40 text-[9px] font-black uppercase tracking-widest mb-1">Phí chuyển đổi</p>
                              <p className="text-xl font-black text-white">{fmt(calc.fee)}</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                            Tổng phải trả ({calc.totalQty} HS)
                          </p>
                          <h3 className="text-5xl font-black text-white tracking-tight leading-none">
                            {fmt(calc.finalPrice)}
                          </h3>
                          <div className="flex gap-2">
                            <span className="px-3 py-1 bg-brand-orange/20 text-brand-orange rounded-full text-[10px] font-black border border-brand-orange/30">
                              THANH TOÁN 1 LẦN
                            </span>
                            {calc.totalDiscount > 0 && (
                              <span className="px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-[10px] font-black border border-green-500/30">
                                TIẾT KIỆM {fmt(calc.totalDiscount)}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Breakdown Details */}
                    <div className="space-y-3 px-1">
                      <div className="flex justify-between items-center text-[12px] font-bold text-white/40 hover:text-white/60 transition-colors">
                        <span>Giá gốc niêm yết</span>
                        <span>{fmt(calc.baseTotal)}</span>
                      </div>
                      
                      {calc.addonTotal > 0 && (
                        <div className="flex justify-between items-center text-[12px] font-bold text-white/40">
                          <span>Phí Offline bổ sung</span>
                          <span>{fmt(calc.addonTotal)}</span>
                        </div>
                      )}

                      {calc.groupAmt > 0 && (
                        <div className="flex justify-between items-center text-[12px] font-extrabold text-green-400 bg-green-400/5 px-3 py-2 rounded-xl border border-green-400/10">
                          <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> Ưu đãi mua chung ({calc.totalQty} HS)</span>
                          <span>- {fmt(calc.groupAmt)}</span>
                        </div>
                      )}

                      {calc.customAmt > 0 && (
                        <div className="flex justify-between items-center text-[12px] font-extrabold text-blue-400 bg-blue-400/5 px-3 py-2 rounded-xl border border-blue-400/10">
                          <span className="flex items-center gap-1.5"><Tag className="w-3.5 h-3.5" /> Chiết khấu Sales</span>
                          <span>- {fmt(calc.customAmt)}</span>
                        </div>
                      )}

                      {isInstallment && (
                        <div className="pt-4 mt-4 border-t border-white/5 space-y-3">
                          <div className="flex justify-between items-center text-[12px] font-bold text-white/60">
                            <span>Số tiền cà thẻ trả góp</span>
                            <span className="text-white font-black">{fmt(calc.principle)}</span>
                          </div>
                          <div className="flex justify-between items-center text-[12px] font-bold text-white/60">
                            <span>Thanh toán bằng TM/CK</span>
                            <span className="text-white font-black">{fmt(calc.downPayment)}</span>
                          </div>
                        </div>
                      )}

                      {!isInstallment && (
                        <div className="bg-brand-orange/10 border border-brand-orange/20 rounded-2xl p-4 mt-4 flex items-start gap-3">
                          <Info className="w-5 h-5 text-brand-orange shrink-0" />
                          <p className="text-[11px] text-white/70 leading-relaxed font-medium">
                            Báo giá thanh toán 1 lần đã áp dụng các ưu đãi tốt nhất. Vui lòng thanh toán trong ngày để giữ chỗ.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    <button 
                      onClick={handleProceedToPayment}
                      className="w-full bg-brand-orange hover:bg-orange-600 active:scale-95 py-5 rounded-[1.8rem] font-black text-lg transition-all flex items-center justify-center gap-3 shadow-2xl shadow-orange-900/40 text-white mt-4 group"
                    >
                      <Receipt className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                      Tiến hành Thanh toán
                      <ArrowRight className="w-5 h-5 opacity-50 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              /* Payment View (Step 4: QR & Instructions) */
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Account Type Selector */}
                <div className="flex gap-3 p-1.5 bg-slate-100/50 rounded-[1.8rem] border border-slate-100">
                  <button 
                    onClick={() => setPaymentAccountType('company')}
                    className={`flex-1 py-4 rounded-[1.5rem] font-black text-[13px] transition-all flex items-center justify-center gap-2 ${paymentAccountType === 'company' ? 'bg-white shadow-md text-brand-blue ring-1 ring-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    {paymentAccountType === 'company' && <CheckCircle className="w-4 h-4" />}
                    Tài khoản CÔNG TY
                  </button>
                  <button 
                    onClick={() => setPaymentAccountType('individual')}
                    className={`flex-1 py-4 rounded-[1.5rem] font-black text-[13px] transition-all flex items-center justify-center gap-2 ${paymentAccountType === 'individual' ? 'bg-white shadow-md text-brand-orange ring-1 ring-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    {paymentAccountType === 'individual' && <CheckCircle className="w-4 h-4" />}
                    Tài khoản CÁ NHÂN
                  </button>
                </div>

                <div className="bg-white rounded-[2.5rem] border-2 border-slate-100 overflow-hidden shadow-2xl shadow-slate-200/50">
                  <div className="bg-slate-900 px-8 py-5 flex items-center justify-between">
                    <div>
                      <p className="text-white font-black text-sm tracking-tight">
                        {paymentAccountType === 'company' ? 'TÀI KHOẢN CÔNG TY' : 'TÀI KHOẢN CÁ NHÂN'}
                      </p>
                      <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Genius Mind Academy</p>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full text-[10px] font-black text-white/90 ring-1 ring-white/10">
                      <CreditCard className="w-3.5 h-3.5" />
                      VietQR • Napas247
                    </div>
                  </div>

                  <div className="p-8 flex flex-col md:flex-row gap-10 items-center md:items-start">
                    {/* QR Code */}
                    <div className="w-full max-w-[280px] shrink-0 group">
                      <div className="bg-white p-5 rounded-[2rem] border-2 border-slate-100 shadow-xl relative transition-transform hover:scale-[1.02]">
                        <img 
                          src={bankDetails.qr} 
                          alt="QR Payment" 
                          className="w-full h-auto rounded-xl"
                        />
                        <div className="absolute inset-0 bg-brand-orange/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem] pointer-events-none" />
                      </div>
                      <div className="flex justify-center items-center gap-4 mt-4 opacity-70 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                        <img src={bankDetails.logo} className="h-6 object-contain" alt="Bank Logo" />
                        <span className="text-slate-300 font-light">|</span>
                        <span className="text-[10px] font-black text-slate-400 tracking-wider">Napas247</span>
                      </div>
                    </div>

                    {/* Instructions */}
                    <div className="flex-1 space-y-8">
                       {[
                         { id: 1, title: 'Chuyển khoản vào STK', content: bankDetails.stk, sub: bankDetails.name, bank: bankDetails.bank, copy: true },
                         { id: 2, title: 'Nội dung chuyển khoản', input: true },
                         { id: 3, title: 'Xác nhận & Hoàn tất', detail: 'Chụp hình giao dịch thành công và gửi cho nhân viên để kích hoạt tài khoản ngay.' }
                       ].map((step) => (
                         <div key={step.id} className="flex gap-5 group">
                           <div className="w-10 h-10 rounded-2xl bg-slate-100/80 flex items-center justify-center text-slate-900 font-black text-lg shrink-0 group-hover:bg-brand-orange group-hover:text-white transition-all shadow-sm">
                             {step.id}
                           </div>
                           <div className="flex-1 min-w-0">
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5">{step.title}</p>
                             {step.copy && (
                               <div className="flex items-center gap-3 cursor-pointer group/item" onClick={() => handleCopy(step.content)}>
                                 <p className="text-xl font-black text-slate-900 leading-none truncate">{step.content}</p>
                                 <Copy className="w-4 h-4 text-slate-300 group-hover/item:text-brand-orange transition-colors" />
                               </div>
                             )}
                             {step.sub && <p className="text-[13px] font-black text-slate-500 mt-1">{step.sub}</p>}
                             {step.bank && <p className="text-[11px] font-bold text-slate-400 italic mt-0.5">{step.bank}</p>}
                             {step.input && (
                               <div className="relative mt-2">
                                 <input 
                                   type="text"
                                   placeholder={bankDetails.placeholder}
                                   value={studentName}
                                   onChange={(e) => setStudentName(e.target.value)}
                                   className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-black text-slate-800 outline-none focus:border-brand-orange transition-all placeholder:text-slate-300"
                                 />
                               </div>
                             )}
                             {step.detail && <p className="text-[13px] font-medium text-slate-500 leading-relaxed mt-1">{step.detail}</p>}
                           </div>
                         </div>
                       ))}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-100/50 border-2 border-slate-100 rounded-[2rem] p-6 flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-brand-orange shrink-0 mt-1" />
                  <p className="text-xs font-bold text-slate-500 leading-relaxed">
                    Lưu ý: Báo giá trên chưa bao gồm 8% VAT. Nếu quý khách có nhu gian xuất hóa đơn đỏ, vui lòng cộng thêm 8% vào tổng giá trị đơn hàng.
                  </p>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => setActiveView('calc')}
                    className="flex-1 py-5 bg-slate-200 hover:bg-slate-300 text-slate-900 font-black rounded-3xl transition-all shadow-inner active:scale-98"
                  >
                    Quay lại
                  </button>
                  <button 
                    onClick={() => handleCopy(bankDetails.copyFormat)}
                    className="flex-[2] py-5 bg-slate-900 text-white font-black rounded-3xl transition-all shadow-2xl shadow-slate-900/30 flex items-center justify-center gap-3 active:scale-98 group"
                  >
                    {copied ? <CheckCircle className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
                    {copied ? 'Đã sao chép!' : 'Copy nội dung chuyển khoản'}
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Warning Modal overlay */}
          <AnimatePresence>
            {showPaymentWarning && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-30 flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md"
              >
                <motion.div
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-slate-100 flex flex-col space-y-5 text-left"
                >
                  {/* Icon & Title */}
                  <div className="flex items-center gap-3 text-amber-500">
                    <div className="p-3 bg-amber-50 rounded-2xl">
                      <AlertCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-black text-lg text-slate-950 leading-tight">Chú Ý Chuyển Khoản</h3>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Quy định giao dịch GMA</p>
                    </div>
                  </div>

                  {/* Warning Content */}
                  <div className="text-slate-600 text-sm font-medium leading-relaxed space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div className="flex gap-2 items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-2 shrink-0" />
                      <p>
                        Với các tài khoản <strong>Memohack 12T</strong> thanh toán <strong>&gt; 37.000.000đ</strong> hoặc các <strong>combo sự kiện</strong> thanh toán <strong>&gt; 37.000.000đ</strong> &rarr; Chuyển khoản vào tài khoản <strong>CÔNG TY</strong>.
                      </p>
                    </div>
                    <div className="flex gap-2 items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-2 shrink-0" />
                      <p>
                        Với các khóa ngắn hạn khác <strong>ngoài Memohack 12T</strong> &rarr; Chuyển vào tài khoản <strong>CÁ NHÂN</strong>.
                      </p>
                    </div>
                  </div>

                  {/* Recommended Account Prompt */}
                  <div className="p-4 rounded-2xl border border-blue-100 bg-blue-50/50 flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-blue-900 leading-tight">Gợi ý chuyển khoản</p>
                      <p className="text-xs text-blue-700/80 mt-1">
                        Hệ thống tự động đề xuất chuyển khoản vào tài khoản: <strong>{paymentAccountType === 'company' ? 'CÔNG TY (GMA VIỆT NAM)' : 'CÁ NHÂN (TRƯƠNG THỊ THU HOÀN)'}</strong>.
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <button
                    onClick={handleConfirmWarning}
                    className="w-full bg-brand-orange hover:bg-orange-600 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-orange-100 flex items-center justify-center gap-2"
                  >
                    Tôi đã hiểu & Tiếp tục
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Installment Notes Modal overlay */}
          <AnimatePresence>
            {showInstallmentNotes && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-40 flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md"
              >
                <motion.div
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-slate-100 flex flex-col max-h-[85vh] text-left overflow-hidden"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3 text-amber-500">
                      <div className="p-2.5 bg-amber-50 rounded-xl">
                        <Info className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-black text-base text-slate-950 leading-tight">Lưu Ý Trả Góp 0%</h3>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Quy định và Phí dịch vụ</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowInstallmentNotes(false)}
                      className="p-1.5 hover:bg-slate-100 rounded-full transition-all text-slate-400 hover:text-slate-650"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="flex-1 overflow-y-auto py-4 space-y-5 text-slate-650 text-xs font-semibold leading-relaxed custom-scrollbar">
                    <div className="space-y-3">
                      <div className="p-3 bg-red-50 text-red-750 border border-red-100 rounded-xl flex gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <p><strong>KHÔNG tự ý đăng ký trả góp:</strong> Vui lòng nhắc nhở chủ thẻ không chủ động đăng ký trả góp qua SMS, Web, App hoặc nghe cuộc gọi tư vấn trả góp từ ngân hàng.</p>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="font-bold text-slate-800 text-sm">1. Quy định chung:</p>
                        <ul className="list-disc pl-4 space-y-1.5 text-slate-500">
                          <li>Thay đổi/hủy đăng ký trả góp chỉ áp dụng khi giao dịch chưa chuyển đổi thành công.</li>
                          <li>Biểu phí chuyển đổi có thể thay đổi theo quy định của Ngân hàng trong từng thời kỳ.</li>
                          <li>Phí tham gia chương trình trả góp sẽ không được hoàn lại trong trường hợp chủ thẻ tự thực hiện đăng ký riêng với Ngân hàng.</li>
                        </ul>
                      </div>

                      <div className="border-t border-slate-100 pt-3 space-y-2">
                        <p className="font-bold text-slate-800 text-sm">2. Quy định phí theo Ngân hàng đặc biệt:</p>
                        
                        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                          <p className="font-bold text-slate-800 flex items-center gap-1.5 text-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Maritime Bank (MSB)
                          </p>
                          <p className="text-slate-500 pl-3">
                            Thu thêm chủ thẻ phí quản lý giao dịch trả góp: <strong>3%</strong> trên tổng số tiền thanh toán (kỳ hạn 3T, 6T, 9T, 12T). Phí này sẽ chia đều cho các kỳ trả góp.
                          </p>
                        </div>

                        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5">
                          <p className="font-bold text-slate-800 flex items-center gap-1.5 text-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> MCredit (Tài chính Quân đội)
                          </p>
                          <p className="text-slate-500 pl-3">
                            Phí chuyển đổi thu một lần (chưa gồm VAT):
                          </p>
                          <ul className="list-disc pl-7 space-y-1 text-slate-500">
                            <li>Giao dịch từ <strong>3.000.000đ trở lên</strong>:
                              <ul className="list-none pl-3 mt-0.5 grid grid-cols-2 gap-1 text-[11px] font-bold text-slate-700">
                                <li>• Kỳ hạn 3T: 2.99%</li>
                                <li>• Kỳ hạn 6T: 5.99%</li>
                                <li>• Kỳ hạn 9T: 9.99%</li>
                                <li>• Kỳ hạn 12T: 12.49%</li>
                              </ul>
                            </li>
                            <li className="mt-1">Giao dịch từ <strong>500.000đ đến 2.999.999đ</strong>: Thu cố định <strong>50.000đ</strong>.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="pt-4 border-t border-slate-100">
                    <button
                      onClick={() => setShowInstallmentNotes(false)}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black py-3.5 rounded-xl transition-all"
                    >
                      Đóng hướng dẫn
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
