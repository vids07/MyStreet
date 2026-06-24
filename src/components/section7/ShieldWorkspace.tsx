'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Shield, 
  ShieldAlert, 
  Check, 
  AlertCircle, 
  UploadCloud, 
  Lock, 
  Unlock, 
  Loader2, 
  ChevronDown, 
  ArrowRight, 
  Clock, 
  User, 
  FileText, 
  FileCheck
} from 'lucide-react';
import { formatLakh } from '@/lib/utils/road-display';

type ShieldWorkspaceProps = {
  roadSystemId: string;
  roadName: string;
  contractorName: string;
  milestoneAmount: number;
  hasSystemEnvKey: boolean;
};

type InspectionViolation = {
  rule: string;
  description: string;
  severity: 'CRITICAL' | 'WARNING';
};

type InspectionReport = {
  verdict: 'PASS' | 'FAIL';
  violations: InspectionViolation[];
  summary: string;
};

type OverrideData = {
  officerName: string;
  designation: string;
  reason: string;
  timestamp: string;
};

export default function ShieldWorkspace({
  roadSystemId,
  roadName,
  contractorName,
  milestoneAmount,
  hasSystemEnvKey
}: ShieldWorkspaceProps) {
  // Input states
  const [customApiKey, setCustomApiKey] = useState('');
  const [rulesText, setRulesText] = useState('');
  const [dragOver, setDragOver] = useState(false);
  
  // File Upload states
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Status/Audit states
  const [isAuditing, setIsAuditing] = useState(false);
  const [telemetryLog, setTelemetryLog] = useState<string>('');
  const [report, setReport] = useState<InspectionReport | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Panel 1: Traditional Sign-off states
  const [isManualApproved, setIsManualApproved] = useState(false);
  const [manualApprovedAt, setManualApprovedAt] = useState('');

  // Panel 3: Escrow / Action states
  const [isAutomatedApproved, setIsAutomatedApproved] = useState(false);
  const [automatedApprovedAt, setAutomatedApprovedAt] = useState('');
  const [isOverrideOpen, setIsOverrideOpen] = useState(false);
  const [overrideForm, setOverrideForm] = useState({
    name: '',
    designation: 'Junior Engineer, PWD',
    reason: ''
  });
  const [savedOverride, setSavedOverride] = useState<OverrideData | null>(null);

  // Rules Drawer state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Populate Default Uttarakhand Municipal rules on mount
  useEffect(() => {
    const defaultRules = `Analyze this road construction site photograph against interlocking paver block specifications (MoRTH and Uttarakhand municipal guidelines):

1. PAVER TILE ALIGNMENT & DEVIATION (Clause: IRC:SP:63-2018, IS:15658-2006)
- Check for uneven height/settlement, paver displacement, or tilting. Pavers must sit perfectly flush within +/- 10mm.
- Any loose, wobbling, or unjointed tiles are a failure.

2. SUB-BASE & SAND BEDDING EXPOSURE (Clause: IRC:SP:63-2018, Section 4.3)
- Check for exposed structural layers, mud, soil, or incomplete sand bedding beneath or between tiles.
- Tiles must sit securely on compacted sand. No soil or mud should bleed through joints.

3. DRAINAGE COMPLIANCE & WATER LOGGING (Clause: MoRTH Clause 309, Uttarakhand Municipal Act 1959)
- Check for blockages in side-drains, water stagnation on the paver surface, or concrete slabs blocking access to the drainage system.
- Surface must slope uniformly to side drains.

4. TRENCH RESTORATION & UTILITY PATCHING (Clause: MoRTH Clause 501 / IRC:SP:63 Section 9)
- Utility trenches cut through roads must be perfectly restored flush with surrounding tiles (+/- 10mm).
- Depressed mud trenches, loose sand fills, or mismatched tiles are strict violations.

5. NON-STANDARD SPEED BREAKERS (Clause: IRC:99-2018)
- Check if speed breakers are sudden vertical concrete strips or pipes, which are strictly illegal.
- Must be a rounded hump of max 100mm height, with black/yellow stripes and warning signs.

Output the strict verdict: "PASS" or "FAIL" with the specific clause violated.`;
    setRulesText(defaultRules);
  }, []);

  // Telemetry simulation during AI Inspection
  useEffect(() => {
    if (!isAuditing) return;

    const messages = [
      'Establishing secure handshake with RoadShield API...',
      'Reading site photograph byte array...',
      'Analyzing segment surface textures and alignment...',
      'Mapping paver contours against IRC:SP:63 alignment models...',
      'Inspecting joints for sub-base sand bleed or sand bedding exposure...',
      'Checking side drain apertures and water logging elevation slopes...',
      'Verifying utility cuts and trench restoration flush gradients...',
      'Evaluating compliance constraints with Uttarakhand Municipal guidelines...',
      'Compiling structured compliance report & AI audit verdict...'
    ];

    let count = 0;
    setTelemetryLog(messages[0]);

    const interval = setInterval(() => {
      count++;
      if (count < messages.length) {
        setTelemetryLog(messages[count]);
      } else {
        clearInterval(interval);
      }
    }, 1800);

    return () => clearInterval(interval);
  }, [isAuditing]);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      processFile(files[0]);
    }
  };

  const processFile = (file: File) => {
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setErrorMsg(null);

    const reader = new FileReader();
    reader.onload = (evt) => {
      if (evt.target?.result && typeof evt.target.result === 'string') {
        const base64Content = evt.target.result.split(',')[1];
        setImageBase64(base64Content);
      }
    };
    reader.readAsDataURL(file);
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      processFile(files[0]);
    }
  };

  // Run AI Inspection handler
  const handleRunInspection = async () => {
    setErrorMsg(null);
    setReport(null);
    setSavedOverride(null);
    setIsOverrideOpen(false);
    setIsAutomatedApproved(false);

    if (!hasSystemEnvKey && !customApiKey.trim()) {
      setErrorMsg('Authentication Missing: Please input your Gemini API Key in the credentials panel.');
      return;
    }

    if (!imageFile || !imageBase64) {
      setErrorMsg('Audit Asset Missing: Please upload a site photograph before running the inspection.');
      return;
    }

    if (!rulesText.trim()) {
      setErrorMsg('Audit Framework Missing: Rule context specifications cannot be left blank.');
      return;
    }

    setIsAuditing(true);

    try {
      const response = await fetch('/api/inspect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rulesText: rulesText.trim(),
          imageBase64: imageBase64,
          mimeType: imageFile.type,
          customApiKey: customApiKey.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze road photograph. Please verify your API Key.');
      }

      setReport(data.report);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Audit Processing Failed.');
    } finally {
      setIsAuditing(false);
    }
  };

  // Manual payment release (Left Panel)
  const handleManualApprove = () => {
    setIsManualApproved(true);
    setManualApprovedAt(new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));
  };

  // Automated payment release (Right Panel - PASS state)
  const handleAutomatedApprove = () => {
    setIsAutomatedApproved(true);
    setAutomatedApprovedAt(new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));
  };

  // Submit Override Record (Right Panel - FAIL state)
  const handleOverrideSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!overrideForm.name.trim() || !overrideForm.reason.trim()) {
      alert('Validation Error: All override logging fields (Name and Reason) are strictly required.');
      return;
    }

    setSavedOverride({
      officerName: overrideForm.name.trim(),
      designation: overrideForm.designation,
      reason: overrideForm.reason.trim(),
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    });
    setIsOverrideOpen(false);
  };

  return (
    <section id="section7" className="py-lg bg-surface scroll-mt-24">
      
      {/* CUSTOM HORIZONTAL SCANNING LASER CSS */}
      <style>{`
        @keyframes rs-scan {
          0% { top: 0%; }
          50% { top: 100%; }
          100% { top: 0%; }
        }
        .animate-rs-scan {
          animation: rs-scan 2.2s infinite ease-in-out;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-sm md:px-md space-y-md">
        
        {/* APP BRANDING HEADER */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-widest mona">
            <Shield size={14} className="text-emerald-400 animate-pulse" />
            RoadShield Quality Protocol
          </div>
          <h2 className="text-display mona text-text-primary uppercase tracking-tight">RoadShield AI Auditor</h2>
          <p className="text-body mona text-text-muted max-w-2xl mx-auto">
            सड़क निर्माण गुणवत्ता निगरानी प्रणाली — Programmatic milestone audits combining multi-modal artificial intelligence with an immutable override ledger.
          </p>
        </div>

        {/* API KEY & CREDENTIAL CONFIGURATION PANEL */}
        <div className="bg-card rounded-md border border-border shadow-card p-sm md:p-md relative overflow-hidden transition-all duration-300">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500" />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-md">
            
            <div className="space-y-sm max-w-xl">
              <h3 className="text-title mona text-text-primary flex items-center gap-xs">
                <FileCheck size={20} className="text-emerald-400" />
                Audit Authentication & Credentials
              </h3>
              <p className="text-meta mona text-text-muted leading-relaxed text-sm">
                To run the multi-modal road quality auditor, configure your credentials. Active Model: <strong className="text-emerald-400">Gemini 1.5 Flash (Free Tier Active)</strong>.
              </p>
              
              {/* API Key Status / Input */}
              <div className="space-y-1 w-full max-w-md">
                {hasSystemEnvKey ? (
                  <div className="inline-flex items-center gap-2 bg-evidence-bg border border-evidence/20 text-evidence px-4 py-2.5 rounded-sm text-xs font-bold w-full mona shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-evidence animate-pulse" />
                    🔒 Securely Authenticated via System Environment (.env.local)
                  </div>
                ) : (
                  <div className="space-y-2">
                    <input 
                      type="password"
                      placeholder="Paste your Gemini API Key here (e.g. AIzaSy...)"
                      value={customApiKey}
                      onChange={(e) => setCustomApiKey(e.target.value)}
                      className="w-full text-sm bg-surface text-text-primary placeholder:text-text-muted/60 border border-border focus:border-emerald-500 focus:outline-none px-4 py-2.5 rounded-sm font-mono tracking-wider transition-colors shadow-sm"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="flex flex-col sm:flex-row gap-sm shrink-0">
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="flex items-center justify-center gap-xs bg-slate-900 border border-border hover:border-emerald-500/40 text-text-primary text-sm font-bold px-md py-sm rounded-sm transition-all shadow-sm active:scale-[0.98]"
              >
                <FileText size={18} className="text-emerald-400" />
                <span>Configure Audit Rules</span>
              </button>

              <button
                onClick={handleRunInspection}
                disabled={isAuditing || !imagePreview}
                className="flex items-center justify-center gap-xs bg-emerald-500 hover:bg-emerald-400 disabled:bg-border disabled:text-text-muted disabled:cursor-not-allowed text-slate-950 font-extrabold text-sm px-md py-sm rounded-sm transition-all shadow-md active:scale-95"
              >
                {isAuditing ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Auditing...</span>
                  </>
                ) : (
                  <>
                    <Shield size={18} />
                    <span>Run AI Inspection</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>

        {/* TIER A: COMPARATIVE ESCROW PLAYGROUND (BEFORE VS AFTER) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-sm md:gap-md">

          {/* PANEL 1: CONVENTIONAL MANUAL SYSTEM */}
          <div className="bg-card rounded-md border border-border shadow-card p-sm flex flex-col justify-between min-h-[480px] transition-all">
            <div className="space-y-sm">
              <div className="pb-sm border-b border-border">
                <div className="text-label roboto text-text-muted uppercase tracking-widest mb-1">Panel 01 // Conventional Release</div>
                <h3 className="text-title mona text-text-primary flex items-center gap-xs">
                  Paper Sign-off Chain
                </h3>
                <p className="text-[11px] roboto text-text-muted leading-normal mt-1">
                  Unverified, paper-based payment clearance. Release relies entirely on a manual inspector sign-off with no permanent, auditable visual evidence.
                </p>
              </div>

              {/* Contractor Metadata Specifications */}
              <div className="space-y-xs bg-surface/50 border border-border/60 p-sm rounded-sm">
                <div className="flex justify-between items-center py-1.5 border-b border-border border-dashed text-xs">
                  <span className="font-bold text-text-muted uppercase roboto">Contractor</span>
                  <span className="font-black text-text-primary mona">{contractorName}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-border border-dashed text-xs">
                  <span className="font-bold text-text-muted uppercase roboto">Road Segment</span>
                  <span className="font-black text-text-primary mona truncate max-w-[160px]" title={roadName}>{roadName}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-border border-dashed text-xs">
                  <span className="font-bold text-text-muted uppercase roboto">Payment Stage</span>
                  <span className="font-black text-text-primary mona">Milestone 03 Completion</span>
                </div>
                <div className="flex justify-between items-center py-1.5 text-xs">
                  <span className="font-bold text-text-muted uppercase roboto">Milestone Amount</span>
                  <span className="font-black text-failure mona text-sm">{formatLakh(milestoneAmount)}</span>
                </div>
              </div>

              <div className="text-xs text-text-muted bg-yellow-500/5 border border-yellow-500/10 p-sm rounded-sm leading-relaxed font-bold italic text-center mona">
                "The current standard in road construction. A signature is signed, a ledger row is created, and public money is released. Failed segments have no trace."
              </div>
            </div>

            {/* Manual Sign-off Action */}
            <div className="pt-md space-y-xs">
              {isManualApproved ? (
                <div className="bg-evidence-bg border border-evidence/20 text-evidence rounded-sm p-sm text-center space-y-1 animate-fadeIn shadow-sm">
                  <div className="text-xs font-black mona flex items-center justify-center gap-1 uppercase">
                    <Check size={14} className="stroke-[3]" />
                    Milestone Approved Manually
                  </div>
                  <div className="text-[10px] roboto font-bold text-text-muted">
                    Cleared on: {manualApprovedAt}
                  </div>
                  <div className="text-[9px] roboto text-text-muted/85 uppercase tracking-wider">
                    Ledger Written: NO DIGITAL QUALITY AUDIT ATTACHED
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleManualApprove}
                  className="w-full text-xs uppercase tracking-wider font-black mona py-3 bg-text-primary hover:bg-black text-white rounded-sm transition-all shadow-md active:scale-95"
                >
                  Approve & Release Payment (Manual Sign-off)
                </button>
              )}
              <p className="text-[10px] roboto text-center text-text-muted/70">
                Representative of status quo. Releases budget immediately.
              </p>
            </div>
          </div>

          {/* PANEL 3: DECISION ESCROW & AUDIT LOGS */}
          <div className="bg-card rounded-md border border-emerald-500/15 shadow-[0_10px_40px_rgba(16,185,129,0.03)] p-sm flex flex-col justify-between min-h-[480px] transition-all">
            <div className="space-y-sm flex-1 flex flex-col">
              
              <div className="pb-sm border-b border-border">
                <div className="text-label roboto text-emerald-400 uppercase tracking-widest mb-1">Panel 03 // Algorithmic Escrow</div>
                <h3 className="text-title mona text-emerald-400 flex items-center gap-xs">
                  <Lock size={18} />
                  Escrow Payment Gate
                </h3>
                <p className="text-[11px] roboto text-text-muted leading-normal mt-1">
                  Automated decision protocol. Public finances are programmatically locked if construction violations exist. Overriding the lock requires permanent accountability logs.
                </p>
              </div>

              {/* DECISION LOCK HUB */}
              <div className="flex-1 flex flex-col justify-center">

                {/* 1. AWAITING AUDIT STATE */}
                {!report && (
                  <div className="text-center space-y-sm py-8 border border-border border-dashed rounded-sm bg-surface/50">
                    <div className="relative inline-flex items-center justify-center bg-slate-900 border border-border text-emerald-400 w-10 h-10 rounded-full shadow-md">
                      <Lock size={18} />
                    </div>
                    <div className="space-y-1 px-4">
                      <div className="text-xs font-black mona text-text-primary uppercase tracking-wider">Awaiting Audit Verdict</div>
                      <div className="text-[10px] roboto text-text-muted leading-relaxed">
                        Milestone finances are held in compliance escrow. Please run the AI inspector in Tier B to evaluate visual pavement compliance.
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. PASS STATE - UNLOCKED GATE */}
                {report && report.verdict === 'PASS' && (
                  <div className="space-y-sm py-4 h-full flex flex-col justify-between">
                    <div className="text-center space-y-sm border border-evidence/20 rounded-sm bg-evidence-bg/40 p-sm shadow-sm">
                      <div className="relative inline-flex items-center justify-center bg-evidence text-white w-10 h-10 rounded-full shadow-md">
                        <Unlock size={18} />
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs font-black mona text-evidence uppercase tracking-wider">Payment Escrow Cleared</div>
                        <div className="text-[10px] roboto text-text-muted leading-relaxed">
                          AI inspection verdict is fully compliant. Digital compliance verified with India road standards. Funds are cleared for release.
                        </div>
                      </div>
                    </div>

                    <div className="space-y-xs">
                      {isAutomatedApproved ? (
                        <div className="bg-evidence-bg border border-evidence/20 text-evidence rounded-sm p-sm text-center space-y-1 shadow-sm animate-fadeIn">
                          <div className="text-xs font-black mona flex items-center justify-center gap-1 uppercase">
                            <Check size={14} className="stroke-[3]" />
                            Automated Funds Disbursed
                          </div>
                          <div className="text-[9px] roboto font-bold text-text-muted">
                            Approved on: {automatedApprovedAt}
                          </div>
                          <div className="text-[9px] roboto text-text-muted/85 uppercase tracking-wider leading-relaxed">
                            Audit Ledger Attached // SECURE RELEASE APPROVED BY PROTOCOL
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={handleAutomatedApprove}
                          className="w-full text-xs font-black mona uppercase tracking-wider py-3 bg-evidence hover:bg-evidence/95 text-white rounded-sm shadow-md transition-all active:scale-95"
                        >
                          Disburse Milestone Funds (Automated)
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* 3. FAIL STATE - LOCKED AUTOMATED ESCROW */}
                {report && report.verdict === 'FAIL' && (
                  <div className="space-y-sm py-2 h-full flex flex-col justify-between">
                    
                    {/* Payment Locked Banner */}
                    <div className="space-y-1 text-center border border-failure/20 rounded-sm bg-failure-bg/40 p-2 shadow-xs">
                      <div className="relative inline-flex items-center justify-center bg-failure text-white w-7 h-7 rounded-full shadow-sm mb-1">
                        <Lock size={14} />
                      </div>
                      <div className="text-xs font-black mona text-failure uppercase tracking-wider">Payment Locked 🔒</div>
                      <p className="text-[9px] roboto text-failure font-bold leading-normal">
                        Quality violations detected. Automated milestone release suspended.
                      </p>
                    </div>

                    {/* ACTIONS: LOG OVERRIDE OR SHOW PERMANENT OVERRIDE DETAIL */}
                    <div className="flex-1 flex flex-col justify-end">
                      {!savedOverride ? (
                        <div className="space-y-xs mt-xs">
                          
                          {/* Accordion Toggle Header */}
                          <button
                            onClick={() => setIsOverrideOpen(!isOverrideOpen)}
                            type="button"
                            className="w-full text-[10px] uppercase font-black tracking-widest roboto border border-border py-2.5 px-3 rounded-sm flex items-center justify-between bg-surface text-text-primary hover:bg-white transition-colors"
                          >
                            <span>Administrative Override Request</span>
                            <ChevronDown size={14} className={`text-text-muted transition-transform ${isOverrideOpen ? 'rotate-180' : ''}`} />
                          </button>

                          {/* Accordion Body */}
                          {isOverrideOpen && (
                            <form onSubmit={handleOverrideSubmit} className="space-y-2 bg-surface/50 border border-border border-t-0 p-3 rounded-b-sm animate-fadeIn text-left">
                              
                              <div className="grid grid-cols-2 gap-2 text-[10px]">
                                <div className="space-y-0.5">
                                  <label className="text-[9px] font-bold roboto text-text-muted uppercase">Authorized Officer</label>
                                  <select 
                                    value={overrideForm.name}
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      setOverrideForm({
                                        ...overrideForm,
                                        name: val,
                                        designation: val === 'Anand Singh Mishrawan' ? 'Executive Engineer, PWD' : 'Junior Engineer, PWD'
                                      });
                                    }}
                                    className="w-full bg-white text-text-primary border border-border p-1.5 rounded-sm focus:border-failure focus:outline-none"
                                    required
                                  >
                                    <option value="">Select official...</option>
                                    <option value="Anand Singh Mishrawan">Anand Singh Mishrawan (EE)</option>
                                    <option value="Prem Kumar Sharma">Prem Kumar Sharma (JE)</option>
                                    <option value="Administrative Desk">Administrative Desk</option>
                                  </select>
                                </div>

                                <div className="space-y-0.5">
                                  <label className="text-[9px] font-bold roboto text-text-muted uppercase">Designation</label>
                                  <input 
                                    type="text"
                                    value={overrideForm.designation}
                                    onChange={(e) => setOverrideForm({ ...overrideForm, designation: e.target.value })}
                                    className="w-full bg-white text-text-primary border border-border p-1.5 rounded-sm focus:border-failure focus:outline-none"
                                    placeholder="Officer Designation"
                                    required
                                  />
                                </div>
                              </div>

                              <div className="space-y-0.5 text-[10px]">
                                <label className="text-[9px] font-bold roboto text-text-muted uppercase">Compelling Override Justification</label>
                                <textarea 
                                  value={overrideForm.reason}
                                  onChange={(e) => setOverrideForm({ ...overrideForm, reason: e.target.value })}
                                  placeholder="Provide the engineering, geological, or administrative reason why this milestone payment must be released despite AI compliance failure..."
                                  className="w-full bg-white text-text-primary border border-border p-2 rounded-sm focus:border-failure focus:outline-none h-12 leading-relaxed text-xs"
                                  required
                                />
                              </div>

                              <button
                                type="submit"
                                className="w-full py-2 bg-failure hover:bg-failure/90 text-white font-black mona text-[9px] uppercase tracking-wider rounded-sm shadow-sm transition-transform active:scale-95"
                              >
                                Commit Authorized Override Record
                              </button>
                            </form>
                          )}

                        </div>
                      ) : (
                        
                        /* PERMANENT CRITICAL AUDIT LEDGER CARD */
                        <div className="bg-failure-bg border border-failure/35 p-3 rounded-sm relative overflow-hidden text-left space-y-1.5 shadow-md animate-fadeIn mt-xs">
                          <div className="absolute top-0 right-0 text-[32px] font-extrabold text-failure/5 select-none mona tracking-tighter leading-none pr-1 pointer-events-none">
                            LEDGER
                          </div>
                          
                          <div className="flex items-center gap-xs font-black text-[10px] text-failure uppercase tracking-widest mona pb-1 border-b border-failure/20">
                            <AlertCircle size={14} className="stroke-[3]" />
                            SECURE OVERRIDE COMMITTED
                          </div>

                          <div className="space-y-1 text-[10px] roboto text-text-muted">
                            <div className="flex justify-between items-center py-0.5 border-b border-border/30 border-dashed">
                              <span className="font-bold text-text-muted uppercase text-[9px]">Committed By</span>
                              <span className="font-black text-text-primary mona">{savedOverride.officerName}</span>
                            </div>
                            <div className="flex justify-between items-center py-0.5 border-b border-border/30 border-dashed">
                              <span className="font-bold text-text-muted uppercase text-[9px]">Officer Title</span>
                              <span className="font-bold text-text-primary mona">{savedOverride.designation}</span>
                            </div>
                            <div className="flex justify-between items-center py-0.5 border-b border-border/30 border-dashed">
                              <span className="font-bold text-text-muted uppercase text-[9px]">Audit Time</span>
                              <span className="font-mono font-bold text-text-primary">{savedOverride.timestamp}</span>
                            </div>
                            <div className="space-y-0.5 pt-1">
                              <div className="font-bold text-text-muted uppercase text-[9px]">Committed Justification</div>
                              <p className="bg-white border border-failure/10 p-1.5 rounded-sm italic leading-relaxed text-text-primary font-medium text-[10px]">
                                "{savedOverride.reason}"
                              </p>
                            </div>
                          </div>

                          <p className="text-[8px] text-failure font-black uppercase text-center tracking-widest leading-relaxed pt-1.5 border-t border-failure/20 mona">
                            ⚠️ This record is permanently bound in administrative public audit logs.
                          </p>
                        </div>
                      )}
                    </div>

                  </div>
                )}

              </div>

            </div>

            <div className="pt-sm border-t border-border mt-sm text-center">
              <span className="text-[10px] roboto text-text-muted/80 leading-normal">
                Secured via cryptographic transaction locks.
              </span>
            </div>
          </div>

        </div>

        {/* TIER B: NEURAL AUDIT INSPECTION CENTER (THE DYNAMIC STAGE) */}
        <div id="panel2" className="bg-card rounded-md border border-border shadow-card p-sm md:p-md relative overflow-hidden transition-all duration-300">
          <div className="pb-sm border-b border-border mb-md">
            <div className="text-label roboto text-emerald-400 uppercase tracking-widest mb-1">Tier B // Active Quality Verification Laboratory</div>
            <h3 className="text-title mona text-text-primary flex items-center gap-xs">
              <Shield className="text-emerald-400" size={20} />
              Neural Audit Inspection Center
            </h3>
            <p className="text-[11px] roboto text-text-muted leading-normal mt-1">
              Real-time physical compliance evaluation of site photographs. Matches visual patterns against MoRTH and IRC construction standards.
            </p>
          </div>

          <div className="min-h-[220px] flex flex-col justify-center">
            
            {/* 1. INITIAL NO-PHOTO / BUFFER EMPTY STATE */}
            {!imagePreview ? (
              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`flex flex-col items-center justify-center text-center cursor-pointer p-lg border-2 border-dashed rounded-sm transition-all min-h-[250px] ${
                  dragOver 
                    ? 'border-emerald-500 bg-emerald-500/5' 
                    : 'border-border hover:border-emerald-500/60 hover:bg-surface/60'
                }`}
              >
                <UploadCloud size={48} className={`mb-sm transition-colors ${dragOver ? 'text-emerald-400' : 'text-text-muted/60'}`} />
                <span className="text-sm font-black mona text-text-primary uppercase tracking-wider">Drag & Drop Site Photo</span>
                <span className="text-xs roboto text-text-muted mt-2 leading-normal max-w-sm">
                  Upload a photograph of the completed construction segment (JPEG, PNG). We'll inspect interlocking paver alignment, drainage, and utility restoration.
                </span>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/*" 
                  className="hidden" 
                />
              </div>
            ) : (
              
              /* 2. SPLIT LAYOUT REPRESENTATION (IMAGE UPLOADED / PROCESSED) */
              <div className="grid grid-cols-1 md:grid-cols-12 gap-md md:gap-lg animate-fadeIn text-left">
                
                {/* Photo Viewer & Verdict Left Column (5 of 12) */}
                <div className="md:col-span-5 flex flex-col gap-sm">
                  <div className="relative border border-border rounded-sm overflow-hidden bg-black shadow-sm aspect-video md:aspect-[4/3] max-h-[350px]">
                    <img 
                      src={imagePreview} 
                      alt="Inspection Site Milestone Preview" 
                      className="w-full h-full object-contain mx-auto"
                    />
                    
                    {/* Scanning Laser Line Overlay */}
                    <div className={`absolute left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#10b981,0_0_4px_#10b981] pointer-events-none transition-opacity duration-300 ${
                      isAuditing ? 'opacity-100 animate-rs-scan' : 'opacity-0'
                    }`} />
                  </div>

                  {/* Verdict Badge below image */}
                  {report && (
                    <div className={`flex items-center justify-center gap-xs font-black text-sm uppercase py-2.5 px-4 rounded-sm tracking-widest border shadow-sm animate-fadeIn ${
                      report.verdict === 'PASS'
                        ? 'bg-evidence-bg border-evidence/20 text-evidence'
                        : 'bg-failure-bg border-failure/20 text-failure'
                    }`}>
                      {report.verdict === 'PASS' ? <Check size={16} className="stroke-[3]" /> : <ShieldAlert size={16} />}
                      Milestone Verdict: {report.verdict}
                    </div>
                  )}
                  
                  {/* Remove Button if not active auditing */}
                  {!isAuditing && (
                    <button 
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview(null);
                        setImageBase64(null);
                        setReport(null);
                        setErrorMsg(null);
                        setIsAutomatedApproved(false);
                        setSavedOverride(null);
                      }}
                      className="w-full bg-slate-900 hover:bg-slate-800 border border-border text-text-primary text-[10px] font-bold uppercase py-2 rounded-sm tracking-wider transition-colors active:scale-[0.98]"
                    >
                      Clear / Upload Different Photo
                    </button>
                  )}
                </div>

                {/* Compliance Logs & Checklist Right Column (7 of 12) */}
                <div className="md:col-span-7 flex flex-col justify-between min-h-[250px] bg-surface/50 border border-border p-sm md:p-md rounded-sm">
                  <div className="space-y-sm flex-1 flex flex-col">
                    <div className="text-[10px] roboto text-emerald-400 font-bold uppercase tracking-widest border-b border-border pb-xs flex items-center gap-xs">
                      <FileText size={12} />
                      Neural Compliance Audit Log
                    </div>

                    {/* Content Box */}
                    <div className="flex-1 flex flex-col justify-center min-h-[180px]">
                      
                      {/* Loading Telemetry Feed */}
                      {isAuditing && (
                        <div className="space-y-sm text-center py-4 animate-pulse">
                          <Loader2 size={24} className="mx-auto text-emerald-400 animate-spin" />
                          <div className="text-xs font-black mona text-text-primary uppercase tracking-widest">AI Audit Processing...</div>
                          <div className="font-mono text-[10px] text-text-muted bg-slate-900 border border-border/50 p-2.5 rounded-sm h-12 overflow-hidden flex items-center justify-center leading-normal">
                            {telemetryLog}
                          </div>
                        </div>
                      )}

                      {/* Error Display */}
                      {errorMsg && (
                        <div className="text-center space-y-2 py-4">
                          <AlertCircle size={28} className="mx-auto text-failure" />
                          <div className="text-xs font-black mona text-failure uppercase tracking-wider">Audit Terminated</div>
                          <p className="text-[10px] roboto text-text-muted leading-relaxed px-2">
                            {errorMsg}
                          </p>
                        </div>
                      )}

                      {/* Idle loaded state */}
                      {!isAuditing && !report && !errorMsg && (
                        <div className="text-center space-y-sm py-4">
                          <Shield size={24} className="mx-auto text-text-muted/30" />
                          <div className="text-xs font-black mona text-text-primary uppercase tracking-wider">Asset Buffered & Secure</div>
                          <p className="text-[10px] roboto text-text-muted max-w-xs mx-auto leading-normal">
                            Click "Run AI Inspection" above to trigger multimodal compliance testing against MoRTH guidelines.
                          </p>
                        </div>
                      )}

                      {/* Compliant Report Render */}
                      {report && (
                        <div className="space-y-sm flex-1 flex flex-col text-left justify-between h-full">
                          
                          {/* Checklist Display */}
                          <div className="flex-1 max-h-[160px] overflow-y-auto space-y-xs pr-1">
                            {report.verdict === 'FAIL' && report.violations && report.violations.length > 0 ? (
                              report.violations.map((v, idx) => (
                                <div key={idx} className="bg-failure-bg border border-failure/10 border-l-2 border-l-failure p-2 rounded-sm space-y-1 shadow-sm text-xs animate-fadeIn">
                                  <div className="flex justify-between items-start gap-xs">
                                    <span className="font-black text-text-primary mona truncate max-w-[200px]">{v.rule}</span>
                                    <span className={`text-[8px] roboto font-black px-1.5 py-0.5 rounded-sm uppercase tracking-wider ${
                                      v.severity === 'CRITICAL' ? 'bg-failure text-white' : 'bg-warning-bg border border-warning/10 text-warning'
                                    }`}>
                                      {v.severity}
                                    </span>
                                  </div>
                                  <p className="text-text-muted roboto text-[10px] leading-relaxed">{v.description}</p>
                                </div>
                              ))
                            ) : (
                              <div className="flex flex-col items-center justify-center py-6 text-evidence space-y-1 animate-fadeIn">
                                <Check size={24} className="stroke-[3] text-evidence" />
                                <div className="text-xs font-black mona uppercase tracking-wider">All Specifications Satisfied</div>
                                <p className="text-[10px] roboto text-text-muted text-center max-w-xs">
                                  Digital verification found zero structural defects, height settlement, or drainage interference.
                                </p>
                              </div>
                            )}
                          </div>

                          {/* Summary Paragraph */}
                          <div className="bg-slate-900 border border-border p-2.5 rounded-sm text-[10px] roboto text-text-muted italic leading-normal">
                            {report.summary}
                          </div>

                        </div>
                      )}

                    </div>

                  </div>
                </div>

              </div>
            )}

          </div>
        </div>

        {/* METADATA SYSTEM FOOTER */}
        <div className="text-center pt-sm text-text-muted text-[10px] roboto tracking-widest uppercase">
          RoadShield Verification Protocol v1.5.0 // Securing Public Infrastructure via Algorithmic Accountability
        </div>

      </div>

      {/* AUDIT RULES DRAWER OVERLAY */}
      <div 
        className={`fixed inset-0 bg-black/65 backdrop-blur-sm z-[999] transition-opacity duration-300 ${
          isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`} 
        onClick={() => setIsDrawerOpen(false)}
      />
      
      {/* AUDIT RULES SLIDE-OUT DRAWER */}
      <div 
        className={`fixed top-0 right-0 h-screen w-[480px] max-w-full bg-slate-950/98 backdrop-blur-xl border-l border-white/10 shadow-[-10px_0_40px_rgba(0,0,0,0.7)] z-[1000] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col p-8 ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center pb-sm border-b border-white/10 mb-md">
          <h2 className="text-sm font-black text-text-primary uppercase tracking-wider flex items-center gap-2">
            <FileText size={18} className="text-emerald-400" />
            Configure Audit Rules
          </h2>
          <button 
            onClick={() => setIsDrawerOpen(false)}
            className="text-text-muted hover:text-white transition-colors text-2xl leading-none px-2 py-1"
          >
            &times;
          </button>
        </div>

        <div className="flex flex-col gap-sm flex-1 overflow-y-auto pr-1">
          <p className="text-[11px] text-text-muted leading-relaxed">
            Configure specific MoRTH/IRC clauses or custom engineering guidelines to enforce during physical quality verification.
          </p>
          
          <div className="flex-1 flex flex-col min-h-[300px]">
            <textarea 
              value={rulesText}
              onChange={(e) => setRulesText(e.target.value)}
              className="flex-1 w-full bg-black/40 text-xs font-mono text-text-primary border border-white/10 p-3 rounded-sm leading-relaxed focus:border-emerald-500 focus:outline-none resize-none"
            />
          </div>

          <button
            onClick={() => setIsDrawerOpen(false)}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-sm shadow-sm transition-all"
          >
            Apply & Save Rules
          </button>
        </div>
      </div>

    </section>
  );
}
