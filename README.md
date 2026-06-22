# MSB Smart Revision

The official AI-powered revision platform for **MSB Private School, Dubai** — built
on the Cambridge (CAIE) curriculum for **IGCSE (Year 11)**, **AS Level (Year 12)**
and **A Level (Year 13)**.

It combines the best of two earlier revision apps into one MSB-branded product:
a content-rich Cambridge revision engine plus a full Student / Teacher / Parent
role system.

## What it does

- **Students** — pick your year group and subjects, get a personalised revision
  roadmap, AI-generated notes, instant AI-marked questions and full mock papers,
  all aligned to the Cambridge syllabus.
- **Teachers** — class analytics by year group, section and subject, and set
  AI-assisted targets for students (`ai-student-target` Edge Function).
- **Parents** — link to your child by Student ID and follow their study activity,
  mock scores, streaks and roadmap progress in real time.

## Stack

- **Frontend:** Vite + React + TypeScript + Tailwind + shadcn/ui
- **Backend:** Supabase (Postgres, Auth, Edge Functions)
- **AI:** Supabase Edge Functions calling an LLM provider (set via function secrets)

## Curriculum scope

Cambridge only — the four core sciences/maths are fully AI-supported:
Mathematics (9709 / 0580), Biology (9700 / 0610), Chemistry (9701 / 0620),
Physics (9702 / 0625). Onboarding maps the chosen year group to the right board:
Year 11 → Cambridge IGCSE, Year 12 → Cambridge AS, Year 13 → Cambridge A Level.

## Setup

1. **Install:** `npm install`
2. **Backend:** create a Supabase project and follow
   [`SUPABASE_LOCAL_SETUP.md`](./SUPABASE_LOCAL_SETUP.md) to push migrations,
   deploy functions, and set AI keys.
3. **Env:** copy `.env.example` → `.env` and fill in your Supabase values.
4. **Run:** `npm run dev` → http://localhost:3000

> Until a Supabase project is connected in `.env`, the static pages (landing,
> auth UI, onboarding UI) render but sign-in and AI features won't work.

## Branding

The MSB crest lives at `public/msb-logo.svg` (a faithful vector recreation).
To use the exact photo logo, drop a `public/msb-logo.png` in — the header logo
component (`src/components/ApexLogo.tsx`) prefers the PNG and falls back to the SVG.
