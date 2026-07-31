# Website Architecture Notes

This document explains the current structure of the Abdul Qureshi portfolio site as it exists in this repository. The site is a static, hand-authored website: there is no package manager, build step, server framework, component compiler, or backend application in the repo. Pages are plain HTML files, styling is mostly Tailwind utility classes loaded from a CDN, and behavior is provided by small JavaScript files.

## High-Level System

The website is designed to run as a static site, likely through GitHub Pages or another static host. The root `CNAME` points the site to the custom domain `abdulq.dev`, while `sitemap.xml`, `robots.txt`, `manifest.json`, Open Graph metadata, and a custom `404.html` support discoverability and deployment polish.

The site currently has two overlapping generations:

1. Modern portfolio pages using Tailwind CDN, `style-modern.css`, and `script-modern.js`.
2. Older desktop/window-style pages using `style.css`, `script.js`, and icon/window concepts.

Most user-facing pages now follow the modern portfolio direction. The old desktop UI code is still present and may be legacy, experimental, or partially unused.

## Root Files

| File | Purpose |
| --- | --- |
| `index.html` | Main landing page with hero, featured work, intro copy, contact call-to-action, SEO metadata, structured data, and PWA manifest link. |
| `404.html` | Static not-found page using the modern header and Tailwind styling. |
| `style-modern.css` | Shared modern CSS for base typography, focus states, loading states, mobile menu behavior, print support, reduced motion, and high-contrast support. |
| `script-modern.js` | Shared behavior for modern pages: mobile menu, typed text, video handling, iframe lazy loading, smooth scrolling, project search/filtering, 3D model status handling, skill accordions, page-load logging, and dynamic year injection. |
| `style.css` | Legacy desktop/window UI stylesheet. Defines a top taskbar, dropdown menu, desktop icons, draggable windows, loader, and older layout rules. |
| `script.js` | Legacy desktop/window UI behavior. Handles start-menu toggling, GSAP animations, opening/closing windows, clock updates, hover animations, and draggable windows. |
| `dashboard.css` | Styles for the private dashboard page. |
| `dashboard.js` | Dashboard behavior for password unlocking, weather fetching, notes in `localStorage`, and a Spotify placeholder. |
| `manifest.json` | PWA metadata including app name, colors, icons, and screenshot reference. |
| `sitemap.xml` | Search-engine sitemap. Currently includes core pages and a small subset of project pages. |
| `robots.txt` | Search crawler instructions. |
| `CNAME` | Custom domain configuration for static hosting. |
| `me.md` | Personal/source content file, separate from the visible HTML page system. |

## Page Structure

### Home Page

`index.html` is the primary entry point. It contains:

- Full SEO metadata, Open Graph tags, Twitter card tags, and JSON-LD `Person` structured data.
- A sticky modern header with desktop nav and mobile menu markup.
- A hero section with typed headline text driven by `script-modern.js`.
- A video hero using `assets/obsyn.MP4`.
- Featured project cards for TimeTrace and E-Ink Laptop.
- A short personal intro section.
- A contact CTA with email and resume links.
- A footer with dynamic year injection.

The home page is mostly self-contained and relies heavily on Tailwind utility classes. `style-modern.css` only adds global support styles and a few custom behaviors.

### Main Content Pages

The `pages/` directory holds the main site sections:

- `pages/about.html`: About page with animated sections, skill accordions, inline page-specific CSS, and modern shared JS.
- `pages/resume.html`: Resume page with PDF download/open links and preview image.
- `pages/contact.html`: Contact page using Tailwind and Font Awesome from a CDN.
- `pages/projects.html`: Case-study listing page with featured projects and an expandable all-projects section.
- `pages/all-projects.html`: Searchable/filterable project grid.
- `pages/dashboard.html`: Password-gated personal dashboard prototype.

The modern pages repeat their header markup directly instead of importing `components/navigation.html`. That makes each page independent, but it also means navigation changes must be copied across multiple files.

### Project Detail Pages

`pages/projects/` contains dedicated case-study pages:

- `tally.html`
- `subtext.html`
- `squirtle.html`
- `gesturear.html`
- `eink-laptop.html`

