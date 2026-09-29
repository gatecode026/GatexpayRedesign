@AGENTS.md

# GateXPay Design System

This is the persistent design-system reference for this project. Read it before
touching any visual code. It exists so that every future change — by any agent,
in any session — looks like it came from the same design system, not a fresh
reinterpretation.

## The golden rule

```
REFERENCE / FIGMA
        ↓
GLOBAL DESIGN TOKENS  (styles/globals.css)
        ↓
COMPONENT             (reuse tokens, don't hardcode)
        ↓
RESPONSIVE IMPLEMENTATION
```

Never: `COMPONENT → random CSS values → a different visual style`.

**Do not redesign an existing reference.** When the user attaches a screenshot
and says "match this," the screenshot is the source of truth — not personal
taste, not a "cleaner" interpretation, not a generic fintech template. When a
component's structure is fundamentally wrong versus the reference (not just a
few pixels off), rebuild it cleanly rather than patching around the wrong
architecture — but reuse the same existing asset paths, routes, and design
tokens whenever they're already correct.

## Brand colors (`styles/globals.css :root`)

| Token | Value | Use |
|---|---|---|
| `--color-primary-dark` | `#071225` | Dark navy surfaces (navbar, footer, dark sections) |
| `--color-primary` | `#0b1f48` | Secondary dark surface |
| `--color-navy` / `--color-navy-2` | `#0d1c3f` / `#0a1530` | Dropdown panels, card-dark surfaces |
| `--color-blue` | `#1a5dc8` | Headline accent / link color on light backgrounds |
| `--color-blue-mid` | `#1e6be0` | Hover state for `--color-blue` |
| `--color-accent` | `#00baff` | Bright cyan — dark-surface headings, CTA accents, hover states |
| `--color-accent-2` | `#29d8ff` | Secondary cyan tint |
| `--color-heading` | `#090f22` | Heading text on light backgrounds |
| `--color-body` / `--color-muted` | `#4a5773` / `#8693b0` | Body/muted text on light backgrounds |
| `--color-text-primary` | `#ffffff` | Primary text on dark backgrounds |
| `--color-text-secondary` | `#d7dfea` | Secondary text on dark backgrounds (nav links, descriptions) |
| `--color-text-muted` | `#9aa8bc` | Muted/legal text on dark backgrounds |
| `--color-border-subtle` | `rgba(255,255,255,0.18)` | Dividers on dark backgrounds |

Component-specific accent blues (e.g. a navbar/hero CTA at `#159eea`) are
allowed when the reference calls for a distinct fintech blue, but define them
once per component and reuse — never scatter ad-hoc hex values across a file.

**Never invent a new brand blue.** If a reference screenshot's blue looks
different from the tokens above, treat it as the same brand blue rendered
under different screenshot conditions, and use `--color-accent` /
`--color-blue`, unless the user explicitly gives an exact hex.

## Typography

- `--font-heading`: Source Serif 4 (editorial serif — headings, hero titles,
  wordmarks). Never substitute Arial/Inter/system-serif when this is loaded.
- `--font-body`: Poppins (body copy, nav links, buttons, UI text).
- Both are already loaded via Next.js font config — never add a new font
  import without first checking whether an existing token covers the need.

## Spacing (4px base unit)

`--space-1` (4px) through `--space-24` (96px) — see `globals.css` for the full
scale. Use these instead of arbitrary margin/padding values. If a reference
needs a value between two tokens, prefer `clamp()` anchored to the nearest
tokens over a raw magic number.

## Container / layout

- `.container` (globals.css): `max-width: var(--container-max)` (1260px),
  centered, `padding-inline: var(--container-pad)`. **Reuse this for any new
  section** — do not invent a second container system with different max-width
  unless a specific component (e.g. an oversized hero canvas) explicitly needs
  to break out of the standard grid, and say so when you do.
- **Page edges (navbar-aligned):** `--page-max` (1440px) and `--page-gutter`
  (`clamp(20px, 3.5vw, 80px)`, 20px ≤1024, 16px ≤768) are the navbar's own
  edges — logo on the left, "Talk to an Expert" on the right. The navbar,
  the footer, and every Services-page section use them (via
  `.container--page`, or the tokens directly), so those blocks line up on
  both sides at every width. Most other pages still use the narrower
  `.container` (1260px) — use `.container--page` only where a section must
  line up with the navbar, and don't mix the two systems within one page.
- `--navbar-h`: 80px, fixed navbar. Anything positioned relative to page top
  must account for this (either `padding-top: calc(var(--navbar-h) + Xpx)` in
  normal flow, or explicit absolute-position math when using a fixed-pixel
  design canvas).

## Buttons

- `.btn` + `.btn-primary` / `.btn-secondary` / `.btn-ghost` in globals.css
  cover the standard button variants on light backgrounds.
