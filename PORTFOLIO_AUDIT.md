# Portfolio Audit — abdulq.com

_Audit date: 2026-06-25_
_Auditor: automated review against modern product-design portfolio standards_
_Local server: `http://localhost:8000/`_

---

## TL;DR

**Overall grade: B**

The site already does the hard things right — strong positioning ("Product Designer & Creative Technologist"), three deep flagship case studies (Monoscribe, Seed Dropper, Signal), structured snapshots, solid SEO foundations, semantic HTML, and accessible navigation. The work is hireable as-is.

What's holding it back from an A is **performance hygiene** (multi-megabyte hero images), **a handful of unresolved placeholders** that signal "draft" instead of "shipped," and **small content inconsistencies** between the homepage/work card copy and the latest in-page edits. Most of these are 30-minute fixes.

| Category | Grade | One-line verdict |
|---|---|---|
| Information architecture & content | A− | Clear hierarchy, hiring-focused, three strong flagships. |
| Visual design & polish | A− | Consistent design system, good typography, calm palette. |
| Accessibility | B+ | Skip links, ARIA, focus-visible, reduced-motion all present. Some generic alt text in blog. |
| SEO & metadata | A− | Per-page OG, canonicals, sitemap, robots, JSON-LD. One file misnamed. |
| Performance | **C** | **Critical: hero images up to 19 MB. Preloaded.** |
| Code quality & consistency | B | Some legacy CSS/JS, container vs site-container drift, dead pages. |
| Case-study depth | A | Monoscribe + Seed Dropper + Signal are textbook structure. |
| Asset / repo hygiene | C+ | 947 MB of assets, ~640 MB used only by deep blog archive. |

---

## Page health check (live server)

| URL | Status |
|---|---|
| `/` | 200 |
| `/pages/work.html` | 200 |
| `/pages/all-projects.html` | 200 |
| `/pages/about.html` | 200 |
| `/pages/resume.html` | 200 |
| `/pages/contact.html` | 200 |
| `/pages/projects/monoscribe.html` | 200 |
| `/pages/projects/seed-planter.html` | 200 |
| `/pages/projects/signal.html` | 200 |
| `/sitemap.xml` | 200 |
| `/robots.txt` | 200 |
| `/manifest.webmanifest` | **404** ← file is named `manifest.json` |
| `/404.html` | 200 |

Every linked internal asset (resume PDF, GLB models, demo MP4, logo, blog archive) resolves.

---

## What's working well

- **Positioning is sharp and consistent.** "Product Designer & Creative Technologist" appears in `<title>`, OG copy, JSON-LD, and hero copy across pages.
- **Three flagship case studies** each follow a clear template: Hero → Snapshot → Problem → Goal/Process → Research → Design Decisions → Prototype → Testing/Iteration → Outcome → Reflection → Next Steps. This is exactly what hiring product designers look for.
- **Real artifacts.** Monoscribe has an interactive `<model-viewer>` GLB, a working demo video, and 4 hardware iteration generations. Seed Dropper has 8 documentary photos plus the connector GLB plus the IMG_5651.mp4 demo. Signal has a Figma Make prototype CTA.
- **Honest, specific writing.** Each case study includes trade-offs, limits, and failed iterations — much more credible than the "this project was a success" template most portfolios use.
- **Accessibility baseline.** `<a href="#main" class="skip-link">`, `aria-expanded` on mobile menu, `aria-label` on toolbars, `role="toolbar"`, decorative-image `alt=""` with `aria-hidden`, `:focus-visible` styling, `prefers-reduced-motion` handling.
- **SEO foundations.** Per-page `<title>`, `<meta description>`, OG title/description/url/image, Twitter card, canonical URL, sitemap with 15 entries, robots.txt, JSON-LD `Person` schema on homepage.
- **Working contact form.** `pages/contact.html` posts to Formspree, has proper `<label for>` pairs, `required` validation, and a visible CTA.

---

## Critical issues (fix first)

### 1. Hero images are 18–26 MB PNGs

**Impact:** First-paint and Largest-Contentful-Paint will be terrible on real networks. Google PageSpeed will fail.

