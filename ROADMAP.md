# Roadmap

## v1.0 — Foundation (this repository)
- [x] Design system (dark ops-room theme, glassmorphism, telemetry ticker)
- [x] 14 module pages on realistic mock data
- [x] Interactive carbon footprint calculator
- [x] Executive dashboard
- [x] Full documentation set

## v1.1 — Polish & Performance
- [ ] Route-based code-splitting (`React.lazy`) to reduce initial bundle size
- [ ] Accessibility pass (keyboard nav audit, ARIA labels on charts, color-contrast check)
- [ ] Mobile layout refinement for dense chart pages
- [ ] Automated visual regression tests

## v2.0 — Real Data Integration
- [ ] Climate Intelligence → NASA GISTEMP + NOAA CO₂ live feed
- [ ] Disaster Prediction → NASA EONET + GDACS ingestion
- [ ] Air Quality → OpenAQ live feed
- [ ] Water Security → Global Reservoir and Dam Database
- [ ] Forest & Biodiversity → Global Forest Watch API
- [ ] Backend service layer (Node/Python) + caching layer
- [ ] Replace composite-formula risk scores with a trained/validated model,
      with documented accuracy and confidence intervals

## v2.5 — Accounts & Multi-Tenancy
- [ ] Authentication (org accounts, roles)
- [ ] Executive / Investor / Government / Research dashboard views with
      permissioned data
- [ ] Org-specific carbon and sustainability tracking (not just individual)

## v3.0 — Ecosystem
- [ ] Public API for developers
- [ ] Mobile app (field data collection for NGOs, offline-first)
- [ ] Community-contributed datasets and verification workflow
- [ ] Multi-language support

## Long-Term Exploration
- [ ] LLM-backed natural-language report generation (grounded in real data,
      with citations, not free-form generation)
- [ ] Scenario simulation tools (e.g. "what if renewable share hits 50% by 2035")
- [ ] Integration marketplace for third-party environmental data providers
