import { Link } from "react-router-dom";
import { ArrowRight, Globe2, FlameKindling, Wind, Droplets, Sun, Trees, ShieldCheck } from "lucide-react";
import VitalsTicker from "@/components/layout/VitalsTicker";
import WorldMap from "@/components/charts/WorldMap";
import GlassCard from "@/components/ui/GlassCard";
import GaugeRadial from "@/components/ui/GaugeRadial";
import { cities, executiveKpis } from "@/data/mockData";

const modules = [
  { icon: Globe2, name: "Climate Intelligence", desc: "Live risk heatmaps, CO₂ telemetry and trend forecasting across 1,200+ cities." },
  { icon: FlameKindling, name: "Disaster Prediction", desc: "AI-generated wildfire, flood, drought and storm risk assessments with lead-time alerts." },
  { icon: Wind, name: "Air Quality", desc: "Hourly AQI monitoring, pollution analytics and health-impact estimation." },
  { icon: Droplets, name: "Water Security", desc: "Reservoir monitoring, drought forecasting and consumption insight." },
  { icon: Trees, name: "Forest & Biodiversity", desc: "Deforestation tracking and ecosystem health indicators by region." },
  { icon: Sun, name: "Renewable Energy", desc: "Solar and wind analytics with a green-transition scoring engine." },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-deep grid-overlay">
      {/* nav */}
      <div className="border-b border-line">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-signal to-current flex items-center justify-center">
              <Globe2 className="w-4.5 h-4.5 text-abyss" strokeWidth={2.5} />
            </div>
            <span className="font-display font-semibold text-ink">Earth Guardian AI</span>
          </div>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-signal text-abyss text-sm font-semibold hover:bg-signal/90 transition-colors"
          >
            Launch Platform <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <VitalsTicker />

      {/* hero */}
      <section className="max-w-[1400px] mx-auto px-6 pt-16 pb-10 grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-rise">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-signal/30 bg-signal/10 text-signal text-xs font-mono uppercase tracking-wider mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse-dot" /> Live planetary telemetry
          </div>
          <h1 className="font-display text-5xl lg:text-6xl font-semibold leading-[1.05] text-ink">
            An operating system<br />for <span className="text-gradient-signal">planet Earth.</span>
          </h1>
          <p className="text-mist text-lg mt-6 max-w-lg leading-relaxed">
            Earth Guardian AI fuses climate science, satellite telemetry and predictive
            machine learning into one command center — helping cities, researchers and
            governments see risk before it lands.
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-8">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-signal text-abyss font-semibold hover:bg-signal/90 transition-colors"
            >
              Explore the Dashboard <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/climate"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-line text-ink hover:border-signal/40 transition-colors"
            >
              View Climate Intelligence
            </Link>
          </div>
          <div className="flex items-center gap-8 mt-10 pt-8 border-t border-line">
            {[
              { v: "1,240+", l: "Cities monitored" },
              { v: "14", l: "Intelligence modules" },
              { v: "92%", l: "Forecast accuracy" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-2xl font-semibold text-ink">{s.v}</div>
                <div className="text-xs text-mist mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <GlassCard className="p-5 animate-rise" glow="signal">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase tracking-widest text-mist font-medium">Global Climate Risk Map</span>
            <span className="flex items-center gap-1.5 text-[11px] font-mono text-signal">
              <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse-dot" /> Live
            </span>
          </div>
          <WorldMap cities={cities} metric="climateRisk" />
          <div className="flex items-center gap-4 mt-3 text-[11px] font-mono text-mist">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-bio" />Low</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-current" />Moderate</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber" />Elevated</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-coral" />Critical</span>
          </div>
        </GlassCard>
      </section>

      {/* planetary vitals gauge row */}
      <section className="max-w-[1400px] mx-auto px-6 py-14">
        <GlassCard className="p-8 grid md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-1 flex justify-center">
            <GaugeRadial value={executiveKpis.globalRiskScore} label="Global Risk Index" sublabel="Composite score" size={200} />
          </div>
          <div className="md:col-span-2">
            <h3 className="font-display text-lg font-semibold text-ink mb-2">Why a composite index?</h3>
            <p className="text-mist text-sm leading-relaxed max-w-xl">
              Earth Guardian's Global Risk Index blends climate volatility, disaster
              probability, water stress and biodiversity decline into a single
              planetary vital sign — the same way a hospital reduces dozens of
              sensors into one readable pulse. Executives and policymakers get a
              number they can track daily; researchers get the full sensor array
              underneath it.
            </p>
            <div className="flex flex-wrap gap-2 mt-5">
              {["Climate volatility", "Disaster probability", "Water stress", "Biodiversity decline", "Air quality"].map((t) => (
                <span key={t} className="px-2.5 py-1 rounded-full border border-line text-xs text-mist font-mono">{t}</span>
              ))}
            </div>
          </div>
        </GlassCard>
      </section>

      {/* modules grid */}
      <section className="max-w-[1400px] mx-auto px-6 py-4">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">Fourteen modules. One command center.</h2>
            <p className="text-mist text-sm mt-1">Every environmental system, monitored and modeled in real time.</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((m) => (
            <GlassCard key={m.name} className="p-5 hover:border-signal/30 transition-colors">
              <m.icon className="w-5 h-5 text-signal mb-3" strokeWidth={1.75} />
              <h3 className="font-display text-base font-semibold text-ink mb-1.5">{m.name}</h3>
              <p className="text-sm text-mist leading-relaxed">{m.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* trust / mission footer */}
      <section className="max-w-[1400px] mx-auto px-6 py-16">
        <GlassCard className="p-10 text-center" glow="signal">
          <ShieldCheck className="w-8 h-8 text-signal mx-auto mb-4" strokeWidth={1.5} />
          <h2 className="font-display text-2xl font-semibold text-ink max-w-2xl mx-auto">
            Built for researchers, cities and governments who need to act before the data confirms the worst.
          </h2>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-signal text-abyss font-semibold hover:bg-signal/90 transition-colors mt-6"
          >
            Enter the Platform <ArrowRight className="w-4 h-4" />
          </Link>
        </GlassCard>
      </section>

      <footer className="border-t border-line py-8">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-ash">
          <span>© 2026 Earth Guardian AI — Environmental Intelligence Platform</span>
          <span>Built with React · TypeScript · Vite · Tailwind</span>
        </div>
      </footer>
    </div>
  );
}