| File | Size | Used by |
|---|---|---|
| `assets/eink_scree_documentation/version4_1.png` | **18.6 MB** | Homepage `<link rel="preload">` and `<img>`; Monoscribe page (multiple times); fallback for monoscribe-hero.jpg |
| `assets/eink_scree_documentation/version3_1.png` | 19.0 MB | Monoscribe evolution timeline |
| `assets/eink_scree_documentation/version2_1.png` | 18.8 MB | Monoscribe evolution timeline |
| `assets/eink_scree_documentation/version4_2.png` | 21.1 MB | Monoscribe hardware gallery |
| `assets/pictures of the planting device/IMG_5925.jpeg` | 4.2 MB | Seed Dropper hero |
| ~25 more PNGs in `pictures for week 2-5/` | 12–27 MB each | Eink blog archive |

**Worst offender:** `index.html` line 45 *preloads* `version4_1.png` (18.6 MB) as the hero image — so the browser is forced to download 18 MB before paint.

**Fix:** Resize and re-export all hero/feature images to **≤500 KB JPEG/WebP at 1600 px max width**. Convert PNG photos to JPEG. Aim for ≤2 MB total weight per page, not per image.

### 2. Unresolved asset placeholders still appear on shipped pages

**Impact:** Visitors see grey "Asset placeholder — monoscribe-cardboard-prototype.jpg" boxes instead of real content. Reads as "incomplete portfolio."

Pages still showing placeholders:

- **`pages/projects/monoscribe.html`** (13 placeholders): `monoscribe-cardboard-prototype.jpg`, `monoscribe-oled-test.jpg`, `monoscribe-sketches.jpg`, `monoscribe-eink-test.jpg`, `monoscribe-interface.jpg`, `monoscribe-circuit-test.jpg`, `monoscribe-soldering.jpg`, `monoscribe-3d-print.jpg`, `monoscribe-exploded-view.jpg`.
- **`pages/projects/seed-planter.html`** (1): `system-diagram.png` annotated diagram + Python GUI screenshot (the Pronterface photo replaces this one but the placeholder block for the annotated diagram remains).
- **`pages/work.html`** (2): hero card images for Seed Planter and Signal — both still use `media-fallback` labels even though we have real hero images we could use.
- **`index.html`** (2): media-fallback labels in Featured Case Studies for Seed Planter and Signal.
- **`pages/projects/signal.html`** (3): hero figure, user-flow diagram, wireframe panel (Figma link covers one of these).

**Fix:** Either generate the missing assets, or substitute real photos we already have (e.g. use `IMG_5925.jpeg` as the seed-planter card thumbnail on `work.html`/`index.html`).

### 3. Content drift between homepage copy and case studies

- `index.html` (Featured Case Studies tag list) and `pages/work.html`, `pages/all-projects.html` still describe the seed planter as **"G-code motion"** — but the case study now honestly says it was manual Pronterface jogging. The summary cards contradict the deep page.
- Monoscribe's "Concept Evolution" gallery and the Build Process section both reference iteration images from `eink_scree_documentation/` instead of canonical `assets/projects/monoscribe/images/` paths — fine technically, but the canonical folders are empty.

**Fix:** Reword the seed-planter card copy to match the case study ("manual Pronterface motion, ESP32 servo dropper"). Either populate `assets/projects/monoscribe/` or remove the unused folders.

### 4. `manifest.webmanifest` 404

The file exists as `manifest.json` and is correctly referenced by `index.html` as `/manifest.json` — but the original spec was for `.webmanifest`. Not breaking, but PWA-strict tooling will flag it. Either rename the file or leave a copy at `manifest.webmanifest`.

---

## High-impact improvements

### Performance

