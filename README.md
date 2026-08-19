# Vigormax Digital Oversight System — Demo

A click-through recreation of Vigormax Security Services' internal operations platform (the Digital Oversight System), rebuilt with a redesigned "command-surface" visual direction.

**This is a static, front-end-only showcase.** There is no backend, no database, and no real company or personnel data — every name, phone number, task and document in here is fictional, generated for demonstration purposes only. The real product connects to Supabase and lives in a private repository.

## Run locally

```bash
npm install
npm run dev
```

## Flow

1. **Sign in** — the auth card is pre-filled; submit to enter the app.
2. **Dashboard** — six metric tiles and the recent activity feed.
3. **Task board** — drag cards between To do / In progress / Done; filter by assignee and branch; click a card for the detail modal.
4. **Employees** — search by name or position, filter by branch.
5. **Onboarding** — a document-first table. Hover a status badge to see clearance detail; open "View / update documents" to upload, approve, reject or withdraw.
6. **Documents** — filter the repository by category chip.
7. **Audit log** — select an item on the left to load its lines on the right; tick lines to move the completion bar.
8. **VigorAI** — canned replies stand in for the Claude call.

## Stack

React 19 + Vite, no external UI or CSS framework — styling is all inline styles driven by CSS custom-property design tokens in `src/styles/tokens/`.
