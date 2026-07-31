# Seed Dropper System — Case Study Evaluation

_Evaluation date: 2026-06-27_  
_Page reviewed: `/pages/projects/seed-planter.html`_  
_Evaluator lens: product design / creative technology hiring portfolio_

---

## Overall rating: **8.0 / 10**

This is a **strong, hireable case study** and one of the best pages on your site. It shows end-to-end physical-digital thinking — problem framing, mechanism design, firmware, software, iteration, demo, and reflection — in a format that reads like a real project, not a school report.

It is not a perfect 10 yet. A few copy inconsistencies with the rest of the site, some thin sections, and performance hygiene keep it from top-tier polish. With a focused afternoon of fixes, this could credibly sit at **8.5–9.0**.

---

## Score breakdown

| Category | Score | Verdict |
|---|---:|---|
| **Content & narrative** | 8.5 / 10 | Clear story, honest scope, strong technical artifacts |
| **Layout & UX** | 8.0 / 10 | Scroll-story format works; chapter structure is scannable |
| **Visual polish** | 7.5 / 10 | Authentic workshop photos; consistent design system |
| **Professionalism** | 8.0 / 10 | Credible writing, real code, working demo — reads shipped |
| **Portfolio fit** | 8.5 / 10 | Excellent complement to Monoscribe + Signal |
| **Technical depth** | 9.0 / 10 | Among the strongest on the site for implementer credibility |
| **Performance & hygiene** | 6.0 / 10 | Heavy images/video; naming/copy drift with index cards |
| **Accessibility** | 7.5 / 10 | Good baseline; some nav gaps and missing image dimensions |

**Weighted overall: 8.0 / 10**

---

## Should this project be on your portfolio?

### Verdict: **Yes — keep it as a flagship**

This project earns its place for three reasons:

1. **It proves a different skill set than Signal.** Signal shows UX research, testing, and interaction design. Seed Dropper shows you can think in materials, motion, firmware, and software at the same time. Together they make you look like a product designer who can go deep, not just wireframe.

2. **It pairs naturally with Monoscribe.** Two hardware-leaning projects back-to-back signal "creative technologist who builds things" rather than "student who did one Arduino project."

3. **The narrative angle is memorable.** "Practicing resilience through reuse" is a clear point of view. Repurposing a broken 3D printer is more interesting than yet another app redesign case study.

### Best audience for this project

| Role type | How it reads |
|---|---|
| Product design (general) | Strong — shows problem → iteration → outcome |
| Creative technologist | Very strong — code + hardware + GUI |
| Hardware / prototyping roles | Very strong — bracket iterations, mechanism, wiring |
| Pure UX / UI roles | Good supporting project, not the lead |
| FAANG product design | Good breadth piece; lead with Signal or Monoscribe |

### When you might de-emphasize it

- If applying to a role that is **100% digital UX** with no hardware or systems interest, lead with Signal instead.
- If you add a third pure-digital flagship later, Seed Dropper can move to "Featured" slot #2 or #3 without leaving the site.

---

## Content evaluation

### What works well

**Narrative structure (10 chapters)**  
The page follows a logical arc recruiters expect:

1. Problem → 2. Concept → 3. What I Built → 4. Prototype → 5. Software → 6. Iterations → 7. Demo → 8. Challenges → 9. Outcome → 10. Reflection

This is textbook case-study structure. Each section has a job; nothing feels random.

**Honest scope**  
You correctly describe manual Pronterface jogging instead of pretending the printer runs autonomous G-code planting patterns. Lines like *"positioned by hand for now"* and *"working prototype / class project refinement"* build trust. Hiring managers prefer honest prototypes over oversold "products."

**Real artifacts, not mockups**  
- 8+ documentary photos from the build  
- Annotated `presentation.png` system diagram  
- Interactive 3D connector (`connecter_dowload.glb`)  
- Working demo video (`IMG_5651.mp4`)  
- Full Python GUI and ESP32 firmware source code  
- V1–V4 iteration timeline + bracket iteration photos  

This is the kind of evidence that separates portfolios from slide decks.

**Strong software section**  
The serial command protocol, pipeline (Pronterface → GUI → ESP32 → servo → soil), and embedded code blocks are excellent for creative-tech and early-product roles. They show you didn't just 3D-print a bracket — you built a control system.

