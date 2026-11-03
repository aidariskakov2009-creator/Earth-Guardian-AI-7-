import { FlaskConical, Database, BookMarked, Users2 } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import GlassCard from "@/components/ui/GlassCard";
import StatCard from "@/components/ui/StatCard";

const datasets = [
  { name: "Global Surface Temperature Records", records: "2.1M", updated: "Daily", access: "Open" },
  { name: "Satellite Deforestation Imagery", records: "840K", updated: "Weekly", access: "Open" },
  { name: "Ocean Buoy Telemetry Network", records: "5.6M", updated: "Hourly", access: "Open" },
  { name: "Urban Air Quality Sensor Grid", records: "12.3M", updated: "Real-time", access: "Restricted" },
];

export default function Research() {
  return (
    <PageShell title="Climate Research Center" subtitle="Open datasets, AI insights and scientific collaboration tools">
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard label="Open Datasets" value="34" icon={Database} tone="signal" />
        <StatCard label="Published Insights" value="212" icon={BookMarked} tone="current" />
        <StatCard label="Research Partners" value="58" unit="institutions" icon={Users2} tone="bio" />
        <StatCard label="Model Runs / Day" value="1,840" icon={FlaskConical} tone="amber" />
      </div>

      <GlassCard className="p-5">
        <h3 className="font-display text-base font-semibold text-ink mb-1">Open Environmental Datasets</h3>
        <p className="text-xs text-mist mb-4">Available for academic and non-commercial research use</p>
        <div className="flex flex-col">
          {datasets.map((d) => (
            <div key={d.name} className="flex items-center justify-between gap-4 py-3 border-b border-line last:border-0">
              <div>
                <div className="text-sm text-ink font-medium">{d.name}</div>
                <div className="text-xs text-ash mt-0.5">{d.records} records · updated {d.updated}</div>
              </div>
              <span className={`px-2.5 py-1 rounded-full border text-[11px] font-mono ${
                d.access === "Open" ? "text-bio border-bio/30 bg-bio/10" : "text-amber border-amber/30 bg-amber/10"
              }`}>
                {d.access}
              </span>
            </div>
          ))}
        </div>
      </GlassCard>
    </PageShell>
  );
}
