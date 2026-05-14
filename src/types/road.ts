import type { getFullRoadData } from '@/server/queries/road';

export type FullRoadData = NonNullable<Awaited<ReturnType<typeof getFullRoadData>>>;
export type RoadData = FullRoadData['road'];
export type SegmentData = FullRoadData['segments'][number];
export type EventData = FullRoadData['events'][number];
export type ParticipantData = EventData['participants'][number];
export type PersonData = NonNullable<ParticipantData['person']>;
export type PhotoData = FullRoadData['photos'][number];
export type DrainData = FullRoadData['drains'][number];

// Event type constants — use these everywhere, never magic strings
export const EVENT_TYPES = {
  WORK_ORDER_ISSUED: 'work_order_issued',
  CONSTRUCTION_STARTED: 'construction_started',
  INSPECTION_CONDUCTED: 'inspection_conducted',
  COMPLETION_CLAIMED: 'completion_claimed',
  BUDGET_SANCTIONED: 'budget_sanctioned',
  BUDGET_RELEASED: 'budget_released',
  PAYMENT_RELEASED: 'payment_released',
  DLP_STARTED: 'dlp_started',
  DLP_ENDED: 'dlp_ended',
  ROAD_REBUILT: 'road_rebuilt',
  HEALTH_STATUS_CHANGED: 'health_status_changed',
  POTHOLE_FOUND: 'pothole_found',
  CRACK_FOUND: 'crack_found',
  FLOODING_REPORTED: 'flooding_reported',
  DRAIN_BLOCKED: 'drain_blocked',
  STRUCTURAL_DAMAGE_FOUND: 'structural_damage_found',
  MATERIAL_DEGRADATION_OBSERVED: 'material_degradation_observed',
  REPAIR_DONE: 'repair_done',
  RTI_FILED: 'rti_filed',
  RTI_RESPONSE_RECEIVED: 'rti_response_received',
  RTI_IGNORED: 'rti_ignored',
  TICKET_RAISED: 'ticket_raised',
  TICKET_RESOLVED: 'ticket_resolved',
  ESCALATION_TRIGGERED: 'escalation_triggered',
  WHISTLEBLOWER_REPORT: 'whistleblower_report',
  ACCIDENT_OR_INJURY_RECORDED: 'accident_or_injury_recorded',
  LAB_TEST_REPORT_SUBMITTED: 'lab_test_report_submitted',
  THIRD_PARTY_INSPECTION_CONDUCTED: 'third_party_inspection_conducted',
  SENSOR_READING_RECORDED: 'sensor_reading_recorded',
} as const;

export type EventType = typeof EVENT_TYPES[keyof typeof EVENT_TYPES];

// Health status constants
export const HEALTH_STATUS = {
  GOOD: 'good',
  WARNING: 'warning',
  CRITICAL: 'critical',
  DANGEROUS: 'dangerous',
} as const;

export type HealthStatus = typeof HEALTH_STATUS[keyof typeof HEALTH_STATUS];

// Severity constants
export const SEVERITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
} as const;

export type Severity = typeof SEVERITY[keyof typeof SEVERITY];
