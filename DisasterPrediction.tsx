import { useMemo, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { FlameKindling, Waves, Sun, Wind, CloudLightning, Activity } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import GlassCard from "@/components/ui/GlassCard";
import StatCard from "@/components/ui/StatCard";
import RiskBadge from "@/components/ui/RiskBadge";
import { disasterEvents } from "@/data/mockData";

const typeIcon: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  Wildfire: FlameKindling,
  Flood: Waves,
  Drought: Sun,
  Heatwave: Wind,
  Storm: CloudLightning,
  Earthquake: Activity,
};

const chartTooltip = {
  contentStyle: { background: "#101c2c", border: "1px solid #223448", borderRadius: 10, fontSize: 12 },
  labelStyle: { color: "#93a7b8" },
};

export default function DisasterPrediction() {
  const [filter, setFilter] = useState<string>("All");
  const types = ["All", ...Array.from(new Set(disasterEvents.map((d) => d.type)))];

  const filtered = useMemo(
    () => (filter === "All" ? disasterEvents : disasterEvents.filter((d) => d.type === filter)),
    [filter]
  );

  const critical = disasterEvents.filter((d) => d.severity === "Critical").length;
  const totalAffected = disasterEvents.reduce((s, d) => s + d.affectedPopulation, 0);

  const chartData = [...disasterEvents].sort((a, b) => b.probability - a.probability);

  return (
    <PageShell title="Natural Disaster Prediction Hub" subtitle="AI-generated risk assessments across active environmental threats">
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard label="Active Events" value={String(disasterEvents.length)} icon={Activity} tone="signal" />
        <StatCard label="Critical Alerts" value={String(critical)} icon={FlameKindling} tone="coral" delta={12.5} deltaLabel="vs last week" />
        <StatCard label="People at Risk" value={`${(totalAffected / 1_000_000).toFixed(1)}M`} icon={Waves} tone="amber" />
        <StatCard label="Model Confidence" value="92.4" unit="% avg" icon={Sun} tone="bio" delta={-1.1} deltaLabel="improving" />
      </div>

      <GlassCard className="p-5 mb-6">
        <h3 className="font-display text-base font-semibold text-ink mb-1">Risk Probability Ranking</h3>
        <p className="text-xs text-mist mb-4">AI-modeled likelihood of escalation within the forecast window</p>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartData} layout="vertical" margin={{ left: 10 }}>
            <CartesianGrid stroke="#223448" strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" domain={[0, 100]} stroke="#5c7186" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis type="category" dataKey="location" stroke="#93a7b8" fontSize={11} tickLine={false} axisLine={false} width={170} />
            <Tooltip {...chartTooltip} formatter={(v) => [`${v}%`, "Probability"]} />
            <Bar dataKey="probability" radius={[0, 6, 6, 0]}>
              {chartData.map((d, i) => (
                <Cell key={i} fill={d.severity === "Critical" ? "#fb5b4e" : d.severity === "Warning" ? "#f5a524" : "#5b9dff"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </GlassCard>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors ${
              filter === t ? "bg-signal/15 border-signal/40 text-signal" : "border-line text-mist hover:text-ink"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((d) => {
          const Icon = typeIcon[d.type] ?? Activity;
          return (
            <GlassCard key={d.id} className="p-5" glow={d.severity === "Critical" ? "coral" : "none"}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-panel-hi flex items-center justify-center">
                    <Icon className="w-5 h-5 text-signal" strokeWidth={1.75} />
                  </div>
                  <div>
                    <div className="font-display text-sm font-semibold text-ink">{d.type}</div>
                    <div className="text-xs text-mist">{d.location}</div>
                  </div>
                </div>
                <RiskBadge level={d.severity} />
              </div>
              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-line">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-ash">Probability</div>
                  <div className="text-sm font-mono text-ink mt-0.5">{d.probability}%</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-ash">ETA</div>
                  <div className="text-sm font-mono text-ink mt-0.5">{d.etaHours}h</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-ash">Affected</div>
                  <div className="text-sm font-mono text-ink mt-0.5">{(d.affectedPopulation / 1000).toFixed(0)}K</div>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </PageShell>
  );
}
