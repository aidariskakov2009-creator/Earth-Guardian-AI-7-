import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Sprout, Sun, Droplet, Bug } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import GlassCard from "@/components/ui/GlassCard";
import StatCard from "@/components/ui/StatCard";

const soilMoisture = Array.from({ length: 12 }, (_, i) => ({
  month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
  moisture: Math.round(35 + Math.sin(i / 2) * 18 + (i > 5 && i < 9 ? -12 : 0)),
  cropHealth: Math.round(70 + Math.cos(i / 3) * 15),
}));

const chartTooltip = {
  contentStyle: { background: "#101c2c", border: "1px solid #223448", borderRadius: 10, fontSize: 12 },
  labelStyle: { color: "#93a7b8" },
};

export default function SmartAgriculture() {
  return (
    <PageShell title="Smart Agriculture Intelligence" subtitle="Crop health monitoring, soil analytics and climate-aware farming">
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard label="Avg Crop Health" value="76" unit="/100" icon={Sprout} tone="bio" delta={-2.4} deltaLabel="seasonal dip" />
        <StatCard label="Soil Moisture" value="41" unit="% saturation" icon={Droplet} tone="current" />
        <StatCard label="Growing-Degree Days" value="1,840" icon={Sun} tone="amber" />
        <StatCard label="Pest Risk Alerts" value="3" unit="active regions" icon={Bug} tone="coral" />
      </div>

      <GlassCard className="p-5 mb-6">
        <h3 className="font-display text-base font-semibold text-ink mb-1">Soil Moisture &amp; Crop Health Trend</h3>
        <p className="text-xs text-mist mb-4">12-month seasonal cycle, representative farming region</p>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={soilMoisture}>
            <CartesianGrid stroke="#223448" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" stroke="#5c7186" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="#5c7186" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip {...chartTooltip} />
            <Line type="monotone" dataKey="moisture" stroke="#5b9dff" strokeWidth={2} dot={false} name="Soil moisture %" />
            <Line type="monotone" dataKey="cropHealth" stroke="#8ee06a" strokeWidth={2} dot={false} name="Crop health index" />
          </LineChart>
        </ResponsiveContainer>
      </GlassCard>

      <GlassCard className="p-5">
        <h3 className="font-display text-base font-semibold text-ink mb-3">Sustainable Farming Recommendations</h3>
        <div className="grid md:grid-cols-3 gap-3">
          {[
            { t: "Drip irrigation upgrade", d: "Could reduce water use by 30-50% in current moisture conditions." },
            { t: "Cover cropping in dry months", d: "Improves soil retention ahead of the projected summer dip." },
            { t: "Rotate nitrogen-fixing legumes", d: "Reduces fertilizer dependency and improves long-term yield stability." },
          ].map((r) => (
            <div key={r.t} className="p-4 rounded-xl bg-panel-hi/60 border border-line">
              <div className="text-sm font-medium text-ink mb-1">{r.t}</div>
              <div className="text-xs text-mist leading-relaxed">{r.d}</div>
            </div>
          ))}
        </div>
      </GlassCard>
    </PageShell>
  );
}
