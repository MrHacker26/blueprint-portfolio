# Blueprint Portfolio: Master Spec

> Living engineering spec for Tarun Joshi’s personal site.
> Build **one phase at a time**. Do not skip ahead. Check boxes as work lands.

**North star:** A recruiter or founder spends the first 30 seconds thinking *this person builds products, not just websites*.

Visual language: **Blueprint Engineering**: Apple keynote × Figma file × technical drawing. Not a template. Not cyberpunk. Not a 3D playground.

---

## How we work

This file is the contract between you and the agent.

1. Say **`Execute Phase N`** (example: `Execute Phase 1`).
2. The agent reads this file, implements **only that phase**, then updates checkboxes here.
3. You review in the browser. We tweak if needed. Then we move on.
4. Never invent a fake job, metric, URL, or company name. Placeholders are explicit (`null`, `available: false`, generic “Government Systems / Startup” wording).

**Do not** install extra libraries, add extra pages, or “just quickly” start the next phase.

**Do** keep Server Components by default. `"use client"` only for interaction, motion, clipboard, observers, and the command palette.

**Do** keep all copy in content/config modules. Components render data. They do not own strings.

---

## Current repo (Phase 0: done)

Fresh `create-next-app` on **Next.js 16.3.1** (App Router), **React 19**, **Tailwind v4**, **TypeScript**, **Biome**, **Bun**. Geist Sans + Geist Mono already wired.

| Item | Status |
| --- | --- |
| `src/app/layout.tsx` | Phase 1: dark shell, `site.seo`, Geist |
| `src/app/page.tsx` | Phase 1: quiet canvas (`site.name` / `site.role`) |
| `src/app/globals.css` | Blueprint tokens + grid utilities |
| shadcn / Framer Motion / Lucide | Installed (button, separator). MDX not yet |
| Real content (bio, jobs, links) | Placeholders locked: see Content inventory |

Path alias: `@/*` → `./src/*`. Keep the `src/` layout. Do not move to a root `app/` folder.

---

## Stack (locked)

| Layer | Choice | Notes |
| --- | --- | --- |
| Framework | Next.js 16 App Router | Static generation wherever possible |
| UI | Tailwind CSS v4 + shadcn/ui | Add primitives only when a phase needs them |
| Motion | Framer Motion | 150–600ms, custom easing, respect `prefers-reduced-motion` |
| Icons | Lucide React | Stroke icons only. No logo clouds |
| Case studies | MDX | `src/content/projects/*.mdx` |
| Fonts | `next/font` Geist Sans + Geist Mono | Already in layout |
| Lint | Biome | Already configured |

**Do not add:** three.js, GSAP, Lottie, canvas-heavy libs, icon packs, CMS, auth, analytics SDKs, or a light-mode theme switcher in early phases.

---

## Folder architecture (target)

```
src/
  app/
    layout.tsx
    page.tsx                 # homepage: all sections
    globals.css
    robots.ts
    sitemap.ts
    loading.tsx
    not-found.tsx
    projects/
      [slug]/
        page.tsx
    lab/                     # Konami / hidden developer page (Phase 8)
      page.tsx
  components/
    layout/                  # nav, footer, providers, progress
    sections/                # hero, about, experience, …
    projects/                # cards, architecture diagrams
    ui/                      # shadcn + local primitives
    animations/              # blueprint grid, nodes, paths
  content/
    experience.ts            # stacked cards data
    skills.ts                # capability board data
    history.ts               # git-history section data
    projects/                # rumblex.mdx, refridz.mdx, government-dashboard.mdx, bvm.mdx
  hooks/
  lib/
    cn.ts
    site.ts                  # identity, socials, SEO, nav, url
    projects.ts              # MDX loader only: not a second source of copy
  types/
public/
  og.png                     # generated in SEO phase
  images/projects/           # placeholders until real shots exist
```

Homepage is one long page with section ids. Project case studies are separate routes.

---

## Content-first rule (locked)

Change GitHub, LinkedIn, email, or domain later → edit **one file**, not components.