- **Self-host or precompile Tailwind.** Every page loads `https://cdn.tailwindcss.com` (~300 KB Tailwind JIT engine). Generate a static `tailwind.css` build at deploy and remove the CDN script. Saves a network hop and a parse.
- **Resize the Seed Dropper hero (`IMG_5925.jpeg`, 4.2 MB) to ~400 KB JPEG.** It's the first thing visitors see on that case study.
- **Add `width` and `height` attributes to all `<img>` tags.** Most have them; the Seed Dropper inline `<img>` tags after the hero do not. Prevents layout shift.
- **Convert the planting-device photos to WebP.** 8 photos × ~3 MB JPEG = 24 MB on the seed-planter page alone. WebP at quality 80 typically gets that under 5 MB total.

### Accessibility

- **Replace generic alt text in the blog archive.** `pages/projects/eink-laptop/blog/2026-*` all use `alt="Week 04 process image 1"` etc. Either describe what's in each photo or, if purely decorative, set `alt=""` with a real caption underneath.
- **Add visible focus styles to the lightbox close interaction** in `monoscribe.html` (currently dismisses on click; no keyboard equivalent visible without inspecting).
- **Re-test color contrast on `.tag` and `.eyebrow`** — both use a lightened accent that may fall below 4.5:1 against `--color-bg`.

### SEO

- **Add JSON-LD `CreativeWork` / `Article` schema to each case study.** Currently only the homepage has structured data. Adding `@type: CreativeWork` (or `TechArticle`) per case study makes individual projects eligible for rich results.
- **Sitemap is missing the eink-laptop blog archive** (linked from Monoscribe). Either add the blog posts to `sitemap.xml` or `noindex` them.
- **`pages/projects/subtext.html`** doesn't have a canonical link. Add one.

### Content polish

- **Add a tiny "Currently exploring" or "Status" pill on the homepage** (e.g. "Open to product design roles · 2026"). Sets recency without needing a blog.
- **Each case study could open with a one-line "Result" callout** above the hero (e.g. "Working E-Ink writing device, end-to-end, including custom enclosure"). Hiring managers skim — give them the punchline immediately.
- **The "Selected Experiments" cards on `index.html` need a hover state matching `work.html` cards.** They're slightly less polished than the featured trio.

---

## Code quality & repo hygiene

### Legacy / dead code

Files not referenced by any served page:

- `style.css` (6.2 KB) — superseded by `style-modern.css`
- `script.js` (4.4 KB) — superseded by `script-modern.js`
- `about.css` (3.3 KB) — content moved to `style-modern.css`
- `dashboard.css` + `dashboard.js` + `pages/dashboard.html` — orphaned, not linked from main nav
- `pages/projects.html` — redirect that nothing links to (point sitemap/robots away)
- `Engineering Reselience  (1).pdf` (2.1 MB) — source material; should not be deployed
- `WEBSITE_ARCHITECTURE.md` (18 KB), `me.md` (6.8 KB) — planning docs

**Fix:** Add a `.deployignore` or move planning files to a `_drafts/` folder. Delete the legacy CSS/JS pairs.

### Container class naming drift

Both `class="container"` and `class="site-container"` are used on header/footer wrappers across pages. CSS treats them identically (`.container, .site-container { ... }`), but the inconsistency is confusing.

| Uses `site-container` | Uses `container` |
|---|---|
| `index.html`, `pages/projects/seed-planter.html`, `pages/projects/signal.html`, `pages/projects/monoscribe.html`, `components/navigation.html` (mixed) | `pages/about.html`, `pages/contact.html`, `pages/resume.html`, `pages/work.html`, `pages/all-projects.html`, `404.html`, all secondary project pages |

**Fix:** Pick one (recommend `site-container`) and `sed`/find-replace the other.

### Inconsistent footer copy

Every page footer is hand-copied — small drift risk. Consider extracting a build step that templates header + footer.

---

## Asset / repo size

```
947 MB  assets/
├── 641 MB  pictures for week 2-5/      ← used only by eink-laptop blog
├── 264 MB  eink_scree_documentation/   ← used by Monoscribe + homepage hero
├──  10 MB  IMG_1915 (1).mov            ← unreferenced
├──  21 MB  timetrace.mp4               ← referenced?
└──  ...
```

