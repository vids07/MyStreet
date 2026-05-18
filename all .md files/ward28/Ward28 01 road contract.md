# WARD 28 — ROAD & CONTRACT DATA
## Source: RTI Application No. 35 | File No. 39557 | 41 Pages
## Read this with: WARD28_05_CONFLICTS.md — all conflicts referenced here are detailed there.

---

## FORMAT
```
Field name   → Value
Source       → RTI page number
DB           → table → column
Confidence   → HIGH / MEDIUM / LOW / CONFLICT
```

---

# PART 1 — ROAD

```
Road display name  → "Ward No. 28, from Vijendra's shop towards the house of Ajay Raj, Roorkee"
Source             → Pages 1, 3, 10, 12 (consistent)
DB: roads → road_display_name
Confidence         → HIGH

Ward               → Ward 28
Source             → Pages 1, 3, 10, 12
DB: roads → ward
Confidence         → HIGH

City               → Roorkee
Source             → All pages
DB: roads → city
Confidence         → HIGH

Health status      → critical
Source             → Founder field observation (not from RTI)
DB: roads → health_status
Confidence         → HIGH (founder-set, not document-derived)
```

---

# PART 2 — BUDGET & TENDER

```
Estimated cost (sanctioned budget)  → ₹6,06,000
Source                              → Pages 12, 15, 16
DB: events (work_order_issued) → evidence.estimatedValue
Confidence                          → HIGH

BOQ estimated total                 → ₹5,15,617.90
Source                              → Pages 16, 21, 25, 36 (consistent across all bidder BOQs)
DB: events (work_order_issued) → evidence.boqEstimatedTotal
Confidence                          → HIGH
Note                                → Differs from ₹6,06,000 — budget includes GST overhead on top of BOQ

Contract value (winning bid)        → ₹3,87,234
Source                              → Pages 10, 12, 15, 16
DB: events (work_order_issued) → evidence.contractValue
Confidence                          → HIGH

Discount percentage                 → 36.10% Below estimated
Source                              → Pages 5, 16
DB: events (work_order_issued) → evidence.discountPercent
Confidence                          → HIGH

Work Serial No.                     → 07
Source                              → Pages 15, 16, 19
DB: events (work_order_issued) → evidence.workSerialNo
Confidence                          → HIGH

Tender call period                  → 01.12.2024 to 03.12.2024
Source                              → Pages 16, 21, 25, 36
DB: events (work_order_issued) → evidence.tenderCallPeriod
Confidence                          → HIGH

Tender received date                → 05.12.2024
Source                              → Pages 16, 21, 25, 36
DB: events (work_order_issued) → evidence.tenderReceivedDate
Confidence                          → HIGH

Tender opened date                  → 05.12.2024
Source                              → Pages 16, 21, 25, 36
DB: events (work_order_issued) → evidence.tenderOpenedDate
Confidence                          → HIGH

Tender validity                     → 60 days
Source                              → Pages 16, 21, 25, 36
DB: events (work_order_issued) → evidence.tenderValidityDays
Confidence                          → HIGH

Duration of work                    → 45 days
Source                              → Pages 10, 15, 16
DB: events (work_order_issued) → evidence.durationDays
Confidence                          → HIGH

Earnest money deposit (EMD)         → ₹18,180
Source                              → Pages 15, 16
DB: events (work_order_issued) → evidence.earnestMoney
Confidence                          → HIGH

Tender form cost                    → ₹1,000 + 18% GST = ₹1,180
Source                              → Pages 15, 16
DB: events (work_order_issued) → evidence.tenderFormCostPlusGST
Confidence                          → HIGH

Tender committee approval date      → 13.12.2024
Source                              → Pages 7, 10
DB: events (work_order_issued) → evidence.tenderCommitteeApprovalDate
Confidence                          → HIGH

Number of bidders participated      → 5
Source                              → Pages 15–41 (five firms' documents present)
DB: events (work_order_issued) → evidence.biddersParticipated
Confidence                          → HIGH
```

---

# PART 3 — AGREEMENT / CONTRACT BOND

