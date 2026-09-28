---
name: Settle
description: A quiet, bilingual shared-expense ledger built around unmistakable debt direction.
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
    padding: "0 20px"
    height: "48px"
  button-create-dark:
    backgroundColor: "{colors.accent-dark}"
    textColor: "{colors.ink-dark}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
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
  modal:
    backgroundColor: "{colors.surface-light}"
    textColor: "{colors.ink-light}"
    rounded: "{rounded.modal}"
    width: "32rem"
---

# Design System: Settle

## Overview

**Creative North Star: "The Quiet Shared Ledger"**

Settle should feel like a small, trustworthy record lying open on a calm desk: direct, legible, and free of accounting theater. Its Apple-like restraint comes from generous whitespace, precise type, native-feeling controls, and a neutral material system rather than ornamental surfaces. The interface operates at a comfortable density, with one strong action and no competing accents.

Every expense is a directional relationship, so payer, beneficiary, arrow, and amount form the visual anchor. Balances translate the same relationship into plain language instead of presenting abstract totals. English and Persian are equal expressions of the same system: layout uses logical properties, icons reverse when direction carries meaning, and numeral-heavy data remains stable and scannable in either direction.

**Key Characteristics:**

- Quiet neutral canvases with a single purposeful blue action color
- Large, tightly tracked headings balanced by highly readable body copy
- Border-led ledger structure instead of nested cards
- Explicit directional relationships and tabular financial numerals
- Pill-shaped actions and selectors with softly rounded fields and dialogs
- Responsive LTR/RTL behavior with native-feeling accessibility states

## Colors

Warm-near-neutral light surfaces and graphite dark surfaces keep the ledger calm; blue is intentionally scarce so creation and focus remain unmistakable.

### Primary

- **Action Blue:** `accent-light` and `accent-dark` are reserved for the main create/save action, focus treatment, selection, and small informational icons.

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

**The Theme Pair Rule.** Always consume semantic theme pairs together; never hard-code a light neutral into a dark surface or treat dark mode as an inverted afterthought.

## Typography

**Display Font:** Anjoman with system sans-serif fallbacks  
**Body Font:** Anjoman with system sans-serif fallbacks

**Character:** Anjoman is the entire interface voice. Its variable weight range supports both scripts without a stylistic handoff, while the first stylistic set and tabular numerals keep the ledger polished and financial data aligned.

### Hierarchy

- **Display:** Semibold, fluid, compact leading, and tight tracking; use for one page-level statement only.
- **Headline:** Semibold with lightly tightened tracking; use for section headings such as Activity and Current balances.
- **Title:** Semibold and compact; use for dialog titles and strong secondary headings.
- **Body:** Regular with generous leading; use for descriptions and explanatory content, generally constrained to about 40rem for comfortable reading.
- **Label:** Medium and compact; use for buttons, tabs, field labels, and small navigation.

### Named Rules

**The One Typeface Rule.** Keep English, Persian, labels, amounts, and narrative text in Anjoman; hierarchy comes from scale, weight, spacing, and color rather than a second typeface.

**The Financial Numeral Rule.** Amounts and count-bearing UI use tabular numerals so changing values never disturb alignment.

## Layout

The primary ledger uses a centered container capped at 72rem, while the explanatory About surface narrows to 64rem. Page gutters are 1.25rem on compact screens and 2rem from the small breakpoint upward. Major page sections use 2.5–5rem of vertical breathing room; rows remain denser at 1.25–1.5rem vertically so the transaction history scans as one continuous record.

At 40rem, hero content moves from a stacked composition to an aligned heading/action row, desktop navigation appears, ledger rows separate descriptive and numeric columns, and modal actions align horizontally. At 48rem, the About page introduces its multi-column explanatory grids. Below these thresholds, amounts remain prominent, directional context is repeated where needed, and the add-expense dialog becomes a bottom sheet with a full-width edge.

Use logical margin, padding, border, and alignment properties. In RTL, content order and text alignment should follow the document while direction-bearing arrows reverse; do not mirror neutral icons or force physical left/right spacing.

