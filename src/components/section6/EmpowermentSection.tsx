'use client';

import { useState } from 'react';
import { Eye, Share2, Camera, Check } from 'lucide-react';

type EmpowermentSectionProps = {
  confirmationCount: number;
  roadSystemId: string;
  streetName: string;
};

type WitnessState = 'idle' | 'loading' | 'done' | 'error';
type ShareState = 'idle' | 'copied' | 'shared';

function getDeviceFingerprint(): string {
  const parts = [
    navigator.userAgent,
    String(screen.width),
    String(screen.height),
    String(screen.colorDepth),
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    navigator.language,
  ].join('|');
  let h = 0;
  for (let i = 0; i < parts.length; i++) {
    h = (Math.imul(31, h) + parts.charCodeAt(i)) | 0;
  }
  return Math.abs(h).toString(36);
}

export default function EmpowermentSection({
  confirmationCount,
  roadSystemId,
  streetName,
}: EmpowermentSectionProps) {
  const [witnessState, setWitnessState] = useState<WitnessState>('idle');
  const [liveCount, setLiveCount] = useState(confirmationCount);
  const [shareState, setShareState] = useState<ShareState>('idle');

  async function handleWitness() {
    if (witnessState !== 'idle' && witnessState !== 'error') return;
    setWitnessState('loading');
    try {
      const res = await fetch(`/api/road/${roadSystemId}/witness`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deviceFingerprint: getDeviceFingerprint() }),
      });
      const json = (await res.json()) as { success: boolean; alreadyConfirmed?: boolean };
      if (!res.ok) throw new Error('Failed');
      if (json.success && !json.alreadyConfirmed) {
        setLiveCount(c => c + 1);
      }
      setWitnessState('done');
    } catch {
      setWitnessState('error');
    }
  }

  async function handleShare() {
    const url = window.location.href;
    const text = `This road — ${streetName} — was built with public money and failed within months. Every rupee is on record. See who signed off.`;
    try {
      if (typeof navigator.share === 'function') {
        await navigator.share({ title: 'MyStreet — Public Record', text, url });
        setShareState('shared');
      } else {
        await navigator.clipboard.writeText(url);
        setShareState('copied');
      }
      setTimeout(() => setShareState('idle'), 3000);
    } catch {
      // user cancelled — no error shown
    }
  }

  function handleDocument() {
    const url = window.location.href;
    const msg = encodeURIComponent(
      `I want to document a road issue.\n\nRoad: ${streetName}\nRecord: ${url}\n\nPlease guide me on next steps.`,
    );
    window.open(`https://wa.me/?text=${msg}`, '_blank', 'noopener,noreferrer');
  }

  const witnessLabel =
    witnessState === 'loading' ? 'Witnessing…' :
    witnessState === 'done'    ? 'Witnessed'   :
    witnessState === 'error'   ? 'Try again'   :
    'I Witness';

  const shareLabel =
    shareState === 'copied' ? 'Link Copied' :
    shareState === 'shared' ? 'Shared'      :
    'Share Truth';

  const witnessDisabled = witnessState === 'loading' || witnessState === 'done';

  return (
    <section id="section6" className="py-xl bg-surface scroll-mt-24">
      <div className="max-w-4xl mx-auto px-sm md:px-md text-center space-y-md">
        <h2 className="text-headline mona text-text-primary">The Truth is Yours to Hold</h2>
        <p className="text-body mona text-text-muted">
          {liveCount.toLocaleString('en-IN')} citizens have witnessed this road. Join them in making this record permanent.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-sm pt-md">
          <button
            onClick={handleWitness}
            disabled={witnessDisabled}
            className="flex items-center justify-center gap-xs bg-empowerment text-empowerment-text text-body-bold mona px-md py-sm rounded-sm shadow-card hover:scale-[1.02] transition-transform disabled:opacity-70 disabled:cursor-default disabled:hover:scale-100"
          >
            {witnessState === 'done'
              ? <Check size={20} strokeWidth={1.5} />
              : <Eye size={20} strokeWidth={1.5} />
            }
            {witnessLabel}
          </button>

          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-xs bg-empowerment text-empowerment-text text-body-bold mona px-md py-sm rounded-sm shadow-card hover:scale-[1.02] transition-transform"
          >
            <Share2 size={20} strokeWidth={1.5} />
            {shareLabel}
          </button>

          <button
            onClick={handleDocument}
            className="flex items-center justify-center gap-xs bg-empowerment text-empowerment-text text-body-bold mona px-md py-sm rounded-sm shadow-card hover:scale-[1.02] transition-transform"
          >
            <Camera size={20} strokeWidth={1.5} />
            Document
          </button>
        </div>

        <p className="text-label roboto text-text-muted uppercase pt-md">
          Your identity is not recorded. Only your witness is.
        </p>
      </div>
    </section>
  );
}
