# MYSTREET — FRONTEND REFERENCE
## Version 1.0 — Written from all source files. Do not deviate.

---

# PART 1 — TECH STACK

## What the frontend team uses. Every item is locked.

| Layer | Technology | Version / Source |
|---|---|---|
| Framework | Next.js App Router | `latest` (package.json) |
| Language | TypeScript | `6.0.3` (package.json) |
| UI Library | React | `latest` (package.json) |
| Component Library | shadcn/ui | — (design_system.md, LOCKED) |
| Styling | Tailwind CSS | `^4.2.4` (package.json) |
| Icon Library | Lucide React | comes with shadcn/ui (design_system.md, LOCKED) |
| Heading / Body font | Mona Sans | Google Fonts (design_system.md, LOCKED) |
| Label / Meta font | Roboto | Google Fonts (design_system.md, LOCKED) |

**What is not used:** Outfit font (currently in layout.tsx — must be removed and replaced).

---

## Font Import — Exact Code from design_system.md

Add to `src/app/layout.tsx` in the `<head>`. Replace the current Outfit import entirely.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Mona+Sans:ital,wght@0,200..900;1,200..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
```

Add to `src/app/globals.css`:

```css
.mona {
  font-family: "Mona Sans", system-ui, sans-serif;
  font-optical-sizing: auto;
  font-variation-settings: "wdth" 125;
}

.roboto {
  font-family: "Roboto", system-ui, sans-serif;
  font-optical-sizing: auto;
}
```

**Critical:** `font-variation-settings: "wdth" 125` on Mona Sans is non-negotiable. Without it the font loses its authority and looks generic. Never omit it.

**The simple rule for every element:**
- Heading, title, money figure, body narrative, official name → **Mona Sans**
- Label, date, location, ID, badge, status tag → **Roboto**

---

# PART 2 — FOLDER STRUCTURE

## Every folder. Every naming convention. Exact.

```
src/
├── app/
│   ├── layout.tsx              ← Replace Outfit with Mona Sans + Roboto
│   ├── page.tsx                ← Redirect only. Never touch.
│   ├── globals.css             ← Add .mona and .roboto base classes
│   └── road/
│       └── [id]/
│           └── page.tsx        ← Composes section components only. No JSX logic here.
│
├── components/
│   ├── section1/               ← Section 1: The Hero
│   │   └── HeroSection.tsx
│   ├── section3/               ← Section 3: Current Condition
│   │   ├── ConditionSection.tsx
│   │   ├── CrackCard.tsx
│   │   ├── PotholeCard.tsx
│   │   └── DrainCard.tsx
│   ├── section4/               ← Section 4: The Betrayal
│   │   └── BetrayalSection.tsx
│   ├── section5/               ← Section 5: The Faces
│   │   ├── FacesSection.tsx
│   │   ├── OfficialCard.tsx
│   │   └── ContractorCard.tsx
│   ├── section6/               ← Section 6: Empowerment
│   │   └── EmpowermentSection.tsx
│   └── shared/                 ← Reusable components used across sections
│       ├── StatusBadge.tsx
│       ├── RoadRecordCard.tsx
│       └── TimelineEvent.tsx
│
├── server/
│   ├── db/
│   │   ├── index.ts
│   │   ├── seed.ts
│   │   └── schema/
│   │       ├── road.ts
│   │       ├── segment.ts
│   │       ├── drain.ts
│   │       ├── event.ts
│   │       ├── event-participants.ts
│   │       ├── person.ts
│   │       ├── photo.ts
│   │       ├── confirmation.ts
│   │       └── index.ts
│   │
│   └── queries/
│       └── road.ts             ← All DB query functions
│
├── lib/
│   └── utils/
│       └── road-display.ts     ← All display/formatting functions
│
└── types/
    └── road.ts                 ← EVENT_TYPES, HEALTH_STATUS, SEVERITY, inferred types
```

**Rules that are not negotiable:**

- `src/components/` has one subfolder per section of the page. Section numbering matches the product spec.
- Section 2 (Map Comparison) folder is **not created**. It is skipped in MVP per DECISIONS.md and MAPPING.md.
- `src/components/shared/` holds components used by more than one section.
- No component file lives directly inside `src/components/` — always in a subfolder.
- The page file `src/app/road/[id]/page.tsx` imports and composes section components. It contains **no JSX beyond the section components**. All derived data computation happens here before passing props down.

---

# PART 3 — NAMING CONVENTIONS

## Exact rules. No interpretation required.

### File names — kebab-case

```
hero-section.tsx          ← WRONG
HeroSection.tsx           ← CORRECT

