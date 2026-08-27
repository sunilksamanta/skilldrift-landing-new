# Session handoff — SkillDrift landing site

Written 27 Aug 2026. Read this plus `docs/skilldrift-ssr-and-engineering-spec.md`
(SEO/SSR spec) and `docs/guest-flow-api.md` (the guest resume API) before changing anything.

---

## What this project is

A rebuild of the SkillDrift marketing site in **Next.js 16.3.3** (App Router, React 19,
TypeScript, Turbopack). Plain CSS + inline styles — **no Tailwind**. Ported from a Claude
Design canvas; the source design lives in the sibling folder
`../SkillDrift landing page design -new/` and a copy of the `.dc.html` is gitignored at `.design/`.

Repo: `git@github.com:sunilksamanta/skilldrift-landing-new.git`, branch `main`.

### Run it

```bash
npm run dev      # a dev server is usually already running on :3000
npm run build
npm run lint
```

Never start a dev server with Bash — use the Browser pane's `preview_start`.

### Environment

`.env.local` (gitignored) and `.env.example` (committed):

```
NEXT_PUBLIC_API_BASE_URL=https://57bv5zjn-5001.inc1.devtunnels.ms
```

Guest endpoints are `{BASE}/api/guest/*`. Swap the host for staging/production.

---

## Architecture — the two things worth knowing

**1. Pages are data, not code.** `src/content/pages.json` holds all 14 routes: Appendix A2
metadata *and* the page body as typed blocks. `src/app/[slug]/page.tsx` renders them via
`generateStaticParams()`, with `dynamicParams = false` so unknown slugs 404. Block types are in
`src/content/types.ts`; the renderer is `src/components/page/BlockRenderer.tsx`
(`cards`, `steps`, `split`, `prices`, `stats`, `prose`, `contact`, `featureRows`, `plans`).

**Adding or editing a page is a JSON edit.** Sitemap, canonicals, breadcrumbs, OG card and
nav all read the same file, so they cannot drift apart.

The homepage (`src/app/page.tsx`) is the exception — hand-built from the design, marked
`"custom": true` in the JSON so it contributes metadata only.

**2. Everything reads from one source.** Prices live in `PlanCards.tsx` and feed both the
landing pricing section and `/pricing`. FAQ copy lives in `FaqSection.tsx` and feeds the
FAQPage JSON-LD. Feature-page copy feeds the `/features` showcase rows.

---

## Done and verified

- **14 routes**, all SSR/SSG, 200 with their H1 in the served HTML; unknown paths return a real 404.
- **SEO**: per-route title/description/canonical, Organization + WebPage + BreadcrumbList
  (3-level on feature pages) + FAQPage + SoftwareApplication (INR; `NEXT_PUBLIC_REGION=row`
  switches to USD), `sitemap.ts`, `robots.ts`.
- **OG images generated at build time** via `next/og` (`src/lib/og.tsx`), one per route,
  using bundled Switzer TTFs in `src/assets/fonts/`.
- **Favicon** is the SkillDrift mark: `favicon.ico`, `icon.png`, and `apple-icon.tsx`
  (rendered on the dark brand field, since iOS fills transparency with black).
- **Light theme is the default**; dark is opt-in via the toggle and persists. The site does
  **not** follow the OS colour scheme. `:root` holds light tokens, `html[data-sd-theme="dark"]`
  overrides.
- **No hash links.** `SectionLink` / `SmartLink` scroll smoothly without putting `#` in the URL;
  cross-page section links stash a target and `ScrollOnLoad` finishes the scroll.
- **CTAs → `app.skilldrift.ai/sign-in`** with `utm_source`/`utm_medium`/`utm_campaign` (page) /
  `utm_content` (button). `UtmForwarder` forwards inbound acquisition params (Google, gclid, …),
  which win per key over our defaults. The homepage hero drop-zone is the deliberate exception.
- No horizontal overflow at 375 / 768 / 1024 / 1440.

---

## IN FLIGHT — guest resume upload (uncommitted)

This is where the last session stopped. **Everything below is working and verified against the
live dev API, but is not yet committed.**

### Files added

| File | Purpose |
|---|---|
| `src/lib/guest-api.ts` | Typed client. Unwraps the `data` envelope, `GuestApiError` with `isPending`/`isExpired`/`isAnalysisFailed`/`isRateLimited`, client-side file validation |
| `src/lib/guest-session.ts` | localStorage for `guestToken` + `sessionId` + filename |
| `src/hooks/useGuestAnalysis.ts` | The state machine: upload → poll status (3s) → read results → poll jobs (5s) |
| `src/components/GuestResultSection.tsx` | The result panel, driven by real API data |
| `src/components/HeroAndResult.tsx` (modified) | Real file input + drag/drop replacing the old mock |

