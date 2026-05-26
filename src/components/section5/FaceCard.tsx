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
  salaryPerDay,
  salarySource,
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
    <div className="bg-card rounded-md shadow-card hover:shadow-card-hover hover:scale-[1.01] transition-all duration-300 p-md flex flex-col gap-sm border border-border/60 relative overflow-hidden group h-full">
      {/* Subtle corner brackets for ledger docket look */}
      <div className="absolute top-2.5 left-2.5 w-1.5 h-1.5 border-t border-l border-border/80 group-hover:border-text-muted/20 transition-colors" />
      <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 border-t border-r border-border/80 group-hover:border-text-muted/20 transition-colors" />
      <div className="absolute bottom-2.5 left-2.5 w-1.5 h-1.5 border-b border-l border-border/80 group-hover:border-text-muted/20 transition-colors" />
      <div className="absolute bottom-2.5 right-2.5 w-1.5 h-1.5 border-b border-r border-border/80 group-hover:border-text-muted/20 transition-colors" />

      {/* Visual Forensic watermark */}
      <div className="absolute -right-4 -bottom-4 text-6xl font-black uppercase tracking-tighter text-slate-900/[0.015] select-none pointer-events-none mona">
        DOSSIER
      </div>

      {/* Decorative dossier tab marker */}
      <div className="absolute top-0 right-12 w-16 h-[2px] bg-border group-hover:bg-text-muted/25 transition-colors" />

      {/* Header Row: Avatar & Forensic Status Stamp */}
      <div className="flex items-start justify-between gap-sm pt-xs relative z-10">
        {/* Avatar with status-specific colored ring */}
        <div className={`relative shrink-0 w-16 h-16 rounded-full bg-surface flex items-center justify-center p-[3px] ring-2 ${config.ring} shadow-inner`}>
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={fullName}
              className="w-full h-full rounded-full object-cover grayscale brightness-95 group-hover:grayscale-0 transition-all duration-300"
            />
          ) : (
            <span className="text-body-bold roboto font-black text-text-primary">
              {avatarText}
            </span>
          )}
        </div>

        {/* Forensic Docket Status Badge */}
        {accountabilityStatus && (
          <div className="flex flex-col items-end">
            <span className={`px-xs py-1 border ${config.text} ${config.bg} text-[10px] font-mono font-black tracking-widest rounded-xs shadow-sm uppercase`}>
              [{getAccountabilityLabel(accountabilityStatus)}]
            </span>
          </div>
        )}
      </div>

      {/* Identity Block */}
      <div className="relative z-10">
        <h3 className="text-title mona text-text-primary font-black uppercase tracking-tight group-hover:text-failure transition-colors duration-200 leading-tight">
          {fullName}
        </h3>
        <p className="text-meta roboto text-text-muted mt-2xs flex items-center gap-1.5">
          <Shield size={10} className="text-text-muted/50" />
          <span className="text-xs uppercase font-bold tracking-wider">
            {designation ?? 'OFFICIAL'}
            {abbrev !== null && abbrev !== designation && ` (${abbrev})`}
          </span>
        </p>
      </div>

      <div className="border-t border-border/40" />

      {/* Symmetrical split: Duty vs Action */}
      <div className="flex flex-col gap-xs relative z-10">
        {/* Official Duty */}
        <div className="bg-slate-50 border-l-2 border-slate-300 p-2xs rounded-r-xs">
          <span className="text-[9px] font-black text-text-muted uppercase tracking-widest block mb-1 roboto">OFFICIAL DUTY</span>
          <p className="text-xs roboto font-bold text-text-primary leading-tight">
            {jobDescription ?? '—'}
          </p>
        </div>

        {/* Audit Findings / Verdict */}
        <div>
          <span className="text-[9px] font-black text-text-muted uppercase tracking-widest block mb-1 roboto">AUDIT VERDICT</span>
          {isFailureChain ? (
            <div className="bg-failure-bg/40 text-failure border-l-2 border-failure p-2xs rounded-r-xs">
              <p className="text-xs roboto font-bold leading-tight flex items-start gap-1">
                <AlertCircle size={12} className="shrink-0 mt-0.5 text-failure" />
                <span>
                  {actionLabel}. This road disintegrated within months.
                </span>
              </p>
            </div>
          ) : (
            <div className="bg-slate-50 border-l-2 border-slate-300 p-2xs rounded-r-xs">
              <p className="text-xs roboto text-text-primary leading-tight">
                {actionLabel}.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-border/40 mt-auto" />

      {/* Public Salary Scale Widget */}
      <div className="bg-slate-50 border border-border/30 rounded-xs p-xs relative overflow-hidden">
        {/* Tiny decorative scale icon */}
        <div className="absolute right-2 top-2">
          <DollarSign size={12} className="text-text-muted/30" />
        </div>

        <span className="text-[9px] font-black text-text-muted uppercase tracking-widest block mb-1 roboto">PUBLIC SALARY SCALE</span>
        
        <div className="flex items-baseline gap-xs">
          <span className="text-title mona text-text-primary font-black leading-none">
            {payScale !== null ? `${payScale}` : 'Not Available'}
          </span>
          <span className="text-[9px] roboto text-text-muted uppercase font-bold">/ Month</span>
        </div>

        <div className="mt-1 flex flex-col gap-0.5 text-[10px] roboto text-text-muted">
          {salaryPerDay !== null && (
            <p className="flex justify-between border-b border-dashed border-border/40 pb-0.5">
              <span>Rate Per Day:</span>
              <strong className="text-text-primary font-bold font-mono">{salaryPerDay}</strong>
            </p>
          )}
          {salarySource !== null && (
            <p className="text-[9px] text-text-muted/80 italic mt-0.5 leading-none">
              Source: {salarySource}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
