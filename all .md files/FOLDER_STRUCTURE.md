# Project Folder Structure

This tree represents the current folder and file structure of the MyStreet project (excluding `node_modules`, `.git`, `.next`, and `.vercel`).

```text
.
├── .claude
│   └── settings.local.json
├── .env.local
├── .gitignore
├── .vscode
│   └── settings.json
├── all .md files
│   ├── claude_context.md
│   ├── DATA_MODEL.md
│   ├── DECISIONS.md
│   ├── design_system.md
│   ├── FOLDER_STRUCTURE.md
│   ├── FRONTEND.md
│   ├── MAPPING.md                        ← SUPERSEDED — use ward28/ instead
│   ├── PROJECT_STATUS.md
│   ├── SEED_GUIDE.md
│   └── ward28/                           ← RTI source of truth for Ward 28
│       ├── ward28skill.md                ← Read this first — routes to correct file
│       ├── Ward28 01 road contract.md
│       ├── Ward28 02 persons.md
│       ├── Ward28 03 events.md
│       ├── Ward28 04 lab rti.md
│       └── Ward28 05 conflicts.md
├── drizzle
│   └── migrations
│       ├── 002_mvp_fields.sql
│       ├── 003_nullable_person_fields.sql ← persons.designation/department nullable
│       └── 004_data_confidence.sql        ← event_participants.data_confidence enum
├── drizzle.config.ts
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── src
│   ├── app
│   │   ├── api
│   │   │   └── road
│   │   │       └── [id]
│   │   │           └── route.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── road
│   │       └── [id]
│   │           └── page.tsx
│   ├── components
│   │   ├── section1
│   │   │   └── HeroSection.tsx
│   │   ├── section3
│   │   │   └── ConditionSection.tsx
│   │   ├── section4
│   │   │   └── BetrayalSection.tsx
│   │   ├── section5
│   │   │   ├── FacesSection.tsx
│   │   │   └── FaceCard.tsx
│   │   ├── section6
│   │   │   └── EmpowermentSection.tsx
│   │   └── shared
│   │   │   ├── PhotoCarousel.tsx
│   │   │   └── StatusBadge.tsx
│   ├── lib
│   │   └── utils
│   │       └── road-display.ts
│   ├── server
│   │   ├── db
│   │   │   ├── index.ts
│   │   │   ├── schema
│   │   │   │   ├── confirmation.ts
│   │   │   │   ├── drain.ts
│   │   │   │   ├── event-participants.ts
│   │   │   │   ├── event.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── person.ts
│   │   │   │   ├── photo.ts
│   │   │   │   ├── road.ts
│   │   │   │   └── segment.ts
│   │   │   ├── seed.ts
│   │   │   ├── upload-section1-photos.ts
│   │   │   └── upload-section3-photos.ts
│   │   └── queries
│   │       └── road.ts
│   └── types
│       └── road.ts
├── tailwind.config.ts
├── tsconfig.json
└── tsconfig.tsbuildinfo
```
