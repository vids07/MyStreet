# MYSTREET — DESIGN SYSTEM FOUNDATIONS
## Version 1.1 — Locked Foundations
## Status: PRODUCTION READY. Do not deviate from locked decisions.

---

## HOW TO READ THIS DOCUMENT

This document has two types of content:

**LOCKED** — These decisions are final. Do not change them, reinterpret them, or replace them with defaults. If you think a locked decision is wrong, flag it to the team. Do not silently override it.

**OPEN** — These decisions are still being made. Use your best judgment within the principles defined in the Design DNA section. Flag any open decision you make so it can be reviewed.

Every decision in this document has a reason. The reason always connects back to one person — Sunita. A vegetable vendor. Non-technical. Android phone. Bright Indian sunlight. If a decision doesn't serve Sunita first, it is wrong.

---

## PART 1 — DESIGN DNA
### The soul of every visual decision. Read before touching anything.

---

### WHAT MYSTREET IS

A mirror. It shows reality. It does not editorialize. It does not comfort. It does not rage. It simply holds up what exists — and refuses to look away.

---

### THE THREE TRUTHS

**Truth 1 — The Mirror**
MyStreet feels like a mirror — neutral, direct, no comment needed. It does not tell Sunita what to feel. It shows her road, her money, her officials. She draws her own conclusions. The design never shouts. The facts do.

**Truth 2 — The Spotlight**
When an official sees their name on MyStreet, they feel exposed — like a spotlight they cannot escape. Not attacked. Not accused. Simply — visible. Permanently. The design must carry that weight. Quietly. Like a court record that exists whether you read it or not.

**Truth 3 — The Ownership**
When Sunita shares MyStreet with her neighbour, the neighbour thinks: this is mine — this is about my life. Not "this is an app." Not "this is a report." This is my road, my money, my street. The design must feel local, human, immediate — never institutional, never distant.

---

### THE ONE TEST

Before any visual decision — color, font, layout, component — ask this single question:

**"Does this make the truth more visible, or does it make the product more visible?"**

If it makes the product more visible — remove it.
If it makes the truth more visible — keep it.

---

### WHAT MYSTREET ALWAYS FEELS LIKE

- A permanent public record
- Something that existed before you arrived and will exist after you leave
- Documentary footage — unfiltered, unedited, real
- A newspaper that printed your road's story on the front page
- The kind of document you keep, not scroll past

---

### WHAT MYSTREET NEVER FEELS LIKE

- A government portal
- A complaint app
- A dashboard built for someone in an office
- A startup product trying to look friendly
- Something that could belong to any other category

---

### THE EMOTIONAL ARC

Every person who opens a road page travels this arc. The design is the vehicle. Never skip a step.

```
RECOGNITION → UNDERSTANDING → ANGER → AGENCY
"This is       "This is what    "This is   "I can do
my road."      happened."       wrong."     something."
```

---

### PRIMARY USER — SUNITA

Non-technical. Vegetable vendor. Android phone. May be standing in bright Indian sunlight. Received this link on WhatsApp. Has 10 seconds before she decides to stay or leave.

If Sunita cannot immediately understand what she is looking at — the design has failed. Not Sunita. The design.

Every visual decision passes through Sunita first. Always.

---

## PART 2 — VISUAL DIRECTION
### The reference world MyStreet lives in.

**Structure reference:** Citizen app — full bleed photo/video, bold headline directly on content, timeline, community count. This is the closest existing product to MyStreet's structure.

**Spacing reference:** Airbnb — generous breathing room, clean card hierarchy, nothing crowded. Every piece of content has room to exist on its own.

**Data display reference:** Fitness tracker apps — big numbers, clean labels, data as the hero. Applied to Section 4 (The Betrayal) and money figures throughout.

**Mode:** Light. Always. Dark mode breaks trust for a public record and fails Sunita's sunlight test.

**Surface:** Warm modern white — not cold clinical white. `#FAFAF8`. The white of a premium product, not a government form.

---

## PART 3 — LOCKED TOKENS

---

### 3.1 TYPOGRAPHY — LOCKED ✅

**Two font system. Each font has a specific job. Never swap them.**

---

**FONT 1 — Mona Sans**
Used for: All impact moments. Headings, titles, money figures, body narrative, official names.
The emotional voice of MyStreet. Heavy, authoritative, wide.

**Width setting:** `font-variation-settings: "wdth" 125` — always. Non-negotiable.
**Fallback:** system-ui, -apple-system, sans-serif
**Hindi compatibility:** Mona Sans supports Devanagari. Never shrink Hindi text to fit. Same grid, same sizes.

---

