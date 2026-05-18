# WARD 28 — PERSONS DATA
## Source: RTI Application No. 35 | File No. 39557 | 41 Pages
## All 13 persons. Every field traced to source page.

---

## FORMAT
```
Field        → Value
Source       → RTI page
DB           → persons → column
Confidence   → HIGH / MEDIUM / LOW
```

---

# CONTRACTOR

## Shubham Sharma — Proprietor, M/s R.D. Infra

```
Full name            → Shubham Sharma
Source               → Pages 7, 10, 16
DB: persons → full_name
Confidence           → HIGH

Father's name        → Shri Niwas Sharma
Source               → Page 10
DB: (no column — context only)

Firm name            → M/s R.D. Infra, Roorkee
Source               → Pages 7, 10, 12, 16
DB: persons → department
Confidence           → HIGH

Address              → House No. 405/1, Malakpur, Arora Colony,
                        Solanipuram, Roorkee, Distt. Haridwar, Uttarakhand
Source               → Page 10
DB: persons → jurisdiction
Confidence           → HIGH

GST No.              → 05GDAPS2236H1ZN
Source               → Page 17
DB: persons → contact_or_id
Confidence           → HIGH

Person category      → contractor
Accountability status → waiting_for_audit (founder-set)
Job description      → Responsible for material quality, construction standards,
                        and delivery timeline as per contract terms.

Documents signed     → Contract bond (Pages 7, 8, 9), BOQ (Page 16)
Documents absent     → EPFO registration — required for payment (Page 10, Term 7),
                        not present in RTI response. Payment was released regardless.
                        Contractor registration certificate — not included in RTI.
                        Geo-tagged photos — referenced (Page 1, Flag A) but not in RTI.
```

---

# TECHNICAL CHAIN — NAGAR NIGAM ROORKEE

## Gurukesh Singh — Junior Engineer

```
Full name            → Gurukesh Singh
Source               → Page 11 (signed elimination sheet)
DB: persons → full_name
Confidence           → HIGH

Designation (Hindi)  → अवर अभियंता
Designation (English)→ Junior Engineer
Source               → Pages 11, 12
DB: persons → designation
Confidence           → HIGH

Department           → Nagar Nigam Roorkee
DB: persons → department
Confidence           → HIGH

Person category      → official
Accountability status → response_pending (founder-set)
Job description      → Responsible for on-site quality verification and signing off
                        construction as complete and standard-compliant.

Documents signed:
  Page 10  → Work order (copy forwarded to)
  Page 11  → Elimination sheet
  Page 12  → Work completion certificate (inspected after completion)
  Page 13  → Payment register
  Page 16  → Winning contractor's BOQ
```

## Prem Kumar Sharma — Assistant Engineer

```
Full name            → Prem Kumar Sharma
Source               → Page 11 (signed elimination sheet)
DB: persons → full_name
Confidence           → HIGH

Designation (Hindi)  → सहायक अभियंता
Designation (English)→ Assistant Engineer
Source               → Pages 11, 12
DB: persons → designation
Confidence           → HIGH

Department           → Nagar Nigam Roorkee
Person category      → official
Accountability status → response_pending (founder-set)
Job description      → Responsible for supervising the Junior Engineer and verifying
                        technical compliance before signing off.

Documents signed:
  Pages 7, 8, 9 → Contract bond (as witness/approver)
  Page 10        → Work order (copy forwarded to)
  Page 11        → Elimination sheet
  Page 12        → Work completion certificate
  Page 13        → Payment register
  Pages 15, 24, 35 → Tender forms (all five bidders)
```

## Aashray Singh Mishra — Executive Engineer

```
Full name            → Aashray Singh Mishra
Source               → Page 11 (signed elimination sheet)
DB: persons → full_name
Confidence           → HIGH

Designation (Hindi)  → अधिशासी अभियंता
Designation (English)→ Executive Engineer
Source               → Pages 10, 11, 12
DB: persons → designation
Confidence           → HIGH

Department           → Nagar Nigam Roorkee
Person category      → official
Accountability status → waiting_for_audit (founder-set)
Job description      → Responsible for final administrative authorisation of project
                        completion and quality sign-off.

Documents signed:
  Page 10 → Work order (issued by)
  Page 11 → Elimination sheet
  Page 12 → Work completion certificate (countersigned)
```

