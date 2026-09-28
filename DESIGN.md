---
name: Settle
description: A Persian-first shared-expense ledger that turns group debts into clear final payments.
colors:
  canvas-light: "rgb(247 247 245)"
  surface-light: "rgb(255 255 255)"
  ink-light: "rgb(28 28 30)"
  muted-light: "rgb(99 99 104)"
  line-light: "rgb(224 224 221)"
  accent-light: "rgb(34 113 246)"
  canvas-dark: "rgb(16 16 17)"
  surface-dark: "rgb(28 28 30)"
  ink-dark: "rgb(245 245 247)"
  muted-dark: "rgb(174 174 181)"
  line-dark: "rgb(55 55 58)"
  accent-dark: "rgb(64 140 255)"
  loop-coral: "#FF7A64"
  loop-blue: "#5E8BFF"
  loop-green: "#38A87A"
  loop-violet: "#9B72E8"
  error-wash: "rgb(239 68 68 / 0.1)"
  error-light: "rgb(185 28 28)"
  error-dark: "rgb(252 165 165)"
typography:
  display:
    fontFamily: "Anjoman, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 6vw, 4.75rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.04em"
    fontFeature: "'ss01', 'tnum'"
  headline:
    fontFamily: "Anjoman, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.333
    letterSpacing: "-0.025em"
    fontFeature: "'ss01', 'tnum'"
  title:
    fontFamily: "Anjoman, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "-0.02em"
    fontFeature: "'ss01', 'tnum'"
  body:
    fontFamily: "Anjoman, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "normal"
    fontFeature: "'ss01', 'tnum'"
  label:
    fontFamily: "Anjoman, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "normal"
    fontFeature: "'ss01', 'tnum'"
rounded:
  soft: "8px"
  brand: "10px"
  field: "12px"
  modal: "16px"
  network-card: "32px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "20px"
  2xl: "24px"
  3xl: "32px"
  4xl: "40px"
  5xl: "48px"
  6xl: "64px"
  7xl: "80px"
components:
  button-create:
    backgroundColor: "{colors.accent-light}"
    textColor: "{colors.surface-light}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "48px"
  button-create-dark:
    backgroundColor: "{colors.accent-dark}"
    textColor: "{colors.ink-dark}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "48px"
  button-ink:
    backgroundColor: "{colors.ink-light}"
    textColor: "{colors.surface-light}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "44px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.muted-light}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "44px"
  field:
    backgroundColor: "{colors.canvas-light}"
    textColor: "{colors.ink-light}"
    typography: "{typography.body}"
    rounded: "{rounded.field}"
    padding: "0 16px"
    height: "48px"
  tab-active:
    backgroundColor: "{colors.surface-light}"
    textColor: "{colors.ink-light}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
  theme-toggle:
    backgroundColor: "transparent"
    textColor: "{colors.muted-light}"
    rounded: "{rounded.pill}"
    height: "44px"
    width: "44px"
  settlement-loop:
    backgroundColor: "{colors.surface-light}"
    textColor: "{colors.muted-light}"
    rounded: "{rounded.network-card}"
    width: "340px"
    height: "280px"
  scenario-row:
    backgroundColor: "transparent"
    textColor: "{colors.ink-light}"
    typography: "{typography.body}"
    padding: "20px 0"
  modal:
    backgroundColor: "{colors.surface-light}"
    textColor: "{colors.ink-light}"
    rounded: "{rounded.modal}"
    width: "32rem"
---

# Design System: Settle

## Overview

**Creative North Star: "The Quiet Shared Ledger"**

Settle should feel like a small, trustworthy record lying open on a calm desk: direct, legible, and free of accounting theater. Its Apple-like restraint comes from generous whitespace, precise type, native-feeling controls, and a neutral material system rather than ornamental surfaces. Persian RTL on the light theme is the intended cold-start experience; English LTR and dark mode are first-class continuations of the same world.

Every expense is a directional relationship, so payer, beneficiary, arrow, and amount form the visual anchor. A luminous four-person settlement network turns group-wide cancellation into the product’s one memorable visual metaphor: payment particles travel curved paths toward a glowing settled core while floating amount chips show the inputs being simplified. A separate dual-orbit mark introduces the product while data loads, while a restrained blue line-shadow gives one phrase in the hero title a distinct but quiet signature.

**Key Characteristics:**

