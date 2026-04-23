# MAXCHICHAR 5D Spatial Portfolio

A cinematic, room-based spatial portfolio built with Next.js 15, React 19, and React Three Fiber.

## Run

```bash
npm install
npm run dev
```

## Spatial Features

- Cryptographic cinematic loader key generated per visit.
- Door-opening ritual with holographic welcome text and avatar reveal.
- 12-room spatial world with camera fly transitions (no traditional page scroll).
- Command palette (`Cmd/Ctrl + K`) with AI-mock `find ...` camera flight.
- Performance dashboard and adaptive rendering defaults.

## Replace Avatar / Auction Photo

### Avatar (entrance reveal)

1. Save your source portrait/art image at:
   - `public/assets/avatar-source.svg`
2. The entrance portal auto-loads this texture and applies holographic lighting/material effects.

### Gallery auction frame (room artwork)

- Runtime options in HUD:
  - drag-and-drop any image,
  - choose local file,
  - paste URL,
  - paste base64 (`data:image/...`) and press **Apply**.
- Static default file path:
  - `public/assets/gallery-placeholder.svg`


## Typecheck in Restricted Environments

If `npm install` is blocked (e.g. private registry / no internet), use:

```bash
npm run typecheck:offline
```

This uses local shim declarations (`types/offline-shims.d.ts`) so CI/dev containers can still run structural TypeScript checks without downloading packages.

## Stack

- Next.js 15 (App Router) + React 19
- Tailwind CSS + design tokens
- React Three Fiber + Drei + Postprocessing
- Framer Motion + GSAP ready
- Zustand state architecture