**FONT 2 — Roboto**
Used for: All information moments. Labels, metadata, dates, locations, record IDs, badges, status tags.
The neutral information voice. Gets out of the way of the content.

**Width setting:** `font-variation-settings: "wdth" 100` — default Roboto width.
**Fallback:** system-ui, -apple-system, sans-serif

---

**Import — both fonts together, always:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Mona+Sans:ital,wght@0,200..900;1,200..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
```

**CSS Base:**
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

---

**TYPE SCALE — 7 LEVELS — ALL LOCKED**

| Level | Name | Font | Size | Weight | Line Height | Tracking | Case | Used For |
|---|---|---|---|---|---|---|---|---|
| 1 | Display | Mona Sans | 44px | 900 | 1.0 | -0.03em | Title case | Hero money figure, Betrayal number. ONE per page maximum. |
| 2 | Headline | Mona Sans | 30px | 800 | 1.1 | -0.02em | Title case | Road name, Section titles, The Betrayal heading. Max two per screen. |
| 3 | Title | Mona Sans | 20px | 700 | 1.3 | 0 | Title case | Betrayal statement, Card headings, Official names on face card. |
| 4 | Body Bold | Mona Sans | 16px | 600 | 1.6 | 0 | Sentence case | Key facts needing emphasis. Status lines. Critical data points inside cards. |
| 5 | Body | Mona Sans | 16px | 400 | 1.75 | 0 | Sentence case | All narrative body text. Evidence descriptions. The workhorse. |
| 6 | Meta | Roboto | 16px | 400 | 1.6 | 0 | Sentence case | Dates, locations, record IDs, attribution, supporting context. Always muted color. |
| 7 | Label | Roboto | 11px | 700 | 1.0 | 0.1em | ALL CAPS | Category labels, section identifiers, status tags, badges ONLY. Never for sentences Sunita reads. |

**THE SIMPLE RULE FOR EVERY ELEMENT:**
- Is it a heading, title, money figure, narrative, or emotional moment? → **Mona Sans**
- Is it a label, date, location, ID, badge, or tag? → **Roboto**
- Not sure? Ask: is Sunita reading this to understand the story, or to identify a piece of information? Story = Mona Sans. Information = Roboto.

**CRITICAL TYPOGRAPHY RULES — NON-NEGOTIABLE:**

- **16px is the absolute minimum for all readable text.** Level 7 (Label) at 11px is the only exception — used only for tags and identifiers, never narrative content.
- **Mona Sans wdth 125 is never optional.** Without it the font loses its authority and looks generic.
- **Roboto is never used for headings, titles, or body narrative.** It is an information font only.
- **Money figures always use Level 1 or Level 2 Mona Sans.** Never smaller. Never lighter than Weight 800.
- **Official names always displayed in full using Mona Sans.** Never abbreviated. Never truncated. Never in Roboto.
- **Numbers showing money or time are always bolder than surrounding text.** Minimum Weight 700.
- **Level 7 (Label) is ALL CAPS only.** Never use ALL CAPS for any other level.

---

### 3.2 SPACING — LOCKED ✅

**Base unit:** 4px
**Base element spacing:** 30px
**Section spacing:** 52px
**Major section spacing:** 80px

**Full spacing scale:**

| Token | Value | Used For |
|---|---|---|
| space-2xs | 4px | Micro gaps — label to underline, icon to text |
| space-xs | 8px | Label to its value directly below |
| space-sm | 16px | Elements within a single card |
| space-md | 30px | Between distinct elements on a page |
| space-lg | 52px | Between sections |
| space-xl | 80px | Between major page sections |
| container-mobile | 20px | Page edge padding — mobile |
| container-desktop | 40px | Page edge padding — desktop |
| container-wide | 80px | Page edge padding — large desktop (1440px+) |

**SPACING RULES:**

- Sections always have space-lg (52px) minimum between them. MyStreet breathes. It is not dense.
- Cards always have space-sm (16px) internal padding minimum.
- Labels sit space-2xs (4px) above their value. Always.
- Do not invent spacing values outside this scale. If a value feels wrong, go to the nearest token. Do not create new tokens without flagging.

---

### 3.3 BORDER RADIUS — LOCKED ✅

| Token | Value | Used For |
|---|---|---|
| radius-xs | 4px | Badges, status tags, small pills |
| radius-sm | 8px | Small elements — inputs, small buttons |
| radius-md | 16px | Cards, containers, large buttons |
| radius-full | 9999px | Circular elements only — avatars, round buttons |

**RADIUS RULES:**

- Cards always use radius-md (16px). No exceptions.
- Badges and status tags always use radius-xs (4px). They are records, not decorations.
- Never mix radius values within a single component.
- The glassmorphism element in the hero uses radius-md (16px).

---

### 3.4 SHADOW SYSTEM — LOCKED ✅

One shadow style. Used on all cards. No exceptions.

```css
box-shadow: 0 8px 40px rgba(0,0,0,0.18),
            0 0 0 0.5px rgba(0,0,0,0.04);