- Quiet neutral canvases with a single purposeful blue action color
- Large, tightly tracked headings balanced by highly readable body copy
- Border-led ledger structure instead of nested cards
- Explicit directional relationships and tabular financial numerals
- A luminous settlement network plus a distinct compact orbit loader
- Purposeful 200ms control motion on theme icons and create-action feedback
- Pill-shaped actions and selectors with softly rounded fields and dialogs
- Persian/light as the default with responsive LTR/RTL and dark-theme parity

## Colors

Warm-near-neutral light surfaces and graphite dark surfaces keep the ledger calm; blue is intentionally scarce so creation and focus remain unmistakable.

### Primary

- **Action Blue:** `accent-light` and `accent-dark` are reserved for the main create/save action, focus treatment, selection, and small informational icons.

### Secondary

- **Settlement Quartet:** `loop-coral`, `loop-blue`, `loop-green`, and `loop-violet` identify people and payment particles in the settlement network only; they are not a general-purpose UI palette.

### Tertiary

- **Error Wash:** `error-wash` provides a quiet alert surface without turning validation into a dominant panel.
- **Error Text:** `error-light` and `error-dark` preserve readable validation copy in their respective themes.

### Neutral

- **Soft Canvas:** `canvas-light` and `canvas-dark` form the page ground and inset field surface.
- **Clean Surface:** `surface-light` and `surface-dark` identify active tabs, dialogs, and the few elements that need a distinct plane.
- **Ledger Ink:** `ink-light` and `ink-dark` carry headings, amounts, and decisive copy.
- **Supporting Graphite:** `muted-light` and `muted-dark` carry metadata, helper text, timestamps, and inactive states.
- **Hairline Divider:** `line-light` and `line-dark` separate ledger rows and page sections without creating boxes.

### Named Rules

**The One Blue Action Rule.** Blue identifies creation, focus, and the occasional informational cue; it must not become a general decoration or compete across multiple actions.

**The Light-First Theme Pair Rule.** Light is the default state, but every semantic neutral and accent must still consume its dark-theme pair; never hard-code a light neutral into a dark surface.

**The Illustration Color Containment Rule.** The coral, blue, green, and violet node colors belong to the settlement network and avatars; do not spread them into navigation, buttons, or decorative page chrome.

## Typography

**Display Font:** Anjoman with system sans-serif fallbacks  
**Body Font:** Anjoman with system sans-serif fallbacks

**Character:** Anjoman is the entire interface voice. Its variable weight range supports both scripts without a stylistic handoff, while the first stylistic set and tabular numerals keep the ledger polished and financial data aligned.

### Hierarchy

- **Display:** Semibold, fluid, compact leading, and tight tracking; use for one page-level statement only.
- **Headline:** Semibold with lightly tightened tracking; use for section headings such as Activity, Final payments, and Test scenarios.
- **Title:** Semibold and compact; use for dialog titles and strong secondary headings.
- **Body:** Regular with generous leading; use for descriptions and explanatory content, generally constrained to about 40rem for comfortable reading.
- **Label:** Medium and compact; use for buttons, tabs, field labels, and small navigation.

### Named Rules

**The One Typeface Rule.** Keep English, Persian, labels, amounts, and narrative text in Anjoman; hierarchy comes from scale, weight, spacing, and color rather than a second typeface.

**The Financial Numeral Rule.** Amounts and count-bearing UI use tabular numerals so changing values never disturb alignment.

**The One Shadowed Phrase Rule.** Only the hero’s outcome phrase receives the small blue line-shadow; never apply the effect to an entire heading or repeat it elsewhere on the page.

## Layout

The primary ledger uses a centered container capped at 72rem, while the explanatory About surface narrows to 64rem. Page gutters are 1.25rem on compact screens and 2rem from the small breakpoint upward. The home hero becomes a two-column heading/illustration composition only at 64rem, keeping the 340px × 280px settlement network below the copy on narrower screens. Ledger and scenario rows remain dense at 1.25–1.5rem vertically so each bordered collection scans as one record.

At 40rem, desktop navigation appears, ledger rows separate descriptive and numeric columns, modal actions align horizontally, and test scenarios resolve into title/input/result columns. At 48rem, the About page introduces its multi-column explanatory grids. The About hero intentionally stays compact—small page-title scale, short byline, and tighter top/bottom spacing—so architecture remains the content focus. Below these thresholds, amounts remain prominent, directional context is repeated where needed, and the add-expense dialog becomes a bottom sheet with a full-width edge.

