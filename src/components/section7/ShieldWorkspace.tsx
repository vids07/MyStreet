'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Shield, 
  Check, 
  AlertCircle, 
  UploadCloud, 
  Lock, 
  Unlock, 
  Loader2, 
  RotateCcw, 
  AlertTriangle,
  Play,
  XCircle,
  AlertOctagon,
  Trash2,
  Settings
} from 'lucide-react';
import { formatLakh } from '@/lib/utils/road-display';

type ShieldWorkspaceProps = {
  roadId: string;
  roadSystemId: string;
  roadName: string;
  contractorName: string;
  milestoneAmount: number;
  hasSystemEnvKey: boolean;
};

type InspectionViolation = {
  rule: string;
  description: string;
  requirement: string;
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

// --- SIMPLIFIED VECTOR ILLUSTRATIONS FOR CARTOON PREVIEWS ---

function ScenarioCompliantSVG() {
  return (
    <svg viewBox="0 0 400 250" className="w-full h-full bg-[#f8fafc] font-sans rounded-2xl overflow-hidden select-none">
      <rect width="100%" height="100%" fill="#f8fafc" />
      <rect x="40" y="150" width="320" height="25" rx="6" fill="#f59e0b" fillOpacity="0.1" stroke="#d97706" strokeWidth="1.5" strokeDasharray="4 4" />
      <rect x="40" y="180" width="320" height="35" rx="4" fill="#e2e8f0" />
      <g stroke="#ffffff" strokeWidth="2.5">
        <rect x="50" y="120" width="60" height="30" rx="6" fill="#94a3b8" />
        <rect x="115" y="120" width="60" height="30" rx="6" fill="#94a3b8" />
        <rect x="180" y="120" width="60" height="30" rx="6" fill="#94a3b8" />
        <rect x="245" y="120" width="60" height="30" rx="6" fill="#94a3b8" />
      </g>
      <g transform="translate(130, 68)">
        <rect x="10" y="15" width="50" height="15" rx="4" fill="#10b981" />
        <path d="M 20,15 L 25,5 L 45,5 L 50,15 Z" fill="#10b981" />
        <circle cx="22" cy="30" r="6" fill="#0f172a" stroke="#fff" strokeWidth="1.5" />
        <circle cx="48" cy="30" r="6" fill="#0f172a" stroke="#fff" strokeWidth="1.5" />
        <path d="M 31,22 Q 35,25 39,22" stroke="#fff" strokeWidth="1.5" fill="none" />
      </g>
      <g transform="translate(15, 15)">
        <rect width="110" height="26" rx="13" fill="#10b981" />
        <text x="55" y="16.5" textAnchor="middle" fill="#ffffff" fontWeight="900" fontSize="10">GOOD ROAD ✅</text>
      </g>
    </svg>
  );
}

function ScenarioSpeedBreakerSVG() {
  return (
    <svg viewBox="0 0 400 250" className="w-full h-full bg-[#f8fafc] font-sans rounded-2xl overflow-hidden select-none">
      <rect width="100%" height="100%" fill="#f8fafc" />
      <path d="M 100,180 L 190,70 L 280,180 Z" fill="#fca5a5" fillOpacity="0.4" stroke="#ef4444" strokeWidth="3.5" />
      <line x1="30" y1="180" x2="370" y2="180" stroke="#94a3b8" strokeWidth="2.5" />
      <g transform="translate(135, 45) rotate(-25)">
        <rect x="10" y="15" width="50" height="15" rx="4" fill="#ef4444" />
        <path d="M 20,15 L 25,5 L 45,5 L 50,15 Z" fill="#ef4444" />
        <circle cx="22" cy="30" r="6" fill="#0f172a" stroke="#fff" strokeWidth="1.5" />
        <circle cx="48" cy="30" r="6" fill="#0f172a" stroke="#fff" strokeWidth="1.5" />
      </g>
      <path d="M 200,60 L 205,45 L 220,45 L 208,35 L 212,20 L 200,30 L 188,20 L 192,35 L 180,45 L 195,45 Z" fill="#d97706" />
      <text x="235" y="45" fill="#d97706" fontWeight="900" fontSize="14" fontFamily="monospace">OUCH!</text>
      <g transform="translate(15, 15)">
        <rect width="110" height="26" rx="13" fill="#ef4444" />
        <text x="55" y="16.5" textAnchor="middle" fill="#ffffff" fontWeight="900" fontSize="10">TALL BUMP ❌</text>
      </g>
    </svg>
  );
}

function ScenarioPaverBaseSVG() {
  return (
    <svg viewBox="0 0 400 250" className="w-full h-full bg-[#f8fafc] font-sans rounded-2xl overflow-hidden select-none">
      <rect width="100%" height="100%" fill="#f8fafc" />
      <path d="M 40,145 C 100,165 150,185 210,160 C 260,140 300,155 350,145 L 350,210 L 40,210 Z" fill="#92400e" fillOpacity="0.4" stroke="#78350f" strokeWidth="2.5" />
      <g stroke="#ef4444" strokeWidth="2">
        <rect x="50" y="120" width="55" height="25" rx="4" fill="#64748b" transform="rotate(5 50 120)" />
        <rect x="110" y="145" width="55" height="25" rx="4" fill="#64748b" transform="rotate(-15 110 145)" />
        <rect x="175" y="130" width="55" height="25" rx="4" fill="#64748b" transform="rotate(18 175 130)" />
        <rect x="240" y="115" width="55" height="25" rx="4" fill="#64748b" transform="rotate(-4 240 115)" />
      </g>
      <circle cx="120" cy="180" r="4" fill="#78350f" />
      <circle cx="145" cy="190" r="3" fill="#78350f" />
      <circle cx="190" cy="185" r="5" fill="#78350f" />
      <g transform="translate(15, 15)">
        <rect width="110" height="26" rx="13" fill="#ef4444" />
        <text x="55" y="16.5" textAnchor="middle" fill="#ffffff" fontWeight="900" fontSize="10">BARE MUD ❌</text>
      </g>
    </svg>
  );
}

function ScenarioTrenchSVG() {
  return (
    <svg viewBox="0 0 400 250" className="w-full h-full bg-[#f8fafc] font-sans rounded-2xl overflow-hidden select-none">
      <rect width="100%" height="100%" fill="#f8fafc" />
      <path d="M 40,130 L 120,130 Q 200,195 280,130 L 360,130" fill="none" stroke="#ef4444" strokeWidth="6.5" />
      <rect x="50" y="105" width="45" height="20" rx="4" fill="#64748b" />
      <g transform="translate(170, 105)">
        <circle cx="25" cy="25" r="18" fill="none" stroke="#ef4444" strokeWidth="3.5" />
        <circle cx="25" cy="25" r="4.5" fill="#0f172a" />
        <line x1="25" y1="7" x2="25" y2="43" stroke="#ef4444" strokeWidth="2" />
        <line x1="7" y1="25" x2="43" y2="25" stroke="#ef4444" strokeWidth="2" />
        <text x="48" y="21" fill="#ef4444" fontWeight="900" fontSize="11" fontFamily="monospace">STUCK!</text>
      </g>
      <g transform="translate(15, 15)">
        <rect width="115" height="26" rx="13" fill="#ef4444" />
        <text x="57.5" y="16.5" textAnchor="middle" fill="#ffffff" fontWeight="900" fontSize="10">SUNK SEWER ❌</text>
      </g>
    </svg>
  );
}

function ScenarioBarricadeSVG() {
  return (
    <svg viewBox="0 0 400 250" className="w-full h-full bg-[#f8fafc] font-sans rounded-2xl overflow-hidden select-none">
      <rect width="100%" height="100%" fill="#f8fafc" />
      <rect x="130" y="110" width="140" height="90" rx="12" fill="#fff" stroke="#ef4444" strokeWidth="3.5" />
      <line x1="130" y1="110" x2="270" y2="110" stroke="#d97706" strokeWidth="4" strokeDasharray="6 6" />
      <g transform="translate(75, 80)" stroke="#ef4444" strokeWidth="2.5" fill="none">
        <circle cx="20" cy="15" r="5" fill="#ef4444" stroke="none" />
        <line x1="20" y1="20" x2="20" y2="45" />
        <line x1="20" y1="25" x2="5" y2="15" />
        <line x1="20" y1="25" x2="35" y2="15" />
        <line x1="20" y1="45" x2="10" y2="65" />
        <line x1="20" y1="45" x2="30" y2="60" />
      </g>
      <text x="80" y="70" fill="#ef4444" fontWeight="900" fontSize="11" className="animate-bounce" fontFamily="monospace">HELP!</text>
      <g transform="translate(15, 15)">
        <rect width="110" height="26" rx="13" fill="#ef4444" />
        <text x="55" y="16.5" textAnchor="middle" fill="#ffffff" fontWeight="900" fontSize="10">OPEN PIT ❌</text>
      </g>
    </svg>
  );
}

function ScenarioFootpathSVG() {
  return (
    <svg viewBox="0 0 400 250" className="w-full h-full bg-[#f8fafc] font-sans rounded-2xl overflow-hidden select-none">
      <rect width="100%" height="100%" fill="#f8fafc" />
      <rect x="10" y="170" width="180" height="40" fill="#e2e8f0" />
      <path d="M 190,170 L 190,80 L 390,80" fill="none" stroke="#ef4444" strokeWidth="4.5" />
      <rect x="192" y="82" width="196" height="130" fill="#f1f5f9" />
      <g transform="translate(90, 110)" stroke="#ef4444" strokeWidth="2.5" fill="none">
        <circle cx="20" cy="15" r="4" fill="#ef4444" stroke="none" />
        <path d="M 17,19 C 14,23 15,31 20,31" />
        <circle cx="20" cy="35" r="11" />
        <path d="M 12,21 L 20,27 L 27,33" />
        <path d="M 20,31 L 28,31 L 28,40" />
      </g>
      <text x="85" y="100" fill="#ef4444" fontWeight="900" fontSize="10" fontFamily="sans-serif">BLOCKED! 😟</text>
      <g transform="translate(15, 15)">
        <rect width="110" height="26" rx="13" fill="#ef4444" />
        <text x="55" y="16.5" textAnchor="middle" fill="#ffffff" fontWeight="900" fontSize="10">HIGH STEP ❌</text>
      </g>
    </svg>
  );
}

// --- SIMPLIFIED SCENARIO DATA IN CHATGPT VISUALS ---

const SCENARIOS = [
  {
    id: 'compliant',
    title: 'Perfect Road ✅',
    emoji: '🛣️',
    description: 'Flat pavement tiles sitting on clean sand bedding. Smooth and perfect!',
    verdict: 'PASS' as const,
    summary: 'Perfect Road! The contractor used a proper sand cushion and solid side borders. Payout Approved!',
    violations: []
  },
  {
    id: 'speed-breaker',
    title: 'Tall Hump ⛰️',
    emoji: '⛰️',
    description: 'A sharp concrete speed hump built twice as tall as the legal limit, with no warning paint.',
    verdict: 'FAIL' as const,
    summary: 'Failed: Hump is dangerously steep and high (185mm vs 100mm limit). It will damage car bumpers! Payout Frozen.',
    violations: [
      {
        rule: 'Speed Hump Height Limit (IRC:99)',
        description: 'Hump is 185mm tall (legal maximum is 100mm).',
        requirement: 'Must be short and smoothly rounded.',
        severity: 'CRITICAL' as const
      },
      {
        rule: 'Missing Warning Stripes (IRC:99)',
        description: 'No yellow-black hazard stripes painted on the hump.',
        requirement: 'Must have high-visibility painted lines.',
        severity: 'WARNING' as const
      }
    ]
  },
  {
    id: 'paver-base',
    title: 'Bare Mud 💩',
    emoji: '💩',
    description: 'Pavement tiles thrown straight on sloppy mud without a sand cushion layer.',
    verdict: 'FAIL' as const,
    summary: 'Failed: Contractor skipped the clean sand bedding layer to save money. Tiles are shifting, sinking, and unstable! Payout Frozen.',
    violations: [
      {
        rule: 'Missing Sand Bedding Cushion (IRC:SP:63)',
        description: 'Blocks laid directly on raw muddy soil.',
        requirement: 'Must have a 20-40mm clean sand bedding cushion underneath tiles.',
        severity: 'CRITICAL' as const
      }
    ]
  },
  {
    id: 'no-barricading',
    title: 'Open Pit ⚠️',
    emoji: '⚠️',
    description: 'A deep construction hole left wide open on a high-traffic street with zero fencing.',
    verdict: 'FAIL' as const,
    summary: 'Failed: A 6-foot deep construction hole left completely open on a busy street with no safety barriers! Very dangerous. Payout Frozen.',
    violations: [
      {
        rule: 'Missing Construction Fencing (IRC:SP:55)',
        description: '6-foot deep pit left completely open with no safety barriers.',
        requirement: 'Must be enclosed with rigid black-and-yellow safety fencing.',
        severity: 'CRITICAL' as const
      }
    ]
  }
];

const CHECKLIST_ITEMS = [
  { label: 'Checking tile flat alignment...', key: 'blocks' },
  { label: 'Probing for clean sand bedding cushion...', key: 'bedding' },
  { label: 'Scanning trench refills for road dips...', key: 'trench' },
  { label: 'Checking concrete side borders...', key: 'curbs' },
  { label: 'Scanning for dangerous open construction pits...', key: 'safety' },
  { label: 'Verifying speed hump dimensions...', key: 'hump' }
];

const STEP_MESSAGES: Record<string, string[]> = {
  compliant: [
    "Tiles are flat and securely locked! ✅ Perfect",
    "Clean sand bedding layer detected! ✅ Perfect",
    "No sewer trench dips or hollows! ✅ Perfect",
    "Concrete borders are rock-solid! ✅ Perfect",
    "No hazardous open holes found! ✅ Perfect",
    "Speed humps are short and safe! ✅ Perfect"
  ],
  'speed-breaker': [
    "Tiles are flat and securely locked. ✅",
    "Sand cushion is present. ✅",
    "Trench lines are flat. ✅",
    "Borders are secure. ✅",
    "Work zone is clean of holes. ✅",
    "❌ FAULT! Speed hump is a dangerous 185mm brick wall!"
  ],
  'paver-base': [
    "❌ FAULT! Sinking and unstable loose tiles found!",
    "❌ FRAUD! Blocks thrown straight on mud! No sand layer!",
    "Ground is soft and shifting. ❌",
    "Side borders are breaking loose. ❌",
    "Tripping hazard detected. ❌",
    "Speed hump dimensions look fine. ✅"
  ],
  'utility-trench': [
    "Tiles look flat. ✅",
    "Sand cushion is fine. ✅",
    "❌ FAULT! Sewer trench caved in by a deep -38mm dip!",
    "Border stones look okay. ✅",
    "No dangerous open holes. ✅",
    "Humps look standard. ✅"
  ],
  'no-barricading': [
    "Tiles look flat. ✅",
    "Sand cushion is fine. ✅",
    "Trenches are flat. ✅",
    "Borders look secure. ✅",
    "❌ FAULT! Unfenced deep construction pit left open on street!",
    "Humps look standard. ✅"
  ],
  'footpath-height': [
    "Road tiles are flat. ✅",
    "Sand cushion is fine. ✅",
    "Drainage is clear. ✅",
    "Borders are secure. ✅",
    "❌ FAULT! Sidewalk step is a giant 350mm barrier!",
    "Humps look standard. ✅"
  ]
};

const CUSTOM_STEP_MESSAGES = [
  "🔍 Step 1: Checking tile flatness...",
  "🥪 Step 2: Checking sand bedding...",
  "💧 Step 3: Checking sewer trenches...",
  "🧱 Step 4: Checking concrete side borders...",
  "🦺 Step 5: Checking safety fencing...",
  "🚗 Step 6: Checking speed humps..."
];

export default function ShieldWorkspace({
  roadId,
  roadSystemId,
  roadName,
  contractorName,
  milestoneAmount,
  hasSystemEnvKey
}: ShieldWorkspaceProps) {
  const [customApiKey, setCustomApiKey] = useState('');
  const [rulesText, setRulesText] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const [workflowState, setWorkflowState] = useState<'INPUT' | 'PREVIEW' | 'SCANNING' | 'VERDICT'>('INPUT');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [activeScenarioId, setActiveScenarioId] = useState<string | null>(null);

  const [isAuditing, setIsAuditing] = useState(false);
  const [auditStep, setAuditStep] = useState<number>(-1);
  const [telemetryLog, setTelemetryLog] = useState<string>('');
  const [report, setReport] = useState<InspectionReport | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [isAutomatedApproved, setIsAutomatedApproved] = useState(false);
  const [automatedApprovedAt, setAutomatedApprovedAt] = useState('');
  const [isOverrideOpen, setIsOverrideOpen] = useState(false);
  const [overrideForm, setOverrideForm] = useState({
    name: '',
    designation: 'Junior Engineer, Nagar Nigam',
    reason: ''
  });
  const [savedOverride, setSavedOverride] = useState<OverrideData | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const defaultRules = `This is a road construction site in India. Based on what you see, identify any violations against MoRTH specifications for interlocking paver blocks. Specifically check: paver displacement, exposed sub-base, drainage compliance, and structural integrity. Give verdict: PASS or FAIL with exact clause reference.`;
    setRulesText(defaultRules);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      processFile(files[0]);
    }
  };

  const processFile = (file: File) => {
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setActiveScenarioId(null);
    setErrorMsg(null);
    setReport(null);
    setAuditStep(-1);
    setIsAutomatedApproved(false);
    setSavedOverride(null);
    setIsOverrideOpen(false);
    setWorkflowState('PREVIEW');

    const reader = new FileReader();
    reader.onload = (evt) => {
      if (evt.target?.result && typeof evt.target.result === 'string') {
        const base64Content = evt.target.result.split(',')[1];
        setImageBase64(base64Content);
      }
    };
    reader.readAsDataURL(file);
  };

  const clearLoadedPhoto = () => {
    setImageFile(null);
    setImageBase64(null);
    setImagePreview(null);
    setActiveScenarioId(null);
    setReport(null);
    setAuditStep(-1);
    setErrorMsg(null);
    setWorkflowState('INPUT');
  };

  const handleRunInspection = async () => {
    setErrorMsg(null);
    setReport(null);
    setSavedOverride(null);
    setIsOverrideOpen(false);
    setIsAutomatedApproved(false);

    const isPreseeded = activeScenarioId !== null;
    const hasApiKey = hasSystemEnvKey || customApiKey.trim().length > 0;

    setIsAuditing(true);
    setAuditStep(0);
    setWorkflowState('SCANNING');

    const runSimulationSequence = (scenarioId: string, customLogs: string[]) => {
      let currentStep = 0;
      setTelemetryLog(customLogs[0]);

      const interval = setInterval(() => {
        currentStep++;
        if (currentStep < 6) {
          setAuditStep(currentStep);
          setTelemetryLog(customLogs[currentStep]);
        } else {
          clearInterval(interval);
        }
      }, 800);

      return interval;
    };

    const currentLogs = isPreseeded 
      ? STEP_MESSAGES[activeScenarioId || 'compliant'] 
      : CUSTOM_STEP_MESSAGES;

    const timer = runSimulationSequence(activeScenarioId || 'compliant', currentLogs);

    if (isPreseeded && !hasApiKey) {
      await new Promise((resolve) => setTimeout(resolve, 5200));
      clearInterval(timer);

      const matchedScenario = SCENARIOS.find(s => s.id === activeScenarioId);
      if (matchedScenario) {
        setReport({
          verdict: matchedScenario.verdict,
          summary: matchedScenario.summary,
          violations: matchedScenario.violations
        });
      }
      setAuditStep(6);
      setIsAuditing(false);
      setWorkflowState('VERDICT');
      return;
    }

    // If no API key is specified, we proceed and let the server endpoint use its built-in simulated demo fallback.


    let base64Payload = imageBase64;
    let mimeTypePayload = imageFile?.type || 'image/jpeg';

    if (isPreseeded) {
      base64Payload = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
      mimeTypePayload = 'image/png';
    }

    if (!base64Payload) {
      clearInterval(timer);
      setAuditStep(-1);
      setIsAuditing(false);
      setErrorMsg('Choose a road photo first! Upload a file or click on a sample case below.');
      setWorkflowState('PREVIEW');
      return;
    }

    try {
      let rulesToSend = rulesText.trim() + `\n\nEnsure you check against Dehradun/Uttarakhand Municipal and MoRTH rules:
      - IRC:86-2018 / IRC:103-2012 (Footpath curb height must not exceed 150mm. Smooth pedestrian crossings).
      - MoRTH 2013 Specifications (Subbase compaction, proper material layers).
      - IRC:SP:63-2018 (Interlocking paver block roads must sit on 20-40mm sand bedding over a solid base. Absolute ban on bare mud).
      - IS:15658-2006 (Paver block strength and tight sand joints).
      - IRC:99-2018 (Speed humps must be max 100mm high, width 3.7m, rounded smooth, painted yellow-black stripes with signs).
      - IRC:SP:55-2014 (Active work zones must have rigid safety barricades, detour signs, and safe walkways).`;

      if (isPreseeded) {
        const scenario = SCENARIOS.find(s => s.id === activeScenarioId);
        rulesToSend += `\n\n[DEMO PROTOCOL ACTIVE: The user selected pre-seeded scenario "${scenario?.title}". The simulated defect details are: ${scenario?.description}. Act as if you scanned this image and return the specific violations and PASS/FAIL verdict matching this case.]`;
      }

      const response = await fetch('/api/inspect', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
           rulesText: rulesToSend,
           imageBase64: base64Payload,
           mimeType: mimeTypePayload,
           customApiKey: customApiKey.trim() || undefined,
         }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to scan photo. Make sure the API key is correct.');
      }

      const apiReport = data.report as InspectionReport;
      const formattedViolations = apiReport.violations.map(v => ({
        rule: v.rule,
        description: v.description,
        requirement: v.requirement || 'Must meet Indian Road Congress and MoRTH construction standards.',
        severity: v.severity
      }));

      await new Promise((resolve) => setTimeout(resolve, 1000));
      clearInterval(timer);

      setReport({
        verdict: apiReport.verdict,
        summary: apiReport.summary,
        violations: formattedViolations
      });
      setAuditStep(6);
      setWorkflowState('VERDICT');
    } catch (err: any) {
      clearInterval(timer);
      setAuditStep(-1);
      console.error(err);
      setErrorMsg(err.message || 'Audit Scan Failed.');
      setWorkflowState('PREVIEW');
    } finally {
      setIsAuditing(false);
    }
  };

  const selectScenario = (id: string) => {
    if (isAuditing) return;
    setActiveScenarioId(id);
    setImagePreview(`scenario-${id}`);
    setImageFile(null);
    setImageBase64(null);
    setErrorMsg(null);
    setReport(null);
    setAuditStep(-1);
    setIsAutomatedApproved(false);
    setSavedOverride(null);
    setIsOverrideOpen(false);
    setWorkflowState('PREVIEW');
  };

  const getCheckStatus = (index: number) => {
    if (auditStep === -1) return 'idle';
    if (auditStep < index) return 'idle';
    if (auditStep === index && isAuditing) return 'checking';
    
    const scenarioId = activeScenarioId || 'custom';
    if (scenarioId === 'compliant') return 'pass';
    
    if (scenarioId === 'speed-breaker' && index === 5) return 'fail';
    if (scenarioId === 'paver-base' && (index === 0 || index === 1)) return 'fail';
    if (scenarioId === 'utility-trench' && index === 2) return 'fail';
    if (scenarioId === 'no-barricading' && index === 4) return 'fail';
    if (scenarioId === 'footpath-height' && index === 4) return 'fail';
    
    if (scenarioId === 'custom') {
      if (report) {
        return report.verdict === 'PASS' ? 'pass' : 'fail';
      }
      return 'pass';
    }
    
    return 'pass';
  };

  const handleAutomatedApprove = () => {
    setIsAutomatedApproved(true);
    setAutomatedApprovedAt(new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));
  };

  const handleOverrideSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!overrideForm.name.trim() || !overrideForm.reason.trim()) {
      alert('Signature name and reason are both required to bypass!');
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

  const resetOverride = () => {
    setSavedOverride(null);
  };

  return (
    <section className="py-12 bg-surface min-h-screen text-slate-800 flex flex-col justify-start relative select-none font-sans">
      
      {/* SCANNING LASER & TRICOLOR ROTATION CSS */}
      <style>{`
        @keyframes scan-laser {
          0% { top: 0%; opacity: 0.8; }
          50% { top: 100%; opacity: 1; }
          100% { top: 0%; opacity: 0.8; }
        }
        .animate-scan-laser {
          animation: scan-laser 2.2s infinite ease-in-out;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideUp {
          animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 35s linear infinite;
        }
      `}</style>

      {/* SUBTLE GLOW */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[130px] pointer-events-none" />

      {/* TOP COMPACT NAV BAR */}
      <div className="max-w-[720px] w-full mx-auto px-4 flex items-center justify-between pb-4 mb-4 border-b border-slate-200/60">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            {/* Elegant saffron/emerald glow behind the Chakra */}
            <div className="absolute inset-0 bg-[#FF9933]/10 blur-md rounded-full" />
            <svg viewBox="0 0 100 100" className="w-7 h-7 text-[#000080] animate-spin-slow relative z-10" fill="none" stroke="currentColor" strokeWidth="3">
              <circle cx="50" cy="50" r="45" strokeWidth="3.5" />
              <circle cx="50" cy="50" r="8.5" fill="currentColor" />
              <g>
                {Array.from({ length: 24 }).map((_, i) => (
                  <line
                    key={i}
                    x1="50"
                    y1="50"
                    x2={50 + 40 * Math.sin((i * 2 * Math.PI) / 24)}
                    y2={50 - 40 * Math.cos((i * 2 * Math.PI) / 24)}
                    strokeWidth="1.8"
                  />
                ))}
              </g>
            </svg>
          </div>
          <div className="flex flex-col text-left">
            <span className="font-mono text-sm uppercase tracking-widest font-black text-slate-800 leading-none">RoadShield AI</span>
            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider font-mono mt-1">Nagar Nigam Dehradun • GOVT OF INDIA</span>
          </div>
        </div>
        <button 
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className="p-2.5 text-slate-500 hover:text-[#000080] hover:bg-slate-100 rounded-xl transition-colors"
          title="Custom Settings"
        >
          <Settings size={18} />
        </button>
      </div>

      {/* SOVEREIGN TRICOLOR RIBBON SEPARATOR */}
      <div className="max-w-[720px] w-full mx-auto px-4 mb-8 flex h-1 rounded-full overflow-hidden shrink-0">
        <div className="w-1/3 bg-[#FF9933]" />
        <div className="w-1/3 bg-white border-y border-slate-100" />
        <div className="w-1/3 bg-[#138808]" />
      </div>

      {/* MAIN CHATGPT CENTRAL WRAPPER */}
      <div className="max-w-[720px] w-full mx-auto px-4 space-y-8 flex-1 flex flex-col justify-center">

        {/* SETTINGS (HIDDEN BY DEFAULT) */}
        {isSettingsOpen && (
          <div className="bg-surface border border-slate-200/80 rounded-2xl p-5 text-left space-y-4 animate-fadeIn text-xs font-mono shadow-xl">
            <div className="space-y-1.5">
              <span className="font-bold text-slate-500 uppercase tracking-wide text-[10px]">Gemini Key (Custom Files):</span>
              <input 
                type="password"
                placeholder="Paste key (AIzaSy...)"
                value={customApiKey}
                onChange={(e) => setCustomApiKey(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:outline-none px-3 py-2 rounded-xl text-slate-800 transition-all font-sans"
              />
            </div>
            <div className="space-y-1.5">
              <span className="font-bold text-slate-500 uppercase tracking-wide text-[10px]">Standard Prompts:</span>
              <textarea 
                value={rulesText}
                onChange={(e) => setRulesText(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:outline-none px-3 py-2 rounded-xl text-slate-800 h-20 resize-none transition-all font-sans"
              />
            </div>
          </div>
        )}

        {/* ERROR CONTAINER */}
        {errorMsg && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl p-4.5 text-sm flex items-center gap-3 text-left animate-fadeIn shadow-sm">
            <AlertCircle size={18} className="text-rose-500 shrink-0" />
            <span className="font-medium">{errorMsg}</span>
          </div>
        )}

        {/* STEP 1: INPUT STATE (UPLOAD / CHOOSE SCENARIO) */}
        {workflowState === 'INPUT' && (
          <div className="space-y-10 py-4 text-center animate-fadeIn">
            
            {/* Title */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-950 tracking-tight leading-none mona">Roadshield AI</h1>
              <p className="text-[#000080]/80 text-xs font-mono font-bold uppercase tracking-widest leading-none">Nagar Nigam Dehradun Initiative</p>
              <p className="text-slate-650 text-base max-w-[512px] mx-auto leading-relaxed font-medium">
                Upload road photographs to instantly verify compliance against IRC & MoRTH guidelines and unlock escrow payments.
              </p>
            </div>

            {/* Drag & Drop Upload Zone */}
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border border-dashed border-slate-200 hover:border-[#FF9933]/60 hover:bg-amber-50/5 bg-surface transition-all duration-300 rounded-3xl p-12 cursor-pointer text-slate-400 space-y-4 max-w-[480px] mx-auto flex flex-col items-center justify-center group shadow-md hover:shadow-xl"
            >
              <div className="bg-slate-50 border border-slate-100 text-slate-500 group-hover:text-[#000080] group-hover:bg-slate-50 group-hover:border-[#000080]/30 w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm transition-all duration-300">
                <UploadCloud size={28} className="text-[#000080]/70" />
              </div>
              <div className="space-y-1.5">
                <p className="text-indigo-950 font-extrabold text-lg tracking-tight mona">Upload road photo</p>
                <p className="text-slate-500 text-sm font-medium">Drag & drop files or click to browse</p>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                className="hidden" 
              />
            </div>

            {/* Preseeded Scenario Grid */}
            <div className="space-y-4 pt-2">
              <span className="text-xs uppercase font-mono font-bold tracking-wider text-slate-400 block">
                Or test with a sample road case
              </span>
              <div className="grid grid-cols-2 gap-3 max-w-[480px] mx-auto">
                {SCENARIOS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => selectScenario(s.id)}
                    className={`p-4 bg-surface hover:bg-slate-50/40 border border-slate-150 rounded-2xl text-xs font-semibold text-slate-700 flex items-center gap-3.5 transition-all duration-300 active:scale-95 text-left shadow-sm hover:shadow-md ${
                      s.id === 'compliant' ? 'hover:border-[#138808]/50' : 'hover:border-[#FF9933]/50'
                    }`}
                  >
                    <span className="text-lg bg-slate-50 w-10 h-10 rounded-xl flex items-center justify-center border border-slate-100 shrink-0">{s.emoji}</span>
                    <div className="flex flex-col truncate">
                      <span className="font-extrabold truncate text-slate-800 text-sm mona leading-tight">{s.title.replace(/✅|❌/g, '').trim()}</span>
                      <span className={`text-[10px] font-bold font-mono tracking-wide uppercase ${s.id === 'compliant' ? 'text-[#138808]' : 'text-[#FF9933]'}`}>{s.id === 'compliant' ? 'Morth Approved' : 'Rule Defect'}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* STEP 2: PREVIEW STATE */}
        {workflowState === 'PREVIEW' && (
          <div className="space-y-6 text-center animate-fadeIn">
            
            {/* Minimal Back Button */}
            <div className="flex justify-start">
              <button
                onClick={clearLoadedPhoto}
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-extrabold uppercase tracking-wider transition-colors animate-fadeIn mona"
              >
                ← Back to Upload
              </button>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-slate-800 mona tracking-tight uppercase">Confirm Selected Road Image</h2>
              <p className="text-slate-500 text-sm font-medium">Ready to check this road site against Indian Road Congress (IRC) and MoRTH rules.</p>
            </div>

            {/* Visual preview box with small x in corner (like ChatGPT) */}
            <div className="relative max-w-[480px] mx-auto aspect-[4/3] rounded-3xl overflow-hidden border border-slate-200/80 bg-surface shadow-lg p-1.5">
              {imagePreview === 'scenario-compliant' && <ScenarioCompliantSVG />}
              {imagePreview === 'scenario-speed-breaker' && <ScenarioSpeedBreakerSVG />}
              {imagePreview === 'scenario-paver-base' && <ScenarioPaverBaseSVG />}
              {imagePreview === 'scenario-utility-trench' && <ScenarioTrenchSVG />}
              {imagePreview === 'scenario-no-barricading' && <ScenarioBarricadeSVG />}
              {imagePreview === 'scenario-footpath-height' && <ScenarioFootpathSVG />}
              
              {imagePreview && !imagePreview.startsWith('scenario-') && (
                <img 
                  src={imagePreview} 
                  alt="Road audit photo" 
                  className="w-full h-full object-contain mx-auto rounded-2xl"
                />
              )}

              {/* Close Button */}
              <button
                onClick={clearLoadedPhoto}
                className="absolute top-4.5 right-4.5 bg-white/95 hover:bg-rose-550 border border-slate-150 text-slate-600 hover:text-white p-2.5 rounded-full shadow-md transition-all active:scale-90"
                title="Remove photo"
              >
                <Trash2 size={16} />
              </button>
            </div>

            {/* SCANNING TRIGGER BUTTON */}
            <div className="pt-2">
              <button
                onClick={handleRunInspection}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#000080] to-indigo-900 hover:from-indigo-950 hover:to-slate-900 text-white font-extrabold text-base px-12 py-4.5 rounded-full transition-all shadow-[0_4px_20px_rgba(0,0,128,0.25)] hover:shadow-[0_6px_24px_rgba(0,0,128,0.35)] active:scale-95 mona uppercase tracking-widest border border-indigo-900/40"
              >
                <Play size={16} fill="currentColor" />
                <span>Begin Audit Scan 🇮🇳</span>
              </button>
            </div>

          </div>
        )}

        {/* STEP 3: SCANNING STATE */}
        {workflowState === 'SCANNING' && (
          <div className="space-y-6 text-center animate-fadeIn">
            
            <div className="space-y-1.5">
              <div className="text-xs font-mono font-bold tracking-wider text-[#FF9933] uppercase">MUNICIPAL ROAD AUDIT ACTIVE</div>
              <h2 className="text-xl font-black text-indigo-950 mona tracking-tight flex items-center justify-center gap-2">
                <Loader2 size={20} className="animate-spin text-[#000080]" />
                Checking MoRTH Compliance...
              </h2>
            </div>

            {/* Small scanning image container */}
            <div className="relative max-w-[360px] mx-auto aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 bg-surface opacity-90 shadow-md p-1">
              {imagePreview === 'scenario-compliant' && <ScenarioCompliantSVG />}
              {imagePreview === 'scenario-speed-breaker' && <ScenarioSpeedBreakerSVG />}
              {imagePreview === 'scenario-paver-base' && <ScenarioPaverBaseSVG />}
              {imagePreview === 'scenario-utility-trench' && <ScenarioTrenchSVG />}
              {imagePreview === 'scenario-no-barricading' && <ScenarioBarricadeSVG />}
              {imagePreview === 'scenario-footpath-height' && <ScenarioFootpathSVG />}
              
              {imagePreview && !imagePreview.startsWith('scenario-') && (
                <img 
                   src={imagePreview} 
                   alt="Road audit photo" 
                   className="w-full h-full object-contain mx-auto rounded-xl"
                />
              )}

              {/* Tricolor Laser beam */}
              <div className="absolute left-0 w-full h-[4px] bg-gradient-to-r from-[#FF9933] via-white to-[#138808] shadow-[0_0_12px_rgba(255,153,51,0.8)] pointer-events-none animate-scan-laser" />
            </div>

            {/* LIVE CHECKLIST */}
            <div className="max-w-[480px] mx-auto space-y-3 bg-surface border border-slate-200/80 rounded-2xl p-5 text-left shadow-sm">
              <div className="border-b border-slate-100 pb-3 mb-3 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-slate-450">Checking Construction Specs</span>
                <span className="text-[9px] bg-indigo-50 text-indigo-800 font-mono font-bold px-2 py-0.5 rounded border border-indigo-100 tracking-wider uppercase">Dehradun Smart City Standard</span>
              </div>

              <div className="space-y-2">
                {CHECKLIST_ITEMS.map((item, index) => {
                  const status = getCheckStatus(index);
                  if (status === 'idle') return null; // Only show started items
                  
                  return (
                    <div 
                      key={index}
                      className={`py-2.5 px-4.5 border rounded-xl flex items-center justify-between font-mono text-sm transition-all duration-300 animate-slideUp ${
                        status === 'checking'
                          ? 'border-amber-200 bg-amber-50/50 text-amber-800 font-bold'
                          : status === 'pass'
                            ? 'border-emerald-100 bg-emerald-50/20 text-[#138808] font-bold'
                            : 'border-[#FF9933]/30 bg-orange-50/20 text-[#FF9933] font-extrabold shadow-sm'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400 font-bold">{index + 1}.</span>
                        <span className="truncate">{item.label}</span>
                      </div>

                      {status === 'checking' && (
                        <span className="text-[10px] text-amber-600 flex items-center gap-0.5 whitespace-nowrap animate-pulse font-black font-mono">
                          <Loader2 size={10} className="animate-spin" />
                          checking...
                        </span>
                      )}
                      {status === 'pass' && (
                        <span className="text-[10px] text-[#138808] font-black flex items-center gap-0.5 font-mono uppercase tracking-wide">
                          <Check size={13} className="stroke-[3]" />
                          Cleared
                        </span>
                      )}
                      {status === 'fail' && (
                        <span className="text-[10px] text-[#FF9933] font-black flex items-center gap-0.5 animate-pulse font-mono uppercase tracking-wide">
                          <XCircle size={13} className="stroke-[3]" />
                          Violated
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* STEP 4: VERDICT STATE */}
        {workflowState === 'VERDICT' && (
          <div className="space-y-6 text-left animate-fadeIn">
            
            <div className="text-center space-y-2">
              <div className="text-xs font-mono font-bold tracking-widest text-[#000080] uppercase">NATIONAL HIGHWAYS & MUNICIPAL STANDARDS COMPLIANCE</div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight uppercase mona flex items-center justify-center gap-2">
                <span className="text-[#FF9933]">AUDIT</span>
                <span className="text-slate-700">COMPLETED</span>
              </h2>
            </div>

            {report && (
              <div className="space-y-6">
                {report.verdict === 'PASS' ? (
                  
                  /* APPROVED SCREEN */
                  <div className="space-y-6 animate-slideUp">
                    <div className="bg-emerald-50/50 border border-[#138808]/30 rounded-3xl p-8 shadow-lg text-center space-y-5 relative overflow-hidden backdrop-blur-sm">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />
                      <div className="mx-auto w-16 h-16 bg-surface border border-[#138808]/30 rounded-full flex items-center justify-center text-3xl shadow-md animate-bounce">
                        ✅
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-[#138808] font-black text-2xl tracking-wide uppercase mona">
                          RELEASE PAYMENT: APPROVED
                        </h3>
                        <p className="text-slate-700 text-sm font-sans max-w-[480px] mx-auto leading-relaxed font-semibold">
                          MORTH & Nagar Nigam compliance standards fully met. Audited construction parameters are flawless. Escrow funds can be safely released.
                        </p>
                      </div>

                      <div className="bg-surface/80 border border-slate-200 rounded-2xl p-5 max-w-[380px] mx-auto text-left space-y-2.5 text-xs text-slate-700 shadow-sm font-sans">
                        <div className="flex justify-between items-center"><span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] font-mono">Contractor:</span> <span className="text-[#000080] font-black ml-1 text-sm">{contractorName}</span></div>
                        <div className="flex justify-between items-center"><span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] font-mono">Milestone:</span> <span className="text-slate-800 font-bold ml-1">Stage 1 Foundation (20%)</span></div>
                        <div className="flex justify-between items-center pt-2 border-t border-slate-100"><span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] font-mono">Payment Amount:</span> <span className="text-[#138808] font-black ml-1 text-lg">₹{formatLakh(milestoneAmount)}</span></div>
                      </div>

                      <div className="pt-2">
                        {isAutomatedApproved ? (
                          <div className="inline-block bg-surface text-[#138808] font-black text-sm px-8 py-4 rounded-full border border-[#138808]/20 shadow-md uppercase tracking-wider animate-pulse font-sans">
                            💸 Funds Transferred to Contractor Account!
                          </div>
                        ) : (
                          <button
                            onClick={handleAutomatedApprove}
                            className="px-10 py-4 bg-[#138808] hover:bg-[#138808]/90 text-white font-black text-sm rounded-full transition-all active:scale-95 uppercase tracking-widest shadow-[0_6px_20px_rgba(19,136,8,0.25)] font-sans border-b-4 border-[#138808]/70"
                          >
                            Release Milestone Payout 💸
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                ) : (
                  
                  /* BLOCKED SCREEN */
                  <div className="space-y-6 animate-slideUp">
                    
                    <div className="bg-orange-50/30 border border-[#FF9933]/30 rounded-3xl p-8 shadow-lg text-center space-y-5 relative overflow-hidden backdrop-blur-sm">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />
                      <div className="mx-auto w-16 h-16 bg-surface border border-[#FF9933]/30 rounded-full flex items-center justify-center text-3xl shadow-md animate-pulse">
                        🔒
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-[#FF9933] font-black text-2xl tracking-wide uppercase mona">
                          RELEASE PAYMENT: BLOCKED
                        </h3>
                        <p className="text-slate-700 text-sm font-sans max-w-[480px] mx-auto leading-relaxed font-semibold">
                          Defects and code violations detected against Dehradun Municipal standards. Escrow payout remains locked until defects are fully resolved.
                        </p>
                      </div>
                    </div>

                    {/* Specific Rules Broken block */}
                    <div className="bg-surface/80 border border-slate-200 rounded-3xl p-6 shadow-md text-left space-y-4">
                      <span className="text-xs font-extrabold text-[#FF9933] uppercase tracking-widest border-b border-slate-100 pb-2.5 flex items-center gap-2 font-mono">
                        <AlertOctagon size={14} className="text-[#FF9933]" />
                        Dehradun Municipal & MoRTH Code Violations Detected:
                      </span>

                      <div className="space-y-4">
                        {report.violations && report.violations.length > 0 ? (
                          report.violations.map((v, idx) => (
                            <div key={idx} className="bg-orange-50/15 border-l-4 border-[#FF9933] pl-4 py-3 rounded-r-xl space-y-1.5 text-sm font-sans shadow-sm transition-all hover:bg-orange-50/20">
                              <div className="font-black text-[#000080] uppercase tracking-wider text-xs font-mono">{v.rule}</div>
                              <p className="text-slate-700 leading-relaxed font-medium">
                                <strong className="text-[#FF9933] font-mono text-xs font-bold uppercase tracking-wider mr-1">Defect:</strong> {v.description}
                              </p>
                              <div className="text-slate-650 text-xs mt-2 pt-2 border-t border-orange-100/50">
                                <strong className="text-[#138808] font-mono not-italic uppercase text-[10px] block tracking-wider font-extrabold mb-0.5">MoRTH Code Standard:</strong> {v.requirement}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-xs text-slate-500 py-1 font-mono">
                            No codebook violations mapped. Try switching scenarios!
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Simple override box */}
                    <div className="space-y-3 pt-3 border-t border-slate-200/80">
                      {!savedOverride ? (
                        <div className="space-y-3 text-center">
                          <button
                            onClick={() => setIsOverrideOpen(!isOverrideOpen)}
                            type="button"
                            className="text-xs font-black text-slate-400 hover:text-[#FF9933] transition-colors uppercase tracking-widest font-mono underline block mx-auto py-2"
                          >
                            Bypass AI & Force Payout ⚠️
                          </button>

                          {isOverrideOpen && (
                            <form onSubmit={handleOverrideSubmit} className="space-y-4 bg-surface border border-slate-200/80 p-5 rounded-2xl text-slate-700 text-left shadow-xl animate-fadeIn">
                              <div className="bg-orange-50/50 border border-[#FF9933]/30 text-rose-800 text-[10px] font-bold p-3.5 rounded-xl leading-relaxed uppercase tracking-wider font-mono">
                                🚨 Official Warning: Bypassing rules transfers full legal personal responsibility to you under Government of India guidelines!
                              </div>

                              <div className="space-y-1.5">
                                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block font-mono">Sign your Name:</span>
                                <select 
                                  value={overrideForm.name}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setOverrideForm({
                                      ...overrideForm,
                                      name: val,
                                      designation: val === 'Anand Singh Mishrawan' ? 'Executive Engineer, Nagar Nigam' : 'Junior Engineer, Nagar Nigam'
                                    });
                                  }}
                                  className="w-full bg-slate-50 text-slate-800 border border-slate-200 focus:bg-white focus:border-[#000080] focus:outline-none p-2.5 rounded-xl text-xs font-sans transition-all"
                                  required
                                >
                                  <option value="">Choose officer name...</option>
                                  <option value="Anand Singh Mishrawan">Anand Singh Mishrawan (Executive Engineer, Nagar Nigam)</option>
                                  <option value="Sanjay Kumar Nautiyal">Sanjay Kumar Kumar (Junior Engineer, Nagar Nigam)</option>
                                </select>
                              </div>

                              <div className="space-y-1.5">
                                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block font-mono">Official Justification Reason:</span>
                                <textarea 
                                  value={overrideForm.reason}
                                  onChange={(e) => setOverrideForm({ ...overrideForm, reason: e.target.value })}
                                  placeholder="Provide professional technical explanation for bypassing automated AI guidelines..."
                                  className="w-full bg-slate-50 text-slate-800 border border-slate-200 focus:bg-white focus:border-[#000080] focus:outline-none p-2.5 rounded-xl h-16 leading-relaxed text-xs font-sans transition-all"
                                  required
                                />
                              </div>

                              <button
                                type="submit"
                                className="w-full py-3.5 bg-[#000080] hover:bg-[#000080]/90 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-md active:scale-95 font-sans border-b-4 border-[#000080]/70"
                              >
                                Sign Digitally & Transfer Liability ✍️
                              </button>
                            </form>
                          )}
                        </div>
                      ) : (
                        <div className="bg-orange-50/20 border-l-4 border-[#FF9933] border-t border-b border-r border-[#FF9933]/15 p-5 rounded-r-2xl text-left space-y-3.5 shadow-md animate-fadeIn">
                          <div className="font-black text-xs text-[#FF9933] uppercase tracking-widest border-b border-orange-100 pb-1.5 font-mono flex items-center gap-1.5">
                             🇮🇳 PERSONAL LIABILITY DECREE LOGGED
                          </div>
                          <div className="space-y-2 text-xs text-slate-750 font-sans font-medium">
                            <div><span className="text-slate-400 font-bold font-mono text-[10px] tracking-wider block mb-0.5">AUTHORIZING SIGNATORY:</span> <span className="font-black text-[#000080] uppercase text-xs">{savedOverride.officerName}</span></div>
                            <div className="pt-1"><span className="text-slate-400 font-bold font-mono text-[10px] tracking-wider block mb-0.5">DESIGNATION / DEPARTMENT:</span> <span className="text-slate-800 font-bold uppercase text-xs">{savedOverride.designation}</span></div>
                            <div className="pt-2"><span className="text-slate-400 font-bold font-mono text-[10px] tracking-wider block mb-0.5">SUBMITTED JUSTIFICATION:</span> <p className="bg-surface border border-orange-100 p-3.5 rounded-xl mt-1 italic text-slate-700 leading-relaxed text-xs shadow-sm">"{savedOverride.reason}"</p></div>
                          </div>
                          <button
                            onClick={resetOverride}
                            className="text-[10px] text-slate-400 hover:text-[#FF9933] uppercase flex items-center gap-1 transition-colors pt-1 block ml-auto font-mono font-bold"
                          >
                            <RotateCcw size={10} />
                            Reset Authority Authorization
                          </button>
                        </div>
                      )}
                    </div>

                  </div>
                )}
              </div>
            )}

            {/* Test another photo reset button */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 border-t border-slate-150">
              <button
                onClick={clearLoadedPhoto}
                className="inline-flex items-center justify-center gap-2 text-sm text-[#000080] hover:text-white hover:bg-[#000080] font-black uppercase tracking-widest transition-all border-2 border-[#000080]/20 hover:border-[#000080] bg-surface px-8 py-4 rounded-full shadow-md hover:shadow-lg active:scale-95 font-sans"
              >
                <RotateCcw size={14} />
                <span>← Test Another Photo</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
