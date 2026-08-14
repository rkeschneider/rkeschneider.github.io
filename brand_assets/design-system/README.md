# Rachel Schneider — Personal Design System

A small, self-contained design system for rkeschneider.com. It's the **Organic** design system (warm cream ground, rounded pill components, Caprasimo + Figtree type) retinted with the two colors from Rachel's business card: a slate blue-grey and a muted olive, in place of Organic's original terracotta/sage.

## Files

- `styles.css` — the entire system: tokens (`:root` CSS custom properties) + component classes. This is the only file you need to link.
- `theme.json` — the color/font/radius parameters in machine-readable form.

## Using it

Link the stylesheet from any page:

```html
<link rel="stylesheet" href="styles.css">
```

Then build with plain HTML and the classes below — no build step, no JS required for styling. Never hard-code a hex, font name, or px value; everything comes from the CSS variables.

## Color

| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#f5ead8` | Page background (warm cream) |
| `--color-surface` | `#ebddc5` | Cards, inputs |
| `--color-text` | `#201e1d` | Body text |
| `--color-accent` | `#72919d` | Primary accent — slate blue-grey, from the business card background |
| `--color-accent-2` | `#939c73` | Secondary accent — olive, from the card's floral motif |

Each accent has a 100–900 tonal ramp (`--color-accent-100` … `--color-accent-900`, same for `accent-2`). Use light steps (100–300) for tinted fills/hovers, 500 as the base, dark steps (700–900) for text on tinted fills.

## Type

- Headings: `var(--font-heading)` — Caprasimo (loaded via Google Fonts import at the top of `styles.css`)
- Body: `var(--font-body)` — Figtree
- Scale: `h1` 42px down to `h6` 13px (uppercase, tracked)

## Spacing & radius

`--space-1` (4.4px) through `--space-8` (35.2px). Radii: `--radius-sm` 8px, `--radius-md` 16px, `--radius-lg` 28px — buttons, tags, inputs round further to a full pill (999px) in this theme.

## Components (all in `styles.css`)

- `.btn` + `.btn-primary` / `.btn-secondary` / `.btn-ghost` / `.btn-icon` / `.btn-block` — pill buttons, primary is solid slate-blue fill
- `.tag` + `.tag-accent` / `.tag-accent-2` / `.tag-neutral` / `.tag-outline` — small labels
- `.field`, `.input`, `.radio` + `.dot`, `.seg` + `.seg-opt` — form controls
- `.card` + `.card-kicker` / `.card-title` / `.card-body` / `.card-meta`, `.elev-sm/md/lg` — content cards
- `.nav` + `.nav-brand` — header bar
- `.table` — data tables
- `.dialog-backdrop` + `.dialog` (+ `.dialog-title/-body/-actions`) — modals
- `.washed` — desaturates/lifts a photo so it sits into the warm page (`filter: saturate(0.6) contrast(0.85) brightness(1.1) opacity(0.94)`)

View source on any page built with this file to see the markup patterns — it's plain HTML + classes, nothing hidden in JS.

## Do / Don't

**Do**: over-round containers and buttons, use soft circular shapes for photos/decoration, lean on the olive ramp as a genuine second color (not just a highlight).

**Don't**: flatten the palette to grey, use sharp corners, swap in a different display font for Caprasimo, crowd elements — the rounded shapes need whitespace to read as soft.