Use logical margin, padding, border, and alignment properties. In RTL, content order and text alignment follow the document while direction-bearing arrows reverse. The About architecture flow keeps its source-to-destination sequence and rotates only the connecting arrows for Persian; do not mirror neutral icons or reverse the data array.

**The Continuous Ledger Rule.** Transaction, final-payment, and test-scenario collections are bounded by shared horizontal dividers; rows are not individual cards.

**The Direction Survives Compression Rule.** Responsive changes may restack payer, beneficiary, and amount, but they may never remove the user’s ability to tell who owes whom.

## Elevation & Depth

The system is flat by default. Hierarchy comes from tonal separation, sticky translucency, borders, and whitespace. Shadows appear only where a surface truly separates from the page: the modal uses a broad ambient lift, active segmented controls use a very small shadow, the primary create action carries a restrained blue-tinted glow, and About-page flow chips use a nearly imperceptible ambient shadow. The settlement network is the deliberate exception: a translucent surface, ambient blue card lift, blurred corner light fields, glowing payment particles, and a breathing settled core create one concentrated moment of depth. The hero’s accented word uses a crisp offset line-shadow rather than blur or elevation.

### Shadow Vocabulary

- **Modal Lift:** A broad, soft shadow separates the dialog from its dimmed and lightly blurred backdrop.
- **Create Glow:** A compact blue-tinted shadow gives the primary creation action just enough physical presence.
- **Selected Tab:** A minimal ambient shadow distinguishes the active tab from its tonal track.
- **Flow Chip:** A shallow shadow allows architecture nodes to read as tokens without turning them into cards.
- **Title Line Shadow:** A crisp accent echo offsets a single hero phrase by 0.045em at 22% opacity.
- **Network Card Lift:** A broad blue ambient shadow separates the luminous settlement network from the canvas.
- **Settled Core Glow:** The central result breathes between two soft blue shadow states while remaining fully legible.

### Named Rules

**The Flat-by-Default Rule.** Do not add shadows to ledger rows, content sections, inputs, or ordinary containers; use spacing and hairline borders first.

## Shapes

Geometry is soft but disciplined. Action buttons, tabs, avatars, icon controls, and compact flow nodes are fully pill-shaped or circular. Inputs use gently rounded 12px corners, the brand mark uses a tighter 10px squircle, dialogs use 16px corners on desktop, and the one signature settlement card uses a generous 32px silhouette. Concentric circles, orbit lines, and circular people nodes give the network its own coherent geometry. Borders are one-pixel hairlines and should describe separation, not decoration.

**The Radius Has a Job Rule.** Full pills signal actions, selection, or identity; medium corners signal fields and temporary surfaces. Do not round whole ledger sections simply to make them look like cards.

## Components

### Buttons

- **Shape:** Primary, secondary, and ghost text actions are pill-shaped; icon-only controls are circular with at least a 40px target.
- **Primary:** Action Blue with high-contrast light text, medium-weight labeling, and 24px horizontal padding. The page-level create button is 48px tall; dialog actions are 44px tall.
- **Hover / Focus:** The page-level create action keeps one stable, Persian-safe label beside one directional arrow. Over 200ms, the button lifts by 2px, deepens its blue shadow, softens its background, and moves the arrow 4px in the reading direction; active returns it to rest. All controls receive the shared visible focus outline, and reduced-motion preferences collapse transition duration.
- **Secondary / Ghost:** Ink-filled buttons are reserved for strong non-create destinations such as opening API documentation or retrying. Ghost actions use muted text and gain only a faint tonal hover surface.

### Chips

- **Style:** Segmented tabs live inside a faint pill track. The active option becomes a clean surface with ink text and a small shadow; inactive options stay muted and reveal ink on hover.
- **State:** The tab pattern exposes `tablist`, `tab`, selection, panel ownership, roving tab order, and left/right keyboard navigation.

### Cards / Containers

- **Corner Style:** Ordinary content remains unrounded and open. Only flow nodes and the modal create discrete rounded surfaces.
- **Background:** Content sits directly on the canvas; surface color is reserved for active selection and temporary elevation.
- **Shadow Strategy:** Flat by default, following the sparse vocabulary above.
- **Border:** Page sections and ledger collections use shared hairline dividers.
- **Internal Padding:** Ledger rows use compact vertical rhythm; temporary surfaces use 20–24px inset padding.

### Inputs / Fields

