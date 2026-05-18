# WARD 28 — CONFLICTS & ABSENCES
## Source: RTI Application No. 35 | File No. 39557 | 41 Pages
## DO NOT ingest or display any CONFLICT field without resolving it first.
## Every conflict requires checking the physical RTI document.

---

# PART 1 — OPEN CONFLICTS

These fields appear with different values on two or more pages of the RTI.
None can be resolved from the scanned document alone.

---

## CONFLICT 1 — FDR No. 6999

```
Page 7  → FDR No. 6999, amount ₹18,500, purpose: performance security
Page 15 → FDR No. 6999, Bank of Baroda, dated 03/12/2024, amount ₹18,180, purpose: EMD

Same FDR number. Different amounts. Different stated purposes. Two official documents.

Impact: Security deposit total calculation is unreliable until resolved.
Action: Check physical document. Do not use FDR 6999 amount in any calculation.
```

---

## CONFLICT 2 — Work Order Date

```
Page 10 → Work order document dated 23.02.2025
Page 12 → S.No.6: "Date of Work Order: 28.02.2025"

Two official documents give different dates for the same work order.

Impact: Event 4 (work_order_issued) timestamp is uncertain by 5 days.
Action: Check physical document. Currently seeded as 2025-02-23 (Page 10 value).
```

---

## CONFLICT 3 — Contract Completion Date (Deadline)

```
Page 3  → "Date of Completion as per Bond: 13.04.2025"
Page 12 → "S.No.8: Date of Completion as per Contract: 09.04.2025"

Two different deadline dates on two official documents.
Actual completion was 03.04.2025, so contractor completed before both — but
the official deadline itself is contradicted across documents.

Impact: DLP and penalty clause calculations depend on correct deadline.
Action: Check physical document.
```

---

## CONFLICT 4 — Measurement Book Reference

```
Pages 1, 3 → MB No. 86, Pages 175-177, dated 03.04.2025
Pages 3, 5 → "page 15/10/22 of Measurement Book No." — MB number left blank

"15/10/22" is ambiguous:
  - If page numbers: pages 15, 10, 22 of MB (inconsistent with "Pages 175-177")
  - If a date: 15 October 2022 — which predates the project by over 2 years

Impact: If 15/10/22 is a date, the measurement book reference predates the project.
        This would be a serious document integrity issue.
Action: Check physical document. Verify MB number on pages 3 and 5.
```

---

## CONFLICT 5 — Ghost Drain Amount

```
MAPPING.md referenced → ₹98,293 billed for ghost drain
41 RTI pages show     → This figure does NOT appear anywhere

Drain-related items at schedule rates total ₹1,15,219.92:
  Brick Masonry (12.14 CUM × ₹6,029.90) = ₹73,202.99
  Plastering (61.75 SQM × ₹191.70)      = ₹11,837.48
  PCC (4.94 CUM × ₹6,109.20)            = ₹30,179.45
After 36.10% discount: ₹73,625.52
After 18% GST: approximately ₹86,878

None of these equal ₹98,293.

Impact: If ₹98,293 is displayed publicly without a verified source, it is factually wrong.
Action: Founder must identify and share the source of ₹98,293.
        DO NOT display this figure until source is confirmed.
```

---

## CONFLICT 6 — Firm Name (Eliminated Bidder 3)

```
Page 21 (BOQ) → Contractor name: "Mahul Singh"
Page 23 (envelope) → Firm name: "M/s Mahesh Singh Contractor"

Cannot determine from documents if this is a typo or two different entities.

Impact: Context only — this firm was eliminated and is not ingested.
Action: Flag if bidder tracking feature is built later.
```

---

## CONFLICT 7 — Karmendra Singh Role

```
Page 11 → "Karmendra Singh, Finance Officer (Nagar Nigam Roorkee) /
           District Magistrate, Haridwar"

One name with two roles separated by "/".
Cannot determine if this is:
  A) One person holding both roles simultaneously
  B) Two separate persons listed together

Impact: Person record may need to be split into two if (B) is true.
Action: Verify against government records or additional RTI.
        Do not split without confirmation.
```

---

## CONFLICT 8 — Ward 38 Payment Exceeds Tender

```
Page 13 → Ward 38 (V.N. Singh to Praveen Tyagi):
           Tender amount: ₹2,11,248
           Actual payment: ₹2,11,276
           Difference: +₹28 overpayment

No explanation in the document.

Impact: Context only — different road, not ingested.
        Worth flagging if Ward 38 is added to the platform.
Action: Verify if royalty/deduction calculation differs from Ward 28.
```

---

## CONFLICT 9 — Lab Report Recipient Designation

