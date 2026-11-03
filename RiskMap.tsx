import { useState } from "react";
import type { CityRisk } from "../../data/mockData";

const project = (lat: number, lon: number) => ({ x: ((lon + 180) / 360) * 1000, y: ((90 - lat) / 180) * 500 });
const color = (s: number) => (s >= 80 ? "#FF6B5B" : s >= 60 ? "#F5A623" : "#22D3EE");

// Abstract decorative landmass shapes (stylized, not accurate cartography).
const blobs = [
  "M60,120 Q140,80 220,110 T340,150 Q300,220 220,230 T90,210 Z",
  "M420,90 Q520,60 600,100 T700,160 Q640,230 540,220 T430,190 Z",
  "M120,260 Q200,240 260,280 T300,360 Q230,420 160,390 T110,320 Z",
  "M540,250 Q640,230 720,270 T800,340 Q740,410 640,400 T530,340 Z",
  "M720,80 Q820,60 900,110 T960,170 Q900,210 820,190 T700,150 Z",
];

export function RiskMap({ cities }: { cities: CityRisk[] }) {
  const [active, setActive] = useState<CityRisk | null>(cities[0] ?? null);
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
      <div className="relative overflow-hidden rounded-xl border border-white/5 bg-void-900/40">
        <svg viewBox="0 0 1000 500" className="h-[320px] w-full sm:h-[400px]" role="img" aria-label="Stylized global risk map">
          <defs>
            <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0 L0 0 0 40" fill="none" stroke="rgba(94,234,212,0.06)" strokeWidth="1" />
            </pattern>
            <radialGradient id="pulseGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.55" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="1000" height="500" fill="url(#gridPattern)" />
          {blobs.map((d, i) => <path key={i} d={d} fill="rgba(94,234,212,0.045)" stroke="rgba(94,234,212,0.09)" />)}
          <line x1="0" y1="250" x2="1000" y2="250" stroke="rgba(94,234,212,0.12)" strokeDasharray="2 6" />
          {cities.map((c) => {
            const { x, y } = project(c.lat, c.lon);
            const col = color(c.riskScore);
            const r = 4 + c.riskScore / 22;
            return (
              <g key={c.city} onMouseEnter={() => setActive(c)} onClick={() => setActive(c)} className="cursor-pointer" style={{ color: col }}>
                <circle cx={x} cy={y} r={r * 3.2} fill="url(#pulseGrad)" />
                <circle cx={x} cy={y} r={r} fill={col} fillOpacity={active?.city === c.city ? 1 : 0.75}
                  stroke={active?.city === c.city ? "#EAF1F7" : "none"} strokeWidth={1.5} />
              </g>
            );
          })}
        </svg>
        <div className="absolute bottom-3 left-3 flex gap-3 rounded-lg border border-white/10 bg-void-950/70 px-3 py-1.5 font-mono text-[10px] text-mist-400 backdrop-blur">
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-signal-500" /> Stable</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-500" /> Elevated</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-flare-500" /> Critical</span>
        </div>
      </div>
      <div className="rounded-xl border border-white/5 bg-void-900/40 p-4">
        {active ? (
          <div className="animate-rise">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-signal-500/80">{active.country}</p>
            <h4 className="mt-1 font-display text-xl font-semibold">{active.city}</h4>
            <p className="mt-1 text-xs text-mist-500">Primary hazard: {active.primaryHazard}</p>
            <dl className="mt-4 space-y-2.5 text-sm">
              {[
                ["Risk Score", `${active.riskScore}/100`, color(active.riskScore)],
                ["Air Quality Index", `${active.aqi}`, "#EAF1F7"],
                ["Temp Anomaly", `+${active.tempAnomaly}°C`, "#EAF1F7"],
                ["Water Stress", `${active.waterStress}%`, "#EAF1F7"],
                ["Population", `${active.population}M`, "#EAF1F7"],
              ].map(([k, v, c]) => (
                <div key={k} className="flex items-center justify-between">
                  <dt className="text-mist-500">{k}</dt>
                  <dd className="font-mono font-medium" style={{ color: c }}>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        ) : <p className="text-sm text-mist-500">Select a marker to inspect city telemetry.</p>}
      </div>
    </div>
  );
}
