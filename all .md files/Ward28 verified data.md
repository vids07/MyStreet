# WARD28_VERIFIED_DATA.md
## MyStreet — Verified RTI Extraction
### Ward 28, Nagar Nigam Roorkee | Road & Drain Construction
**Extracted from:** RTI Application No. 35, dated 17.11.2025 | RTI Response File No. 39557 | 41 pages
**RTI Response Date:** 05.02.2026
**RTI Applicant:** Vidushi, House No. 247/7, Purvi Deen Dayal, Roorkee, District Haridwar, Uttarakhand
**Version:** 2.0 — Second-pass verified. All corrections from re-read applied.
**Verified by:** [FOUNDER SIGN-OFF REQUIRED BEFORE DEVELOPER USE]

---

# PART 1 — STRUCTURED DATA EXTRACTION

---

## SECTION 1 — ROAD DETAILS
*Maps to `roads` table*

| Field | Value | Source |
|-------|-------|--------|
| `roadDisplayName` | "Ward No. 28, from Vijendra's shop towards the house of Ajay Raj, Roorkee" | Page 1 — Note Sheet; Page 10 — Work Order; Page 12 — Work Completion Certificate |
| `ward` | "Ward 28" | Page 12 — Work Completion Certificate, S.No. 1 |
| `city` | "Roorkee" | Page 10 — Work Order header; Page 12 — multiple references |
| `roadSystemId` | NULL — not in RTI documents | — |
| `geometry` | NULL — not in RTI documents | — |
| `healthStatus` | NULL — not determinable from contract documents alone; requires field verification | — |

**Note:** The road is consistently described as: "Road and drain construction using coloured interlocking tiles in Ward No. 28, from Vijendra's shop towards the house of Ajay Raj." "Vijendra's shop" and "Ajay Raj's house" are the only physical location anchors across all 41 pages. No GPS coordinates, no street name, no ward boundary geometry appear anywhere in the RTI response.

---

## SECTION 2 — PERSONS
*Maps to `persons` table*

---

### Person 1 — Contractor / Firm Proprietor

| Field | Value | Source |
|-------|-------|--------|
| `fullName` | "Shubham Sharma" | Page 10 — Work Order: "Prop. Shubham Sharma, Son of Shri Niwas Sharma"; Page 16 — BOQ |
| `designation` | "Proprietor" | Page 10 |
| `designationPlain` | NULL | — |
| `department` | "M/s R.D. Infra, Roorkee" | Pages 1, 10, 17 |
| `personCategory` | "contractor" | Page 10 |
| `contactOrId` | "GST No. 05GDAPS2236H1ZN" | Page 17 — GST No-Dues Certificate |
| `jurisdiction` | "Roorkee, Distt. Haridwar, Uttarakhand" | Page 10 |
| `monthlySalary` | NULL — contractor, not applicable | — |
| `salarySource` | NULL | — |
| `photoUrl` | NULL | — |
| `accountability_status` | "waiting_for_audit" | Per MAPPING.md |
| `job_description` | "Responsible for material quality, construction standards, and delivery timeline as per contract terms." | Per MAPPING.md |
| `license_number` | NULL — registration certificate of M/s R.D. Infra not included in RTI response | — |

**Additional details for evidence JSONB:**
- Father's name: Shri Niwas Sharma | Page 10
- Address (Work Order, Page 10): House No. 405/1, Malakpur, Arora Colony, Solanipuram, Roorkee, Distt. Haridwar, Uttarakhand
- Address (GST Certificate, Page 17): Near Arora Colony, Ground Floor, Solani Apartment, Solani Puram, Roorkee, Haridwar
  - ⚠️ NEEDS VERIFICATION: Two slightly different address descriptions across two documents. Both in Solanipuram area.
- GST Registration Date: 06/02/2021 | Page 17
- GST return frequency: Quarterly | Page 17
- GSTR-3B filed up to: June 2024 (FY 2024–25) | Page 17
- No GST outstanding as on: 07.10.2024 | Page 17
- GST certificate issuing officer: Sunil Rawat, Assistant Commissioner, State Tax, Zone-04, Roorkee | Page 17
- EPFO registration required for payment per work order — compliance not confirmed in RTI documents | Page 10

---

### Person 2 — Junior Engineer (JE)

| Field | Value | Source |
|-------|-------|--------|
| `fullName` | NEEDS VERIFICATION | — |
| `designation` | "Junior Engineer" | Pages 1, 10, 12 |
| `designationPlain` | NULL | — |
| `department` | "Nagar Nigam Roorkee" | Pages 1, 12 |
| `personCategory` | "official" | — |
| `contactOrId` | NULL | — |
| `jurisdiction` | "Nagar Nigam Roorkee" | — |
| `monthlySalary` | NULL | — |

**⚠️ NEEDS VERIFICATION — CRITICAL:** No personal name appears on any Ward 28-specific document. Every signature reads only "Junior Engineer, Nagar Nigam Roorkee." The name "Gurukesh Singh — Junior Engineer" appears on Page 11 (Elimination Sheet), but that document covers cancelled tenders for other wards, not Ward 28. The name "Gurudayal Singh" from MAPPING.md does not appear anywhere in these 41 pages. Founder must inspect the physical completion certificate (Page 12) and note sheet (Page 1) for a handwritten name.

---

### Person 3 — Assistant Engineer (AE)

| Field | Value | Source |
|-------|-------|--------|
| `fullName` | NEEDS VERIFICATION | — |
| `designation` | "Assistant Engineer" | Pages 1, 7, 10, 12 |
| `designationPlain` | NULL | — |
| `department` | "Nagar Nigam Roorkee" | — |
| `personCategory` | "official" | — |
| `contactOrId` | NULL | — |
| `monthlySalary` | NULL | — |

