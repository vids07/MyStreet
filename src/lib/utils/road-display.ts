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
} {
  const e = asRecord(evidence);
  return {
    netDisbursed: Number(e.netDisbursed ?? 0),
  };
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

// ============================================================
// TIME
// ============================================================

export function builtMonthsAgo(tenderEvent: EventData | undefined): string {
  if (!tenderEvent) return 'Date unknown';
  const start = new Date(tenderEvent.timestamp);
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
    waiting_for_audit: 'WAITING FOR AUDIT',
    response_pending: 'RESPONSE PENDING',
    responded: 'RESPONDED',
    charged: 'CHARGED',
  };
  return map[status ?? ''] ?? 'STATUS UNKNOWN';
}

// Composite key required — same role means different things on different events.
// Fallback is a safe citizen-facing string, never raw debug output.
export function getActionLabel(role: string, eventType: string): string {
  const key = `${role}::${eventType}`;
  const map: Record<string, string> = {
    'certifier::completion_claimed': 'Signed completion certificate',
    'certifier::lab_test_report_submitted': 'Certified lab test results',
    'certifier::inspection_conducted': 'Signed inspection report',
    'certifier::third_party_inspection_conducted': 'Certified third-party inspection',
    'authoriser::payment_released': 'Authorised payment disbursement',
    'authoriser::budget_sanctioned': 'Sanctioned project budget',
    'authoriser::budget_released': 'Released project funds',
    'authoriser::completion_claimed': 'Authorised project completion',
    'authoriser::work_order_issued': 'Authorised work order',
    'assignee::work_order_issued': 'Assigned as lead contractor',
    'assignee::repair_done': 'Assigned to carry out repairs',
    'reporter::payment_released': 'Drafted and submitted the payment request note sheet',
    'reporter::rti_filed': 'Filed RTI application',
    'reporter::pothole_found': 'Reported pothole',
    'reporter::crack_found': 'Reported surface crack',
    'reporter::flooding_reported': 'Reported road flooding',
    'witness::completion_claimed': 'Witnessed completion sign-off',
    'witness::inspection_conducted': 'Witnessed inspection',
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
    mobile:  crop('c_fill,ar_0.67,g_auto'),
    laptop:  crop('c_fill,ar_1.6,g_auto'),
    desktop: crop('c_fill,ar_1.78,g_auto'),
  };
}

// Uses dlpEndDate from evidence (field name per DATA_MODEL.md and seed).
export function dlpStatusLabel(dlpEvent: EventData | undefined): string {
  if (!dlpEvent) return 'No DLP recorded';
  const evidence = dlpEvent.evidence as Record<string, unknown> | null;
  const expiryDate = evidence?.dlpEndDate as string | undefined;
  if (!expiryDate) return 'DLP active';
  const expiry = new Date(expiryDate);
  const now = new Date();
  const formatted = expiry.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  return expiry > now ? `DLP active until ${formatted}` : `DLP expired ${formatted}`;
}
