import React, { useState, useMemo } from 'react';
import { Search, Sparkles, FileText, ChevronRight, Zap, Trophy, MessageCircle, Calculator, X } from 'lucide-react';
import { knowledgeData } from '../data/knowledge';
import KnowledgeModal from './KnowledgeModal';
import ProfileModal from './ProfileModal';
import InstallmentCalc from './InstallmentCalc';
import { motion, AnimatePresence } from 'framer-motion';

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [calcOpen, setCalcOpen] = useState(false);

  // Filter data based on search query
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return knowledgeData;
    
    const query = searchQuery.toLowerCase();
    return knowledgeData.filter(item => {
      const matchTitle = item.title.toLowerCase().includes(query);
      const matchDesc = item.shortDesc.toLowerCase().includes(query);
      const matchDetails = item.details.some(detail => 
        detail.heading.toLowerCase().includes(query) || 
        detail.content.toLowerCase().includes(query)
      );
      
      return matchTitle || matchDesc || matchDetails;
    });
  }, [searchQuery]);

  return (
    <div 
      className="min-h-screen bg-slate-50 pb-24 sm:pb-12 font-sans bg-[url('/app_main_bg.png')] bg-cover bg-fixed bg-center"
    >
      {/* Dynamic Header */}
      <div className="sticky top-0 z-30 transition-all duration-300">
        <div className="bg-white/70 backdrop-blur-xl border-b border-white/20 px-6 pt-10 pb-6 rounded-b-[3rem] shadow-premium">
          <div className="max-w-xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 bg-brand-orange/10 text-brand-orange text-[10px] font-bold uppercase tracking-wider rounded-md">Pro Hub</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">v2.0</span>
                </div>
                <h1 className="text-3xl font-black bg-gradient-to-r from-brand-blue to-brand-orange bg-clip-text text-transparent tracking-tight">
                  GMA Sales Hub
                </h1>
              </motion.div>
              <motion.img 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                src="/logo.png.png" 
                alt="GMA VN" 
                className="h-10 w-auto object-contain drop-shadow-sm" 
              />
            </div>

            {/* Search Experience */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400 group-focus-within:text-brand-orange transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-12 pr-4 py-4 bg-slate-100/50 border-2 border-transparent rounded-[1.5rem] text-slate-900 placeholder-slate-400 focus:bg-white focus:border-brand-orange/30 focus:shadow-glow transition-all outline-none text-[15px] font-medium"
                placeholder="Khám phá kịch bản, giải pháp..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <AnimatePresence>
                {searchQuery && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-6 mt-8">
        {/* Featured Cards row: Profile + Calculator */}
        {!searchQuery && (
          <div className="flex flex-col gap-4 mb-8">
            {/* Profile Card */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setProfileOpen(true)}
              className="w-full relative overflow-hidden group rounded-[2rem]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue to-brand-blue/90 rounded-[2rem]" />
              <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-500" />
              
              <div className="relative p-6 flex items-center gap-5">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg border border-white/20 group-hover:rotate-6 transition-transform">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-extrabold text-white text-lg tracking-tight">Hồ Sơ GMA Việt Nam</h3>
                    <Zap className="w-4 h-4 text-brand-orange fill-brand-orange" />
                  </div>
                  <p className="text-white/70 text-sm font-medium leading-snug">Hồ sơ năng lực, bằng cấp & PDF giới thiệu chi tiết.</p>
                </div>
                <div className="ml-auto">
                  <div className="p-2 bg-white/10 rounded-full text-white group-hover:bg-brand-orange transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </motion.button>

            {/* Calculator Card */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCalcOpen(true)}
              className="w-full relative overflow-hidden group rounded-[2rem]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-orange via-orange-500 to-amber-500 rounded-[2rem]" />
              <div className="absolute -left-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-500" />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-10 group-hover:opacity-20 transition-opacity">
                <Calculator className="w-24 h-24 text-white" />
              </div>
              
              <div className="relative p-6 flex items-center gap-5">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg border border-white/20 group-hover:-rotate-6 transition-transform">
                  <Calculator className="w-8 h-8 text-white" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-extrabold text-white text-lg tracking-tight">Tính Học Phí</h3>
                    <span className="px-2 py-0.5 bg-white/20 text-white text-[10px] font-black rounded-full uppercase tracking-wide">Mới</span>
                  </div>
                  <p className="text-white/80 text-sm font-medium leading-snug">Trả góp 0% · Ưu đãi · Chi phí/ngày & buổi</p>
                </div>
                <div className="ml-auto">
                  <div className="p-2 bg-white/10 rounded-full text-white group-hover:bg-white/30 transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </motion.button>
          </div>
        )}

        {/* Bento Grid layout */}
        <div className="grid grid-cols-2 gap-4">
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setSelectedItem(item)}
                className={`flex flex-col items-start gap-4 p-5 rounded-[2rem] text-left transition-all relative overflow-hidden glass-card group
                  ${index % 4 === 0 ? 'col-span-2 aspect-auto py-6' : 'aspect-square'}
                `}
              >
                <div className={`p-4 rounded-2xl ${item.color} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <div className="z-10 mt-auto">
                  <h3 className="font-black text-slate-900 text-[15px] leading-tight mb-1 group-hover:text-brand-orange transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wide line-clamp-1 opacity-80">
                    {item.shortDesc}
                  </p>
                </div>
                <div className="absolute top-4 right-4 text-slate-200 group-hover:text-brand-orange/20 transition-colors">
                  <Sparkles className="w-6 h-6" />
                </div>
              </motion.button>
            ))
          ) : (
            <div className="col-span-2 py-20 text-center space-y-4">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                <Search className="w-8 h-8 text-slate-300" />
              </div>
              <p className="text-slate-400 font-bold">Không tìm thấy "{searchQuery}"</p>
            </div>
          )}
        </div>
      </div>

      {/* Modern Footer */}
      <footer className="max-w-xl mx-auto px-6 mt-16 pb-12 text-center">
        <div className="p-8 bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-white/20 space-y-4">
          <div className="flex justify-center gap-3 mb-2">
             <Trophy className="w-6 h-6 text-brand-orange" />
             <MessageCircle className="w-6 h-6 text-brand-blue" />
          </div>
          <p className="font-black text-brand-blue uppercase tracking-widest text-[12px]">GMA VIỆT NAM</p>
          <p className="text-slate-600 text-[13px] font-medium leading-relaxed">
            Khai mở trí tuệ - Vững bước tương lai
            <br />
            Hà Nội, Việt Nam
          </p>
          <div className="pt-4 border-t border-slate-200/50 text-[11px] text-slate-400 font-medium">
            Project GMA Sales Hub 2026 • Build with ❤️
          </div>
        </div>
      </footer>

      {/* Modals */}
      <KnowledgeModal 
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        data={selectedItem}
      />

      <ProfileModal
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
      />

      <InstallmentCalc
        isOpen={calcOpen}
        onClose={() => setCalcOpen(false)}
      />
    </div>
  );
}
