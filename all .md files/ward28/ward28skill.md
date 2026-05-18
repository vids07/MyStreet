# WARD 28 — RTI DATA SKILL
## For: AI Agent (Claude Code or equivalent)
## Purpose: Know exactly which file to read before doing any data task.

---

## READ THIS FIRST

This project is MyStreet — a civic accountability platform. Every value displayed publicly must be traceable to a source document. The source is a 41-page RTI response for Ward 28, Roorkee.

The RTI data is split across 5 files. You do not read all 5 for every task. You read only what the task requires. This file tells you which one.

**One rule above all:** If a field is marked CONFLICT in any file, do not ingest it, display it, or compute from it until the conflict is resolved. The conflict resolution file is `WARD28_05_CONFLICTS.md`. Read it first when any doubt exists.

---

## THE 5 FILES

| File | What it contains | When to read it |
|---|---|---|
| `WARD28_01_ROAD_CONTRACT.md` | Road identity, budget, tender, agreement, work order, BOQ, payment, payment register | Touching financial data, contract events, or road-level fields |
| `WARD28_02_PERSONS.md` | All 13 persons — names, designations, documents signed, DB mappings, eliminated bidders | Adding, updating, or querying any person record |
| `WARD28_03_EVENTS.md` | All 11 events in chronological order with full evidence JSON | Seeding or updating events table |
| `WARD28_04_LAB_RTI.md` | Lab test report details, RTI application and response details | Lab test event, RTI events, or anything from Page 6 or covering letter |
| `WARD28_05_CONFLICTS.md` | All conflicts, absences, and anomalies | Before ingesting any CONFLICT field — always read this first if unsure |

---

## TASK → FILE ROUTING

**"Seed or update the events table"**
→ Read `WARD28_03_EVENTS.md` — full evidence JSON is there, ready to copy.
→ Then read `WARD28_05_CONFLICTS.md` — check if any field you're about to use is flagged.

**"Add or update a person"**
→ Read `WARD28_02_PERSONS.md` — all 13 persons with DB column mappings.
→ Never invent a designation or job description — it must match the source page cited.

**"Fix or update financial figures"**
→ Read `WARD28_01_ROAD_CONTRACT.md` Parts 2, 6, 7.
→ Then check `WARD28_05_CONFLICTS.md` Conflicts 1, 5, 10 before touching any amount.

**"Update the lab test event"**
→ Read `WARD28_04_LAB_RTI.md` Part 1 entirely.
→ All evidence fields including jobOrderNo, letterRefNo, preparedBy are there.

**"Update the RTI events"**
→ Read `WARD28_04_LAB_RTI.md` Part 2.
→ Events 10 and 11 in `WARD28_03_EVENTS.md` also have the full evidence JSON.

**"Display ghost drain amount in Section 4"**
→ Stop. Read `WARD28_05_CONFLICTS.md` Conflict 5 first.
→ ₹98,293 does not appear in the RTI. Do not display it until founder confirms source.

**"Add eliminated bidder data"**
→ Read `WARD28_02_PERSONS.md` — Eliminated Bidders section at the bottom.
→ These are context only — do not seed as persons unless a bidder tracking feature is built.

**"Seed or check the payment register (other roads)"**
→ Read `WARD28_01_ROAD_CONTRACT.md` Part 8.

**"Check what's missing from the RTI"**
→ Read `WARD28_05_CONFLICTS.md` Part 2 — What Is Not In The RTI.

**"Check signing order / accountability chain"**
→ Read `WARD28_02_PERSONS.md` — Elimination Sheet Signing Hierarchy section.

**"Verify a date"**
→ Read `WARD28_05_CONFLICTS.md` Conflicts 2 and 3 first.
→ Work order date and contract completion date both have conflicts.

**"Work on DLP or security deposit"**
→ Read `WARD28_01_ROAD_CONTRACT.md` Part 3 (Agreement) and Part 5 (Completion).
→ Read `WARD28_05_CONFLICTS.md` Conflict 1 — FDR 6999 amount is unresolved.

---

## CONFIDENCE LEVELS — WHAT THEY MEAN FOR YOU

| Level | What it means | What you do |
|---|---|---|
| HIGH | Value is clear and unambiguous in the document | Ingest directly |
| MEDIUM | Value is inferred or partially legible | Ingest but add a note in evidence |
| LOW | Value assumed from context | Do not ingest without flagging to founder |
| CONFLICT | Same field has different values on two pages | Do not ingest. Read Conflict file. |

---

## DB TABLE MAP

| What you're seeding | Table |
|---|---|
| Road identity | `roads` |
| Officials, contractor, citizens | `persons` |
| Timeline events | `events` |
| Who was involved in each event | `event_participants` |
| Photos | `photos` |
| Drain records | `drains` |
| Road segments | `segments` |

All event evidence goes into `events.evidence` as JSONB.
Never hardcode a value that exists in the database. Never display a value not traceable to a source page.

---

## THINGS YOU MUST NEVER DO

- Display ₹98,293 as the ghost drain amount — source unconfirmed (Conflict 5)
- Use FDR No. 6999 amount in any calculation — two different amounts on two pages (Conflict 1)
- Split Karmendra Singh into two persons without verification (Conflict 7)
- Add "Assistant Municipal Commissioner" as a new person without verification (Conflict 9)
- Seed any LOW confidence value without flagging it
- Resolve any CONFLICT by picking one value without checking physical document
- Invent a designation, job description, or salary not present in the RTI files