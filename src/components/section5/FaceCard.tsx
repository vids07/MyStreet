import { getInitials, getAccountabilityLabel, abbreviateDesignation } from '@/lib/utils/road-display';
import { Shield, AlertCircle, DollarSign } from 'lucide-react';

export type FaceCardProps = {
  fullName: string;
  designation: string | null;
  jobDescription: string | null;
  actionLabel: string;
  isFailureChain: boolean;
  payScale: string | null;
  salaryPerDay: string | null;
  salarySource: string | null;
  accountabilityStatus: string | null;
  photoUrl?: string | null;
};

const STATUS_CONFIG: Record<string, { bg: string; text: string; ring: string }> = {
  waiting_for_audit: { 
    bg: 'bg-slate-50', 
    text: 'text-slate-600 border-slate-200/80', 
    ring: 'ring-slate-100',
  },
  response_pending:  { 
    bg: 'bg-amber-50/50', 
    text: 'text-amber-700 border-amber-200/50', 
    ring: 'ring-amber-100/50',
  },
  responded:         { 
    bg: 'bg-emerald-50/50', 
    text: 'text-emerald-700 border-emerald-200/50', 
    ring: 'ring-emerald-100/50',
  },
  charged:           { 
    bg: 'bg-red-50/50', 
    text: 'text-red-700 border-red-200/50', 
    ring: 'ring-red-100/50',
  },
};

export default function FaceCard({
  fullName,
  designation,
  jobDescription,
  actionLabel,
  isFailureChain,
  payScale,
  accountabilityStatus,
  photoUrl,
}: FaceCardProps) {
  const status = accountabilityStatus ?? 'response_pending';
  const config = STATUS_CONFIG[status] ?? {
    bg: 'bg-slate-50',
    text: 'text-slate-600 border-slate-200/80',
    ring: 'ring-slate-100',
  };

  const abbrev = designation ? abbreviateDesignation(designation) : null;
  const avatarText = abbrev !== null && abbrev !== designation
    ? abbrev
    : getInitials(fullName);

  return (
    <div className="bg-card rounded-md p-sm flex flex-col gap-xs border border-border/40 hover:scale-[1.005] hover:shadow-sm transition-all duration-300 relative overflow-hidden group">
      
      {/* Symmetrical Header Row: Avatar, Identity & Badge */}
      <div className="flex items-center justify-between gap-sm">
        <div className="flex items-center gap-sm">
          {/* Avatar with status-specific colored ring */}
          <div className={`relative shrink-0 w-12 h-12 rounded-full bg-surface flex items-center justify-center p-[2px] ring-2 ${config.ring} shadow-inner`}>
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={fullName}
                className="w-full h-full rounded-full object-cover grayscale brightness-95 group-hover:grayscale-0 transition-all duration-300"
              />
            ) : (
              <span className="text-body-bold roboto font-black text-text-primary text-xs">
                {avatarText}
              </span>
            )}
          </div>

          {/* Identity Block */}
          <div>
            <h3 className="text-body-bold mona text-text-primary font-black uppercase tracking-tight leading-tight">
              {fullName}
            </h3>
            <p className="text-[11px] roboto text-text-muted mt-2xs flex items-center gap-xs">
              <Shield size={10} className="text-text-muted/50" strokeWidth={1.5} />
              <span className="font-bold tracking-wider uppercase">
                {designation ?? 'OFFICIAL'}
                {abbrev !== null && abbrev !== designation && ` (${abbrev})`}
              </span>
            </p>
          </div>
        </div>

        {/* Accountability Docket Badge */}
        {accountabilityStatus && (
          <span className={`px-xs py-0.5 border ${config.text} ${config.bg} text-[9px] font-mono font-black tracking-widest rounded-xs uppercase whitespace-nowrap`}>
            [{getAccountabilityLabel(accountabilityStatus)}]
          </span>
        )}
      </div>

      {/* Narrative Section: Job and Verdict in one horizontal/compact layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-xs pt-xs border-t border-border/30">
        <div className="flex flex-col gap-[2px]">
          <span className="text-[9px] font-black text-text-muted uppercase tracking-widest roboto">THEIR JOB</span>
          <p className="text-xs roboto text-text-primary leading-tight font-medium">
            {jobDescription ?? '—'}
          </p>
        </div>

        <div className="flex flex-col gap-[2px]">
          {isFailureChain ? (
            <div className="bg-failure-bg/30 text-failure border-l-2 border-failure px-2xs py-1 rounded-r-xs flex flex-col gap-0.5">
              <span className="text-[9px] font-black text-failure/70 uppercase tracking-widest block roboto">SIGN-OFF IMPACT</span>
              <p className="text-xs roboto font-bold leading-tight flex items-start gap-1">
                <AlertCircle size={11} className="shrink-0 mt-0.5 text-failure" strokeWidth={1.5} />
                <span>
                  {actionLabel}. This road disintegrated within months.
                </span>
              </p>
            </div>
          ) : (
            <div className="bg-slate-50 text-text-primary border-l-2 border-slate-300 px-2xs py-1 rounded-r-xs flex flex-col gap-0.5">
              <span className="text-[9px] font-black text-text-muted uppercase tracking-widest block roboto">SIGN-OFF ACTION</span>
              <p className="text-xs roboto leading-tight font-medium">
                {actionLabel}.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Premium Minimalist Inline Public Salary Badge */}
      {payScale ? (
        <div className="bg-slate-50 border border-border/30 rounded-xs px-xs py-1.5 flex items-center justify-between mt-xs">
          <div className="flex items-center gap-xs text-[9px] roboto text-text-muted uppercase font-bold tracking-wider">
            <DollarSign size={10} className="text-text-muted/60 shrink-0" strokeWidth={1.5} />
            <span>Public Salary:</span>
          </div>
          <div className="flex items-baseline gap-2xs">
            <span className="text-xs mona text-text-primary font-black">
              {payScale}
            </span>
            <span className="text-[9px] roboto text-text-muted font-bold">/ Month</span>
          </div>
        </div>
      ) : (
        <div className="bg-slate-50 border border-border/30 rounded-xs px-xs py-1.5 flex items-center justify-between mt-xs">
          <div className="flex items-center gap-xs text-[9px] roboto text-text-muted uppercase font-bold tracking-wider">
            <DollarSign size={10} className="text-text-muted/60 shrink-0" strokeWidth={1.5} />
            <span>Salary Info:</span>
          </div>
          <span className="text-[10px] roboto text-text-muted italic">
            Private Contractor
          </span>
        </div>
      )}

    </div>
  );
}