- **`pictures for week 2-5/` is 641 MB of raw iPhone screenshots** at 12–27 MB each, only used by the deep blog archive in `pages/projects/eink-laptop/blog/`. **Compressing those alone would save ~600 MB.**
- **`IMG_1915 (1).mov`** (10 MB) is not referenced by any HTML. Likely safe to delete.
- Anything in `assets/eink_scree_documentation/` that's a multi-MB PNG is screaming for re-export.

---

## Per-case-study quality check

### Monoscribe (centerpiece)

- ✅ 689 lines, full template, principles section, build process grid, hardware grid, interactive GLB, demo video, evolution timeline.
- ⚠️ 13 asset placeholders still visible — gives the page a "draft" feel in places (cardboard prototype, sketches, OLED test, etc.).
- ⚠️ Hero relies on 18 MB PNG fallback.
- 💡 The 4-version hardware gallery is excellent — but the version galleries don't pause `<model-viewer>` auto-rotate when out of view, which can hurt scroll performance.

### Seed Dropper

- ✅ 706 lines, full template, photos placed, interactive GLB, code blocks (Python + ESP32), Limits + Forms of Care + Next Steps sections. This page is your strongest case study end-to-end.
- ✅ Demo video works with fallback logic.
- ⚠️ Annotated system-diagram placeholder still showing — easy win if you mock one up in Figma.
- ⚠️ Hero IMG_5925 is 4.2 MB; should be ~400 KB.

### Signal

- ✅ 582 lines, Usability Testing section (6 themes, 3 insights, 2 struggle areas), iterations explicitly tied to testing findings.
- ✅ Polished "Launch prototype" CTA card replaces the broken iframe.
- ⚠️ Three hero/wireframe placeholders still visible.
- 💡 Worth converting the Figma Make file into a regular Figma prototype (linked frames) so the Outcome section can actually embed live — this was attempted and blocked by Figma Make's X-Frame-Options.

---

## Prioritized action plan (one weekend of work)

### Must do (P0) — ~3 hours
1. Resize `version4_1.png`, `version2_1.png`, `version3_1.png`, `version4_2.png` to 1600 px max width, JPEG q80. Replace all references.
2. Resize the 8 planting-device photos to ≤500 KB WebP.
3. Update Seed Planter card copy on `index.html`, `pages/work.html`, `pages/all-projects.html` to match the "manual motion" reality.
4. Replace `media-fallback` cards on `pages/work.html` and `index.html` with real hero JPEGs for Seed Planter and Signal.
5. Rename `manifest.json` → `manifest.webmanifest` (or duplicate).

### Should do (P1) — ~3 hours
6. Replace remaining `asset-placeholder` blocks on `monoscribe.html` with real photos or remove the placeholder figures.
7. Generate an annotated `system-diagram.png` for the Seed Dropper Prototype Breakdown section.
8. Add JSON-LD `CreativeWork` schema to each of the three flagship case studies.
9. Delete `style.css`, `script.js`, `about.css`, `dashboard.{css,js,html}`, `pages/projects.html` (if truly unreferenced).
10. Move `Engineering Reselience (1).pdf`, `WEBSITE_ARCHITECTURE.md`, `me.md` to a `_drafts/` folder or `.gitignore` from deploy.

### Nice to do (P2) — ~2 hours
11. Self-host Tailwind (precompiled CSS, drop the CDN script tag).
12. Compress the 641 MB `pictures for week 2-5/` archive (or remove it from the deploy if the blog is not a hiring priority).
13. Add a "Currently exploring / open to roles" pill to the homepage hero.
14. Add one-line "Result" callout above each case study hero.
15. Standardize on `site-container` everywhere; remove `container` class usage.
16. Add canonical link tag to `pages/projects/subtext.html`.

---

## Final read

This is genuinely a solid portfolio. The information architecture, content strategy, and case-study depth are well above average — particularly for a recent graduate. The work being shown is interesting, the writing is honest, and the design system is calm and consistent.

The blockers between "good" and "great" are almost entirely **production hygiene**: compress the heroes, swap real images into the placeholder slots, and tighten the few copy contradictions. Once those are addressed, this site is comfortably hireable for product-design and creative-technologist roles.
