import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Thermometer, Wind, AlertTriangle, Sun } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import GlassCard from "@/components/ui/GlassCard";
import StatCard from "@/components/ui/StatCard";
import GaugeRadial from "@/components/ui/GaugeRadial";
import WorldMap from "@/components/charts/WorldMap";
import RiskBadge from "@/components/ui/RiskBadge";
import { cities, disasterEvents, globalTrend, executiveKpis, smartCityScores } from "@/data/mockData";

const chartTooltip = {
  contentStyle: { background: "#101c2c", border: "1px solid #223448", borderRadius: 10, fontSize: 12 },
  labelStyle: { color: "#93a7b8" },
};

export default function DashboardHome() {
  const topAlerts = [...disasterEvents].sort((a, b) => b.probability - a.probability).slice(0, 5);

  return (
    <PageShell title="Executive Dashboard" subtitle="Planetary-scale overview across every intelligence module">
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard label="Global Risk Score" value={String(executiveKpis.globalRiskScore)} unit="/ 100" icon={AlertTriangle} tone="coral" delta={4.2} deltaLabel="vs last quarter" />
        <StatCard label="Atmospheric CO₂" value={executiveKpis.co2ppm.toFixed(1)} unit="ppm" icon={Wind} tone="amber" delta={2.1} deltaLabel="YoY" />
        <StatCard label="Temp Anomaly" value={`+${executiveKpis.tempAnomaly.toFixed(2)}`} unit="°C" icon={Thermometer} tone="coral" delta={1.8} deltaLabel="vs baseline" />
        <StatCard label="Renewable Share" value={executiveKpis.renewableSharePct.toFixed(1)} unit="%" icon={Sun} tone="bio" delta={-3.1} deltaLabel="growth accelerating" />
      </div>

      <div className="grid xl:grid-cols-3 gap-4 mb-6">
        <GlassCard className="xl:col-span-2 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display text-base font-semibold text-ink">Global Climate Risk Map</h3>
              <p className="text-xs text-mist mt-0.5">Composite risk by monitored city — size and color both encode severity</p>
            </div>
          </div>
          <WorldMap cities={cities} metric="climateRisk" />
        </GlassCard>

        <GlassCard className="p-5 flex flex-col items-center justify-center">
          <GaugeRadial value={executiveKpis.globalRiskScore} label="Planetary Health" sublabel="Composite index" size={170} />
          <div className="grid grid-cols-2 gap-3 w-full mt-5 text-center">
            <div>
              <div className="font-mono text-sm text-ink">{executiveKpis.seaLevelRiseMm}mm</div>
              <div className="text-[10px] text-ash uppercase tracking-wider mt-0.5">Sea level rise</div>
            </div>
            <div>
              <div className="font-mono text-sm text-ink">{(executiveKpis.forestCoverLossKm2/1000).toFixed(1)}K km²</div>
              <div className="text-[10px] text-ash uppercase tracking-wider mt-0.5">Forest lost</div>
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="grid xl:grid-cols-3 gap-4 mb-6">
        <GlassCard className="xl:col-span-2 p-5">
          <h3 className="font-display text-base font-semibold text-ink mb-1">CO₂ Concentration &amp; Temperature Anomaly</h3>
          <p className="text-xs text-mist mb-4">2010–2026 observed trend, NOAA-style Mauna Loa methodology</p>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={globalTrend}>
              <defs>
                <linearGradient id="co2Grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2dd4bf" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#2dd4bf" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#223448" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="year" stroke="#5c7186" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#5c7186" fontSize={11} tickLine={false} axisLine={false} width={40} />
              <Tooltip {...chartTooltip} />
              <Area type="monotone" dataKey="co2" stroke="#2dd4bf" fill="url(#co2Grad)" strokeWidth={2} name="CO₂ (ppm)" />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-5">
          <h3 className="font-display text-base font-semibold text-ink mb-1">Top Active Alerts</h3>
          <p className="text-xs text-mist mb-4">Ranked by AI-modeled probability</p>
          <div className="flex flex-col gap-3">
            {topAlerts.map((a) => (
              <div key={a.id} className="flex items-center justify-between gap-2 pb-3 border-b border-line last:border-0 last:pb-0">
                <div className="min-w-0">
                  <div className="text-sm text-ink font-medium truncate">{a.type} · {a.location}</div>
                  <div className="text-xs text-ash mt-0.5">ETA {a.etaHours}h · {a.affectedPopulation.toLocaleString()} people</div>
                </div>
                <RiskBadge level={a.severity} />
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-5">
        <h3 className="font-display text-base font-semibold text-ink mb-1">Smart City Sustainability Leaderboard</h3>
        <p className="text-xs text-mist mb-4">Composite score across emissions, energy efficiency and urban resilience</p>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={smartCityScores} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid stroke="#223448" strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" stroke="#5c7186" fontSize={11} tickLine={false} axisLine={false} domain={[0, 100]} />
            <YAxis type="category" dataKey="city" stroke="#93a7b8" fontSize={12} tickLine={false} axisLine={false} width={90} />
            <Tooltip {...chartTooltip} />
            <Bar dataKey="sustainability" fill="#2dd4bf" radius={[0, 6, 6, 0]} name="Sustainability score" />
          </BarChart>
        </ResponsiveContainer>
      </GlassCard>
    </PageShell>
  );
}
