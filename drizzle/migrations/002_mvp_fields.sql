-- Migration 002 — MVP Fields
-- Run order: Migration 4 → Migration 1 → Migration 3 → Migration 2
-- Reason: Migration 2 adds a FK on photos referencing persons.
--         persons must be fully updated before photos references it.
-- Run with: npx drizzle-kit migrate

-- ============================================================
-- MIGRATION 4 — persons table (run first)
-- ============================================================

CREATE TYPE accountability_status AS ENUM (
  'waiting_for_audit',
  'response_pending',
  'responded',
  'charged'
);

ALTER TABLE persons
  ADD COLUMN accountability_status accountability_status,
  ADD COLUMN job_description        TEXT,
  ADD COLUMN license_number         TEXT;

-- Populate Ward 28 persons

-- Shubham Sharma (contractor)
-- license_number NULL — no real license number in RTI documents. Do not invent one.
UPDATE persons SET
  accountability_status = 'waiting_for_audit',
  job_description = 'Responsible for material quality, construction standards, and delivery timeline as per contract terms.',
  license_number = NULL
WHERE full_name = 'Shubham Sharma' AND person_category = 'contractor';

-- Gurudayal Singh (JE — certifier on completion)
UPDATE persons SET
  accountability_status = 'response_pending',
  job_description = 'Responsible for on-site quality verification and signing off construction as complete and standard-compliant.'
WHERE full_name = 'Gurudayal Singh';

-- Prem Kumar Sharma (AE — certifier on completion)
UPDATE persons SET
  accountability_status = 'response_pending',
  job_description = 'Responsible for supervising the Junior Engineer and verifying technical compliance before signing off.'
WHERE full_name = 'Prem Kumar Sharma';

-- Alok Singh Mishravaan (EE — authoriser on completion)
UPDATE persons SET
  accountability_status = 'waiting_for_audit',
  job_description = 'Responsible for final administrative authorisation of project completion and quality sign-off.'
WHERE full_name = 'Alok Singh Mishravaan';

-- Prashant Kumar (Finance — authoriser on payment)
UPDATE persons SET
  accountability_status = 'waiting_for_audit',
  job_description = 'Responsible for verifying financial records and authorising payment disbursement.'
WHERE full_name = 'Prashant Kumar';

-- Jitendra Kumar (Commissioner)
UPDATE persons SET
  accountability_status = 'waiting_for_audit',
  job_description = 'Municipal Commissioner. Ultimate administrative authority over all ward-level public works.'
WHERE full_name = 'Jitendra Kumar';

-- ============================================================
-- MIGRATION 1 — roads table (run second)
-- ============================================================

ALTER TABLE roads
  ADD COLUMN ward TEXT,
  ADD COLUMN city TEXT;

UPDATE roads
SET ward = 'Ward 28', city = 'Roorkee'
WHERE road_system_id = 'UK-RKE-29.8723-77.8813';

-- ============================================================
-- MIGRATION 3 — drains table (run third)
-- ============================================================

-- Note: 'partial' is intentionally excluded — no design spec exists for it.
CREATE TYPE drain_status AS ENUM ('not_built', 'broken', 'blocked', 'functional');

ALTER TABLE drains
  ADD COLUMN status drain_status;

UPDATE drains SET status = 'not_built'
WHERE segment_id = (
  SELECT id FROM segments
  WHERE road_id = (
    SELECT id FROM roads WHERE road_system_id = 'UK-RKE-29.8723-77.8813'
  )
);

-- ============================================================
-- MIGRATION 2 — photos table (run last)
-- ============================================================

-- Note: photo_status and health_status are distinct types.
-- photo_status describes what a specific photo shows.
-- health_status describes the road as a whole.
CREATE TYPE photo_status AS ENUM ('critical', 'warning', 'good', 'informational');

ALTER TABLE photos
  ADD COLUMN status         photo_status,
  ADD COLUMN location_label TEXT,
  ADD COLUMN person_id      UUID REFERENCES persons(id) ON DELETE SET NULL;

-- Populate all 5 Ward 28 photos
UPDATE photos SET
  status = 'critical',
  location_label = 'Ward 28, Near Ajay Raj House, Roorkee',
  person_id = NULL
WHERE road_id = (SELECT id FROM roads WHERE road_system_id = 'UK-RKE-29.8723-77.8813');
