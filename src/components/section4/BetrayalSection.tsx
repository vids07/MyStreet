import { Clock, TrendingDown, AlertTriangle, FileText } from 'lucide-react';

export type BetrayalSectionProps = {
  title: string;
  netDisbursed: string;
  sanctionedBudget: string;
  contractValue: string;
  issuesCount: number;
  benchmarkJeMonths: string;
  underbidPercent: string | null;
  underbidAmount: string | null;
  failedInMonths: string | null;
  firstConditionDate: string | null;
  costPerDay: string | null;
  dlpExpired: boolean;
  dlpExpiryDate: string | null;
  rtiFiledDate: string | null;
  rtiDaysOverdue: number | null;
  appeal1Date: string | null;
  appeal1SentMode: string | null;
  appeal1ReplyStatus: string | null;
  appeal2Date: string | null;
  appeal2SentMode: string | null;
  appeal2ReplyStatus: string | null;
  appealCount: number;
  daysSilent: number | null;
  roadLocation: string;
  privateRepairCount: number;
  crackCount: number;
  potholeCount: number;
  drainCount: number;
};

export default function BetrayalSection({
  title,
  netDisbursed,
  sanctionedBudget,
  contractValue,
  issuesCount,
  benchmarkJeMonths,
  underbidPercent,
  underbidAmount,
  failedInMonths,
  firstConditionDate,
  costPerDay,
  dlpExpired,
  dlpExpiryDate,
  rtiFiledDate,
  rtiDaysOverdue,
  appeal1Date,
  appeal1SentMode,
  appeal1ReplyStatus,
  appeal2Date,
  appeal2SentMode,
  appeal2ReplyStatus,
  appealCount,
  daysSilent,
  roadLocation,
  privateRepairCount,
  crackCount,
  potholeCount,
  drainCount,
}: BetrayalSectionProps) {
  return (
    <section id="section4" className="py-xl bg-surface">
      <div className="max-w-7xl mx-auto px-sm md:px-md flex flex-col gap-lg">

        {/* Header */}
        <h2 className="text-headline mona text-text-primary">{title}</h2>

        {/* Main money block */}
        <div className="bg-card rounded-md shadow-card p-md">
          <p className="text-label roboto text-text-muted uppercase mb-xs">
            TOTAL TAXPAYER MONEY PAID
          </p>
          <p className="text-display mona text-failure">{netDisbursed}</p>

          <div className="mt-sm pt-sm border-t border-[0.5px] border-border flex flex-wrap gap-md">
            <div>
              <p className="text-label roboto text-text-muted uppercase mb-2xs">GOVERNMENT ESTIMATE</p>
              <p className="text-title mona text-text-primary">{sanctionedBudget}</p>
            </div>
            <div>
              <p className="text-label roboto text-text-muted uppercase mb-2xs">CONTRACTED AT</p>
              <p className="text-title mona text-text-primary">{contractValue}</p>
            </div>
            {underbidAmount !== null && (
              <div>
                <p className="text-label roboto text-text-muted uppercase mb-2xs">CHEAPER BY</p>
                <p className="text-title mona text-failure">{underbidAmount}</p>
              </div>
            )}
          </div>
        </div>

        {/* Three stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-md">

          {/* Card 1: How it was selected */}
          <div className="bg-card rounded-md shadow-card p-md flex flex-col gap-sm">
            <div className="flex items-center gap-xs">
              <TrendingDown size={20} strokeWidth={1.5} className="text-failure" />
              <p className="text-label roboto text-text-muted uppercase">HOW IT WAS SELECTED</p>
            </div>

            {underbidPercent !== null && (
              <div>
                <p className="text-headline mona text-failure">{underbidPercent}%</p>
                <p className="text-body mona text-text-muted">below government estimate</p>
              </div>
            )}

            <div className="border-t border-[0.5px] border-border pt-sm flex flex-col gap-2xs">
              <p className="text-body mona text-text-primary">
                Cheapest bid wins. L1 selection rule.
              </p>
              <p className="text-meta roboto text-text-muted">
                {contractValue} on a {sanctionedBudget} job
              </p>
            </div>
          </div>

          {/* Card 2: How fast it failed */}
          <div className="bg-card rounded-md shadow-card p-md flex flex-col gap-sm">
            <div className="flex items-center gap-xs">
              <Clock size={20} strokeWidth={1.5} className="text-failure" />
              <p className="text-label roboto text-text-muted uppercase">HOW FAST IT FAILED</p>
            </div>

            <div>
              <p className="text-headline mona text-failure">
                {failedInMonths !== null ? `Failed in ${failedInMonths}` : 'Failed quickly'}
              </p>
              {firstConditionDate !== null && (
                <p className="text-body mona text-text-muted">
                  First documented: {firstConditionDate}
                </p>
              )}
            </div>

            <div className="border-t border-[0.5px] border-border pt-sm flex flex-col gap-xs">
              {costPerDay !== null && (
                <div className="flex justify-between items-center">
                  <span className="text-meta roboto text-text-muted">Cost per day</span>
                  <span className="text-body-bold mona text-text-primary">{costPerDay}</span>
                </div>
              )}
              <div className="mt-xs pt-xs border-t border-[0.5px] border-border">
                <p className="text-label roboto text-text-muted uppercase mb-xs">
                  {issuesCount} ISSUES FOUND
                </p>
                <div className="grid grid-cols-3 gap-xs">
                  <div className="text-center">
                    <p className="text-body-bold mona text-failure">{crackCount}</p>
                    <p className="text-label roboto text-text-muted uppercase">Cracks</p>
                  </div>
                  <div className="text-center">
                    <p className="text-body-bold mona text-failure">{potholeCount}</p>
                    <p className="text-label roboto text-text-muted uppercase">Potholes</p>
                  </div>
                  <div className="text-center">
                    <p className="text-body-bold mona text-failure">{drainCount}</p>
                    <p className="text-label roboto text-text-muted uppercase">Drain</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: What happened after */}
          <div className="bg-card rounded-md shadow-card p-md flex flex-col gap-sm">
            <div className="flex items-center gap-xs">
              <AlertTriangle size={20} strokeWidth={1.5} className="text-failure" />
              <p className="text-label roboto text-text-muted uppercase">WHAT HAPPENED AFTER</p>
            </div>

            <p className="text-body-bold mona text-text-primary">Contractor never returned.</p>

            <div className="border-t border-[0.5px] border-border pt-sm flex flex-col gap-sm">
              <div>
                <p className="text-label roboto text-text-muted uppercase mb-2xs">DLP PERIOD</p>
                <p className={`text-body-bold mona ${dlpExpired ? 'text-failure' : 'text-warning'}`}>
                  {dlpExpired ? 'Legal window expired' : 'DLP active'}
                </p>
                {dlpExpiryDate !== null && (
                  <p className="text-meta roboto text-text-muted">
                    {dlpExpired ? 'Expired' : 'Expires'} {dlpExpiryDate}
                  </p>
                )}
              </div>

              {privateRepairCount > 0 && (
                <div>
                  <p className="text-label roboto text-text-muted uppercase mb-2xs">
                    PRIVATELY REPAIRED
                  </p>
                  <p className="text-body-bold mona text-text-primary">
                    {privateRepairCount} of {issuesCount} issues
                  </p>
                  <p className="text-meta roboto text-text-muted">
                    Paid by residents. No reimbursement. Issues remain.
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* RTI Silence Block */}
        {rtiFiledDate !== null && (
          <div className="bg-card rounded-md shadow-card p-md flex flex-col gap-md">

            <div className="flex items-start gap-xs">
              <FileText size={20} strokeWidth={1.5} className="text-failure mt-2xs shrink-0" />
              <div>
                <p className="text-label roboto text-text-muted uppercase mb-2xs">THE LEGAL WALL</p>
                <p className="text-title mona text-text-primary">
                  We asked. We escalated. We sent it by post.
                </p>
                {daysSilent !== null && (
                  <p className="text-body mona text-text-muted mt-2xs">
                    {daysSilent} days since the first question was filed. Still no accountability.
                  </p>
                )}
              </div>
            </div>

            {/* Escalation timeline */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-sm border-t border-[0.5px] border-border pt-md">

              <div className="flex flex-col gap-2xs">
                <p className="text-label roboto text-text-muted uppercase">RTI FILED</p>
                <p className="text-body-bold mona text-text-primary">{rtiFiledDate}</p>
                <p className="text-meta roboto text-text-muted">30-day legal deadline</p>
                {rtiDaysOverdue !== null && rtiDaysOverdue > 0 && (
                  <p className="text-meta roboto text-failure">
                    Response came {rtiDaysOverdue} days late
                  </p>
                )}
              </div>

              {appeal1Date !== null && (
                <div className="flex flex-col gap-2xs">
                  <p className="text-label roboto text-text-muted uppercase">1ST APPEAL</p>
                  <p className="text-body-bold mona text-text-primary">{appeal1Date}</p>
                  <p className="text-meta roboto text-text-muted">
                    {appeal1SentMode === 'online_and_speed_post'
                      ? 'Filed online + sent by speed post'
                      : appeal1SentMode === 'online'
                        ? 'Filed online'
                        : '30-day legal deadline'}
                  </p>
                  {appeal1ReplyStatus === 'nil' && (
                    <p className="text-meta roboto text-failure">Reply: Nil — on official record</p>
                  )}
                  {appeal1ReplyStatus === 'pending' && (
                    <p className="text-meta roboto text-failure">No reply. Still waiting.</p>
                  )}
                </div>
              )}

              {appeal2Date !== null && (
                <div className="flex flex-col gap-2xs">
                  <p className="text-label roboto text-text-muted uppercase">2ND APPEAL</p>
                  <p className="text-body-bold mona text-text-primary">{appeal2Date}</p>
                  <p className="text-meta roboto text-text-muted">
                    {appeal2SentMode === 'online_and_speed_post'
                      ? 'Filed online + sent by speed post'
                      : '30-day legal deadline'}
                  </p>
                  {appeal2ReplyStatus === 'nil' && (
                    <p className="text-meta roboto text-failure">Reply: Nil — on official record</p>
                  )}
                  {appeal2ReplyStatus === 'pending' && (
                    <p className="text-meta roboto text-failure">No reply. Still waiting.</p>
                  )}
                </div>
              )}

            </div>

            {/* Citizen vs Government */}
            <div className="border-t border-[0.5px] border-border pt-md grid grid-cols-1 md:grid-cols-2 gap-md">
              <div>
                <p className="text-label roboto text-evidence uppercase mb-xs">WHAT THE CITIZEN DID</p>
                <p className="text-body mona text-text-primary">
                  Documented {issuesCount} issues. Filed RTI.
                  {appealCount > 0 && ` Filed ${appealCount} appeal${appealCount > 1 ? 's' : ''}.`}
                  {' '}Sent hard copy by post.
                </p>
                <p className="text-meta roboto text-text-muted mt-2xs">
                  All of this — so you could read it right now.
                </p>
              </div>
              <div className="md:border-l md:border-[0.5px] md:border-border md:pl-md">
                <p className="text-label roboto text-failure uppercase mb-xs">WHAT THE GOVERNMENT DID</p>
                <p className="text-body mona text-text-primary">
                  Zero substantive replies. Portal never updated.
                </p>
                <p className="text-meta roboto text-text-muted mt-2xs">
                  Officials who certified this road are still in service.
                </p>
              </div>
            </div>

          </div>
        )}

        {/* International comparison */}
        <div className="bg-card rounded-md shadow-card p-md">
          <p className="text-label roboto text-text-muted uppercase mb-sm">
            THE SAME TECHNOLOGY, BUILT TO SPEC
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            <div>
              <p className="text-headline mona text-evidence">30–50 years</p>
              <p className="text-body mona text-text-muted">
                Interlocking paver roads in the Netherlands — where this technology was invented — last 30 to 50 years when built to standard.
              </p>
              <p className="text-meta roboto text-text-muted mt-2xs">
                Source: ICPI design life guidance
              </p>
            </div>
            <div className="md:border-l md:border-[0.5px] md:border-border md:pl-md flex flex-col gap-xs">
              <div>
                <p className="text-headline mona text-failure">Within months</p>
                <p className="text-body mona text-text-muted">This road. {roadLocation}.</p>
              </div>
              <p className="text-meta roboto text-text-muted">
                {benchmarkJeMonths} months of the certifying engineer's salary. Gone.
              </p>
            </div>
          </div>
        </div>

        {/* Closing statement */}
        <div className="border-t border-[0.5px] border-border pt-lg">
          <p className="text-title mona text-text-primary">
            Your money is getting wasted again and again.
          </p>
          <p className="text-body mona text-text-muted mt-xs">
            Same system. Same rules. Same outcome. This road is one record — how many have no record at all.
          </p>
        </div>

      </div>
    </section>
  );
}
