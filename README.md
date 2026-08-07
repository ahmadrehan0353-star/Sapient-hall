# Sapient Hall School System — Website

Production website for Sapient Hall School System (Rawalpindi · Islamabad), built with
Next.js 15 (App Router), React 19, TypeScript (strict), Tailwind CSS, Framer Motion,
Firebase, and Cloudinary.

**All phases complete** — public site, forms/API, admin CMS, SEO, security hardening.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in Firebase + Cloudinary (optional to run)
npm run dev                  # http://localhost:3000
```

The public site runs **without** Firebase/Cloudinary configured — form submissions log
to the server console and images use branded placeholders. The admin panel requires
Firebase.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build (typecheck + lint included) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |

---

## Site map

Public: `/` `/about` `/academics` (+5 level pages) `/admissions` `/facilities`
`/student-life` `/news` (+articles) `/events` (+detail & registration) `/gallery`
`/careers` `/contact` `/faq` `/privacy` `/terms` + branded 404.

Admin: `/admin/login` → `/admin/dashboard` → per-collection managers.

APIs: `POST /api/contact` · `POST /api/inquiry` (admissions + event registrations) ·
`POST /api/newsletter` — all Zod-validated and rate-limited.

SEO: `sitemap.xml`, `robots.txt` (admin/api disallowed), JSON-LD School schema,
per-page metadata + OpenGraph.

---

## Firebase setup (required for admin panel + stored submissions)

1. **Create a project** at [console.firebase.google.com](https://console.firebase.google.com) → Add project.
2. **Add a Web App** (Project settings → Your apps → Web). Copy the config values into
   `.env.local`:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
   NEXT_PUBLIC_FIREBASE_APP_ID=...
   ```
3. **Enable Firestore** (Build → Firestore Database → Create, production mode).
4. **Deploy security rules** — copy `firestore.rules` from the repo root into
   Firestore → Rules → Publish. These rules make public content world-readable,
   let anonymous users *create* form submissions only, and restrict all management
   to authenticated staff.
5. **Enable Auth** (Build → Authentication → Sign-in method → Email/Password).
6. **Create your first admin**:
   - Authentication → Users → Add user (email + password). Copy the UID.
   - Firestore → start collection `admin_users` → document ID = that UID →
     field `role` = `"admin"` (string).
   - Editors get `role` = `"editor"` (can manage content, not inquiries/settings/staff).
7. Sign in at `/admin/login`.

### Admin roles

| Capability | admin | editor |
| --- | --- | --- |
| News, events, gallery, testimonials, FAQs, announcements | ✏️ | ✏️ |
| Staff profiles, site settings | ✏️ | 👁 |
| Inquiries, contact messages | ✏️ | — |

## Cloudinary setup (photography)

1. Create a free account at cloudinary.com → copy your **cloud name** into
   `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`.
2. Upload photos into folders (`campus/`, `events/`, …).
3. Replace `<ImagePlaceholder …>` usages with `next-cloudinary`'s `<CldImage>` or
   `next/image` + the `cloudinaryUrl()` helper in `src/lib/cloudinary.ts`.
   `next.config.ts` already whitelists `res.cloudinary.com`.

## Deployment (Vercel)

1. Push the repo to GitHub.
2. [vercel.com](https://vercel.com) → New Project → import the repo (framework
   auto-detected).
3. Add every `NEXT_PUBLIC_*` variable from `.env.local` under Project → Settings →
   Environment Variables.
4. Deploy. Point `sapienthall.edu.pk` at Vercel via Settings → Domains
   (CNAME `cname.vercel-dns.com` or the provided A records).
5. After the domain is live, verify `https://sapienthall.edu.pk/sitemap.xml` and submit
   it in Google Search Console.

## Security notes

- Dependencies pinned with **0 `npm audit` vulnerabilities** (Next 15.5.23; `postcss`
  and `sharp` patched via `overrides`).