```
Page 6 → Lab report issued to "Assistant Municipal Commissioner, Nagar Nigam Roorkee"

This designation does not match any person in the current seed:
  - Jitendra Kumar is seeded as "Municipal Commissioner"
  - No "Assistant Municipal Commissioner" exists in seed

Possibilities:
  A) "Assistant Municipal Commissioner" is an alternate title for Municipal Commissioner
  B) A separate person holds this role and is absent from the seed

Impact: If (B), a person is missing from the accountability chain.
Action: Verify which person held this designation in March 2025.
```

---

## CONFLICT 10 — Deduction Arithmetic Gap

```
Page 5 → Itemised deductions:
           CGST @ 1%         → ₹3,272
           SGST @ 1%         → ₹3,272
           IGST @ 2%         → ₹0 (shown as dash)
           Income Tax @ 1%   → ₹3,272
           Labour Cess @ 1%  → ₹3,261
           Royalty           → ₹15,708
           Royalty @ 25%     → ₹2,120
           Total field       → BLANK

Sum of itemised deductions: ₹30,905
Expected deduction (₹3,86,086 − ₹3,54,581): ₹31,505
Unaccounted: ₹600

Impact: Either IGST was actually charged (despite showing as dash) or another
        deduction exists that is not listed. Total field is blank — cannot verify.
Action: Check physical document. Do not compute deduction total from line items alone.
```

---

# PART 2 — WHAT IS NOT IN THE RTI

Fields required by contract but absent from all 41 pages.
These are not conflicts — they are deliberately or accidentally withheld.

```
1. Geo-tagged photos (Flag A)
   Required by: Page 10 (work order), Page 18 (Term 17)
   Referenced:  Page 1 ("photographs attached as Flag A")
   Status:      Not included in RTI response. Cannot confirm compliance.
   Impact:      Payment condition (Term 17) cannot be verified as met.

2. EPFO registration certificate for M/s R.D. Infra
   Required by: Page 10 ("payment shall not be made if firm not registered with EPFO")
   Status:      Not included in RTI response. Payment was released regardless.
   Impact:      A payment condition was not verified before releasing ₹3,54,581.
   Note:        ESIC/EPF documents exist for eliminated bidders (Firms 4 and 5)
                but not for the winning firm.

3. Contractor registration certificate for M/s R.D. Infra
   Required:    Standard for contract award
   Status:      Not included. Only eliminated bidders' certificates provided.
   Impact:      Cannot verify M/s R.D. Infra's registration grade or validity.

4. Cheque number and date for payment of ₹3,54,581
   Location:    Blank on Pages 3 and 5
   Impact:      Cannot verify how or when payment was actually transferred.

5. PIO name
   Location:    Covering letter and all 41 pages signed but name never written
   Impact:      Respondent is not personally identified. Standard RTI practice
                requires PIO to be identified.

6. Contractor's signature on completion receipt
   Location:    Blank on Pages 3, 4, and 5
   Impact:      Contractor never formally acknowledged receipt of payment amount.
                Standard billing practice requires contractor acknowledgment.
```

---

# PART 3 — ANOMALIES (Not Conflicts, But Flagged)

These are not data conflicts — they are procedural irregularities found in the documents.

```
A. Two eliminated bidders had expired registrations and were still processed:
   - M/s Aman Trading Co.: Registration valid until 31.03.2024 — expired 8+ months
     before tender call (01.12.2024). Bid accepted into process.
   - M/s Mukram Rao Contractor: Registration valid until 26.07.2024 — expired 4+ months
     before tender call. Bid accepted into process.
   Contract Term 3 (Page 18) requires attached proof of registration.
   Tender Terms 36–41 (Pages 19) provide grounds for cancellation.

B. M/s Aman Trading Co. BOQ (Page 25) shows a nonsense address:
   "Ho Nagar 21033, Sector 91034, 21 Aliya Charshat"
   Page 28 registration certificate shows real address: A-36, Subhash Nagar, Shafipur, Roorkee.
   The BOQ address appears falsified. This is grounds for disqualification under Term 40.

C. Unknown firm (Firm 2, Page 20) submitted FDR dated 11/08/2023 — 16 months before tender.
   FDR amount ₹2,500 is 13.8% of required EMD ₹18,180. Both are serious procedural anomalies.

D. M/s R.D. Infra received 4 simultaneous contracts from Nagar Nigam Roorkee:
   Ward 16, Ward 28, Ward 38, DM Camp Office. Total paid: ~₹14,37,513.
   Concentration of contracts with one firm warrants scrutiny.

E. Ward 38 payment (₹2,11,276) exceeds tender amount (₹2,11,248) by ₹28.
   No explanation in the payment register.
```