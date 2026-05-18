-- Migration 004 — data_confidence column on event_participants
-- Moves HIGH/LOW/MEDIUM confidence annotations from seed comments into the DB.
-- Default: 'unconfirmed' — conservative. Never assume data is verified.

CREATE TYPE data_confidence AS ENUM ('verified', 'probable', 'unconfirmed');

ALTER TABLE event_participants
  ADD COLUMN data_confidence data_confidence NOT NULL DEFAULT 'unconfirmed';
