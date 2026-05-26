import { TrendingDown, AlertTriangle, FileText, CheckCircle2, XCircle } from 'lucide-react';

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
  dlpStartDate: string | null;
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
  underbidPercent,
  underbidAmount,
  failedInMonths,
  firstConditionDate,
  dlpExpired,
  rtiFiledDate,
  rtiDaysOverdue,
  appeal1Date,
  appeal1ReplyStatus,
  appeal2Date,
  appeal2ReplyStatus,
  daysSilent,
  roadLocation,
  privateRepairCount,
  crackCount,
  potholeCount,
  drainCount,
}: BetrayalSectionProps) {
  return (
    <section id="section4" className="py-xl bg-surface">
      <div className="max-w-5xl mx-auto px-sm md:px-md flex flex-col gap-md relative">
        
        {/* Section Header */}
        <div className="flex flex-col gap-2xs border-b border-border pb-sm">
          <p className="text-label roboto text-text-muted uppercase tracking-[0.2em] mb-2xs">
            CITIZEN CASE FILE // SECTION 04
          </p>
          <h2 className="text-headline mona text-text-primary uppercase tracking-tight font-black leading-none">
            {title}
          </h2>
        </div>

        {/* 1. HERO FINANCIAL VOUCHER (THE CITIZEN LOSS) */}
        <div className="bg-card rounded-md shadow-card p-md relative overflow-hidden flex flex-col gap-sm border border-border/60">
          {/* Subtle watermark */}
          <div className="absolute right-4 bottom-4 text-7xl font-black uppercase tracking-tight text-slate-900/[0.02] select-none pointer-events-none mona">
            PAID_BY_YOU
          </div>

          {/* Corner Accents */}
          <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-text-muted/20" />
          <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-text-muted/20" />
          <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-text-muted/20" />
          <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-text-muted/20" />

          {/* Voucher Header */}
          <div className="relative z-10 flex justify-between items-center border-b border-border/40 pb-2">
            <span className="text-label roboto text-text-muted uppercase tracking-wider">
              TAXPAYER MONEY SPENT
            </span>
            <span className="text-label roboto text-failure font-black tracking-widest bg-failure-bg/60 px-2 py-0.5 rounded-xs">
              CITIZEN NET LOSS
            </span>
          </div>

          {/* Main Financial Outflow Figure */}
          <div className="relative z-10 py-1 flex flex-col md:flex-row md:items-baseline justify-between gap-2xs">
            <div className="flex flex-col">
              <span className="text-label roboto text-text-muted uppercase tracking-wider mb-2xs">
                TOTAL PUBLIC FUNDS GONE
              </span>
              <p className="text-display mona text-failure leading-none">
                {netDisbursed}
              </p>
            </div>
            <div className="text-left md:text-right font-mono text-[10px] text-text-muted">
              <span className="roboto font-bold uppercase tracking-wider block">ROAD RECORD</span>
              <span className="font-black text-text-primary uppercase tracking-wider block">#WARD28-{roadLocation.split(',')[0].trim().toUpperCase().replace(/\s+/g, '-')}</span>
            </div>
          </div>

          {/* Simple Ledger Grid */}
          <div className="relative z-10 pt-sm border-t border-border/60 grid grid-cols-1 sm:grid-cols-3 gap-sm">
            <div>
              <span className="text-label roboto text-text-muted uppercase block mb-2xs">
                WHAT WAS SANCTIONED
              </span>
              <p className="text-title mona text-text-primary">
                {sanctionedBudget}
              </p>
            </div>
            <div>
              <span className="text-label roboto text-text-muted uppercase block mb-2xs">
                WHAT THEY PAID CONTRACTOR
              </span>
              <p className="text-title mona text-text-primary">
                {contractValue}
              </p>
            </div>
            {underbidAmount !== null && (
              <div>
                <span className="text-label roboto text-failure uppercase block mb-2xs">
                  THE CHEAPEST-BID DISCOUNT
                </span>
                <p className="text-title mona text-failure">
                  {underbidAmount} Off Estimate
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 2. THE DUAL COMPARATIVE SPLIT (THE BID TRAP vs SPEED OF FAILURE) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md items-stretch">
          
          {/* LEFT: THE CHEAPEST BID TRAP */}
          <div className="bg-card rounded-md shadow-card p-md border border-border/60 relative overflow-hidden flex flex-col justify-between gap-sm group transition-all duration-300 hover:shadow-card-hover">
            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-text-muted/20" />
            <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-text-muted/20" />
            
            <div className="flex flex-col gap-xs">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border/40 pb-2">
                <div className="flex items-center gap-xs">
                  <TrendingDown size={14} className="text-failure" />
                  <p className="text-label roboto text-text-muted uppercase tracking-wider">
                    THE CHEAPEST-BID WINNER
                  </p>
                </div>
                <span className="text-[9px] font-mono font-black text-failure bg-failure-bg/60 border border-failure/20 px-1.5 py-0.5 rounded-xs tracking-wider">
                  L1 PROCURE
                </span>
              </div>

              {/* Massive underbid discount number */}
              {underbidPercent !== null && (
                <div className="flex flex-col mt-2xs">
                  <div className="flex items-baseline gap-2">
                    <p className="text-headline mona text-failure font-black leading-none">-{underbidPercent}%</p>
                    <span className="text-label roboto text-failure font-black uppercase tracking-wider">Low-bid Discount</span>
                  </div>
                </div>
              )}

              {/* Visual Underbid Indicator */}
              <div className="bg-slate-50/50 border border-border/30 rounded-xs px-sm py-xs mt-2xs flex flex-col gap-xs">
                <div className="flex justify-between items-center text-[10px] roboto text-text-muted uppercase tracking-wider">
                  <span>Procurement Funding Gap</span>
                  <span className="text-failure font-bold">-{underbidPercent}% Deficit</span>
                </div>
                
                {/* Clean, simple visual split progress track */}
                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden flex border border-border/20">
                  <div className="h-full bg-slate-400/80 w-[82%]" />
                  <div className="h-full bg-failure/90 w-[18%] animate-pulse" />
                </div>
              </div>

              {/* Punchy explanation */}
              <p className="text-body-bold mona text-text-primary leading-relaxed mt-xs select-text">
                The contractor cut corners by {underbidPercent}% to win the contract.
              </p>
              <p className="text-meta roboto text-text-muted leading-relaxed select-text">
                Under the L1 procurement rule, the lowest bidder automatically wins. This legal loop-hole forces a race-to-the-bottom, sacrificing material quality and execution standards to save costs on paper.
              </p>

            </div>

            <div className="border-t border-border/40 pt-xs">
              <p className="text-meta roboto text-text-muted">
                Cheaper bids lead to broken roads with zero guarantees.
              </p>
            </div>
          </div>

          {/* RIGHT: HOW FAST IT BROKE */}
          <div className="bg-card rounded-md shadow-card p-md border border-border/60 relative overflow-hidden flex flex-col justify-between gap-sm group">
            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-text-muted/20" />
            <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-text-muted/20" />

            <div className="flex flex-col gap-xs">
              {/* Header */}
              <div className="flex items-center gap-xs border-b border-border/40 pb-2">
                <AlertTriangle size={14} className="text-failure animate-pulse" />
                <p className="text-label roboto text-text-muted uppercase tracking-wider">
                  HOW FAST IT BROKE
                </p>
              </div>

              {/* Stark Headline & Dynamic Subtext */}
              <div className="flex flex-col mt-2xs">
                <p className="text-headline mona text-failure font-black tracking-tight leading-none">
                  Broken in months
                </p>
                {failedInMonths !== null && (
                  <p className="text-meta roboto text-text-muted font-bold uppercase tracking-wider mt-1">
                    Defects Recorded: <span className="text-failure font-bold">{failedInMonths}</span> ({firstConditionDate ? `First filed: ${firstConditionDate}` : 'No date'})
                  </p>
                )}
              </div>

              {/* Dynamic Disintegration Velocity Gauge */}
              <div className="bg-slate-50 border border-border/30 rounded-xs p-xs mt-1 flex flex-col gap-1.5 relative overflow-hidden">
                <div className="flex justify-between items-center text-[9px] roboto font-bold text-text-muted uppercase tracking-wider">
                  <span>ROAD TIMELINE // DISINTEGRATION VELOCITY</span>
                  <span className="text-failure animate-pulse font-black">CRITICAL RATE</span>
                </div>
                
                {/* Visual Progress Track */}
                <div className="h-3 w-full bg-slate-200/85 rounded-full overflow-hidden relative border border-border/30 shadow-inner">
                  {/* Danger-filled rapid progress bar */}
                  <div className="h-full bg-gradient-to-r from-warning to-failure w-[18%] relative rounded-full animate-pulse">
                    {/* Glowing beacon tip */}
                    <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-white shadow-[0_0_8px_#FF4D4D] animate-ping" />
                  </div>
                </div>

                <div className="flex justify-between items-center text-[9px] roboto text-text-muted font-medium">
                  <span>Day 0 (Payout)</span>
                  <span className="text-failure font-bold">Month 7 (Defect Record)</span>
                  <span>Year 30 (Expected)</span>
                </div>
              </div>

              {/* Animated Defect Modules */}
              <div className="grid grid-cols-3 gap-xs py-1 mt-1">
                <div className="bg-slate-50 border border-border/30 hover:border-failure/40 hover:shadow-[0_4px_12px_rgba(239,68,68,0.06)] hover:scale-105 rounded-sm py-2 px-3 text-center transition-all duration-300 cursor-default">
                  <span className="text-title mona font-black text-text-primary leading-none block group-hover:text-failure transition-colors">{crackCount}</span>
                  <span className="block text-[8px] roboto font-black text-text-muted uppercase tracking-widest mt-1 leading-none">Cracks</span>
                </div>
                <div className="bg-slate-50 border border-border/30 hover:border-failure/40 hover:shadow-[0_4px_12px_rgba(239,68,68,0.06)] hover:scale-105 rounded-sm py-2 px-3 text-center transition-all duration-300 cursor-default">
                  <span className="text-title mona font-black text-text-primary leading-none block group-hover:text-failure transition-colors">{potholeCount}</span>
                  <span className="block text-[8px] roboto font-black text-text-muted uppercase tracking-widest mt-1 leading-none">Potholes</span>
                </div>
                <div className="bg-slate-50 border border-border/30 hover:border-failure/40 hover:shadow-[0_4px_12px_rgba(239,68,68,0.06)] hover:scale-105 rounded-sm py-2 px-3 text-center transition-all duration-300 cursor-default">
                  <span className="text-title mona font-black text-text-primary leading-none block group-hover:text-failure transition-colors">{drainCount}</span>
                  <span className="block text-[8px] roboto font-black text-text-muted uppercase tracking-widest mt-1 leading-none">Drains</span>
                </div>
              </div>
            </div>

            {/* Resident out of pocket notice (Sleek Red Notice Box) */}
            {privateRepairCount > 0 ? (
              <div className="border-2 border-dashed border-failure/30 bg-failure-bg/15 rounded-sm p-xs mt-1 flex flex-col gap-1.5 transition-colors group-hover:border-failure/50">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] roboto text-failure font-black uppercase tracking-wider flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-failure animate-ping" />
                    TAXED TWICE
                  </span>
                  <span className="text-[9px] roboto font-black text-white bg-failure px-2 py-0.5 rounded-xs tracking-wider uppercase">
                    CITIZEN OUT OF POCKET
                  </span>
                </div>
                <p className="text-meta roboto text-text-primary font-black leading-snug">
                  The contractor abandoned the road. Left with no options, residents directly paid out of their own savings to repair {privateRepairCount} critical defects.
                </p>
              </div>
            ) : (
              <div className="border-t border-border/40 pt-xs">
                <p className="text-meta roboto text-text-muted">
                  {dlpExpired ? 'The legal guarantee period expired with zero official repairs.' : 'Contractor remained unresponsive during legal window.'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 3. VISUAL DURABILITY: DESERVED VS GOT */}
        <div className="bg-card rounded-md shadow-card p-md border border-border/60 relative overflow-hidden flex flex-col gap-sm">
          <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-text-muted/20" />
          <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-text-muted/20" />

          <span className="text-label roboto text-text-muted uppercase tracking-wider block border-b border-border/40 pb-2">
            WHAT YOU DESERVED vs WHAT YOU ACTUALLY GOT
          </span>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md divide-y md:divide-y-0 md:divide-x divide-border/60">
            {/* Netherlands */}
            <div className="flex flex-col gap-2xs pb-sm md:pb-0 pr-0 md:pr-md">
              <p className="text-headline mona text-evidence leading-none">30 to 50 Years</p>
              <p className="text-body-bold mona text-evidence uppercase tracking-tight mt-2xs">WHAT YOU DESERVED</p>
              <p className="text-meta roboto text-text-muted">
                What a professional interlocking paver road should last when built according to international engineering specifications.
              </p>
              {/* Visual mini bar */}
              <div className="h-1.5 w-full bg-evidence/10 rounded-full overflow-hidden mt-2xs mb-sm">
                <div className="h-full bg-evidence w-full" />
              </div>
              {/* Image */}
              <div className="relative h-44 rounded-sm overflow-hidden border border-border/40 shadow-sm mt-auto group">
                <a
                  href="https://bicycledutch.wordpress.com/2020/06/03/what-does-red-asphalt-look-like-after-many-years-of-use/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-full relative"
                  title="Verify design standards on Bicycle Dutch (opens in new tab)"
                >
                  <img
                    src="https://bicycledutch.wordpress.com/wp-content/uploads/2020/06/asphalt2011-1.jpg"
                    alt="Standard Dutch Red Asphalt Road (Bicycle Dutch)"
                    className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 bg-evidence-bg/85 border border-evidence/30 rounded-xs px-2 py-0.5 text-[9px] roboto text-evidence font-black uppercase tracking-wider">
                    NETHERLANDS ROAD // LAID IN 2011
                  </div>
                  <div className="absolute bottom-2 right-2 bg-slate-950/80 border border-white/10 rounded-xs px-1.5 py-0.5 text-[8px] font-mono text-white/90 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    CLICK TO VERIFY ↗
                  </div>
                </a>
              </div>
            </div>

            {/* Local Execution */}
            <div className="flex flex-col gap-2xs pt-sm md:pt-0 pl-0 md:pl-md">
              <p className="text-headline mona text-failure leading-none">Failed in months</p>
              <p className="text-body-bold mona text-failure uppercase tracking-tight mt-2xs">WHAT YOU ACTUALLY GOT</p>
              <p className="text-meta roboto text-text-muted">
                Our road disintegrated within months. Official defect records were first filed 7 months after municipal engineers certified it.
              </p>
              {/* Visual mini bar */}
              <div className="h-1.5 w-full bg-failure/10 rounded-full overflow-hidden mt-2xs mb-sm">
                <div className="h-full bg-failure w-[12%]" />
              </div>
              {/* Image */}
              <div className="relative h-44 rounded-sm overflow-hidden border border-border/40 shadow-sm mt-auto group">
                <a
                  href="https://res.cloudinary.com/dkgaihpyp/image/upload/q_auto/f_auto/v1779310839/001_vc0jdy.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-full relative"
                  title="Verify actual road defects in full-resolution (opens in new tab)"
                >
                  <img
                    src="https://res.cloudinary.com/dkgaihpyp/image/upload/q_auto/f_auto/v1779310839/001_vc0jdy.jpg"
                    alt="Actual Crumbling Road in Purvi Deen Dayal"
                    className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 bg-failure-bg/85 border border-failure/30 rounded-xs px-2 py-0.5 text-[9px] roboto text-failure font-black uppercase tracking-wider animate-pulse">
                    ACTUAL ROORKEE ROAD // US IN 2026
                  </div>
                  <div className="absolute bottom-2 right-2 bg-slate-950/80 border border-white/10 rounded-xs px-1.5 py-0.5 text-[8px] font-mono text-white/90 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    CLICK TO VERIFY ↗
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 4. THE WALL OF SILENCE */}
        {rtiFiledDate !== null && (
          <div className="bg-card rounded-md shadow-card p-md border border-border/60 relative overflow-hidden flex flex-col gap-sm">
            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-text-muted/20" />
            <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-text-muted/20" />

            <div className="border-b border-border/40 pb-2 flex justify-between items-center">
              <span className="text-label roboto text-text-muted uppercase tracking-wider">
                WE ASKED FOR ANSWERS // THEY GAVE US SILENCE
              </span>
              <span className="text-label roboto text-failure bg-failure-bg/60 px-2 py-0.5 rounded-xs font-black">
                OFFICIALLY IGNORED
              </span>
            </div>

            {/* Split layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-sm items-center py-1">
              
              {/* Massive counter */}
              <div className="md:col-span-5 flex flex-col justify-center border-b md:border-b-0 md:border-r border-border/60 pb-sm md:pb-0 md:pr-md min-h-[90px]">
                <span className="text-label roboto text-text-muted uppercase block mb-2xs">
                  DAYS THEY REMAINED SILENT
                </span>
                <p className="text-display mona text-failure leading-none">
                  {daysSilent ?? '300+'} DAYS
                </p>
                <p className="text-meta roboto text-text-muted mt-2xs">
                  No replies. No site inspections. No updates on their portal.
                </p>
              </div>

              {/* Citizen Escalation Log */}
              <div className="md:col-span-7 flex flex-col gap-md pl-0 md:pl-md relative py-xs">
                {/* Vertical Connector Line */}
                <div className="absolute left-[5px] top-4 bottom-4 w-[2px] bg-border/80" />

                {/* Step 1 */}
                <div className="flex flex-col relative pl-6">
                  <div className="absolute left-0 top-[4px] w-2.5 h-2.5 bg-white border-2 border-text-primary rounded-full z-10" />
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <div>
                      <span className="text-label roboto text-text-muted uppercase block mb-2xs">STEP 01 // LEGAL RTI QUERY</span>
                      <p className="text-body-bold mona text-text-primary">We filed an official RTI query</p>
                    </div>
                    <div>
                      {rtiDaysOverdue !== null && rtiDaysOverdue > 0 ? (
                        <span className="text-[10px] font-mono font-black text-failure bg-failure-bg border border-failure/20 px-2 py-1 rounded-xs inline-block">
                          THEY REPLIED {rtiDaysOverdue} DAYS LATE
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-text-muted bg-slate-50 border border-border/40 px-2 py-1 rounded-xs inline-block">
                          Filed: {rtiFiledDate}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col relative pl-6">
                  {appeal1Date !== null ? (
                    <>
                      <div className="absolute left-0 top-[4px] w-2.5 h-2.5 bg-white border-2 border-failure rounded-full z-10" />
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <div>
                          <span className="text-label roboto text-text-muted uppercase block mb-2xs">STEP 02 // FIRST APPEAL</span>
                          <p className="text-body-bold mona text-text-primary">Appealed to senior engineers</p>
                        </div>
                        <div>
                          <span className="text-[10px] font-mono font-black text-failure bg-failure-bg border border-failure/20 px-2 py-1 rounded-xs inline-block">
                            THEY GAVE ZERO EXPLANATION
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="absolute left-0 top-[4px] w-2.5 h-2.5 bg-white border-2 border-border border-dashed rounded-full z-10 opacity-40" />
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 opacity-40">
                        <div>
                          <span className="text-label roboto text-text-muted uppercase block mb-2xs">STEP 02 // FIRST APPEAL</span>
                          <p className="text-body-bold mona text-text-muted">Appealed to senior engineers</p>
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-text-muted bg-slate-50 border border-dashed border-border/60 px-2 py-1 rounded-xs inline-block">
                            PENDING
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Step 3 */}
                <div className="flex flex-col relative pl-6">
                  {appeal2Date !== null ? (
                    <>
                      <div className="absolute left-0 top-[4px] w-2.5 h-2.5 bg-white border-2 border-failure rounded-full z-10 animate-pulse" />
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <div>
                          <span className="text-label roboto text-text-muted uppercase block mb-2xs">STEP 03 // SECOND APPEAL</span>
                          <p className="text-body-bold mona text-text-primary">Appealed to the Commissioner</p>
                        </div>
                        <div>
                          <span className="text-[10px] font-mono font-black text-failure bg-failure-bg border border-failure/20 px-2 py-1 rounded-xs inline-block animate-pulse">
                            TOTAL INSTITUTIONAL SILENCE
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="absolute left-0 top-[4px] w-2.5 h-2.5 bg-white border-2 border-border border-dashed rounded-full z-10 opacity-40" />
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 opacity-40">
                        <div>
                          <span className="text-label roboto text-text-muted uppercase block mb-2xs">STEP 03 // SECOND APPEAL</span>
                          <p className="text-body-bold mona text-text-muted">Appealed to the Commissioner</p>
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-text-muted bg-slate-50 border border-dashed border-border/60 px-2 py-1 rounded-xs inline-block">
                            PENDING
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

              </div>
            </div>

            {/* Symmetrical Citizen vs Government summary strip */}
            <div className="border-t border-border/40 pt-sm mt-sm grid grid-cols-1 sm:grid-cols-2 gap-sm items-stretch">
              {/* Citizens Column */}
              <div className="flex gap-xs bg-slate-50/70 border-l-2 border-evidence p-xs rounded-r-xs">
                <CheckCircle2 size={14} className="text-evidence mt-0.5 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[10px] roboto text-evidence font-black uppercase tracking-wider mb-2xs">
                    WHAT CITIZENS DID
                  </span>
                  <p className="text-meta roboto text-text-primary leading-relaxed select-text">
                    Documented the cracks, filed formal queries, and mailed physical appeals to senior officers.
                  </p>
                </div>
              </div>

              {/* Government Column */}
              <div className="flex gap-xs bg-failure-bg/10 border-l-2 border-failure p-xs rounded-r-xs">
                <XCircle size={14} className="text-failure mt-0.5 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[10px] roboto text-failure font-black uppercase tracking-wider mb-2xs">
                    WHAT GOVERNMENT DID
                  </span>
                  <p className="text-meta roboto text-text-primary leading-relaxed select-text">
                    Refused to answer. The engineers who certified this broken road are still in active service.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5. CLOSING STATEMENT */}
        <div className="bg-card rounded-md shadow-card p-md border border-border/60 relative overflow-hidden flex flex-col gap-sm">
          <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-text-muted/20" />
          <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-text-muted/20" />
          
          <p className="text-title mona text-text-primary uppercase font-black tracking-tight border-b border-border/40 pb-2">
            Your money is getting wasted again and again.
          </p>
          <p className="text-body mona text-text-muted leading-relaxed select-text">
            Same system. Same procurement rules. Same contractors. Same outcome. This road represents a single recorded case—how many hundreds of other streets in our municipality disintegrate with zero public record?
          </p>
        </div>

      </div>
    </section>
  );
}