- Dark-surface CTAs (navbar, hero) use a bright fintech blue
  (`#159eea`-family) pill/rounded-rect, white text, `translateY(-2px)` +
  brighter background + subtle shadow on hover, 200–250ms ease. Match this
  pattern for any new dark-surface CTA rather than reusing `.btn-primary`'s
  lighter blue verbatim.

## Border radius

`--radius-xs` (4px) → `--radius-xl` (20px). CTA buttons typically sit around
12px; pill buttons use `999px` explicitly (not a token, since it's a
special-case "fully round" value).

## Animation

- Easing: `--ease-out` / `--ease-in-out` for UI transitions.
- Scroll-reveal: the `.reveal` / `.reveal-delay-1..4` utility (fade + translateY,
  0.6s `--ease-out`) is the sitewide pattern for content entering on scroll.
  Reuse it for new sections instead of inventing a new reveal mechanism.
- Decorative device/illustration floats: slow (5–7s), `ease-in-out`, infinite,
  small `translateY` only (≤10px) — no continuous rotation, no bounce, no
  aggressive scaling. Always respect `prefers-reduced-motion` (see the
  reduced-motion block in `globals.css` and mirror it in any component adding
  its own animations).

## Responsive breakpoints

Primary tiers used across sections: `1920` (or the stated Figma/reference
width) → `1600` → `1440` → `1280` → `1024` → `768` → `480` → `375` → `320`.
Each tier should be **art-directed**, not a naive linear shrink of the
desktop layout — reflow, resize, and reposition deliberately per tier, and
verify each one by actually rendering it, not by inspecting the CSS alone.

## Component architecture

- Keep components at the complexity the project already uses — this is a
  fairly flat Next.js app (`components/layout/*`, `components/sections/*`,
  `components/common/*`). Don't introduce a deep subcomponent tree
  (`FooterNavigation/CitizenIdentity/...`) unless the existing project already
  works that way. A single component file with well-organized internal data
  arrays is preferred over over-engineering.
- Co-locate a component's CSS as `ComponentName.css` imported directly in the
  `.tsx` file — this is the established pattern; don't switch to CSS modules
  or styled-components for one component.

## Asset reuse rules

- **Before creating or generating any image/icon/logo, search
  `public/assets/images/` first.** This project has real logo, device-mockup,
  badge, and icon assets already in place.
- Never fabricate a certification/compliance badge or logo that doesn't exist
  in the project. If the exact reference asset (e.g. a specific government
  emblem) isn't available, omit it rather than inventing a substitute —
  and say so explicitly rather than silently dropping it.
- **Verify assets by rendering them**, not just by filename. This project has
  had real cases of mismatched or broken assets: an `icon-instagram.svg` that
  actually contained a Lucide phone icon, and a certification badge SVG with
  upside-down text baked into the file. A filename is a claim, not a
  guarantee — spot-check unfamiliar assets in an isolated render before
  shipping them.
- This project uses `lucide-react` as its icon library (already a
  dependency). Prefer importing a Lucide component over a static SVG file
  when a project icon asset is missing, wrong, or broken — that's "reusing
  the existing icon system," not inventing a new one.

## Figma / reference matching rules

- If a Figma MCP connection is available, treat it as the source of truth and
  pull actual measurements before writing code. **Verify the connection
  actually works before trusting it** — check that real Figma tools appear in
  the tool list; a configured-but-nonfunctional MCP entry is not a
  connection.
- If Figma MCP is unavailable, say so plainly, then work from the reference
  screenshot plus any explicit pixel/measurement values the user provides,
  and verify the result by rendering it — never by inspecting CSS source
  alone.
