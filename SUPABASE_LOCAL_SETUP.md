# Supabase Setup — MSB Smart Revision

This app needs a Supabase backend (auth, Postgres, and the AI Edge Functions).
It is **not yet connected** — create a fresh MSB Supabase project, then wire it up.

## 1) Prerequisites

- A Supabase account → https://supabase.com
- Supabase CLI: `npm i -g supabase`
- Docker Desktop (only needed for running the stack locally)

## 2) Create the MSB project & set the frontend env

1. In the Supabase dashboard, create a new project (e.g. **MSB Smart Revision**).
2. Project → Settings → API. Copy the values into `.env` (use `.env.example` as a template):
   - `VITE_SUPABASE_URL` = Project URL
   - `VITE_SUPABASE_PUBLISHABLE_KEY` = `anon` public key
   - `VITE_SUPABASE_PROJECT_ID` = the project ref

## 3) Push the database schema

All 54 migrations live in `supabase/migrations`. Link the CLI and push them:

```bash
supabase login
supabase link --project-ref <your-msb-project-ref>
supabase db push
```

This creates the profiles/role tables, `student_roster`, `sia_parent_child`
links, `student_targets`, study/progress tables, etc.

## 4) Deploy the Edge Functions

The AI features (notes, questions, mock papers, tutor, the teacher
`ai-student-target`, onboarding emails, etc.) are in `supabase/functions`:

```bash
supabase functions deploy --project-ref <your-msb-project-ref>
```

Then set the function secrets (AI provider + any email keys):

```bash
supabase secrets set GEMINI_API_KEY=...           # or your chosen AI provider key
# add any other keys the functions read (see each function's index.ts)
```

## 5) Create the demo accounts (optional)

The sign-in page offers Student / Teacher / Parent demo buttons. Create matching
accounts in Supabase → Authentication, using the emails in `src/pages/Auth.tsx`
(`demo.student@msbdubai.com`, etc.) and give each the correct `role` in `profiles`.

## 6) Run locally

```bash
npm install
npm run dev
```

---

### Running the whole stack locally (optional)

```bash
npm run supabase:start
npm run supabase:db:reset      # applies migrations to the local DB
npm run supabase:functions:serve
npm run supabase:stop
```