**⚠️ NEEDS VERIFICATION — CRITICAL:** Same as JE above. "Prem Kumar Sharma — Assistant Engineer" appears only on Page 11 (Elimination Sheet for other works). No AE personal name appears on any Ward 28 document. Founder must inspect physical documents.

---

### Person 4 — Executive Engineer (EE)

| Field | Value | Source |
|-------|-------|--------|
| `fullName` | NEEDS VERIFICATION | — |
| `designation` | "Executive Engineer" | Pages 10, 12 |
| `designationPlain` | NULL | — |
| `department` | "Nagar Nigam Roorkee" | — |
| `personCategory` | "official" | — |
| `contactOrId` | NULL | — |
| `monthlySalary` | NULL | — |

**⚠️ NEEDS VERIFICATION:** "Aashray Singh Mishra — Executive Engineer" is on Page 11 (other works). Pages 10 and 12 signed as "Executive Engineer, Nagar Nigam Roorkee" without a personal name. MAPPING.md refers to "Alok Singh Mishravaan" — this name does not appear anywhere in 41 pages. Founder must resolve.

---

### Person 5 — Senior Finance Officer

| Field | Value | Source |
|-------|-------|--------|
| `fullName` | "Prashant Kumar" | Page 11 — Elimination Sheet |
| `designation` | "Senior Finance Officer" | Pages 11, 19, 27, 38 |
| `designationPlain` | NULL | — |
| `department` | "Nagar Nigam Roorkee" | — |
| `personCategory` | "official" | — |
| `contactOrId` | NULL | — |
| `monthlySalary` | NULL | — |
| `accountability_status` | "waiting_for_audit" | Per MAPPING.md |
| `job_description` | "Responsible for verifying financial records and authorising payment disbursement." | Per MAPPING.md |

---

### Person 6 — Municipal Commissioner

| Field | Value | Source |
|-------|-------|--------|
| `fullName` | "Jitendra Kumar" | Page 11 — Elimination Sheet |
| `designation` | "Municipal Commissioner" | Pages 7, 8, 9, 10, 11; RTI Covering Letter (Appellate Authority) |
| `designationPlain` | NULL | — |
| `department` | "Nagar Nigam Roorkee" | — |
| `personCategory` | "official" | — |
| `contactOrId` | NULL | — |
| `monthlySalary` | NULL | — |
| `accountability_status` | "waiting_for_audit" | Per MAPPING.md |
| `job_description` | "Municipal Commissioner. Ultimate administrative authority over all ward-level public works." | Per MAPPING.md |

---

### Person 7 — Construction Clerk (Note Sheet / Payment)

| Field | Value | Source |
|-------|-------|--------|
| `fullName` | "Sachin Kumar" | Page 1 |
| `designation` | "Clerk (Construction)" | Page 1 |
| `designationPlain` | NULL | — |
| `department` | "Nagar Nigam Roorkee" | Page 1 |
| `personCategory` | "official" | — |
| `contactOrId` | NULL | — |
| `monthlySalary` | NULL | — |

---

### Person 8 — Public Information Officer (PIO)

| Field | Value | Source |
|-------|-------|--------|
| `fullName` | NULL — signs every page as "Public Information Officer, Nagar Nigam Roorkee." No personal name disclosed in any of the 41 pages. | — |
| `designation` | "Public Information Officer" | RTI Covering Letter; all 41 pages |
| `department` | "Nagar Nigam Roorkee" | — |
| `personCategory` | "official" | — |

---

### Person 9 — Construction Clerk (Payment Register)

| Field | Value | Source |
|-------|-------|--------|
| `fullName` | "Mohan Singh" | Page 14 |
| `designation` | "Construction Clerk" | Page 14 |
| `department` | "Nagar Nigam Roorkee" | Page 14 |
| `personCategory` | "official" | — |

---

### Person 10 — Construction Clerk (Elimination Sheet)

| Field | Value | Source |
|-------|-------|--------|
| `fullName` | "Narendra Singh Rawat" | Page 11 |
| `designation` | "Construction Clerk" | Page 11 |
| `department` | "Nagar Nigam Roorkee" | Page 11 |
| `personCategory` | "official" | — |

---

### Person 11 — Finance Officer / District Magistrate Approver

| Field | Value | Source |
|-------|-------|--------|
| `fullName` | "Karmendra Singh" | Page 11 |
| `designation` | "Finance Officer (Nagar Nigam Roorkee) / District Magistrate, Haridwar" | Page 11 |
| `department` | "Nagar Nigam Roorkee / District Magistrate Office, Haridwar" | Page 11 |
| `personCategory` | "official" | — |

**⚠️ NEEDS VERIFICATION:** One name listed with two roles separated by "/". Cannot determine from this document if this is one person holding both posts, or if two people's names are collapsed into one entry.

---

### Person 12 — RTI Applicant

| Field | Value | Source |
|-------|-------|--------|
| `fullName` | "Vidushi" | RTI Covering Letter |
| `designation` | NULL | — |
| `department` | NULL | — |
| `personCategory` | "citizen" | — |
| `contactOrId` | NULL | — |
| `jurisdiction` | "House No. 247/7, Purvi Deen Dayal, Roorkee, District Haridwar, Uttarakhand" | RTI Covering Letter |

---

### Person 13 — Lab Test Authorised Signatory

| Field | Value | Source |
|-------|-------|--------|
| `fullName` | "Pranav Dixit" | Page 6 |
| `designation` | "Tech-Manager" | Page 6 |
| `department` | "Infratest Investigation & Research Centre Pvt. Ltd., Roorkee" | Page 6 |
| `personCategory` | "official" | — |

