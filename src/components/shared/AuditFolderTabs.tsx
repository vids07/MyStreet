import Link from 'next/link';
import { FileText, DollarSign, Users, ShieldAlert } from 'lucide-react';

type TabId = 'condition' | 'betrayal' | 'sign-off' | 'action';

type AuditFolderTabsProps = {
  roadId: string;
  activeTab: TabId;
};

export default function AuditFolderTabs({ roadId, activeTab }: AuditFolderTabsProps) {
  const tabs = [
    {
      id: 'condition' as TabId,
      label: '01 // Current Condition',
      shortLabel: 'Condition',
      href: `/road/${roadId}`,
      icon: FileText,
    },
    {
      id: 'betrayal' as TabId,
      label: '02 // Financial Betrayal',
      shortLabel: 'Betrayal',
      href: `/road/${roadId}/betrayal`,
      icon: DollarSign,
    },
    {
      id: 'sign-off' as TabId,
      label: '03 // Sign-off Chain',
      shortLabel: 'Sign-off',
      href: `/road/${roadId}/sign-off`,
      icon: Users,
    },
    {
      id: 'action' as TabId,
      label: '04 // Action Toolkit',
      shortLabel: 'Take Action',
      href: `/road/${roadId}/action`,
      icon: ShieldAlert,
    },
  ];

  return (
    <div className="w-full bg-surface pt-md">
      <div className="max-w-7xl mx-auto px-sm md:px-md">
        
        {/* Physical Docket Tabs row */}
        <div className="flex flex-wrap md:flex-nowrap gap-[3px] items-end relative z-10 -mb-[1px]">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <Link
                key={tab.id}
                href={tab.href}
                className={`
                  relative flex items-center gap-xs px-sm md:px-md py-xs md:py-sm rounded-t-sm border border-border/80 text-meta font-mono font-black uppercase tracking-wider transition-all duration-300
                  ${isActive 
                    ? 'bg-card text-text-primary border-b-transparent border-t-4 border-t-text-primary z-20 shadow-[0_-4px_12px_rgba(0,0,0,0.04)] font-black' 
                    : 'bg-slate-100/80 text-text-muted hover:bg-slate-100 border-b-border/80 hover:text-text-primary hover:-translate-y-[2px] z-10 cursor-pointer'
                  }
                  w-[48%] md:w-auto flex-1 md:flex-none text-center justify-center
                `}
              >
                {/* Visual file folder indicator curve for active tab */}
                {isActive && (
                  <div className="absolute -left-[5px] bottom-0 w-[5px] h-[10px] bg-card border-l border-border/80 hidden md:block" />
                )}
                
                <Icon size={14} className={isActive ? 'text-text-primary' : 'text-text-muted/60 group-hover:text-text-primary'} />
                
                {/* Desktop and mobile responsive labels */}
                <span className="hidden md:inline text-[11px] lg:text-xs tracking-widest">{tab.label}</span>
                <span className="inline md:hidden text-[10px] tracking-widest">{tab.shortLabel}</span>

                {isActive && (
                  <div className="absolute -right-[5px] bottom-0 w-[5px] h-[10px] bg-card border-r border-border/80 hidden md:block" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Thick divider line connecting the tabs together, representing a filing divider card */}
        <div className="h-[1px] w-full bg-border/80 relative z-0" />
      </div>
    </div>
  );
}