```

**What this does:**
- `0 8px 40px rgba(0,0,0,0.18)` — deep, soft shadow. Cards feel like physical objects with real weight.
- `0 0 0 0.5px rgba(0,0,0,0.04)` — hairline border. Defines the card edge cleanly on white backgrounds.

**Shadow rules:**
- Every card uses this shadow. Road record card, official face card, condition cards — all identical.
- Never increase opacity above 0.18 — it becomes theatrical.
- Never decrease spread below 40px — it becomes too tight, too sharp.
- Never use colored shadows.
- Never use inset shadows.
- The glassmorphism hero panel does not use this shadow — it sits on video, not on a surface.

---

### 3.6 BORDER STYLE — LOCKED ✅

**Divider lines inside cards and between sections:**

```css
border: 0.5px solid #EDE8E3;
```

**What this does:**
Barely visible. Almost non-existent. You feel the separation without seeing the line. Exactly like Airbnb. The content breathes freely — the divider never competes.

**Border rules:**
- All horizontal dividers inside cards use this value. No exceptions.
- Never use 1px. Never use cool gray. Never use pure white.
- The card's outer hairline border uses `0 0 0 0.5px rgba(0,0,0,0.04)` via box-shadow — not a CSS border.
- Section dividers on the page use the same `#EDE8E3` at 0.5px.
- Never use borders for decoration. Only for separation when content genuinely needs it.

---

### 3.7 TECH STACK — LOCKED ✅

**Frontend Framework:** React
**Component Library:** shadcn/ui
**Styling:** Tailwind CSS
**Icon Library:** Lucide (comes built into shadcn/ui)

**Why this stack:**
- shadcn/ui gives full component code ownership — every component can be modified to match the MyStreet design system exactly. No fighting library defaults.
- React + shadcn/ui + Tailwind is the most AI-compatible stack available. Claude Code, v0, Cursor all work natively with this stack.
- Lucide icons are clean, consistent, modern stroke icons — free and open source.
- This stack scales. Build a component once, reuse everywhere. Change one thing, it updates everywhere.

---

**ICON SPECIFICATION — Lucide — LOCKED ✅**

**Library:** Lucide React — https://lucide.dev
**Style:** Stroke only. Never filled. Never mixed.
**Default size:** 20px for inline icons, 24px for standalone icons
**Default stroke width:** 1.5px — never 1px (too thin), never 2px (too heavy)
**Color:** Inherits from parent text color. Never hardcoded icon colors.

**Core icons used in MyStreet:**

| Icon | Lucide name | Used for |
|---|---|---|
| Location | `MapPin` | Road location, ward, address |
| Governing body | `Landmark` | Public body responsible — used in hero overlay |
| Verify / external | `ExternalLink` | Open original photo for verification — hero overlay |
| Warning | `AlertTriangle` | Critical status |
| Person | `User` | Officials, contractors |
| Share | `Share2` | Share Truth action |
| Camera | `Camera` | Document action |
| Eye | `Eye` | Witness action |
| Clock | `Clock` | Timeline, dates |
| Check | `Check` | Verified, completed nodes |
| ChevronRight | `ChevronRight` | See full record arrow |
| Download | `Download` | Download report |
| Map | `Map` | Map section |
| Left/Right | `ChevronLeft` / `ChevronRight` | Carousel navigation arrows |

**Icon rules:**
- Never use filled icons and stroke icons in the same view
- Never resize icons below 16px — Sunita in sunlight
- Never use icons as decoration — every icon must carry meaning
- Never add icons to headings — type carries headings, icons support body content only
- Icons in buttons sit left of label text. Never right. Never centered alone without label.

---

### 3.8 COLOR — OPEN ⬜

Color tokens are being finalized. Do not use placeholder colors from any design framework. Do not use Material Design defaults. Do not use Tailwind defaults.

**What is confirmed while tokens are finalized:**

- Background base: `#FAFAF8` — warm modern white. Use this as the page background everywhere.
- Primary text: near-black with warm undertone (exact value being finalized)
- Failure color: dark serious red — not bright, not orange-red. The color of a red pen marking an error.
- Empowerment color: amber — used ONLY for the three empowerment action buttons (Witness, Share, Document)
- Authority color: deep civic blue — used for permanent record labels and official designations
- Evidence color: deep forest green — used for verified and confirmed data