```
e-Stamp Certificate No.             → IN-UK71963414508710X
Source                              → Page 7
DB: events (work_order_issued) → evidence.eStampCertNo
Confidence                          → HIGH

e-Stamp Unique Doc Reference        → SUBIN-UKUK121520451122761103636X
Source                              → Page 7
DB: events (work_order_issued) → evidence.eStampUniqueDocRef
Confidence                          → HIGH

e-Stamp issue date                  → 01.02.2025, 12:44 PM
Source                              → Page 7
DB: events (work_order_issued) → timestamp (use 2025-02-01)
Confidence                          → HIGH

Agreement No.                       → 587/Nagar Nigam Roorkee/2024-25
Source                              → Page 7
DB: events (work_order_issued) → evidence.agreementNo
Confidence                          → HIGH

Agreement date                      → 28.02.2025
Source                              → Page 7
DB: events (work_order_issued) → evidence.agreementDate
Confidence                          → HIGH

Stamp duty amount                   → ₹100
Source                              → Page 7
DB: events (work_order_issued) → evidence.stampDutyAmount
Confidence                          → HIGH

Contract terms agreed               → 25 terms (Pages 8–9) + 41 tender terms (Pages 18–19)
Source                              → Pages 8, 9, 18, 19
DB: events (work_order_issued) → evidence.contractTermsCount
Confidence                          → HIGH
Note                                → Key DLP terms: 11 (1-year repair responsibility),
                                       12 (security deposit refund after 1 year),
                                       23 (10% security seized if monitoring neglected)

Security deposit FDRs:
  FDR No. 7245 → ₹6,000 → dated 19.02.2025
  FDR No. 6998 → ₹33,000 → dated 03.12.2024
Source                              → Page 7
DB: events (work_order_issued) → evidence.securityDepositFDRs
Confidence                          → HIGH

Performance security FDRs:
  FDR No. 7243 → ₹2,00,000 → dated 19.02.2025
  FDR No. 6999 → ₹18,500 (CONFLICT — see WARD28_05_CONFLICTS.md, Conflict 1)
Source                              → Page 7
DB: events (work_order_issued) → evidence.performanceSecurityFDRs
Confidence                          → CONFLICT

GST No-Dues Certificate (winning contractor):
  Issued by     → Sunil Rawat, Assistant Commissioner, State Tax, Zone-04, Roorkee
  Date          → 07.10.2024
  Returns filed → Quarterly, up to June 2024 (FY 2024-25)
  Outstanding   → Nil as on 07.10.2024
Source                              → Page 17
DB: events (work_order_issued) → evidence.gstNoDuesCertificate
Confidence                          → HIGH
Note                                → Predates tender call (01.12.2024) by ~2 months — acceptable.
```

---

# PART 4 — WORK ORDER

```
Work order file no.                 → 539/Nagar Anu 0/Nagar Nigam Roorkee/2024-25
Source                              → Page 10
DB: events (work_order_issued) → evidence.workOrderFileNo
Confidence                          → HIGH

Work order date                     → 23.02.2025 (CONFLICT — Page 12 says 28.02.2025)
Source                              → Page 10
DB: events (work_order_issued) → timestamp
Confidence                          → CONFLICT (see WARD28_05_CONFLICTS.md, Conflict 2)

Issued by                           → Executive Engineer, Nagar Nigam Roorkee
Source                              → Page 10
DB: events (work_order_issued) → evidence.issuedBy
Confidence                          → HIGH

EPFO registration required          → Yes (payment withheld if absent)
Source                              → Page 10
DB: events (work_order_issued) → evidence.epfoRegistrationRequiredForPayment
Confidence                          → HIGH

Geo-tagged photos required          → Yes (with GPS coordinates and officer signature)
Source                              → Pages 10, 18 (Term 17)
DB: events (work_order_issued) → evidence.geoTaggedPhotosRequired
Confidence                          → HIGH
```

---

# PART 5 — COMPLETION

```
Construction start date             → 28.02.2025
Source                              → Pages 3, 12
DB: events (construction_started) → timestamp
Confidence                          → HIGH

Measurement date                    → 03.04.2025
Source                              → Pages 1, 12
DB: events (completion_claimed) → evidence.measurementDate
Confidence                          → HIGH

Measurement Book No.                → 86, Pages 175 to 177
Source                              → Pages 1, 3
DB: events (completion_claimed) → evidence.measurementBookNo / evidence.measurementBookPages
Confidence                          → HIGH (secondary reference has CONFLICT — see Conflict 4)

Inspection date                     → 03.04.2025
Source                              → Page 12
DB: events (completion_claimed) → evidence.inspectionDate
Confidence                          → HIGH

Actual completion date              → 03.04.2025
Source                              → Pages 3, 12
DB: events (completion_claimed) → timestamp
Confidence                          → HIGH

Contract completion date            → CONFLICT (Page 3: 13.04.2025 / Page 12: 09.04.2025)
Confidence                          → CONFLICT (see WARD28_05_CONFLICTS.md, Conflict 3)

Memo of Work No.                    → 687
Source                              → Page 3
DB: events (completion_claimed) → evidence.memoOfWorkNo
Confidence                          → HIGH

Final bill amount                   → ₹3,86,086
Source                              → Pages 1, 5, 12
DB: events (completion_claimed) → evidence.finalBillAmount
Confidence                          → HIGH

Geo-tagged photos confirmed         → UNKNOWN
Note                                → Required per Pages 10, 18 (Term 17). Flag A photos
                                       referenced on Page 1 not included in RTI response.

Completed before contract date      → Yes (03.04.2025 is before both conflicting deadline dates)
Source                              → Pages 3, 12
DB: events (completion_claimed) → evidence.completedBeforeContractDate
Confidence                          → HIGH

Time extension reference            → "The mentioned work has been included in the time extension"
Source                              → Page 12, S.No.10
DB: events (completion_claimed) → evidence.timeExtensionNote
Confidence                          → HIGH
Note                                → Work completed before contract date so extension was not
                                       needed for Ward 28. Likely blanket extension across batch.

DLP start date                      → 03.04.2025
DB: events (dlp_started) → evidence.dlpStartDate
Confidence                          → HIGH (derived from completion date + contract terms)

DLP end date                        → 03.04.2026
DB: events (dlp_started) → evidence.dlpEndDate
Confidence                          → HIGH (derived: start + 12 months)

DLP duration                        → 12 months
Source                              → Pages 8, 9
DB: events (dlp_started) → evidence.dlpDurationMonths
Confidence                          → HIGH
```

