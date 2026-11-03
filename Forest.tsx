import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Trees, Leaf, TreeDeciduous, AlertTriangle } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import GlassCard from "@/components/ui/GlassCard";
import StatCard from "@/components/ui/StatCard";
import { forestData } from "@/data/mockData";

const chartTooltip = {
  contentStyle: { background: "#101c2c", border: "1px solid #223448", borderRadius: 10, fontSize: 12 },
  labelStyle: { color: "#93a7b8" },
};

export default function Forest() {
  const totalLost = forestData.deforestationByRegion.reduce((s, r) => s + r.hectaresLostK, 0);
  const totalRestored = forestData.deforestationByRegion.reduce((s, r) => s + r.hectaresRestoredK, 0);

  return (
    <PageShell title="Forest & Biodiversity Center" subtitle="Deforestation tracking, reforestation analytics and ecosystem health">
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard label="Hectares Lost" value={`${(totalLost / 1000).toFixed(2)}M`} unit="last 12 mo" icon={Trees} tone="coral" delta={5.4} deltaLabel="YoY" />
        <StatCard label="Hectares Restored" value={`${(totalRestored / 1000).toFixed(2)}M`} icon={TreeDeciduous} tone="bio" delta={-2.1} deltaLabel="net still negative" />
        <StatCard label="Biodiversity Index" value="58" unit="/ 100" icon={Leaf} tone="amber" delta={3.2} deltaLabel="declining" />
        <StatCard label="Species at Risk" value="41,400+" icon={AlertTriangle} tone="coral" />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <GlassCard className="p-5">
          <h3 className="font-display text-base font-semibold text-ink mb-1">Deforestation vs Restoration by Region</h3>
          <p className="text-xs text-mist mb-4">Thousand hectares, last 12 months</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={forestData.deforestationByRegion}>
              <CartesianGrid stroke="#223448" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="region" stroke="#5c7186" fontSize={10} tickLine={false} axisLine={false} angle={-10} textAnchor="end" height={50} />
              <YAxis stroke="#5c7186" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip {...chartTooltip} />
              <Bar dataKey="hectaresLostK" fill="#fb5b4e" name="Lost (K ha)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="hectaresRestoredK" fill="#8ee06a" name="Restored (K ha)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-5">
          <h3 className="font-display text-base font-semibold text-ink mb-1">Global Biodiversity Index Trend</h3>
          <p className="text-xs text-mist mb-4">Composite species-population index, 2016–2026</p>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={forestData.biodiversityIndex}>
              <CartesianGrid stroke="#223448" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="year" stroke="#5c7186" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#5c7186" fontSize={11} tickLine={false} axisLine={false} domain={[0, 100]} />
              <Tooltip {...chartTooltip} />
              <Line type="monotone" dataKey="index" stroke="#8ee06a" strokeWidth={2.5} dot={{ r: 4 }} name="Index" />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>
    </PageShell>
  );
}
