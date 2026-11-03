import { useState } from "react";
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Thermometer, Wind, Waves, Globe2 } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import GlassCard from "@/components/ui/GlassCard";
import StatCard from "@/components/ui/StatCard";
import WorldMap from "@/components/charts/WorldMap";
import { cities, globalTrend, forecastTrend } from "@/data/mockData";
import type { City } from "@/data/mockData";

const chartTooltip = {
  contentStyle: { background: "#101c2c", border: "1px solid #223448", borderRadius: 10, fontSize: 12 },
  labelStyle: { color: "#93a7b8" },
};

export default function ClimateIntelligence() {
  const [metric, setMetric] = useState<keyof City>("climateRisk");
  const [selected, setSelected] = useState<City | null>(null);

  const metricOptions: { key: keyof City; label: string }[] = [
    { key: "climateRisk", label: "Climate Risk" },
    { key: "tempAnomaly", label: "Temp Anomaly" },
    { key: "co2PerCapita", label: "CO₂ per Capita" },
    { key: "waterStress", label: "Water Stress" },
  ];

  return (
    <PageShell title="Global Climate Intelligence Center" subtitle="Interactive risk mapping, CO₂ monitoring and trend forecasting">
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard label="Atmospheric CO₂" value="428.1" unit="ppm" icon={Wind} tone="amber" delta={2.4} deltaLabel="YoY increase" />
        <StatCard label="Global Temp Anomaly" value="+1.34" unit="°C" icon={Thermometer} tone="coral" delta={3.9} deltaLabel="vs 1951-1980" />
        <StatCard label="Sea Level Rise" value="59" unit="mm since 2010" icon={Waves} tone="current" delta={5.2} deltaLabel="accelerating" />
        <StatCard label="Cities Tracked" value="1,240" unit="live feeds" icon={Globe2} tone="signal" />
      </div>

      <GlassCard className="p-5 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="font-display text-base font-semibold text-ink">Interactive Risk Map</h3>
            <p className="text-xs text-mist mt-0.5">Click a metric to reproject city hotspots</p>
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {metricOptions.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setMetric(opt.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors ${
                  metric === opt.key
                    ? "bg-signal/15 border-signal/40 text-signal"
                    : "border-line text-mist hover:text-ink"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        <WorldMap cities={cities} metric={metric} onSelect={setSelected} />
        {selected && (
          <div className="mt-4 pt-4 border-t border-line grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-ash">City</div>
              <div className="text-sm text-ink font-medium mt-0.5">{selected.name}, {selected.country}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-ash">Climate risk</div>
              <div className="text-sm text-ink font-mono mt-0.5">{selected.climateRisk} / 100</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-ash">Temp anomaly</div>
              <div className="text-sm text-ink font-mono mt-0.5">+{selected.tempAnomaly}°C</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-ash">Water stress</div>
              <div className="text-sm text-ink font-mono mt-0.5">{selected.waterStress}/100</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-ash">CO₂ / capita</div>
              <div className="text-sm text-ink font-mono mt-0.5">{selected.co2PerCapita}t</div>
            </div>
          </div>
        )}
      </GlassCard>

      <div className="grid lg:grid-cols-2 gap-4">
        <GlassCard className="p-5">
          <h3 className="font-display text-base font-semibold text-ink mb-1">Observed Trend — CO₂ &amp; Temperature</h3>
          <p className="text-xs text-mist mb-4">2010–2026</p>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={globalTrend}>
              <defs>
                <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fb5b4e" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#fb5b4e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#223448" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="year" stroke="#5c7186" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#5c7186" fontSize={11} tickLine={false} axisLine={false} width={35} />
              <Tooltip {...chartTooltip} />
              <Area type="monotone" dataKey="tempAnomaly" stroke="#fb5b4e" fill="url(#tempGrad)" strokeWidth={2} name="Temp anomaly (°C)" />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-5">
          <h3 className="font-display text-base font-semibold text-ink mb-1">AI Forecast — Next 10 Years</h3>
          <p className="text-xs text-mist mb-4">Projected under current emissions trajectory</p>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={forecastTrend}>
              <CartesianGrid stroke="#223448" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="year" stroke="#5c7186" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#5c7186" fontSize={11} tickLine={false} axisLine={false} width={35} />
              <Tooltip {...chartTooltip} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="co2" stroke="#2dd4bf" strokeWidth={2} dot={{ r: 3 }} name="CO₂ (ppm)" />
              <Line type="monotone" dataKey="tempAnomaly" stroke="#fb5b4e" strokeWidth={2} dot={{ r: 3 }} name="Temp anomaly (°C)" strokeDasharray="4 3" />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>
    </PageShell>
  );
}
