# WARD 28 — EVENTS (Chronological)
## Source: RTI Application No. 35 | File No. 39557 | 41 Pages
## Ready-to-ingest sequence. Maps directly to the events table.
## Cross-reference WARD28_05_CONFLICTS.md before ingesting any CONFLICT field.

---

## FORMAT
Each event: eventType | timestamp | description | evidence fields | participants | source | confidence

---

## EVENT 1 — budget_sanctioned

```
Timestamp    → 2024-10-19
Description  → 130 tenders invited for the second time across multiple interlocking
                and CC road works via notice dated 19.10.2024. This was explicitly a
                second invitation round — implying a prior round with no documents in
                this RTI. 15 tenders received across all listed works.
Evidence:
  invitationRound           → 2
  totalTendersInvited       → 130
  noticeDate                → "19.10.2024"
  totalTendersReceived      → 15
  eliminationSheetFileNo    → "204/Nagar Anu 0/Nagar Nigam Roorkee/2024-25"
Participants → none linked
Source       → Page 11 (elimination sheet references this notice; notice itself not in RTI)
Confidence   → MEDIUM (date comes from a referenced document, not one present in the RTI)
```

---

## EVENT 2 — work_order_issued (Tender Award)

```
Timestamp    → 2024-12-05 (tender opened and received)
Description  → Tenders received and opened 05.12.2024. Five firms participated for
                Ward 28. M/s R.D. Infra submitted lowest bid at 36.10% below estimated
                amount (₹3,87,234). Tender Committee accepted 13.12.2024.
Evidence:
  isTender                       → true
  estimatedValue                 → 606000
  contractValue                  → 387234
  discountPercent                → 36.10
  tenderCommitteeApprovalDate    → "13.12.2024"
  tenderCallPeriod               → "01.12.2024 to 03.12.2024"
  tenderReceivedDate             → "05.12.2024"
  tenderOpenedDate               → "05.12.2024"
  tenderValidityDays             → 60
  durationDays                   → 45
  earnestMoney                   → 18180
  tenderFormCostPlusGST          → 1180
  workSerialNo                   → "07"
  boqEstimatedTotal              → 515617.90
  winningFirm                    → "M/s R.D. Infra, Roorkee"
  winningProprietor              → "Shubham Sharma"
  biddersParticipated            → 5
  contractorRegistrationVerified → false
  contractorRegistrationNote     → "Registration certificate of M/s R.D. Infra not
                                    included in RTI response. Certificates only provided
                                    for two eliminated bidders, both with expired registrations."
  gstNoDuesCertificate:
    issuedBy    → "Sunil Rawat, Assistant Commissioner, State Tax, Zone-04, Roorkee"
    date        → "07.10.2024"
    returnsFiled → "Quarterly, up to June 2024 (FY 2024-25)"
    outstanding  → "Nil as on 07.10.2024"
  bids:
    - firm: "M/s R.D. Infra (Shubham Sharma)"
      rate: "36.10% Below"
      contractValue: 387234
      fdrNo: "6999"
      fdrBank: "Bank of Baroda"
      fdrDate: "03.12.2024"
      fdrAmount: 18180
      receiptNo: "1698/15"
      result: "Accepted — L1 (lowest bidder)"
    - firm: "Unknown (Page 20)"
      fdrNo: "42170668764"
      fdrBank: "SBI"
      fdrDate: "11/08/2023"
      fdrAmount: 2500
      anomaly: "FDR predates tender by ~16 months. Amount is 13.8% of required EMD."
      result: "Unknown — presumed eliminated"
    - firm: "M/s Mahul Singh / M/s Mahesh Singh Contractor (name conflict)"
      rate: "25% Above"
      address: "Shamben, Rampur"
      result: "Eliminated — rate above estimated"
    - firm: "M/s Aman Trading Co. (Upendra Singh)"
      rate: "95.50% Above"
      fdrNo: "787261"
      fdrBank: "Canara Bank, Troni Talmanas Branch"
      fdrDate: "30-11-2024"
      fdrAmount: 75600
      registrationGrade: "A"
      registrationValidity: "31.03.2024"
      anomaly: "Registration expired 8+ months before tender call. Accepted into process."
      result: "Eliminated — rate above estimated"
    - firm: "M/s Mukram Rao Contractor (Mukram Rao)"
      rate: "25% Above"
      fdrNo: "8906716"
      fdrBank: "IDBT (likely IDBI — abbreviated in document)"
      fdrDate: "05-10-2024"
      fdrAmount: 20000
      registrationGrade: "A0"
      registrationValidity: "26.07.2024"
      anomaly: "Registration expired 4+ months before tender call. Accepted into process."
      result: "Eliminated — rate above estimated"
Participants → Shubham Sharma (assignee), JE/AE/EE/SFO/MC (authorisers — LOW confidence)
Source       → Pages 10, 15, 16
Confidence   → HIGH
```