condition-card.tsx        ← WRONG (if it's a component)
ConditionSection.tsx      ← CORRECT

road-display.ts           ← CORRECT (utility file — kebab-case)
road.ts                   ← CORRECT (schema/query file — kebab-case)
```

**Rule:** Component files are PascalCase. All other files (utilities, schema, queries, config) are kebab-case.

---

### Component names — PascalCase

```tsx
// CORRECT
export default function HeroSection() {}
export default function OfficialCard() {}
export default function StatusBadge() {}

// WRONG
export default function heroSection() {}
export default function official_card() {}
```

---

### Prop type names — ComponentName + Props suffix

```tsx
// CORRECT
type HeroSectionProps = { ... }
type OfficialCardProps = { ... }
type StatusBadgeProps = { ... }

// WRONG
type Props = { ... }
type HeroProps = { ... }
type IOfficialCard = { ... }
```

Every component defines its own prop type at the top of its file. Always named `[ComponentName]Props`.

---

### Utility function imports — always from road-display.ts

```tsx
// CORRECT
import { formatCurrency, builtMonthsAgo, getInitials } from '@/lib/utils/road-display';

// WRONG — writing formatting logic inline in a component
const salary = '₹' + Number(person.monthlySalary).toLocaleString('en-IN') + '/month';

// WRONG — importing from anywhere else
import { formatCurrency } from '../helpers/format';
```

**Rule:** If a function transforms data for display, it lives in `src/lib/utils/road-display.ts` and is imported from there. Never written inline inside a component. Never duplicated.

---

### Icon imports — always from lucide-react

```tsx
// CORRECT
import { MapPin, AlertTriangle, User } from 'lucide-react';

// WRONG
import MapPin from 'some-other-library';
```

---

# PART 4 — DATA FLOW

## How data reaches components. One path only.

```
NeonDB (PostgreSQL)
    ↓
getFullRoadData(id)          ← src/server/queries/road.ts
    ↓
src/app/road/[id]/page.tsx   ← called once, server component, force-dynamic
    ↓
Derived values computed       ← using functions from road-display.ts
    ↓
Props passed to sections      ← HeroSection, ConditionSection, etc.
    ↓
Section components render     ← display only, no data fetching
```

### Rules — every one is hard

**Rule 1 — One database call per page load.**
`getFullRoadData(id)` is called once in `page.tsx`. It returns: `road`, `segments`, `events` (with participants), `photos`, `heroPhoto`, `confirmationCount`, `drains`. Nothing else queries the database.

**Rule 2 — No component calls any query function.**
A component never imports from `src/server/queries/`. Never. Data arrives as props.

**Rule 3 — No component calls the database directly.**
A component never imports `db` from `src/server/db/index.ts`. Never.

**Rule 4 — All display transformations use road-display.ts.**
Before passing props to section components, `page.tsx` calls the relevant functions from `road-display.ts`. The computed result is passed as a prop. The component receives a ready-to-render string or number.

**Rule 5 — page.tsx computes, components render.**
All derived values (`builtMonthsAgo`, `netDisbursed`, `certifierPerson`, `section4Title`, etc.) are computed in `page.tsx`. The section component receives the final display value as a prop, not the raw data to compute from.

### What page.tsx looks like structurally

```tsx
// src/app/road/[id]/page.tsx

import { getFullRoadData } from '@/server/queries/road';
import {
  builtMonthsAgo, daysLasted, formatCurrency, formatSalary,
  section4Title, benchmarkBags, benchmarkJeMonths,
  getInitials, getActionLabel, getAccountabilityLabel,
  dlpStatusLabel, formatDate, ISSUE_EVENT_TYPES,
} from '@/lib/utils/road-display';
import { EVENT_TYPES } from '@/types/road';
import HeroSection from '@/components/section1/HeroSection';
import ConditionSection from '@/components/section3/ConditionSection';
import BetrayalSection from '@/components/section4/BetrayalSection';
import FacesSection from '@/components/section5/FacesSection';
import EmpowermentSection from '@/components/section6/EmpowermentSection';

export const dynamic = 'force-dynamic';

export default async function RoadPage({ params }) {
  const { id } = await params;
  const data = await getFullRoadData(id);
  if (!data) notFound();

  // --- All derived values computed here ---
  const tenderEvent = data.events.find(
    e => e.eventType === EVENT_TYPES.WORK_ORDER_ISSUED && e.evidence?.isTender === true
  ) ?? data.events.find(e => e.eventType === EVENT_TYPES.WORK_ORDER_ISSUED);

  // ... all other derivations ...

  return (
    <main>
      <HeroSection road={data.road} heroPhoto={data.heroPhoto} builtAgo={builtMonthsAgo(tenderEvent)} ... />
      <ConditionSection events={data.events} drains={data.drains} ... />
      <BetrayalSection title={section4Title(data.road.healthStatus)} netDisbursed={netDisbursed} ... />
      <FacesSection certifierPerson={certifierPerson} contractor={contractor} ... />
      <EmpowermentSection confirmationCount={data.confirmationCount} roadId={data.road.id} />
    </main>
  );
}
```

---

# PART 5 — DESIGN TOKEN USAGE

## How to use design system values via Tailwind. No hardcoded hex values in components.

### Adding tokens to tailwind.config.ts

When color tokens are added to `tailwind.config.ts`, they will follow this pattern:

```ts
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      surface: '#FAFAF8',
      card: '#FFFFFF',
      'text-primary': '#1A1A1A',
      'text-muted': '#6B6B6B',
      border: '#E8E8E4',
      failure: '#C0392B',
      'failure-bg': '#FDECEA',
      warning: '#B45309',
      'warning-bg': '#FEF3C7',
      evidence: '#2D7A27',
      'evidence-bg': '#EAF4E2',
      dangerous: '#7B1D1D',
      'dangerous-bg': '#FCE8E8',
      empowerment: '#D97706',
      'empowerment-text': '#FFFFFF',
    },
    spacing: {
      '2xs': '4px',
      xs: '8px',
      sm: '16px',
      md: '30px',
      lg: '52px',
      xl: '80px',
    },
    borderRadius: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      full: '9999px',
    },
  },
}
```

### Token → Tailwind class reference

**Colors**

| Design Token | Tailwind Class | Used For |
|---|---|---|
| color-surface | `bg-surface` | All page backgrounds |
| color-card | `bg-card` | All card backgrounds |
| color-text-primary | `text-text-primary` | Headings, names, money, body |
| color-text-muted | `text-text-muted` | Dates, locations, meta |
| color-border | `border-border` | Dividers, hairlines |
| color-failure | `text-failure` | Ghost items, days lasted (critical) |
| color-failure-bg | `bg-failure-bg` | CRITICAL badge background |
| color-warning | `text-warning` | WARNING badge text, DLP active |
| color-warning-bg | `bg-warning-bg` | WARNING badge background |
| color-evidence | `text-evidence` | GOOD badge text |
| color-evidence-bg | `bg-evidence-bg` | GOOD badge background |
| color-dangerous | `text-dangerous` | DANGEROUS badge text |
| color-dangerous-bg | `bg-dangerous-bg` | DANGEROUS badge background |
| color-empowerment | `bg-empowerment` | Empowerment buttons only |

**Spacing**

| Design Token | Value | Tailwind Class |
|---|---|---|
| space-2xs | 4px | `gap-2xs` / `p-2xs` / `mt-2xs` |
| space-xs | 8px | `gap-xs` / `p-xs` / `mt-xs` |
| space-sm | 16px | `gap-sm` / `p-sm` / `mt-sm` |
| space-md | 30px | `gap-md` / `p-md` / `mt-md` |
| space-lg | 52px | `gap-lg` / `p-lg` / `mt-lg` |
| space-xl | 80px | `gap-xl` / `p-xl` / `mt-xl` |

**Border Radius**

| Design Token | Value | Tailwind Class |
|---|---|---|
| radius-xs | 4px | `rounded-xs` |
| radius-sm | 8px | `rounded-sm` |
| radius-md | 16px | `rounded-md` |
| radius-full | 9999px | `rounded-full` |

**Shadow — one class, used on all cards**

Add to tailwind.config.ts:

```ts
boxShadow: {
  card: '0 8px 40px rgba(0,0,0,0.18), 0 0 0 0.5px rgba(0,0,0,0.04)',
  'card-hover': '0 12px 48px rgba(0,0,0,0.22), 0 0 0 0.5px rgba(0,0,0,0.04)',
},
```

Usage: `shadow-card` on all cards. `hover:shadow-card-hover` with `transition-shadow`.

### Rules — no exceptions

- **Never use a hex value directly in a component.** No `className="text-[#C0392B]"`. Use `className="text-failure"`.
- **Never use Tailwind color defaults** (e.g., `text-red-500`, `bg-yellow-100`). Use the design system tokens only.
- **Never use arbitrary spacing values** like `mt-[13px]`. Use the spacing scale tokens only.
- **Never use arbitrary border radius** like `rounded-[12px]`. Use the radius scale only.
- **Color tokens for status badges** follow the exact mapping from design_system.md — see the accountability, health status, and photo status tables there.

### Typography — Tailwind classes

Add to `tailwind.config.ts` under `extend`:

```ts
fontSize: {
  'display': ['44px', { lineHeight: '1.0', letterSpacing: '-0.03em', fontWeight: '900' }],
  'headline': ['30px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
  'title': ['20px', { lineHeight: '1.3', letterSpacing: '0', fontWeight: '700' }],
  'body-bold': ['16px', { lineHeight: '1.6', fontWeight: '600' }],
  'body': ['16px', { lineHeight: '1.75', fontWeight: '400' }],
  'meta': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
  'label': ['11px', { lineHeight: '1.0', letterSpacing: '0.1em', fontWeight: '700' }],
},
```

Usage: `text-display mona`, `text-headline mona`, `text-label roboto uppercase`. Always pair the size class with the font class.

---

# PART 6 — DEFINITION OF DONE

## A section component is done when all five conditions are true.

### Condition 1 — Renders with real Ward 28 data

The component renders without errors using the actual live data from NeonDB for road `UK-RKE-29.8723-77.8813`. No mock data. No hardcoded fallback strings that substitute for missing data. If data is missing, the component handles it gracefully (empty state or null check) — it does not fake it.

---

### Condition 2 — Every MAPPING.md placeholder is populated

Every `{{placeholder}}` listed under that section in `MAPPING.md` resolves to real data. No placeholder renders as `undefined`, `null`, `NaN`, or an empty string where a value is expected.

**Reference — placeholders by section:**

| Section | Placeholders that must resolve |
|---|---|
| Section 1 | `road.name`, `road.money_spent`, `road.days_lasted`, `image.status`, `image.location`, `image.source`, `image.reported_date`, `image.reported_by` |
| Section 3 | `drain.count`, `drain.not_built`, `drain.broken`, `drain.blocked`, `drain.functional`, `cracks.subheading`, `potholes.subheading` |
| Section 4 | `section4.title`, `road.amount_allocated`, `road.amount_contracted`, `road.money_spent`, `road.benchmark_bags`, `road.benchmark_je_months`, `road.months_ago`, `road.days_lasted`, `road.issues_count` |
| Section 5 | `official.name`, `official.initials`, `official.role`, `official.department`, `official.salary`, `official.action`, `official.action_date`, `official.accountability_status`, `official.job_description`, `contractor.name`, `contractor.initials`, `contractor.company`, `contractor.license`, `contractor.amount_paid`, `contractor.dlp_status`, `contractor.accountability_status`, `contractor.job_description` |
| Section 6 | `road.witness_count` |

---

### Condition 3 — Zero TypeScript errors

Run `npx tsc --noEmit` from the project root. Output must be clean. No `any` types. No `as unknown as X` casts to hide type errors. No `@ts-ignore` comments.

---

### Condition 4 — No hardcoded values

Check the component for:
- No hex color strings (`#C0392B`, `rgba(...)`) — only Tailwind token classes
- No hardcoded spacing values (`mt-[13px]`) — only spacing token classes
- No hardcoded strings that should come from the database (`"Gurudayal Singh"`, `"Ward 28"`, `"₹3,54,581"`)
- No hardcoded benchmark constants (`300`) — those live in `road-display.ts` only
- No display logic written inline that belongs in `road-display.ts`

---

### Condition 5 — Follows all naming conventions in this document

- File name is PascalCase
- Component function name matches file name
- Prop type is named `[ComponentName]Props`
- All utility imports are from `@/lib/utils/road-display`
- All type/constant imports are from `@/types/road`
- All query imports (if any exist in page.tsx) are from `@/server/queries/road`
- No utility function is defined inside the component file

---

## Quick checklist — run before marking any component done

```
[ ] Renders with live Ward 28 data — no mock data
[ ] Every MAPPING.md placeholder for this section shows real data
[ ] npx tsc --noEmit — zero errors
[ ] No hex values in className strings
[ ] No hardcoded spacing values (mt-[Xpx])
[ ] No hardcoded data strings
[ ] File name: PascalCase
[ ] Component name: PascalCase, matches file name
[ ] Prop type: [ComponentName]Props
[ ] Display functions imported from @/lib/utils/road-display
[ ] No query functions imported inside the component
[ ] Section 2 (Map) — not built. No placeholder created.
[ ] OPEN ↗ link on face cards — not built. Not shown. Not disabled.
```

---

*FRONTEND.md v1.0 — written from: README.md, MAPPING.md, PROJECT_STATUS.md, DECISIONS.md, DATA_MODEL.md, all schema files, queries/road.ts, utils/road-display.ts, types/road.ts, page.tsx, tailwind.config.ts, globals.css, layout.tsx, design_system.md*
*Do not modify any existing source file based on this document without running the migrations in MAPPING.md Part 1 first.*
