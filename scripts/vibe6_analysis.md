# Konsol Festival / Vibe-6 — Visual Design Analysis

*Source image: `scripts/vibe6_preview.png` · Analysis via z-ai VLM (glm-4.6v)*

---

## 1. Overall Layout & Visual Style

- **Page background:** light neutral grey ≈ `#F5F5F7`
- **Style:** minimalist, structured, tech- / terminal-inspired, geometric precision
- **Page structure (top → bottom):**
  1. Full-width **header card** on near-black background
  2. **3-column grid** row → "Character / Palette / Typography"
  3. **3-column grid** row → "Grid / Components / Rules"
  4. Light **footer / next-step** strip
- High contrast between the dark header block and the light content cards. Clean modern hierarchy.

## 2. UI Components

| Component | Shape | Background | Radius | Notes |
|---|---|---|---|---|
| Header card | Full-width rectangle | `#100F0E` (Core Black) | ~8px | Holds title + slash commands |
| Content cards | Rectangle | white / `#F6F5FD` (Paper) | ~8px | subtle shadow (~1px, 0.5 blur), 24px padding |
| Slash-command buttons | **Pill** (`border-radius: 9999px`) | per-command color | full pill | 36px height, 0 16px padding, weight 500 |
| Color swatches | Rounded rectangle | the swatch color | ~8px | name + hex + description inside |
| Section headers | — | — | — | bold, 16px margin-bottom |
| Bullet list | `•` markers in Vibe Purple | — | — | 8px left margin |
| "Next step" footer block | Light strip | white | — | navigates to next page |

## 3. Color Usage

Core palette (as named in the Palette section of the page itself):

| Token | Hex | Role on page |
|---|---|---|
| Core Black | `#100F0E` | Header / dark surface background |
| Paper | `#F6F5FD` | Primary light background, card surface |
| Vibe Purple | `#7B36FF` | CTA, quotes, active states, `/CREATE` |
| Festival Lime | `#95CE17` | Labels, QR/highlight, `/VIBE` |
| Electric Cyan | `#79EDFF` | Secondary signal, `/Connect` |
| Hot Pink | `#FF3697` | Rare emotional accent, `/Chill` |

- **Text colors:** white on header, `#333` for card headings, `#666` for descriptions.
- **Combinations:** black header + paper body = strong contrast. Slash-command row uses all four accents together to introduce the palette at a glance.
- No gradients or glow effects on this page — flat fills only.

## 4. Typography

- **Display font: "Chava"** — decorative, used for headers and accent text.
- **UI font: "Google Sans"** — readable, used for body and descriptions.
- **Sizes observed:** H1 ≈ 48px (Konsol Festival / Vibe-6) · H2 ≈ 24px (section titles) · body 16px · small 14px.
- **Weights:** 700 for titles/section heads, 400 for body.
- **Casing:** Title Case for section headers, Sentence case for body. Slash commands rendered in mixed-case with leading slash (`/Connect`, `/CREATE`, `/VIBE`, `/Chill`).
- **Letter-spacing:** normal body, slightly tightened for the H1.
- No monospace visible on this page, though the terminal-vibe naming implies one is available elsewhere.

## 5. Pixel Art / QR / Modular Graphics

- This page is the **design-system overview**, so pixel/QR motifs are *referenced* in the Components section but not rendered here.
- The brand character section describes "round accents" and modular QR-style marks as part of the system.
- No dot grids, blocky tiles, or pixel art present on *this* page itself.

## 6. Spacing & Grid

- Implied **12-column** grid; content cards span 4 columns each → three per row.
- **Gutters:** ~24px between columns.
- **Card padding:** 24px.
- **Section vertical rhythm:** ~32px between card rows.
- **Alignment:** left-aligned throughout; consistent vertical baseline.
- Density is balanced — neither cramped nor sparse; whitespace is intentional.

## 7. Slash Commands — exact styling

Grouped **vertically inside the header card** (black background).

| Command | Background | Text color |
|---|---|---|
| `/Connect` | Electric Cyan `#79EDFF` | black |
| `/CREATE` | Vibe Purple `#7B36FF` | white |
| `/VIBE` | Festival Lime `#95CE17` | black |
| `/Chill` | Hot Pink `#FF3697` | white |

