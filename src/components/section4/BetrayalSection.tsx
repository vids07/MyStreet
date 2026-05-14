import React from 'react';
import { LucideIcon, IndianRupee, Clock, AlertTriangle } from 'lucide-react';

type BetrayalSectionProps = {
  title: string;
  netDisbursed: string;
  sanctionedBudget: string;
  contractValue: string;
  builtAgo: string;
  daysLasted: string;
  issuesCount: number;
  benchmarkBags: string;
  benchmarkJeMonths: string;
};

export default function BetrayalSection({
  title,
  netDisbursed,
  sanctionedBudget,
  contractValue,
  builtAgo,
  daysLasted,
  issuesCount,
  benchmarkBags,
  benchmarkJeMonths,
}: BetrayalSectionProps) {
  return (
    <section id="section4" className="py-xl px-container-mobile md:px-container-desktop max-w-7xl mx-auto">
      <div className="space-y-lg">
        <h2 className="text-headline mona text-text-primary uppercase">{title}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
          {/* Main Money Figure */}
          <div className="bg-card shadow-card rounded-md p-md border-t-4 border-failure">
            <p className="text-label roboto text-text-muted mb-2">TOTAL TAXPAYER MONEY PAID</p>
            <p className="text-display mona text-text-primary">{netDisbursed}</p>
            <div className="mt-md pt-md border-t border-border space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-meta roboto text-text-muted">Sanctioned Budget</span>
                <span className="text-body-bold mona">{sanctionedBudget}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-meta roboto text-text-muted">Contract Value</span>
                <span className="text-body-bold mona">{contractValue}</span>
              </div>
            </div>
          </div>

          {/* Benchmarks */}
          <div className="bg-card shadow-card rounded-md p-md space-y-md">
            <div className="space-y-2">
              <p className="text-label roboto text-text-muted">COULD HAVE BOUGHT</p>
              <p className="text-headline mona text-text-primary">{benchmarkBags} School Bags</p>
              <p className="text-meta roboto text-text-muted">at ₹300 per bag</p>
            </div>
            <div className="pt-md border-t border-border space-y-2">
              <p className="text-label roboto text-text-muted">EQUIVALENT TO</p>
              <p className="text-headline mona text-text-primary">{benchmarkJeMonths} Months</p>
              <p className="text-meta roboto text-text-muted">of a Junior Engineer's salary</p>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="bg-card shadow-card rounded-md p-md space-y-md">
            <div className="flex items-start gap-sm">
              <div className="p-2 bg-failure-bg rounded-full">
                <Clock className="w-6 h-6 text-failure" />
              </div>
              <div>
                <p className="text-label roboto text-text-muted uppercase">Duration</p>
                <p className="text-title mona text-text-primary">Lasted {daysLasted}</p>
                <p className="text-meta roboto text-text-muted">Built {builtAgo}</p>
              </div>
            </div>

            <div className="flex items-start gap-sm">
              <div className="p-2 bg-warning-bg rounded-full">
                <AlertTriangle className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-label roboto text-text-muted uppercase">Failures Found</p>
                <p className="text-title mona text-text-primary">{issuesCount} Structural Issues</p>
                <p className="text-meta roboto text-text-muted">Verified on site</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