- **Style:** Canvas-filled, 48px-tall fields with 12px corners, an inset hairline, and at least 16px horizontal padding.
- **Focus:** The inset hairline becomes a two-pixel Action Blue ring, reinforced by the global visible focus outline for keyboard interaction.
- **Error / Disabled:** Errors use a quiet red wash with theme-aware text. Disabled and saving controls retain their shape while reducing opacity; saving also uses a wait cursor.

### Navigation

The 64px sticky header uses a translucent canvas, backdrop blur, and a softened bottom divider. Desktop navigation is a restrained segmented pill; the active destination is surfaced rather than colored blue. Compact navigation moves to a plain second row so destinations remain readable without crowding the brand and utility controls. Language and theme utilities use 44px circular targets. Theme colors apply immediately; only the sun and moon icons rotate, scale, and fade over 200ms. Reduced-motion users receive an effectively immediate icon swap.

### Settlement Network

The hero’s 340px × 280px luminous card contains four circular people nodes around two concentric rings. Three SVG payment particles travel independent curved paths: blue across the upper arc, green across the lower arc, and coral through the middle. Floating `+$45` and `−$35` chips drift on opposite corners while the 106px center breathes around a checkmark, `$0`, and localized **تسویه / settled** microcopy. A second localized line—**بدهی‌ها ساده می‌شوند / balances converge**—anchors the card’s purpose. The network is explanatory product identity, not a generic dashboard chart, and all particles, ring rotation, chip drift, and core breathing become static under reduced motion.

### Product Loader

Initial loading uses a separate 144px mark rather than shrinking the hero card. A glowing `$0` core sits inside two circular tracks: a dashed outer orbit with a blue token rotates forward every 2.4 seconds, while a smaller green inner orbit rotates in reverse every 3.2 seconds. The whole mark retains the gentle 1.6-second loader pulse and sits above localized status copy. Reduced motion freezes both orbits and collapses the pulse.

### Ledger Rows

Each row pairs a human-readable relationship with a strong, tabular amount. Expense rows lead with payer identity, description, beneficiary, and date; final-payment rows overlap debtor and creditor avatars and express the result as “[debtor] owes [creditor].” Rows enter with a 520ms rise-and-deblur animation staggered by 75ms, then remain still. The amount is always aligned to the logical end and never competes with an extra status badge.

### Test Scenarios

The bottom test-scenario section proves group-wide cancellation with two border-led examples: reciprocal debt reduces to one final payment, while a closed three-person loop reduces to no payment. Each row aligns the scenario name, directional input, and a check-marked result; the input explicitly declares its own direction so English and Persian examples remain correct inside either page direction.

### Add Expense Dialog

The dialog makes direction the first field group: payer, a directional arrow, then beneficiary, followed immediately by plain-language helper copy. It traps focus, closes with Escape when safe, restores focus to the invoking action, makes the background inert, and becomes a bottom sheet on compact screens. Motion uses the shared gentle ease and is removed for reduced-motion users.

### Product Language

Use **Final payments** (Persian: **پرداخت‌های نهایی**) for the computed group-wide outcome in headings, explanations, architecture copy, scenarios, and empty states. “Balance” may remain an internal/API concept or a compact tab label, but it must not frame the user’s outcome as a static account total.

## Do's and Don'ts

### Do:

- **Do** reserve Action Blue for primary creation, focus, selection, and sparse informational cues.
- **Do** state final payments as a plain-language debtor-to-creditor relationship next to a tabular amount.
- **Do** use dividers, whitespace, and type hierarchy to structure the ledger.
- **Do** begin an unsaved visit in Persian RTL and light mode, then preserve explicit user choices.
- **Do** test every responsive state, motion state, and directional connector in both English LTR and Persian RTL.
- **Do** preserve visible focus, semantic labels, keyboard tab behavior, focus trapping, and reduced-motion handling.

### Don't:

- **Don't** wrap every transaction, final payment, scenario, or informational section in a rounded card.
- **Don't** use blue for active navigation, decorative emphasis, or competing secondary actions.
- **Don't** abbreviate debt direction into an ambiguous signed number or color-only indicator.
- **Don't** call the computed group-wide result a balance when the user-facing concept is a final payment.
- **Don't** animate lists, settlement-network particles, loader orbits, or theme-icon morphs when reduced motion is requested.
- **Don't** introduce a second typeface, gratuitous gradients, heavy shadows, or glossy decoration.
- **Don't** implement RTL by mechanically mirroring every icon or by using physical left/right spacing.
