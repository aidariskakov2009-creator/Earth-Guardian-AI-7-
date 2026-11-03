import { useState } from "react";
import { ScanSearch, FileText, ShieldAlert } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import GlassCard from "@/components/ui/GlassCard";
import GaugeRadial from "@/components/ui/GaugeRadial";
import { cities } from "@/data/mockData";

export default function RiskScanner() {
  const [selectedId, setSelectedId] = useState(cities[2].id);
  const city = cities.find((c) => c.id === selectedId)!;

  const score = Math.round((city.climateRisk * 0.4 + city.waterStress * 0.25 + Math.min(city.aqi / 2, 100) * 0.2 + city.tempAnomaly * 10 * 0.15));

  return (
    <PageShell title="Environmental Risk Scanner" subtitle="AI-generated sustainability and risk reports by location">
      <div className="grid lg:grid-cols-3 gap-4">
        <GlassCard className="p-5 lg:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <ScanSearch className="w-4 h-4 text-signal" />
            <h3 className="font-display text-sm font-semibold text-ink">Select a Location</h3>
          </div>
          <div className="flex flex-col gap-1.5 max-h-[420px] overflow-y-auto pr-1">
            {cities.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedId(c.id)}
                className={`text-left px-3 py-2 rounded-lg text-sm border transition-colors ${
                  selectedId === c.id ? "bg-signal/15 border-signal/40 text-signal" : "border-transparent text-mist hover:text-ink hover:bg-panel-hi/60"
                }`}
              >
                {c.name}, {c.country}
              </button>
            ))}
          </div>
        </GlassCard>

        <div className="lg:col-span-2 flex flex-col gap-4">
          <GlassCard className="p-6 flex flex-col md:flex-row items-center gap-6">
            <GaugeRadial value={Math.min(100, score)} size={170} label="Risk Score" sublabel={city.name} />
            <div className="flex-1">
              <h3 className="font-display text-lg font-semibold text-ink mb-2">{city.name}, {city.country}</h3>
              <p className="text-sm text-mist leading-relaxed mb-4">
                AI-generated composite assessment based on climate volatility, water stress,
                air quality and temperature anomaly. This location is classified as{" "}
                <span className={score > 70 ? "text-coral" : score > 45 ? "text-amber" : "text-bio"}>
                  {score > 70 ? "high risk" : score > 45 ? "moderate risk" : "low risk"}
                </span>{" "}
                relative to the global city index.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="px-3 py-2 rounded-lg bg-panel-hi/60 border border-line">
                  <div className="text-[10px] text-ash uppercase tracking-wider">Climate risk</div>
                  <div className="text-sm font-mono text-ink mt-0.5">{city.climateRisk}/100</div>
                </div>
                <div className="px-3 py-2 rounded-lg bg-panel-hi/60 border border-line">
                  <div className="text-[10px] text-ash uppercase tracking-wider">Water stress</div>
                  <div className="text-sm font-mono text-ink mt-0.5">{city.waterStress}/100</div>
                </div>
                <div className="px-3 py-2 rounded-lg bg-panel-hi/60 border border-line">
                  <div className="text-[10px] text-ash uppercase tracking-wider">Air quality</div>
                  <div className="text-sm font-mono text-ink mt-0.5">{city.aqi} AQI</div>
                </div>
                <div className="px-3 py-2 rounded-lg bg-panel-hi/60 border border-line">
                  <div className="text-[10px] text-ash uppercase tracking-wider">Temp anomaly</div>
                  <div className="text-sm font-mono text-ink mt-0.5">+{city.tempAnomaly}°C</div>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-signal" />
              <h3 className="font-display text-sm font-semibold text-ink">Generated Report Summary</h3>
            </div>
            <p className="text-sm text-mist leading-relaxed">
              {city.name} shows a climate risk index of {city.climateRisk}, driven primarily by{" "}
              {city.waterStress > 70 ? "acute water stress" : city.aqi > 130 ? "elevated air pollution" : "rising temperature volatility"}.
              Recommended priorities include infrastructure resilience investment, early-warning
              system coverage, and cross-sector adaptation planning within the next reporting cycle.
            </p>
            <div className="flex items-center gap-2 mt-4 text-xs text-amber">
              <ShieldAlert className="w-3.5 h-3.5" />
              Report generated from live composite indicators — refresh for updated modeling.
            </div>
          </GlassCard>
        </div>
      </div>
    </PageShell>
  );
}
