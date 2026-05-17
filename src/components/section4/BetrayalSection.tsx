import React from 'react';
import { IndianRupee, Clock, AlertTriangle } from 'lucide-react';

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
    <section id="section4" className="py-xl bg-surface">
      <div className="max-w-7xl mx-auto px-sm md:px-md">
        <div className="space-y-lg">
          <h2 className="text-headline mona text-text-primary">{title}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
            {/* Main Money Figure */}
            <div className="bg-card shadow-card rounded-md p-md border-t-4 border-failure">
              <p className="text-label roboto text-text-muted uppercase mb-xs">Total taxpayer money paid</p>
              <p className="text-display mona text-text-primary">{netDisbursed}</p>
              <div className="mt-md pt-md border-t border-[0.5px] border-border space-y-xs">
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
              <div className="space-y-xs">
                <p className="text-label roboto text-text-muted uppercase">Could have bought</p>
                <p className="text-headline mona text-text-primary">{benchmarkBags} School Bags</p>
                <p className="text-meta roboto text-text-muted">at ₹300 per bag</p>
              </div>
              <div className="pt-md border-t border-[0.5px] border-border space-y-xs">
                <p className="text-label roboto text-text-muted uppercase">Equivalent to</p>
                <p className="text-headline mona text-text-primary">{benchmarkJeMonths} Months</p>
                <p className="text-meta roboto text-text-muted">of a Junior Engineer's salary</p>
              </div>
            </div>

            {/* Stats Summary */}
            <div className="bg-card shadow-card rounded-md p-md space-y-md">
              <div className="flex items-start gap-sm">
                <div className="p-2xs bg-failure-bg rounded-sm">
                  <Clock size={24} strokeWidth={1.5} className="text-failure" />
                </div>
                <div>
                  <p className="text-label roboto text-text-muted uppercase">Duration</p>
                  <p className="text-title mona text-text-primary">Lasted {daysLasted}</p>
                  <p className="text-meta roboto text-text-muted">Built {builtAgo}</p>
                </div>
              </div>

              <div className="flex items-start gap-sm">
                <div className="p-2xs bg-warning-bg rounded-sm">
                  <AlertTriangle size={24} strokeWidth={1.5} className="text-warning" />
                </div>
                <div>
                  <p className="text-label roboto text-text-muted uppercase">Failures found</p>
                  <p className="text-title mona text-text-primary">{issuesCount} Structural Issues</p>
                  <p className="text-meta roboto text-text-muted">Verified on site</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