- API routes: Zod validation, per-IP rate limiting, no secrets in responses.
- Security headers (CSP-adjacent set: `X-Frame-Options`, `X-Content-Type-Options`,
  `Referrer-Policy`, `Permissions-Policy`) in `next.config.ts`.
- Firestore rules enforce least privilege server-side — the UI role gating is
  convenience, the rules are the boundary.
- `/admin` and `/api` are `noindex` + disallowed in robots.txt.

## How CMS content reaches the live site

Public pages read **news, events, testimonials, FAQs, and announcements** from
Firestore at request time with 5-minute ISR caching (`src/lib/content.ts`):

- Anything staff publish in the admin panel appears on the site within ~5 minutes,
  no redeploy needed.
- If Firebase isn't configured, a collection is empty, or a fetch fails, pages fall
  back to the seed content in `src/lib/data/*` — the site never breaks.
- New news/event slugs created in the CMS get their pages generated on first visit
  (`dynamicParams`), then cached.
- An **announcement bar** appears above the navbar whenever an announcement is
  marked `active: yes` in the admin panel.

## Real content from the existing site

Beyond images, the authentic content from sapienthall.edu.pk is now built in:

- **School Life** (`/student-life`): the four houses (Griffin, Phoenix, Equinox,
  Maverick), the four clubs (Art, Drama, Adventure, Brainiac), and 16 real
  activities with their photos — Sports Week, Career Day, elections, hiking
  trips, swimming sessions, fire drills, special days, and more.
- **Traditions**: Bonfire & BBQ Night, International Food Festival, Annual
  Funfair, Eid Milan, Graduation Ceremony, and Farewell — real descriptions
  and photos.
- **Academics**: correct affiliations — Federal Board (Matriculation) plus
  CAIES / Cambridge University (O & A Levels) — reflected on the hub,
  Secondary level, mega-menu, programs, and FAQs.
- **About**: the school's own philosophy text.
- **Testimonials**: the authentic parent and alumni quotes (lightly copy-edited).

## Images & logo

The real school logo and photography are wired in from the school's own media
library (`www.sapienthall.edu.pk/wp-content/uploads`), centralised in
`src/lib/site-images.ts`. This covers the navbar/footer logo, hero, campus
photos, facilities, event traditions (bonfire, food festival, farewell), news
covers, and the whole gallery.

- To migrate to Cloudinary later: upload the same files and change only the
  URLs in `site-images.ts` — nothing else moves.
- `ImagePlaceholder` accepts an optional `src`; anywhere without a real photo
  yet still shows the branded gradient stand-in.
- **Removing the old-site dependency** (do this before decommissioning the
  WordPress host): run `npm run localize-images` once on your machine. It
  downloads all ~53 images into `public/images/` and rewrites
  `site-images.ts` to local paths. Commit `public/images` +
  `src/lib/site-images.ts`, push, and the images ship inside your own
  deployment forever. Safe to re-run; `--dry-run` previews the plan.

## Content still using placeholders

Swap these when real material is available:

- **Stats** (`src/lib/site-config.ts`): years/students/faculty counts.
- **Achievements** section + **Careers** openings: sample entries.
- **Leadership** names/photos on `/about` (no photos published on the old site).
- **Principal photo** on the homepage message section.
- **Social links**: bare platform URLs → real profiles.

## Project structure

```
src/
  app/            # routes (public, admin, api)
  components/
    ui/           # design-system primitives
    layout/       # navbar, footer
    sections/     # homepage/marketing sections
    shared/       # cross-page interactive components
    forms/        # RHF + Zod forms
    admin/        # auth provider, shell, config-driven CRUD
    motion/       # scroll-reveal, counters
  lib/
    data/         # seed content (news, events, academics, …)
    firebase.ts   # lazy client SDK
    firebase-admin.ts  # REST writes for API routes
    site-config.ts     # single source of truth for school facts
firestore.rules   # deploy to Firebase
```