---

## EVENT 3 — work_order_issued (Contract Bond / e-Stamp)

```
Timestamp    → 2025-02-01 (e-stamp issue date)
Description  → Contract agreement executed. M/s R.D. Infra (First Party) and Nagar
                Nigam Roorkee (Second Party). e-Stamp issued 01.02.2025. Agreement No.
                587/Nagar Nigam Roorkee/2024-25 dated 28.02.2025. Security deposits
                and performance security FDRs deposited. 25 contract terms accepted.
Evidence:
  eStampCertNo         → "IN-UK71963414508710X"
  eStampUniqueDocRef   → "SUBIN-UKUK121520451122761103636X"
  eStampIssueDate      → "01-Feb-2025"
  eStampIssueTime      → "12:44 PM"
  documentType         → "Article 5 — Agreement or Memorandum of an Agreement"
  stampDutyPaidBy      → "R D INFRA"
  stampDutyAmount      → 100
  firstParty           → "R D INFRA"
  secondParty          → "NAGAR NIGAM ROORKEE"
  agreementNo          → "587/Nagar Nigam Roorkee/2024-25"
  agreementDate        → "28.02.2025"
  tenderCommitteeApprovalDate → "13.12.2024"
  contractTermsCount   → 25
  dlpMonths            → 12
  dlpContractTerms     → "Terms 11, 12, 23 on Pages 8 and 9"
  securityDepositFDRs:
    - fdrNo: "7245" | date: "19.02.2025" | amount: 6000 | purpose: "security deposit"
    - fdrNo: "6998" | date: "03.12.2024" | amount: 33000 | purpose: "security deposit"
  performanceSecurityFDRs:
    - fdrNo: "7243" | date: "19.02.2025" | amount: 200000 | purpose: "performance security"
    - fdrNo: "6999" | amount: 18500 | purpose: "performance security"
      ⚠️ CONFLICT: FDR 6999 also appears as EMD on Page 15 (₹18,180, Bank of Baroda).
         Same number, different amounts, different purposes. DO NOT USE until verified.
Participants → Shubham Sharma (assignee), Prem Kumar Sharma (certifier — LOW confidence),
               Jitendra Kumar (authoriser — LOW confidence)
Source       → Pages 7, 8, 9
Confidence   → HIGH (except FDR 6999 — CONFLICT)
```

---

## EVENT 4 — work_order_issued (Formal Work Order)

```
Timestamp    → 2025-02-23 (CONFLICT — Page 12 says 28.02.2025)
Description  → Official work order issued to M/s R.D. Infra by Executive Engineer,
                Nagar Nigam Roorkee. File No. 539/Nagar Anu 0/Nagar Nigam Roorkee/2024-25.
                Contract value ₹3,87,234. Directed to complete within 45 days, submit
                geo-tagged photographs, provide written notice of start and completion.
                Payment withheld if firm not registered with EPFO.
Evidence:
  isTender                          → false
  workOrderFileNo                   → "539/Nagar Anu 0/Nagar Nigam Roorkee/2024-25"
  workOrderDocumentDate             → "23.02.2025"
  contractAmount                    → 387234
  durationDays                      → 45
  issuedBy                          → "Executive Engineer, Nagar Nigam Roorkee"
  copiesTo                          → ["Municipal Commissioner", "Assistant Engineer", "Junior Engineer"]
  epfoRegistrationRequiredForPayment → true
  geoTaggedPhotosRequired           → true
  dateConflictNote                  → "Page 10 dated 23.02.2025. Page 12 S.No.6 says 28.02.2025.
                                       Verify against physical document."
Participants → Aashray Singh Mishra (authoriser), Shubham Sharma (assignee)
Source       → Page 10
Confidence   → HIGH (timestamp is CONFLICT — see WARD28_05_CONFLICTS.md, Conflict 2)
```

