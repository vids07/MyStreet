import type { EventData, PersonData } from '@/types/road';

// ============================================================
// EVIDENCE EXTRACTORS
// Safe accessors for JSONB evidence fields. Never use `as any`
// on evidence outside these functions.
// ============================================================

function asRecord(v: unknown): Record<string, unknown> {
  if (v !== null && v !== undefined && typeof v === 'object' && !Array.isArray(v)) {
    return v as Record<string, unknown>;
  }
  return {};
}

export function extractTenderEvidence(evidence: unknown): {
  isTender: boolean;
  estimatedValue: number;
  contractValue: number;
} {
  const e = asRecord(evidence);
  return {
    isTender: e.isTender === true,
    estimatedValue: Number(e.estimatedValue ?? 0),
    contractValue: Number(e.contractValue ?? 0),
  };
}

export function extractPaymentEvidence(evidence: unknown): {
  netDisbursed: number;
  roadSurfaceBudget: number | null;
  drainBudget: number | null;
} {
  const e = asRecord(evidence);
  return {
    netDisbursed: Number(e.netDisbursed ?? 0),
    roadSurfaceBudget: e.roadSurfaceBudget != null ? Number(e.roadSurfaceBudget) : null,
    drainBudget: e.drainBudget != null ? Number(e.drainBudget) : null,
  };
}

export function extractDlpEvidence(evidence: unknown): {
  dlpEndDate: Date | null;
} {
  const e = asRecord(evidence);
  const raw = typeof e.dlpEndDate === 'string' ? e.dlpEndDate : null;
  if (!raw) return { dlpEndDate: null };
  // ISO format: YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}/.test(raw)) {
    const d = new Date(raw);
    if (!isNaN(d.getTime())) return { dlpEndDate: d };
  }
  // DD.MM.YYYY format (Indian RTI documents): "03.04.2026"
  if (/^\d{2}\.\d{2}\.\d{4}$/.test(raw)) {
    const [day, month, year] = raw.split('.').map(Number);
    const d = new Date(year, month - 1, day);
    if (!isNaN(d.getTime())) return { dlpEndDate: d };
  }
  return { dlpEndDate: null };
}

export function extractAppealEvidence(evidence: unknown): {
  appealNumber: number | null;
  sentMode: string | null;
  replyStatus: string | null;
} {
  const e = asRecord(evidence);
  return {
    appealNumber: typeof e.appealNumber === 'number' ? e.appealNumber : null,
    sentMode: typeof e.sentMode === 'string' ? e.sentMode : null,
    replyStatus: typeof e.replyStatus === 'string' ? e.replyStatus : null,
  };
}

export function extractRtiEvidence(evidence: unknown): {
  rtiFiledDate: string | null;
} {
  const e = asRecord(evidence);
  return {
    rtiFiledDate: typeof e.rtiFiledDate === 'string' ? e.rtiFiledDate : null,
  };
}

export function extractRepairEvidence(evidence: unknown): {
  privatelyFunded: boolean;
  contractorDLPFailed: boolean;
} {
  const e = asRecord(evidence);
  return {
    privatelyFunded: e.privatelyFunded === true,
    contractorDLPFailed: e.contractorDLPFailed === true,
  };
}

export function extractCompletionEvidence(evidence: unknown): {
  inspectionDate: Date | null;
} {
  const e = asRecord(evidence);
  const raw = typeof e.inspectionDate === 'string' ? e.inspectionDate : null;
  if (!raw) return { inspectionDate: null };
  // ISO format only: YYYY-MM-DD or YYYY-MM-DDTHH:mm:ss
  if (/^\d{4}-\d{2}-\d{2}/.test(raw)) {
    const d = new Date(raw);
    if (!isNaN(d.getTime())) return { inspectionDate: d };
  }
  // DD.MM.YYYY format (Indian RTI documents): "03.04.2025"
  if (/^\d{2}\.\d{2}\.\d{4}$/.test(raw)) {
    const [day, month, year] = raw.split('.').map(Number);
    const d = new Date(year, month - 1, day);
    if (!isNaN(d.getTime())) return { inspectionDate: d };
  }
  return { inspectionDate: null };
}

export function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate();
}

export function monthsApart(from: Date, to: Date): string {
  const months = Math.floor(
    (to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24 * 30.44),
  );
  if (months < 1) return 'less than a month later';
  if (months === 1) return '1 month later';
  return `${months} months later`;
}