**Reflection with point of view**  
The "Forms of Care" principles (materials, food systems, precision, maintenance) and the pull quote on resilience give the project a **why**, not just a **what**. That matters for design hiring.

### What could be stronger

**Some sections are thin relative to others**  
| Section | Depth |
|---|---|
| Software | Deep — code, protocol, pipeline, photos |
| Prototype | Deep — horizontal gallery, GLB, labeled diagram |
| Demo | Thin — video only, no context bullets |
| Outcome | Thin — one paragraph + one photo |
| Challenges | Medium — cards are brief |

The demo and outcome sections could use 2–3 bullet "results" (e.g., "Successfully dropped seeds at 5 test coordinates," "Gate timing tuned to 400ms," "7 bracket iterations before stable mount").

**Removed sections worth considering**  
Earlier versions included **Limits**, **Next Steps**, and standalone **Forms of Care**. Limits and next steps were partially merged into Reflection, but explicitly calling out constraints (manual motion, seed jamming, no Z-axis) and future work (autonomous G-code paths, hopper redesign) would strengthen credibility for senior reviewers.

**Minor copy oversell**  
The hero intro says the GUI *"places seeds precisely onto soil"* while the case study elsewhere correctly notes manual printer positioning. Tighten to: *"releases seeds at the coordinate you position the head over."*

**Caption mismatch**  
In the Software section, `ppythongui.jpeg` is captioned *"Pronterface — manual XY jog."* If that file is actually the Python GUI screenshot, the caption should match the image.

**Naming inconsistency**  
- Page `<title>`: "3D Printer Seed Planter"  
- On-page H1: "Seed Dropper System"  
- Cards on index/work: "3D Printer Seed Planter"  

Pick one name family and use it everywhere.

---

## Layout & UX evaluation

### What works well

**Scroll-story format**  
The Apple-style chapter layout solves the original whitespace problem. Sticky left rails (chapter number + title) plus scrolling content on the right make a long page feel intentional instead of empty.

**Motion with purpose**  
- Progress bar tracks story completion  
- Story beats fade/slide in on scroll  
- Software pipeline steps activate sequentially  
- Horizontal prototype gallery tells the build chronologically  

Animations support the narrative; they don't feel decorative for its own sake.

**Project snapshot bar**  
Role / Tools / Skills / Status / Core idea above the story gives recruiters a 10-second skim before they commit to scrolling.

**Demo CTA in hero**  
"Watch Demo" jumping to `#story-demo` is good UX — proof is one click away.

### Issues to watch

**Side nav vs. chapter count**  
The fixed story rail has **8 links** but the page has **10 numbered chapters**. Missing from the rail:
- `03 · What I Built` (`#story-built`)
- `08 · Challenges` (`#story-challenges`)

Add these two links so navigation matches the content.

**Chapter order vs. rail order**  
HTML order: Iterations (06) → Demo (07). Rail order matches. Good.

**Desktop-only story rail**  
Hidden below 1100px — correct choice. On tablet widths (900–1199px), labels are hidden to prevent overlap. Dots-only is fine, but consider a compact mobile chapter jump menu at the top of `.seed-story`.

**Page length**  
~490 lines of HTML, 10 sections, multiple code blocks. This is appropriate for a flagship, but a "Jump to demo" sticky button on mobile could help impatient reviewers.

**Hero image sizing**  
Recently fixed from full-bleed 85vh to a contained ~420–480px hero. Good balance now between impact and scroll depth.

---

## Professionalism evaluation

### Strengths

| Signal | Why it matters |
|---|---|
| Real photos in a real workshop | Authentic; not stock imagery |
| Actual source code | Proves implementation, not concept-only |
| Working video with fallback | Shows production thinking |
| Status: "working prototype" | Honest framing beats fake "shipped product" |
| End CTA tied to job search | Converts portfolio traffic into contact |
| SEO metadata present | Title, description, OG, canonical |

### Weaknesses

