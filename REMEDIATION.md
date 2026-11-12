# SpineFlow Tiny — review remediation

This branch implements a **static-first public gallery** addressing Lincoln 2's 2026-11-12 review while retaining Bart's **SpineFlow** name and all five original concept themes. It is not a full generative AI or 3D engineering platform.

## Launch
Open root `index.html` in a modern browser, or serve the repository root with a static HTTP server. The page needs no CDN, login, API key, provider connection, analytics, or external asset. The original experimental page remains at `client/public/spineflow-v5.6.html` for archival comparison; it is **not** the recommended entrypoint.

```sh
node --test tests/gallery.test.cjs
node tools/build.cjs
```

`dist/` is a self-contained deployable static bundle. On GitHub Pages use the root `index.html` or deploy `dist/` through an approved workflow. The existing `vite.config.ts`, `client/index.html`, and `pnpm-lock.yaml` are **legacy/experimental** and not used by this edition. Do not assume their prior build pipeline works.

## What changed
- A plain-language title and visitor task, five selectable studies, responsive scrolling, visible focus, accessible tabs and dialog, reduced motion and keyboard navigation.
- All content is local and authored; no remote chat, Gemini/Imagen requests, browser API secrets or silent media generation.
- Dynamic content is rendered through DOM text nodes, not user/model-derived `innerHTML`.
- Every study has concept stage, evidence limits, material assumptions, research questions and next step.
- Local JSON export for a single synthetic/concept study. No user data is collected.
- Abstract CSS-only scene illustration always works offline; it is **not** a terrain viewer or a measured 3D model.
- Original v5.6 source preserved in place.

## Unresolved human decisions
1. **License conflict — blocker:** root `LICENSE` says MIT while README and `repository-standard/LICENSE` say all rights reserved. The owner must choose and reconcile these intentionally. This PR does not relicense or delete anything.
2. **Brand:** retain SpineFlow pending Bart's decision; alternative `Place & Pattern` not applied.
3. **Heritage:** source attribution and community review required before treating Odawa/Cobmoosa interpretations as verified tradition.
4. **Advanced features:** AI services require server-side credentials, consent, error states and security review; interactive terrain/3D should be developed as a separate tested layer rather than claimed here.

## Test scope
Node tests check data/DOM source invariants and basic semantics. They do **not** prove runtime browser behavior, screen-reader accessibility, penetration-test security or engineering validity. Manual QA: open at 320px, 200% zoom, keyboard-only, reduced-motion, offline, modal Escape/focus return, all five study changes and JSON export.

## Reviewer handoff
See [Lincoln 2's review](https://github.com/Bartron773/2lincolns/tree/main/reviews/spineflow-tiny/2026-11-12-lincoln2) and [PR #6](https://github.com/Bartron773/2lincolns/pull/6). Request independent review before merging this source PR. No website deployment was performed.