---

### Persons — Non-Ward-28 Competing Bidders (lower priority — no accountability chain role)

| Name | Firm | Source | Notes |
|------|------|--------|-------|
| "Mahul Singh" (BOQ) / "M/s Mahesh Singh Contractor" (envelope) | Unknown — name conflict between two pages | Pages 21, 23 | See Gap 11 |
| Upendra Singh, Son of Hukam Singh | M/s Aman Trading Company, Roorkee | Pages 24, 28 | Registration expired 31.03.2024 before tender |
| Mukram Rao, Son of Mushraf Rao | M/s Mukram Rao Contractor, Roorkee | Pages 35, 39 | Registration expired 26.07.2024 before tender |
| (name illegible) | Second firm — SBI FDR, Page 20 | Page 20 | FDR Rs. 2,500, dated Aug 2023 — suspicious |
| (name illegible) | Fifth firm — IDBT FDR, Page 35 | Pages 35–36 | — |

---

## SECTION 3 — EVENTS
*Maps to `events` table — chronological order*

---

### Event 1 — Second Tender Invitation / Budget Sanctioned

| Field | Value | Source |
|-------|-------|--------|
| `eventType` | `budget_sanctioned` | — |
| `timestamp` | "19.10.2024" — date of the second invitation notice | Page 11 |
| `description` | "130 tenders invited for the second time across multiple interlocking and CC road works, via notice dated 19.10.2024. This was explicitly described as a second invitation round, implying a prior first round for which no documents were provided in this RTI. 15 tenders received across all listed works; multiple eliminated for missing GST certificates, disputed rates, authentication issues, or zero participation." | Page 11 |
| `severity` | NULL | — |
| `evidenceSource` | "official" | — |
| `segmentId` | NULL | — |

**Evidence JSONB:**
```json
{
  "invitationRound": 2,
  "totalTendersInvited": 130,
  "noticeDate": "19.10.2024",
  "totalTendersReceived": 15,
  "eliminationSheetFileNo": "204/Nagar Anu 0/Nagar Nigam Roorkee/2024-25",
  "note": "Elimination sheet covers multiple work serial numbers. Ward 28 (Work Serial No. 07) does not appear in the elimination list — its tender proceeded to award."
}
```

---

### Event 2 — Tender Opened and Awarded

| Field | Value | Source |
|-------|-------|--------|
| `eventType` | `work_order_issued` | — |
| `timestamp` | "05.12.2024" — tenders received and opened | Pages 16, 21, 25, 36 |
| `description` | "Tenders received and opened 05.12.2024. Five firms participated for Ward 28 work. M/s R.D. Infra submitted lowest bid at 36.10% below estimated amount (Rs. 3,87,234). Tender Committee accepted 13.12.2024." | Pages 10, 16 |
| `severity` | NULL | — |
| `evidenceSource` | "official" | — |
| `segmentId` | NULL | — |

**Evidence JSONB:**
```json
{
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
}
```

---

### Event 3 — Work Order Issued

| Field | Value | Source |
|-------|-------|--------|
| `eventType` | `work_order_issued` | — |
| `timestamp` | "23.02.2025" | Page 10 — Work Order document date |
| `description` | "Official work order issued to M/s R.D. Infra by Executive Engineer, Nagar Nigam Roorkee. File No. 539/Nagar Anu 0/Nagar Nigam Roorkee/2024-25. Contract value Rs. 3,87,234. Directed to complete within stipulated period, submit geo-tagged photographs before/during/after, and provide written notice of commencement and completion. Payment withheld if EPFO registration absent." | Page 10 |
| `severity` | NULL | — |
| `evidenceSource` | "official" | — |
| `segmentId` | NULL | — |

**Evidence JSONB:**
```json
{
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
}
```

---

### Event 4 — Agreement / Contract Bond Executed

| Field | Value | Source |
|-------|-------|--------|
| `eventType` | `work_order_issued` | — |
| `timestamp` | "01.02.2025" — e-stamp certificate issue date | Page 7 |
| `description` | "Contract agreement (e-stamp) executed. M/s R.D. Infra (First Party) and Nagar Nigam Roorkee (Second Party). e-Stamp issued 01.02.2025. Agreement No. 587/Nagar Nigam Roorkee/2024-25 dated 28.02.2025. Security deposits and performance security FDRs deposited. 25 contract terms accepted." | Pages 7, 8, 9 |
| `severity` | NULL | — |
| `evidenceSource` | "official" | — |

**Evidence JSONB:**
```json
{
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
}
```

---

### Event 5 — Construction Started

| Field | Value | Source |
|-------|-------|--------|
| `eventType` | `construction_started` | — |
| `timestamp` | "28.02.2025" | Page 3 — "Date of Start: 28/02/2025"; Page 12 — "Date of Commencement of Work: 28.02.2025" |
| `description` | "Construction commenced on 28.02.2025 per contract. Road and drain construction using coloured interlocking tiles in Ward No. 28, from Vijendra's shop to Ajay Raj's house." | Pages 3, 12 |
| `severity` | NULL | — |
| `evidenceSource` | "official" | — |
| `segmentId` | NULL | — |

---

### Event 6 — Material Lab Test

| Field | Value | Source |
|-------|-------|--------|
| `eventType` | `lab_test_report_submitted` | — |
| `timestamp` | "30.03.2025" — report date | Page 6 |
| `description` | "Lab test report submitted by NABL-accredited Infratest Investigation & Research Centre Pvt. Ltd. for Interlocking Tiles M-35. 8 samples collected 29.03.2025, tested 29–30.03.2025. Compressive strength average 40.7 N/mm² against minimum requirement 39.1 N/mm². Individual minimum 38.9 N/mm² against requirement 32.0 N/mm². Test passed." | Page 6 |
| `severity` | NULL | — |
| `evidenceSource` | "official" | — |
| `segmentId` | NULL | — |