| Issue | Impact |
|---|---|
| Index/work cards still say **"G-code motion"** | Contradicts the case study; looks careless to detail-oriented reviewers |
| Index/work cards use **placeholder thumbnails** | First impression before the deep page is "draft" |
| Meta keywords include **G-code** | Minor SEO/accuracy drift |
| Snapshot Tools lists **G-code** | Should say Pronterface / manual jog |
| No GitHub link to repo (if one exists) | Optional, but common for creative-tech portfolios |
| No JSON-LD `CreativeWork` schema | Missed structured-data opportunity |

---

## Is the project itself "good enough"?

**Yes.** For a student / early-career portfolio, this is **above average** in substance.

What makes the *project* strong:
- Clear problem-solution fit (reuse idle hardware)
- Multi-domain execution (CAD, 3D print, electronics, firmware, Python)
- Visible iteration (V1–V4, 7 brackets)
- Demonstrable outcome (video proof)
- Thoughtful framing (sustainability, resilience)

What keeps it from "professional product" tier (and that's okay to say honestly):
- Manual positioning, not automated planting paths
- Class-project scope and timeline constraints
- Mechanism reliability (jamming mentioned in iterations) not fully resolved in outcome

**For portfolio purposes, lean into the prototype honesty.** Reviewers don't expect a commercial agricultural robot from a class project. They expect clear thinking, iteration, and proof you can build.

---

## Comparison to your other flagships

| Dimension | Monoscribe | Seed Dropper | Signal |
|---|---|---|---|
| Depth | Highest (689+ lines) | High (490 lines) | High (582 lines) |
| Interactivity | GLB + tabs | GLB + scroll gallery + pipeline | Figma prototype link |
| Visual polish | Some placeholders remain | Real photos throughout | Some wireframe placeholders |
| Narrative clarity | Strong | **Strongest scroll format** | Strong (testing-heavy) |
| Role signal | Hardware product designer | Creative technologist | UX / product designer |
| Honesty about limits | Good | **Very good** | Good |

**Recommendation:** Keep Seed Dropper as featured case study #2 (after Monoscribe) or #2 (after Signal) depending on the job — but **always keep it featured**.

---

## Priority improvements (ranked)

### P0 — Do before sharing this link widely (~1–2 hours)

1. **Fix card copy drift** on `index.html`, `pages/work.html`, `pages/all-projects.html` — remove "G-code motion"; say manual Pronterface positioning + ESP32 dropper.
2. **Replace placeholder thumbnails** on index/work with `IMG_5925.jpeg` or `presentation.png`.
3. **Unify naming** — pick "Seed Dropper System" or "3D Printer Seed Planter" site-wide.
4. **Add `#story-built` and `#story-challenges`** to the story rail.
5. **Fix Software section caption** if `ppythongui.jpeg` is not Pronterface.
6. **Compress assets** — hero JPEG, gallery photos, and 15 MB demo MP4 (target: video under 5 MB, photos under 500 KB each).

### P1 — Would raise the page to ~8.5–9.0 (~2 hours)

7. **Expand Demo + Outcome** with 3 measurable result bullets each.
8. **Restore a short "Limits & next steps" block** in Reflection (manual motion, jamming, future autonomous paths).
9. **Add `width` / `height` on images** to prevent layout shift.
10. **Add JSON-LD `CreativeWork`** schema for this page.
11. **Tighten hero copy** so it doesn't overclaim precision from automation.

### P2 — Nice polish

12. Mobile chapter jump menu at top of story.
13. Link to GitHub repo or PDF engineering doc if available.
14. Custom OG image for this case study (not generic site OG).

---

## Final read

**Seed Dropper is absolutely worth having on your site.** It is one of your three strongest pieces of evidence that you design *and* build. The new scroll-story layout makes it feel modern and intentional. The content is honest, specific, and backed by real artifacts.

The gap between "good" and "great" is mostly **consistency and compression** — making sure the homepage cards tell the same story as the deep page, filling in two thin sections, and shaving megabytes off media.

For a hiring manager evaluating you for product design or creative technology: **this page would help you, not hurt you.** It shows resourcefulness, systems thinking, and the ability to ship a working prototype under constraints — exactly what early-stage hardware-adjacent roles look for.

---

## One-line summary

> **8/10 — A credible, well-told hardware case study with real proof; fix copy drift, add two nav links, and compress media to make it interview-ready.**
