import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Wind, HeartPulse, Building2, Gauge } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import GlassCard from "@/components/ui/GlassCard";
import StatCard from "@/components/ui/StatCard";
import { aqiHistory24h, cities } from "@/data/mockData";

const chartTooltip = {
  contentStyle: { background: "#101c2c", border: "1px solid #223448", borderRadius: 10, fontSize: 12 },
  labelStyle: { color: "#93a7b8" },
};

function aqiLabel(v: number) {
  if (v <= 50) return { text: "Good", color: "text-bio" };
  if (v <= 100) return { text: "Moderate", color: "text-amber" };
  if (v <= 150) return { text: "Unhealthy (Sensitive)", color: "text-amber" };
  if (v <= 200) return { text: "Unhealthy", color: "text-coral" };
  return { text: "Very Unhealthy", color: "text-coral" };
}

export default function AirQuality() {
  const ranked = [...cities].sort((a, b) => b.aqi - a.aqi);

  return (
    <PageShell title="Air Quality Intelligence" subtitle="AQI monitoring, pollution analytics and health impact estimation">
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard label="Worst AQI Today" value={String(ranked[0].aqi)} unit={ranked[0].name} icon={Wind} tone="coral" />
        <StatCard label="Cities in 'Good' Range" value={String(cities.filter((c) => c.aqi <= 50).length)} icon={Gauge} tone="bio" />
        <StatCard label="Avg Health Risk Score" value="63" unit="/100" icon={HeartPulse} tone="amber" delta={2.3} deltaLabel="rising" />
        <StatCard label="Monitoring Stations" value="8,400+" icon={Building2} tone="signal" />
      </div>

      <GlassCard className="p-5 mb-6">
        <h3 className="font-display text-base font-semibold text-ink mb-1">24-Hour AQI Trend — Selected Cities</h3>
        <p className="text-xs text-mist mb-4">Hourly readings, particulate + gaseous composite index</p>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={aqiHistory24h}>
            <CartesianGrid stroke="#223448" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="hour" stroke="#5c7186" fontSize={10} tickLine={false} axisLine={false} interval={2} />
            <YAxis stroke="#5c7186" fontSize={11} tickLine={false} axisLine={false} width={35} />
            <Tooltip {...chartTooltip} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Line type="monotone" dataKey="delhi" stroke="#fb5b4e" strokeWidth={2} dot={false} name="New Delhi" />
            <Line type="monotone" dataKey="jakarta" stroke="#f5a524" strokeWidth={2} dot={false} name="Jakarta" />
            <Line type="monotone" dataKey="saopaulo" stroke="#5b9dff" strokeWidth={2} dot={false} name="São Paulo" />
            <Line type="monotone" dataKey="london" stroke="#8ee06a" strokeWidth={2} dot={false} name="London" />
          </LineChart>
        </ResponsiveContainer>
      </GlassCard>

      <GlassCard className="p-5">
        <h3 className="font-display text-base font-semibold text-ink mb-1">City Comparison</h3>
        <p className="text-xs text-mist mb-4">Ranked by current AQI reading</p>
        <div className="flex flex-col gap-2">
          {ranked.map((c) => {
            const status = aqiLabel(c.aqi);
            return (
              <div key={c.id} className="flex items-center gap-4 py-2.5 border-b border-line last:border-0">
                <div className="w-36 shrink-0">
                  <div className="text-sm text-ink font-medium">{c.name}</div>
                  <div className="text-xs text-ash">{c.country}</div>
                </div>
                <div className="flex-1 h-2 rounded-full bg-panel-hi overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.min(100, (c.aqi / 250) * 100)}%`,
                      background: c.aqi > 150 ? "#fb5b4e" : c.aqi > 100 ? "#f5a524" : c.aqi > 50 ? "#5b9dff" : "#8ee06a",
                    }}
                  />
                </div>
                <div className="w-12 text-right font-mono text-sm text-ink">{c.aqi}</div>
                <div className={`w-44 text-xs font-mono ${status.color}`}>{status.text}</div>
              </div>
            );
          })}
        </div>
      </GlassCard>
    </PageShell>
  );
}
