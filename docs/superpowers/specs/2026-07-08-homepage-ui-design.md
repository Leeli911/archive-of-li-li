# Homepage UI Design: Poetic Desktop Archive

Date: 2026-07-08
Project: The Archive of Li Li

## Goal

Optimize the homepage first screen by borrowing the emotional language of `whenwe.love`: floating browser-like windows, low-fidelity print textures, halftone/noise surfaces, and a private archive mood.

The final direction is a stable hybrid:

- Use the layout sensibility of option A: poetic desktop composition, large expressive identity type, layered windows.
- Use only the safest interaction ideas from option C: hover/focus lift, section highlighting, and click-to-open archive sections.
- Keep the existing archive section model and overlay opening behavior.

Stability is the first priority. The design must feel interactive without relying on fragile drag physics, random layout, or new animation dependencies.

## Non-Goals

- No draggable floating windows.
- No randomly generated window layout.
- No new animation library.
- No hidden interaction required to understand the site.
- No one-language-only layout. English and Chinese must both be designed and tested.

## Homepage Structure

The first viewport becomes a fixed poetic desktop scene:

1. A quieter interactive canvas remains in the background.
2. A stable group of browser-like windows sits behind and around the identity text.
3. The site identity sits in a dedicated text zone, never sharing the same vertical area as the descriptive line.
4. Archive entrances appear as clear chips/buttons and as clickable windows.
5. Existing `ArchiveOverlay` continues to handle section content.

The composition should preserve a hint of the next content state through visible section entrances, but it should not become a landing page or marketing hero.

## Visual Direction

Use a white/off-white paper ground with black/gray halftone texture and restrained pink accents inspired by the reference site.

Primary visual ingredients:

- Browser window chrome: small top bar, soft gray controls, title text, slight shadow.
- Print textures: pink halftone panes, gray monochrome panes, occasional blue technical pane.
- Large serif identity type for English.
- Controlled Songti/Kaiti-style Chinese title treatment for Chinese.
- Small monospace labels for archive/system language.

Avoid a beige-only or decorative-card-heavy feel. The page should read as an archival desktop, not a generic portfolio grid.

## Bilingual Typography Rules

This is a hard requirement: English and Chinese versions must not overlap, collide, or obscure each other.

English mode:

- The title uses a large serif italic treatment: `The Archive / of Li Li`.
- The title owns a fixed text zone with enough height for three lines.
- The role/summary text sits below the title zone or inside a separate window/note, never over the title.
- The title may be expressive, but line-height must not cause descenders or adjacent lines to collide.

Chinese mode:

- The Chinese title should not reuse the same huge italic English metrics.
- Use a more stable Chinese serif stack such as `"Songti SC"`, `"STSong"`, `"Noto Serif SC"`, serif.
- Use a smaller title size, higher line-height, and increased vertical spacing.
- Chinese and English subtitles should be separated into distinct lines or blocks.
- Navigation labels must keep fixed chip dimensions or wrap cleanly.

Shared rules:

- No text may overlap with another text block, window chrome, or clickable entrance at desktop, tablet, or mobile widths.
- Long words and Chinese labels must fit within buttons/chips.
- Do not scale font size directly with viewport width; use `clamp()` with sensible min/max values.
- Letter spacing stays at `0` or positive values.

## Interaction Design

Stable interactions to implement:

- Hover/focus on a window or chip lifts it slightly and increases contrast.
- Hover/focus on a section entrance highlights the matching archive label/window.
- Click on a window or chip opens the existing section overlay.
- Existing bloom/open transition may remain, but should feel quieter against the new desktop scene.
- Respect `prefers-reduced-motion`.

Interactions to avoid:

- Dragging windows.
- Physics-based window collisions.
- Randomized positions.
- Continuous heavy animation on many DOM elements.

## Component Plan

Create or refactor toward small, bounded pieces:

- `HomeCanvas`: keeps the canvas and top-level home section, but the copy/layout should move toward clearer subcomponents.
- `DesktopWindow`: reusable browser-like window shell with `title`, `tone`, `position`, `sectionId`, and children/label.
- `HomeIdentity`: bilingual title, role, and summary with separate English and Chinese layout rules.
- `HomeArchiveEntrances`: stable clickable chips for archive sections.

The existing `ArchiveFlowerMap` can be removed from the first viewport or made secondary if it competes with the desktop-window composition. The priority is a stable, legible desktop collage.

## Responsive Behavior

Desktop:

- Layered windows can overlap visually, but never cover essential text.
- Identity text sits left or center-left.
- Entrances sit along the lower band or right-side desktop area.

Tablet:

- Reduce window count or move windows behind the title with lower opacity.
- Keep chips in a 2-column or wrapped layout.
- Preserve minimum touch target size.

Mobile:

- Switch from overlapping desktop scene to a vertical stack.
- Show title, summary, then section windows/chips as stable blocks.
- Do not rely on absolute-position overlap for mobile readability.

## Accessibility

- All clickable windows must be keyboard-focusable.
- Visible focus states must match hover states.
- Section openings must remain available through text buttons/chips, not only decorative windows.
- Canvas and decorative textures should not interfere with screen reader navigation.
- Motion must reduce under `prefers-reduced-motion`.

## Verification

Before marking implementation complete:

- Run the production build.
- Open the site in a browser and inspect desktop and mobile widths.
- Test both English and Chinese modes.
- Confirm no title, subtitle, window label, or navigation chip overlaps.
- Confirm clicking each section entrance opens the correct archive overlay.
- Confirm keyboard focus can reach all entrances.
- Confirm the homepage remains readable with reduced motion.

## Approved Direction

User approved the stable hybrid direction on 2026-07-08:

- Prefer option A's layout and atmosphere.
- Add option C's interaction feel only where stable.
- Prioritize stability.
- Pay special attention to Chinese/English typography and layout so text does not overlap.