**Evidence JSONB:**
```json
{
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
}
```

---

### Event 7 — Work Completion Claimed and Inspected

| Field | Value | Source |
|-------|-------|--------|
| `eventType` | `completion_claimed` | — |
| `timestamp` | "03.04.2025" | Pages 1, 3, 12 — consistent across all three |
| `description` | "Work certified as satisfactorily completed at site per specifications. Measurements recorded in Measurement Book No. 86, Pages 175–177, dated 03.04.2025. Inspected same day by Junior Engineer and Assistant Engineer. Countersigned by Executive Engineer. Final bill Rs. 3,86,086. Completed ahead of contract date." | Pages 1, 3, 12 |
| `severity` | NULL | — |
| `evidenceSource` | "official" | — |
| `segmentId` | NULL | — |

**Evidence JSONB:**
```json
{
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
}
```

---

### Event 8 — DLP Started

| Field | Value | Source |
|-------|-------|--------|
| `eventType` | `dlp_started` | — |
| `timestamp` | "03.04.2025" — actual completion date | Pages 8, 9 — Contract Terms 11, 12, 23 |
| `description` | "Defect Liability Period commenced upon work completion. Contractor (M/s R.D. Infra) responsible for all repairs and maintenance for 1 year. Security deposit refundable only after 1 year on audit satisfaction. 10% of security deposit subject to seizure if monitoring neglected per Contract Term 23." | Pages 8, 9 |
| `severity` | NULL | — |
| `evidenceSource` | "official" | — |
| `segmentId` | NULL | — |

**Evidence JSONB:**
```json
{
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
}
```

---

### Event 9 — Payment Released

| Field | Value | Source |
|-------|-------|--------|
| `eventType` | `payment_released` | — |
| `timestamp` | "30.06.2025" | Page 1 — Note Sheet date; Page 5 — Payment Chart incharge signature date |
| `description` | "Final payment of Rs. 3,54,581 released to M/s R.D. Infra after all deductions. Scheduled rates total Rs. 5,12,036.45, less 36.10% discount = Rs. 3,27,191.29, plus 18% GST = Rs. 3,86,085.72. After statutory deductions (CGST, SGST, Income Tax, Labour Cess, Royalty), net payment Rs. 3,54,581." | Pages 1, 5 |
| `severity` | NULL | — |
| `evidenceSource` | "official" | — |
| `segmentId` | NULL | — |

**Evidence JSONB:**
```json
{
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
}
```

---

### Event 10 — RTI Filed

| Field | Value | Source |
|-------|-------|--------|
| `eventType` | `rti_filed` | — |
| `timestamp` | "17.11.2025" | RTI Covering Letter |
| `description` | "Online RTI application No. 35 filed by Vidushi requesting certified copies of documents relating to Ward 28 road and drain construction, Nagar Nigam Roorkee." | RTI Covering Letter |
| `severity` | NULL | — |
| `evidenceSource` | "citizen" | — |
| `segmentId` | NULL | — |

**Evidence JSONB:**
```json
{
  "rtiApplicationNo": 35,
  "rtiFiledDate": "17.11.2025",
  "rtiMode": "online",
  "applicantName": "Vidushi",
  "applicantAddress": "House No. 247/7, Purvi Deen Dayal, Roorkee, District Haridwar, Uttarakhand"
}
```

---

### Event 11 — RTI Response Received

| Field | Value | Source |
|-------|-------|--------|
| `eventType` | `rti_response_received` | — |
| `timestamp` | "05.02.2026" | RTI Covering Letter |
| `description` | "RTI response provided by PIO, Nagar Nigam Roorkee. File No. 39557. 41 pages of certified document copies provided. Appeal within 30 days to Municipal Commissioner." | RTI Covering Letter |
| `severity` | NULL | — |
| `evidenceSource` | "official" | — |
| `segmentId` | NULL | — |

**Evidence JSONB:**
```json
{
  "rtiResponseFileNo": "39557/Public Information Officer/Nagar Nigam Roorkee/2025-26",
  "responseDate": "05.02.2026",
  "respondingOfficer": "Public Information Officer, Nagar Nigam Roorkee",
  "documentsProvided": "Certified photocopies",
  "totalPages": 41,
  "appealAuthority": "First Departmental Appellate Authority / Municipal Commissioner, Nagar Nigam Roorkee",
  "appealWindowDays": 30
}
```

---

## SECTION 4 — EVENT PARTICIPANTS
*Maps to `event_participants` table*

**⚠️ STRUCTURAL NOTE — CRITICAL:** The Elimination Sheet (Page 11) was signed by Narendra Singh Rawat, Gurukesh Singh, Prem Kumar Sharma, Aashray Singh Mishra, Prashant Kumar, Jitendra Kumar, and Karmendra Singh. This document covers cancelled tenders for OTHER wards. It is not a Ward 28 document. These signatures cannot be used as direct confirmation of these individuals' roles in the Ward 28 tender approval (13.12.2024). They are the same committee and likely the same people, but this linkage requires confirmation.

