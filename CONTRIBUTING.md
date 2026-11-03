# Contributing to Earth Guardian AI

Thanks for your interest in contributing! This project is meant to be a
welcoming, well-documented starting point for climate-tech tooling.

## Getting Started

```bash
git clone <your-fork-url>
cd earth-guardian-ai
npm install
npm run dev
```

## Ways to Contribute

- **New modules** — propose an additional environmental intelligence module
  (follow the pattern in `src/pages/*.tsx`: a `PageShell`, a row of
  `StatCard`s, and 1–2 chart panels backed by data in `src/data/mockData.ts`)
- **Real data integrations** — replace mock data with live API calls behind
  the same exported shape (see `docs/TECHNICAL_ARCHITECTURE.md` for suggested
  sources per module)
- **Accessibility** — audit keyboard navigation, ARIA labeling on charts, and
  color contrast
- **Performance** — route-based code splitting, image/font optimization
- **Design** — refinements to the design system in `src/index.css`

## Development Conventions

- TypeScript for all new files
- Tailwind utility classes for styling; add new design tokens to the `@theme`
  block in `src/index.css` rather than hardcoding colors
- Keep chart tooltip styling consistent with the shared `chartTooltip` object
  used across existing pages
- Run `npm run build` before opening a PR to confirm the type-check and
  production build both pass

## Pull Request Process

1. Fork the repo and create a feature branch
2. Make your changes with clear, focused commits
3. Ensure `npm run build` succeeds
4. Open a PR describing what changed and why
5. Be responsive to review feedback — most PRs will need at least one round
   of iteration

## Code of Conduct

Be respectful, assume good faith, and keep discussions focused on the work.
Harassment or discriminatory language will not be tolerated.

## Reporting Issues

Open a GitHub issue with:
- A clear title
- Steps to reproduce (for bugs) or a clear problem statement (for feature requests)
- Screenshots where relevant