COLOR TOKENS — v1.2 LOCKED
Surface & Base
TokenHexUsed Forcolor-surface#FAFAF8All page backgrounds. Never pure white.color-card#FFFFFFCards only. Lifts off the surface.color-text-primary#1A1A1AAll headings, names, money figures, body narrative.color-text-muted#6B6B6BDates, locations, meta labels, supporting context.color-border#E8E8E4Dividers, hairlines, card outlines.

Failure Red — Critical moments
TokenHexUsed Forcolor-failure#C0392BDays lasted, ghost item amounts, critical text.color-failure-bg#FDECEACRITICAL badge background.color-failure-text#C0392BCRITICAL badge text.

Warning Amber — Warning moments
TokenHexUsed Forcolor-warning#B45309WARNING badge text, DLP active text.color-warning-bg#FEF3C7WARNING badge background.

Evidence Green — Good road moments
TokenHexUsed Forcolor-evidence#2D7A27GOOD badge text, functional drain, positive status.color-evidence-bg#EAF4E2GOOD badge background.

Dangerous — Fourth health state
TokenHexUsed Forcolor-dangerous#7B1D1DDANGEROUS badge text. Deeper than failure red.color-dangerous-bg#FCE8E8DANGEROUS badge background.

Empowerment Amber — Buttons only
TokenHexUsed Forcolor-empowerment#D97706Empowerment buttons only. Witness, Share, Document. Never used elsewhere.color-empowerment-text#FFFFFFText on empowerment buttons.

Accountability Status Badge Colors
StatusBackgroundTextwaiting_for_audit#FEF3C7#B45309response_pending#FEF3C7#B45309responded#EAF4E2#2D7A27charged#FDECEA#C0392B

Health Status Badge Colors
StatusBackgroundTextcritical#FDECEA#C0392Bwarning#FEF3C7#B45309good#EAF4E2#2D7A27dangerous#FCE8E8#7B1D1D

Photo Status Badge Colors
StatusBackgroundTextcritical#FDECEA#C0392Bwarning#FEF3C7#B45309good#EAF4E2#2D7A27informational#EFF6FF#1D4ED8

---

### 3.5 GLASSMORPHISM — LOCKED ✅

**One place only:** The hero video text overlay.

**Specification:**
- Background: `rgba(255, 255, 255, 0.15)`
- Backdrop filter: `blur(12px)`
- Border: `1px solid rgba(255, 255, 255, 0.2)`
- Border radius: radius-md (16px)
- Applied only to the text block sitting over the hero video

**Glassmorphism appears nowhere else in the product. Ever.**

If you are tempted to use glassmorphism in another section — do not. The hero is its only home because it is the only place where a video underneath justifies seeing through a surface.

---

## PART 4 — LOCKED SECTION PATTERNS

---

### SECTION 1 — THE HERO — LOCKED ✅

**Purpose:** In 5 seconds, Sunita must feel: "This is my road. Someone knows."

**Implementation:** Full-bleed photo carousel. `h-screen`. `variant="hero"` on PhotoCarousel. Photos are citizen field photos with `eventId: null` in the database — this is the query join condition, not a convention.

**Photo display — art-directed per device:**
- Mobile (`< 768px`): original Cloudinary URL, no crop. Source photos are portrait (phone-shot) — they already match mobile aspect ratio. `object-cover` handles the minor fill.
- Laptop (`768px–1279px`): Cloudinary `c_fill,ar_1.6,g_auto` crop. Landscape fill.
- Desktop (`≥ 1280px`): Cloudinary `c_fill,ar_1.78,g_auto` crop. Landscape fill.

Use `getHeroCrops(photo.url)` from `road-display.ts` to generate all three URLs. Pass result via `renderPhoto` prop on PhotoCarousel.

**Gradient overlay:** `bg-gradient-to-t from-black/60 via-black/5 to-transparent` — darkens only near the bottom where text sits. Intentionally light so road damage is visible through most of the frame.

**Bottom overlay — 4 lines, bottom-left, `pb-xl pl-sm`:**

| Line | Content | Source | Style |
|---|---|---|---|
| 1 | Street name | `photo.locationLabel.split(' — ')[0]` | `text-headline mona text-white` |
| 2 | Location | `photo.locationLabel.split(' — ')[1]` + `MapPin` icon | `text-label roboto text-white/60` |
| 3 | Governing body | `road.governingBody` + `Landmark` icon, prefixed "Under:" | `text-label roboto text-white/80` — brighter than location, this is accountability data |
| 4 | Photo date + verify link | `capturedAt` formatted + `ExternalLink` icon, opens original photo URL | `text-label roboto text-white/40 uppercase` — dimmed, verification affordance |