| Event | Person | `personType` | `role` | Confidence | Source |
|-------|--------|-------------|--------|-----------|--------|
| Event 2 (Tender Award — 13.12.2024) | Gurukesh Singh (JE) | official | authoriser | LOW — on Page 11 (other works doc) | Page 11 |
| Event 2 (Tender Award — 13.12.2024) | Prem Kumar Sharma (AE) | official | authoriser | LOW — on Page 11 (other works doc) | Page 11 |
| Event 2 (Tender Award — 13.12.2024) | Aashray Singh Mishra (EE) | official | authoriser | LOW — on Page 11 (other works doc) | Page 11 |
| Event 2 (Tender Award — 13.12.2024) | Prashant Kumar (Finance) | official | authoriser | LOW — on Page 11 (other works doc) | Page 11 |
| Event 2 (Tender Award — 13.12.2024) | Jitendra Kumar (MC) | official | authoriser | LOW — on Page 11 (other works doc) | Page 11 |
| Event 2 (Tender Award — 13.12.2024) | Shubham Sharma / M/s R.D. Infra | contractor | assignee | HIGH | Pages 10, 16 |
| Event 3 (Work Order — 23.02.2025) | Executive Engineer (name NOT confirmed) | official | authoriser | HIGH (role), LOW (name) | Page 10 |
| Event 3 (Work Order — 23.02.2025) | Shubham Sharma / M/s R.D. Infra | contractor | assignee | HIGH | Page 10 |
| Event 4 (Agreement — 01.02.2025) | Shubham Sharma / M/s R.D. Infra | contractor | assignee | HIGH | Page 7 |
| Event 4 (Agreement — 01.02.2025) | Assistant Engineer (name NOT confirmed) | official | certifier | HIGH (role), LOW (name) | Page 7 |
| Event 4 (Agreement — 01.02.2025) | Jitendra Kumar / MC | official | authoriser | MEDIUM (named on Page 11; signs agreement unnamed) | Pages 7, 11 |
| Event 6 (Lab Test — 30.03.2025) | Pranav Dixit, Tech-Manager, Infratest | official | certifier | HIGH | Page 6 |
| Event 7 (Completion — 03.04.2025) | Junior Engineer (name NOT confirmed) | official | certifier | HIGH (role), LOW (name) | Pages 1, 12 |
| Event 7 (Completion — 03.04.2025) | Assistant Engineer (name NOT confirmed) | official | certifier | HIGH (role), LOW (name) | Pages 1, 12 |
| Event 7 (Completion — 03.04.2025) | Executive Engineer (name NOT confirmed) | official | authoriser | HIGH (role), LOW (name) | Page 12 |
| Event 7 (Completion — 03.04.2025) | Shubham Sharma / M/s R.D. Infra | contractor | assignee | HIGH | — |
| Event 9 (Payment — 30.06.2025) | Sachin Kumar | official | certifier | HIGH | Page 1 |
| Event 9 (Payment — 30.06.2025) | Prashant Kumar (Senior Finance Officer) | official | authoriser | MEDIUM | Pages 1, 11 |
| Event 9 (Payment — 30.06.2025) | Jitendra Kumar (Municipal Commissioner) | official | authoriser | MEDIUM | Pages 5, 11 |
| Event 10 (RTI Filed — 17.11.2025) | Vidushi | citizen | reporter | HIGH | RTI Covering Letter |
| Event 11 (RTI Response — 05.02.2026) | PIO (name not disclosed) | official | authoriser | HIGH (role), NULL (name) | RTI Covering Letter |

---

## SECTION 5 — FINANCIAL FIGURES
*All values extracted exactly as written. No rounding or approximation.*

| Amount (Rs.) | Purpose | Event | Source |
|-------------|---------|-------|--------|
| 6,06,000.00 | Government estimated cost (including GST) | Events 1, 2 | Pages 12, 13, 15, 16 |
| 18,180.00 | Earnest money deposit | Event 2 | Pages 15, 16 |
| 1,000.00 | Tender form cost | Event 2 | Pages 15, 16 |
| 180.00 | GST on tender form | Event 2 | Pages 15, 16 |
| 1,180.00 | Tender form total | Event 2 | Pages 15, 16 |
| 5,15,617.90 | BOQ items sum at schedule rates | Event 2 | Pages 16, 21, 25, 36 |
| 3,87,234.00 | Accepted contract value | Events 2, 3, 4 | Pages 7, 10, 12, 13 |
| 18,180.00 | FDR No. 6999 (Bank of Baroda, 03.12.2024) — EMD/security | Event 2 | Page 15 |
| 33,000.00 | FDR No. 6998 (03.12.2024) — security deposit | Event 4 | Page 7 |
| 6,000.00 | FDR No. 7245 (19.02.2025) — security deposit | Event 4 | Page 7 |
| 2,00,000.00 | FDR No. 7243 (19.02.2025) — performance security | Event 4 | Page 7 |
| 18,500.00 | FDR No. 6999 (Page 7) — performance security | Event 4 | Page 7 — CONFLICTS with Page 15 |
| 100.00 | e-Stamp duty | Event 4 | Page 7 |
| 5,12,036.45 | Total at schedule rates — executed quantities | Events 7, 9 | Pages 2, 5 |
| 1,84,845.16 | Less: 36.10% discount | Event 9 | Page 5 |
| 3,27,191.29 | Actual price of work (post-discount) | Event 9 | Page 5 |
| 58,894.43 | GST @ 18% | Event 9 | Page 5 |
| 3,86,085.72 | Total value of work done | Event 9 | Pages 5, 13 |
| 3,86,086.00 | Final bill amount (rounded) | Events 7, 9 | Pages 1, 5, 12, 13 |
| 3,272.00 | CGST @ 1% | Event 9 | Page 5 |
| 3,272.00 | SGST @ 1% | Event 9 | Page 5 |
| 0 (dash) | IGST @ 2% — shown as nil/dash | Event 9 | Page 5 |
| 3,272.00 | Income Tax @ 1% | Event 9 | Page 5 |
| 3,261.00 | Labour Cess @ 1% | Event 9 | Page 5 |
| 15,708.00 | Royalty | Event 9 | Page 5 |
| 2,120.00 | Royalty @ 25% surcharge | Event 9 | Page 5 |
| (blank) | Total deduction — field blank on document | Event 9 | Page 5 |
| 3,54,581.00 | Net payment to contractor | Event 9 | Pages 1, 5, 13 |