The E-Ink Laptop page is the most developed project case study. It includes a video demo, design evolution galleries, 3D model viewers, downloadable GLB/STL assets, a build-process section, and a lightbox script embedded in the page.

### E-Ink Laptop Subsite

`pages/projects/eink-laptop/` functions like a mini documentation site:

- `blog.html`: Index for process posts.
- `blog/*.html`: Weekly process entries.
- `research.html`: Research/library page.
- `presentations.html`: Presentation materials.
- `tasks.html`: Timeline/task tracking.

These pages use deep relative paths such as `../../../style-modern.css` and `../../../../assets/...`. The deep nesting works, but it makes path mistakes easier and increases maintenance cost.

## Assets

The `assets/` directory stores all media:

- Brand and UI images: `logo.png`, icons, resume previews.
- Portfolio videos: `obsyn.MP4`, `timetrace.mp4`, `demo1_1.mp4`, and several aesthetic videos.
- Resume PDFs: multiple resume PDF variants are present.
- E-Ink 3D models: GLB and STL files for multiple versions.
- E-Ink documentation images and video in `assets/eink_scree_documentation/`.
- Weekly process photos in `assets/pictures for week 2-5/`.

Current asset concerns:

- The overall repo is about `443M`, with `assets/` about `100M`.
- Several filenames contain spaces, mixed casing, typos, or special formatting, such as `raspberry .png`, `asthetic _five.mp4`, `most recent version.mp4`, and `uilding_v4_2.png`.
- `.DS_Store` files are present in asset directories.
- There are many duplicate or near-duplicate resume PDFs.
- `assets/og-image.jpg` is currently untracked in Git, while multiple metadata files reference it.

## Styling Architecture

The modern site uses Tailwind through `https://cdn.tailwindcss.com`. Most layout, spacing, color, typography, borders, and responsive behavior live directly in HTML class attributes.

Shared custom CSS in `style-modern.css` covers:

- Global font and smoothing.
- Focus outlines.
- Skip-link behavior.
- Loading spinner states.
- Video loading placeholder behavior.
- Mobile menu open/close animation.
- Touch interaction adjustments.
- Print styles.
- Reduced-motion preferences.
- High-contrast tweaks.

Some pages also include inline styles. For example, `pages/about.html` contains substantial page-specific CSS for animations, accordions, chips, and decorative effects. This works, but it splits styling rules across HTML and CSS files.

The legacy `style.css` defines a separate visual language: desktop icons, taskbar, dropdown menu, draggable windows, and a loader. It does not match the newer minimal Tailwind portfolio style.

## JavaScript Architecture

### `script-modern.js`

This file is wrapped in an IIFE and uses small initializer functions:

- `initMobileMenu()`
- `initTypingAnimation()`
- `initVideoHandling()`
- `initLazyLoading()`
- `initSmoothScrolling()`
- `initProjectSearch()`
- `init3DViewer()`
- `initAccordions()`
- `initPerformanceMonitoring()`

This is a reasonable structure for a static site. Each function checks for required DOM elements before doing work, so one shared script can run across many different pages.

Known issues in `script-modern.js`:

- `init3DViewer()` uses `const modelUrl = '../assets/E-ink_full_model.glb'`. That path is correct for `pages/projects.html`, but not for all possible page depths. Since the function only runs when `#eink-3d-toggle` exists, it currently affects the project listing page, but the hard-coded path is fragile.
- The typing animation rewrites text content, which removes nested markup inside typed elements. On pages where the typed element contains styled spans, those styles are lost once the animation starts.
- Performance monitoring logs page load timing to the console on every page. Useful during development, less useful for production.

### `script.js`

This is the older desktop UI script. It assumes GSAP is available globally and expects elements such as `#start-btn`, `.dropdown`, `.window`, `.icon`, and `.desktop`.

Known issues in `script.js`:

- Some code runs outside `DOMContentLoaded`, including `document.querySelectorAll(".window").forEach(makeDraggable);`. If the script is loaded before those elements exist, draggable behavior may not attach.
- `makeDraggable()` assumes every window has a `.title-bar`. If a window is missing one, it will throw.
- GSAP is used without defensive checks, so pages using this file must load GSAP first.