- Shape: **pill** (`border-radius: 9999px`)
- Height: **36px**, horizontal padding 16px
- Font weight **500**, UI font (Google Sans)
- Stacked with **8px** vertical gap

> Recreate as:
> ```css
> .slash-cmd {
>   display: inline-flex; align-items: center;
>   height: 36px; padding: 0 16px;
>   border-radius: 9999px;
>   font-weight: 500; font-size: 14px;
>   font-family: "Google Sans", system-ui, sans-serif;
> }
> ```

## 8. Schedule Cards (described, not rendered on this page)

Per the "Components" section text:

- Layout: **Time · Title · Description** stacked vertically inside the card.
- Border radius: **~12.66px** (or up to 24px for larger variants).
- Title set in **Chava** (display), description in **Google Sans**.
- Example content from the page: `Мастер-классы 10:30–12:00` and `РАЗВИВАЙ / ПРОДВИСЬ`.
- Info blocks described as white cards with **36px** text and a **~37.97px** label chip.
- Status indicators not present on this overview page.

## 9. Other Notable Elements

- **Shadows:** very subtle — `box-shadow: 0 1px 0.5px rgba(0,0,0,0.05)` style on cards.
- **Borders:** none visible; separation is via background contrast + shadow.
- **Gradients / textures:** none.
- **Logos / icons:** none on this page.
- **Section labels visible (in Russian):**
  - Характер бренда · Палитра · Типографика
  - Сетка и spacing · Компоненты · Правила применения
  - Следующий шаг
- **Color-token captions (verbatim from swatches):**
  - `Core Black #100F0E — фон негр, круглые акценты`
  - `Paper #F6F5FD — основной светлый фон`
  - `Vibe Purple #7B36FF — CTA, цитаты, активные состояния`
  - `Festival Lime #95CE17 — метки, QR, highlight`
  - `Electric Cyan #79EDFF — дополнительный сигнал`
  - `Hot Pink #FF3697 — редкий эмоциональный акцент`

---

## Developer Cheat-Sheet (recreate the look)

```css
:root {
  --core-black: #100F0E;
  --paper:      #F6F5FD;
  --page-bg:    #F5F5F7;
  --vibe:       #7B36FF; /* CTA */
  --lime:       #95CE17; /* labels / QR */
  --cyan:       #79EDFF; /* secondary signal */
  --pink:       #FF3697; /* rare accent */
  --text-1: #FFFFFF;     /* on dark */
  --text-2: #333333;     /* card headings */
  --text-3: #666666;     /* descriptions */
}

.page   { background: var(--page-bg); padding: 32px; }
.card   { background: #fff; border-radius: 8px;
          padding: 24px; box-shadow: 0 1px .5px rgba(0,0,0,.05); }
.header { background: var(--core-black); color: #fff;
          border-radius: 8px; padding: 24px; }

.h1     { font-family: "Chava", sans-serif; font-size: 48px; font-weight: 700; }
.h2     { font-family: "Chava", sans-serif; font-size: 24px; font-weight: 700;
          margin-bottom: 16px; }
.body   { font-family: "Google Sans", system-ui, sans-serif;
          font-size: 16px; color: var(--text-2); }
.small  { font-size: 14px; color: var(--text-3); }

.grid-3 { display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px; }

.slash-cmd {
  display: inline-flex; align-items: center;
  height: 36px; padding: 0 16px;
  border-radius: 9999px; font-weight: 500; font-size: 14px;
  font-family: "Google Sans", sans-serif;
}
.slash-cmd + .slash-cmd { margin-top: 8px; }   /* stacked in header */

.slash-cmd--connect { background: var(--cyan); color: #000; }
.slash-cmd--create  { background: var(--vibe); color: #fff; }
.slash-cmd--vibe    { background: var(--lime); color: #000; }
.slash-cmd--chill   { background: var(--pink); color: #fff; }

.swatch { border-radius: 8px; padding: 16px; }
.bullet { color: var(--vibe); margin-right: 8px; }
```
