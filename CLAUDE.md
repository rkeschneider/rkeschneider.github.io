# CLAUDE.md — Portfolio Website Rules

## Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.
- Confirm the dev server and screenshot tooling exist before relying on them (see Local Server section). If `serve.mjs` or `screenshot.mjs` are missing from the project root, create them first instead of assuming they're already there.

## Project Structure
- This is a multi-page portfolio site, not a single landing page. Use a real file structure:
  - `index.html`, `about.html`, `projects.html`, `contact.html` (adjust to actual page list)
  - `/css/styles.css` for shared styles
  - `/js/main.js` for shared behavior
  - `/assets/` for images, icons, resume PDF, etc.
- Do not collapse everything into one inline-styled `index.html`. A portfolio is itself a work sample — structure should read as intentional and maintainable to anyone who looks at the source.
- Shared header/footer/nav markup should stay consistent across pages. If templating becomes painful by hand, flag it and propose a lightweight build step (e.g. a simple static site generator or Vite) rather than duplicating markup further.

## Reference Images
- If a reference image is provided: match layout, spacing, typography, and color exactly. Swap in placeholder content (images via `https://placehold.co/`, generic copy). Do not improve or add to the design.
- If no reference image: design from scratch with high craft (see guardrails below).
- Screenshot the output, compare against the reference, fix mismatches, re-screenshot. Do at least 2 comparison rounds. Stop only when no visible differences remain or the user says so.

## Local Server
- **Always serve on localhost** — never screenshot a `file:///` URL.
- Start the dev server: `node serve.mjs` (serves the project root at `http://localhost:3000`)
- `serve.mjs` lives in the project root. Start it in the background before taking any screenshots.
- If the server is already running, do not start a second instance.
- If `serve.mjs` does not exist yet, create a minimal static file server (e.g. using Node's built-in `http` module) before proceeding.

## Screenshot Workflow
- Puppeteer should already be installed as a project dependency (`npm install puppeteer` or `puppeteer-core` + local Chrome). Do not assume a specific machine path — resolve the Chrome executable path at runtime (e.g. via `puppeteer.executablePath()`) rather than hardcoding a user directory.
- **Always screenshot from localhost:** `node screenshot.mjs http://localhost:3000`
- Screenshots are saved automatically to `./temporary screenshots/screenshot-N.png` (auto-incremented, never overwritten).
- Optional label suffix: `node screenshot.mjs http://localhost:3000 label` → saves as `screenshot-N-label.png`
- `screenshot.mjs` lives in the project root. If it doesn't exist yet, create it before first use.
- After screenshotting, read the PNG from `temporary screenshots/` with the Read tool — Claude can see and analyze the image directly.
- When comparing, be specific: "heading is 32px but reference shows ~24px", "card gap is 16px but should be 24px"
- Check: spacing/padding, font size/weight/line-height, colors (exact hex), alignment, border-radius, shadows, image sizing

## Output Defaults
- Separate HTML/CSS/JS files as described in Project Structure — no single-file inline-style pages.
- Tailwind CSS: prefer a proper build (Tailwind CLI or PostCSS) over the CDN script. The CDN build is fine for a quick first draft, but should be swapped for a compiled stylesheet before this is treated as "done" — a portfolio site shouldn't ship an unminified runtime compiler in production.
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT` only when no real asset exists yet.
- Mobile-first responsive.

## Brand Assets
- Always check the `brand_assets/` folder before designing. It may contain logos, color guides, style guides, or images.
- If assets exist there, use them. Do not use placeholders where real assets are available.
- If a logo is present, use it. If a color palette is defined, use those exact values — do not invent brand colors.

## Anti-Generic Guardrails
- **Colors:** Never use default Tailwind palette (indigo-500, blue-600, etc.). Pick a custom brand color and derive from it.
- **Shadows:** Never use flat `shadow-md`. Use layered, color-tinted shadows with low opacity.
- **Typography:** Never use the same font for headings and body. Pair a display/serif with a clean sans. Apply tight tracking (`-0.03em`) on large headings, generous line-height (`1.7`) on body.
- **Gradients:** Layer multiple radial gradients. Add grain/texture via SVG noise filter for depth if it fits the brand.
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. Use spring-style easing.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states. No exceptions.
- **Images:** Add a gradient overlay (`bg-gradient-to-t from-black/60`) and a color treatment layer with `mix-blend-multiply` where it suits the content.
- **Spacing:** Use intentional, consistent spacing tokens — not random Tailwind steps.
- **Depth:** Surfaces should have a layering system (base → elevated → floating), not all sit at the same z-plane.

## Hard Rules
- Do not add sections, features, or content not requested or not in the reference.
- Do not "improve" a reference design — match it.
- Do not stop after one screenshot pass.
- Do not use `transition-all`.
- Do not use default Tailwind blue/indigo as primary color.
- Do not hardcode machine-specific paths (usernames, temp directories). Resolve dependencies relative to the project or at runtime.
