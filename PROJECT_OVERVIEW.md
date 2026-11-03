# Project Overview — Earth Guardian AI

## The Problem

Environmental decision-making today is fragmented across dozens of disconnected
sources: one agency tracks air quality, another tracks flood risk, a third
tracks deforestation — and almost none of it is presented in a way a mayor,
a founder, or a student can act on in under five minutes. Meanwhile, climate
and disaster risk is compounding faster than most institutions can integrate
new data sources.

## The Idea

Earth Guardian AI is a single interface layer over environmental intelligence:
one design system, one navigation model, and one underlying data schema across
14 modules — climate, disasters, air, water, forests, energy, carbon,
agriculture, oceans, risk scoring, smart cities, education, volunteering, and
research. The goal is not to replace NOAA or NASA's science — it's to make
their category of insight legible and actionable for people who are not
climate scientists.

## Who It's For

- **City governments** needing a single sustainability and resilience dashboard
- **Researchers** who want a fast, open front-end over public datasets
- **NGOs** coordinating volunteers around active environmental risk
- **Founders/students** using this as a foundation for a real product or a
  competition submission
- **Individuals** who want to understand and reduce their own carbon footprint

## What's Built vs. What's Planned

**Built in this repository (v1):**
- Full design system and component library
- 14 working, interactive modules on realistic mock data
- A genuinely interactive carbon footprint calculator
- Executive/dashboard-style KPI reporting

**Planned (see [ROADMAP.md](ROADMAP.md)):**
- Live data integration (NOAA, NASA EONET, OpenAQ, Global Forest Watch, Copernicus)
- Authentication and per-organization dashboards (Executive / Investor /
  Government / Research views with permissioned data)
- A real prediction backend (currently, "AI-generated" risk scores are
  deterministic composites of mock indicators — see the architecture doc for
  exactly how they're computed today, and how a real model would replace them)
- Mobile app and offline field-data collection for NGOs

## Positioning

Earth Guardian AI is designed to read as a serious, fundable, competition-ready
platform — while being transparent that this repository is the front-end and
design foundation, not a claim of an already-deployed global monitoring
network. See [BUSINESS_MODEL.md](BUSINESS_MODEL.md) and
[PITCH_DECK.md](PITCH_DECK.md) for how the idea would be pitched, and
[AWARDS_AND_COMPETITIONS.md](AWARDS_AND_COMPETITIONS.md) for where it fits in
the competition landscape.
