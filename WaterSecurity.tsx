import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Droplets, Waves, AlertCircle, TrendingDown } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import GlassCard from "@/components/ui/GlassCard";
import StatCard from "@/components/ui/StatCard";
import { waterReservoirs, cities } from "@/data/mockData";

const chartTooltip = {
  contentStyle: { background: "#101c2c", border: "1px solid #223448", borderRadius: 10, fontSize: 12 },
  labelStyle: { color: "#93a7b8" },
};

export default function WaterSecurity() {
  const highStress = [...cities].sort((a, b) => b.waterStress - a.waterStress).slice(0, 6);
  const decliningReservoirs = waterReservoirs.filter((r) => r.trend < 0).length;

  return (
    <PageShell title="Water Security Platform" subtitle="Reservoir monitoring, drought forecasting and consumption insight">
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard label="Reservoirs Monitored" value={String(waterReservoirs.length)} unit="major basins" icon={Droplets} tone="current" />
        <StatCard label="Declining Basins" value={String(decliningReservoirs)} icon={TrendingDown} tone="coral" />
        <StatCard label="Avg Capacity" value={`${Math.round(waterReservoirs.reduce((s, r) => s + r.capacityPct, 0) / waterReservoirs.length)}`} unit="%" icon={Waves} tone="amber" />
        <StatCard label="High-Stress Cities" value={String(cities.filter((c) => c.waterStress > 70).length)} icon={AlertCircle} tone="coral" />
      </div>

      <GlassCard className="p-5 mb-6">
        <h3 className="font-display text-base font-semibold text-ink mb-1">Reservoir Capacity — Major Basins</h3>
        <p className="text-xs text-mist mb-4">Current fill level vs historical average, with year-over-year trend</p>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={waterReservoirs} margin={{ left: -10 }}>
            <CartesianGrid stroke="#223448" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" stroke="#5c7186" fontSize={10} tickLine={false} axisLine={false} angle={-15} textAnchor="end" height={50} />
            <YAxis stroke="#5c7186" fontSize={11} tickLine={false} axisLine={false} domain={[0, 100]} />
            <Tooltip {...chartTooltip} formatter={(v) => [`${v}%`, "Capacity"]} />
            <Bar dataKey="capacityPct" radius={[6, 6, 0, 0]}>
              {waterReservoirs.map((r, i) => (
                <Cell key={i} fill={r.capacityPct < 40 ? "#fb5b4e" : r.capacityPct < 60 ? "#f5a524" : "#5b9dff"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="grid md:grid-cols-3 gap-3 mt-4">
          {waterReservoirs.map((r) => (
            <div key={r.name} className="flex items-center justify-between px-3 py-2 rounded-lg bg-panel-hi/60 border border-line">
              <div>
                <div className="text-xs text-ink font-medium">{r.name}</div>
                <div className="text-[10px] text-ash">{r.region}</div>
              </div>
              <div className={`text-xs font-mono ${r.trend < 0 ? "text-coral" : "text-bio"}`}>
                {r.trend >= 0 ? "▲" : "▼"} {Math.abs(r.trend)}%
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="p-5">
        <h3 className="font-display text-base font-semibold text-ink mb-1">Highest Water-Stress Cities</h3>
        <p className="text-xs text-mist mb-4">Demand-to-availability ratio, 0–100 scale</p>
        <div className="flex flex-col gap-2">
          {highStress.map((c) => (
            <div key={c.id} className="flex items-center gap-4 py-2 border-b border-line last:border-0">
              <div className="w-36 shrink-0 text-sm text-ink font-medium">{c.name}</div>
              <div className="flex-1 h-2 rounded-full bg-panel-hi overflow-hidden">
                <div
                  className="h-full rounded-full bg-current"
                  style={{ width: `${c.waterStress}%`, background: c.waterStress > 80 ? "#fb5b4e" : "#5b9dff" }}
                />
              </div>
              <div className="w-10 text-right font-mono text-sm text-ink">{c.waterStress}</div>
            </div>
          ))}
        </div>
      </GlassCard>
    </PageShell>
  );
}
