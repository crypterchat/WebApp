---
name: pgpjs-site
description: >
  Build, extend, or update any page on the PGPJS.com documentation and marketing website.
  Use this skill whenever the user asks to add pages, sections, components, or content to
  the PGPJS site — including the homepage, docs pages, blog, case studies, API reference,
  or any layout/style changes. Also trigger when the user mentions "PGPJS site", "pgpjs.com",
  or asks to add footer / header / nav / cards / hero sections to the existing HTML.
---

# PGPJS Site Skill

## Project Overview

PGPJS.com is a self-contained, single-file HTML documentation and marketing website for
the OpenPGP.js JavaScript encryption library. It is inspired by the golang.org case-studies
page layout, adapted and branded for PGPJS.

**Output format:** Always self-contained HTML — no external CDN dependencies, all SVGs inline,
all CSS in a `<style>` block, all JS in a `<script>` block at the bottom of `<body>`.

**Output location:** `/mnt/user-data/outputs/pgpjs-homepage.html`

---

## Design System

### Colors
| Token         | Hex       | Usage                          |
|---------------|-----------|-------------------------------|
| `brand-blue`  | `#1a73e8` | Primary, links, CTA            |
| `brand-red`   | `#ea4335` | Accent (logo G, icons)         |
| `brand-amber` | `#f9ab00` | Accent (logo P2, warnings)     |
| `brand-green` | `#34a853` | Accent (logo J, success)       |
| `text-primary`| `#202124` | Body text                      |
| `text-muted`  | `#5f6368` | Secondary text, descriptions   |
| `text-faint`  | `#80868b` | Labels, eyebrows, meta         |
| `border`      | `#e8eaed` | Card borders, dividers         |
| `bg-surface`  | `#f8f9fa` | Feature strips, footer bg      |
| `bg-hero`     | `#f0f7ff` | Hero section tint (slide 1)    |
| `code-bg`     | `#1e2333` | Code block background          |

### Logo
The PGPJS wordmark is always rendered in monospace with 5 colored spans:
```html
<span class="logo-p1">P</span>  <!-- #1a73e8 blue  -->
<span class="logo-g">G</span>   <!-- #ea4335 red   -->
<span class="logo-p2">P</span>  <!-- #f9ab00 amber -->
<span class="logo-j">J</span>   <!-- #34a853 green -->
<span class="logo-s">S</span>   <!-- #1a73e8 blue  -->
```
Font: `'Courier New', monospace`, weight 800.

### Typography
- **Display:** Georgia serif (slide titles, code section h2)
- **Body:** -apple-system / BlinkMacSystemFont / Segoe UI stack
- **Code:** 'Courier New', Courier, monospace
- **Section eyebrows:** 11px, uppercase, letter-spacing 1.4px, color `#80868b`

### Layout
- **Container:** `max-width: 1200px; margin: 0 auto; padding: 0 32px;`
- All page sections use `.container` as their inner wrapper — no full-bleed content inside sections.
- Section padding: `56px 0` (top/bottom only; horizontal from `.container`)

### Section Label Pattern
```html
<p class="section-label">Label text</p>
```
Renders as uppercase eyebrow with a right-extending hairline rule.

---

## Page Structure

```
topbar            ← announcement bar (blue bg)
nav               ← sticky header
  .nav-inner > .container layout
hero-slider       ← 3-slide carousel with arrows + dots
cards-section     ← 3-col (desktop) case study cards
features-section  ← 4-col (desktop) feature blocks
code-section      ← 2-col: copy + syntax-highlighted code
stats-section     ← 4-col stats strip (blue bg)
blog-section      ← 3-col blog card grid
cta-section       ← dark gradient CTA banner
footer            ← 5-col grid + bottom bar
```

---

## Components

### Nav
- Sticky, 60px height, white background, bottom border `#e8eaed`
- Left: logo + nav links (Docs, Tutorials, API Reference ↗, Blog, Community)
- Right: icon buttons (GitHub, npm, theme toggle) + search pill + hamburger (mobile)
- Mobile: hamburger toggles `.mobile-nav` drawer (position fixed, full height below nav)

### Hero Slider
- Three `.hero-slide` divs; only `.active` is `display: block`
- Inner: 3-col grid `1fr auto 1fr` — text | wordmark | SVG illustration
- On mobile: wordmark and illustration hidden, text full-width
- Auto-advances every 5s; arrows and dots allow manual navigation

### Cards
- `.cards-grid` — CSS grid, 3 cols desktop / 1 col mobile
- Each card: border, border-radius 10px, hover lift effect
- Must include: brand logo SVG, bold title, body/quote text, "Read more →" link

### Feature blocks
- 4 cols desktop / 2 cols tablet / 1 col mobile
- Each block: colored icon badge + title + body
- Icon badge colors: `.fi-blue`, `.fi-green`, `.fi-red`, `.fi-amber`

### Code block
- Dark background `#1e2333`, border-radius 12px
- Three macOS window dots at top + filename label
- Syntax highlighted with span classes: `.c-kw`, `.c-fn`, `.c-str`, `.c-cm`, `.c-var`, `.c-lit`

### Stats strip
- Full-width blue background `#1a73e8`
- 4 large numbers + labels, white text

### CTA Banner
- Dark gradient: `linear-gradient(135deg, #1a1f36, #1e2a52)`
- Two buttons: white primary + ghost outline

### Footer
- 5-col grid (2fr brand + 4×1fr link columns)
- Social icon buttons (GitHub, Twitter, npm, Discord)
- Bottom bar: copyright left + legal links right

---

## Responsive Breakpoints

| Breakpoint | Changes |
|------------|---------|
| `≤ 1024px` | features: 2 cols; footer: 2-col grid |
| `≤ 768px`  | nav links hidden; hamburger shown; hero 1-col; cards 1-col; code 1-col; stats 2-col; footer 2-col |
| `≤ 480px`  | features 1-col; footer 1-col; reduced section padding |

---

## Adding New Pages

When asked to add a new page (e.g. docs, blog post, API reference):
1. Create a separate HTML file: `/mnt/user-data/outputs/pgpjs-[pagename].html`
2. Copy nav, topbar, and footer from the main homepage
3. Add a breadcrumb below nav: `Home / Section / Page`
4. Use same container, color system, and typography tokens
5. For docs pages: use a 2-col layout (sidebar nav + content area)
6. For blog posts: use a narrow reading column (max-width 720px centered)

---

## SVG Brand Logos

All third-party brand logos are drawn inline as SVGs. Keep them within a `.card-logo` div
(height: 36px). Match brand colors as closely as possible. Never embed external images.

Current logos implemented: ProtonMail, Keybase, Mailvelope, Signal, Thunderbird, Tutanota.

---

## JavaScript Conventions

- All interactivity in a single `<script>` at bottom of `<body>`
- Hamburger toggle: add/remove class `.open` on `#mobileNav`
- Slider: pure JS, no dependencies, auto-advance with `setInterval`
- No jQuery, no external libraries

---

## Quality Checklist (run before every output)

- [ ] All styles in `<style>` block, no external CSS
- [ ] All SVGs inline, no `<img src="...">` with external URLs
- [ ] No external JS libraries loaded
- [ ] `.container` wraps all content (no edge-to-edge text)
- [ ] Responsive: tested mentally at 375px, 768px, 1200px
- [ ] Nav: hamburger visible on mobile, links hidden
- [ ] Hero: wordmark and illustration hidden on mobile
- [ ] Footer: copyright + links present
- [ ] `present_files` called after file creation
