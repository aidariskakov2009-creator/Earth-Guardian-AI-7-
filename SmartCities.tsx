import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";
import { Building2, Zap, Car, Leaf } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import GlassCard from "@/components/ui/GlassCard";
import StatCard from "@/components/ui/StatCard";
import { smartCityScores } from "@/data/mockData";

const chartTooltip = {
  contentStyle: { background: "#101c2c", border: "1px solid #223448", borderRadius: 10, fontSize: 12 },
  labelStyle: { color: "#93a7b8" },
};

export default function SmartCities() {
  const best = [...smartCityScores].sort((a, b) => b.sustainability - a.sustainability)[0];
  const radarData = smartCityScores.map((c) => ({
    city: c.city,
    Sustainability: c.sustainability,
    "Energy Efficiency": c.energyEfficiency,
    "Low Emissions": 100 - c.emissions,
  }));

  return (
    <PageShell title="Smart Cities Dashboard" subtitle="Urban sustainability, traffic emissions and energy efficiency analytics">
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard label="Top-Ranked City" value={best.city} unit={`score ${best.sustainability}`} icon={Building2} tone="bio" />
        <StatCard label="Cities Benchmarked" value={String(smartCityScores.length)} icon={Zap} tone="signal" />
        <StatCard label="Avg Emissions Index" value={String(Math.round(smartCityScores.reduce((s, c) => s + c.emissions, 0) / smartCityScores.length))} unit="/100" icon={Car} tone="amber" />
        <StatCard label="Avg Efficiency" value={String(Math.round(smartCityScores.reduce((s, c) => s + c.energyEfficiency, 0) / smartCityScores.length))} unit="/100" icon={Leaf} tone="current" />
      </div>

      <GlassCard className="p-5 mb-6">
        <h3 className="font-display text-base font-semibold text-ink mb-1">Urban Resilience Radar</h3>
        <p className="text-xs text-mist mb-4">Sustainability, energy efficiency and low-emissions performance</p>
        <ResponsiveContainer width="100%" height={360}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="#223448" />
            <PolarAngleAxis dataKey="city" stroke="#93a7b8" fontSize={11} />
            <PolarRadiusAxis stroke="#223448" tick={false} axisLine={false} />
            <Tooltip {...chartTooltip} />
            <Radar name="Sustainability" dataKey="Sustainability" stroke="#2dd4bf" fill="#2dd4bf" fillOpacity={0.25} />
            <Radar name="Energy Efficiency" dataKey="Energy Efficiency" stroke="#5b9dff" fill="#5b9dff" fillOpacity={0.15} />
            <Radar name="Low Emissions" dataKey="Low Emissions" stroke="#8ee06a" fill="#8ee06a" fillOpacity={0.1} />
          </RadarChart>
        </ResponsiveContainer>
      </GlassCard>

      <div className="grid md:grid-cols-3 gap-4">
        {smartCityScores.map((c) => (
          <GlassCard key={c.city} className="p-5">
            <h4 className="font-display text-sm font-semibold text-ink mb-3">{c.city}</h4>
            <div className="flex flex-col gap-2 text-xs">
              <div className="flex justify-between"><span className="text-mist">Sustainability</span><span className="font-mono text-ink">{c.sustainability}</span></div>
              <div className="flex justify-between"><span className="text-mist">Emissions</span><span className="font-mono text-ink">{c.emissions}</span></div>
              <div className="flex justify-between"><span className="text-mist">Energy efficiency</span><span className="font-mono text-ink">{c.energyEfficiency}</span></div>
            </div>
          </GlassCard>
        ))}
      </div>
    </PageShell>
  );
}