| What | File | Owner |
| --- | --- | --- |
| Name, role, location, tagline, about, socials, SEO, canonical URL, nav, status pills | `src/lib/site.ts` | Site identity |
| Experience cards | `src/content/experience.ts` | Content |
| Skills board | `src/content/skills.ts` | Content |
| Git history entries | `src/content/history.ts` | Content |
| Project case studies (frontmatter + body) | `src/content/projects/*.mdx` | Content |
| `cn()`, `getProjects()` | `src/lib/*` | Loaders / utils |

**Hard rules:**

- Components import from `@/lib/site` and `@/content/*`. No hardcoded name, role, email, URLs, project titles, or section copy inside JSX.
- Social placeholders are `null`, not `"#"`. UI shows a muted / coming-soon state when a link is missing.
- Project **listing** metadata (slug, title, tagline, year, stack, status) lives in MDX frontmatter. `lib/projects.ts` only reads it. Do not duplicate that list in `site.ts`.
- `site.ts` does not import experience/skills. Sections import the content modules directly.

When real links/domain arrive, update `site.ts`. Do not restyle.

---

## Design system

Dark mode **first and only** for v1. Set `class="dark"` on `<html>`. No `prefers-color-scheme` light flash.

### Color tokens

Put these in `globals.css` as CSS variables and map them in `@theme inline`.

| Token | Hex | Use |
| --- | --- | --- |
| `--bg` | `#070B14` | Page background (deep navy / graphite) |
| `--bg-elevated` | `#0C1220` | Cards, nav glass fallback |
| `--bg-overlay` | `#10182A` | Expanded panels |
| `--grid` | `rgba(96, 165, 250, 0.07)` | Blueprint grid lines |
| `--line` | `rgba(148, 163, 184, 0.18)` | Hairline borders |
| `--text` | `#F1F5F9` | Primary copy |
| `--text-muted` | `#94A3B8` | Secondary copy |
| `--text-faint` | `#64748B` | Meta, labels |
| `--accent` | `#38BDF8` | Electric cyan-blue |
| `--accent-strong` | `#0EA5E9` | Hover / active |
| `--accent-dim` | `rgba(56, 189, 248, 0.12)` | Chip / glow fills |
| `--glow` | `rgba(14, 165, 233, 0.22)` | Soft radial glow |
| `--success` | `#34D399` | Live status |

Highlights: thin white at ~8–12% opacity on edges (glass). Never neon. Never saturated purple/pink gradients.

### Grid

Full-viewport CSS background:

- 24px × 24px (mobile) / 32px × 32px (desktop)
- 1px lines using `--grid`
- A larger 8-cell major line at ~1.6× opacity
- Soft radial glow behind the hero (one only, not a rainbow)
- Grid is texture, not decoration. If you notice it first, it is too strong.

### Typography

| Role | Font | Treatment |
| --- | --- | --- |
| Display / H1 | Geist Sans | Editorial, tight tracking, large (clamp 2.5rem → 4.5rem) |
| Section H2 | Geist Sans | Smaller than hero, still commanding |
| Body | Geist Sans | 16–18px, relaxed leading |
| Meta / labels / metrics / code | Geist Mono | 11–13px, uppercase tracking for labels |

Hierarchy rule: one idea per heading. Lots of whitespace. If a section feels dense, add padding, not more color.

### Motion

```
ease-out-premium: cubic-bezier(0.22, 1, 0.36, 1)
fast: 150ms
base: 250ms
slow: 400ms
glacial: 600ms
```

Allowed: fade, slide (4–12px), scale (0.98–1.02), parallax (tiny), connection-line dash offset.

Forbidden: bounce, flash, spin, elastic overshoot, autoplaying video, cursor-follow blobs.

If `prefers-reduced-motion: reduce`: no looping path animations, no parallax, instant section reveals (opacity only, 0ms or 150ms fade).

### Surfaces

- **Glass nav:** split floating frames, corner ticks, numbered links. `backdrop-blur` + 1px `--line` + `bg` at ~70%. Not a pill.
- **Frame CTA:** same language as the nav. Sharp corners, ticks, hairline. Not a filled rounded pill.
- **Engineering card:** hairline border, 1px inner highlight, corner ticks, `rounded-[2px]`. No drop-shadow blobs. Hover = 2–4px translateY + slightly brighter border.
- **Focus:** 2px accent ring, 2px offset. Never `outline-none` without a replacement.

---

## Site map

