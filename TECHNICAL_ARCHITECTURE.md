# Technical Architecture

## Overview

Earth Guardian AI is currently a **single-page application**: React + TypeScript
compiled by Vite, styled with Tailwind CSS v4, charted with Recharts, and
routed client-side with React Router. There is no backend in this repository.

```
┌─────────────────────────────────────────────┐
│                   Browser                    │
│  ┌─────────────────────────────────────────┐ │
│  │  App.tsx (React Router route table)      │ │
│  │  ┌───────────────┐   ┌──────────────────┐│ │
│  │  │  PageShell     │   │  15 Page modules ││ │
│  │  │  (layout)      │──▶│  (pages/*.tsx)   ││ │
│  │  └───────────────┘   └──────────────────┘│ │
│  │         │                     │           │ │
│  │         ▼                     ▼           │ │
│  │  ┌──────────────┐     ┌──────────────┐    │ │
│  │  │ ui/ components│     │ charts/      │    │ │
│  │  │ (GlassCard,   │     │ WorldMap +   │    │ │
│  │  │ StatCard, ...)│     │ Recharts     │    │ │
│  │  └──────────────┘     └──────────────┘    │ │
│  │                 │                          │ │
│  │                 ▼                          │ │
│  │        data/mockData.ts (single source)     │ │
│  └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

## Why this structure

- **Single data module.** Every page imports from `src/data/mockData.ts`. This
  means swapping mock data for a real API is a matter of replacing that file's
  exports with fetch/query hooks — no component needs to change its shape as
  long as the returned types match.
- **Shared layout shell.** `PageShell` wraps every module page with the same
  sidebar, top bar, and telemetry ticker, so the app reads as one product
  instead of 14 stitched-together prototypes.
- **Design tokens, not ad-hoc colors.** Tailwind v4's `@theme` block in
  `src/index.css` defines the entire palette, type scale, and animation
  primitives once. Every component consumes `bg-signal`, `text-coral`, etc. —
  changing the brand palette is a one-file edit.

## How "AI-generated" scores are actually computed today

To be precise about what's real: none of the risk scores, forecasts, or
recommendations in this repository come from a trained model. They are
**deterministic composite formulas** over the mock indicators, for example:

```ts
// Risk Scanner composite score
score = climateRisk * 0.4
      + waterStress * 0.25
      + min(aqi / 2, 100) * 0.2
      + tempAnomaly * 10 * 0.15
```

This is intentional and disclosed so the repository doesn't overstate its own
capabilities. A production version would replace these formulas with:

1. **A real backend service** (Node/Python) exposing a `/risk-score` endpoint
2. **An actual model** — anything from a simple gradient-boosted regressor
   trained on historical disaster/climate data, to an LLM-based reasoning
   layer over structured inputs (see `anthropic_api_in_artifacts` pattern for
   how an Anthropic-powered reasoning layer could be wired into report
   generation specifically, e.g. the natural-language summaries on the Risk
   Scanner and Disaster Prediction pages)
3. **Real data ingestion** — see below

## Data sources this would integrate with in production

| Module | Candidate real data source |
|---|---|
| Climate Intelligence | NASA GISTEMP, NOAA Mauna Loa CO₂ |
| Disaster Prediction | NASA EONET, GDACS, USGS Earthquake API |
| Air Quality | OpenAQ, IQAir |
| Water Security | Global Reservoir and Dam Database, USGS |
| Forest & Biodiversity | Global Forest Watch, IUCN Red List |
| Renewable Energy | IRENA, Ember |
| Ocean | NOAA Coral Reef Watch, Copernicus Marine Service |
| Smart Cities | C40 Cities, local open-data portals |

## Frontend conventions

- **Routing:** `react-router-dom`, flat route table in `App.tsx`
- **Styling:** Tailwind utility classes + a small number of hand-written CSS
  keyframes/utilities in `index.css` (ticker marquee, pulse dot, glass panel)
- **Charts:** Recharts for all standard chart types (area, bar, line, pie,
  radar); a hand-rolled SVG component (`WorldMap`) for the geographic view,
  chosen specifically to avoid a mapping-API key dependency in a demo repo
- **State:** local component state only (`useState`/`useMemo`) — there is no
  global store because no page currently needs cross-page shared state beyond
  what's in `mockData.ts`
- **Type safety:** `strict`-adjacent TypeScript config from Vite's template;
  `noUnusedLocals`/`noUnusedParameters` relaxed for demo velocity — tighten
  these before shipping to production

## Suggested production architecture (not built here)

```
Frontend (this repo)
   │
   ▼
API Gateway ── Auth (Auth0 / Clerk / custom) 
   │
   ├── Climate/Disaster service (ingests NASA/NOAA/GDACS, caches, exposes REST/GraphQL)
   ├── Risk scoring service (real model, versioned)
   ├── User/Org service (Executive/Investor/Government/Research dashboards, RBAC)
   └── Reporting service (LLM-backed report generation, e.g. Claude via Anthropic API)
   │
   ▼
Postgres (org data, user data) + Timeseries store (InfluxDB/TimescaleDB for sensor feeds)
```

## Known limitations to disclose honestly

- No authentication, no multi-tenant data isolation
- No real-time data pipeline; "Live" badges in the UI are a design signal for
  the eventual product, not a claim about current data freshness
- Bundle is a single ~765KB JS chunk — production deployment should add route-based
  code-splitting (`React.lazy` per page) before this scales past a demo
