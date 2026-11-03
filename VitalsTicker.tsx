import { executiveKpis } from "@/data/mockData";

const vitals = [
  { label: "ATMOSPHERIC CO₂", value: `${executiveKpis.co2ppm.toFixed(1)} ppm`, trend: "+2.4 ppm YoY" },
  { label: "GLOBAL TEMP ANOMALY", value: `+${executiveKpis.tempAnomaly.toFixed(2)}°C`, trend: "vs 1951–1980 baseline" },
  { label: "SEA LEVEL RISE", value: `${executiveKpis.seaLevelRiseMm} mm`, trend: "since 2010" },
  { label: "ACTIVE DISASTER ALERTS", value: `${executiveKpis.activeAlerts}`, trend: "3 critical" },
  { label: "CITIES MONITORED", value: `${executiveKpis.citiesMonitored.toLocaleString()}`, trend: "real-time telemetry" },
  { label: "RENEWABLE SHARE", value: `${executiveKpis.renewableSharePct}%`, trend: "of global generation" },
  { label: "FOREST COVER LOST", value: `${(executiveKpis.forestCoverLossKm2 / 1000).toFixed(1)}K km²`, trend: "last 12 months" },
];

export default function VitalsTicker() {
  const doubled = [...vitals, ...vitals];
  return (
    <div className="border-b border-line bg-abyss/60 overflow-hidden">
      <div className="flex whitespace-nowrap animate-ticker w-max">
        {doubled.map((v, i) => (
          <div key={i} className="flex items-center gap-2.5 px-6 py-2 border-r border-line/60 font-mono text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse-dot shrink-0" />
            <span className="text-ash">{v.label}</span>
            <span className="text-ink font-medium">{v.value}</span>
            <span className="text-ash">· {v.trend}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
