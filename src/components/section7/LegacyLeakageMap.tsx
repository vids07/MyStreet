'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FileSpreadsheet, 
  PenTool, 
  AlertTriangle, 
  TrendingDown, 
  Clock, 
  UserX, 
  Shield, 
  HelpCircle, 
  FileText, 
  CheckSquare, 
  AlertOctagon, 
  RefreshCw, 
  Phone, 
  Lock, 
  Download,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Eye,
  Check,
  AlertCircle
} from 'lucide-react';
import { formatLakh } from '@/lib/utils/road-display';

type LegacyLeakageMapProps = {
  roadSystemId: string;
  roadName: string;
  contractorName: string;
  milestoneAmount: number;
};

export default function LegacyLeakageMap({
  roadSystemId,
  roadName,
  contractorName,
  milestoneAmount
}: LegacyLeakageMapProps) {
  const [isSigned, setIsSigned] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
  const [isLensActive, setIsLensActive] = useState(false);

  // Simulation timeline control
  useEffect(() => {
    if (!isSigned || !isSimulating) return;

    const timers = [
      setTimeout(() => setCurrentStep(1), 500),
      setTimeout(() => setCurrentStep(2), 2000),
      setTimeout(() => setCurrentStep(3), 4000),
      setTimeout(() => setCurrentStep(4), 6000),
      setTimeout(() => {
        setCurrentStep(5);
        setIsSimulating(false);
      }, 8000)
    ];

    return () => timers.forEach(clearTimeout);
  }, [isSigned, isSimulating]);

  const handleSignLedger = () => {
    setIsSigned(true);
    setIsSimulating(true);
    setCurrentStep(0);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoverPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Prestige PWD Projects list
  const projects = [
    {
      title: "Signature Bridge Approach Viaduct",
      cost: 1420,
      date: "Jan 2026",
      status: "COMPLETED & SANCTIONED",
      color: "from-[#0D63AE] to-blue-700",
      description: "Heavy-duty dual 4-lane structural corridor connecting North & East Delhi. 100% concrete curb compliant.",
      svg: (
        <svg viewBox="0 0 400 150" className="w-full h-full opacity-90">
          <defs>
            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
            <linearGradient id="bridgeGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#D97706" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
          </defs>
          <rect width="400" height="150" fill="url(#skyGrad)" />
          {/* Bridge Cables */}
          <line x1="200" y1="10" x2="50" y2="120" stroke="#475569" strokeWidth="1.5" />
          <line x1="200" y1="10" x2="100" y2="120" stroke="#475569" strokeWidth="1.5" />
          <line x1="200" y1="10" x2="150" y2="120" stroke="#475569" strokeWidth="1.5" />
          <line x1="200" y1="10" x2="250" y2="120" stroke="#475569" strokeWidth="1.5" />
          <line x1="200" y1="10" x2="300" y2="120" stroke="#475569" strokeWidth="1.5" />
          <line x1="200" y1="10" x2="350" y2="120" stroke="#475569" strokeWidth="1.5" />
          {/* Bridge Pillar */}
          <polygon points="190,120 210,120 203,10 197,10" fill="url(#bridgeGrad)" />
          {/* Bridge Road */}
          <rect x="0" y="115" width="400" height="12" fill="#334155" />
          <rect x="0" y="127" width="400" height="4" fill="#64748B" />
          {/* Vehicles */}
          <rect x="70" y="108" width="16" height="7" rx="1" fill="#EF4444" />
          <circle cx="74" cy="115" r="2" fill="#000" />
          <circle cx="82" cy="115" r="2" fill="#000" />
          <rect x="280" y="106" width="22" height="9" rx="1" fill="#10B981" />
          <circle cx="285" cy="115" r="2.5" fill="#000" />
          <circle cx="296" cy="115" r="2.5" fill="#000" />
          {/* Water underneath */}
          <path d="M0,131 Q20,135 40,131 T80,131 T120,131 T160,131 T200,131 T240,131 T280,131 T320,131 T360,131 T400,131 L400,150 L0,150 Z" fill="#1D4ED8" opacity="0.4" />
        </svg>
      )
    },
    {
      title: "Outer Ring Road Elevated Corridor",
      cost: 4850,
      date: "Mar 2026",
      status: "COMPLETED & SANCTIONED",
      color: "from-[#B13230] to-orange-700",
      description: "High-speed modern arterial corridor with custom prefabricated girders and state-of-the-art asphalt resurfacing.",
      svg: (
        <svg viewBox="0 0 400 150" className="w-full h-full opacity-90">
          <defs>
            <linearGradient id="skyGrad2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e1b4b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>
          <rect width="400" height="150" fill="url(#skyGrad2)" />
          {/* Pillars */}
          <rect x="60" y="80" width="16" height="55" fill="#475569" />
          <rect x="52" y="75" width="32" height="6" fill="#64748B" />
          <rect x="200" y="80" width="16" height="55" fill="#475569" />
          <rect x="192" y="75" width="32" height="6" fill="#64748B" />
          <rect x="340" y="80" width="16" height="55" fill="#475569" />
          <rect x="332" y="75" width="32" height="6" fill="#64748B" />
          {/* Elevated Deck */}
          <rect x="0" y="65" width="400" height="10" fill="#334155" />
          <rect x="0" y="61" width="400" height="4" fill="#E2E8F0" opacity="0.3" />
          {/* Ground level road */}
          <rect x="0" y="130" width="400" height="10" fill="#1E293B" />
          {/* Trees */}
          <circle cx="120" cy="115" r="14" fill="#047857" opacity="0.8" />
          <rect x="117" y="115" width="6" height="20" fill="#78350F" />
          <circle cx="280" cy="115" r="16" fill="#047857" opacity="0.8" />
          <rect x="277" y="115" width="6" height="20" fill="#78350F" />
          {/* Car */}
          <rect x="160" y="56" width="18" height="9" rx="1.5" fill="#3B82F6" />
          <circle cx="164" cy="65" r="2.5" fill="#000" />
          <circle cx="174" cy="65" r="2.5" fill="#000" />
        </svg>
      )
    },
    {
      title: "Delhi Quality Resurfacing Drive",
      cost: 820,
      date: "May 2026",
      status: "COMPLETED & SANCTIONED",
      color: "from-emerald-700 to-teal-800",
      description: "ISO 9001 certified micro-surfacing on prestigious state-house VIP roads. Complete lateral curb protection.",
      svg: (
        <svg viewBox="0 0 400 150" className="w-full h-full opacity-90">
          <defs>
            <linearGradient id="skyGrad3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#064e3b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>
          <rect width="400" height="150" fill="url(#skyGrad3)" />
          {/* Road */}
          <polygon points="0,150 120,40 280,40 400,150" fill="#1E293B" />
          {/* Road markings */}
          <polygon points="195,150 198,40 202,40 205,150" fill="#F59E0B" />
          {/* Side barrier blocks */}
          <polygon points="0,150 15,150 125,40 120,40" fill="#CBD5E1" />
          <polygon points="400,150 385,150 275,40 280,40" fill="#CBD5E1" />
          {/* Street Lights */}
          <line x1="80" y1="120" x2="80" y2="60" stroke="#94A3B8" strokeWidth="2.5" />
          <circle cx="80" cy="58" r="4" fill="#FEF08A" className="animate-pulse" />
          <line x1="320" y1="120" x2="320" y2="60" stroke="#94A3B8" strokeWidth="2.5" />
          <circle cx="320" cy="58" r="4" fill="#FEF08A" className="animate-pulse" />
        </svg>
      )
    },
    {
      title: `${roadName} (Ward 28 - Ward Area)`,
      cost: milestoneAmount / 100000,
      date: "June 2026",
      status: "🚨 CRITICAL QUALITY HOLD RISK",
      color: "from-amber-600 to-red-800",
      description: "Milestone-03 final approval state. Major structural deficiencies in joint sand compaction and block thickness.",
      svg: (
        <svg viewBox="0 0 400 150" className="w-full h-full">
          <rect width="400" height="150" fill="#450a0a" />
          {/* Subgrade warning stripes */}
          <line x1="0" y1="0" x2="400" y2="150" stroke="#991b1b" strokeWidth="30" opacity="0.15" />
          <line x1="-100" y1="0" x2="300" y2="150" stroke="#991b1b" strokeWidth="30" opacity="0.15" />
          <line x1="100" y1="0" x2="500" y2="150" stroke="#991b1b" strokeWidth="30" opacity="0.15" />
          {/* Uncompacted Ground profile */}
          <path d="M0,110 Q50,90 100,110 T200,120 T300,95 T400,110 L400,150 L0,150 Z" fill="#78350F" opacity="0.8" />
          {/* Disorganized tilting blocks */}
          <g fill="#94A3B8" stroke="#000" strokeWidth="1">
            <rect x="30" y="88" width="16" height="8" transform="rotate(-15 30 88)" />
            <rect x="52" y="84" width="16" height="8" transform="rotate(-5 52 84)" />
            <rect x="74" y="87" width="16" height="8" transform="rotate(12 74 87)" />
            {/* Sinking region */}
            <rect x="180" y="112" width="16" height="8" transform="rotate(25 180 112)" fill="#475569" />
            <rect x="200" y="118" width="16" height="8" transform="rotate(-20 200 118)" fill="#475569" />
            <rect x="220" y="110" width="16" height="8" transform="rotate(5 220 110)" fill="#475569" />
            {/* Normal region */}
            <rect x="320" y="90" width="16" height="8" />
            <rect x="340" y="89" width="16" height="8" transform="rotate(-3 340 89)" />
            <rect x="360" y="91" width="16" height="8" transform="rotate(2 360 91)" />
          </g>
          {/* Warning sign */}
          <polygon points="200,25 225,65 175,65" fill="#EF4444" stroke="#fff" strokeWidth="1.5" />
          <text x="200" y="58" fill="#fff" fontSize="22" fontWeight="black" textAnchor="middle">!</text>
          <text x="200" y="142" fill="#FCA5A5" fontSize="10" fontFamily="monospace" textAnchor="middle" className="animate-pulse">⚠️ FAILURE PROFILE: ZERO SUB-BASE BEDDING SAND ACTIVE</text>
        </svg>
      )
    }
  ];

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % projects.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + projects.length) % projects.length);

  return (
    <section id="section7" className="py-md bg-[#F4F6F9] text-slate-800 scroll-mt-24 border-t-2 border-b-2 border-slate-300 font-sans select-none">
      
      {/* 1. PREMIUM METICULOUS BLUE TOP BAR (pwddelhi.gov.in style) */}
      <div className="bg-[#0D63AE] text-white text-xs py-2 px-sm border-b border-blue-800 shadow-sm relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          
          <div className="flex items-center gap-sm flex-wrap justify-center md:justify-start">
            <span className="bg-[#B13230] text-yellow-300 text-[9px] font-black px-2 py-0.5 rounded-sm animate-pulse uppercase tracking-wider border border-red-700 shadow-sm">
              OFFICIAL GOVERNMENT PORTAL
            </span>
            <span className="text-[10px] md:text-xs font-bold tracking-tight text-white/95">
              PUBLIC WORKS DEPARTMENT • GOVT. OF NCT OF DELHI • दिल्ली सरकार
            </span>
          </div>

          <div className="flex items-center gap-md text-[10px] font-semibold">
            {/* Pill-shaped Toll Free Phone */}
            <a 
              href="tel:1908" 
              className="flex items-center gap-1.5 bg-[#a0dde3]/15 hover:bg-[#a0dde3]/25 px-2.5 py-1 rounded-full text-white transition-all border border-white/10"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <Phone size={10} className="text-emerald-400" />
              <span>1908 (Toll Free)</span>
            </a>
            
            {/* Blink-soft active Monitoring */}
            <a 
              href="https://www.emonitoringdelhi.in" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-black/30 hover:bg-black/40 text-yellow-300 px-3 py-1 rounded-full text-[9px] font-mono border border-yellow-300/20 shadow-inner"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-yellow-400 mr-1.5 animate-pulse" />
              Delhi E-monitoring (Live)
            </a>

            <div className="h-4 border-l border-white/20" />
            <span className="text-yellow-300 uppercase tracking-widest font-black cursor-pointer hover:text-white transition-colors">
              ENG | हिंदी
            </span>

            {/* Login button with PWD Delhi red-to-orange gradient */}
            <div className="h-4 border-l border-white/20" />
            <a 
              href="#login" 
              style={{ background: 'linear-gradient(90deg, #B13230 0%, #DF8D31 100%)' }}
              className="px-3.5 py-1 rounded-sm text-[9px] font-black text-white uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all shadow-md"
            >
              Portal Login 🔑
            </a>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-sm md:px-md space-y-sm pt-sm relative z-10">
        
        {/* 2. PREMIUM HEADER BLOCK WITH DETAILED INLINE SVG LOGO */}
        <div className="bg-white border border-slate-300 p-sm rounded-none shadow-md flex flex-col lg:flex-row items-center justify-between gap-sm relative overflow-hidden">
          {/* Tricolor watermark flare */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-[0.03] pointer-events-none bg-gradient-to-r from-orange-500 via-white to-green-500" />
          
          {/* Left: Detailed PWD Emblem & Title */}
          <div className="flex items-center gap-sm flex-col sm:flex-row text-center sm:text-left">
            {/* Highly Meticulous SVG Emblem of Delhi PWD */}
            <div className="w-16 h-16 rounded-full border-2 border-blue-900 flex flex-col items-center justify-center bg-amber-50 shrink-0 shadow-sm relative select-none">
              <svg viewBox="0 0 100 100" className="w-full h-full p-1.5">
                <circle cx="50" cy="50" r="47" fill="none" stroke="#1E3A8A" strokeWidth="2" />
                <circle cx="50" cy="50" r="43" fill="none" stroke="#1E3A8A" strokeWidth="1" strokeDasharray="3,1" />
                {/* Ashoka Pillar Lion Capital stylized silhouette */}
                <path d="M46,30 L54,30 L52,48 L48,48 Z" fill="#991B1B" />
                <path d="M42,48 L58,48 L56,53 L44,53 Z" fill="#1E3A8A" />
                {/* Ashoka Chakra Wheel */}
                <circle cx="50" cy="59" r="6" fill="none" stroke="#1E3A8A" strokeWidth="1.5" />
                <line x1="50" y1="53" x2="50" y2="65" stroke="#1E3A8A" strokeWidth="0.5" />
                <line x1="44" y1="59" x2="56" y2="59" stroke="#1E3A8A" strokeWidth="0.5" />
                {/* National Tricolor bands at base */}
                <rect x="40" y="68" width="20" height="2" fill="#FF9933" />
                <rect x="40" y="70" width="20" height="2" fill="#FFFFFF" />
                <rect x="40" y="72" width="20" height="2" fill="#138808" />
                {/* Text curves path representation (parody labels) */}
                <text x="50" y="18" fontSize="8" fontWeight="bold" fill="#1E3A8A" textAnchor="middle">P.W.D.</text>
                <text x="50" y="86" fontSize="7" fontWeight="bold" fill="#1E3A8A" textAnchor="middle">DELHI GOVT</text>
              </svg>
            </div>
            
            <div className="space-y-0.5">
              <div className="text-red-700 text-[10px] font-black tracking-widest uppercase flex items-center justify-center sm:justify-start gap-1">
                <span>लोक निर्माण विभाग</span>
                <span className="text-slate-400">•</span>
                <span>दिल्ली सरकार</span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-blue-900 font-serif uppercase tracking-tight leading-none">
                PUBLIC WORKS DEPARTMENT, DELHI
              </h2>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                An ISO 9001:2015 Certified Infrastructure Wing • National Capital Territory
              </p>
            </div>
          </div>

          {/* Center-Right: Authentic Flag/G20 Animated Badges */}
          <div className="hidden xl:flex items-center gap-sm">
            {/* Azadi Ka Amrit Mahotsav style parody badge */}
            <div className="border border-amber-200 bg-amber-50/50 p-1.5 rounded-sm flex items-center gap-2 w-32 shrink-0">
              <span className="text-xl">🇮🇳</span>
              <div className="text-[8px] font-black uppercase text-amber-800 leading-tight">
                75th Azadi Year <br />
                <span className="text-red-600">Amrit Mahotsav</span>
              </div>
            </div>
            {/* Swachh Bharat parody badge */}
            <div className="border border-blue-200 bg-blue-50/50 p-1.5 rounded-sm flex items-center gap-2 w-32 shrink-0">
              <span className="text-xl">👓</span>
              <div className="text-[8px] font-black uppercase text-blue-800 leading-tight">
                SWACHH DELHI <br />
                <span className="text-green-700">Clean & Secure</span>
              </div>
            </div>
          </div>

          {/* Right: Premium Download & WhatsApp Blocks */}
          <div className="flex flex-wrap gap-sm justify-center text-[10px] font-sans">
            
            {/* App Store Download Block */}
            <div className="border border-slate-300 bg-slate-50 p-2 rounded-none flex flex-col gap-1 w-44 shadow-inner relative overflow-hidden">
              <p className="font-black text-slate-700 uppercase tracking-tighter text-[9px] flex items-center gap-1">
                <Sparkles size={10} className="text-yellow-500 animate-spin" />
                <span>DOWNLOAD PWD SEWA APP:</span>
              </p>
              <div className="space-y-1">
                {/* Sleek App badges */}
                <a href="#android" className="flex items-center justify-between bg-black text-white px-2 py-1 hover:bg-slate-900 transition-all rounded-sm font-bold text-[8px] border border-black hover:border-slate-700">
                  <span className="font-black">GOOGLE PLAY STORE</span>
                  <span className="text-[7px] font-mono text-emerald-400 bg-emerald-950 px-1 py-0.2 rounded-xs">SECURE</span>
                </a>
                <a href="#ios" className="flex items-center justify-between bg-[#141414] text-white px-2 py-1 hover:bg-black transition-all rounded-sm font-bold text-[8px] border border-black hover:border-slate-700">
                  <span className="font-black">APPLE APP STORE</span>
                  <span className="text-[7px] font-mono text-emerald-400 bg-emerald-950 px-1 py-0.2 rounded-xs">SECURE</span>
                </a>
              </div>
            </div>

            {/* Premium WhatsApp Sewa */}
            <div className="border border-emerald-300 bg-[#E9F8EC] p-2 rounded-none flex flex-col gap-1 w-44 text-left shadow-sm">
              <p className="font-black text-emerald-800 uppercase tracking-tighter text-[9px] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
                <span>PWD SEWA ON WHATSAPP:</span>
              </p>
              <div className="bg-emerald-700 text-white font-black px-2 py-0.5 text-center text-[8px] uppercase tracking-wider rounded-xs">
                आसान, तेज़ और ऑफिशियल
              </div>
              <a 
                href="https://api.whatsapp.com/send?phone=918130188222" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white hover:bg-emerald-50 border border-emerald-500 text-slate-800 py-1 font-black text-[9.5px] block transition-colors text-center shadow-xs"
              >
                💬 CHAT ON +91 81301 88222
              </a>
            </div>

          </div>
        </div>

        {/* 3. PREMIUM SOLID BLACK NAVIGATION BAR WITH DROP DOWNS */}
        <nav className="bg-[#141414] text-white text-[10px] sm:text-[11px] xl:text-xs font-bold uppercase select-none rounded-none shadow-md overflow-x-auto lg:overflow-visible scrollbar-none relative z-30 border-b-2 border-red-700">
          <ul className="flex items-center whitespace-nowrap min-w-max">
            <li className="bg-[#B13230] text-yellow-300 px-1.5 sm:px-2 md:px-3 lg:px-1.5 xl:px-4 2xl:px-5 py-3.5 border-r border-slate-800 cursor-pointer flex items-center gap-1">
              <span>🏠 HOME</span>
            </li>
            
            {/* Dropdown 1: ABOUT US */}
            <li className="relative group px-1.5 sm:px-2 md:px-3 lg:px-1.5 xl:px-4 2xl:px-5 py-3.5 hover:bg-slate-800 cursor-pointer border-r border-slate-800 transition-colors flex items-center gap-1">
              <span>ABOUT US ▼</span>
              <div className="absolute left-0 top-full hidden lg:group-hover:block bg-[#1c1c1c] text-slate-200 border-t-2 border-[#B13230] shadow-xl min-w-[220px] font-medium text-[11px] normal-case tracking-normal z-50">
                <a href="#vision" className="block px-4 py-2.5 hover:bg-[#B13230] hover:text-white transition-colors">Our Vision & Mission</a>
                <a href="#organisation" className="block px-4 py-2.5 hover:bg-[#B13230] hover:text-white transition-colors">Organizational Structure</a>
                <a href="#history" className="block px-4 py-2.5 border-t border-slate-800 hover:bg-[#B13230] hover:text-white transition-colors">History of NCT Roads</a>
                <a href="#history" className="block px-4 py-2.5 hover:bg-[#B13230] hover:text-white transition-colors">District Zone Map Directory</a>
              </div>
            </li>

            <li className="px-1.5 sm:px-2 md:px-3 lg:px-1.5 xl:px-4 2xl:px-5 py-3.5 hover:bg-slate-800 cursor-pointer border-r border-slate-800 transition-colors">
              ACTIVE TENDERS (42)
            </li>

            {/* Satirical Focus: MEASUREMENT BOOK REGISTRY */}
            <li className="px-1.5 sm:px-2 md:px-3 lg:px-1.5 xl:px-4 2xl:px-5 py-3.5 bg-[#0D63AE] hover:bg-blue-800 cursor-pointer border-r border-slate-800 text-white transition-colors flex items-center gap-2">
              <FileSpreadsheet size={14} className="animate-pulse" />
              <span>📂 MEASUREMENT BOOK (M-BOOK) REGISTRY</span>
            </li>

            {/* Dropdown 2: WORK REPORT */}
            <li className="relative group px-1.5 sm:px-2 md:px-3 lg:px-1.5 xl:px-4 2xl:px-5 py-3.5 hover:bg-slate-800 cursor-pointer border-r border-slate-800 transition-colors flex items-center gap-1">
              <span>WORK REPORTS ▼</span>
              <div className="absolute left-0 top-full hidden lg:group-hover:block bg-[#1c1c1c] text-slate-200 border-t-2 border-[#B13230] shadow-xl min-w-[240px] font-medium text-[11px] normal-case tracking-normal z-50">
                <a href="#reports" className="block px-4 py-2.5 hover:bg-[#B13230] hover:text-white transition-colors">Monthly Progress Reports (2026)</a>
                <a href="#performance" className="block px-4 py-2.5 hover:bg-[#B13230] hover:text-white transition-colors">Contractor Compliance Standings</a>
                <a href="#performance" className="block px-4 py-2.5 hover:bg-[#B13230] hover:text-white transition-colors">Third Party Quality Audit Logs</a>
              </div>
            </li>

            <li className="px-1.5 sm:px-2 md:px-3 lg:px-1.5 xl:px-4 2xl:px-5 py-3.5 hover:bg-slate-800 cursor-pointer border-r border-slate-800 transition-colors">
              OFFICIAL CIRCULARS (2026)
            </li>

            <li className="px-1.5 sm:px-2 md:px-3 lg:px-1.5 xl:px-4 2xl:px-5 py-3.5 hover:bg-red-950 hover:text-red-400 cursor-pointer text-red-400 font-extrabold transition-colors">
              🚨 SUSPENSION ORDERS
            </li>
          </ul>
        </nav>

        {/* 4. PREMIUM SEAMLESS HARDWARE-ACCELERATED MARQUEE NOTICE */}
        <div className="bg-yellow-300 text-red-900 border border-yellow-500 py-2 px-sm select-none font-mono font-black text-[11px] overflow-hidden flex items-center shadow-md relative z-10">
          <span className="bg-[#B13230] text-yellow-300 px-2.5 py-0.5 text-[9.5px] uppercase font-black mr-4 shrink-0 animate-bounce border border-red-800 shadow-sm relative z-20">
            PWD ALERTS:
          </span>
          <div className="relative w-full h-5 overflow-hidden">
            <div 
              className="absolute whitespace-nowrap flex gap-16"
              style={{ animation: 'marquee 35s linear infinite' }}
            >
              <span>🚨 NEW RULE: JUNIOR ENGINEERS MUST ATTACH SCAN OF PRINTED TEA-EXPENSE RECEIPTS FOR ASSESSMENT SIGN-OFFS EXCEEDING RS. 10 LAKHS (PWD MEMO 82/2026) //</span>
              <span>⚠️ ADMINISTRATIVE DIRECTIVE: ALL MONSOON CORROSIONS AND SINKHOLE COLLAPSES CONSTITUTE "ACTS OF GOD" EXEMPT FROM CONTRACTOR LIABILITY //</span>
              <span>🚨 ATTENTION JE STAFF: PHYSICAL M-BOOK SCAN ARCHIVES WILL NOT BE PROCESSED BEYOND 5:00 PM TO MAINTAIN COMPLIANCE HEURISTICS //</span>
            </div>
          </div>
        </div>

        {/* 5. INTERACTIVE PRESTIGE PROJECTS SLIDER CAROUSEL */}
        <div className="bg-white border border-slate-300 p-sm shadow-md rounded-none space-y-xs relative z-10 overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-[#0D63AE]" />
              <h3 className="text-xs md:text-sm font-black text-slate-900 font-serif uppercase tracking-tight">
                PWD prestige infrastructure projects (South Zone Directory)
              </h3>
            </div>
            
            {/* Carousel navigation controls */}
            <div className="flex items-center gap-1">
              <button 
                onClick={prevSlide}
                className="p-1 border border-slate-300 hover:bg-slate-100 transition-all rounded-xs bg-slate-50 text-slate-700 hover:text-black"
                title="Previous Project"
              >
                <ChevronLeft size={14} />
              </button>
              <span className="text-[10px] font-mono text-slate-500 px-1 font-bold">
                {activeSlide + 1} / {projects.length}
              </span>
              <button 
                onClick={nextSlide}
                className="p-1 border border-slate-300 hover:bg-slate-100 transition-all rounded-xs bg-slate-50 text-slate-700 hover:text-black"
                title="Next Project"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Carousel Slide container */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-sm items-stretch h-auto min-h-[170px] animate-fadeIn">
            {/* Visual Column */}
            <div className="md:col-span-4 bg-slate-900 border border-slate-300 flex items-center justify-center overflow-hidden min-h-[120px] relative group">
              {projects[activeSlide].svg}
              <div className={`absolute top-2 left-2 bg-gradient-to-r ${projects[activeSlide].color} text-white font-black text-[8px] font-mono px-2 py-0.5 uppercase tracking-wider rounded-xs shadow-md border border-white/10`}>
                {projects[activeSlide].status}
              </div>
            </div>

            {/* Details Column */}
            <div className="md:col-span-8 flex flex-col justify-between text-left space-y-2 p-1 font-sans">
              <div className="space-y-1">
                <h4 className="text-base font-extrabold text-blue-950 font-serif tracking-tight leading-tight">
                  {projects[activeSlide].title}
                </h4>
                <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                  {projects[activeSlide].description}
                </p>
              </div>

              {/* Stats and metadata cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-xs pt-1.5 border-t border-slate-100 font-mono text-[10px]">
                <div className="bg-slate-50 border border-slate-200 p-1.5">
                  <span className="text-slate-400 block text-[8px] font-sans font-bold uppercase tracking-wider">SANCTIONED COST</span>
                  <span className="text-red-700 font-black text-xs">{formatLakh(projects[activeSlide].cost * 100000)}</span>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-1.5">
                  <span className="text-slate-400 block text-[8px] font-sans font-bold uppercase tracking-wider">COMPLETION</span>
                  <span className="text-slate-900 font-bold">{projects[activeSlide].date}</span>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-1.5">
                  <span className="text-slate-400 block text-[8px] font-sans font-bold uppercase tracking-wider">TENDER REF</span>
                  <span className="text-slate-900 font-bold truncate block">PWD/SZ/2026/092</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 6. TWO COLUMNS WORKFLOW (PREMIUM SKEUOMORPHIC VS FORM) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-sm items-stretch relative z-10">
          
          {/* COLUMN 1: THE SKEUOMORPHIC HANDWRITTEN M-BOOK WITH HOVER ZOOM LENS */}
          <div className="lg:col-span-5 bg-white border border-slate-300 p-sm md:p-md flex flex-col justify-between gap-sm relative rounded-none shadow-md">
            
            {/* Elegant Floating Stamps */}
            <div className="absolute right-4 top-4 border-4 border-double border-purple-700 text-purple-700/60 rounded-full font-serif font-black uppercase text-[10px] w-24 h-24 flex flex-col items-center justify-center rotate-[-15deg] tracking-tight leading-none pointer-events-none select-none text-center bg-transparent opacity-60 z-20">
              <span>APPROVED</span>
              <span className="text-[7px] my-0.5">PWD SOUTH ZONE</span>
              <span className="text-[5.5px] font-mono">OK / CERTIFIED</span>
            </div>

            <div className="space-y-sm flex flex-col flex-grow justify-start">
              <div className="flex items-center gap-xs pb-xs border-b border-slate-300">
                <FileSpreadsheet size={18} className="text-emerald-700" />
                <div className="text-left">
                  <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest block">PWD DISTRICT ARCHIVE REGISTRY ID: SZ/412/26</span>
                  <h3 className="text-sm font-black text-slate-900 font-serif uppercase">Handwritten M-Book Page Register</h3>
                </div>
              </div>

              <p className="text-[11.5px] text-slate-600 leading-relaxed text-left font-sans font-medium">
                Under standard procedures, JE measurements of pavement depth, sand base parameters, and stone grades are penned by hand in ink inside a green register called the <strong>M-Book</strong>. Hover your cursor over the handwritten page below to reveal the actual audit reality through the <strong>Inspection Zoom Lens</strong>!
              </p>

              {/* SKEUOMORPHIC PAPER LEDGER (MAGNIFYING LENS AREA) */}
              <div 
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsLensActive(true)}
                onMouseLeave={() => setIsLensActive(false)}
                className="relative bg-[#EFF2E1] border-2 border-[#D1D9C3] rounded-none p-sm md:p-md font-mono text-left shadow-inner overflow-hidden select-none min-h-[300px] flex flex-col justify-between cursor-crosshair flex-grow"
              >
                {/* Notebook ruling lines */}
                <div className="absolute inset-0 opacity-20 pointer-events-none" 
                     style={{ 
                       backgroundImage: 'linear-gradient(#4a7c59 1px, transparent 1px)', 
                       backgroundSize: '100% 24px' 
                     }} />
                
                {/* Ledger margin line */}
                <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-red-600 opacity-25 pointer-events-none" />

                {/* Watermark tea stain */}
                <div className="absolute right-8 top-12 w-28 h-28 rounded-full border-4 border-amber-800/10 opacity-30 bg-transparent pointer-events-none select-none blur-[0.5px]" 
                     style={{ transform: 'rotate(15deg) scaleX(1.3)' }} />
                <div className="absolute right-12 top-20 text-[6.5px] text-amber-800/15 font-sans font-bold uppercase pointer-events-none select-none">
                  TEA STAIN (OFFICIAL)
                </div>

                {/* LAYER 1: THE "OFFICIAL COMPLIANT" LAYER */}
                <div className="relative z-10 space-y-3.5 text-[11px] text-[#203D28] pl-5 font-bold leading-normal transition-opacity duration-300">
                  <div className="border-b border-[#203D28]/30 pb-1 flex justify-between text-[8px] tracking-wider font-mono">
                    <span>M-BOOK REF NO: PWD-SZ-M18</span>
                    <span>WARD NO: 28 (SOUTH ZONE)</span>
                  </div>
                  
                  <div className="space-y-2 font-serif italic text-blue-900/90 tracking-wide text-xs">
                    <p className="pl-2 border-l-2 border-emerald-600">
                      - Item 4.2: Interlocking joint sand bedding layer... Laid uniform 25mm thickness River Bed Sand. Compliant.
                    </p>
                    <p className="pl-2 border-l-2 border-emerald-600">
                      - Item 5.1: 80mm Heavy-Duty Blocks (Grade M-30) placed flat over sand bedding layer. Passed.
                    </p>
                    <p className="pl-2 border-l-2 border-emerald-600">
                      - Item 6.3: Mechanical vibrating compact roller passed over complete paving span (2 times). Zero defects seen.
                    </p>
                  </div>
                  
                  <div className="pt-2 text-[10.5px] text-red-700/80 font-serif uppercase tracking-tight flex items-center gap-1 font-black">
                    ✍️ Signed: "S.K. Banerjee" (Junior Engineer, PWD SZ)
                  </div>
                </div>

                {/* LAYER 2: THE "REAL AUDIT CHEAT" REVEAL LAYER (Clipped by circle clipPath) */}
                <div 
                  className="absolute inset-0 bg-[#E3E8C4] border border-[#D1D9C3] p-sm md:p-md font-mono text-left select-none flex flex-col justify-between pointer-events-none z-10"
                  style={{ 
                    clipPath: isLensActive 
                      ? `circle(85px at ${hoverPos.x}px ${hoverPos.y}px)` 
                      : 'circle(0px at 0px 0px)',
                    transition: 'clip-path 0s linear'
                  }}
                >
                  {/* Rule lines duplicated */}
                  <div className="absolute inset-0 opacity-15" 
                       style={{ 
                         backgroundImage: 'linear-gradient(#a33 1px, transparent 1px)', 
                         backgroundSize: '100% 24px' 
                       }} />
                  
                  <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-red-600 opacity-20" />

                  <div className="relative z-10 space-y-3.5 text-[11px] text-red-950 font-bold leading-normal pl-5">
                    <div className="border-b border-red-900/30 pb-1 flex justify-between text-[8px] tracking-wider font-mono text-red-800">
                      <span>⚠️ REAL INSPECTION DECAY REPORT</span>
                      <span>SOCIALLY DISCONNECTED</span>
                    </div>

                    <div className="space-y-2 font-serif italic text-red-800 tracking-wide text-xs">
                      <p className="pl-2 border-l-2 border-red-600">
                        ❌ Item 4.2: Bedding layer completely skipped to save Rs. 3.2 Lakhs! Blocks laid directly on loose clay and sub-soil.
                      </p>
                      <p className="pl-2 border-l-2 border-red-600">
                        ❌ Item 5.1: Cheap, thin 60mm domestic blocks substituted instead of specified 80mm blocks to skim contract margins.
                      </p>
                      <p className="pl-2 border-l-2 border-red-600">
                        ❌ Item 6.3: Mechanical compact roller skipped to prevent fracturing the cheap 60mm stones. Bypassed under oversight.
                      </p>
                    </div>
                    
                    <div className="pt-2 text-[10.5px] text-red-900 font-serif uppercase tracking-tight flex items-center gap-1 font-black">
                      💀 Real Action: Samosa protocol cleared. Under-table transfer completed successfully.
                    </div>
                  </div>
                </div>

                {/* VISUAL MAGNIFYING LENS CIRCLE OVERLAY */}
                {isLensActive && (
                  <div 
                    className="absolute pointer-events-none border-2 border-red-700 rounded-full shadow-[0_0_20px_rgba(185,28,28,0.4)] bg-transparent z-20 flex items-center justify-center"
                    style={{
                      width: '170px',
                      height: '170px',
                      left: `${hoverPos.x - 85}px`,
                      top: `${hoverPos.y - 85}px`,
                    }}
                  >
                    {/* Outer lens rim reflection lines */}
                    <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none" />
                    <div className="absolute -top-1 -left-1 text-[8px] font-mono bg-red-700 text-white font-black px-1.5 py-0.5 rounded-xs shadow-sm uppercase tracking-wide scale-90">
                      AUDIT REALITY
                    </div>
                  </div>
                )}
              </div>

              {/* The Leak Callout bar (now moved outside the ledger area for safety and clarity) */}
              <div className="bg-white border border-amber-400 p-sm rounded-none flex items-start gap-xs shadow-sm z-20">
                <TrendingDown size={18} className="text-red-700 shrink-0 mt-0.5" />
                <div className="text-left space-y-1">
                  <h4 className="text-[10px] font-black uppercase text-red-700 tracking-wider">THE CORE SYSTEMIC BLIND SPOT:</h4>
                  <p className="text-[10.5px] font-sans text-slate-700 leading-normal font-medium">
                    Because this file is purely static paper, no GPS coordinates, live camera scans, or physical telemetry verification are linked. Once signed, the contractor gets paid directly, leaving the JE legally and physically liable for the pavement collapse.
                  </p>
                </div>
              </div>
            </div>

            {/* Scanned download box (pushed to the very bottom) */}
            <div className="mt-sm border border-slate-300 bg-slate-50 p-2.5 rounded-none flex items-center justify-between text-[10px] font-mono text-slate-700 shadow-xs z-10">
              <div className="flex items-center gap-1.5">
                <FileText size={14} className="text-red-700" />
                <span className="font-bold">mbook_scan_page_18_signed.pdf (14.2 MB)</span>
              </div>
              <a href="#download-pdf" className="text-[#0D63AE] font-black hover:underline flex items-center gap-0.5">
                <Download size={11} />
                <span>DOWNLOAD FILE</span>
              </a>
            </div>

          </div>

          {/* COLUMN 2: THE FORM AND MULTI-STAGE SIMULATION SCREEN */}
          <div className="lg:col-span-7 bg-white border border-slate-300 p-sm md:p-md flex flex-col justify-between min-h-[500px] text-left rounded-none shadow-md relative">
            
            <div className="space-y-sm">
              
              {/* Form header */}
              <div className="pb-xs border-b border-slate-300 flex items-center justify-between gap-xs">
                <div className="flex items-center gap-xs">
                  <PenTool size={18} className="text-blue-900" />
                  <div>
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">PWD NCT REVENUE FORM No. 27-A</span>
                    <h3 className="text-sm font-black text-slate-900 font-serif uppercase leading-none">Milestone Sign-off & Budget Clearance</h3>
                  </div>
                </div>
                {!isSigned ? (
                  <div className="bg-[#B13230] text-yellow-200 font-black text-[9px] px-2.5 py-0.5 rounded-none uppercase tracking-wider shrink-0 select-none animate-bounce border border-red-700 shadow-xs">
                    PENDING SIGN-OFF
                  </div>
                ) : (
                  <div className="bg-emerald-700 text-white font-black text-[9px] px-2.5 py-0.5 rounded-none uppercase tracking-wider shrink-0 select-none border border-emerald-800 shadow-xs flex items-center gap-1">
                    <Check size={10} strokeWidth={3} />
                    <span>APPROVED</span>
                  </div>
                )}
              </div>

              {/* Grid Metadata government table */}
              <div className="border border-slate-400 p-2.5 space-y-2 bg-slate-50 text-[11px] shadow-inner font-mono">
                <div className="text-[10px] font-black text-[#0D63AE] uppercase tracking-wider border-b border-slate-300 pb-1 flex items-center gap-1">
                  <span>OFFICIAL AUDIT & TENDER CLASSIFICATION:</span>
                </div>
                
                <table className="w-full border-collapse border border-slate-300 text-left">
                  <tbody>
                    <tr>
                      <td className="border border-slate-300 bg-slate-100 p-2 font-sans font-bold text-slate-600 uppercase text-[9px] w-1/3">
                        CONTRACTOR ID:
                      </td>
                      <td className="border border-slate-300 p-2 font-bold text-slate-900">
                        {contractorName}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 bg-slate-100 p-2 font-sans font-bold text-slate-600 uppercase text-[9px]">
                        SANCTION VALUE:
                      </td>
                      <td className="border border-slate-300 p-2 font-black text-[#B13230] text-sm tracking-tight">
                        {formatLakh(milestoneAmount)}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 bg-slate-100 p-2 font-sans font-bold text-slate-600 uppercase text-[9px]">
                        SITE TARGET REF:
                      </td>
                      <td className="border border-slate-300 p-2 text-slate-900 font-bold">
                        {roadName}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 bg-slate-100 p-2 font-sans font-bold text-slate-600 uppercase text-[9px]">
                        ESCROW CONTRACT:
                      </td>
                      <td className="border border-slate-300 p-2 font-bold text-[#B13230] text-[9.5px]">
                        ⚠️ NIL (DIRECT BANK DEPOSIT CLEARANCE WITHOUT AUDIT HOLDS)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* COERCION CHECKS PANEL */}
              {!isSigned ? (
                <div className="space-y-sm bg-yellow-50 border border-yellow-300 p-sm rounded-none text-slate-700 text-xs shadow-xs">
                  <div className="flex gap-2">
                    <HelpCircle size={28} className="text-blue-900 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-black text-blue-950 uppercase tracking-tight">IMPORTANT INSTRUCTIONS FOR ASSESSMENT JE:</h4>
                      <p className="text-[11px] leading-relaxed font-sans mt-0.5 text-slate-800 font-medium">
                        You have received immense executive pressure to certify Milestone-03. Refusing to sign the handwritten register will result in immediate suspension, administrative salary blocks, and transfer to a remote regional storage yard.
                      </p>
                    </div>
                  </div>

                  {/* Checkboxes */}
                  <div className="border-t border-yellow-200 pt-sm space-y-xs text-[10px] font-mono text-slate-600">
                    <div className="flex items-start gap-xs">
                      <input type="checkbox" defaultChecked disabled className="mt-0.5 accent-blue-900" id="retro_cb1" />
                      <label htmlFor="retro_cb1" className="cursor-not-allowed leading-tight">
                        I declare that I visually evaluated the pavement site from the window of my department vehicle and observed no obvious caving-ins today.
                      </label>
                    </div>
                    <div className="flex items-start gap-xs">
                      <input type="checkbox" defaultChecked disabled className="mt-0.5 accent-blue-900" id="retro_cb2" />
                      <label htmlFor="retro_cb2" className="cursor-not-allowed leading-tight">
                        I agree that subsequent base collapses, water pool sinkholes, or subgrade washaways are purely "acts of weather God" and I accept 100% technical liability.
                      </label>
                    </div>
                    <div className="flex items-start gap-xs">
                      <input type="checkbox" defaultChecked disabled className="mt-0.5 accent-blue-900" id="retro_cb3" />
                      <label htmlFor="retro_cb3" className="cursor-not-allowed leading-tight">
                        I certify the contractor provided tea, biscuits and standard hospitality during site assessment conforming to traditional regulatory procedures.
                      </label>
                    </div>
                  </div>
                </div>
              ) : (
                /* LIVE CHRONOLOGY & DECAY VISUAL SIMULATOR (SVG) */
                <div className="space-y-sm animate-fadeIn">
                  <div className="text-[10px] font-mono font-black uppercase tracking-wider text-red-700 border-b border-slate-300 pb-1 flex items-center gap-1.5">
                    <Clock size={12} className="animate-spin text-red-700" />
                    <span>CHRONOLOGY OF PWD ROAD FAILURE EVENTS & MONSOON DECAY:</span>
                  </div>
                  
                  {/* Monospaced terminal telemetry logs */}
                  <div className="space-y-xs text-[11px] font-mono bg-slate-900 text-slate-300 p-sm border border-slate-400 shadow-inner">
                    <div className={`flex items-start gap-sm p-1 transition-colors duration-200 ${currentStep >= 1 ? 'bg-blue-950 text-white border-l-2 border-blue-500' : 'opacity-20'}`}>
                      <span className="font-black shrink-0 text-yellow-400">DAY 01:</span>
                      <span>💰 Clearance approved! {formatLakh(milestoneAmount)} released directly to Contractor's bank. No quality audit hold is active on paper register.</span>
                    </div>
                    
                    <div className={`flex items-start gap-sm p-1 transition-colors duration-200 ${currentStep >= 2 ? 'bg-yellow-950 text-white border-l-2 border-yellow-500' : 'opacity-20'}`}>
                      <span className="font-black shrink-0 text-yellow-400">DAY 30:</span>
                      <span>🌧️ Heavy Monsoon precipitation hits. Rain water leaks easily through gaps because the specified joint sand was never compacted.</span>
                    </div>

                    <div className={`flex items-start gap-sm p-1 transition-colors duration-200 ${currentStep >= 3 ? 'bg-red-950 text-white border-l-2 border-red-500' : 'opacity-20'}`}>
                      <span className="font-black shrink-0 text-red-400">DAY 45:</span>
                      <span>🌊 Soil bedding washes away completely, forming large empty sub-surface hollow caverns directly beneath the heavy block layer.</span>
                    </div>

                    <div className={`flex items-start gap-sm p-1 transition-colors duration-200 ${currentStep >= 4 ? 'bg-[#4c0519] text-white border-l-2 border-rose-500' : 'opacity-20'}`}>
                      <span className="font-black shrink-0 text-rose-400">DAY 60:</span>
                      <span>🚚 Heavily loaded cargo vehicle crosses. Block settles, tilts, and collapses, creating a massive, deep public road sinkhole.</span>
                    </div>
                  </div>

                  {/* LIVE ROAD DECAY CROSS-SECTION ANIMATION (SVG) */}
                  <div className="border border-slate-300 p-2 bg-slate-950 rounded-none relative overflow-hidden aspect-[500/180] shadow-md">
                    <div className="absolute top-2 left-2 bg-black/60 border border-slate-700 text-slate-400 font-mono text-[8px] px-1.5 py-0.5 rounded-sm uppercase tracking-wider z-10 flex items-center gap-1">
                      <span className={`w-1.5 h-1.5 rounded-full ${isSimulating ? 'bg-red-500 animate-ping' : 'bg-slate-500'} shrink-0`} />
                      <span>LIVE TELEMETRY VIEW • STEP {currentStep}/4</span>
                    </div>

                    {/* SVG ANIMATED CANVAS */}
                    <svg viewBox="0 0 500 180" className="w-full h-full">
                      <defs>
                        <linearGradient id="cloudGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#4b5563" />
                          <stop offset="100%" stopColor="#1f2937" />
                        </linearGradient>
                        <pattern id="soilPat" width="20" height="20" patternUnits="userSpaceOnUse">
                          <rect width="20" height="20" fill="#451a03" />
                          <circle cx="5" cy="5" r="1.5" fill="#2d0f02" />
                          <circle cx="15" cy="15" r="1.2" fill="#1e0b01" />
                        </pattern>
                      </defs>

                      {/* Deep Background */}
                      <rect width="500" height="180" fill="#0f172a" />

                      {/* Subgrade Soil Base */}
                      <rect x="0" y="110" width="500" height="70" fill="url(#soilPat)" />

                      {/* Bedding Sand Layer (Animates out based on currentStep) */}
                      {currentStep < 3 ? (
                        <rect x="0" y="85" width="500" height="25" fill="#d97706" opacity="0.85" />
                      ) : currentStep === 3 ? (
                        <g>
                          {/* Sand washing away, hollow caverns forming */}
                          <rect x="0" y="85" width="120" height="25" fill="#d97706" opacity="0.85" />
                          <rect x="380" y="85" width="120" height="25" fill="#d97706" opacity="0.85" />
                          {/* Cavity / Void */}
                          <path d="M120,85 Q250,115 380,85 L380,110 L120,110 Z" fill="#1e1b4b" opacity="0.9" />
                          <text x="250" y="102" fill="#fca5a5" fontSize="8" fontFamily="monospace" textAnchor="middle" className="animate-pulse">🌊 WASHING AWAY / VOIDS FORMING</text>
                        </g>
                      ) : (
                        <g>
                          {/* Step 4: Full Collapse state */}
                          <rect x="0" y="85" width="100" height="25" fill="#d97706" opacity="0.85" />
                          <rect x="400" y="85" width="100" height="25" fill="#d97706" opacity="0.85" />
                          {/* Sunk Void */}
                          <path d="M100,85 Q250,150 400,85 L400,125 L100,125 Z" fill="#020617" />
                          <text x="250" y="115" fill="#f87171" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="black" className="animate-pulse">💀 SINKHOLE COLLAPSE ACTIVE</text>
                        </g>
                      )}

                      {/* Pavers (Blocks) Profile */}
                      <g stroke="#020617" strokeWidth="1.5">
                        {/* Normal Paver block line */}
                        <rect x="10" y="65" width="40" height="20" fill="#64748B" />
                        <rect x="52" y="65" width="40" height="20" fill="#64748B" />
                        
                        {/* Interactive Sinking Pavers based on Step */}
                        {currentStep < 4 ? (
                          <g>
                            <rect x="94" y="65" width="40" height="20" fill="#64748B" />
                            <rect x="136" y="65" width="40" height="20" fill="#64748B" />
                            <rect x="178" y="65" width="40" height="20" fill="#64748B" />
                            <rect x="220" y="65" width="40" height="20" fill="#64748B" />
                            <rect x="262" y="65" width="40" height="20" fill="#64748B" />
                            <rect x="304" y="65" width="40" height="20" fill="#64748B" />
                            <rect x="346" y="65" width="40" height="20" fill="#64748B" />
                          </g>
                        ) : (
                          /* Step 4 collapsed blocks */
                          <g>
                            <rect x="94" y="70" width="40" height="20" fill="#475569" transform="rotate(8 94 70)" />
                            <rect x="136" y="85" width="40" height="20" fill="#334155" transform="rotate(25 136 85)" />
                            {/* Deepest collapse center */}
                            <rect x="178" y="115" width="40" height="20" fill="#1e293b" transform="rotate(45 178 115)" />
                            <rect x="220" y="120" width="40" height="20" fill="#1e293b" transform="rotate(-15 220 120)" />
                            <rect x="262" y="95" width="40" height="20" fill="#334155" transform="rotate(-30 262 95)" />
                            <rect x="304" y="75" width="40" height="20" fill="#475569" transform="rotate(-10 304 75)" />
                            <rect x="346" y="68" width="40" height="20" fill="#64748B" />
                          </g>
                        )}

                        <rect x="388" y="65" width="40" height="20" fill="#64748B" />
                        <rect x="430" y="65" width="40" height="20" fill="#64748B" />
                      </g>

                      {/* Dynamic Rain Clouds and Droplets (Step 2+) */}
                      {currentStep >= 2 && (
                        <g>
                          <path d="M40,15 Q50,5 70,8 Q85,0 100,10 Q115,5 125,20 Q130,10 145,15 Q155,25 140,35 Q30,35 40,15 Z" fill="url(#cloudGrad)" opacity="0.9" />
                          <path d="M340,15 Q350,5 370,8 Q385,0 400,10 Q415,5 425,20 Q430,10 445,15 Q455,25 440,35 Q330,35 340,15 Z" fill="url(#cloudGrad)" opacity="0.9" />
                          
                          {/* Raindrop lines */}
                          <line x1="60" y1="40" x2="57" y2="55" stroke="#60a5fa" strokeWidth="1.5" className="animate-pulse" />
                          <line x1="90" y1="45" x2="87" y2="60" stroke="#60a5fa" strokeWidth="1.5" />
                          <line x1="120" y1="40" x2="117" y2="55" stroke="#60a5fa" strokeWidth="1.5" className="animate-pulse" />
                          
                          <line x1="360" y1="40" x2="357" y2="55" stroke="#60a5fa" strokeWidth="1.5" />
                          <line x1="390" y1="45" x2="387" y2="60" stroke="#60a5fa" strokeWidth="1.5" className="animate-pulse" />
                          <line x1="420" y1="40" x2="417" y2="55" stroke="#60a5fa" strokeWidth="1.5" />

                          {/* Water droplets leaking through joints */}
                          <circle cx="135" cy="55" r="2" fill="#3b82f6" className="animate-bounce" />
                          <circle cx="260" cy="55" r="2.5" fill="#3b82f6" />
                          <circle cx="302" cy="55" r="2" fill="#3b82f6" className="animate-bounce" />
                          {currentStep >= 3 && (
                            <g>
                              <path d="M135,65 L135,85" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="3,3" />
                              <path d="M260,65 L260,95" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="3,3" />
                              <path d="M302,65 L302,85" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="3,3" />
                            </g>
                          )}
                        </g>
                      )}

                      {/* Moving Vehicle (Step 1-4) */}
                      <g>
                        {currentStep < 4 ? (
                          <g transform="translate(180, 25)">
                            {/* Normal running car */}
                            <rect x="0" y="15" width="60" height="18" rx="4" fill="#ef4444" />
                            <rect x="15" y="5" width="30" height="12" rx="3" fill="#93c5fd" />
                            <circle cx="15" cy="33" r="7" fill="#1e293b" />
                            <circle cx="15" cy="33" r="3" fill="#cbd5e1" />
                            <circle cx="45" cy="33" r="7" fill="#1e293b" />
                            <circle cx="45" cy="33" r="3" fill="#cbd5e1" />
                          </g>
                        ) : (
                          /* Day 60 collapse - Trapped vehicle caving-in */
                          <g transform="translate(160, 52) rotate(22 30 25)">
                            {/* Tilted, falling car */}
                            <rect x="0" y="15" width="60" height="18" rx="4" fill="#b91c1c" />
                            <rect x="15" y="5" width="30" height="12" rx="3" fill="#1e3a8a" opacity="0.8" />
                            <circle cx="15" cy="33" r="7" fill="#0f172a" />
                            <circle cx="45" cy="33" r="7" fill="#0f172a" />
                            {/* Exclamation warning */}
                            <g transform="translate(62, -15)">
                              <circle cx="0" cy="0" r="10" fill="#ef4444" stroke="#fff" strokeWidth="1.5" />
                              <text x="0" y="4" fill="#fff" fontSize="13" fontWeight="black" textAnchor="middle">!</text>
                            </g>
                          </g>
                        )}
                      </g>
                    </svg>
                  </div>

                  {/* 7. OFFICIAL EXTREMELY AUTHENTIC SUSPENSION OFFICE ORDER */}
                  {currentStep >= 5 && (
                    <div className="bg-red-50 border-2 border-red-700 p-sm text-left shadow-md animate-fadeIn relative overflow-hidden font-serif border-l-4">
                      {/* Tilted authentic order receipt seal */}
                      <div className="absolute right-4 top-2 border-2 border-red-700 text-red-700 uppercase font-mono text-[9px] font-black px-1.5 py-0.5 rounded rotate-[10deg] tracking-tight bg-white shadow-xs">
                        COPY RECEIVED
                      </div>

                      <div className="font-black text-xs text-red-900 uppercase tracking-widest flex items-center gap-xs border-b border-red-300 pb-1 font-serif">
                        <UserX size={15} className="stroke-[3] text-red-700 shrink-0" />
                        MEMORANDUM OF SUSPENSION (OFFICE ORDER SZ/412-2026)
                      </div>
                      
                      <div className="text-[11px] text-slate-800 leading-relaxed font-sans font-medium mt-2 space-y-2">
                        <p>
                          "The Commissioner of NCT Roads, Delhi, hereby orders the **immediate suspension of the Junior Engineer** under Sub-section (3) of Rule 10 of PWD Discipline Conduct Regulations. This disciplinary action follows severe public outrage, local media coverage, and citizen protests regarding the rapid pavement collapse on <strong className="text-red-950 font-bold">{roadName}</strong>."
                        </p>
                        <p className="italic text-slate-600 bg-white/60 p-1.5 border border-slate-200">
                          "The Contractor, having fully completed and certified the green physical M-Book register entries, has been legally paid 100% of sanctioned Milestone-03 budgets. Contract terms insulate contractor from structural warranty because measurements were certified in ink. JE remains solely accountable."
                        </p>
                      </div>
                      
                      {/* Bureaucratic copying list (Cc) */}
                      <div className="pt-2 mt-2 border-t border-slate-300 text-[8.5px] font-mono text-slate-500">
                        <p className="font-black text-[9px] text-slate-700">Copy forwarded for information and urgent administrative action to:</p>
                        <p>1. PS to Secretary (Public Works), Govt. of NCT of Delhi.</p>
                        <p>2. Chief Vigilance Officer, PWD South District, Delhi.</p>
                        <p>3. Service Registry Record Room 412 (S.K. Banerjee service book).</p>
                        <p>4. Executive Engineer / Guard File Room.</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ACTION BUTTON BLOCK */}
            <div className="pt-sm border-t border-slate-300 mt-sm space-y-sm relative z-10">
              {!isSigned ? (
                <button
                  onClick={handleSignLedger}
                  style={{ background: 'linear-gradient(90deg, #B13230 0%, #DF8D31 100%)' }}
                  className="w-full text-xs uppercase tracking-wider font-black py-4 text-white border-2 border-yellow-300 rounded-none transition-all hover:opacity-95 shadow-md active:scale-[0.99] flex flex-col items-center justify-center gap-0.5"
                >
                  <div className="flex items-center gap-xs font-serif text-yellow-200 text-xs md:text-sm">
                    <PenTool size={16} />
                    <span>CERTIFY M-BOOK REGISTER & RELEASE PAYMENT</span>
                  </div>
                  <span className="text-[9px] font-mono text-white/80 font-medium tracking-tight normal-case">
                    (Authorize direct release of {formatLakh(milestoneAmount)} to Contractor Account)
                  </span>
                </button>
              ) : (
                <div className="bg-red-800 border border-red-900 text-yellow-300 p-sm text-center font-black text-xs uppercase font-mono animate-pulse rounded-none shadow-sm flex items-center justify-center gap-2">
                  <AlertOctagon size={15} className="shrink-0" />
                  <span>⚠️ CERTIFICATION COMPLETE // PAYMENT RELEASED // LIABILITY SEEDED</span>
                </div>
              )}

              <div className="bg-slate-100 border border-slate-300 p-2.5 rounded-none flex items-center justify-between gap-2 text-slate-700">
                <p className="text-[9.5px] font-mono leading-relaxed font-semibold">
                  {!isSigned 
                    ? "⚠️ SYSTEM WARNING: Approving clearance bypasses active secure escrow compliance verification, placing absolute personal liability on the certifying officer."
                    : isSimulating 
                      ? "⏳ SIMULATOR STATUS: ACTIVE... PROCESSING MONSOON TIMELINE & BASE DISINTEGRATION..." 
                      : "❌ PORTAL TRANSACTION LOG: PROCESS TERMINATED. Road has collapsed. Physical audit folder locked in archive room."
                  }
                </p>
                {isSimulating && <RefreshCw size={14} className="text-red-700 animate-spin shrink-0" />}
              </div>
            </div>
          </div>

        </div>

        {/* HIGH-IMPACT EMERALD COMPLIANCE CTA */}
        <div className="pt-md flex flex-col items-center space-y-1 select-none relative z-10">
          <p className="text-xs font-black text-[#0D63AE] uppercase tracking-widest font-mono flex items-center gap-1">
            <span>👇 ESCAPE THE PAPER TRAP INSTANTLY 👇</span>
          </p>
          
          <Link
            href={`/road/${roadSystemId}/shield/workspace`}
            className="group inline-flex items-center justify-center gap-sm bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-black text-sm md:text-base px-xl py-4 rounded-md transition-all shadow-[0_10px_35px_rgba(16,185,129,0.35)] hover:shadow-[0_15px_45px_rgba(16,185,129,0.6)] hover:-translate-y-0.5 active:scale-98 uppercase tracking-wider w-full sm:w-auto text-center border border-emerald-400/35"
          >
            <Shield size={20} className="group-hover:rotate-12 transition-transform duration-300" />
            <span>PROTECT YOUR CAREER WITH SECURE ROADSHIELD AI ESCROW GATEWAY ↗</span>
          </Link>
          
          <p className="text-[9.5px] font-mono text-slate-500 text-center uppercase tracking-wider">
            Locks budget funds in an automated quality compliance ledger, releasing money only on validated telemetry.
          </p>
        </div>

      </div>
    </section>
  );
}
