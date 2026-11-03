import { Users, Handshake, Globe2 } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import GlassCard from "@/components/ui/GlassCard";
import StatCard from "@/components/ui/StatCard";
import { ngoDirectory } from "@/data/mockData";

export default function Volunteer() {
  const totalVolunteers = ngoDirectory.reduce((s, n) => s + n.volunteers, 0);

  return (
    <PageShell title="Volunteer & NGO Network" subtitle="Directory of environmental organizations and volunteer opportunities">
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard label="Partner Organizations" value={String(ngoDirectory.length)} unit="verified NGOs" icon={Handshake} tone="signal" />
        <StatCard label="Active Volunteers" value={`${(totalVolunteers / 1000).toFixed(1)}K`} icon={Users} tone="bio" />
        <StatCard label="Regions Covered" value="6" icon={Globe2} tone="current" />
        <StatCard label="Open Campaigns" value="19" icon={Handshake} tone="amber" />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {ngoDirectory.map((n) => (
          <GlassCard key={n.name} className="p-5 flex items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-base font-semibold text-ink mb-1">{n.name}</h3>
              <p className="text-xs text-mist">{n.focus} · {n.region}</p>
            </div>
            <div className="text-right shrink-0">
              <div className="font-mono text-lg text-signal">{n.volunteers.toLocaleString()}</div>
              <div className="text-[10px] text-ash uppercase tracking-wider">volunteers</div>
            </div>
          </GlassCard>
        ))}
      </div>
    </PageShell>
  );
}
