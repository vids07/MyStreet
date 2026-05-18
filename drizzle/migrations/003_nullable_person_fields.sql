-- Migration 003 — Make persons.designation and persons.department nullable
-- Reason: RTI documents do not provide designation/department for all person categories
-- (citizens have no designation; some officials have ambiguous roles).
-- Fake placeholder strings are worse than NULL on an accountability platform.

ALTER TABLE persons
  ALTER COLUMN designation DROP NOT NULL,
  ALTER COLUMN department  DROP NOT NULL;

-- Remove placeholder strings written to satisfy the old NOT NULL constraint
UPDATE persons SET designation = NULL WHERE designation = 'RTI Applicant';
UPDATE persons SET department  = NULL WHERE department  = 'Citizen';
