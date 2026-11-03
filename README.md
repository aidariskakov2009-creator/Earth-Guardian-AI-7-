# 🌍 Earth Guardian AI

**An intelligent environmental operating system for the planet.**

Earth Guardian AI fuses climate science, satellite-style telemetry and predictive
modeling into a single command center — helping cities, researchers, NGOs and
governments see environmental risk before it lands.

![Status](https://img.shields.io/badge/status-active--development-2dd4bf)
![License](https://img.shields.io/badge/license-MIT-blue)
![Stack](https://img.shields.io/badge/stack-React_%2B_TypeScript_%2B_Vite-5b9dff)

---

## ✨ What is Earth Guardian AI?

A 14-module environmental intelligence platform covering climate risk, natural
disaster prediction, air quality, water security, forests & biodiversity,
renewable energy, carbon accounting, agriculture, oceans, smart cities,
education, volunteering and open research — unified under one design system
and one data model.

Built to double as:
- A **real, working product demo** (interactive dashboards, live-feeling
  telemetry, a functional carbon calculator)
- A **startup / hackathon submission** (pitch deck, business model, roadmap included)
- A **portfolio piece** (technical architecture + university application materials)

## 🖥️ Live Modules

| Module | What it does |
|---|---|
| Executive Dashboard | Global KPIs, risk map, alert feed, city leaderboard |
| Climate Intelligence | Interactive world map, CO₂/temperature trend + 10-yr forecast |
| Disaster Prediction Hub | AI-modeled probability ranking for wildfire, flood, drought, storm, heatwave, earthquake |
| Air Quality Intelligence | 24h AQI trend lines, city comparison, health-impact framing |
| Water Security Platform | Reservoir capacity tracking, water-stress ranking |
| Forest & Biodiversity Center | Deforestation vs. restoration, biodiversity index trend |
| Renewable Energy Intelligence | Global capacity mix, YoY growth, energy mix by country |
| Carbon Footprint Analyzer | **Interactive calculator** — sliders update a live gauge + breakdown chart |
| Smart Agriculture Intelligence | Soil moisture & crop health seasonal trend |
| Ocean Protection Center | Ocean temperature anomaly, coral bleaching risk, plastic density |
| Environmental Risk Scanner | Per-city AI-generated risk report |
| Smart Cities Dashboard | Sustainability radar across benchmark cities |
| Sustainability Learning Hub | Course catalog with progress tracking |
| Volunteer & NGO Network | Partner directory |
| Climate Research Center | Open dataset catalog |

## 🧱 Tech Stack

- **React 19** + **TypeScript**
- **Vite** (build tooling)
- **Tailwind CSS v4** (design tokens via `@theme`)
- **Recharts** for data visualization
- **React Router** for navigation
- **Lucide React** for iconography

No backend is included — all data is realistic mock data in
[`src/data/mockData.ts`](src/data/mockData.ts), structured so it can be swapped
for live APIs (NOAA, NASA EONET, OpenAQ, Global Forest Watch, etc.) without
touching component code.

## 🚀 Getting Started

```bash
npm install
npm run dev       # start local dev server
npm run build     # production build to /dist
npm run preview   # preview the production build
```

Requires Node.js 18+.

## 📁 Project Structure

```
src/
  components/
    layout/     — Sidebar, TopBar, VitalsTicker, PageShell
    ui/         — GlassCard, StatCard, RiskBadge, GaugeRadial
    charts/     — WorldMap (custom SVG hotspot map)
  data/
    mockData.ts — all datasets used across modules
  pages/        — one file per module/route
  App.tsx       — route table
  index.css     — design tokens, fonts, global styles
```

See [`docs/TECHNICAL_ARCHITECTURE.md`](docs/TECHNICAL_ARCHITECTURE.md) for the
full architecture breakdown.

## 🎨 Design System

Dark "atmospheric ops-room" theme — deep navy background, teal/blue/amber/coral
signal colors, glassmorphism panels, and a signature scrolling telemetry ticker.
Typography: Space Grotesk (display), Inter (body), IBM Plex Mono (data/telemetry).

## 📚 Documentation

- [Project Overview](docs/PROJECT_OVERVIEW.md)
- [Technical Architecture](docs/TECHNICAL_ARCHITECTURE.md)
- [Business Model](docs/BUSINESS_MODEL.md)
- [Impact Report](docs/IMPACT_REPORT.md)
- [Roadmap](docs/ROADMAP.md)
- [Pitch Deck](docs/PITCH_DECK.md)
- [University Portfolio Notes](docs/UNIVERSITY_PORTFOLIO.md)
- [Research Paper Outline](docs/RESEARCH_PAPER.md)
- [Awards & Competitions Guide](docs/AWARDS_AND_COMPETITIONS.md)
- [GitHub Metadata](docs/GITHUB_METADATA.md)
- [Contributing](CONTRIBUTING.md)
- [Changelog](CHANGELOG.md)

## ⚠️ A Note on Honesty

This is a **frontend demo built on realistic mock data**, not a system
currently ingesting live satellite or sensor feeds. Every chart and figure is
illustrative and directionally consistent with public climate science, but
none of it should be cited as real-time measurement. Treat this as a strong
starting point for a real product, a competition submission, or a portfolio
piece — not as an operational monitoring system.

## 📄 License

MIT — see [LICENSE](LICENSE).