---

# FINANCIAL CHAIN — NAGAR NIGAM ROORKEE

## Prashant Kumar — Senior Finance Officer

```
Full name            → Prashant Kumar
Source               → Page 11 (signed elimination sheet)
DB: persons → full_name
Confidence           → HIGH

Designation (Hindi)  → वरिष्ठ वित्त अधिकारी
Designation (English)→ Senior Finance Officer
Source               → Pages 11, 19
DB: persons → designation
Confidence           → HIGH

Department           → Nagar Nigam Roorkee
Person category      → official
Accountability status → waiting_for_audit (founder-set)
Job description      → Responsible for verifying financial records and authorising
                        payment disbursement.

Documents signed:
  Page 11 → Elimination sheet
  Page 19 → Tender terms and conditions
```

## Sachin Kumar — Construction Clerk

```
Full name            → Sachin Kumar
Source               → Page 1 (authored and signed note sheet)
DB: persons → full_name
Confidence           → HIGH

Designation (Hindi)  → लिपिक निर्माण अनु0, न0नि0रूड़की
Designation (English)→ Clerk (Construction), Nagar Nigam Roorkee
Source               → Page 1
DB: persons → designation
Confidence           → HIGH

Department           → Nagar Nigam Roorkee
Person category      → official
Job description      → Drafted and submitted the official note sheet to the Municipal
                        Commissioner, formally initiating the payment release process
                        after work completion.

Documents signed:
  Page 1 → Note sheet dated 30.06.2025 — administrative initiator of payment

Role clarification:
  Sachin Kumar did NOT certify the work or prepare the bill.
  He wrote the note sheet requesting payment approval — the first document
  in the payment chain. His action triggered the approval chain upward.
```

## Mohan Singh — Construction Clerk

```
Full name            → Mohan Singh
Source               → Page 14 (signed payment register)
DB: persons → full_name
Confidence           → HIGH

Designation (Hindi)  → निर्माण लिपिक
Designation (English)→ Construction Clerk
Source               → Page 14
DB: persons → designation
Confidence           → HIGH

Department           → Nagar Nigam Roorkee
Person category      → official

Documents signed:
  Page 14 → Payment register
```

## Narendra Singh Rawat — Construction Clerk

```
Full name            → Narendra Singh Rawat
Source               → Page 11 (signed elimination sheet)
DB: persons → full_name
Confidence           → HIGH

Designation (Hindi)  → निर्माण लिपिक
Designation (English)→ Construction Clerk
Source               → Page 11
DB: persons → designation
Confidence           → HIGH

Department           → Nagar Nigam Roorkee
Person category      → official

Documents signed:
  Page 11 → Elimination sheet (first signatory in chain)
```

---

# ADMINISTRATIVE CHAIN

## Jitendra Kumar — Municipal Commissioner

```
Full name            → Jitendra Kumar
Source               → Pages 7, 8, 9, 11 (signed multiple documents)
DB: persons → full_name
Confidence           → HIGH

Designation (Hindi)  → नगर आयुक्त
Designation (English)→ Municipal Commissioner
Source               → Pages 7, 11
DB: persons → designation
Confidence           → HIGH

Department           → Nagar Nigam Roorkee
Person category      → official
Accountability status → waiting_for_audit (founder-set)
Job description      → Municipal Commissioner. Ultimate administrative authority
                        over all ward-level public works.

Documents signed:
  Pages 7, 8, 9 → Contract bond
  Page 11        → Elimination sheet
  Page 5         → Payment (as final approver in payment chain)
  Pages 28, 39   → Contractor registration certificates (for eliminated bidders)
```

## Karmendra Singh — Finance Officer / Designated Officer

```
Full name            → Karmendra Singh
Source               → Page 11 (approved elimination sheet)
DB: persons → full_name
Confidence           → HIGH

Designation          → Finance Officer (Nagar Nigam Roorkee) /
                        District Magistrate, Haridwar
Source               → Page 11
DB: persons → designation
Confidence           → MEDIUM

⚠️ AMBIGUITY: Page 11 shows one name with two roles separated by "/".
  Cannot confirm from document if this is one person with two roles
  or two separate persons. Do not split without physical verification.

Documents signed:
  Page 11 → Elimination sheet (final approving authority — highest signatory)
```

---

