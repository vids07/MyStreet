'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FileText, DollarSign, Users, ShieldAlert } from 'lucide-react';

type TabId = 'condition' | 'betrayal' | 'sign-off' | 'action';

type AuditFolderTabsProps = {
  roadId: string;
  activeTab: TabId;
};

export default function AuditFolderTabs({ roadId, activeTab }: AuditFolderTabsProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scroll height to transition navigation styles
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    // Check scroll position immediately on mount
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tabs = [
    {
      id: 'condition' as TabId,
      label: '01 // Current Condition',
      shortLabel: 'Condition',
      href: `/road/${roadId}#audit-content`,
      icon: FileText,
    },
    {
      id: 'betrayal' as TabId,
      label: '02 // Financial Betrayal',
      shortLabel: 'Betrayal',
      href: `/road/${roadId}/betrayal#audit-content`,
      icon: DollarSign,
    },
    {
      id: 'sign-off' as TabId,
      label: '03 // Sign-off Chain',
      shortLabel: 'Sign-offs',
      href: `/road/${roadId}/sign-off#audit-content`,
      icon: Users,
    },
    {
      id: 'action' as TabId,
      label: '04 // Action Toolkit',
      shortLabel: 'Action',
      href: `/road/${roadId}/action#audit-content`,
      icon: ShieldAlert,
    },
  ];

  const tabSectionIds = {
    'condition': 'section3',
    'betrayal': 'section4',
    'sign-off': 'section5',
    'action': 'section6',
  };

  // Robust client-side scroll effect on mount and route changes
  useEffect(() => {
    const isSubRoute = pathname !== `/road/${roadId}`;
    const hasHash = typeof window !== 'undefined' && window.location.hash.includes('audit-content');

    if (isSubRoute || hasHash) {
      const timer = setTimeout(() => {
        const targetId = tabSectionIds[activeTab];
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [pathname, roadId, activeTab]);

  const handleTabClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isActive: boolean) => {
    if (isActive) {
      e.preventDefault();
      const targetId = tabSectionIds[activeTab];
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <header
      id="audit-content"
      style={{ marginBottom: '-72px' }}
      className={`sticky top-0 z-50 w-full h-[72px] flex items-center transition-all duration-300 ${
        isScrolled
          ? 'bg-surface/90 backdrop-blur-md border-b border-slate-300/60 shadow-[0_2px_15px_rgba(0,0,0,0.02)]'
          : 'bg-gradient-to-b from-black/85 via-black/35 to-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-sm md:px-md w-full flex items-center justify-between">
        
        {/* Left Side: Consistent Branding */}
        <div className="hidden sm:flex items-center gap-xs">
          <Link 
            href={`/road/${roadId}`} 
            className="font-extrabold tracking-tighter text-sm md:text-base mona flex items-center gap-2"
          >
            <span className="bg-failure text-white font-black px-1.5 py-0.5 rounded-xs text-[11px] tracking-normal leading-none">
              MS
            </span>
            <span className={`transition-colors duration-300 ${isScrolled ? 'text-text-primary' : 'text-white'}`}>
              MYSTREET
            </span>
          </Link>
          <div className={`h-4 w-px transition-colors duration-300 ${isScrolled ? 'bg-slate-300' : 'bg-white/20'} hidden sm:block`} />
          <span className={`text-[10px] md:text-[11px] roboto font-black tracking-[0.2em] uppercase transition-colors duration-300 ${
            isScrolled ? 'text-text-primary/70' : 'text-white/95'
          } hidden sm:block`}>
            PUBLIC RECORD
          </span>
        </div>

        {/* Right Side: Clean Netflix-Style Text Navigation */}
        <nav className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-xs md:gap-md">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <Link
                key={tab.id}
                href={tab.href}
                onClick={(e) => handleTabClick(e, tab.href, isActive)}
                className={`
                  group relative flex items-center gap-1.5 py-1 select-none transition-all duration-300 border-b-2
                  ${isActive 
                    ? isScrolled
                      ? 'text-failure border-failure font-black'
                      : 'text-white border-white font-black'
                    : 'border-transparent font-black'
                  }
                  ${!isActive
                    ? isScrolled
                      ? 'text-text-primary/75 hover:text-text-primary'
                      : 'text-white/80 hover:text-white'
                    : ''
                  }
                `}
              >
                <Icon 
                  size={14} 
                  className={`shrink-0 transition-colors duration-300 ${
                    isActive 
                      ? isScrolled ? 'text-failure' : 'text-white'
                      : isScrolled ? 'text-text-primary/75 group-hover:text-text-primary' : 'text-white/80 group-hover:text-white'
                  }`} 
                />
                
                {/* Text: short on mobile, full on desktop */}
                <span className="hidden md:inline roboto font-black tracking-wider uppercase text-[11px] md:text-xs lg:text-[13px]">
                  {tab.label}
                </span>
                <span className="inline md:hidden roboto font-black tracking-wider uppercase text-[11px]">
                  {tab.shortLabel}
                </span>
              </Link>
            );
          })}
        </nav>

      </div>
    </header>
  );
}