**`locationLabel` format contract:** `"street name — ward, city, pincode"` — split on ` — `. Everything before = headline. Everything after = location line. This format is enforced in seed.ts via the `Section1Photo` type.

**StatusBadge:** top-right, `variant="solid"`. Shows photo-level status (critical/warning/good/informational), not road health status.

**What does NOT appear in the hero:**
- Navigation bar or header
- Logo
- Search bar
- Grid or card layout
- Glassmorphism panel (reserved for future video implementation)
- Any rating, star, or social proof element

**Fallback:** If `photo.locationLabel` is null, headline falls back to `road.ward` or `road.roadDisplayName`. Always render something.

---

### SECTION 5 — THE FACES — LOCKED ✅

**Purpose:** Put every person who signed off on this road on permanent public record. Names, designations, what they were supposed to do, what happened on their watch, and what the public pays them.

**Layout:** `section#section5`, `py-xl bg-surface`. Inner container: `max-w-7xl mx-auto px-sm md:px-md`.

**Section heading:** `text-headline mona text-text-primary` — "The Faces"
**Subhead:** `text-body mona text-text-muted mt-xs` — "{N} people signed off on this road." (N = total across all chains)

**Chain groups** — three groups rendered in order:

| Group label | Subtitle | Chain prop |
|---|---|---|
| THE ENGINEERS | Each had to certify the work before money could move. | `technicalChain` |
| THE FINANCE TEAM | They verified the numbers and cleared the payment. | `financialChain` |
| THE COMMISSIONER | The final signature. The one that released your money. | `administrativeChain` |

Each group: `mt-xl mb-sm` header block with label (`text-label roboto uppercase text-text-muted`) + subtitle (`text-meta roboto text-text-muted mt-2xs`). Cards rendered in `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md`. If a chain has 0 cards, the group renders nothing.

**Contractor block** — separated from chains by a full-width divider: `mt-xl pt-xl border-t border-border`. Label: `text-label roboto uppercase text-text-muted mb-sm` — "CONTRACTOR". Card grid identical to chain groups. Only renders when `contractor` prop is non-null.

**FaceCard anatomy** — see Part 7 for the component spec.

---

### ROAD RECORD CARD — LOCKED ✅

**Purpose:** The most repeated component in the product. Used in the Map tap reveal and anywhere a road is listed. Six elements. Nothing more. Nothing less.

**Photo treatment:** Photo sits inside the card with 16px padding on all sides. Rounded corners matching radius-sm (10px) on the photo itself. Never bleeds to card edge. Never full width without padding.

**Card structure — top to bottom, in this exact order:**

```
┌─────────────────────────────┐
│  [16px padding]             │
│  ┌───────────────────────┐  │
│  │                       │  │
│  │    ROAD PHOTO         │  │  ← 160px height, radius-sm, object-fit: cover
│  │                       │  │
│  └───────────────────────┘  │
│  [16px gap]                 │
│  ● Critical          [badge]│  ← Roboto Label, radius-xs, failure/warning/evidence color
│  [8px gap]                  │
│  Road Name           [title]│  ← Mona Sans Title (20px / 800)
│  Location, Ward      [meta] │  ← Roboto Meta (16px / 400 / muted)
│  [16px gap]                 │
│  ─────────────────────────  │  ← 0.5px divider, color-border
│  [16px gap]                 │
│  Built        Spent         │  ← Two columns
│  14 days ago  ₹14.2M        │  ← Built: Mona Sans Body Bold, failure red if critical
│                             │    Spent: Mona Sans Title, #1A1A1A
│  [16px gap]                 │
│  ─────────────────────────  │  ← 0.5px divider
│  See full record        →   │  ← Roboto Body Bold left, arrow right
└─────────────────────────────┘
```

**Card CSS specification:**
```css
.road-card {
  background: #FFFFFF;
  border-radius: 16px;                                          /* radius-md */
  box-shadow: 0 2px 12px rgba(0,0,0,0.07),
              0 0 0 0.5px rgba(0,0,0,0.05);                   /* soft shadow + hairline border */
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.15s ease;
}

.road-card:hover {
  transform: translateY(-2px);                                  /* subtle lift on hover */
}

.road-card .photo-wrap {
  padding: 16px 16px 0;                                        /* space-sm on all sides, no bottom */
}

.road-card .photo {
  width: 100%;
  height: 160px;
  border-radius: 10px;                                         /* slightly less than card radius */
  object-fit: cover;
  display: block;
}

.road-card .card-body {
  padding: 16px;                                               /* space-sm internal padding */
}
```

**Status badge colors: OPEN ⬜**
Not yet decided. Will be locked in v1.2 when color tokens are finalized. Do not use any color framework defaults. Wait for explicit lock.

