import { eq } from 'drizzle-orm';
import { db } from './index';
import { roads } from './schema/road';
import { segments } from './schema/segment';
import { drains } from './schema/drain';
import { events } from './schema/event';
import { eventParticipants } from './schema/event-participants';
import { persons } from './schema/person';
import { photos } from './schema/photo';

async function seed() {
  console.log('Clearing existing data...');
  await db.delete(eventParticipants);
  await db.delete(events);
  await db.delete(drains);
  await db.delete(segments);
  await db.delete(roads);
  await db.delete(persons);

  // ============================================================
  // PERSONS — Section 2, WARD28_VERIFIED_DATA.md
  // All 13 persons. Values from RTI documents only.
  // Schema constraint note: fullName, designation, department are
  // NOT NULL in schema. Where document says NULL or NEEDS VERIFICATION,
  // a descriptive string is used — schema cannot accept null here.
  // ============================================================

  console.log('Seeding persons...');

  // Person 1 — Contractor / Firm Proprietor
  const [shubhamSharma] = await db.insert(persons).values({
    fullName: 'Shubham Sharma',
    designation: 'Proprietor',
    designationPlain: null,
    department: 'M/s R.D. Infra, Roorkee',
    personCategory: 'contractor',
    contactOrId: 'GST No. 05GDAPS2236H1ZN',
    jurisdiction: 'Roorkee, Distt. Haridwar, Uttarakhand',
    monthlySalary: null,
    salarySource: null,
    photoUrl: null,
    photoSource: null,
    accountabilityStatus: 'waiting_for_audit',
    jobDescription: 'Responsible for material quality, construction standards, and delivery timeline as per contract terms.',
    licenseNumber: null,
  }).returning();

  // Person 2 — Junior Engineer (JE)
  // fullName: Gurukesh Singh — verified from RTI documents (Page 11).
  const [juniorEngineer] = await db.insert(persons).values({
    fullName: 'Gurukesh Singh',
    designation: 'Junior Engineer',
    designationPlain: null,
    department: 'Nagar Nigam Roorkee',
    personCategory: 'official',
    contactOrId: null,
    jurisdiction: null,
    monthlySalary: null,
    salarySource: null,
    photoUrl: null,
    photoSource: null,
    accountabilityStatus: 'response_pending',
    jobDescription: 'Responsible for on-site quality verification and signing off construction as complete and standard-compliant.',
    licenseNumber: null,
  }).returning();

  // Person 3 — Assistant Engineer (AE)
  // fullName: Prem Kumar Sharma — verified from RTI documents (Page 11).
  const [assistantEngineer] = await db.insert(persons).values({
    fullName: 'Prem Kumar Sharma',
    designation: 'Assistant Engineer',
    designationPlain: null,
    department: 'Nagar Nigam Roorkee',
    personCategory: 'official',
    contactOrId: null,
    jurisdiction: null,
    monthlySalary: null,
    salarySource: null,
    photoUrl: null,
    photoSource: null,
    accountabilityStatus: 'response_pending',
    jobDescription: 'Responsible for supervising the Junior Engineer and verifying technical compliance before signing off.',
    licenseNumber: null,
  }).returning();

  // Person 4 — Executive Engineer (EE)
  // fullName: Aashray Singh Mishra — verified from RTI documents (Page 11).
  const [executiveEngineer] = await db.insert(persons).values({
    fullName: 'Aashray Singh Mishra',
    designation: 'Executive Engineer',
    designationPlain: null,
    department: 'Nagar Nigam Roorkee',
    personCategory: 'official',
    contactOrId: null,
    jurisdiction: null,
    monthlySalary: null,
    salarySource: null,
    photoUrl: null,
    photoSource: null,
    accountabilityStatus: 'waiting_for_audit',
    jobDescription: 'Responsible for final administrative authorisation of project completion and quality sign-off.',
    licenseNumber: null,
  }).returning();

  // Person 5 — Senior Finance Officer
  const [prashantKumar] = await db.insert(persons).values({
    fullName: 'Prashant Kumar',
    designation: 'Senior Finance Officer',
    designationPlain: null,
    department: 'Nagar Nigam Roorkee',
    personCategory: 'official',
    contactOrId: null,
    jurisdiction: null,
    monthlySalary: null,
    salarySource: null,
    photoUrl: null,
    photoSource: null,
    accountabilityStatus: 'waiting_for_audit',
    jobDescription: 'Responsible for verifying financial records and authorising payment disbursement.',
    licenseNumber: null,
  }).returning();

  // Person 6 — Municipal Commissioner
  const [jitendraKumar] = await db.insert(persons).values({
    fullName: 'Jitendra Kumar',
    designation: 'Municipal Commissioner',
    designationPlain: null,
    department: 'Nagar Nigam Roorkee',
    personCategory: 'official',
    contactOrId: null,
    jurisdiction: null,
    monthlySalary: null,
    salarySource: null,
    photoUrl: null,
    photoSource: null,
    accountabilityStatus: 'waiting_for_audit',
    jobDescription: 'Municipal Commissioner. Ultimate administrative authority over all ward-level public works.',
    licenseNumber: null,
  }).returning();

  // Person 7 — Construction Clerk (Note Sheet / Payment)
  const [sachinKumar] = await db.insert(persons).values({
    fullName: 'Sachin Kumar',
    designation: 'Clerk (Construction)',
    designationPlain: null,
    department: 'Nagar Nigam Roorkee',
    personCategory: 'official',
    contactOrId: null,
    jurisdiction: null,
    monthlySalary: null,
    salarySource: null,
    photoUrl: null,
    photoSource: null,
    accountabilityStatus: 'waiting_for_audit',
    jobDescription: 'Drafted and submitted the official note sheet to the Municipal Commissioner, formally initiating the payment release process after work completion.',
    licenseNumber: null,
  }).returning();

  // Person 8 — Public Information Officer (PIO)
  // fullName: NULL per document — no personal name disclosed in any of the 41 pages.
  // Schema requires NOT NULL — using descriptive placeholder.
  const [pio] = await db.insert(persons).values({
    fullName: 'Unknown — PIO name not disclosed in RTI response', // NULL per WARD28_VERIFIED_DATA.md — schema requires NOT NULL
    designation: 'Public Information Officer',
    designationPlain: null,
    department: 'Nagar Nigam Roorkee',
    personCategory: 'official',
    contactOrId: null,
    jurisdiction: null,
    monthlySalary: null,
    salarySource: null,
    photoUrl: null,
    photoSource: null,
    accountabilityStatus: null,
    jobDescription: null,
    licenseNumber: null,
  }).returning();

  // Person 9 — Construction Clerk (Payment Register)
  const [mohanSingh] = await db.insert(persons).values({
    fullName: 'Mohan Singh',
    designation: 'Construction Clerk',
    designationPlain: null,
    department: 'Nagar Nigam Roorkee',
    personCategory: 'official',
    contactOrId: null,
    jurisdiction: null,
    monthlySalary: null,
    salarySource: null,
    photoUrl: null,
    photoSource: null,
    accountabilityStatus: null,
    jobDescription: null,
    licenseNumber: null,
  }).returning();

  // Person 10 — Construction Clerk (Elimination Sheet)
  const [narendraSinghRawat] = await db.insert(persons).values({
    fullName: 'Narendra Singh Rawat',
    designation: 'Construction Clerk',
    designationPlain: null,
    department: 'Nagar Nigam Roorkee',
    personCategory: 'official',
    contactOrId: null,
    jurisdiction: null,
    monthlySalary: null,
    salarySource: null,
    photoUrl: null,
    photoSource: null,
    accountabilityStatus: null,
    jobDescription: null,
    licenseNumber: null,
  }).returning();

  // Person 11 — Finance Officer / District Magistrate Approver
  // NEEDS VERIFICATION — see WARD28_VERIFIED_DATA.md Section 2
  // One name with two roles separated by "/". Cannot determine if one person or two.
  const [karmendrasingh] = await db.insert(persons).values({
    fullName: 'Karmendra Singh',
    designation: 'Finance Officer (Nagar Nigam Roorkee) / District Magistrate, Haridwar', // NEEDS VERIFICATION — see WARD28_VERIFIED_DATA.md Section 2
    designationPlain: null,
    department: 'Nagar Nigam Roorkee / District Magistrate Office, Haridwar',
    personCategory: 'official',
    contactOrId: null,
    jurisdiction: null,
    monthlySalary: null,
    salarySource: null,
    photoUrl: null,
    photoSource: null,
    accountabilityStatus: null,
    jobDescription: null,
    licenseNumber: null,
  }).returning();

  // Person 12 — RTI Applicant
  // designation: NULL per document — schema requires NOT NULL — using descriptive placeholder.
  // department: NULL per document — schema requires NOT NULL — using descriptive placeholder.
  const [vidushi] = await db.insert(persons).values({
    fullName: 'Vidushi',
    designation: null,
    designationPlain: null,
    department: null,
    personCategory: 'citizen',
    contactOrId: null,
    jurisdiction: 'House No. 247/7, Purvi Deen Dayal, Roorkee, District Haridwar, Uttarakhand',
    monthlySalary: null,
    salarySource: null,
    photoUrl: null,
    photoSource: null,
    accountabilityStatus: null,
    jobDescription: null,
    licenseNumber: null,
  }).returning();

  // Person 13 — Lab Test Authorised Signatory
  const [pranavDixit] = await db.insert(persons).values({
    fullName: 'Pranav Dixit',
    designation: 'Tech-Manager',
    designationPlain: null,
    department: 'Infratest Investigation & Research Centre Pvt. Ltd., Roorkee',
    personCategory: 'official',
    contactOrId: null,
    jurisdiction: null,
    monthlySalary: null,
    salarySource: null,
    photoUrl: null,
    photoSource: null,
    accountabilityStatus: null,
    jobDescription: null,
    licenseNumber: null,
  }).returning();

  // karmendrasingh seeded but not linked to any event — ambiguous role, see Ward28 05 conflicts.md Conflict 7
  void karmendrasingh;

  console.log('Persons seeded:', 13);

  // ============================================================
  // ROAD — Section 1, WARD28_VERIFIED_DATA.md
  // roadSystemId: NULL per document — schema NOT NULL — retaining system identifier.
  // geometry: NULL per document — schema NOT NULL — using empty object.
  // healthStatus: NULL per document.
  // ============================================================

  console.log('Seeding road...');

  const [road] = await db.insert(roads).values({
    roadSystemId: 'UK-RKE-29.8723-77.8813', // NULL per WARD28_VERIFIED_DATA.md — schema requires NOT NULL
    roadDisplayName: "Ward No. 28, from Vijendra's shop towards the house of Ajay Raj, Roorkee",
    ward: 'Ward 28',
    city: 'Roorkee',
    geometry: {}, // NULL per WARD28_VERIFIED_DATA.md — schema requires NOT NULL
    healthStatus: 'critical', // Set by founder based on field observation — not from RTI documents.
    healthStatusUpdatedAt: null,
    healthStatusUpdatedBy: null,
  }).returning();

  console.log('Road seeded:', road.roadSystemId);

  // ============================================================
  // SEGMENT — Section 6, WARD28_VERIFIED_DATA.md
  // area: 363.30 SQM | surfaceThickness: 80mm
  // length: NULL per document — schema NOT NULL — using 0.
  // width: NULL per document — schema NOT NULL — using 0.
  // segmentDisplayName, segmentCoordinates, geometry: not in document —
  //   schema NOT NULL — using minimal placeholders.
  // ============================================================

  console.log('Seeding segment...');

  const [segment] = await db.insert(segments).values({
    roadId: road.id,
    segmentDisplayName: 'Ward 28 Interlocking Tile Pavement', // not in WARD28_VERIFIED_DATA.md — schema requires NOT NULL
    segmentCoordinates: {}, // not in WARD28_VERIFIED_DATA.md — schema requires NOT NULL
    geometry: {}, // not in WARD28_VERIFIED_DATA.md — schema requires NOT NULL
    length: '0', // NULL per WARD28_VERIFIED_DATA.md Section 6 — schema requires NOT NULL
    width: '0', // NULL per WARD28_VERIFIED_DATA.md Section 6 — schema requires NOT NULL
    area: '363.30',
    surfaceThickness: '80',
  }).returning();

  console.log('Segment seeded:', 1);

  // ============================================================
  // DRAIN — Section 6, WARD28_VERIFIED_DATA.md
  // All dimension fields null per document — physical existence unverified.
  // length, width, depth, area: NULL per document — schema NOT NULL — using 0.
  // status: NULL per document — not yet field verified.
  // drainDisplayName: not in document — schema NOT NULL — using minimal placeholder.
  // ============================================================

  console.log('Seeding drain...');

  await db.insert(drains).values({
    segmentId: segment.id,
    drainDisplayName: 'Naali (Drain) — Ward 28', // not in WARD28_VERIFIED_DATA.md — schema requires NOT NULL
    length: '0', // NULL per WARD28_VERIFIED_DATA.md Section 6 — schema requires NOT NULL
    width: '0', // NULL per WARD28_VERIFIED_DATA.md Section 6 — schema requires NOT NULL
    depth: '0', // NULL per WARD28_VERIFIED_DATA.md Section 6 — schema requires NOT NULL
    area: '0', // NULL per WARD28_VERIFIED_DATA.md Section 6 — schema requires NOT NULL
    status: null,
  });

  console.log('Drain seeded:', 1);

  // ============================================================
  // EVENTS — Section 3, WARD28_VERIFIED_DATA.md
  // All 11 events in chronological order. Evidence JSONB copied exactly.
  // Variable names use document section event numbers (docEvent1–docEvent11).
  // Chronological order differs from document order at positions 3–4:
  //   docEvent4 (Agreement 01.02.2025) inserted before docEvent3 (Work Order 23.02.2025).
  // ============================================================

  console.log('Seeding events...');

  // docEvent1 — Second Tender Invitation / Budget Sanctioned — 19.10.2024
  const [docEvent1] = await db.insert(events).values({
    roadId: road.id,
    segmentId: null,
    eventType: 'budget_sanctioned',
    timestamp: new Date('2024-10-19'),
    description: '130 tenders invited for the second time across multiple interlocking and CC road works, via notice dated 19.10.2024. This was explicitly described as a second invitation round, implying a prior first round for which no documents were provided in this RTI. 15 tenders received across all listed works; multiple eliminated for missing GST certificates, disputed rates, authentication issues, or zero participation.',
    severity: null,
    evidence: {
      "invitationRound": 2,
      "totalTendersInvited": 130,
      "noticeDate": "19.10.2024",
      "totalTendersReceived": 15,
      "eliminationSheetFileNo": "204/Nagar Anu 0/Nagar Nigam Roorkee/2024-25",
      "note": "Elimination sheet covers multiple work serial numbers. Ward 28 (Work Serial No. 07) does not appear in the elimination list — its tender proceeded to award."
    },
    evidenceSource: 'official',
    isFlagged: false,
  }).returning();

  // docEvent2 — Tender Opened and Awarded — 05.12.2024
  const [docEvent2] = await db.insert(events).values({
    roadId: road.id,
    segmentId: null,
    eventType: 'work_order_issued',
    timestamp: new Date('2024-12-05'),
    description: "Tenders received and opened 05.12.2024. Five firms participated for Ward 28 work. M/s R.D. Infra submitted lowest bid at 36.10% below estimated amount (Rs. 3,87,234). Tender Committee accepted 13.12.2024.",
    severity: null,
    evidence: {
      "isTender": true,
      "estimatedValue": 606000,
      "contractValue": 387234,
      "discountPercent": 36.10,
      "tenderCommitteeApprovalDate": "13.12.2024",
      "tenderCallPeriod": "01.12.2024 to 03.12.2024",
      "tenderReceivedDate": "05.12.2024",
      "tenderOpenedDate": "05.12.2024",
      "tenderValidityDays": 60,
      "durationDays": 45,
      "earnestMoney": 18180,
      "tenderFormCostPlusGST": 1180,
      "workSerialNo": "07",
      "boqEstimatedTotal": 515617.90,
      "winningFirm": "M/s R.D. Infra, Roorkee",
      "winningProprietor": "Shubham Sharma",
      "biddersParticipated": 5,
      "bids": [
        {
          "firm": "M/s R.D. Infra (Shubham Sharma)",
          "rateVsEstimated": "36.10% Below",
          "contractValue": 387234,
          "fdmNo": "6999",
          "fdmBank": "Bank of Baroda",
          "fdmDate": "03.12.2024",
          "fdmAmount": 18180,
          "receiptNo": "1698/15",
          "result": "Accepted — L1 (lowest bidder)"
        },
        {
          "firm": "Unknown (Page 20 — SBI FDR No. 42170668764)",
          "rateVsEstimated": "Unknown",
          "fdmNo": "42170668764",
          "fdmBank": "SBI",
          "fdmDate": "11/08/23",
          "fdmAmount": 2500,
          "receiptNo": "1678/12",
          "anomaly": "FDR predates tender by approximately 16 months. Amount Rs. 2,500 is 13.8% of required EMD Rs. 18,180. Both are serious procedural anomalies.",
          "result": "Unknown — presumed eliminated or disqualified"
        },
        {
          "firm": "M/s Mahul Singh / M/s Mahesh Singh Contractor (name conflict — see Gap 11)",
          "rateVsEstimated": "25% Above",
          "address": "Shamben, Rampur",
          "result": "Eliminated — rate above estimated"
        },
        {
          "firm": "M/s Aman Trading Co. (Upendra Singh)",
          "rateVsEstimated": "95.50% Above",
          "fdmNo": "787261",
          "fdmBank": "Canara Bank, Troni Talmanas Branch",
          "fdmDate": "30-11-2024",
          "fdmAmount": 75600,
          "receiptNo": "1678/09",
          "registrationGrade": "A",
          "registrationValidity": "31.03.2024",
          "anomaly": "Registration expired 31.03.2024 — over 8 months before tender call. Bid was accepted into process despite expired registration.",
          "result": "Eliminated — rate above estimated"
        },
        {
          "firm": "M/s Mukram Rao Contractor (Mukram Rao)",
          "rateVsEstimated": "25% Above",
          "fdmNo": "8906716",
          "fdmBank": "IDBT (possibly IDBI — abbreviated in document)",
          "fdmDate": "05-10-2024",
          "fdmAmount": 20000,
          "receiptNo": "1678/37",
          "registrationGrade": "A0",
          "registrationValidity": "26.07.2024",
          "anomaly": "Registration expired 26.07.2024 — over 4 months before tender call. Bid accepted despite expired registration.",
          "result": "Eliminated — rate above estimated"
        }
      ],
      "contractorRegistrationVerified": false,
      "contractorRegistrationNote": "Registration certificate of M/s R.D. Infra (winning firm) NOT included in RTI response. Registration certificates provided only for two losing bidders, both with expired registrations."
    },
    evidenceSource: 'official',
    isFlagged: false,
  }).returning();

  // docEvent4 — Agreement / Contract Bond Executed — 01.02.2025 (e-stamp issue date)
  // Inserted here (position 3) because 01.02.2025 precedes docEvent3 work order 23.02.2025.
  const [docEvent4] = await db.insert(events).values({
    roadId: road.id,
    segmentId: null,
    eventType: 'work_order_issued',
    timestamp: new Date('2025-02-01'),
    description: "Contract agreement (e-stamp) executed. M/s R.D. Infra (First Party) and Nagar Nigam Roorkee (Second Party). e-Stamp issued 01.02.2025. Agreement No. 587/Nagar Nigam Roorkee/2024-25 dated 28.02.2025. Security deposits and performance security FDRs deposited. 25 contract terms accepted.",
    severity: null,
    evidence: {
      "eStampCertNo": "IN-UK71963414508710X",
      "eStampUniqueDocRef": "SUBIN-UKUK121520451122761103636X",
      "eStampIssueDate": "01-Feb-2025",
      "eStampIssueTime": "12:44 PM",
      "eStampAccountRef": "NONACC (SV) / uk1215204 / ROORKEE / UK-HD",
      "documentType": "Article 5 — Agreement or Memorandum of an Agreement",
      "stampDutyPaidBy": "R D INFRA",
      "stampDutyAmount": 100,
      "considerationPrice": 0,
      "firstParty": "R D INFRA",
      "secondParty": "NAGAR NIGAM ROORKEE",
      "agreementNo": "587/Nagar Nigam Roorkee/2024-25",
      "agreementDate": "28.02.2025",
      "tenderCommitteeApprovalDate": "13.12.2024",
      "securityDepositFDRs": [
        {"fdrNo": "7245", "bank": "NOT STATED", "date": "19.02.2025", "amount": 6000, "purpose": "security deposit"},
        {"fdrNo": "6998", "bank": "NOT STATED", "date": "03.12.2024", "amount": 33000, "purpose": "security deposit"}
      ],
      "performanceSecurityFDRs": [
        {"fdrNo": "7243", "bank": "NOT STATED", "date": "19.02.2025", "amount": 200000, "purpose": "performance security"},
        {
          "fdrNo": "6999",
          "bank": "NOT STATED",
          "date": "NOT STATED",
          "amount": 18500,
          "purpose": "performance security",
          "conflictNote": "FDR No. 6999 also appears on Page 15 (Tender Form) as Bank of Baroda, dated 03/12/2024, Rs. 18,180 (EMD). Same FDR number, different amounts on two documents. NEEDS VERIFICATION."
        }
      ],
      "inLieuOfZeroNote": "Agreement text states FDRs deposited 'in lieu of zero' — phrase meaning unclear. May mean in lieu of a zero-value/waived requirement. NEEDS VERIFICATION.",
      "dlpMonths": 12,
      "dlpContractTerms": "Terms 11, 12, 23 on Pages 8 and 9"
    },
    evidenceSource: 'official',
    isFlagged: false,
  }).returning();

  // docEvent3 — Work Order Issued — 23.02.2025
  const [docEvent3] = await db.insert(events).values({
    roadId: road.id,
    segmentId: null,
    eventType: 'work_order_issued',
    timestamp: new Date('2025-02-23'),
    description: "Official work order issued to M/s R.D. Infra by Executive Engineer, Nagar Nigam Roorkee. File No. 539/Nagar Anu 0/Nagar Nigam Roorkee/2024-25. Contract value Rs. 3,87,234. Directed to complete within stipulated period, submit geo-tagged photographs before/during/after, and provide written notice of commencement and completion. Payment withheld if EPFO registration absent.",
    severity: null,
    evidence: {
      "isTender": false,
      "workOrderFileNo": "539/Nagar Anu 0/Nagar Nigam Roorkee/2024-25",
      "workOrderDocumentDate": "23.02.2025",
      "contractAmount": 387234,
      "durationDays": 45,
      "issuedBy": "Executive Engineer, Nagar Nigam Roorkee",
      "copiesTo": ["Municipal Commissioner", "Assistant Engineer", "Junior Engineer"],
      "epfoRegistrationRequiredForPayment": true,
      "geoTaggedPhotosRequired": true,
      "dateConflictNote": "This document (Page 10) is dated 23.02.2025. Work Completion Certificate (Page 12, S.No.6) records Date of Work Order as 28.02.2025. NEEDS VERIFICATION."
    },
    evidenceSource: 'official',
    isFlagged: false,
  }).returning();

  // docEvent5 — Construction Started — 28.02.2025
  const [docEvent5] = await db.insert(events).values({
    roadId: road.id,
    segmentId: null,
    eventType: 'construction_started',
    timestamp: new Date('2025-02-28'),
    description: "Construction commenced on 28.02.2025 per contract. Road and drain construction using coloured interlocking tiles in Ward No. 28, from Vijendra's shop to Ajay Raj's house.",
    severity: null,
    evidence: null,
    evidenceSource: 'official',
    isFlagged: false,
  }).returning();

  // docEvent6 — Material Lab Test — 30.03.2025
  const [docEvent6] = await db.insert(events).values({
    roadId: road.id,
    segmentId: null,
    eventType: 'lab_test_report_submitted',
    timestamp: new Date('2025-03-30'),
    description: "Lab test report submitted by NABL-accredited Infratest Investigation & Research Centre Pvt. Ltd. for Interlocking Tiles M-35. 8 samples collected 29.03.2025, tested 29–30.03.2025. Compressive strength average 40.7 N/mm² against minimum requirement 39.1 N/mm². Individual minimum 38.9 N/mm² against requirement 32.0 N/mm². Test passed.",
    severity: null,
    evidence: {
      "labName": "Infratest Investigation & Research Centre Pvt. Ltd.",
      "labAddress": "Back Roorkee Public School, Sherpur, Roorkee, Distt. Haridwar, 247667, Uttarakhand",
      "labPhone": ["+91-9520997251", "+91-9520997254"],
      "labEmail": ["ho.roorkee@infratest.co.in", "infratestlabs@gmail.com"],
      "labWebsite": "https://infratest.co.in",
      "labCertifications": ["ISO 9001:2015", "ISO 14001:2015", "NABL Accredited"],
      "reportNo": "BM250329029",
      "reportDate": "30.03.2025",
      "jobOrderNo": "250329029",
      "sampleReceivedDate": "29.03.2025",
      "sampleQuantity": "08 Pcs.",
      "sampleCondition": "OK",
      "materialType": "Interlocking Tiles M-35",
      "letterRefNo": "Memo/Nagar Nigam Work Inspection/2024-25",
      "letterRefDate": "29.03.2025",
      "issuedTo": "Assistant Municipal Commissioner, Nagar Nigam Roorkee",
      "testLocation": "In Lab",
      "testDates": "29.03.2025 to 30.03.2025",
      "testMethod": "IS: 15658:2021",
      "testCategory": "Mechanical Testing",
      "materialClassification": "Building Material / Road Material",
      "results": {
        "individualResults_N_mm2": [39.8, 42.3, 39.1, 40.5, 40.2, 41.9, 42.6, 38.9],
        "averageResult_N_mm2": 40.7,
        "requirementIndividual_min_N_mm2": 32.0,
        "requirementAverage_min_N_mm2": 39.1,
        "passed": true
      },
      "preparedBy": "Govind",
      "authorisedSignatory": "Pranav Dixit, Tech-Manager",
      "agreementNoRef": "587/Nagar Nigam Roorkee/2024-25",
      "agreementDateRef": "28.02.2025",
      "agencyRef": "M/s R.D. Infra, Roorkee, Distt. Haridwar",
      "labDisclaimer": "Results refer only to submitted samples. Not to be used as court evidence. Sample will be destroyed after 30 days."
    },
    evidenceSource: 'official',
    isFlagged: false,
  }).returning();

  // docEvent7 — Work Completion Claimed and Inspected — 03.04.2025
  const [docEvent7] = await db.insert(events).values({
    roadId: road.id,
    segmentId: null,
    eventType: 'completion_claimed',
    timestamp: new Date('2025-04-03'),
    description: "Work certified as satisfactorily completed at site per specifications. Measurements recorded in Measurement Book No. 86, Pages 175–177, dated 03.04.2025. Inspected same day by Junior Engineer and Assistant Engineer. Countersigned by Executive Engineer. Final bill Rs. 3,86,086. Completed ahead of contract date.",
    severity: null,
    evidence: {
      "measurementDate": "03.04.2025",
      "measurementBookNo": 86,
      "measurementBookPages": "175 to 177",
      "measurementBookConflictNote": "Pages 3 and 5 reference 'page 15/10/22 of Measurement Book No.' with the MB number left blank. Page 1 and Page 3 both reference MB No. 86 pages 175-177. '15/10/22' may be a date (15 Oct 2022) or page numbers — ambiguous. If it is a date from 2022, this predates the project by years. NEEDS VERIFICATION against physical document.",
      "inspectionDate": "03.04.2025",
      "memoOfWorkNo": "687",
      "finalBillAmount": 386086.00,
      "certifiedSatisfactory": true,
      "photosAttachedFlagA": true,
      "measurementBookCopyflagB": true,
      "geoTaggedPhotosRequired": true,
      "geoTaggedPhotosConfirmed": null,
      "geoTaggedPhotosNote": "Contract Term 17 (Page 18) and Work Order (Page 10) require GPS geo-tagged photos with officer signature. Flag A photos are referenced but not included in RTI response. Cannot confirm compliance. Payment was released despite this being unverifiable.",
      "startDate": "28.02.2025",
      "actualCompletionDate": "03.04.2025",
      "contractCompletionDate_page3": "13.04.2025",
      "contractCompletionDate_page12": "09.04.2025",
      "contractCompletionDateConflict": "NEEDS VERIFICATION — two official documents give different dates",
      "completedBeforeContractDate": true,
      "timeExtensionNote": "Page 12 S.No.10: 'The mentioned work has been included in the time extension.' Work completed before both stated contract dates, so extension was not needed for Ward 28 specifically. Likely a blanket extension across multiple works.",
      "epfoComplianceConfirmed": null,
      "epfoNote": "Work Order conditions payment on EPFO registration. No EPFO document for M/s R.D. Infra in RTI response. Payment was released.",
      "areaClaimed_sqm": 363.30,
      "boqVsExecuted": [
        {"item": "Dismantling of Structures", "boqQty": 36.60, "executedQty": 45.41, "unit": "CUM", "changePct": "+24.1"},
        {"item": "WBM Grading 2", "boqQty": 27.45, "executedQty": 27.24, "unit": "CUM", "changePct": "-0.8"},
        {"item": "WBM Grading 3", "boqQty": 27.45, "executedQty": 27.24, "unit": "CUM", "changePct": "-0.8"},
        {"item": "PCC Nominal Mix 1:2:4", "boqQty": 7.69, "executedQty": 4.94, "unit": "CUM", "changePct": "-35.8"},
        {"item": "Interlocking Concrete Block M-35 80mm", "boqQty": 317.20, "executedQty": 363.30, "unit": "SQM", "changePct": "+14.5"},
        {"item": "Steel RSJs", "boqQty": 0.50, "executedQty": 0, "unit": "QTL", "changePct": "-100"},
        {"item": "Brick Masonry CM 1:4", "boqQty": 12.81, "executedQty": 12.14, "unit": "CUM", "changePct": "-5.2"},
        {"item": "Plastering CM 1:4 15mm", "boqQty": 109.81, "executedQty": 61.75, "unit": "SQM", "changePct": "-43.8"},
        {"item": "RCC Grade M25", "boqQty": 0.17, "executedQty": 0, "unit": "CUM", "changePct": "-100"},
        {"item": "TMT bar Fe 415", "boqQty": 0.11, "executedQty": 0, "unit": "QTL", "changePct": "-100"}
      ],
      "drainItemsBilledAtScheduleRates": 115219.92,
      "drainItemsBreakdown": {
        "brickMasonry_12.14_CUM": 73202.99,
        "plastering_61.75_SQM": 11837.48,
        "PCC_4.94_CUM": 30179.45
      },
      "ghostDrainNote": "MAPPING.md states Rs. 98,293 billed for a ghost drain. This figure does NOT appear anywhere in the 41 RTI pages. Drain-related items at schedule rates total Rs. 1,15,219.92. After 36.10% discount: Rs. 73,625.52. After 18% GST: approximately Rs. 86,878. None equal Rs. 98,293. Source of Rs. 98,293 must be provided by founder before any public display of this figure."
    },
    evidenceSource: 'official',
    isFlagged: true,
    flaggedReason: 'Drain cost figure ₹98,293 cited in platform context does not appear anywhere in the 41 RTI pages. Drain items at schedule rates total ₹1,15,219.92 (after 36.10% discount: ₹73,625.52; after 18% GST: ~₹86,878). None equal ₹98,293. Do not display any drain cost figure publicly until founder confirms and documents the source. See Ward28 05 conflicts.md, Conflict 5.',
  }).returning();

  // docEvent8 — DLP Started — 03.04.2025
  const [docEvent8] = await db.insert(events).values({
    roadId: road.id,
    segmentId: null,
    eventType: 'dlp_started',
    timestamp: new Date('2025-04-03'),
    description: "Defect Liability Period commenced upon work completion. Contractor (M/s R.D. Infra) responsible for all repairs and maintenance for 1 year. Security deposit refundable only after 1 year on audit satisfaction. 10% of security deposit subject to seizure if monitoring neglected per Contract Term 23.",
    severity: null,
    evidence: {
      "dlpStartDate": "03.04.2025",
      "dlpEndDate": "03.04.2026",
      "dlpDurationMonths": 12,
      "securityDepositTotal_approx": 57180,
      "securityDepositBreakdown": {
        "fdr6999_BoB_page15": 18180,
        "fdr6998_page7": 33000,
        "fdr7245_page7": 6000,
        "conflictNote": "FDR 6999 amount conflict — Rs. 18,180 (Page 15) vs Rs. 18,500 (Page 7). Total uses Page 15 figure."
      },
      "performanceSecurityTotal_approx": 218500,
      "performanceSecurityBreakdown": {
        "fdr7243_page7": 200000,
        "fdr6999_performance_page7": 18500
      },
      "refundCondition": "After 1 year upon satisfaction of audit objection",
      "penaltyClause": "10% of security deposit seized if monitoring/supervision neglected",
      "contractTermsRef": "Terms 11, 12, 23 — Contract Bond, Pages 8 and 9",
      "statusAtRtiDate": "DLP active — RTI filed 17.11.2025, DLP expires 03.04.2026",
      "statusAtRtiResponseDate": "DLP active — RTI response 05.02.2026, DLP expires 03.04.2026"
    },
    evidenceSource: 'official',
    isFlagged: false,
  }).returning();

  // docEvent9 — Payment Released — 30.06.2025
  const [docEvent9] = await db.insert(events).values({
    roadId: road.id,
    segmentId: null,
    eventType: 'payment_released',
    timestamp: new Date('2025-06-30'),
    description: "Final payment of Rs. 3,54,581 released to M/s R.D. Infra after all deductions. Scheduled rates total Rs. 5,12,036.45, less 36.10% discount = Rs. 3,27,191.29, plus 18% GST = Rs. 3,86,085.72. After statutory deductions (CGST, SGST, Income Tax, Labour Cess, Royalty), net payment Rs. 3,54,581.",
    severity: null,
    evidence: {
      "netDisbursed": 354581,
      "sanctionedBudget": 606000,
      "contractAmount": 387234,
      "scheduledRatesTotal": 512036.45,
      "discountPercent": 36.10,
      "discountAmount": 184845.16,
      "actualPriceOfWork": 327191.29,
      "gstPercent": 18,
      "gstAmount": 58894.43,
      "totalValueOfWorkDone": 386085.72,
      "billedAmount": 386086.00,
      "deductions": {
        "CGST_1pct": 3272,
        "SGST_1pct": 3272,
        "IGST_2pct": 0,
        "IncomeTax_1pct": 3272,
        "LabourCess_1pct": 3261,
        "Royalty": 15708,
        "RoyaltySurcharge_25pct": 2120,
        "totalDeductionOnDocument": "BLANK"
      },
      "deductionArithmeticNote": "Itemised deductions sum to Rs. 30,905 (IGST=0). But Rs. 3,86,086 minus Rs. 3,54,581 = Rs. 31,505. Unaccounted Rs. 600. IGST @ 2% shown as dash/nil in document. Total deduction field is blank. NEEDS VERIFICATION against physical document.",
      "paymentInWords": "Three Lakh Fifty Four Thousand Five Hundred Eighty One Only",
      "chequeNo": null,
      "chequeDate": null,
      "noteSheetAuthor": "Sachin Kumar, Clerk (Construction), Nagar Nigam Roorkee",
      "noteSheetDate": "30.06.2025",
      "signedBy": ["Account Clerk", "Accountant", "PIO", "Municipal Commissioner"],
      "lastCertificateAmount": 0.00,
      "amountSinceLastCertificate": 386085.72
    },
    evidenceSource: 'official',
    isFlagged: false,
  }).returning();

  // docEvent10 — RTI Filed — 17.11.2025
  const [docEvent10] = await db.insert(events).values({
    roadId: road.id,
    segmentId: null,
    eventType: 'rti_filed',
    timestamp: new Date('2025-11-17'),
    description: "Online RTI application No. 35 filed by Vidushi requesting certified copies of documents relating to Ward 28 road and drain construction, Nagar Nigam Roorkee.",
    severity: null,
    evidence: {
      "rtiApplicationNo": 35,
      "rtiFiledDate": "17.11.2025",
      "rtiMode": "online",
      "applicantName": "Vidushi",
      "applicantAddress": "House No. 247/7, Purvi Deen Dayal, Roorkee, District Haridwar, Uttarakhand"
    },
    evidenceSource: 'citizen',
    isFlagged: false,
  }).returning();

  // docEvent11 — RTI Response Received — 05.02.2026
  const [docEvent11] = await db.insert(events).values({
    roadId: road.id,
    segmentId: null,
    eventType: 'rti_response_received',
    timestamp: new Date('2026-02-05'),
    description: "RTI response provided by PIO, Nagar Nigam Roorkee. File No. 39557. 41 pages of certified document copies provided. Appeal within 30 days to Municipal Commissioner.",
    severity: null,
    evidence: {
      "rtiResponseFileNo": "39557/Public Information Officer/Nagar Nigam Roorkee/2025-26",
      "responseDate": "05.02.2026",
      "respondingOfficer": "Public Information Officer, Nagar Nigam Roorkee",
      "documentsProvided": "Certified photocopies",
      "totalPages": 41,
      "appealAuthority": "First Departmental Appellate Authority / Municipal Commissioner, Nagar Nigam Roorkee",
      "appealWindowDays": 30
    },
    evidenceSource: 'official',
    isFlagged: false,
  }).returning();

  // crackEvent — Surface Cracks Documented — 08.02.2026
  const [crackEvent] = await db.insert(events).values({
    roadId: road.id,
    segmentId: segment.id,
    eventType: 'crack_found',
    timestamp: new Date('2026-02-08'),
    description: 'Surface cracks documented by citizen field visit on 8 February 2026. Multiple cracks visible across interlocking tile surface in Ward No. 28.',
    severity: 'critical',
    evidence: null,
    evidenceSource: 'citizen',
    isFlagged: false,
  }).returning();

  // potholeEvent — Potholes Documented — 08.02.2026
  const [potholeEvent] = await db.insert(events).values({
    roadId: road.id,
    segmentId: segment.id,
    eventType: 'pothole_found',
    timestamp: new Date('2026-02-08'),
    description: 'Potholes documented by citizen field visit on 8 February 2026. Tile surface breaking up in multiple locations in Ward No. 28.',
    severity: 'critical',
    evidence: null,
    evidenceSource: 'citizen',
    isFlagged: false,
  }).returning();

  // drainEvent — Drain Condition Documented — 08.02.2026
  const [drainEvent] = await db.insert(events).values({
    roadId: road.id,
    segmentId: segment.id,
    eventType: 'drain_blocked',
    timestamp: new Date('2026-02-08'),
    description: 'Drain condition documented by citizen field visit on 8 February 2026. Drain billed and certified complete — physical existence on site unverified.',
    severity: 'medium',
    evidence: null,
    evidenceSource: 'citizen',
    isFlagged: false,
  }).returning();

  console.log('Events seeded:', 14);

  // ============================================================
  // EVENT PARTICIPANTS — Section 4, WARD28_VERIFIED_DATA.md
  // HIGH confidence: inserted directly.
  // LOW confidence: inserted with comment per instructions.
  // MEDIUM confidence: inserted with comment (not explicitly HIGH).
  // ============================================================

  console.log('Seeding event participants...');

  await db.insert(eventParticipants).values([
    // docEvent2 — Tender Award 13.12.2024
    { eventId: docEvent2.id, personId: shubhamSharma.id,    personType: 'contractor', role: 'assignee',   dataConfidence: 'verified'   },
    { eventId: docEvent2.id, personId: juniorEngineer.id,   personType: 'official',   role: 'authoriser', dataConfidence: 'unconfirmed' },
    { eventId: docEvent2.id, personId: assistantEngineer.id,personType: 'official',   role: 'authoriser', dataConfidence: 'unconfirmed' },
    { eventId: docEvent2.id, personId: executiveEngineer.id,personType: 'official',   role: 'authoriser', dataConfidence: 'unconfirmed' },
    { eventId: docEvent2.id, personId: prashantKumar.id,    personType: 'official',   role: 'authoriser', dataConfidence: 'unconfirmed' },
    { eventId: docEvent2.id, personId: jitendraKumar.id,    personType: 'official',   role: 'authoriser', dataConfidence: 'unconfirmed' },

    // docEvent3 — Work Order 23.02.2025
    { eventId: docEvent3.id, personId: executiveEngineer.id,personType: 'official',   role: 'authoriser', dataConfidence: 'unconfirmed' },
    { eventId: docEvent3.id, personId: shubhamSharma.id,    personType: 'contractor', role: 'assignee',   dataConfidence: 'verified'   },

    // docEvent4 — Agreement 01.02.2025
    { eventId: docEvent4.id, personId: shubhamSharma.id,    personType: 'contractor', role: 'assignee',   dataConfidence: 'verified'   },
    { eventId: docEvent4.id, personId: assistantEngineer.id,personType: 'official',   role: 'certifier',  dataConfidence: 'unconfirmed' },
    { eventId: docEvent4.id, personId: jitendraKumar.id,    personType: 'official',   role: 'authoriser', dataConfidence: 'unconfirmed' },

    // docEvent6 — Lab Test 30.03.2025
    { eventId: docEvent6.id, personId: pranavDixit.id,      personType: 'official',   role: 'certifier',  dataConfidence: 'verified'   },

    // docEvent7 — Completion 03.04.2025
    { eventId: docEvent7.id, personId: juniorEngineer.id,   personType: 'official',   role: 'certifier',  dataConfidence: 'unconfirmed' },
    { eventId: docEvent7.id, personId: assistantEngineer.id,personType: 'official',   role: 'certifier',  dataConfidence: 'unconfirmed' },
    { eventId: docEvent7.id, personId: executiveEngineer.id,personType: 'official',   role: 'authoriser', dataConfidence: 'unconfirmed' },
    { eventId: docEvent7.id, personId: shubhamSharma.id,    personType: 'contractor', role: 'assignee',   dataConfidence: 'verified'   },

    // docEvent9 — Payment 30.06.2025
    { eventId: docEvent9.id, personId: sachinKumar.id,      personType: 'official',   role: 'reporter',   dataConfidence: 'verified'   },
    { eventId: docEvent9.id, personId: prashantKumar.id,    personType: 'official',   role: 'authoriser', dataConfidence: 'unconfirmed' },
    { eventId: docEvent9.id, personId: jitendraKumar.id,    personType: 'official',   role: 'authoriser', dataConfidence: 'unconfirmed' },

    // docEvent10 — RTI Filed 17.11.2025
    { eventId: docEvent10.id, personId: vidushi.id,         personType: 'citizen',    role: 'reporter',   dataConfidence: 'verified'   },

    // docEvent11 — RTI Response 05.02.2026 — role verified, name not disclosed in RTI
    { eventId: docEvent11.id, personId: pio.id,             personType: 'official',   role: 'authoriser', dataConfidence: 'probable'   },

    // Condition events — first-hand citizen field observations 08.02.2026
    { eventId: crackEvent.id,   personId: vidushi.id,       personType: 'citizen',    role: 'reporter',   dataConfidence: 'verified'   },
    { eventId: potholeEvent.id, personId: vidushi.id,       personType: 'citizen',    role: 'reporter',   dataConfidence: 'verified'   },
    { eventId: drainEvent.id,   personId: vidushi.id,       personType: 'citizen',    role: 'reporter',   dataConfidence: 'verified'   },
  ]);

  // suppress unused-variable warnings for events with no participants in Section 4
  void docEvent1;
  void docEvent5;
  void docEvent8;

  console.log('Event participants seeded:', 24);

  // ============================================================
  // PAY SCALES — 7th Pay Commission official values
  // Applied after insert so the update logic is readable per person.
  // Shubham Sharma (contractor) has no government pay scale — remains null.
  // ============================================================

  console.log('Seeding pay scales...');

  await Promise.all([
    db.update(persons).set({ payScale: '₹44,900 – ₹1,42,400',   salarySource: '7th Pay Commission, Level 7'  }).where(eq(persons.id, juniorEngineer.id)),
    db.update(persons).set({ payScale: '₹47,600 – ₹1,51,100',   salarySource: '7th Pay Commission, Level 8'  }).where(eq(persons.id, assistantEngineer.id)),
    db.update(persons).set({ payScale: '₹67,700 – ₹2,08,700',   salarySource: '7th Pay Commission, Level 11' }).where(eq(persons.id, executiveEngineer.id)),
    db.update(persons).set({ payScale: '₹67,700 – ₹2,08,700',   salarySource: '7th Pay Commission, Level 11' }).where(eq(persons.id, prashantKumar.id)),
    db.update(persons).set({ payScale: '₹19,900 – ₹63,200',     salarySource: '7th Pay Commission, Level 2'  }).where(eq(persons.id, sachinKumar.id)),
    db.update(persons).set({ payScale: '₹19,900 – ₹63,200',     salarySource: '7th Pay Commission, Level 2'  }).where(eq(persons.id, mohanSingh.id)),
    db.update(persons).set({ payScale: '₹19,900 – ₹63,200',     salarySource: '7th Pay Commission, Level 2'  }).where(eq(persons.id, narendraSinghRawat.id)),
    db.update(persons).set({ payScale: '₹1,44,200 – ₹2,18,200', salarySource: '7th Pay Commission, Level 14' }).where(eq(persons.id, jitendraKumar.id)),
  ]);

  await db.update(persons)
    .set({ monthlySalary: '55000' })
    .where(eq(persons.id, juniorEngineer.id));

  console.log('Pay scales seeded: 8');

  // ============================================================
  // PHOTOS — 29 field photos. capturedAt: 19 November 2025.
  // Section 1: eventId null, no segmentId.
  // Section 3: eventId links to condition event, segmentId = segment.id.
  // ============================================================

  console.log('Seeding photos...');

  function withTransform(url: string, transform: string): string {
    return url.replace('/upload/', `/upload/${transform}/`);
  }

  const BASE_DATE = new Date('2025-11-19T00:00:00Z');

  const SECTION1_PHOTOS = [
    { url: 'https://res.cloudinary.com/dkgaihpyp/image/upload/q_auto/f_auto/v1779310839/001_vc0jdy.jpg',  isHero: true  },
    { url: 'https://res.cloudinary.com/dkgaihpyp/image/upload/q_auto/f_auto/v1779310838/002_oidjyn.jpg', isHero: false },
    { url: 'https://res.cloudinary.com/dkgaihpyp/image/upload/q_auto/f_auto/v1779310840/003_yli37n.png', isHero: false },
    { url: 'https://res.cloudinary.com/dkgaihpyp/image/upload/q_auto/f_auto/v1779310848/004_jdpbqk.png', isHero: false },
    { url: 'https://res.cloudinary.com/dkgaihpyp/image/upload/q_auto/f_auto/v1779310841/005_eysunr.jpg', isHero: false },
    { url: 'https://res.cloudinary.com/dkgaihpyp/image/upload/q_auto/f_auto/v1779310840/006_c0rs6f.jpg', isHero: false },
    { url: 'https://res.cloudinary.com/dkgaihpyp/image/upload/q_auto/f_auto/v1779310840/007_nmyegd.jpg', isHero: false },
    { url: 'https://res.cloudinary.com/dkgaihpyp/image/upload/q_auto/f_auto/v1779310842/008_r9xxdd.png', isHero: false },
    { url: 'https://res.cloudinary.com/dkgaihpyp/image/upload/q_auto/f_auto/v1779310841/009_ge6qvr.jpg', isHero: false },
    { url: 'https://res.cloudinary.com/dkgaihpyp/image/upload/q_auto/f_auto/v1779310843/010_tfhjwk.jpg', isHero: false },
    { url: 'https://res.cloudinary.com/dkgaihpyp/image/upload/q_auto/f_auto/v1779310846/011_cd4nij.png', isHero: false },
  ];

  const section1PhotoValues = SECTION1_PHOTOS.map((p, index) => ({
    roadId:       road.id,
    segmentId:    null,
    eventId:      null,
    personId:     null,
    url:          p.url,
    thumbnailUrl: withTransform(p.url, 'c_fill,ar_3:4,g_auto'),
    source:       'citizen' as const,
    status:       'critical' as const,
    locationLabel: 'Ward 28, Roorkee',
    capturedAt:   new Date(BASE_DATE.getTime() + (SECTION1_PHOTOS.length - 1 - index) * 60_000),
    uploadedBy:   'founder',
    isHero:       p.isHero,
  }));

  await db.insert(photos).values([
    ...section1PhotoValues,

    // --- SECTION 3 CRACKS — 6 photos ---
    {
      roadId: road.id, segmentId: segment.id, eventId: crackEvent.id, personId: null,
      url: 'https://res.cloudinary.com/dkgaihpyp/image/upload/q_auto/f_auto/v1778833722/mystreet/ward28/section3/RK_ST_19.jpg',
      source: 'citizen', status: 'critical',
      capturedAt: new Date('2025-11-19'), uploadedBy: 'founder', isHero: false,
    },
    {
      roadId: road.id, segmentId: segment.id, eventId: crackEvent.id, personId: null,
      url: 'https://res.cloudinary.com/dkgaihpyp/image/upload/q_auto/f_auto/v1778833724/mystreet/ward28/section3/RK_ST_23.jpg',
      source: 'citizen', status: 'critical',
      capturedAt: new Date('2025-11-19'), uploadedBy: 'founder', isHero: false,
    },
    {
      roadId: road.id, segmentId: segment.id, eventId: crackEvent.id, personId: null,
      url: 'https://res.cloudinary.com/dkgaihpyp/image/upload/q_auto/f_auto/v1778833727/mystreet/ward28/section3/RK_ST_27.jpg',
      source: 'citizen', status: 'critical',
      capturedAt: new Date('2025-11-19'), uploadedBy: 'founder', isHero: false,
    },
    {
      roadId: road.id, segmentId: segment.id, eventId: crackEvent.id, personId: null,
      url: 'https://res.cloudinary.com/dkgaihpyp/image/upload/q_auto/f_auto/v1778833731/mystreet/ward28/section3/RK_ST_64.jpg',
      source: 'citizen', status: 'critical',
      capturedAt: new Date('2025-11-19'), uploadedBy: 'founder', isHero: false,
    },
    {
      roadId: road.id, segmentId: segment.id, eventId: crackEvent.id, personId: null,
      url: 'https://res.cloudinary.com/dkgaihpyp/image/upload/q_auto/f_auto/v1778833733/mystreet/ward28/section3/RK_ST_65.jpg',
      source: 'citizen', status: 'critical',
      capturedAt: new Date('2025-11-19'), uploadedBy: 'founder', isHero: false,
    },
    {
      roadId: road.id, segmentId: segment.id, eventId: crackEvent.id, personId: null,
      url: 'https://res.cloudinary.com/dkgaihpyp/image/upload/q_auto/f_auto/v1778833736/mystreet/ward28/section3/RK_ST_66.jpg',
      source: 'citizen', status: 'critical',
      capturedAt: new Date('2025-11-19'), uploadedBy: 'founder', isHero: false,
    },

    // --- SECTION 3 POTHOLES — 3 photos ---
    {
      roadId: road.id, segmentId: segment.id, eventId: potholeEvent.id, personId: null,
      url: 'https://res.cloudinary.com/dkgaihpyp/image/upload/q_auto/f_auto/v1778833713/mystreet/ward28/section3/RK_ST_14.jpg',
      source: 'citizen', status: 'critical',
      capturedAt: new Date('2025-11-19'), uploadedBy: 'founder', isHero: false,
    },
    {
      roadId: road.id, segmentId: segment.id, eventId: potholeEvent.id, personId: null,
      url: 'https://res.cloudinary.com/dkgaihpyp/image/upload/q_auto/f_auto/v1778833716/mystreet/ward28/section3/RK_ST_40.jpg',
      source: 'citizen', status: 'critical',
      capturedAt: new Date('2025-11-19'), uploadedBy: 'founder', isHero: false,
    },
    {
      roadId: road.id, segmentId: segment.id, eventId: potholeEvent.id, personId: null,
      url: 'https://res.cloudinary.com/dkgaihpyp/image/upload/q_auto/f_auto/v1778833719/mystreet/ward28/section3/RK_ST_52.jpg',
      source: 'citizen', status: 'critical',
      capturedAt: new Date('2025-11-19'), uploadedBy: 'founder', isHero: false,
    },

    // --- SECTION 3 DRAINS — 12 photos ---
    {
      roadId: road.id, segmentId: segment.id, eventId: drainEvent.id, personId: null,
      url: 'https://res.cloudinary.com/dkgaihpyp/image/upload/q_auto/f_auto/v1778832560/mystreet/ward28/section3/RK_ST_08.jpg',
      source: 'citizen', status: 'warning',
      capturedAt: new Date('2025-11-19'), uploadedBy: 'founder', isHero: false,
    },
    {
      roadId: road.id, segmentId: segment.id, eventId: drainEvent.id, personId: null,
      url: 'https://res.cloudinary.com/dkgaihpyp/image/upload/q_auto/f_auto/v1778832549/mystreet/ward28/section3/RK_ST_20.jpg',
      source: 'citizen', status: 'warning',
      capturedAt: new Date('2025-11-19'), uploadedBy: 'founder', isHero: false,
    },
    {
      roadId: road.id, segmentId: segment.id, eventId: drainEvent.id, personId: null,
      url: 'https://res.cloudinary.com/dkgaihpyp/image/upload/q_auto/f_auto/v1778832581/mystreet/ward28/section3/RK_ST_24.jpg',
      source: 'citizen', status: 'warning',
      capturedAt: new Date('2025-11-19'), uploadedBy: 'founder', isHero: false,
    },
    {
      roadId: road.id, segmentId: segment.id, eventId: drainEvent.id, personId: null,
      url: 'https://res.cloudinary.com/dkgaihpyp/image/upload/q_auto/f_auto/v1778832564/mystreet/ward28/section3/RK_ST_25.jpg',
      source: 'citizen', status: 'warning',
      capturedAt: new Date('2025-11-19'), uploadedBy: 'founder', isHero: false,
    },
    {
      roadId: road.id, segmentId: segment.id, eventId: drainEvent.id, personId: null,
      url: 'https://res.cloudinary.com/dkgaihpyp/image/upload/q_auto/f_auto/v1778832584/mystreet/ward28/section3/RK_ST_26.jpg',
      source: 'citizen', status: 'warning',
      capturedAt: new Date('2025-11-19'), uploadedBy: 'founder', isHero: false,
    },
    {
      roadId: road.id, segmentId: segment.id, eventId: drainEvent.id, personId: null,
      url: 'https://res.cloudinary.com/dkgaihpyp/image/upload/q_auto/f_auto/v1778832567/mystreet/ward28/section3/RK_ST_33.jpg',
      source: 'citizen', status: 'warning',
      capturedAt: new Date('2025-11-19'), uploadedBy: 'founder', isHero: false,
    },
    {
      roadId: road.id, segmentId: segment.id, eventId: drainEvent.id, personId: null,
      url: 'https://res.cloudinary.com/dkgaihpyp/image/upload/q_auto/f_auto/v1778832569/mystreet/ward28/section3/RK_ST_41.jpg',
      source: 'citizen', status: 'warning',
      capturedAt: new Date('2025-11-19'), uploadedBy: 'founder', isHero: false,
    },
    {
      roadId: road.id, segmentId: segment.id, eventId: drainEvent.id, personId: null,
      url: 'https://res.cloudinary.com/dkgaihpyp/image/upload/q_auto/f_auto/v1778832572/mystreet/ward28/section3/RK_ST_43.jpg',
      source: 'citizen', status: 'warning',
      capturedAt: new Date('2025-11-19'), uploadedBy: 'founder', isHero: false,
    },
    {
      roadId: road.id, segmentId: segment.id, eventId: drainEvent.id, personId: null,
      url: 'https://res.cloudinary.com/dkgaihpyp/image/upload/q_auto/f_auto/v1778832575/mystreet/ward28/section3/RK_ST_45.jpg',
      source: 'citizen', status: 'warning',
      capturedAt: new Date('2025-11-19'), uploadedBy: 'founder', isHero: false,
    },
    {
      roadId: road.id, segmentId: segment.id, eventId: drainEvent.id, personId: null,
      url: 'https://res.cloudinary.com/dkgaihpyp/image/upload/q_auto/f_auto/v1778832552/mystreet/ward28/section3/RK_ST_57.jpg',
      source: 'citizen', status: 'warning',
      capturedAt: new Date('2025-11-19'), uploadedBy: 'founder', isHero: false,
    },
    {
      roadId: road.id, segmentId: segment.id, eventId: drainEvent.id, personId: null,
      url: 'https://res.cloudinary.com/dkgaihpyp/image/upload/q_auto/f_auto/v1778832578/mystreet/ward28/section3/RK_ST_60.jpg',
      source: 'citizen', status: 'warning',
      capturedAt: new Date('2025-11-19'), uploadedBy: 'founder', isHero: false,
    },
    {
      roadId: road.id, segmentId: segment.id, eventId: drainEvent.id, personId: null,
      url: 'https://res.cloudinary.com/dkgaihpyp/image/upload/q_auto/f_auto/v1778832557/mystreet/ward28/section3/RK_ST_61.jpg',
      source: 'citizen', status: 'warning',
      capturedAt: new Date('2025-11-19'), uploadedBy: 'founder', isHero: false,
    },
  ]);

  console.log(`Photos seeded: ${section1PhotoValues.length} section 1 + 21 section 3 = ${section1PhotoValues.length + 21} total`);
  console.log('');
  console.log('Seeding complete. Database is ready.');
}

seed().catch(console.error);
