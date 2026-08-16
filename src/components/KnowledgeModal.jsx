import React, { useState } from 'react';
import { X, Copy, CheckCircle, ExternalLink, Sparkles, PlayCircle, ChevronRight, FileText, Share2, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Extract Video/File IDs from various URL formats
function getYouTubeId(url) {
  if (!url) return null;
  const patterns = [
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function getFacebookType(url) {
  if (!url) return null;
  if (url.includes('facebook.com/reel/')) return 'reel';
  if (url.includes('facebook.com/share/')) return 'share';
  return null;
}

function isDriveLink(url) {
  return url && (url.includes('drive.google.com') || url.includes('docs.google.com'));
}

// Parse content text and extract segments (text, media, objections)
function parseSmartContent(content) {
  if (!content) return [];

  const segments = [];
  const lines = content.split('\n');
  let currentText = [];

  const pushText = () => {
    if (currentText.length > 0) {
      segments.push({ type: 'text', content: currentText.join('\n').trim() });
      currentText = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Detect Objection Pattern: [n] 'Question' followed by → 'Answer'
    const objectionMatch = line.match(/^\[\d+\]\s+['"](.+)['"]$/);
    if (objectionMatch && lines[i+1]?.trim().startsWith('→')) {
      pushText();
      const question = objectionMatch[1];
      const answer = lines[i+1].trim().replace(/^→\s+['"]/, '').replace(/['"]$/, '');
      segments.push({ type: 'objection', question, answer });
      i++; // Skip answer line
      continue;
    }

    // Detect Media Pattern: • Label followed by URL
    if (line.startsWith('•')) {
      const nextLine = lines[i+1]?.trim() || '';
      const urlMatch = nextLine.match(/https?:\/\/[^\s]+/);
      if (urlMatch) {
        pushText();
        const label = line.replace('•', '').trim();
        const url = urlMatch[0].replace(/["']/g, '');
        segments.push({ type: 'media', label, url });
        i++; // Skip URL line
        continue;
      }
    }

    // Default: Collect as normal text
    currentText.push(line);
  }
  pushText();
  return segments;
}

function ActionButton({ icon: Icon, label, onClick, success, successLabel, primary }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[11px] font-black transition-all border-2
        ${success 
          ? 'bg-green-600 border-green-600 text-white' 
          : primary
            ? 'bg-slate-900 border-slate-900 text-white hover:bg-slate-800'
            : 'bg-white border-slate-100 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
        }
      `}
    >
      {success ? <CheckCircle className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
      <span>{success ? successLabel : label}</span>
    </button>
  );
}

function MediaCard({ url, label, onCopy }) {
  const ytId = getYouTubeId(url);
  const fbType = getFacebookType(url);
  const drive = isDriveLink(url);
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onCopy(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const Icon = ytId ? PlayCircle : fbType ? Share2 : FileText;
  const typeLabel = ytId ? 'YouTube' : fbType === 'reel' ? 'Facebook Reel' : drive ? 'Google Drive' : 'Link';
  const themeColor = ytId ? 'text-red-600 bg-red-50' : fbType ? 'text-blue-600 bg-blue-50' : 'text-emerald-600 bg-emerald-50';

  return (
    <div className="rounded-2xl border-2 border-slate-100 bg-white overflow-hidden mb-4 group hover:border-slate-200 transition-all">
      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${themeColor}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[9px] font-black uppercase tracking-wider opacity-60 mb-0.5 block">{typeLabel}</span>
            <p className="text-[13px] font-black text-slate-800 leading-tight line-clamp-2">{label}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <ActionButton 
            icon={ExternalLink} 
            label="Xem ngay" 
            onClick={() => window.open(url, '_blank')} 
          />
          <ActionButton 
            icon={Copy} 
            label="Copy Link" 
            success={copied}
            successLabel="Đã Copy"
            onClick={handleCopy}
            primary
          />
        </div>
      </div>
    </div>
  );
}

function ObjectionCard({ question, answer, onCopy }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy(answer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-slate-100 p-5 mb-4 hover:border-red-100 transition-all">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-8 h-8 bg-red-100 text-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <MessageCircle className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Câu hỏi của khách:</h4>
          <p className="text-[13px] font-black text-slate-800 leading-snug">"{question}"</p>
        </div>
      </div>
      
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 mb-4">
        <h4 className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-1">Giải pháp chốt:</h4>
        <p className="text-[12px] font-bold text-slate-600 leading-relaxed italic">"{answer}"</p>
      </div>

      <ActionButton 
        icon={Copy} 
        label="Copy câu trả lời gửi khách" 
        success={copied}
        successLabel="Đã sao chép kịch bản!"
        onClick={handleCopy}
        primary
      />
    </div>
  );
}

export default function KnowledgeModal({ isOpen, onClose, data }) {
  if (!isOpen || !data) return null;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
        />

        <motion.div
          initial={{ y: "100%", opacity: 0.5 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0.5 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative w-full max-h-[94vh] max-w-xl bg-slate-50 rounded-t-[2.5rem] sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className={`p-6 flex items-center justify-between border-b border-slate-100 bg-white/90 backdrop-blur-md sticky top-0 z-10`}>
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-2xl bg-white shadow-premium ${data.color.split(' ')[1]}`}>
                {data.icon}
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900 leading-tight">{data.title}</h2>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{data.shortDesc}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2.5 bg-slate-100 text-slate-400 rounded-full hover:bg-slate-200 hover:text-slate-800 transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto flex-1 custom-scrollbar bg-slate-50/50 space-y-6 pb-12">
            {data.bannerImage && (
              <div className="relative group overflow-hidden rounded-[2rem] mb-2">
                <img 
                  src={data.bannerImage} 
                  alt={data.title} 
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            )}
            
            <div className="space-y-8">
              {data.details.map((detail, dIdx) => {
                const segments = parseSmartContent(detail.content);

                return (
                  <div key={dIdx} className="space-y-4">
                    <h3 className="font-black text-slate-900 flex items-center gap-3 text-[15px] px-2">
                      <div className={`w-2 h-6 rounded-full ${data.color.split(' ')[0].replace('bg-', 'bg-') || 'bg-brand-orange'}`} />
                      {detail.heading}
                    </h3>
                    
                    <div className="space-y-4">
                      {segments.map((seg, sIdx) => {
                        if (seg.type === 'objection') {
                          return <ObjectionCard key={sIdx} question={seg.question} answer={seg.answer} onCopy={handleCopy} />;
                        }
                        if (seg.type === 'media') {
                          return <MediaCard key={sIdx} url={seg.url} label={seg.label} onCopy={handleCopy} />;
                        }
                        return (
                          <div key={sIdx} className="bg-white/50 backdrop-blur-sm rounded-2xl p-5 border border-slate-100 mb-2">
                            <p className="text-slate-600 text-[13px] font-bold whitespace-pre-wrap leading-relaxed opacity-90">
                              {seg.content}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-brand-orange/5 border-2 border-orange-100 rounded-3xl p-5 flex items-start gap-4 mt-8">
              <Sparkles className="w-6 h-6 text-brand-orange flex-shrink-0 animate-pulse" />
              <p className="text-[11px] text-slate-500 font-bold leading-relaxed">
                <span className="text-brand-orange uppercase font-black block mb-1">Mẹo hay Sales Pro:</span>
                Sử dụng các video case study và kịch bản trả lời chuẩn sẽ giúp khách hàng yên tâm hơn và rút ngắn thời gian chốt đơn tới 30%.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
