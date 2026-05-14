import React from 'react';
import { Eye, Share2, Camera } from 'lucide-react';

type EmpowermentSectionProps = {
  confirmationCount: number;
  roadId: string;
};

export default function EmpowermentSection({ confirmationCount, roadId }: EmpowermentSectionProps) {
  return (
    <section id="section6" className="py-xl bg-surface">
      <div className="max-w-4xl mx-auto px-container-mobile md:px-container-desktop text-center space-y-md">
        <h2 className="text-headline mona text-text-primary uppercase">The Truth is Yours to Hold</h2>
        <p className="text-body mona text-text-muted">
          {confirmationCount.toLocaleString('en-IN')} citizens have witnessed this road. Join them in making this record permanent.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-sm pt-md">
          <button className="flex items-center justify-center gap-xs bg-empowerment text-white text-body-bold px-6 py-4 rounded-md shadow-card hover:scale-[1.02] transition-transform">
            <Eye className="w-5 h-5" />
            I Witness
          </button>
          
          <button className="flex items-center justify-center gap-xs bg-empowerment text-white text-body-bold px-6 py-4 rounded-md shadow-card hover:scale-[1.02] transition-transform">
            <Share2 className="w-5 h-5" />
            Share Truth
          </button>
          
          <button className="flex items-center justify-center gap-xs bg-empowerment text-white text-body-bold px-6 py-4 rounded-md shadow-card hover:scale-[1.02] transition-transform">
            <Camera className="w-5 h-5" />
            Document
          </button>
        </div>
        
        <p className="text-label roboto text-text-muted pt-md">
          YOUR IDENTITY IS NOT RECORDED. ONLY YOUR WITNESS IS.
        </p>
      </div>
    </section>
  );
}