```
/                          Home
  #about
  #experience
  #projects
  #skills
  #playground
  #history
  #contact
/projects/rumblex
/projects/refridz
/projects/government-dashboard
/projects/bvm
/lab                       Hidden (not in nav, noindex)
```

Nav items (visible): About · Experience · Projects · Skills · Contact

Playground and Git History live on the homepage but stay out of the primary nav. Discoverable by scroll and via the command palette.

---

## Content inventory

Placeholders are **locked** for v1 build. Swap values in config/content files later: not in components.

### Identity (`src/lib/site.ts`)

| Field | Value |
| --- | --- |
| Name | Tarun Joshi |
| Role | Senior Full Stack Engineer |
| Tagline | Building TypeScript systems, RAG pipelines, and production platforms under real constraints. |
| Location | Dehradun, Uttarakhand, India |
| Email | `null` (placeholder) |
| GitHub | `null` (placeholder) |
| LinkedIn | `null` (placeholder) |
| Site URL | `null` (placeholder domain: no canonical until real URL exists) |
| Resume | None. Site, GitHub, and LinkedIn are the surface. |
| Short about | Placeholder 2–3 sentences in `site.about`. Honest, generic, no fake bio claims. Refine later in `site.ts` only. |

### Live status pills (hero)

Owned by `site.statusPills`:

- Shipping Products
- TypeScript
- Bun
- RAG

### Experience (stacked cards)

Source: `src/content/experience.ts`. One card. Generic wording only. **No real company names, no confidential metrics, no fake percentages.**

Each card: company, role, duration, 2–4 *qualitative* impact lines, tech chips, expandable engineering notes.

| # | Company | Role | Dates | Impact (qualitative) | Notes |
| --- | --- | --- | --- | --- | --- |
| 1 | Government Systems | Senior Full Stack Engineer | 2023–Present | Production-scale public-sector platforms; multi-system composition; RAG that fails closed | Constraints, architecture, scale. Zero confidential code, datasets, or internal tool names. |

### Projects

Source: `src/content/projects/*.mdx` (frontmatter + body). v1 listing:

| Slug | Name | One-liner | Case study must include |
| --- | --- | --- | --- |
| `rumblex` | RumbleX | Native iOS cloud gaming browser | Hero placeholder, architecture (iPhone → WKWebView → JS Bridge → Core Haptics), features, challenges, haptic bridge explanation, tradeoffs |
| `bvm` | BVM | Bun version manager | CLI architecture, checksum, TTY vs CI, npm `bunvm`. Links in frontmatter. |
| `refridz` | Refridz | Food expiry tracker | OCR pipeline, AI fallback, offline storage, reminder system, engineering decisions |
| `government-dashboard` | Government Dashboard | Public-sector systems at scale | Problem, constraints, architecture, integrations, scale. **No confidential code, datasets, or screenshots of real PII.** |

### Skills (capability board: not logos)

Source: `src/content/skills.ts`. Suggested bars (0–10). Adjust in that file only.

| Capability | Level |
| --- | --- |
| TypeScript | 10 |
| Node / APIs | 9 |
| Next.js | 8 |
| AI / RAG | 8 |
| React Native | 7 |
| UI engineering | 8 |

Each row expands on hover/focus with 1–2 sentences of *how you use it*, not a list of buzzwords. Write those sentences in `skills.ts` (honest, generic until refined).

### Git history (elegant, not a real git log)

Source: `src/content/history.ts`.

| Year | Entry |
| --- | --- |
| 2023 | Government Systems |
| 2025 | BVM |
| 2025 | Refridz |
| 2026 | RumbleX |

Expandable. Keep copy short. Refine names when experience content is real.

---

## Data shapes

```ts
type Metric = { label: string; value: string };

type Experience = {
  id: string;
  company: string;
  role: string;
  start: string;
  end: string;
  metrics: Metric[];
  stack: string[];
  summary: string;
  notes: string[]; // expandable
};

type ProjectFrontmatter = {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  status: "shipped" | "in-progress" | "private";
  stack: string[];
  role: string;
  heroImage?: string;
  links?: { label: string; href: string }[];
};

type Skill = {
  name: string;
  level: number; // 1–10
  detail: string;
};
```

`src/lib/site.ts` shape (implement in Phase 1):

