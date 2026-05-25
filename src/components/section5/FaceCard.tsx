import { getInitials, getAccountabilityLabel, abbreviateDesignation } from '@/lib/utils/road-display';

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

const ACCOUNTABILITY_COLORS: Record<string, { bg: string; text: string }> = {
  waiting_for_audit: { bg: 'bg-warning-bg', text: 'text-warning' },
  response_pending:  { bg: 'bg-warning-bg', text: 'text-warning' },
  responded:         { bg: 'bg-evidence-bg', text: 'text-evidence' },
  charged:           { bg: 'bg-failure-bg', text: 'text-failure' },
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
  const badgeColors = ACCOUNTABILITY_COLORS[accountabilityStatus ?? ''] ?? {
    bg: 'bg-surface',
    text: 'text-text-muted',
  };

  const abbrev = designation ? abbreviateDesignation(designation) : null;
  const avatarText = abbrev !== null && abbrev !== designation
    ? abbrev
    : getInitials(fullName);

  return (
    <div className="bg-card rounded-md shadow-card hover:shadow-card-hover transition-shadow p-sm flex flex-col gap-sm">

      {/* Avatar row */}
      <div className="flex items-center justify-between">
        <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center shrink-0">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={fullName}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <span className="text-title mona font-bold text-text-primary">
              {avatarText}
            </span>
          )}
        </div>

        {accountabilityStatus && (
          <span className={`px-xs py-2xs rounded-xs text-label roboto uppercase whitespace-nowrap ${badgeColors.bg} ${badgeColors.text}`}>
            {getAccountabilityLabel(accountabilityStatus)}
          </span>
        )}
      </div>

      {/* Name + designation */}
      <div>
        <h3 className="text-title mona text-text-primary">{fullName}</h3>
        <p className="text-meta roboto text-text-muted">
          {designation ?? '—'}
          {abbrev !== null && abbrev !== designation && ` (${abbrev})`}
        </p>
      </div>

      <div className="border-t-[0.5px] border-border" />

      {/* Supposed to do */}
      <div>
        <p className="text-label roboto uppercase text-text-muted">Supposed to do</p>
        <p className="text-body mona text-text-primary mt-2xs">
          {jobDescription ?? '—'}
        </p>
      </div>

      {/* What happened */}
      <div>
        <p className="text-label roboto uppercase text-text-muted">What happened</p>
        {isFailureChain ? (
          <p className="text-title mona text-failure mt-2xs">
            {actionLabel}. This road failed in months.
          </p>
        ) : (
          <p className="text-body-bold mona text-text-primary mt-2xs">
            {actionLabel}.
          </p>
        )}
      </div>

      <div className="border-t-[0.5px] border-border" />

      {/* Pay scale */}
      <div>
        <p className="text-label roboto uppercase text-text-muted">Public Salary Scale</p>
        <p className="text-body-bold mona text-text-primary mt-2xs">
          {payScale !== null ? `${payScale} per month` : 'Not applicable'}
        </p>
        {salaryPerDay !== null && (
          <p className="text-meta roboto text-text-muted mt-2xs">{salaryPerDay} minimum</p>
        )}
        {salarySource !== null && (
          <p className="text-meta roboto text-text-muted mt-2xs">{salarySource}</p>
        )}
      </div>

    </div>
  );
}