**"Built X ago" color rules: OPEN ⬜**
Not yet decided. Will be locked in v1.2 when color tokens are finalized.

**Card hover/tap behavior — LOCKED ✅**
```css
.road-card {
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.road-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 48px rgba(0,0,0,0.22),
              0 0 0 0.5px rgba(0,0,0,0.04);
}
```
Card lifts 2px. Shadow deepens. Never scale. Never color change. Never border change.
- Six elements only: photo, badge, road name, location, built/spent row, see more link
- Never add a seventh element without flagging
- Never remove the dividers — they create the document-like structure
- "See full record" never changes to "View", "Open", "Details", or "Explore"
- Arrow → is always right-aligned, never a button, never colored
- Card never has a colored border — shadow only
- Card tap target is the entire card, not just the "See full record" link

---

## PART 5 — WHAT YOU MUST NEVER DO

Read this before generating any output. These are hard violations.

1. Never put a navigation bar or header over the hero video
2. Never use pure `#FFFFFF` as a background. Use `#FAFAF8`
3. Never go below 16px for any text Sunita reads
4. Never use `font-variation-settings: "wdth" 100` — always 125
5. Never show ratings, stars, likes, or dislikes anywhere in the product
6. Never use glassmorphism outside the hero video text overlay
7. Never use the amber empowerment color for anything except the three empowerment buttons
8. Never add a login prompt, signup CTA, or account creation anywhere
9. Never put a background box or opaque card behind the hero text sequence
10. Never change "Who did this?" to any other label on broken road pages
11. Never use ALL CAPS except for Level 7 Labels
12. Never abbreviate or truncate an official's name
13. Never use spacing values outside the defined scale
14. Never use border radius values outside the defined scale
15. Never make it feel like a food app, SaaS dashboard, government portal, or complaint box

---

## PART 6 — REFINEMENT PROTOCOL

When something looks wrong, follow this sequence exactly. Fix one thing. Stop. Review. Never redesign everything at once.

**Step 1:** Does it violate the Design DNA or The One Test?
→ Remove or rebuild from scratch.

**Step 2:** Does it use the wrong typography token?
→ Replace only the token. Do not touch surrounding elements.

**Step 3:** Does it use the wrong spacing token?
→ Adjust spacing only. Do not touch other properties.


**Step 4:** Does it use wrong border radius?
→ Fix radius only.

**Step 5:** Does it break a section pattern?
→ Restore the pattern. Do not modify other sections.

**If none of the above:** The problem is in the content or data, not the design. Check what information is being displayed.

---

## PART 7 — SHARED COMPONENTS

These components live in `src/components/shared/`. Use them in every section. Never re-implement the same pattern in a section file.

---

### PhotoCarousel — LOCKED ✅

**File:** `src/components/shared/PhotoCarousel.tsx`
**Purpose:** All photo carousels in the product. One component, two visual variants.

**Props:**

| Prop | Type | Default | Notes |
|---|---|---|---|
| `photos` | `PhotoData[]` | required | Raw photos — HEIC filtered internally |
| `height` | `string` | `'h-64'` | Tailwind height class on the photo area |
| `maxPhotos` | `number` | no limit | Slice limit applied after HEIC filter |
| `variant` | `'card' \| 'hero'` | `'card'` | Controls arrows, badge, dots, gradient |
| `renderPhoto` | `(photo) => ReactNode` | — | Hero only: replaces default image layers entirely. Use for art-directed `<picture>` elements with device-specific Cloudinary crops. |
| `renderSlideBottom` | `(photo) => ReactNode` | — | Hero only: inject bottom overlay per slide |
| `onActivePhotoChange` | `(photo \| null) => void` | — | Called on scroll/arrow; not on mount |

**variant="card"** — used inside ConditionCard and any future multi-card sections:
- Photo area: `h-64 rounded-sm overflow-hidden`
- Badge: top-left, default variant
- Arrows: size 20, `p-2xs`, `left-xs` / `right-xs`, `hover:bg-black/60`
- Gradient: `h-16 from-black/60` bottom only
- Location label: `bottom-xs left-xs text-label roboto text-white/80 uppercase`
- Dots: rendered **below** photo area in flow (two separate DOM elements — fragment)
- Dot active: `w-sm bg-text-primary`, inactive: `w-xs bg-text-muted/30`, `gap-2xs`

