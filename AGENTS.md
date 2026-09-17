<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AI Agent Rules — Do Not Change

Read this entire file before editing anything in this project. These rules protect the site design, CMS content flow, and dashboard styling.

---

## 1. Protected CSS (never delete, rename, or rewrite)

These files define the visual standard. Do **not** remove imports, merge them into other files, or replace with Tailwind-only layouts.

| File | Purpose |
|------|---------|
| `app/globals.css` | **Homepage & marketing site standard** — nav, topbar, hero, blog section, stats, footer, code blocks. Required by `app/(app)/page.tsx`, blog pages, and `not-found.tsx`. |
| `app/(app)/landing/landing.css` | Landing page (`/landing`) styles. |
| `app/(dashboard)/api/key/api-key.css` | **Dashboard standard** — banner, avatar overlap, toolbar, cards. Imported in `(dashboard)/layout.tsx` for all dashboard pages. |
| `app/login/login.css` | Login page layout and auth card styling. |

### CSS rules for agents

- Do **not** delete or empty these CSS files.
- Do **not** remove `import "../globals.css"` from homepage/blog pages.
- Do **not** remove the dashboard CSS import from `app/(dashboard)/layout.tsx`.
- Do **not** move banner/avatar/toolbar styles out of `api-key.css` into `globals.css` or inline Tailwind.
- Tailwind classes on dashboard pages **supplement** these CSS files; they do not replace them.
- If banner background looks missing, check that `public/cityscape.png` exists — do not delete that asset.

---

## 2. Protected public assets (never delete)

These files are referenced by CSS and pages. Removing them breaks the UI silently.

| Asset | Used by |
|-------|---------|
| `public/cityscape.png` | Dashboard banner background (`api-key.css`) |
| `public/crypterchat.svg` | Site nav logo |
| `public/CRYPTERCHAT_logo.svg` | Docs page hero |
| `public/eh_logo_web44.png` | Login page logo |
| `public/r95qswr95qswr95q.png` | Login page background (`login.css`) |
| `public/Chnage_the_bg_to_blue_one_no_red_op_need_transpera_delpmaspu.png` | Docs page hero background |

Do **not** delete files from `public/` unless the user explicitly asks and you update every reference.

---

## 3. Payload CMS — content & API (do not break)

Blog, homepage text, navigation, and footer content come from **Payload CMS**, not hardcoded in React components.

### Protected files

| Path | Purpose |
|------|---------|
| `payload.config.ts` | Main CMS config, Postgres connection, seed data |
| `collections/BlogPosts.ts` | Blog posts collection |
| `collections/CaseStudies.ts` | Case study cards |
| `collections/Features.ts` | Feature blocks |
| `collections/Media.ts` | Image uploads |
| `globals/Navigation.ts` | Nav links |
| `globals/Footer.ts` | Footer columns & links |
| `globals/Homepage.ts` | Hero slides, stats, CTA, code snippet |
| `globals/AnnouncementBar.ts` | Top announcement bar |
| `app/(payload)/layout.tsx` | Payload admin UI |
| `app/(payload)/api/[...slug]/route.ts` | Payload REST API |

### CMS rules for agents

- Do **not** remove Payload or replace blog/homepage copy with hardcoded text in TSX files.
- Do **not** change collection slugs (`blog-posts`, `case-studies`, etc.) without updating all `payload.find()` calls.
- Do **not** remove `getPayload()` usage from `app/(app)/page.tsx` or blog pages.
- Site text edits belong in **Payload Admin** (`/admin`), not in component source code.
- Do **not** change `DATABASE_URL` / Postgres adapter config unless the user asks.
- Type helpers live in `lib/cms-types.ts` — update types if schema changes, do not bypass with `any`.

---

## 4. Protected app areas (structure)

| Area | Route | Notes |
|------|-------|-------|
| Marketing homepage | `/` | `app/(app)/page.tsx` + `globals.css` + Payload data |
| Landing page | `/landing` | `app/(app)/landing/` + `landing.css` |
| Blog | `/blog`, `/blog/[slug]` | Payload `blog-posts` collection |
| Dashboard | `/api/key`, `/server`, `/chatscan`, `/docs` | Auth required, shared dashboard CSS |
| Login | `/login` | Firebase auth + `login.css` |
| CMS Admin | `/admin` | Payload editor for all site text |

Do **not** redirect `/` away from the marketing homepage unless the user explicitly requests it.

---

## 5. Auth & API keys (do not remove)

| File | Purpose |
|------|---------|
| `app/providers/AuthProvider.tsx` | Firebase session |
| `app/components/AuthGuard.tsx` | Protects dashboard routes |
| `lib/firebase.ts` | Firebase config |
| `lib/demo-user.ts` | Demo mode for recordings (`?demo=1`) |
| `app/actions/api-key-actions.ts` | API key CRUD |
| `app/actions/search-actions.ts` | Sidebar search |

---

## 6. Safe to change (when user asks)

- New dashboard features behind existing layout
- Bug fixes that preserve CSS imports and Payload data flow
- ESLint/TypeScript fixes that do not delete protected files
- `scripts/record-demo.mjs` for demo videos

---

## 7. Before finishing any task — checklist

1. Are all CSS imports still present (`globals.css`, dashboard CSS, `login.css`)?
2. Are `public/` assets still referenced correctly?
3. Does homepage/blog still load content from Payload, not hardcoded strings?
4. Does `/api/key` still import dashboard layout CSS via `(dashboard)/layout.tsx`?
5. Did you avoid deleting or gutting any file listed in this document?

If the user reports "CSS is gone", check: missing CSS import, deleted `public/` image, or Tailwind classes overriding protected class names (`.banner`, `.avatar`, `.toolbar`).
