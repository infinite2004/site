# Main Projects

This portfolio highlights three projects that demonstrate product design across physical prototyping, interaction design, research, and technical implementation.

## 1. Monoscribe

**Monoscribe** is a distraction-free E-Ink writing device designed for focused note-taking, file navigation, and quiet AI assistance. It explores how a digital writing tool can retain the benefits of digital storage and organization without the notifications, visual clutter, and context switching of a general-purpose laptop or tablet.

The device combines an E-Ink display, keyboard input, embedded electronics, file management, a custom 3D-printed enclosure, and lightweight AI features. Its keyboard-first interface supports immediate writing and fast navigation, while AI tools remain optional and appear only when requested.

The project developed from early E-Ink laptop experiments into a functional physical-digital prototype. Four major iterations refined the system architecture, internal hardware layout, enclosure, refresh behavior, and interaction model. The current prototype demonstrates an end-to-end product process spanning research, UX, electronics, software, CAD, fabrication, and testing.

- **Role:** Product Designer, Prototyper, and Developer
- **Timeline:** Spring 2026
- **Tools:** E-Ink, ESP32/Raspberry Pi, CAD, 3D printing, Python, and Arduino
- **Outcome:** A functional prototype with keyboard navigation, digital note management, a manufacturable enclosure, and focused AI assistance
- **Status:** Ongoing refinement

[View the Monoscribe case study](pages/projects/monoscribe.html)

## 2. Seed Dropper System

The **Seed Dropper System** repurposes a broken 3D printer as a small-scale automated planting machine. The project began with two observations: planting seeds by hand can be repetitive and inconsistent, while discarded 3D printers may still contain accurate, usable motion systems.

Instead of building a new positioning system, the project reuses the printer's X/Y gantry to move above a soil bed. A custom 3D-printed hopper, bracket, tube, and gate form the seed-release mechanism. At each programmed coordinate, a Python interface sends a command to an ESP32, which controls an MG90S servo to release seeds before the printer moves to the next position.

Developing the system required mechanical, electronic, and software work to function together. Several iterations addressed alignment, tolerances, seed flow, servo timing, and repeatability. The result is a working planting sequence that demonstrates how creative reuse can turn idle fabrication equipment into a new tool.

- **Role:** Designer, Fabricator, and Developer
- **Tools:** ESP32, MG90S servo, Python, G-code, Pronterface, CAD, and 3D printing
- **Outcome:** A working prototype that positions the printer head, pauses at defined coordinates, and releases seeds through a controlled mechanism
- **Core idea:** Sustainability through adaptation and reuse
- **Status:** Working prototype with opportunities for further refinement

[View the Seed Dropper System case study](pages/projects/seed-planter.html)

## 3. Signal

**Signal** is a cross-platform trust assistant that helps social media users evaluate suspicious AI-generated political content. It responds to a growing verification gap: misleading content can spread faster than users can check it, especially during election periods.

Signal works through two connected layers. A standalone application gives users control over monitored platforms, alerts, privacy, and exposure history. An in-feed browsing layer places trust labels directly beside suspicious content, explains why a post was flagged, presents supporting evidence, and introduces warnings before sharing.

The project followed an iterative product design process that included problem framing, persona and journey development, competitive research, low- and high-fidelity prototyping, usability testing, and refinement. A central design decision was to support the user's judgment rather than block content or make decisions on their behalf. This keeps the experience transparent and preserves user agency.

- **Role:** Product and UX Designer
- **Tools:** Figma, wireframing, interactive prototyping, journey mapping, and usability testing
- **Outcome:** A high-fidelity trust-and-safety product concept with live labels, evidence, share warnings, and user-controlled monitoring settings
- **Target users:** Everyday social media users who want context without becoming professional fact-checkers
- **Design principle:** Explain the risk, provide evidence, and leave the final decision with the user

[View the Signal case study](pages/projects/signal.html)

## What These Projects Demonstrate

Together, the three projects show a broad but connected design practice:

- **Monoscribe** combines hardware, software, interaction design, and enclosure development into a focused consumer device.
- **Seed Dropper System** demonstrates physical computing, mechanism design, automation, and sustainable reuse.
- **Signal** applies research, product strategy, interface design, and usability testing to a complex trust-and-safety problem.

Across all three projects, the consistent approach is to identify a meaningful problem, prototype the complete experience, test the difficult parts, and refine the result through iteration.