### Behaviour implemented per the API doc

- Upload returns immediately; **no spinner held on the request**; `Content-Type` deliberately unset.
- Both `guestToken` and `sessionId` persisted the instant they come back.
- **Renders early at `analysis_ready`** rather than waiting for `completed` — verified this
  arrives in ~3s while `completed` takes ~50s.
- Both pollers stop on their terminal states.
- **409 means "keep waiting", 410 means "gone"** — these are handled separately, and the guest
  token is cleared *only* on 410.
- Jobs: `analysis` may be null (guarded); `failed` or empty hides the section silently.
- `_id` is always null and is never used as a key.

### Verified end to end against the live API

Dropped a real PDF on the drop-zone in the browser and watched: session persisted → score
**62** for "Backend Engineer" → three real skill-gap categories with percentages → three real
matched jobs (82/70/40) plus a blurred teaser and "1 more found" → reload restores the whole
result → the sign-in CTA carries `?guestToken=…`.

### NOT done / not verified

- **The claim call.** `POST /guest/claim` runs *after* auth, inside the app — not on this site.
  Because the app is a different origin, localStorage cannot carry the session, so the token is
  appended to the sign-in URL as `?guestToken=…`. **Confirm with Rakesh that the app reads that
  param and calls claim**, or this handoff silently drops every guest analysis.
- The 429 rate-limit path (5 uploads/IP/hour) — code handles it, never exercised.
- DOC/DOCX uploads — only PDF was tested.

### Known backend issues to raise with Rakesh

1. **Sessions die early on the dev tunnel.** Observed a `502` at ~t+130s followed by `410` at
   t+140s on a session created two minutes earlier. That is a server/tunnel restart losing Redis
   state, not a client bug — but it destroys a visitor's results mid-flow.
2. **`GET /api/guest/status/:id` intermittently returns a non-JSON schema description**
   (`{ error: bool, message: string[58], … }`) with a 200 instead of the payload. The client
   survives it by retrying, but it should not happen.

---

## Outstanding decisions and tasks

Ordered roughly by how much they matter.

1. **Testimonial claims.** `ProofSection.tsx` now carries named people (Aditya Kulkarni · Pune,
   Karthik Iyer · Bengaluru, Layla Haddad · Dubai) with hard numbers — "41% to 79% in nine
   weeks". Avatars were changed to match the names. If these aren't real, consenting users they
   need replacing or labelling as illustrative before launch.
2. **Footer Legal pages don't exist** — Privacy Policy, Terms of Use, Data Protection currently
   scroll to top. The drop-zone consent copy already promises a privacy policy, and the guest
   flow now genuinely processes CVs pre-account, so DPDP/GDPR notice matters more than before.
3. **"Build my resume"** in the hero needs the real resume-builder URL (currently the sign-in CTA).
4. **`/career-roadmap` isn't linked from the homepage** — reachable from `/features` and every
   feature page only. Nothing on the homepage has an existing link to repoint without adding copy.
5. **utm_content overwrite.** When an inbound URL carries its own `utm_content`, it replaces our
   button id. That is the literal "forward if present" rule that was asked for; offer `sd_cta` as
   a separate param if button-level attribution matters on paid campaigns.
6. **Hero art missing** for `/how-it-works` (the loop diagram) and `/pricing` (plans/credit
   table). All seven feature pages and `/jobs` have theirs. 1800×1290 PNGs with the purple field
   baked in, dropped in `public/assets/`, then wired in `pages.json` under `hero.image`.

---

## House rules learned this session

- **Do not change landing-page copy** unless asked. Exception already granted: the FAQ was
  replaced with the spec's Appendix A3 strings so the JSON-LD matches the visible text.
- Prefer repointing existing links over adding new ones; report what's unreachable instead.
- The Browser pane is flaky: `behavior: "smooth"` scrolling is a **no-op** there, `requestAnimationFrame`
  doesn't fire while it's hidden, and screenshots go black after a JS-driven scroll. Verify layout
  via DOM measurement, and use a tall emulated viewport plus `computer.zoom` for full-page shots.
- Verify claims before making them — this session produced two wrong diagnoses that were only
  caught by instrumenting the page.

---

## Suggested first move

Run `npm run build && npm run lint`, then commit the guest-flow work — it is complete and
verified. After that, chase the `?guestToken` handoff question with Rakesh, since the whole
guest flow is pointless if the app doesn't claim the session.
