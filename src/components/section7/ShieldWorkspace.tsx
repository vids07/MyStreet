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
  AlertTriangle,
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
      setErrorMsg('Authentication Missing: Please input your Gemini API Key in the panel uploader.');
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
      <div className="max-w-7xl mx-auto px-sm md:px-md space-y-md">
        
        {/* APP BRANDING HEADER */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 bg-failure/10 border border-failure/20 text-failure font-bold px-3 py-1 rounded-full text-xs uppercase tracking-widest mona">
            <Shield size={14} className="text-failure" />
            RoadShield Quality Protocol
          </div>
          <h2 className="text-display mona text-text-primary uppercase tracking-tight">RoadShield AI Auditor</h2>
          <p className="text-body mona text-text-muted max-w-2xl mx-auto">
            सड़क निर्माण गुणवत्ता निगरानी प्रणाली — Programmatic milestone audits combining multi-modal artificial intelligence with an immutable override ledger.
          </p>
        </div>

        {/* API KEY & CREDENTIAL CONFIGURATION PANEL */}
        <div className="bg-card rounded-md border border-border shadow-card p-sm md:p-md relative overflow-hidden transition-all duration-300">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-failure" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-sm items-start">
            
            <div className="space-y-sm">
              <h3 className="text-title mona text-text-primary flex items-center gap-xs">
                <FileCheck size={20} className="text-failure" />
                Audit Framework & Key Credentials
              </h3>
              <p className="text-meta mona text-text-muted leading-relaxed text-sm">
                To run the multi-modal road quality inspector, configure your credentials. The platform will call a secure, key-shielded server API route to protect secret values.
              </p>
              
              {/* API Key Status / Input */}
              <div className="space-y-1">
                <label className="text-label roboto text-text-muted uppercase">Authentication Status</label>
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
                      className="w-full text-sm bg-surface text-text-primary placeholder:text-text-muted/60 border border-border focus:border-failure focus:outline-none px-4 py-2.5 rounded-sm font-mono tracking-wider transition-colors shadow-sm"
                    />
                    <p className="text-[10px] roboto text-text-muted/80 leading-normal">
                      No key in server environment. Paste a temporary key above for local auditing. Your key is processed entirely on the server and is never exposed.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Target Specifications Area */}
            <div className="space-y-xs">
              <label className="text-label roboto text-text-muted uppercase">Active Target Inspection Rules</label>
              <textarea 
                value={rulesText}
                onChange={(e) => setRulesText(e.target.value)}
                className="w-full text-xs font-mono bg-surface text-text-primary border border-border focus:border-failure focus:outline-none p-3 rounded-sm leading-relaxed min-h-[160px] shadow-sm"
                placeholder="Enter rules context here..."
              />
            </div>

          </div>
        </div>

        {/* THREE PANEL GRID SYSTEM */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-sm md:gap-md">

          {/* PANEL 1: CONVENTIONAL MANUAL SYSTEM */}
          <div className="bg-card rounded-md border border-border shadow-card p-sm flex flex-col justify-between min-h-[500px] transition-all">
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


          {/* PANEL 2: ROADSHIELD AI MULTIMODAL AUDITOR */}
          <div className="bg-card rounded-md border border-border shadow-card p-sm flex flex-col justify-between min-h-[500px] relative transition-all duration-300">
            
            <div className="space-y-sm flex-1 flex flex-col">
              <div className="pb-sm border-b border-border">
                <div className="text-label roboto text-text-muted uppercase tracking-widest mb-1">Panel 02 // Multimodal Quality Audit</div>
                <h3 className="text-title mona text-text-primary flex items-center gap-xs">
                  AI Compliance Engine
                </h3>
                <p className="text-[11px] roboto text-text-muted leading-normal mt-1">
                  Upload a photo of the completed interlocking paver construction milestone to audit texture, alignment, and drainage interfaces against Indian road codes.
                </p>
              </div>

              {/* UPLOADER & PREVIEW HUB */}
              <div className="flex-1 flex flex-col justify-center min-h-[220px]">
                {!imagePreview ? (
                  <div 
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`flex-1 border-2 border-dashed rounded-sm p-sm flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                      dragOver 
                        ? 'border-failure bg-failure/5' 
                        : 'border-border hover:border-failure/60 hover:bg-surface/60'
                    }`}
                  >
                    <UploadCloud size={32} className={`mb-xs transition-colors ${dragOver ? 'text-failure' : 'text-text-muted/60'}`} />
                    <span className="text-xs font-black mona text-text-primary uppercase tracking-wider">Drag & Drop Site Photo</span>
                    <span className="text-[10px] roboto text-text-muted mt-1 leading-normal">or click to browse local files (JPEG, PNG)</span>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileChange} 
                      accept="image/*" 
                      className="hidden" 
                    />
                  </div>
                ) : (
                  <div className="space-y-xs animate-fadeIn flex flex-col h-full">
                    {/* Visual Preview */}
                    <div className="relative border border-border rounded-sm overflow-hidden h-[120px] bg-black shadow-sm group">
                      <img 
                        src={imagePreview} 
                        alt="Inspection Site Milestone Preview" 
                        className="w-full h-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                      />
                      <button 
                        onClick={() => {
                          setImageFile(null);
                          setImagePreview(null);
                          setImageBase64(null);
                        }}
                        className="absolute bottom-2 right-2 bg-black/80 hover:bg-black border border-white/25 text-white text-[9px] font-bold uppercase py-1 px-2.5 rounded-xs tracking-wider transition-colors"
                      >
                        Remove
                      </button>
                    </div>

                    {/* INTERACTIVE INSPECTION SCREEN */}
                    <div className="flex-1 flex flex-col justify-center bg-surface border border-border rounded-sm p-sm overflow-hidden relative">
                      
                      {/* 1. IDLE STATE */}
                      {!isAuditing && !report && !errorMsg && (
                        <div className="text-center space-y-1 py-4">
                          <Shield size={20} className="mx-auto text-text-muted/40" />
                          <div className="text-xs font-black mona text-text-primary uppercase tracking-wider">Asset Loaded Successfully</div>
                          <div className="text-[10px] roboto text-text-muted">Click "Run AI Inspection" below to trigger the multimodal audit.</div>
                        </div>
                      )}

                      {/* 2. LOADING STATE */}
                      {isAuditing && (
                        <div className="space-y-xs text-center py-4 animate-pulse">
                          <Loader2 size={24} className="mx-auto text-failure animate-spin" />
                          <div className="text-xs font-black mona text-text-primary uppercase tracking-widest">AI Inspection in Progress</div>
                          <div className="font-mono text-[9px] text-text-muted bg-white border border-border p-2 rounded-xs h-10 overflow-hidden flex items-center justify-center leading-normal">
                            {telemetryLog}
                          </div>
                        </div>
                      )}

                      {/* 3. ERROR STATE */}
                      {errorMsg && (
                        <div className="text-center space-y-2 py-4">
                          <AlertTriangle size={24} className="mx-auto text-failure" />
                          <div className="text-xs font-black mona text-failure uppercase tracking-wider">Inspection Interrupted</div>
                          <div className="text-[10px] roboto text-text-muted leading-relaxed px-2">
                            {errorMsg}
                          </div>
                        </div>
                      )}

                      {/* 4. SUCCESS VERDICT AND REPORT PANELS */}
                      {report && (
                        <div className="space-y-xs h-full flex flex-col text-left">
                          
                          {/* Giant Verdict Badge */}
                          <div className={`flex items-center justify-center gap-xs font-black text-sm uppercase py-1 px-4 rounded-sm tracking-widest border shadow-sm ${
                            report.verdict === 'PASS'
                              ? 'bg-evidence-bg border-evidence/20 text-evidence'
                              : 'bg-failure-bg border-failure/20 text-failure'
                          }`}>
                            {report.verdict === 'PASS' ? <Check size={14} className="stroke-[3]" /> : <ShieldAlert size={14} />}
                            Milestone Verdict: {report.verdict}
                          </div>

                          {/* Actionable Violations Feed */}
                          <div className="flex-1 max-h-[120px] overflow-y-auto space-y-xs pr-1">
                            {report.verdict === 'FAIL' && report.violations && report.violations.length > 0 ? (
                              report.violations.map((v, idx) => (
                                <div key={idx} className="bg-failure-bg border border-failure/10 border-l-2 border-l-failure p-2 rounded-xs space-y-0.5 shadow-sm text-[10px]">
                                  <div className="flex justify-between items-start gap-xs">
                                    <span className="font-black text-text-primary mona truncate max-w-[170px]">{v.rule}</span>
                                    <span className={`text-[8px] roboto font-black px-1 py-0.2 rounded-xs uppercase ${
                                      v.severity === 'CRITICAL' ? 'bg-failure text-white' : 'bg-warning-bg border border-warning/10 text-warning'
                                    }`}>
                                      {v.severity}
                                    </span>
                                  </div>
                                  <p className="text-text-muted roboto leading-relaxed">{v.description}</p>
                                </div>
                              ))
                            ) : (
                              <div className="flex flex-col items-center justify-center py-6 text-evidence space-y-1">
                                <Check size={18} className="stroke-[3]" />
                                <div className="text-xs font-black mona uppercase">All Rules Compliant</div>
                                <div className="text-[9px] roboto text-text-muted">Digital image analysis found zero construct violations.</div>
                              </div>
                            )}
                          </div>

                          {/* Short italicized brief */}
                          <div className="bg-white border border-border p-2 rounded-xs text-[10px] roboto text-text-muted italic leading-normal border-t-2 border-t-border">
                            {report.summary}
                          </div>

                        </div>
                      )}

                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Run Audit Action Buttons */}
            <div className="pt-sm border-t border-border mt-sm">
              <button
                onClick={handleRunInspection}
                disabled={isAuditing || !imagePreview}
                className="w-full text-xs uppercase tracking-wider font-black mona py-3 bg-failure hover:bg-failure/90 disabled:bg-border disabled:text-text-muted disabled:cursor-not-allowed text-white rounded-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-xs"
              >
                {isAuditing ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Auditing Construction Site...
                  </>
                ) : (
                  <>
                    <Shield size={14} />
                    Run AI Inspection
                  </>
                )}
              </button>
            </div>

          </div>


          {/* PANEL 3: DECISION ESCROW & AUDIT LOGS */}
          <div className="bg-card rounded-md border border-border shadow-card p-sm flex flex-col justify-between min-h-[500px] transition-all">
            <div className="space-y-sm flex-1 flex flex-col">
              
              <div className="pb-sm border-b border-border">
                <div className="text-label roboto text-text-muted uppercase tracking-widest mb-1">Panel 03 // Algorithmic Escrow</div>
                <h3 className="text-title mona text-text-primary flex items-center gap-xs">
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
                    <div className="relative inline-flex items-center justify-center bg-text-primary text-white w-10 h-10 rounded-full shadow-md">
                      <Lock size={18} />
                    </div>
                    <div className="space-y-1 px-4">
                      <div className="text-xs font-black mona text-text-primary uppercase tracking-wider">Awaiting Audit Verdict</div>
                      <div className="text-[10px] roboto text-text-muted leading-relaxed">
                        Milestone finances are held in compliance escrow. Please run the AI inspector in Panel 02 to evaluate visual pavement compliance.
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
                        <div className="bg-evidence-bg border border-evidence/20 text-evidence rounded-sm p-sm text-center space-y-1 shadow-sm">
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
                            className="w-full text-[10px] uppercase font-black tracking-widest roboto border border-border py-2.5 px-3 rounded-sm flex items-center justify-between bg-surface text-text-primary hover:bg-white transition-colors"
                          >
                            <span>Administrative Override Request</span>
                            <ChevronDown size={14} className={`text-text-muted transition-transform ${isOverrideOpen ? 'rotate-180' : ''}`} />
                          </button>

                          {/* Accordion Body */}
                          {isOverrideOpen && (
                            <form onSubmit={handleOverrideSubmit} className="space-y-2 bg-surface/50 border border-border border-t-0 p-3 rounded-b-sm animate-fadeIn space-y-2 text-left">
                              
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

        {/* METADATA SYSTEM FOOTER */}
        <div className="text-center pt-sm text-text-muted text-[10px] roboto tracking-widest uppercase">
          RoadShield Verification Protocol v1.5.0 // Securing Public Infrastructure via Algorithmic Accountability
        </div>

      </div>
    </section>
  );
}
