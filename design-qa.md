# Workshop cards design QA

## Comparison target

- Source visual truth: `.codex-audit/01-workshop-current.png` and `.codex-audit/04-workshop-mobile.png`.
- Selected redesign direction: preserve the Vibe-6 lime, pink, pixel-type accents, heavy outline, and rounded geometry while reducing card height and improving scan order.
- Implementation screenshots: `.codex-audit/12-workshop-no-details-desktop.png` and `.codex-audit/10-workshop-after-mobile-top.png`.
- Combined comparison evidence: `.codex-audit/09-workshop-before-after.png`.
- State: workshop list with descriptions fully visible.

## Capture normalization

- Desktop CSS viewport: `1750 x 1173`; captured content: `1740 x 1166` at browser density 1.
- Mobile CSS viewport: `390 x 844`; captured content: `380 x 822` at browser density 1.
- Source and implementation captures use matching browser density and the same route/content.
- The desktop before/after captures intentionally show different vertical ranges because reducing density is the redesign goal. The combined image compares the same workshop-card system and Slot B content at the same pixel scale.

## Findings

- No actionable P0, P1, or P2 findings remain.
- Fonts and typography: the display face remains on page/slot headings and large numerals; speaker names move to the sans face for faster scanning. Titles are visually dominant, descriptions use a calmer 1.5 line height, and utility labels are no longer low-contrast 11px text.
- Spacing and layout rhythm: the separate 220px registration rail is removed. Counts now sit in compact outlined pills, card borders reduce from 4px to 3px, and the longest mobile card remains substantially shorter than the original even with its complete description visible.
- Colors and visual tokens: the original ink, paper, lime, pink, grid, and violet accent colors are preserved. No new palette or gradient was introduced.
- Image quality and asset fidelity: this surface contains no raster imagery or custom icons. Existing initials, grid treatment, and typography remain code-native parts of the established design system; no asset substitutions were made.
- Copy and content: workshop titles, speakers, descriptions, counts, dates, and times are unchanged. Descriptions remain fully visible without a redundant disclosure control.
- Responsive behavior: hero statistics now share one row at 390px, keeping the registration CTA and start of Slot A close to the first viewport. Count pills and speaker names wrap without horizontal overflow.
- Interaction and accessibility: no redundant interactive control remains inside the cards. No browser console errors were present during the tested flow.

## Full-view comparison evidence

The combined desktop comparison confirms that the redesign keeps the page's recognizable card silhouette and accent colors while fitting substantially more workshops into the same viewport. The mobile captures confirm the same hierarchy and density improvement at 390px.

## Focused region comparison

A separate crop was not required: at `1740 x 1166`, speaker labels, count pills, titles, description text, borders, and disclosure controls are legible in the combined comparison. Mobile behavior is covered by dedicated full-viewport captures.

## Comparison history

1. Initial audit findings:
   - P1: the 220px white count rail consumed too much width for one number.
   - P1: long descriptions created mobile cards around 597px tall and made options slow to compare.
   - P2: three vertically stacked mobile stats delayed the workshop list.
   - P2: small low-opacity utility labels weakened readability.
2. Fixes made:
   - moved registration counts into compact outlined pills;
   - kept descriptions fully visible while tightening their typography and surrounding layout;
   - placed mobile stats in a three-column row;
   - simplified slot metadata and strengthened small-label contrast;
   - tightened card borders, radii, padding, and typography.
3. Post-fix evidence:
   - `.codex-audit/09-workshop-before-after.png` shows the desktop density and hierarchy improvement;
   - `.codex-audit/12-workshop-no-details-desktop.png` shows the final cards with complete descriptions and no redundant disclosure control;
   - `.codex-audit/10-workshop-after-mobile-top.png` shows the compact mobile hero.

## Follow-up polish

- P3: the count label could be hidden below roughly 350px if future workshop counts grow to three digits.

## Implementation checklist

- [x] Preserve established Vibe-6 visual tokens.
- [x] Improve card scan order and information density.
- [x] Keep complete descriptions visible without unnecessary interaction.
- [x] Verify desktop and mobile rendering.
- [x] Verify disclosure interaction and console state.

final result: passed