### BOQ Line Items — Final Bill Executed Quantities (Page 2)

| Item | Qty | Unit | Rate (Rs.) | Amount (Rs.) |
|------|-----|------|-----------|-------------|
| WBM Grading 2 | 27.24 | CUM | 2,478.00 | 67,500.72 |
| Dismantling of Structures | 45.41 | CUM | 528.10 | 23,981.02 |
| Brick Masonry CM 1:4 | 12.14 | CUM | 6,029.90 | 73,202.99 |
| Plastering CM 1:4 15mm | 61.75 | SQM | 191.70 | 11,837.48 |
| Interlocking Concrete Block M-35 80mm | 363.30 | SQM | 642.90 | 2,33,565.57 |
| PCC Nominal Mix 1:2:4 | 4.94 | CUM | 6,109.20 | 30,179.45 |
| WBM Grading 3 | 27.24 | CUM | 2,634.70 | 71,769.23 |
| **TOTAL** | — | — | — | **5,12,036.45** |

**Note on arithmetic check:** Independent multiplication of Dismantling (45.41 × 528.10) and Plastering (61.75 × 191.70) gives results differing from RTI-stated amounts by Rs. 0.50 and Rs. 4.95 respectively, likely due to intermediate rounding in the original bill. RTI document figures are authoritative — use those, not recalculated values.

### Works Register — R.D. Infra Concurrent Works (Page 13)

| S.No. | Location | Govt. Est. | Tender Amt | Actual Payment | Anomaly |
|-------|----------|-----------|-----------|---------------|---------|
| 27 | Ward 16, Geetanjali Vihar | 13,02,000 | 8,02,176 | 8,02,176 | None |
| 28 | Ward 28 (this road) | 6,06,000 | 3,87,234 | 3,86,086 | None |
| 29 | Ward 38 | 3,26,000 | 2,11,248 | 2,11,276 | ⚠️ Payment Rs. 28 above tender |
| 30 | DM Camp Office | 2,48,000 | 2,45,272 | 2,38,055 | None |

---

## SECTION 6 — MEASUREMENTS
*Maps to `segments` and `drains` tables*

### Road / Pavement

| Item | BOQ Qty | Executed Qty | Unit | Source |
|------|--------|------------|------|--------|
| Interlocking tile surface area | 317.20 | 363.30 | SQM | Pages 16, 2 |
| WBM Grading 2 (base layer) | 27.45 | 27.24 | CUM | Pages 16, 2 |
| WBM Grading 3 (base layer) | 27.45 | 27.24 | CUM | Pages 16, 2 |
| Dismantling of existing structures | 36.60 | 45.41 | CUM | Pages 16, 2 |
| Tile thickness (specification) | 80 mm | 80 mm | mm | Pages 2, 16 |

**For `segments` table:**
- `area`: 363.30 SQM | Source: Page 2 (executed final bill)
- `surfaceThickness`: 80 mm | Source: Pages 2, 16 (IS Clause 1504 specification)
- `length`: NULL — not stated anywhere in 41 pages
- `width`: NULL — not stated anywhere in 41 pages

### Drain Construction (as billed — physical existence UNVERIFIED by RTI)

| Item | BOQ Qty | Executed Qty | Unit | Source |
|------|--------|------------|------|--------|
| Brick masonry CM 1:4 (drain walls) | 12.81 | 12.14 | CUM | Pages 16, 2 |
| Plastering CM 1:4 15mm (drain wall surface) | 109.81 | 61.75 | SQM | Pages 16, 2 |
| PCC Nominal Mix 1:2:4 (drain foundation) | 7.69 | 4.94 | CUM | Pages 16, 2 |

**For `drains` table:**
- `length`: NULL — not stated
- `width`: NULL — not stated
- `depth`: NULL — not stated
- `area`: NULL — not stated
- Physical existence of drain: NULL — requires field verification. No document in these 41 pages confirms or denies the drain's physical existence.

---

## SECTION 7 — PHOTOS AND EVIDENCE REFERENCES

| Reference | Description | In RTI? | Source |
|-----------|-------------|--------|--------|
| Flag "A" | Photographs of work (before, during, after) | NO — referenced only | Page 1 |
| Flag "B" | Certified copy of Measurement Book | NO — referenced only | Page 1 |
| Measurement Book No. 86, Pages 175–177 | Measurement records dated 03.04.2025 | NO — referenced only | Pages 1, 3 |
| Lab Test Report BM250329029 | Infratest tile compressive strength, 30.03.2025 | YES — full document | Page 6 |
| e-Stamp Cert IN-UK71963414508710X | Agreement stamp, 01.02.2025 | YES — full document | Page 7 |
| GST No-Dues Cert (R.D. Infra) | 07.10.2024, Sunil Rawat, Zone-04 | YES — full document | Page 17 |
| Contractor Reg. Cert (Aman Trading Co.) | Grade A, Validity 31.03.2024 | YES — losing bidder | Page 28 |
| GST Cert (Aman Trading Co.) | 05.10.2024, Manavendra Singh, Sector-2 | YES — losing bidder | Page 29 |
| ESIC Reg (Aman Trading Co.) | Code 61000542220001009, 19.10.2021 | YES — losing bidder | Pages 30, 31 |
| EPF Code (Aman Trading Co.) | UKDDN2501626000, 26.10.2021 | YES — losing bidder | Pages 32, 33 |
| Contractor Renewal Reg (Mukram Rao) | Grade A0, Validity 26.07.2024 | YES — losing bidder | Page 39 |
| GST Cert (Mukram Rao) | 01.10.2024, Anju Semwal, Sector-3 | YES — losing bidder | Page 40 |

