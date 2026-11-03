import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Sun, Zap, Leaf, TrendingUp } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import GlassCard from "@/components/ui/GlassCard";
import StatCard from "@/components/ui/StatCard";
import { renewableMix, energyByCountry } from "@/data/mockData";

const chartTooltip = {
  contentStyle: { background: "#101c2c", border: "1px solid #223448", borderRadius: 10, fontSize: 12 },
  labelStyle: { color: "#93a7b8" },
};

const pieColors = ["#f5a524", "#5b9dff", "#2dd4bf", "#8ee06a", "#fb5b4e", "#93a7b8"];

export default function RenewableEnergy() {
  const totalGw = renewableMix.reduce((s, r) => s + r.gwCapacity, 0);

  return (
    <PageShell title="Renewable Energy Intelligence" subtitle="Solar, wind and green-transition analytics with AI recommendations">
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Installed Capacity" value={(totalGw / 1000).toFixed(2)} unit="TW" icon={Zap} tone="amber" delta={14.8} deltaLabel="YoY growth" />
        <StatCard label="Fastest Growing" value="Solar" unit="+24.1% YoY" icon={Sun} tone="bio" />
        <StatCard label="Global Renewable Share" value="31.4" unit="%" icon={Leaf} tone="signal" delta={3.6} deltaLabel="of generation" />
        <StatCard label="Green Transition Score" value="68" unit="/100" icon={TrendingUp} tone="current" />
      </div>

      <div className="grid lg:grid-cols-2 gap-4 mb-6">
        <GlassCard className="p-5">
          <h3 className="font-display text-base font-semibold text-ink mb-1">Global Capacity by Source</h3>
          <p className="text-xs text-mist mb-4">Installed gigawatts, current generation</p>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={renewableMix} dataKey="gwCapacity" nameKey="source" innerRadius={60} outerRadius={100} paddingAngle={2}>
                {renewableMix.map((_, i) => (
                  <Cell key={i} fill={pieColors[i % pieColors.length]} stroke="#0a1420" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip {...chartTooltip} formatter={(v) => [`${Number(v).toLocaleString()} GW`, "Capacity"]} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-5">
          <h3 className="font-display text-base font-semibold text-ink mb-1">Year-over-Year Growth</h3>
          <p className="text-xs text-mist mb-4">Capacity growth rate by energy source</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={renewableMix}>
              <CartesianGrid stroke="#223448" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="source" stroke="#5c7186" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#5c7186" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip {...chartTooltip} formatter={(v) => [`${v}%`, "Growth"]} />
              <Bar dataKey="growthYoY" radius={[6, 6, 0, 0]} fill="#2dd4bf" />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      <GlassCard className="p-5">
        <h3 className="font-display text-base font-semibold text-ink mb-1">Energy Mix by Country</h3>
        <p className="text-xs text-mist mb-4">Renewable vs fossil vs nuclear share of national generation</p>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={energyByCountry} stackOffset="expand">
            <CartesianGrid stroke="#223448" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="country" stroke="#5c7186" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="#5c7186" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${Math.round(v * 100)}%`} />
            <Tooltip {...chartTooltip} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="renewable" stackId="a" fill="#8ee06a" name="Renewable" radius={[0, 0, 0, 0]} />
            <Bar dataKey="nuclear" stackId="a" fill="#5b9dff" name="Nuclear" />
            <Bar dataKey="fossil" stackId="a" fill="#5c7186" name="Fossil" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </GlassCard>
    </PageShell>
  );
}
