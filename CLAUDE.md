# MyStreet — Claude Code Project Instructions

> IMPORTANT: Read this file completely before starting any task. Then read the linked documents for the specific domain you are working in. Never skip this step.

---

## THE THREE RULES YOU WILL MOST OFTEN BREAK

1. **Never hardcode colours, spacing, or font sizes.** Always use Tailwind design tokens.
2. **Never re-implement photo carousels.** Always use `src/components/shared/PhotoCarousel.tsx`.
3. **Always run `npx tsc --noEmit` before saying a task is done.** Zero errors required.

---

## WHAT MYSTREET IS

A civic accountability platform for India. It maps every rupee spent on a road against what was actually built — and puts the responsible officials on record, permanently. The primary user is **Sunita**: a vegetable vendor, Android phone, standing in bright Indian sunlight, received the link on WhatsApp. She has 10 seconds to decide whether to stay. Every visual decision passes through Sunita first.

This is not a complaint app. It is not a government portal. It is a permanent public record.

---

## WHO YOU ARE WORKING WITH

- The owner cares deeply about the design system. It took time to build — follow it exactly.
- Preferred working style: **concise responses, direct action, no trailing summaries**.
- When asked for specific fixes, fix only those things. Do not refactor surrounding code.
- After every visual change: **take a screenshot** and show it. The owner needs to see, not just read.
- When something is unclear: ask one focused question, not a list.
- Test road for all visual verification: `localhost:3000/road/UK-RKE-29.8723-77.8813`

---

## MANDATORY READS BEFORE STARTING

| Document | Read when |
|---|---|
| `all .md files/design_system.md` | Before ANY visual or frontend work |
| `all .md files/ward28/ward28skill.md` | Before ANY data, query, or schema work — routes you to the correct ward28 file |

> `all .md files/MAPPING.md` is superseded by the ward28 files. It contains outdated person names and stale schema. Do not use it.

These documents are the source of truth. If this file conflicts with them, those files win.

---

## TECH STACK

| Layer | Technology |
|---|---|
| Framework | Next.js 14 App Router |
| Language | TypeScript — strict mode. No `any`. No `@ts-ignore`. |
| Styling | Tailwind CSS v4 with custom design tokens |
| Icons | Lucide React — stroke only, `strokeWidth={1.5}`, size 20 inline / 24 standalone |
| ORM | Drizzle ORM |
| Database | PostgreSQL |
| Components | Custom only — no component library UI |

---

## PROJECT STRUCTURE

```
src/
  app/
    road/[id]/page.tsx          ← Server component. ALL data fetching happens here. Passes typed props to sections.
    api/road/[id]/route.ts      ← REST endpoint for the same road data.
    page.tsx                    ← Home/landing page.
  components/
    shared/                     ← Reusable components. Use them. Never rebuild what already exists here.
      PhotoCarousel.tsx          ← ALL photo carousels. variants: 'card' | 'hero'
      StatusBadge.tsx            ← Health/photo/accountability status pill.
    section1/HeroSection.tsx
    section3/ConditionSection.tsx
    section4/BetrayalSection.tsx
    section5/FacesSection.tsx
    section6/EmpowermentSection.tsx
  server/
    queries/road.ts             ← All DB queries. Single source of data.
    db/                         ← Drizzle schema and seed files.
  types/road.ts                 ← All shared TypeScript types. Never define types inline in components.
  lib/utils/road-display.ts    ← Display helpers: formatDate, formatCurrency, builtMonthsAgo, daysLasted, getHeroCrops, etc.
all .md files/
  design_system.md              ← Visual bible. Parts 1–6 locked. Part 7 = shared components.
  MAPPING.md                    ← DB schema → component data map.
```

**New sections:** `src/components/section{N}/SectionNameSection.tsx`
**New shared components:** `src/components/shared/` + document in `design_system.md` Part 7.

---

## DATA PIPELINE — STRICT, ONE DIRECTION

```
PostgreSQL → server/queries/road.ts → app/road/[id]/page.tsx → section components (props)
```

- **NEVER fetch data inside a section component.** All fetching in `page.tsx`.
- Compute display values (formatted currency, relative dates, etc.) in `page.tsx` using `road-display.ts` helpers — not inside components.
- Use `'use client'` only when the component requires `useState`, `useRef`, or event handlers. Everything else is a server component.

---

## DESIGN TOKENS — QUICK REFERENCE

**IMPORTANT: These are the only values allowed. No hex codes. No arbitrary pixel values.**

```
Backgrounds:   bg-surface (#FAFAF8)   bg-card (#FFFFFF)
Text:          text-text-primary      text-text-muted
Status:        text-failure           text-warning        text-evidence     text-dangerous
Borders:       border-border          border-[0.5px]

Spacing scale: gap-2xs(4px)  gap-xs(8px)  gap-sm(16px)  gap-md(30px)  gap-lg(52px)  gap-xl(80px)
Page padding:  px-sm(mobile)  px-md(desktop)

Shadows:       shadow-card    shadow-card-hover
Radius:        rounded-xs  rounded-sm  rounded-md  rounded-full
```

**Fonts — never swap these:**
- `.mona` — headings, money figures, body narrative, official names, anything the user reads for meaning
- `.roboto` — labels, dates, locations, metadata, badges, anything the user scans for information
- When unsure: *is Sunita reading this as a story or scanning it as data?* Story = mona. Data = roboto.

---

## SHARED COMPONENTS — MUST USE

### PhotoCarousel (`src/components/shared/PhotoCarousel.tsx`)

