import React from 'react';
import { User, ShieldCheck, Hammer, BadgeAlert } from 'lucide-react';
import type { PersonData } from '@/types/road';
import { getInitials, getAccountabilityLabel } from '@/lib/utils/road-display';

type FacesSectionProps = {
  certifier: PersonData | undefined;
  contractor: PersonData | undefined;
};

export default function FacesSection({ certifier, contractor }: FacesSectionProps) {
  return (
    <section id="section5" className="py-xl bg-surface">
      <div className="max-w-7xl mx-auto px-container-mobile md:px-container-desktop">
        <div className="space-y-lg mb-xl">
          <h2 className="text-headline mona text-text-primary uppercase">The Faces</h2>
          <p className="text-body mona text-text-muted max-w-2xl">
            Accountability is personal. These are the individuals responsible for the construction and certification of this project.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-md">
          {/* Official Card */}
          {certifier && (
            <div className="bg-card shadow-card rounded-md overflow-hidden flex flex-col md:flex-row">
              <div className="md:w-1/3 bg-gray-100 flex items-center justify-center p-8">
                <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center text-display mona text-text-muted border-2 border-border shadow-sm">
                  {getInitials(certifier.fullName)}
                </div>
              </div>
              <div className="md:w-2/3 p-md flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-label roboto text-text-muted">THE CERTIFIER</p>
                      <h3 className="text-title mona text-text-primary">{certifier.fullName}</h3>
                      <p className="text-meta roboto text-text-muted">{certifier.designationPlain ?? certifier.designation}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-xs text-label roboto ${
                      certifier.accountabilityStatus === 'charged' ? 'bg-failure-bg text-failure' : 'bg-warning-bg text-warning'
                    }`}>
                      {getAccountabilityLabel(certifier.accountabilityStatus)}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-label roboto text-text-muted">DEPARTMENT</p>
                      <p className="text-body-bold mona text-text-primary">{certifier.department}</p>
                    </div>
                    <div>
                      <p className="text-label roboto text-text-muted">RESPONSIBILITY</p>
                      <p className="text-body mona text-text-muted text-sm">{certifier.jobDescription}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contractor Card */}
          {contractor && (
            <div className="bg-card shadow-card rounded-md overflow-hidden flex flex-col md:flex-row">
              <div className="md:w-1/3 bg-gray-100 flex items-center justify-center p-8">
                <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center text-display mona text-text-muted border-2 border-border shadow-sm">
                  {getInitials(contractor.fullName)}
                </div>
              </div>
              <div className="md:w-2/3 p-md flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-label roboto text-text-muted">THE CONTRACTOR</p>
                      <h3 className="text-title mona text-text-primary">{contractor.fullName}</h3>
                      <p className="text-meta roboto text-text-muted">{contractor.department}</p>
                    </div>
                    <div className="px-3 py-1 bg-warning-bg text-warning rounded-xs text-label roboto uppercase">
                      {getAccountabilityLabel(contractor.accountabilityStatus)}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-label roboto text-text-muted">LICENSE NUMBER</p>
                      <p className="text-body-bold mona text-text-primary">{contractor.licenseNumber ?? 'Not disclosed'}</p>
                    </div>
                    <div>
                      <p className="text-label roboto text-text-muted">RESPONSIBILITY</p>
                      <p className="text-body mona text-text-muted text-sm">{contractor.jobDescription}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