**variant="hero"** — used in HeroSection:
- Photo area: fills parent height (pass `height="h-screen"`)
- Badge: top-right, `variant="solid"`
- Arrows: size 24, `w-10 h-10`, `left-sm` / `right-sm`, `hover:bg-black/70`
- Gradient: `inset-0 from-black/60 via-black/5 to-transparent` — intentionally light so photo damage is visible
- Dots: absolute `bottom-sm center`, `bg-white` / `bg-white/40`, `gap-xs`
- Use `renderPhoto` to replace default image layers with art-directed `<picture>` element
- Use `renderSlideBottom` to inject road name, location, governing body, and photo date over the gradient

**Key rules:**
- Never re-implement scroll/snap/arrows/dots in a section file — always use this component
- `onActivePhotoChange` is called synchronously (not via useEffect) — no flash
- Initialise parent's `activePhoto` state from `photos.find(heic filter)` to avoid null flash on mount
- Card variant returns a React fragment — both children (photo div + dots div) become direct grid children. This is intentional for the subgrid layout.

**Usage — card:**
```tsx
const [activePhoto, setActivePhoto] = useState<PhotoData | null>(
  () => photos.find(p => !p.url.toLowerCase().endsWith('.heic')) ?? null
);

<PhotoCarousel
  photos={photos}
  height="h-64"
  maxPhotos={5}
  onActivePhotoChange={setActivePhoto}
/>
```

**Usage — hero:**
```tsx
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

---

### StatusBadge — LOCKED ✅

**File:** `src/components/shared/StatusBadge.tsx`
**Purpose:** Health/accountability/photo status pill. Used on photo overlays and face cards.

**Props:** `status: string | null`, `variant?: 'default' | 'solid'`
- Default: semi-transparent background (for overlays on photos)
- Solid: opaque background (for hero overlay where contrast is needed)

---

### ConditionCard Subgrid Pattern — LOCKED ✅

Used in Section 3. Apply this pattern to any future 3-column card grid where rows must align horizontally.

**Parent grid container:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-md items-start"
     style={{ gridTemplateRows: 'auto' }}>
```

**Card wrapper (8 rows: 2 photo rows + 6 body rows):**
```tsx
<div className="bg-card rounded-md shadow-card hover:shadow-card-hover transition-shadow overflow-hidden grid"
     style={{ gridRow: 'span 8', gridTemplateRows: 'subgrid' }}>
  <PhotoCarousel ... />  {/* ROWS 1–2: fragment = photo div + dots div */}
  {/* card body below */}
</div>
```

**Card body (spans rows 3–8):**
```tsx
<div className="p-sm grid gap-sm"
     style={{ gridTemplateRows: 'subgrid', gridRow: 'span 6' }}>
  {/* ROW 3: heading — h3, mona, text-body-bold */}
  {/* ROW 4: budget — label (ROAD SURFACE MONEY SPENT) + formatLakh amount */}
  {/* ROW 5: count — countLabel ?? "{heading} found" + large number in text-failure */}
  {/* ROW 6: timeline — Certified / Inspected (same day?) / Damage found X months later */}
  {/* ROW 7: approved by — officials with inline abbreviation: "Name (JE)" sorted by salary */}
  {/* ROW 8: built by — contractor name */}
</div>
```

**Rules:**
- Every row div must always render — even if empty (`<div />`) — or the subgrid collapses that row and cards misalign.
- PhotoCarousel card variant returns a React fragment (2 direct children = rows 1 and 2).
- `countLabel` on `ConditionCardData` overrides the default `"{heading} found"` label. Use for drain card ("Sections damaged").
- Approved by officials sorted by `monthlySalary` ascending so JE → AE → EE order is guaranteed.
- Budget amounts use `formatLakh` (≥1 lakh → `₹X.XX Lakh`, below → full format).

**Section 3 summary strip (above cards):**
```
BUILT · ALLOCATED · CONTRACTED · NET PAID · SAFETY RATING
```
5-column grid (`md:grid-cols-5`). Amounts formatted with `formatLakh`. DOCUMENTED column was intentionally removed — defect counts are in the cards below.

---

### FaceCard — LOCKED ✅

**File:** `src/components/section5/FaceCard.tsx`
**Purpose:** One card per official or contractor in Section 5. Shows identity, role, accountability status, what they were paid to do, what happened, and their public salary.

**Props:**

| Prop | Type | Notes |
|---|---|---|
| `fullName` | `string` | Always displayed in full — never truncated |
| `designation` | `string \| null` | Full designation string from DB |
| `jobDescription` | `string \| null` | Plain-language description of their role |
| `actionLabel` | `string` | What they actually did — from `getActionLabel()` |
| `isFailureChain` | `boolean` | If true, "What happened" renders in `text-failure` with appended sentence |
| `payScale` | `string \| null` | Formatted salary range string, e.g. `"₹55,000–₹60,000"` |
| `salaryPerDay` | `string \| null` | Formatted per-day minimum from `formatSalaryPerDay()` |
| `salarySource` | `string \| null` | Attribution string, e.g. `"Source: 7th Pay Commission"` |
| `accountabilityStatus` | `string \| null` | One of: `waiting_for_audit`, `response_pending`, `responded`, `charged` |
| `photoUrl` | `string \| null` | Optional official photo URL |