```tsx
// Card variant — inside multi-card grids. Returns a fragment (photo div + dots div).
const [activePhoto, setActivePhoto] = useState<PhotoData | null>(
  () => photos.find(p => !p.url.toLowerCase().endsWith('.heic')) ?? null
);
<PhotoCarousel photos={photos} height="h-64" maxPhotos={5} onActivePhotoChange={setActivePhoto} />

// Hero variant — full-bleed sections. Dots absolute inside container.
// renderPhoto: art-directed <picture> with device-specific Cloudinary crops (no crop on mobile to avoid double-crop).
// renderSlideBottom: 4-line overlay — street name, location + pin, governing body + landmark, photo date + verify link.
<PhotoCarousel
  photos={allPhotos}
  height="h-screen"
  variant="hero"
  renderPhoto={(photo) => {
    const crops = getHeroCrops(photo.url); // from road-display.ts
    return (
      <picture className="absolute inset-0 w-full h-full">
        <source media="(min-width: 1280px)" srcSet={crops.desktop} />
        <source media="(min-width: 768px)"  srcSet={crops.laptop} />
        <img src={crops.mobile} alt="" className="w-full h-full object-cover" />
      </picture>
    );
  }}
  renderSlideBottom={(photo) => {
    const [streetName, locationText] = photo.locationLabel
      ? photo.locationLabel.split(' — ')
      : [road.ward ?? road.roadDisplayName, null];
    return (
      <div className="absolute bottom-0 left-0 w-full pb-xl pl-sm z-10 flex flex-col gap-2xs">
        <h2 className="text-headline mona text-white">{streetName}</h2>
        {locationText && (
          <p className="flex items-center gap-2xs text-label roboto text-white/60">
            <MapPin size={12} strokeWidth={1.5} />
            {locationText}
          </p>
        )}
        {road.governingBody && (
          <p className="flex items-center gap-2xs text-label roboto text-white/80">
            <Landmark size={12} strokeWidth={1.5} />
            Under: {road.governingBody}
          </p>
        )}
        {photo.capturedAt && (
          <a href={photo.url} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2xs text-label roboto text-white/40 uppercase tracking-widest hover:text-white/70 transition-colors w-fit">
            Photographed {formatDate(photo.capturedAt)}
            <ExternalLink size={12} strokeWidth={1.5} />
          </a>
        )}
      </div>
    );
  }}
/>
```

- HEIC files are filtered internally. Never pre-filter before passing.
- `onActivePhotoChange` fires synchronously on scroll/arrow (not on mount). Initialise parent state from `photos.find(heic filter)` to avoid null flash.
- Full API in `design_system.md` Part 7.

### StatusBadge (`src/components/shared/StatusBadge.tsx`)

```tsx
<StatusBadge status={photo.status} />               // semi-transparent — for photo overlays
<StatusBadge status={photo.status} variant="solid" /> // opaque — for hero
```

---

## MULTI-CARD SUBGRID PATTERN (Section 3 reference implementation)

For any 3-column section where card rows must align horizontally:

```tsx
// Parent — items-start prevents stretching
<div className="grid grid-cols-1 md:grid-cols-3 gap-md items-start" style={{ gridTemplateRows: 'auto' }}>

// Card — participates in parent rows via subgrid
<div className="bg-card rounded-md shadow-card ... grid" style={{ gridRow: 'span 6', gridTemplateRows: 'subgrid' }}>
  <PhotoCarousel ... />  {/* rows 1–2: photo area + dots (fragment = 2 direct children) */}

  // Card body — rows 3–6
  <div className="p-sm grid gap-sm" style={{ gridTemplateRows: 'subgrid', gridRow: 'span 4' }}>
    {/* ROW 1 */ } <h3>headline</h3>
    {/* ROW 2 */ } <p>body sentence</p>
    {/* ROW 3 */ } <div>{/* grouped detail lines */}</div>
    {/* ROW 4 */ } <div>{type === 'drains' ? <DrainStats /> : null}</div>  {/* MUST render a div even if empty */}
  </div>
</div>
```

ROW 4 MUST always render a `<div>` — even when empty — or the row collapses and cards misalign.

---

## DEFINITION OF DONE

Every task, no exceptions:

- [ ] `npx tsc --noEmit` — zero errors
- [ ] No `any`, no `@ts-ignore`
- [ ] Screenshot taken and shown (visual tasks)
- [ ] No hardcoded colours / pixel values / font sizes
- [ ] `PhotoCarousel` used for any carousel — never re-implemented
- [ ] If a new shared component or pattern was introduced → `design_system.md` Part 7 updated

---

## EVIDENCE JSONB — EXTRACTION RULE

Never access `event.evidence` fields with `as any`. Always use the typed extractors in `src/lib/utils/road-display.ts`:

```ts
// ✅ Correct
const { netDisbursed } = extractPaymentEvidence(paymentEvent?.evidence);
const { estimatedValue, contractValue } = extractTenderEvidence(tenderEvent?.evidence);

// ❌ Never do this
const val = (event.evidence as any)?.someField;
```

When a new event type needs evidence fields extracted — add a new named extractor to `road-display.ts`. Never inline the cast.

---

## NEVER DO

- Fetch data inside a section component
- Hardcode a colour, spacing value, or font size
- Use `.mona` for labels/dates/metadata
- Use `.roboto` for headings or narrative text
- Re-implement scroll/arrow/dot carousel logic — use `PhotoCarousel`
- Use filled icons — Lucide stroke only
- Add a new shared component without documenting it in `design_system.md` Part 7
- Use `any` or `@ts-ignore`
- Summarise what you just did at the end of a response — the owner can read the diff
- Touch more code than the task requires — scope creep is a bug
- Say a visual task is done without taking a screenshot

> The full violation list is in `design_system.md` Part 5.
