# Quiet Machines Design System

_Abdul Qureshi portfolio — v3.0, July 2026_

Quiet Machines is the portfolio's shared visual and interaction language. It was derived from the three featured projects rather than from an external UI trend.

The system's thesis is:

> Calm, legible tools that return control to people.

The living reference is available at `/pages/design-system.html`.

## Why this theme fits the work

| Project | Core move | System expression |
|---|---|---|
| Monoscribe | Removes distraction from digital writing | Calm utility, reduced interface noise, deliberate pacing |
| Seed Dropper | Reuses a broken machine as a new tool | Material warmth, visible mechanisms, modular structure |
| Signal | Adds evidence before people trust or share | Clear hierarchy, purposeful warning color, human agency |

Across all three projects, the recurring pattern is not a specific technology. It is making complex systems understandable enough for a person to act with confidence.

## Principles

1. **Reduce noise.** Keep the essential action present; remove decoration and features that compete with it.
2. **Reveal the mechanism.** Show parts, flows, constraints, evidence, and system state.
3. **Protect human judgment.** Offer useful guidance without taking the final decision away from the user.
4. **Reuse before replacement.** Treat existing material and constraints as design inputs.
5. **Show the work.** Process, tests, failure, and revision are part of the product story.

## Foundations

### Color

| Token | Value | Role |
|---|---:|---|
| `--qm-paper` | `#f2f0e8` | Warm page background |
| `--qm-surface` | `#fbfaf5` | Cards and content surfaces |
| `--qm-graphite` | `#171a18` | Primary text and controls |
| `--qm-ink-soft` | `#454b46` | Supporting text |
| `--qm-line` | `#cfd2c8` | Rules, borders, diagrams |
| `--qm-utility` | `#3f596e` | Shared action color; Monoscribe accent |
| `--qm-growth` | `#5d6f54` | Seed Dropper, reuse, positive system state |
| `--qm-signal` | `#9b5c42` | Signal, intervention, attention |
| `--qm-caution` | `#ad772f` | Warnings that require review |

Project accents are set automatically from `data-scroll-theme`:

```html
<body class="ds-theme" data-scroll-theme="monoscribe">
<body class="ds-theme" data-scroll-theme="seed-planter">
<body class="ds-theme" data-scroll-theme="signal">
```

Each page then receives `--project-accent` and `--project-accent-soft` aliases. Components should use these aliases instead of hardcoding a project color.

### Typography

- **Display and headings:** Space Grotesk, medium to bold. Direct, compact, engineered.
- **Body:** Inter, regular to semibold. Clear at long-form case-study lengths.
- **Annotations:** system monospace, uppercase, short. Use for steps, status, versions, measurements, and technical metadata.
- Do not use monospace for paragraphs.
- Keep body copy near 60–70 characters per line.

### Spacing

The spacing scale is based on 4px:

```css
--qm-space-1: 0.25rem; /* 4px */
--qm-space-2: 0.5rem;  /* 8px */
--qm-space-3: 0.75rem; /* 12px */
--qm-space-4: 1rem;    /* 16px */
--qm-space-6: 1.5rem;  /* 24px */
--qm-space-8: 2rem;    /* 32px */
--qm-space-12: 3rem;   /* 48px */
--qm-space-16: 4rem;   /* 64px */
```

Prefer larger section gaps and tighter spacing inside a labeled assembly.

### Shape and elevation

- Small controls: 6px radius.
- Cards and media: 10–14px radius.
- Pills are reserved for tags and compact status only.
- Use 1px rules to explain grouping before adding shadows.
- Shadows stay shallow and neutral; no colored glow.
- Cards may use a 3px top rule to identify a project or semantic category.

## Components

### Theme thesis

`qm-thesis` introduces the shared idea behind the work. `qm-principle-grid` maps one principle to each featured project.

```html
<section class="qm-thesis section-tight">
  <div class="site-container">
    <p class="qm-kicker">The thread across the work</p>
    <h2>Quiet Machines</h2>
    <div class="qm-principle-grid">…</div>
  </div>
</section>
```

### Project surfaces

Existing `.project-card`, `.decision-card`, `.principle-card`, `.callout`, and `.project-hero` components inherit the Quiet Machines foundations. On themed case studies, they use `--project-accent` for the top rule, labels, and state markers.

### Labels

Use `.qm-kicker` for a conceptual or system-level label. Use `.eyebrow` for case-study section labels and `.tag` for compact metadata.

Labels should answer one of these questions:

- Where am I in the process?
- What state is this in?
- What kind of evidence is this?
- Which system or version does this belong to?

### Decision cards

Use the established `.decision-card` pattern for meaningful product choices:

1. Decision
2. Reason
3. Tradeoff

This pattern embodies the “reveal the mechanism” principle and should be preferred over generic feature cards in case studies.

## Motion

- Motion must explain sequence, progress, spatial relationship, or state.
- Standard interaction transitions: 150–250ms.
- Editorial scroll reveals: up to 800ms; Monoscribe may be slower because its product character is deliberately calm.
- Seed Dropper uses a slightly mechanical easing; Signal uses a precise ease-out.
- Do not loop decorative motion unless it communicates live activity.
- All motion must respect `prefers-reduced-motion`.

## Voice and content

- Lead with the human problem, then the system response.
- Use concrete verbs: frame, map, test, place, flag, save, reuse.
- Explain why a decision was made, not only what was built.
- Name constraints and tradeoffs directly.
- Prefer “AI on request” and “evidence before sharing” over claims that automate judgment.
- Captions should explain what a visual proves.

## Files

| File | Role |
|---|---|
| `style-modern.css` | Base layout, typography, case-study structures, motion themes |
| `design-system.css` | Quiet Machines tokens, themed components, home thesis, specimens |
| `script-modern.js` | Navigation, progressive reveal, diagrams, and optional interactions |
| `pages/design-system.html` | Living reference and component specimens |

## Accessibility requirements

- Keep normal text at WCAG AA contrast or better.
- Preserve visible keyboard focus.
- Never communicate status with color alone; pair it with a label, icon, or text.
- Keep touch targets at least 40px in practical layouts.
- Provide useful alt text for evidence images and empty alt text for decoration.
- The system must remain complete with motion disabled.