**Card structure — top to bottom:**

```
┌─────────────────────────────────────┐
│  Avatar (w-16 h-16 rounded-full)    │  [Accountability badge — right-aligned]
│  ← photo if photoUrl, else text     │  ← text-label roboto uppercase
│                                     │
│  Full Name                          │  ← text-title mona text-text-primary
│  Designation (ABBREV)               │  ← text-meta roboto text-text-muted
│                                     │
│  ─────────────────────────────────  │  ← border-t-[0.5px] border-border
│                                     │
│  SUPPOSED TO DO          [label]    │
│  {jobDescription}        [body]     │
│                                     │
│  WHAT HAPPENED           [label]    │
│  {actionLabel}.          [title]    │  ← text-title mona text-failure if isFailureChain
│  This road failed in months.        │  ← appended only when isFailureChain; text-body-bold mona if not failure
│                                     │
│  ─────────────────────────────────  │  ← border-t-[0.5px] border-border
│                                     │
│  PUBLIC SALARY SCALE     [label]    │
│  {payScale} per month    [body-bold]│
│  {salaryPerDay} minimum  [meta]     │
│  {salarySource}          [meta]     │
└─────────────────────────────────────┘
```

**Avatar text fallback logic:**
```ts
const abbrev = designation ? abbreviateDesignation(designation) : null;
const avatarText = (abbrev !== null && abbrev !== designation)
  ? abbrev          // e.g. "JE", "AE", "EE", "MC"
  : getInitials(fullName);  // e.g. "PS"
```
If `photoUrl` is present, renders `<img>` instead of text.

**Designation display:** Full designation text always shown. If `abbrev` differs from full designation, append `(ABBREV)` in parentheses: `"Junior Engineer (JE)"`.

**Accountability badge colors:**

| Status | Background | Text |
|---|---|---|
| `waiting_for_audit` | `bg-warning-bg` | `text-warning` |
| `response_pending` | `bg-warning-bg` | `text-warning` |
| `responded` | `bg-evidence-bg` | `text-evidence` |
| `charged` | `bg-failure-bg` | `text-failure` |
| null / unknown | `bg-surface` | `text-text-muted` |

Badge label text comes from `getAccountabilityLabel(accountabilityStatus)` — plain language, never raw status codes.

**Pay scale rules:**
- `payScale` not null → `"{payScale} per month"` in `text-body-bold mona`
- `payScale` null → `"Not applicable"` in `text-body-bold mona`
- `salaryPerDay` and `salarySource` render only when non-null

**Card shell:** `bg-card rounded-md shadow-card hover:shadow-card-hover transition-shadow p-sm flex flex-col gap-sm`

---

## DOCUMENT STATUS

| Token Category | Status | Version |
|---|---|---|
| Design DNA | LOCKED | v1.0 |
| Visual Direction | LOCKED | v1.0 |
| Typography — Dual Font System | LOCKED | v1.1 |
| Spacing | LOCKED | v1.0 |
| Border Radius | LOCKED | v1.0 |
| Glassmorphism Rule | LOCKED | v1.0 |
| Road Record Card Component | LOCKED | v1.1 |
| Color | OPEN | v1.2 pending |
| Shadow System | LOCKED | v1.1 |
| Border Style | LOCKED | v1.1 |
| Button System | OPEN | v1.2 pending |
| Tech Stack | LOCKED | v1.1 |
| Icon Library — Lucide | LOCKED | v1.1 |
| Motion | OPEN | v1.3 pending |
| Section 1 Hero | LOCKED | v1.3 |
| Section 2 (Map) | NOT BUILT — requires multiple roads | — |
| Section 3 (Condition) | LOCKED | v1.2 |
| Section 4 (Betrayal) | LOCKED | v1.2 |
| Section 5 (Faces) | LOCKED | v1.3 |
| Section 6 (Empowerment) | LOCKED | v1.1 |
| PhotoCarousel component | LOCKED | v1.3 |
| StatusBadge component | LOCKED | v1.2 |
| ConditionCard subgrid pattern | LOCKED | v1.2 |

---

*MyStreet Design System Foundations v1.1*
*Every decision in this document has a reason. The reason is always: Sunita must feel seen.*
*Next: v1.2 will lock color tokens, shadow system, border styles, and button system.*