- When a fix is requested at a specific breakpoint (e.g. "make it match at
  1440px"), verify that *exact* width via real rendering — a fix confirmed at
  1920px does not guarantee correctness at 1440px, 1366px, or any other
  width. Gaps between explicitly-tested breakpoints are exactly where
  regressions hide (a fluid `clamp()` formula tuned for one width can break
  line-wrapping at another, untested width in the same range).

## Accessibility rules

- Semantic HTML always: `<header>`, `<nav>`, `<footer>`, `<address>` for
  contact info, real `<button>`/`<a>` elements for interactive controls
  (never a clickable `<div>`).
- `aria-label` on icon-only controls (social links, menu toggles).
- Decorative images/SVGs: `alt=""` and/or `aria-hidden="true"`. Meaningful
  images (logos, badges representing a real claim): real, specific `alt`
  text.
- Mobile menu toggles: `aria-expanded` reflecting state, `aria-label` that
  changes between "Open menu" / "Close menu".
- Visual fidelity is not a reason to skip accessibility — implement both.

## Scope discipline

When asked to fix or rebuild one section (navbar, hero, footer, etc.), only
touch that section's component file(s) and, when genuinely necessary, shared
global tokens. Do not modify unrelated sections, routing, or project
configuration as a side effect.

## Daily Work Tracking System

This project keeps a permanent, append-only development diary. Follow this
exactly in every session — it is not optional tooling, it is a standing
project rule.

**Files:**

- `DAILY_WORK_LOG.xlsx` — human-readable daily journal, as an Excel
  workbook (converted from an earlier Markdown version at the user's
  request). Three sheets: `README` (title + explanation of the system and
  its rules), `Daily Log` (one dated block per workday — date heading,
  Work Summary, Design Work, Development Work, Bug Fixes, Responsive Work,
  Performance Work, a Tasks Completed mini-table, a Files Changed
  mini-table, Testing & Verification, Git/Change Summary, Work Completed,
  Work In Progress, Next Day Plan, Daily Statistics, Daily Summary —
  appended below the previous day's block, never above or in place of it),
  and `Tasks` (one structured row per task across all days, mirroring the
  CSV columns, for filtering/sorting in Excel). Never delete or reorder a
  previous day's block or rows.
- `DAILY_WORK_LOG.csv` — structured spreadsheet dataset, same task rows as
  the `Tasks` sheet above, in plain CSV for scripts/tools that need it.
  One row per meaningful task. Never delete existing rows.

Editing the `.xlsx` requires a script (e.g. Node + `exceljs`, installed
temporarily and not added to `package.json` — this is a static generated
artifact, not a runtime dependency of the app) rather than a plain text
edit; read the existing file first, then append new content and rewrite it,
exactly as for the Markdown version this replaced.

**Hard rules (data integrity):**

- Never delete, overwrite, or reorder a previous day's record — only append,
  or update *today's* own section/rows if the session continues later the
  same day.
- Never fabricate tasks, hours, commits, bugs, designs, files, test results,
  or completion percentages.
- Only record work verifiable from: the current session's actual tool calls/
  file edits, the project files as they exist on disk, real git history
  (`git status`/`diff`/`log`), commands actually executed, tests actually
  run, or information the user explicitly stated.
- If something can't be verified, write literally: `Not available from
  project/session data.`
- Working hours are never invented. If not reliably determinable, write:
  `Not reliably measurable from available project/session data.`
- Never mark unfinished or reverted work as "Completed" — use `In Progress`,
  `Blocked`, `Deferred`, or `Cancelled` as appropriate, and say in the notes
  when something was attempted and then reverted.
- This project is not currently a git repository (`git status` at time of
  writing returns "not a git repository"). If that changes, start actually
  inspecting `git status`/`diff`/`log` for the Git/Change Summary section;
  until then that section must say so plainly rather than inventing commits.

**Session start behavior:** read this file, then `DAILY_WORK_LOG.xlsx`
(`README` + `Daily Log` sheets), then `DAILY_WORK_LOG.csv` if present.
Determine today's date. Check whether today's block/rows already exist — if
so, extend them rather than creating a duplicate dated block.

**End of session / when meaningful work is done:** inspect what actually
happened first (changed files, test/build output, commands run, git state if
applicable) — never assume — then append/update today's block in the
`Daily Log` sheet of `DAILY_WORK_LOG.xlsx`, today's rows in its `Tasks`
sheet, and the matching `DAILY_WORK_LOG.csv` rows (all three should stay in
sync).

**Daily block structure** (see `DAILY_WORK_LOG.xlsx` → `Daily Log` for the
live template): Project, Work Summary, Tasks Completed (table), Design Work,
Development Work, Bug Fixes, Responsive Work, Performance Work, Files Changed
(table), Testing & Verification, Git/Change Summary, Work Completed, Work In
Progress, Next Day Plan, Daily Statistics, Daily Summary.

**CSV columns:** `date, project, task_id, task, category, subcategory,
description, status, priority, page_or_module, design_work, development_work,
bug_fix, responsive_work, performance_work, files_changed, tests_performed,
result, time_spent, commit_or_branch, dependencies, blockers, next_action,
notes`

**Categories:** Design, Development, Bug Fix, Responsive, Performance,
Testing, Research, Refactoring, Backend, Frontend, Database, API,
Deployment, Documentation, QA.
**Statuses:** Completed, In Progress, Blocked, Deferred, Cancelled.

**Slash commands:**

- `/daily-log` — inspects today's actual work and appends/updates today's
  record in both `DAILY_WORK_LOG.md` and `DAILY_WORK_LOG.csv`.
- `/work-report` — asks whether to report on Today / This Week / This Month /
  a custom date range, then generates a report strictly from recorded data
  in the two log files (no invented statistics).

When asked "what did we do", "how many bugs did we fix", "what's left", or
for a weekly/monthly summary, answer from the recorded data in these two
files — do not estimate or guess beyond what's written there.