**The Continuous Ledger Rule.** Transaction and balance collections are bounded by shared horizontal dividers; rows are not individual cards.

**The Direction Survives Compression Rule.** Responsive changes may restack payer, beneficiary, and amount, but they may never remove the user’s ability to tell who owes whom.

## Elevation & Depth

The system is flat by default. Hierarchy comes from tonal separation, sticky translucency, borders, and whitespace. Shadows appear only where a surface truly separates from the page: the modal uses a broad ambient lift, active segmented controls use a very small shadow, the primary create action carries a restrained blue-tinted glow, and About-page flow chips use a nearly imperceptible ambient shadow.

### Shadow Vocabulary

- **Modal Lift:** A broad, soft shadow separates the dialog from its dimmed and lightly blurred backdrop.
- **Create Glow:** A compact blue-tinted shadow gives the primary creation action just enough physical presence.
- **Selected Tab:** A minimal ambient shadow distinguishes the active tab from its tonal track.
- **Flow Chip:** A shallow shadow allows architecture nodes to read as tokens without turning them into cards.

### Named Rules

**The Flat-by-Default Rule.** Do not add shadows to ledger rows, content sections, inputs, or ordinary containers; use spacing and hairline borders first.

## Shapes

Geometry is soft but disciplined. Action buttons, tabs, avatars, icon controls, and compact flow nodes are fully pill-shaped or circular. Inputs use gently rounded 12px corners, the brand mark uses a tighter 10px squircle, and dialogs use 16px corners on desktop while compact screens retain only the top corners to behave like a native bottom sheet. Borders are one-pixel hairlines and should describe separation, not decoration.

**The Radius Has a Job Rule.** Full pills signal actions, selection, or identity; medium corners signal fields and temporary surfaces. Do not round whole ledger sections simply to make them look like cards.

## Components

### Buttons

- **Shape:** Primary, secondary, and ghost text actions are pill-shaped; icon-only controls are circular with at least a 40px target.
- **Primary:** Action Blue with high-contrast light text, medium-weight labeling, and compact horizontal padding. The page-level create button is 48px tall; dialog actions are 44px tall.
- **Hover / Focus:** Primary actions lift by 2px with a gentle 300ms ease and return to rest when active. All controls receive the shared visible focus outline; reduced-motion preferences collapse animation and transition duration.
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

The 64px sticky header uses a translucent canvas, backdrop blur, and a softened bottom divider. Desktop navigation is a restrained segmented pill; the active destination is surfaced rather than colored blue. Compact navigation moves to a plain second row so destinations remain readable without crowding the brand and utility controls.

### Ledger Rows

Each row pairs a human-readable relationship with a strong, tabular amount. Expense rows lead with payer identity, description, beneficiary, and date; balance rows overlap debtor and creditor avatars and express the result as “[debtor] owes [creditor].” The amount is always aligned to the logical end and never competes with an extra status badge.

### Add Expense Dialog

The dialog makes direction the first field group: payer, a directional arrow, then beneficiary, followed immediately by plain-language helper copy. It traps focus, closes with Escape when safe, restores focus to the invoking action, makes the background inert, and becomes a bottom sheet on compact screens. Motion uses the shared gentle ease and is removed for reduced-motion users.

## Do's and Don'ts

### Do:

- **Do** reserve Action Blue for primary creation, focus, selection, and sparse informational cues.
- **Do** state balances as a plain-language debtor-to-creditor relationship next to a tabular amount.
- **Do** use dividers, whitespace, and type hierarchy to structure the ledger.
- **Do** test every responsive state in both English LTR and Persian RTL.
- **Do** preserve visible focus, semantic labels, keyboard tab behavior, focus trapping, and reduced-motion handling.

### Don't:

- **Don't** wrap every transaction, balance, or informational section in a rounded card.
- **Don't** use blue for active navigation, decorative emphasis, or competing secondary actions.
- **Don't** abbreviate debt direction into an ambiguous signed number or color-only indicator.
- **Don't** introduce a second typeface, gratuitous gradients, heavy shadows, or glossy decoration.
- **Don't** implement RTL by mechanically mirroring every icon or by using physical left/right spacing.