---

## EVENT 5 — construction_started

```
Timestamp    → 2025-02-28
Description  → Construction commenced on 28.02.2025. Road and drain construction using
                coloured interlocking tiles in Ward No. 28, from Vijendra's shop to
                Ajay Raj's house.
Evidence     → null
Participants → none linked
Source       → Pages 3, 12
Confidence   → HIGH
```

---

## EVENT 6 — lab_test_report_submitted

```
Timestamp    → 2025-03-30
Description  → Lab test report submitted by NABL-accredited Infratest Investigation &
                Research Centre Pvt. Ltd. for Interlocking Tiles M-35. 8 samples collected
                29.03.2025, tested 29–30.03.2025. Average compressive strength 40.7 N/mm²
                against minimum requirement 39.1 N/mm². Test passed.
Evidence:
  labName           → "Infratest Investigation & Research Centre Pvt. Ltd."
  labAddress        → "Back Roorkee Public School, Sherpur, Roorkee, Distt. Haridwar, 247667"
  labPhone          → ["+91-9520997251", "+91-9520997254"]
  labEmail          → ["ho.roorkee@infratest.co.in", "infratestlabs@gmail.com"]
  labWebsite        → "https://infratest.co.in"
  labCertifications → ["ISO 9001:2015", "ISO 14001:2015", "NABL Accredited"]
  reportNo          → "BM250329029"
  reportDate        → "30.03.2025"
  jobOrderNo        → "250329029"
  letterRefNo       → "Memo/Nagar Nigam Work Inspection/2024-25, Dated: 29.03.2025"
  sampleReceivedDate → "29.03.2025"
  sampleQuantity    → "08 Pcs."
  sampleCondition   → "OK"
  materialType      → "Interlocking Tiles M-35"
  issuedTo          → "Assistant Municipal Commissioner, Nagar Nigam Roorkee"
  testLocation      → "In Lab"
  testDates         → "29.03.2025 to 30.03.2025"
  testMethod        → "IS: 15658:2021"
  testCategory      → "Mechanical Testing"
  results:
    individualResults_N_mm2        → [39.8, 42.3, 39.1, 40.5, 40.2, 41.9, 42.6, 38.9]
    averageResult_N_mm2            → 40.7
    requirementIndividual_min      → 32.0
    requirementAverage_min         → 39.1
    passed                         → true
  preparedBy         → "Govind"
  authorisedSignatory → "Pranav Dixit, Tech-Manager"
  agreementNoRef     → "587/Nagar Nigam Roorkee/2024-25"
  agreementDateRef   → "28.02.2025"
  agencyRef          → "M/s R.D. Infra, Roorkee, Distt. Haridwar"
  labDisclaimer      → "Results refer only to submitted samples. Not to be used as court evidence.
                         Sample will be destroyed after 30 days."
Participants → Pranav Dixit (certifier)
Source       → Page 6
Confidence   → HIGH
```

---

## EVENT 7 — completion_claimed

