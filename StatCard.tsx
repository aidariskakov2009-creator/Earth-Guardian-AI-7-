import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export function StatCard({ label, value, delta, icon: Icon, tone = "signal" }: {
  label: string; value: string; delta?: string; icon?: LucideIcon; tone?: "signal" | "amber" | "flare";
}) {
  const positive = delta ? !delta.trim().startsWith("-") : true;
  const toneColor = tone === "amber" ? "text-amber-400" : tone === "flare" ? "text-flare-400" : "text-signal-400";
  return (
    <div className="glass animate-rise rounded-2xl p-5">
      <div className="flex items-center justify-between gap-2">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mist-500">{label}</p>
        {Icon && <Icon className={`h-4 w-4 shrink-0 ${toneColor}`} strokeWidth={1.75} />}
      </div>
      <p className="mt-3 font-display text-2xl font-semibold text-mist-100">{value}</p>
      {delta && (
        <p className={`mt-1 flex items-center gap-1 text-xs font-medium ${positive ? "text-signal-400" : "text-flare-400"}`}>
          {positive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
          {delta}
        </p>
      )}
    </div>
  );
}

export function RiskBadge({ score }: { score: number }) {
  const tone = score >= 80 ? "bg-flare-500/15 text-flare-400 border-flare-500/30"
    : score >= 60 ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
    : "bg-signal-500/15 text-signal-400 border-signal-500/30";
  const label = score >= 80 ? "Critical" : score >= 60 ? "Elevated" : "Stable";
  return <span className={`rounded-full border px-2.5 py-0.5 font-mono text-[11px] ${tone}`}>{label} · {score}</span>;
}

export function SeverityBadge({ severity }: { severity: string }) {
  const map: Record<string, string> = {
    Critical: "bg-flare-500/15 text-flare-400 border-flare-500/30",
    High: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    Moderate: "bg-signal-500/15 text-signal-400 border-signal-500/30",
    Watch: "bg-mist-500/15 text-mist-300 border-mist-500/30",
  };
  return <span className={`rounded-full border px-2.5 py-0.5 font-mono text-[11px] ${map[severity] ?? map.Watch}`}>{severity}</span>;
}