**Pattern:** RTI provides extensive compliance documentation for two losing bidders (both with expired registrations) but only a GST certificate for the winning contractor. No EPFO registration, no contractor registration certificate, no ESIC for M/s R.D. Infra — despite payment being explicitly conditioned on EPFO registration in the work order.

---

# PART 2 — SCHEMA GAPS

---

### GAP 1 — Second Invitation Round / Prior Round Absent

**What:** Page 11 states "130 tenders were invited a second time" via notice 19.10.2024. First round entirely absent from RTI.
**Why it matters:** Ward 28 tender resulted from the second attempt. Prior round outcome unknown.
**Where it goes:** `evidence` JSONB on `budget_sanctioned` event. No schema change needed.

---

### GAP 2 — Expired Registrations of Competing Bidders

**What:** Aman Trading Co. registration expired 31.03.2024 (8+ months before tender). Mukram Rao registration expired 26.07.2024 (4+ months before tender). Both bids were accepted and evaluated.
**Why it matters:** Tender rules require valid registration. Accepting expired-registration bids is a procedural violation.
**Where it goes:** `evidence` JSONB on `work_order_issued` (isTender) event. No schema change needed.

---

### GAP 3 — Anomalous EMD for Unnamed Bidder (Page 20)

**What:** Unnamed second bidder submitted SBI FDR No. 42170668764 dated 11/08/23 (16 months pre-tender) for Rs. 2,500 — only 13.8% of required Rs. 18,180 EMD. Receipt was issued (No. 1678/12) accepting this FDR.
**Why it matters:** An expired, undersized FDR being accepted as valid EMD is a serious process anomaly.
**Where it goes:** `evidence` JSONB on `work_order_issued` (isTender) event. No schema change needed.

---

### GAP 4 — Work Order Date Conflict

**What:** Page 10 (Work Order document) dated 23.02.2025. Page 12 (Completion Certificate, S.No. 6) records "Date of Work Order: 28.02.2025."
**Why it matters:** Two official documents give different dates for the same act.
**Where it goes:** `evidence` JSONB on `work_order_issued` event. No schema change needed.

---

### GAP 5 — Contract Completion Date Conflict

**What:** "Date of Completion as per Bond" is 13/04/2025 on Page 3 and 09.04.2025 on Page 12.
**Why it matters:** Internally inconsistent official record on a date determining whether the contractor delivered on time.
**Where it goes:** `evidence` JSONB on `completion_claimed` event. No schema change needed.

---

### GAP 6 — Measurement Book Reference Conflict

**What:** Page 1 and Page 3 cite "MB No. 86, Pages 175–177." Pages 3 and 5 also contain "page 15/10/22 of Measurement Book No. —" (MB number blank). "15/10/22" may be a date notation (15 Oct 2022) or page numbers.
**Why it matters:** If "15/10/22" is October 2022, it refers to a measurement entry from before the project started in 2025 — this would be a serious anomaly.
**Where it goes:** `evidence` JSONB on `completion_claimed` event. Requires physical document inspection.

---

### GAP 7 — Quantity Discrepancies BOQ vs Executed

**What:** Interlocking tiles +14.5%, Dismantling +24.1%, Plastering -43.8%, PCC -35.8%, Steel RSJs -100%, RCC M25 -100%, TMT -100%.
**Why it matters:** The 43.8% reduction in plastering and 35.8% reduction in PCC (both drain-related items) corroborates possibility that the drain was built significantly smaller than specified or not at all. The complete elimination of steel and reinforcement from execution is notable.
**Where it goes:** `evidence` JSONB on `completion_claimed` event as `boqVsExecuted` array — added above. No new table needed.

---

### GAP 8 — Ghost Drain Figure Source Unknown

**What:** MAPPING.md states "₹98,293 billed for a drain that does not exist." This figure does not appear anywhere in the 41 RTI pages. Drain items at schedule rates total Rs. 1,15,219.92. After 36.10% discount: Rs. 73,625.52. After 18% GST: ~Rs. 86,878.
**Why it matters:** This is described as a core public-facing accountability claim. An unverifiable figure cannot be displayed.
**Where it goes:** Founder action required. The figure must be sourced to a specific document before any public display.

---

### GAP 9 — Winning Contractor Documentation Missing

**What:** RTI provides ESIC, EPF, GST, registration certificates for losing bidders but not for the winning contractor M/s R.D. Infra. Specifically absent: contractor registration certificate (grade and validity), EPFO registration, ESIC.
**Why it matters:** Cannot verify R.D. Infra met all mandatory eligibility requirements. Payment was conditioned on EPFO registration which is unverified.
**Where it goes:** `license_number` field currently NULL. Follow-up RTI action required.

---

### GAP 10 — Deduction Arithmetic Gap (Rs. 600)

**What:** Itemised deductions = Rs. 30,905. Actual deduction = Rs. 3,86,086 − Rs. 3,54,581 = Rs. 31,505. Gap: Rs. 600. IGST shown as dash/nil. Total deduction field blank.
**Why it matters:** Rs. 600 was deducted without a visible line item in the official document.
**Where it goes:** `evidence` JSONB on `payment_released` event. No schema change.

---

### GAP 11 — Third Bidder Name Discrepancy