```
Timestamp    → 2025-04-03
Description  → Work certified as satisfactorily completed at site per specifications.
                Measurements recorded in Measurement Book No. 86, Pages 175–177, dated
                03.04.2025. Inspected same day by Junior Engineer and Assistant Engineer.
                Countersigned by Executive Engineer. Final bill ₹3,86,086. Completed
                10 days ahead of contract date.
Evidence:
  measurementDate        → "03.04.2025"
  measurementBookNo      → 86
  measurementBookPages   → "175 to 177"
  measurementBookConflict → "Pages 3 and 5 reference 'page 15/10/22 of MB No.' with MB
                              number blank. May be a date (15 Oct 2022) predating project.
                              Verify against physical document."
  inspectionDate         → "03.04.2025"
  memoOfWorkNo           → "687"
  finalBillAmount        → 386086.00
  certifiedSatisfactory  → true
  photosAttachedFlagA    → true
  measurementBookCopyFlagB → true
  geoTaggedPhotosRequired → true
  geoTaggedPhotosConfirmed → null
  geoTaggedPhotosNote    → "Required per Pages 10 and 18 (Term 17). Flag A photos referenced
                             but not included in RTI. Cannot confirm compliance. Payment released."
  startDate              → "28.02.2025"
  actualCompletionDate   → "03.04.2025"
  contractCompletionDate_page3  → "13.04.2025"
  contractCompletionDate_page12 → "09.04.2025"
  contractCompletionDateConflict → "CONFLICT — two documents give different deadline dates"
  completedBeforeContractDate   → true
  timeExtensionNote      → "The mentioned work has been included in the time extension.
                             Work completed before contract date so extension was not needed
                             for Ward 28 specifically. Likely blanket extension across batch."
  epfoComplianceConfirmed → null
  epfoNote               → "Payment required EPFO registration (Page 10). No EPFO document
                             for M/s R.D. Infra in RTI. Payment was released."
  areaClaimed_sqm        → 363.30
  boqVsExecuted:
    - item: "Dismantling of Structures" | boq: 36.60 | executed: 45.41 | unit: CUM | change: +24.1%
    - item: "WBM Grading 2"             | boq: 27.45 | executed: 27.24 | unit: CUM | change: -0.8%
    - item: "WBM Grading 3"             | boq: 27.45 | executed: 27.24 | unit: CUM | change: -0.8%
    - item: "PCC Nominal Mix 1:2:4"     | boq: 7.69  | executed: 4.94  | unit: CUM | change: -35.8%
    - item: "Interlocking Block M-35"   | boq: 317.20| executed: 363.30| unit: SQM | change: +14.5%
    - item: "Steel RSJs"                | boq: 0.50  | executed: 0     | unit: QTL | change: -100%
    - item: "Brick Masonry CM 1:4"      | boq: 12.81 | executed: 12.14 | unit: CUM | change: -5.2%
    - item: "Plastering CM 1:4 15mm"    | boq: 109.81| executed: 61.75 | unit: SQM | change: -43.8%
    - item: "RCC Grade M25"             | boq: 0.17  | executed: 0     | unit: CUM | change: -100%
    - item: "TMT bar Fe 415"            | boq: 0.11  | executed: 0     | unit: QTL | change: -100%
  drainItemsBilledAtScheduleRates → 115219.92
  drainItemsBreakdown:
    brickMasonry_12.14_CUM → 73202.99
    plastering_61.75_SQM   → 11837.48
    PCC_4.94_CUM           → 30179.45
  ghostDrainNote → "₹98,293 figure in MAPPING.md does NOT appear in 41 RTI pages.
                     Drain items at schedule rates = ₹1,15,219.92. After discount + GST ≈ ₹86,878.
                     Do not display ₹98,293 until founder confirms source."
Participants → Gurukesh Singh (certifier), Prem Kumar Sharma (certifier),
               Aashray Singh Mishra (authoriser), Shubham Sharma (assignee)
Source       → Pages 1, 3, 12
Confidence   → HIGH
```

---

## EVENT 8 — dlp_started

```
Timestamp    → 2025-04-03 (same as completion)
Description  → Defect Liability Period commenced upon work completion. Contractor
                (M/s R.D. Infra) responsible for all repairs and maintenance for 1 year.
                Security deposit refundable only after 1 year on audit satisfaction.
                10% of security deposit subject to seizure if monitoring neglected
                per Contract Term 23.
Evidence:
  dlpStartDate                → "03.04.2025"
  dlpEndDate                  → "03.04.2026"
  dlpDurationMonths           → 12
  securityDepositTotal_approx → 57180
  securityDepositBreakdown:
    fdr6999_BoB_page15 → 18180
    fdr6998_page7      → 33000
    fdr7245_page7      → 6000
    conflictNote       → "FDR 6999 amount conflict: ₹18,180 (Page 15) vs ₹18,500 (Page 7)"
  performanceSecurityTotal_approx → 218500
  performanceSecurityBreakdown:
    fdr7243_page7            → 200000
    fdr6999_performance_page7 → 18500
  refundCondition    → "After 1 year upon satisfaction of audit objection"
  penaltyClause      → "10% of security deposit seized if monitoring neglected (Term 23)"
  contractTermsRef   → "Terms 11, 12, 23 — Contract Bond, Pages 8 and 9"
  statusAtRtiDate    → "DLP active — RTI filed 17.11.2025, DLP expires 03.04.2026"
  statusAtRtiResponse → "DLP active — RTI response 05.02.2026, DLP expires 03.04.2026"
Participants → none linked
Source       → Pages 8, 9
Confidence   → HIGH
```