export function formatLakh(amount: number): string {
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} Lakh`;
  // toLocaleString is unreliable in Node.js without full ICU — format manually.
  // Sub-lakh: up to 5 digits → XX,XXX (same as western for this range).
  const rounded = Math.round(amount).toString();
  if (rounded.length <= 3) return `₹${rounded}`;
  return `₹${rounded.slice(0, rounded.length - 3)},${rounded.slice(rounded.length - 3)}`;
}

const DESIGNATION_ABBREVS: Record<string, string> = {
  'Junior Engineer': 'JE',
  'Assistant Engineer': 'AE',
  'Executive Engineer': 'EE',
  'Municipal Commissioner': 'MC',
};

export function abbreviateDesignation(designation: string): string {
  return DESIGNATION_ABBREVS[designation] ?? designation;
}

// All issue event types — used to derive conditionEvents count and filter.
export const ISSUE_EVENT_TYPES = [
  'pothole_found',
  'crack_found',
  'drain_blocked',
  'flooding_reported',
  'structural_damage_found',
  'material_degradation_observed',
] as const;

// ============================================================
// CURRENCY
// ============================================================

// Drizzle returns numeric columns as strings. Always wrap in Number() before formatting.
export function formatCurrency(amount: number): string {
  if (!amount || amount === 0) return '₹0';
  return '₹' + amount.toLocaleString('en-IN');
}

export function formatSalary(monthly: number | string | null | undefined): string {
  if (monthly === null || monthly === undefined) return 'Salary not disclosed';
  const n = Number(monthly);
  if (isNaN(n) || n === 0) return 'Salary not disclosed';
  return '₹' + n.toLocaleString('en-IN') + '/month';
}

// Parses the lower bound of a payScale range string like "₹44,900 – ₹1,42,400"
// and returns a formatted cost-per-day string like "~₹1,497/day".
export function formatSalaryPerDay(payScale: string | null | undefined): string | null {
  if (!payScale) return null;
  const raw = payScale.split('–')[0]?.replace(/[₹,\s]/g, '');
  if (!raw) return null;
  const lower = parseInt(raw, 10);
  if (isNaN(lower) || lower === 0) return null;
  const perDay = Math.round(lower / 30);
  return '~₹' + perDay.toLocaleString('en-IN') + '/day';
}

// ============================================================
// TIME
// ============================================================

export function builtMonthsAgo(completionEvent: EventData | undefined): string {
  if (!completionEvent) return 'Date unknown';
  const start = new Date(completionEvent.timestamp);
  const now = new Date();
  const months = Math.floor(
    (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30.44),
  );
  if (months < 1) return 'Less than a month ago';
  if (months === 1) return '1 month ago';
  return `${months} months ago`;
}

// critical/dangerous/warning → "X days" (implies failure)
// good → "X days and counting" (neutral)
export function daysLasted(
  completionEvent: EventData | undefined,
  healthStatus: string | null | undefined,
): string {
  if (!completionEvent) return 'Unknown';
  const certified = new Date(completionEvent.timestamp);
  const now = new Date();
  const days = Math.floor(
    (now.getTime() - certified.getTime()) / (1000 * 60 * 60 * 24),
  );
  const isFailure = ['critical', 'dangerous', 'warning'].includes(healthStatus ?? '');
  return isFailure ? `${days} days` : `${days} days and counting`;
}

// Output: "3 Apr 2025"
export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return 'Date unknown';
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

// ============================================================
// BENCHMARKS
// ============================================================

const SCHOOL_BAG_COST = 300; // ₹300 — locked benchmark. Do not change without design approval.

export function benchmarkBags(netDisbursed: number): string {
  if (!netDisbursed) return '0';
  return Math.round(netDisbursed / SCHOOL_BAG_COST).toLocaleString('en-IN');
}

// PM POSHAN (mid-day meal scheme) cooking cost per child per day — primary schools.
// Central government rate 2024-25: ₹5.45/meal. Source: MoE notification.
const MIDDAY_MEAL_COST = 5.45;

export function benchmarkMeals(netDisbursed: number): string {
  if (!netDisbursed) return '0';
  return Math.round(netDisbursed / MIDDAY_MEAL_COST).toLocaleString('en-IN');
}

export function benchmarkJeMonths(
  netDisbursed: number,
  certifierPerson: PersonData | undefined,
): string {
  const salary = Number(certifierPerson?.monthlySalary ?? 0);
  if (!salary || isNaN(salary)) return 'Unknown';
  return String(Math.round(netDisbursed / salary));
}

// ============================================================
// SECTION LOGIC
// ============================================================

export function section4Title(healthStatus: string | null | undefined): string {
  if (['critical', 'dangerous', 'warning'].includes(healthStatus ?? '')) {
    return 'The Betrayal';
  }
  return 'Your Money, Well Spent';
}

// ============================================================
// LABELS
// ============================================================

export function photoSourceLabel(source: string | null | undefined): string {
  const map: Record<string, string> = {
    citizen: 'CITIZEN REPORTED',
    official: 'FIELD VERIFIED',
    contractor: 'CONTRACTOR SUBMITTED',
    system: 'SYSTEM RECORDED',
    sensor: 'SENSOR DATA',
  };
  return map[source ?? ''] ?? 'SOURCE UNKNOWN';
}

export function getAccountabilityLabel(status: string | null | undefined): string {
  const map: Record<string, string> = {
    waiting_for_audit: 'NOT YET REVIEWED',
    response_pending:  'NO REPLY YET',
    responded:         'RESPONDED',
    charged:           'CHARGED',
  };
  return map[status ?? ''] ?? 'STATUS UNKNOWN';
}

// Composite key required — same role means different things on different events.
// Fallback is a safe citizen-facing string, never raw debug output.
export function getActionLabel(role: string, eventType: string): string {
  const key = `${role}::${eventType}`;
  const map: Record<string, string> = {
    'certifier::completion_claimed': 'Signed off that the work was done',
    'certifier::lab_test_report_submitted': 'Signed off on the lab test results',
    'certifier::inspection_conducted': 'Signed off on the site inspection',
    'certifier::third_party_inspection_conducted': 'Signed off on the third-party inspection',
    'authoriser::payment_released': 'Cleared the payment to the contractor',
    'authoriser::budget_sanctioned': 'Approved the project budget',
    'authoriser::budget_released': 'Released the project funds',
    'authoriser::completion_claimed': 'Gave the final sign-off on this road',
    'authoriser::work_order_issued': 'Approved the work order',
    'assignee::work_order_issued': 'Took the contract to build this road',
    'assignee::repair_done': 'Took the contract to carry out repairs',
    'reporter::payment_released': 'Wrote and filed the payment request',
    'reporter::rti_filed': 'Filed RTI application',
    'reporter::pothole_found': 'Reported pothole',
    'reporter::crack_found': 'Reported surface crack',
    'reporter::flooding_reported': 'Reported road flooding',
    'witness::completion_claimed': 'Was present at the completion sign-off',
    'witness::inspection_conducted': 'Was present at the site inspection',
  };
  return map[key] ?? 'Involved in this project';
}

export function getInitials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (
    parts[0].charAt(0).toUpperCase() +
    parts[parts.length - 1].charAt(0).toUpperCase()
  );
}

// months < 2 → "a month", < 12 → "X months", else → "over a year"
export function formatFailureDuration(completionDate: Date | string | null | undefined): string {
  if (!completionDate) return 'an unknown period';
  const months = Math.floor(
    (new Date().getTime() - new Date(completionDate).getTime())
    / (1000 * 60 * 60 * 24 * 30.44),
  );
  if (months < 2) return 'a month';
  if (months < 12) return `${months} months`;
  return 'over a year';
}

// ============================================================
// HERO IMAGE ART DIRECTION
// ============================================================

// Generates 3 Cloudinary crop URLs from the stored `url` (which has q_auto,f_auto).
// Returns the original url for all sizes if the URL doesn't match the expected pattern.
export function getHeroCrops(url: string): { mobile: string; laptop: string; desktop: string } {
  if (!url.includes('/upload/q_auto')) return { mobile: url, laptop: url, desktop: url };
  const crop = (t: string) => url.replace('/upload/', `/upload/${t}/`);
  return {
    mobile:  url,
    laptop:  crop('c_fill,ar_1.6,g_auto'),
    desktop: crop('c_fill,ar_1.78,g_auto'),
  };
}

// Uses dlpEndDate from evidence (field name per DATA_MODEL.md and seed).
export function dlpStatusLabel(dlpEvent: EventData | undefined): string {
  if (!dlpEvent) return 'No DLP recorded';
  const { dlpEndDate } = extractDlpEvidence(dlpEvent.evidence);
  if (!dlpEndDate) return 'DLP active';
  const now = new Date();
  const formatted = dlpEndDate.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  return dlpEndDate > now ? `DLP active until ${formatted}` : `DLP expired ${formatted}`;
}