**What:** BOQ (Page 21): "Mahul Singh, Shamben, Rampur." Envelope (Page 23): "M/s Mahesh Singh Contractor."
**Why it matters:** Minor — losing bidder. Indicates inconsistent identification or misfiled envelope.
**Where it goes:** `evidence` JSONB on tender event. No schema change.

---

### GAP 12 — Ward 38 Payment Exceeds Tender (Same Contractor)

**What:** Page 13, S.No. 29: M/s R.D. Infra Ward 38 work shows Tender Rs. 2,11,248, Actual Payment Rs. 2,11,276. Payment exceeds tender by Rs. 28.
**Why it matters:** Payment above tender amount without a variation order is irregular. Same contractor as Ward 28.
**Where it goes:** Contractor `persons` record note. Future contractor portfolio feature. No schema change.

---

### GAP 13 — DLP Active at RTI Date

**What:** DLP expires 03.04.2026. RTI filed 17.11.2025. RTI response 05.02.2026. Both within DLP.
**Why it matters:** If road is in poor condition during DLP, contractor is contractually liable and security can be seized.
**Where it goes:** `dlp_started` event (extracted above). No schema change.

---

### GAP 14 — No Condition Events in RTI

**What:** RTI contains only contract/payment documents. Zero condition events (cracks, potholes, flooding, drain blockage).
**Why it matters:** Section 3 condition cards will be empty until field survey or citizen reports are added separately.
**Where it goes:** Founder action — field survey required.

---

### GAP 15 — EPFO/ESIC Compliance Unverified for Winning Contractor

**What:** Work Order (Page 10) explicitly states: "Payment shall not be made if the firm is not registered with E.P.F.O." No EPFO document for M/s R.D. Infra is in the RTI response. Payment was released.
**Why it matters:** Payment was released despite an explicit contractual condition remaining unverified in the official record.
**Where it goes:** `evidence` JSONB on `payment_released` event. Also `completion_claimed`. No schema change.

---

# CONSOLIDATED VERIFICATION CHECKLIST
*All items requiring founder action before developer use*

| # | Issue | Pages | Priority |
|---|-------|-------|----------|
| 1 | JE name: who physically signed the completion certificate on 03.04.2025? (Name absent from Pages 1 and 12) | 1, 12 | 🔴 Critical |
| 2 | AE name: same — who signed? | 1, 12 | 🔴 Critical |
| 3 | EE name: "Aashray Singh Mishra" (Page 11) vs "Alok Singh Mishravaan" (MAPPING.md) | 10, 11, 12 | 🔴 Critical |
| 4 | Ghost drain Rs. 98,293: not in RTI. Drain billing is Rs. 1,15,219.92 pre-discount. Source document required. | — | 🔴 Critical |
| 5 | Drain physical existence: field verification required | — | 🔴 Critical |
| 6 | Work Order date: 23.02.2025 (Page 10) vs 28.02.2025 (Page 12) | 10, 12 | 🟠 High |
| 7 | Contract completion date: 13.04.2025 (Page 3) vs 09.04.2025 (Page 12) | 3, 12 | 🟠 High |
| 8 | FDR No. 6999: Rs. 18,180 (Page 15) vs Rs. 18,500 (Page 7) — same FDR, different amounts | 7, 15 | 🟠 High |
| 9 | Measurement Book "page 15/10/22": is this a date (Oct 2022) or page numbers? | 3, 5 | 🟠 High |
| 10 | Karmendra Singh: one person in two roles, or two people? | 11 | 🟠 High |
| 11 | Aman Trading Co. expired registration (31.03.2024) accepted into Dec 2024 tender — confirm from physical document | 28 | 🟠 High |
| 12 | Mukram Rao expired registration (26.07.2024) accepted into Dec 2024 tender — confirm | 39 | 🟠 High |
| 13 | Page 20 unnamed bidder: FDR dated Aug 2023, amount Rs. 2,500 — confirm this is accurately read | 20 | 🟠 High |
| 14 | Deduction arithmetic gap Rs. 600 — verify against physical document | 5 | 🟡 Medium |
| 15 | Ward 38 payment Rs. 28 above tender — confirm extraction accuracy | 13 | 🟡 Medium |
| 16 | Mahul Singh (Page 21) vs Mahesh Singh Contractor (Page 23) — same or misfiled? | 21, 23 | 🟡 Medium |
| 17 | "in lieu of zero" — confirm meaning in agreement | 7 | 🟡 Medium |
| 18 | Flag A photographs: obtain physical copies from Nagar Nigam Roorkee | 1 | 🟡 Medium |
| 19 | Measurement Book No. 86 Pages 175–177: obtain certified copy | 1, 3 | 🟡 Medium |
| 20 | M/s R.D. Infra contractor registration certificate: file follow-up RTI | — | 🟡 Medium |
| 21 | M/s R.D. Infra EPFO registration: file follow-up RTI (payment was conditioned on it) | 10 | 🟡 Medium |
| 22 | R.D. Infra address: "House No. 405/1, Malakpur, Arora Colony" (Page 10) vs "Near Arora Colony, Ground Floor, Solani Apartment" (Page 17) | 10, 17 | 🟢 Low |

---

*End of WARD28_VERIFIED_DATA.md*
*Version 2.0 — Second-pass verified. All 41 pages re-read line by line against Version 1.0.*
*Changes from V1.0: 9 new issues added, 1 structural correction (Elimination Sheet scope), 3 evidence JSONB additions, arithmetic re-verified, all events re-checked.*
*Total: 11 events | 13 persons | 12 schema gaps | 22 founder verification items.*
*FOUNDER SIGN-OFF REQUIRED BEFORE DEVELOPER USE.*