# ELIMINATION SHEET — SIGNING HIERARCHY (Page 11)

The order matters — shows the full approval chain for the tender process:

```
1. Narendra Singh Rawat — Construction Clerk (initiated)
2. Gurukesh Singh — Junior Engineer
3. Prem Kumar Sharma — Assistant Engineer
4. Aashray Singh Mishra — Executive Engineer
5. Prashant Kumar — Senior Finance Officer
6. Jitendra Kumar — Municipal Commissioner
7. Karmendra Singh — Final approving authority
```

---

# RTI CHAIN

## PIO — Public Information Officer

```
Full name            → NOT DISCLOSED in any of the 41 pages
Source               → Covering letter (signed but name withheld)
DB: persons → full_name → use placeholder:
               "Unknown — PIO name not disclosed in RTI response"
Confidence           → HIGH (confirmed absent — deliberate non-disclosure)

Designation          → Public Information Officer
Department           → Nagar Nigam Roorkee
Person category      → official

Involvement          → Signed and certified every one of the 41 RTI pages.
                        Compiled and forwarded all documents to applicant.
```

## Vidushi — RTI Applicant

```
Full name            → Vidushi
Source               → Covering letter
DB: persons → full_name
Confidence           → HIGH

Address              → House No. 247/7, Purvi Deen Dayal, Roorkee,
                        District Haridwar, Uttarakhand
Source               → Covering letter
DB: persons → jurisdiction
Confidence           → HIGH

Person category      → citizen

Involvement          → Filed RTI Application No. 35 on 17.11.2025 (online).
                        Received 41-page response on 05.02.2026.
```

---

# LAB SIGNATORY

## Pranav Dixit — Tech-Manager

```
Full name            → Pranav Dixit
Source               → Page 6
DB: persons → full_name (already seeded)
Confidence           → HIGH

Designation          → Tech-Manager
Department           → Infratest Investigation & Research Centre Pvt. Ltd.,
                        Back Roorkee Public School, Sherpur, Roorkee, Distt. Haridwar
Person category      → official

Involvement          → Authorised signatory on lab test report BM250329029 (Page 6).
```

---

# ELIMINATED BIDDERS (Context — Do Not Ingest as Persons)

Not seeded unless a bidder tracking feature is built. Documented here for accountability context.

```
Firm 2 — Name unknown
  FDR: SBI No. 42170668764, dated 11/08/2023, amount ₹2,500
  Source: Page 20
  ⚠️ FDR predates tender by ~16 months. Amount is only 13.8% of required EMD ₹18,180.

Firm 3 — M/s Mahul Singh / M/s Mahesh Singh Contractor
  Rate: 25% Above estimated | Address: Shamben, Rampur
  Source: Pages 21, 23
  ⚠️ NAME CONFLICT: Page 21 → "Mahul Singh", Page 23 → "Mahesh Singh Contractor".
     Possible typo or two different firms. Cannot resolve from documents.

Firm 4 — M/s Aman Trading Co. (Proprietor: Upendra Singh)
  Rate: 95.50% Above estimated
  GST: 05AXGPS6563B1ZG | Registration grade: A | Valid until: 31.03.2024
  Real address (Page 28): House No. A-36, Subhash Nagar, Shafipur, Roorkee
  Source: Pages 24–33
  ⚠️ Registration expired 8+ months before tender call. Accepted into process.
  ⚠️ BOQ (Page 25) shows falsified address: "Ho Nagar 21033, Sector 91034, 21 Aliya Charshat"
     This is a nonsense address inconsistent with registration documents.
  ℹ️ Compliance documents present: ESIC from 18.10.2021 (code 61000542220001009),
     EPF code UKDDN2501626000. Full compliance proof exists for this eliminated bidder.

Firm 5 — M/s Mukram Rao Contractor (Proprietor: Mukram Rao)
  Rate: 25% Above estimated
  FDR: IDBT (likely IDBI) No. 8906716, dated 05-10-2024, amount ₹20,000
  Registration grade: A0 | Valid until: 26.07.2024
  Source: Pages 35–41
  ⚠️ Registration expired 4+ months before tender call. Accepted into process.

⚠️ KEY CONTRAST: Eliminated bidders (Firms 4, 5) have ESIC, EPF, GST compliance
  documents in the RTI. Winning firm M/s R.D. Infra has none of these in the RTI.
```