---

# PART 6 — BOQ: BILLED VS EXECUTED

Source: Page 2 (executed) vs Page 16 (BOQ quantities)

```
Item                             BOQ Qty   Executed   Unit   Change
Dismantling of Structures        36.60     45.41      CUM    +24.1%
WBM Grading 2                    27.45     27.24      CUM    -0.8%
WBM Grading 3                    27.45     27.24      CUM    -0.8%
PCC Nominal Mix 1:2:4            7.69      4.94       CUM    -35.8%
Interlocking Concrete Block M35  317.20    363.30     SQM    +14.5%
Steel RSJs                       0.50      0          QTL    -100%
Brick Masonry CM 1:4             12.81     12.14      CUM    -5.2%
Plastering CM 1:4 15mm           109.81    61.75      SQM    -43.8%
RCC Grade M25                    0.17      0          CUM    -100%
TMT bar Fe 415                   0.11      0          QTL    -100%

DB: events (completion_claimed) → evidence.boqVsExecuted
Confidence: HIGH

⚠️ DRAIN ITEMS — Brick Masonry, Plastering, PCC relate to drain construction:
  Brick Masonry (12.14 CUM × ₹6,029.90)  = ₹73,202.99
  Plastering (61.75 SQM × ₹191.70)       = ₹11,837.48
  PCC (4.94 CUM × ₹6,109.20)             = ₹30,179.45
  Total at schedule rates                 = ₹1,15,219.92
  After 36.10% discount                  = ₹73,625.52
  After 18% GST                          ≈ ₹86,878

⚠️ The figure "₹98,293 billed for ghost drain" in MAPPING.md does NOT appear
  anywhere in the 41 RTI pages. DO NOT display publicly until founder confirms source.
```

---

# PART 7 — PAYMENT

```
Scheduled rates total               → ₹5,12,036.45
Source                              → Page 5
DB: events (payment_released) → evidence.scheduledRatesTotal
Confidence                          → HIGH

Less discount 36.10%                → ₹1,84,845.16
Source                              → Page 5
DB: events (payment_released) → evidence.discountAmount
Confidence                          → HIGH

Actual price of work                → ₹3,27,191.29
Source                              → Page 5
DB: events (payment_released) → evidence.actualPriceOfWork
Confidence                          → HIGH

GST @ 18%                           → ₹58,894.43
Source                              → Page 5
DB: events (payment_released) → evidence.gstAmount
Confidence                          → HIGH

Total value of work done            → ₹3,86,085.72
Source                              → Page 5
DB: events (payment_released) → evidence.totalValueOfWorkDone
Confidence                          → HIGH

Billed amount (rounded)             → ₹3,86,086.00
Source                              → Page 5
DB: events (payment_released) → evidence.billedAmount
Confidence                          → HIGH

Deductions:
  CGST @ 1%          → ₹3,272
  SGST @ 1%          → ₹3,272
  IGST @ 2%          → ₹0 (shown as dash on document)
  Income Tax @ 1%    → ₹3,272
  Labour Cess @ 1%   → ₹3,261
  Royalty            → ₹15,708
  Royalty @ 25%      → ₹2,120
  Total field        → BLANK on document
Source                              → Page 5
DB: events (payment_released) → evidence.deductions
Confidence                          → HIGH for line items

⚠️ ARITHMETIC GAP: Line items sum to ₹30,905. But ₹3,86,086 − ₹3,54,581 = ₹31,505.
  Unaccounted ₹600. Total field is blank. DO NOT resolve without physical document.

Net payment to contractor           → ₹3,54,581
Source                              → Pages 1, 5
DB: events (payment_released) → evidence.netDisbursed
Confidence                          → HIGH

Payment in words                    → "Three Lakh Fifty Four Thousand Five Hundred Eighty One Only"
Source                              → Page 5
DB: events (payment_released) → evidence.paymentInWords
Confidence                          → HIGH

Payment date                        → 30.06.2025
Source                              → Pages 1, 5
DB: events (payment_released) → timestamp (use 2025-06-30)
Confidence                          → HIGH

Cheque No. / Date                   → BLANK on document
Source                              → Pages 3, 5
Note                                → Payment method not recorded in RTI response.

Note sheet authored by              → Sachin Kumar, Clerk (Construction), Nagar Nigam Roorkee
Source                              → Page 1
DB: events (payment_released) → evidence.noteSheetAuthor
Confidence                          → HIGH

Note sheet date                     → 30.06.2025
Source                              → Page 1
DB: events (payment_released) → evidence.noteSheetDate
Confidence                          → HIGH

Signed by (payment chain)           → Account Clerk, Accountant, PIO, Municipal Commissioner
Source                              → Page 5
DB: events (payment_released) → evidence.signedBy
Confidence                          → HIGH
```