### `dashboard.js`

The dashboard script is prototype-level:

- The password is hard-coded in client-side JavaScript.
- The OpenWeather API key is empty, so weather fetching will fail.
- Notes are stored locally with `localStorage`.
- Spotify is only placeholder copy.

This should not be treated as secure authentication. It hides content in the browser, but any visitor can inspect the JavaScript and find the password.

## Navigation and Routing

The site uses static file paths rather than a router. Links are mostly relative paths such as `../index.html`, `projects/eink-laptop.html`, or hash links like `projects.html#timetrace`.

What works:

- Static routing is simple and deploys easily.
- Deep project pages can be linked directly.
- Hash links support jumping to sections on `pages/projects.html`.

What is fragile:

- Header markup is duplicated across many pages.
- Some pages use root-relative paths like `/style-modern.css`, while others use relative paths like `../style-modern.css`.
- Root-relative paths are good on a domain root, but can fail if the site is previewed from a subdirectory or directly from `file://`.
- `components/navigation.html` exists, but static HTML does not automatically include it. It is currently a source fragment, not an active component system.

## What Is Working

- The main portfolio architecture is understandable and deployable as a static site.
- Core pages are present: home, about, projects, all projects, resume, contact, and 404.
- Modern pages share a consistent header, Inter font, neutral palette, and Tailwind layout system.
- SEO metadata is stronger than a typical static portfolio: Open Graph, Twitter cards, canonical link, JSON-LD, manifest, robots, and sitemap all exist.
- The home page has a clear narrative: identity, featured work, personal positioning, and contact CTA.
- The project system supports both quick browsing and deeper case studies.
- `pages/all-projects.html` has search and category filtering through `script-modern.js`.
- `pages/projects.html` has a working inline script for showing and hiding additional projects.
- E-Ink Laptop documentation is rich and well organized compared with the rest of the portfolio.
- `script-modern.js`, `script.js`, and `dashboard.js` pass basic Node syntax checks.
- Accessibility has some thoughtful pieces: focus outlines, `aria-expanded`, `aria-controls`, `aria-label`s, reduced-motion handling, and image alt text in many places.

## What Is Broken or Risky

- `pages/dashboard.html` links to `contact.html`, but from `pages/dashboard.html` that resolves to `pages/contact.html`; this is likely okay. The bigger issue is the dashboard's client-side password and empty weather API key.
- `dashboard.js` cannot successfully load weather until a real OpenWeather API key is configured. Client-side API keys are also exposed to users.
- The dashboard password is visible in source code and should not be used for real private content.
- `assets/og-image.jpg` is referenced by `index.html` and `manifest.json`, but is currently untracked in Git.
- There are multiple resume PDF variants. `pages/resume.html` uses `assets/Abdul_Qureshi_Resume___pdf.pdf`, while other PDFs remain in assets and may be stale.
- The sitemap has stale `lastmod` values from `2024-12-19` and does not include the newer/deeper E-Ink documentation pages, Tally, Subtext, or all current project detail pages.
- Navigation is duplicated by hand, so pages can drift out of sync.
- Mobile navigation is inconsistent: the home page has mobile-menu markup, but many inner pages only show desktop nav and do not include the same mobile menu button.
- Tailwind is loaded from the CDN on every page. This is convenient but not ideal for production performance or strict CSP/security setups.
- External dependencies are loaded directly from CDNs: Tailwind, Google Fonts, Font Awesome, YouTube embeds, and `model-viewer`.
- Asset naming is inconsistent and includes spaces, typos, and uppercase/lowercase variation. This increases path fragility.
- `.DS_Store` files are present and should not be committed.
- There is no automated link checker, HTML validator, image optimization step, or accessibility test.
- There is no build process to deduplicate shared navigation, metadata, or project-card data.
- Some page-specific CSS lives inline inside HTML, which makes the style system harder to reason about.
- The old desktop/window code and new portfolio code coexist without clear documentation about which one is active.
- `script.js` has runtime assumptions about DOM timing, GSAP, and required child elements.

## Code Style and Format

### HTML

