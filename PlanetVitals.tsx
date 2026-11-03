import { useEffect, useState } from "react";

const VITALS = [
  { label: "ATMOSPHERIC CO2", base: 425.4, jitter: 0.06, decimals: 2, unit: "ppm" },
  { label: "GLOBAL TEMP ANOMALY", base: 1.24, jitter: 0.01, decimals: 2, unit: "°C" },
  { label: "SEA LEVEL RISE", base: 106.8, jitter: 0.05, decimals: 1, unit: "mm/decade" },
  { label: "ARCTIC ICE EXTENT", base: 4.12, jitter: 0.02, decimals: 2, unit: "M km²" },
  { label: "ACTIVE RISK ALERTS", base: 312, jitter: 2, decimals: 0, unit: "sites" },
];

export function PlanetVitals() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2600);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="glass-strong relative overflow-hidden rounded-2xl">
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
        <div className="animate-scan absolute left-0 right-0 h-16 bg-gradient-to-b from-transparent via-signal-500/10 to-transparent" />
      </div>
      <div className="relative flex flex-wrap items-stretch divide-y divide-white/5 sm:divide-y-0 sm:divide-x">
        {VITALS.map((v, i) => {
          const value = v.base + Math.sin(tick * 0.7 + i * 12.3) * v.jitter;
          return (
            <div key={v.label} className="flex min-w-[150px] flex-1 items-center gap-2 px-5 py-4">
              <span className="h-1.5 w-1.5 shrink-0 animate-pulse-dot rounded-full bg-signal-400" />
              <div>
                <p className="font-mono text-[10px] tracking-[0.14em] text-mist-500">{v.label}</p>
                <p className="font-mono text-lg font-medium text-mist-100">
                  {value.toFixed(v.decimals)}<span className="ml-1 text-xs text-mist-500">{v.unit}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
