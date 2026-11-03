import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";
import { Waves, Fish, Thermometer, Trash2 } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import GlassCard from "@/components/ui/GlassCard";
import StatCard from "@/components/ui/StatCard";
import { oceanData } from "@/data/mockData";

const chartTooltip = {
  contentStyle: { background: "#101c2c", border: "1px solid #223448", borderRadius: 10, fontSize: 12 },
  labelStyle: { color: "#93a7b8" },
};

export default function Ocean() {
  return (
    <PageShell title="Ocean Protection Center" subtitle="Ocean temperature, marine pollution and reef health monitoring">
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard label="Ocean Temp Anomaly" value="+0.71" unit="°C" icon={Thermometer} tone="coral" delta={4.1} deltaLabel="since 2010" />
        <StatCard label="Reefs at Critical Risk" value="2 of 4" unit="monitored" icon={Fish} tone="amber" />
        <StatCard label="Plastic Density Peak" value="5.1" unit="t/km² (N. Pacific)" icon={Trash2} tone="coral" />
        <StatCard label="Marine Zones Tracked" value="340+" icon={Waves} tone="current" />
      </div>

      <div className="grid lg:grid-cols-2 gap-4 mb-4">
        <GlassCard className="p-5">
          <h3 className="font-display text-base font-semibold text-ink mb-1">Ocean Surface Temperature Anomaly</h3>
          <p className="text-xs text-mist mb-4">°C vs long-term baseline, 2010–2026</p>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={oceanData.tempAnomaly}>
              <defs>
                <linearGradient id="oceanGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5b9dff" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#5b9dff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#223448" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="year" stroke="#5c7186" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#5c7186" fontSize={11} tickLine={false} axisLine={false} width={35} />
              <Tooltip {...chartTooltip} />
              <Area type="monotone" dataKey="anomaly" stroke="#5b9dff" fill="url(#oceanGrad)" strokeWidth={2} name="Anomaly (°C)" />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-5">
          <h3 className="font-display text-base font-semibold text-ink mb-1">Coral Bleaching Risk by Reef System</h3>
          <p className="text-xs text-mist mb-4">Composite risk score, 0–100</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={oceanData.coralBleachingRisk} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid stroke="#223448" strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} stroke="#5c7186" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis type="category" dataKey="reef" stroke="#93a7b8" fontSize={11} tickLine={false} axisLine={false} width={140} />
              <Tooltip {...chartTooltip} />
              <Bar dataKey="risk" radius={[0, 6, 6, 0]}>
                {oceanData.coralBleachingRisk.map((r, i) => (
                  <Cell key={i} fill={r.risk > 70 ? "#fb5b4e" : r.risk > 50 ? "#f5a524" : "#5b9dff"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      <GlassCard className="p-5">
        <h3 className="font-display text-base font-semibold text-ink mb-3">Marine Plastic Density by Region</h3>
        <div className="grid md:grid-cols-4 gap-3">
          {oceanData.plasticDensity.map((p) => (
            <div key={p.region} className="p-4 rounded-xl bg-panel-hi/60 border border-line text-center">
              <div className="font-display text-2xl font-semibold text-current">{p.tonsPerKm2}</div>
              <div className="text-[10px] text-ash uppercase tracking-wider mt-1">tons / km²</div>
              <div className="text-xs text-mist mt-2">{p.region}</div>
            </div>
          ))}
        </div>
      </GlassCard>
    </PageShell>
  );
}