```ts
export const site = {
  name: "Tarun Joshi",
  role: "Senior Full Stack Engineer",
  location: "Dehradun, Uttarakhand, India",
  tagline: "Building TypeScript systems, RAG pipelines, and production platforms under real constraints.",
  about: string,
  url: null as string | null,
  email: null as string | null,
  socials: {
    github: null as string | null,
    linkedin: null as string | null,
  },
  statusPills: ["Shipping Products", "TypeScript", "Bun", "RAG"],
  nav: [/* About, Experience, Projects, Skills, Contact */],
  seo: {
    title: string,
    description: string,
    ogImage: "/og.png",
  },
} as const;
```

Experience and skills live in `src/content/*.ts`. Projects live in MDX + frontmatter. `lib/projects.ts` is a reader, not a writer of copy.

---

## Cross-cutting rules (every phase)

- Semantic HTML: `header`, `nav`, `main`, `section`, `article`, `footer`.
- Every interactive control is keyboard reachable. Focus visible.
- Images: `next/image`, explicit width/height, meaningful `alt` (or empty alt if decorative).
- No SVG text for hero/UI copy. HTML/CSS for all words. SVG/divs for lines and diagrams only.
- Architecture diagrams = nested `div`s + CSS. No canvas unless a later phase proves it is required.
- Client JS stays small. First Load JS under **180KB** where practical. Do not import Framer Motion in the root layout.
- Static generation for all current routes.
- Copy is calm, specific, and first-person. No “passionate developer” filler.
- No hardcoded personal or site metadata in components. If a string can change later (name, URL, project title), it belongs in `site.ts` or `content/`.

---

## Phases

### Phase 1: Foundation

**Goal:** The empty page already feels like the product. Tokens, folders, utilities, shadcn, motion lib, blueprint grid. No marketing sections yet.

Install (and nothing else):

- `framer-motion`
- `lucide-react`
- `class-variance-authority` `clsx` `tailwind-merge`
- shadcn/ui (Tailwind v4 / Next 16 init)
- shadcn primitives this phase: `button`, `separator` only

Build:

- [x] `src/lib/cn.ts`: `cn()` helper
- [x] `src/lib/site.ts`: full identity config (see shape above). Metadata in layout reads `site.seo`, not string literals
- [x] `src/content/experience.ts`: two generic cards (even if unused until Phase 4)
- [x] `src/content/skills.ts`: capability rows (even if unused until Phase 4)
- [x] `src/content/history.ts`: year entries (even if unused until Phase 7)
- [x] Design tokens in `globals.css` (colors, fonts, easing, grid utilities)
- [x] Dark `html` class, no light flash
- [x] `src/components/animations/blueprint-grid.tsx`: static CSS grid + one radial glow
- [x] `src/components/layout/site-shell.tsx`: skip link + `main`
- [x] Root layout: fonts, `site.seo`, shell, grid
- [x] Replace starter `page.tsx` with a quiet canvas (`site.name` + `site.role` only, no default Next template)
- [x] Folder stubs: `components/{layout,sections,ui,animations}`, `content/projects`, `hooks`

**Done when:** `/` is a dark navy page with a subtle blueprint grid, Geist typography, name/role, and zero starter-kit chrome.

**Not in this phase:** nav, hero card animation, sections, MDX.

---

### Phase 2: Chrome

**Goal:** The site feels like an OS chrome: floating glass nav, mobile drawer, scroll spy, build-style progress.

Build:

- [x] `src/components/layout/floating-nav.tsx`: glass, desktop links, mobile drawer
- [x] Active section indicator (Intersection Observer)
- [x] Smooth scroll to `#` ids (`scroll-mt` for sticky offset)
- [x] `src/components/layout/build-progress.tsx`: scroll progress as build stages:
  - 0–20% `Compiling...`
  - 20–50% `Linking...`
  - 50–80% `Optimizing...`
  - 80–100% `Build Complete.`
- [x] `src/components/layout/footer.tsx`: mono meta, year, name
- [x] Homepage skeleton sections with ids and `min-h` spacers so spy/progress can be tested
- [x] shadcn: `sheet` (or a small custom drawer if lighter)

**Done when:** scrolling a tall blank homepage updates the nav underline and the build label. Mobile drawer is keyboard accessible (Esc, focus trap).

