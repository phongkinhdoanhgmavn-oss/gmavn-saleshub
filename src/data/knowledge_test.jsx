import { 
  Box, 
  Users, 
  GitMerge, 
  MessageSquare, 
  ShieldQuestion, 
  CreditCard, 
  FolderOpen, 
  Headset, 
  GraduationCap,
  Compass,
  Lightbulb,
  HelpCircle
} from "lucide-react";
import React from "react";

export const knowledgeData = [
  {
    id: 1,
    title: "San pham & Giai phap",
    shortDesc: "Memohack, Hyperhack, Cong nghe do song nao",
    icon: React.createElement(Box, { className: "w-8 h-8" }),
    color: "bg-orange-100 text-brand-orange",
    bannerImage: "/memohack_banner.png",
    details: [
      {
        heading: "1. Memohack (5-15 tuoi) - Tre nho vang, hoc nhe nhang",
        content: "TEST OK"
      }
    ]
  }
];