---

# PART 8 — PAYMENT REGISTER CONTEXT (Other Roads)

Full register from Pages 13–14. M/s R.D. Infra held 4 contracts simultaneously.

```
S.No. 22 → Ward 30+31 drain/channel works | M/s Kalptaru Associates
           Est: ₹5,98,000 | Tender: ₹5,91,422 | Paid: ₹5,90,804

S.No. 23 → Roorkee Talkies CC pipe repair | M/s Warris Contractor
           Est: ₹51,000 | Tender: ₹49,980 | Paid: ₹49,762

S.No. 24 → Nehru Stadium earthfill/gate repair | M/s Warris Contractor
           Est: ₹47,000 | Tender: ₹46,107 | Paid: ₹45,932

S.No. 25 → DM Camp Office examination room | M/s Anavi Construction
           Est: ₹2,45,000 | Tender: ₹2,40,100 | Paid: ₹2,39,926

S.No. 26 → Ward 34 interlocking road and drain | M/s Arshad Ali
           Est: ₹22,55,000 | Tender: ₹14,62,873 | Paid: ₹12,99,101

S.No. 27 → Ward 16 Geetanjali Vihar interlocking | M/s R.D. Infra
           Est: ₹13,02,000 | Tender: ₹8,02,176 | Paid: ₹8,02,176

S.No. 28 → Ward 28 (THIS ROAD) | M/s R.D. Infra
           Est: ₹6,06,000 | Tender: ₹3,87,234 | Paid: ₹3,86,086

S.No. 29 → Ward 38 interlocking | M/s R.D. Infra
           Est: ₹3,26,000 | Tender: ₹2,11,248 | Paid: ₹2,11,276
           ⚠️ Payment exceeds tender by ₹28 — unexplained

S.No. 30 → DM Camp Office rooms/tiles/painting | M/s R.D. Infra
           Est: ₹2,48,000 | Tender: ₹2,45,272 | Paid: ₹2,38,055

S.No. 48–55 → Ward 40 drains, Ward 01 soil filling, Ward 40 painting
              (M/s Jay Bhawani Enterprises, M/s Kisan Traders, M/s Riyansci Contractor)

Grand totals (Page 14):
  Total Government Estimated Cost → ₹2,95,21,659
  Total Tender Amount             → ₹2,30,72,127
  Total Actual Payment            → ₹2,11,82,098
```

---

# PART 9 — KEY TENDER TERMS (Accountability Relevant)

Terms from Pages 18–19 directly relevant to anomalies found:

```
Term 7  → EPF and ESIC registration mandatory. Payment only after registration.
Term 17 → Geo-tagged photos with GPS + officer signature mandatory.
           Payment withheld if not complied. Contractor's responsibility.
Term 36 → EPF/ESIC/GST registration mandatory.
Term 37 → No-Dues Certificate from Tax Authority mandatory.
Term 38 → 3% EMD as FDR required. Must be issued after tender publication date.
Term 40 → Unauthenticated overwriting → committee can cancel tender.
Term 41 → Incorrect BOQ total calculation → committee can cancel tender.

Note: These terms eliminated Firms 3, 4, 5. The same terms apply to M/s R.D. Infra
      (winning firm) — whose EPFO compliance is absent from the RTI response.
```