**Not in this phase:** real section content, command palette.

---

### Phase 3: Hero

**Goal:** First 30 seconds. This is the most important surface on the site.

Left:

- [x] Name (display)
- [x] Role (mono label)
- [x] Tagline
- [x] CTA: View Projects (`#projects`). No resume download.
- [x] Status pills with a *very* slow opacity/position drift (disabled under reduced motion)

Right:

- [x] Blueprint card (HTML/CSS). Animated technical lines, measurement ticks, moving connection paths.
- [x] No SVG text. Labels like `query` / `retrieve` / `verify` / `refuse` are HTML if they exist at all: keep them optional and sparse.
- [x] Card should feel like a Figma frame + calipers, not a robot face.

Background (hero only, still subtle):

- [x] Floating connection nodes (few, not a particle field)
- [x] Thin dashed paths with slow `stroke-dashoffset`

**Done when:** desktop hero is a two-column editorial layout; mobile stacks (copy first, card second). Motion is felt, not watched.

**Not in this phase:** other sections.

---

### Phase 4: About, Experience, Skills

**Goal:** Substance under the hero. Still no project case studies.

- [x] About: short editorial block, not a resume dump
- [x] Experience: stacked engineering cards (not a vertical timeline)
  - Hover: lift + border
  - Click/Enter: expand notes (height animation, `aria-expanded`)
  - Metrics as mono figures
- [x] Skills: capability board with bar meters
  - Hover/focus expands detail
  - Keyboard: each row is a focusable button or disclosure

Content from `src/content/experience.ts` and `src/content/skills.ts`. About copy from `site.about`.

**Done when:** three sections are readable, responsive, and expandable without layout jump chaos.

**Not in this phase:** project grid, MDX.

---

### Phase 5: Project system

**Goal:** Routing + listing + MDX pipeline. Case study *bodies* can still be thin.

- [x] `@next/mdx` **or** `next-mdx-remote` + `gray-matter`: pick the smaller RSC-friendly option during implement
- [x] `src/content/projects/{rumblex,refridz,government-dashboard}.mdx` with frontmatter
- [x] `src/lib/projects.ts`: list + getBySlug from MDX frontmatter only, static params
- [x] Homepage projects section: 3 case-study cards (image placeholder, tagline, stack, link)
- [x] `src/app/projects/[slug]/page.tsx`: shared layout chrome:
  - Hero
  - Overview
  - Problem
  - Architecture slot
  - Tech stack
  - Challenges
  - Tradeoffs
  - Lessons
  - Gallery placeholders
- [x] MDX components map (headings, callouts, `Architecture` wrapper)
- [x] `generateStaticParams` + `generateMetadata` per slug

**Done when:** `/projects/rumblex` (and the other two) render from MDX with the shared template. Homepage cards link correctly.

**Not in this phase:** deep diagram polish (that is Phase 6).

---

### Phase 6: Case study depth

**Goal:** Each project feels like an engineering post, not a Dribbble shot.

- [x] **RumbleX**: div diagram: iPhone → WKWebView → JavaScript Bridge → Core Haptics. Haptic bridge written in plain language.
- [x] **BVM**: CLI flow (request → platform → checksum → extract → symlink → shell). TTY vs CI. npm `bunvm`.
- [x] **Refridz**: OCR → parse → AI fallback → local store → reminders. Call out offline + failure modes.
- [x] **Government Dashboard**: problem, constraints, architecture, integrations, scale. Zero confidential artifacts.
- [x] Reusable `src/components/projects/flow-diagram.tsx` (nodes + connectors, HTML/CSS)
- [x] Gallery slots: framed placeholders with aspect ratio, not broken images
- [x] Beautiful empty/private state if `status === "private"`

**Done when:** a founder can understand *how it was built* without reading code.

---

### Phase 7: Playground, history, contact

**Goal:** The “this is a product” lower half.

- [x] Engineering Playground: live benches (HTML/CSS)
  - RumbleX haptic bridge: hits through iPhone → WKWebView → JS Bridge → Core Haptics. Unknown fails silent. Queued backlog drops.
  - Refridz OCR bench: type a label or pick a sample. Ambiguous dates and junk reads refuse. Never invent an expiry.