---

## EVENT 9 — payment_released

```
Timestamp    → 2025-06-30
Description  → Final payment of ₹3,54,581 released to M/s R.D. Infra after all
                deductions. Scheduled rates total ₹5,12,036.45, less 36.10% discount
                = ₹3,27,191.29, plus 18% GST = ₹3,86,085.72. After statutory
                deductions (CGST, SGST, Income Tax, Labour Cess, Royalty), net ₹3,54,581.
Evidence:
  netDisbursed          → 354581
  sanctionedBudget      → 606000
  contractAmount        → 387234
  scheduledRatesTotal   → 512036.45
  discountPercent       → 36.10
  discountAmount        → 184845.16
  actualPriceOfWork     → 327191.29
  gstPercent            → 18
  gstAmount             → 58894.43
  totalValueOfWorkDone  → 386085.72
  billedAmount          → 386086.00
  deductions:
    CGST_1pct           → 3272
    SGST_1pct           → 3272
    IGST_2pct           → 0
    IncomeTax_1pct      → 3272
    LabourCess_1pct     → 3261
    Royalty             → 15708
    RoyaltySurcharge_25pct → 2120
    totalDeductionOnDocument → "BLANK"
  deductionArithmeticNote → "Items sum to ₹30,905 but ₹3,86,086 − ₹3,54,581 = ₹31,505.
                              Unaccounted ₹600. IGST shown as dash. Total field blank.
                              Verify against physical document."
  paymentInWords        → "Three Lakh Fifty Four Thousand Five Hundred Eighty One Only"
  chequeNo              → null
  chequeDate            → null
  noteSheetAuthor       → "Sachin Kumar, Clerk (Construction), Nagar Nigam Roorkee"
  noteSheetDate         → "30.06.2025"
  signedBy              → ["Account Clerk", "Accountant", "PIO", "Municipal Commissioner"]
  lastCertificateAmount → 0.00
  amountSinceLastCertificate → 386085.72
Participants → Sachin Kumar (reporter), Prashant Kumar (authoriser — LOW confidence),
               Jitendra Kumar (authoriser — LOW confidence)
Source       → Pages 1, 5
Confidence   → HIGH
```

---

## EVENT 10 — rti_filed

```
Timestamp    → 2025-11-17
Description  → Online RTI application No. 35 filed by Vidushi requesting certified
                copies of documents relating to Ward 28 road and drain construction,
                Nagar Nigam Roorkee.
Evidence:
  rtiApplicationNo → 35
  rtiFiledDate     → "17.11.2025"
  rtiMode          → "online"
  applicantName    → "Vidushi"
  applicantAddress → "House No. 247/7, Purvi Deen Dayal, Roorkee, District Haridwar, Uttarakhand"
Participants → Vidushi (reporter)
Source       → Covering letter
Confidence   → HIGH
```

---

## EVENTS 12–14 — citizen field observations (crack_found, pothole_found, drain_blocked)

> These are the primary condition events. One event per type, each linked to the single segment. Photos are attached to these events and display in Section 3 cards.

