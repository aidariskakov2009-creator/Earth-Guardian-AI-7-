import type { ReactNode } from "react";

export function Panel({ children, className = "", glow = false }: { children: ReactNode; className?: string; glow?: boolean }) {
  return <div className={`glass rounded-2xl shadow-glass ${glow ? "shadow-glow" : ""} ${className}`}>{children}</div>;
}

export function PanelHeader({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 px-5 pt-5">
      <div>
        {eyebrow && <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-signal-500/80">{eyebrow}</p>}
        <h3 className="mt-1 font-display text-base font-semibold text-mist-100">{title}</h3>
      </div>
      {action}
    </div>
  );
}

export const tooltipStyle = {
  background: "#0D1826", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, fontSize: 12, color: "#EAF1F7",
};

export function InfoCard({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
      <p className="font-display text-sm font-semibold text-signal-400">{title}</p>
      <p className="mt-2 text-xs leading-relaxed text-mist-400">{detail}</p>
    </div>
  );
}

export function Bar({ pct, color = "#22D3EE" }: { pct: number; color?: string }) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-white/5">
      <div className="h-full rounded-full" style={{ width: `${Math.max(0, Math.min(100, pct))}%`, backgroundColor: color }} />
    </div>
  );
}