- [x] Git History: year + entry, expand on click, not a commit graph gimmick
- [x] Contact: glass card, GitHub, LinkedIn, Email from `site`
  - If a social/email is `null`: muted placeholder chip, not a fake link
  - Copy-to-clipboard on email only when `site.email` is set
  - `aria-live` confirmation: `Copied`
  - Fallback if clipboard API is blocked

**Done when:** playground is the most delightful section after the hero, and contact works with keyboard only.

---

### Phase 8: Command palette + easter eggs

**Goal:** Hidden craft. Tasteful, not meme-heavy.

- [x] `Cmd/Ctrl + K` command palette (shadcn `command` / `cmdk` is allowed here)
  - Search projects, skills, sections
  - Trap focus, Esc closes, overlay
- [x] Konami code → `/lab`
- [x] `/lab`: hidden developer page: stack, build stages, maybe a tiny terminal log of this site’s own architecture. `robots noindex`. Not linked in nav.
- [ ] One extra quiet egg optional (example: clicking the blueprint card measurement tick 5× reveals a mono tooltip). Skip if it hurts taste.

**Done when:** palette is the fastest way to move, and `/lab` is a grin: not a second portfolio.

---

### Phase 9: SEO, a11y, performance, polish

**Goal:** Production. The $20k feel is in the last 10%.

- [x] Metadata API from `site.seo` (title template, description)
- [x] Canonical + sitemap **only if** `site.url` is set; do not emit `example.com`
- [x] Open Graph + Twitter cards (`public/og.png`)
- [x] JSON-LD `Person` schema from `site` (omit empty socials)
- [x] `sitemap.ts` + `robots.ts`
- [x] `loading.tsx`: premium blueprint loader (one pulse, no spinner farm)
- [x] `not-found.tsx`: on-brand
- [x] Page transitions: small fade on project routes only
- [x] Reduced-motion audit across all client components
- [x] Keyboard pass: nav, drawers, disclosures, palette, playground
- [x] Bundle check: drop unused client islands; dynamic import palette
- [x] Lighthouse 95+ on homepage and one case study (local production build)
- [ ] When a real domain exists: set `site.url` only
- [x] Delete leftover `public/next.svg` starter assets if unused

**Done when:** the Final Polish Checklist below is all checked.

---

## Final polish checklist

- [x] Premium loading experience
- [x] Smooth page transitions
- [x] Blueprint grid throughout
- [x] Interactive architecture cards
- [x] Responsive: 360px, 768px, 1024px, 1440px
- [x] Lighthouse 95+ (Perf, A11y, Best Practices, SEO)
- [x] First Load JS under 180KB where practical
- [x] Beautiful empty states
- [x] Meaningful micro-interactions
- [x] Production-ready TypeScript, Biome clean
- [x] No placeholder-template feeling
- [x] `prefers-reduced-motion` respected
- [x] No confidential government artifacts

---

## Out of scope (v1)

- CMS / admin
- Blog index beyond the three case studies
- Auth, comments, view counters
- Light theme
- i18n
- Real 3D / WebGL
- Analytics (add later if you want, privacy-first)

---

## Suggested session prompts

Copy one line into chat when you are ready:

```
Execute Phase 1 from BLUEPRINT.md. Do not start later phases.
```

```
Execute Phase 2 from BLUEPRINT.md. Do not start later phases.
```

After a phase, if something feels off:

```
Stay on Phase N. Tweak: [what you saw / what you want].
```

When you have real copy (GitHub, email, PDF, domain, about):

```
Update src/lib/site.ts only. Do not restyle. Do not touch components.
```

---

## Locked decisions

Answered 18 Aug 2026. Do not re-ask.

1. **Socials**: GitHub, LinkedIn, email stay `null` placeholders. Location is Dehradun, Uttarakhand, India.
2. **Resume**: no download button. The site, GitHub, and LinkedIn are the surface.
3. **Experience**: generic “Government Systems” only, 2023–Present. No confidential names or exact internal metrics.
4. **Projects**: RumbleX, BVM, Refridz, Government Dashboard. No extras unless asked.
5. **Domain**: `site.url = null` until a real canonical exists. No fake OG/canonical domain.
6. **Architecture**: content-first. Identity/SEO in `site.ts`. Experience/skills/history in `content/`. Case studies in MDX. Components consume data; they do not store it.