The HTML is mostly hand-written and section-based. Modern pages use semantic containers like `header`, `main`, `section`, `article`, `nav`, and `footer`. Tailwind classes are dense and live directly on elements. This makes each page easy to edit locally, but repeated patterns become verbose.

Common page pattern:

1. Metadata and external font/CDN links in `head`.
2. Sticky header with logo and navigation.
3. Main content wrapped in a max-width container.
4. Tailwind utility classes for spacing and responsive grids.
5. Shared `script-modern.js` loaded at the end with `defer`.

### CSS

The CSS is split into three personalities:

- `style-modern.css`: small shared support layer for the modern site.
- Inline CSS in specific pages, especially `pages/about.html`.
- `style.css`: larger legacy desktop UI styling.

The modern style language is neutral, minimal, card-based, and portfolio-focused. The about page introduces more gradients, animation, rounded cards, and colorful sections than the rest of the site, so it feels more expressive but less visually consistent.

### JavaScript

The modern JavaScript is organized into initializer functions and safely skips missing elements in most cases. That is a good fit for a static multi-page site.

The older JavaScript is more global and page-specific. It attaches functions to `window`, expects GSAP globally, and mixes DOM-ready and immediate execution. It should either be documented as legacy or refactored if it is still part of the live experience.

## Recommended Improvements

### Highest Priority

- Decide whether the desktop/window UI is still part of the production site. If not, archive or clearly label `style.css` and `script.js` as legacy.
- Replace the dashboard password model with real server-side authentication or remove the private dashboard from public navigation.
- Fix the weather widget by either adding a safe backend/API proxy or removing the broken API call.
- Commit or remove `assets/og-image.jpg`, since metadata depends on it.
- Clean up resume assets so the live resume has one canonical PDF and one canonical preview image.
- Update `sitemap.xml` with current pages and current `lastmod` dates.

### Structural Improvements

- Introduce a lightweight build step or static-site generator so navigation, metadata, project cards, and repeated headers can be maintained in one place.
- If keeping plain HTML, create a documented copy/paste page template and update `components/navigation.html` to match actual usage.
- Move page-specific inline CSS into named CSS files or into `style-modern.css` sections.
- Create a single source of truth for projects, even if it is just a JSON file used by a small script during build.
- Normalize asset names to lowercase kebab-case without spaces.

### Performance Improvements

- Replace Tailwind CDN with a compiled Tailwind build containing only used classes.
- Lazy-load below-the-fold videos and iframes more consistently.
- Add poster images for videos.
- Compress large images and videos.
- Consider moving large 3D/STL assets to release downloads or lazy download links if they are not needed on initial page load.

### Accessibility Improvements

- Add consistent mobile navigation to all modern pages.
- Add skip links to pages that use `style-modern.css`, since the CSS exists but the markup is not consistently present.
- Review heading order across long case studies.
- Ensure all icon-only or SVG-heavy controls have accessible names.
- Avoid typing animation for critical heading text, or render the final text immediately for screen readers.

### Maintainability Improvements

- Add a basic link checker.
- Add HTML validation in CI.
- Add a simple asset audit script for missing files, duplicate PDFs, and oversized files.
- Add `.DS_Store` to `.gitignore` if it is not already ignored.
- Document deployment assumptions: custom domain, static hosting root, and whether root-relative paths are required.

## Suggested Future Architecture

A good next version would keep the static-site simplicity but add a small amount of structure:

```text
/
  index.html
  404.html
  pages/
  projects/
  assets/
  styles/
    modern.css
    about.css
  scripts/
    modern.js
    projects.js
  data/
    projects.json
  components/
    header.html
    footer.html
```

For a no-framework route, a small build script could assemble shared header/footer partials and project data into static HTML. For a richer route, Astro or Eleventy would fit this site well because both support content-heavy static pages without requiring a heavy client app.

## Current Bottom Line

The site is functional as a static portfolio and already has strong content, especially around project storytelling and the E-Ink Laptop documentation. The main architectural weakness is not the lack of a framework; it is that repeated structure, assets, and page-specific behavior are managed manually across many files. The best improvement path is to keep the static publishing model, clean up the asset/content source of truth, and introduce just enough templating or build automation to prevent drift.
