# Figures

Interactive isometric figures for the case studies, built with the
[Anatomy](https://github.com/wheresryan22/anatomy) kit (MIT, `kit/LICENSE`).
Each `build.mjs` writes a standalone page to `public/figures/`, which the
Diagrams tab shows in an `<iframe>` (`src/components/anatomy-frame.tsx`).

```bash
node figures/scancart/build.mjs        # light theme; add --dark for dark
```

User flows (one staircase per case study, from `userflow/flows.mjs`):

```bash
node figures/userflow/build.mjs            # all four; or pass slugs, e.g. stack orderly
```