```
crack_found (EVENT 12)
Timestamp    → 2026-02-08
Severity     → critical
Description  → Surface cracks documented by citizen field visit on 8 February 2026.
               Multiple cracks visible across interlocking tile surface in Ward No. 28.
Photos       → 8 photos (001–008). Status per photo:
               critical: 001, 002, 004, 005, 007, 008
               warning:  003, 006
Participants → Vidushi (reporter, verified)

pothole_found (EVENT 13)
Timestamp    → 2026-02-08
Severity     → critical
Description  → Potholes documented by citizen field visit on 8 February 2026.
               Tile surface breaking up in multiple locations in Ward No. 28.
Photos       → 10 photos (001–010). Status per photo:
               critical: 001, 002, 003, 004, 006, 010
               warning:  005, 007, 008, 009
Participants → Vidushi (reporter, verified)

drain_blocked (EVENT 14)
Timestamp    → 2026-02-08
Severity     → medium
Description  → Partial structural damage observed on drain section. A portion of the
               drain is broken. Full drain construction on site unconfirmed — billed
               at ₹86,878 and certified complete but physical existence not fully verified.
Photos       → 11 photos (001–011). Status per photo:
               critical: 003
               warning:  001, 002, 004, 005, 006
               good:     007, 008, 009, 010, 011
Participants → Vidushi (reporter, verified)
```

---

## EVENTS 15–28 — additional crack_found (counts 2–15)

> November 2025 field observation documented 15 surface cracks total. Events 15–28 represent cracks 2–15. No photos attached — photos are all on Event 12 (crack 1). Count in Section 3 = number of crack_found events = 15.

```
Timestamp    → 2026-02-08 (all)
Severity     → critical (all)
evidenceSource → citizen (all)
Participants → Vidushi (reporter, verified) on each
```

---

## EVENTS 29–37 — additional pothole_found (counts 2–10)

> November 2025 field observation documented 10 potholes total. Events 29–37 represent potholes 2–10. No photos attached — photos are all on Event 13 (pothole 1). Count in Section 3 = number of pothole_found events = 10.

```
Timestamp    → 2026-02-08 (all)
Severity     → critical (all)
evidenceSource → citizen (all)
Participants → Vidushi (reporter, verified) on each
```

---

## EVENTS 38–42 — repair_done (privately funded, May 2026)

> Contractor did not act during DLP (April 2025 – April 2026). Residents paid privately to repair damage in front of their homes. Exact repair dates unknown — observed repaired 23 May 2026. These events are NOT reflected in Section 3 (which is frozen at November 2025). They belong to the Section 4 betrayal narrative.

```
repair_done × 2 (EVENTS 38–39) — potholes
Timestamp    → 2026-05-23 (observation date)
Evidence:
  privatelyFunded      → true
  repairDateUnknown    → true
  observedRepairedDate → "23.05.2026"
  contractorDLPFailed  → true
Photos       → 2 photos (Cloudinary: v1779532139/001_rnpgdk.jpg, 002_jncfhy.jpg)
               status: good
Participants → Vidushi (reporter, verified)

repair_done × 3 (EVENTS 40–42) — surface cracks
Timestamp    → 2026-05-23 (observation date)
Evidence:
  privatelyFunded      → true
  repairDateUnknown    → true
  observedRepairedDate → "23.05.2026"
  contractorDLPFailed  → true
Photos       → 3 photos (Cloudinary: v1779532167/001_ivldya.jpg, 002_gboh73.jpg,
                                      v1779532169/003_yk1x7x.jpg)
               status: good
Participants → Vidushi (reporter, verified)
```

---

## EVENT 11 — rti_response_received

```
Timestamp    → 2026-02-05
Description  → RTI response provided by PIO, Nagar Nigam Roorkee. File No. 39557.
                41 pages of certified document copies provided. Appeal within 30 days
                to Municipal Commissioner.
Evidence:
  rtiResponseFileNo  → "39557/Public Information Officer/Nagar Nigam Roorkee/2025-26"
  responseDate       → "05.02.2026"
  respondingOfficer  → "Public Information Officer, Nagar Nigam Roorkee"
  documentsProvided  → "Certified photocopies"
  totalPages         → 41
  appealAuthority    → "First Departmental Appellate Authority / Municipal Commissioner,
                         Nagar Nigam Roorkee"
  appealWindowDays   → 30
Participants → PIO (authoriser)
Source       → Covering letter
Confidence   → HIGH
```