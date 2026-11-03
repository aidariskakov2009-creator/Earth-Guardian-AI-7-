import { useState } from "react";
import type { City } from "@/data/mockData";

// Simplified continental dot-field, hand-placed to approximate landmass silhouettes
// on an equirectangular projection. This avoids external map tile dependencies while
// giving the ops-room "satellite telemetry" signature look.
function generateLandDots() {
  const dots: { x: number; y: number }[] = [];
  const regions = [
    // North America
    { x0: 60, x1: 220, y0: 40, y1: 130 },
    { x0: 40, x1: 140, y0: 100, y1: 160 },
    // South America
    { x0: 140, x1: 210, y0: 170, y1: 260 },
    // Europe
    { x0: 380, x1: 460, y0: 40, y1: 95 },
    // Africa
    { x0: 380, x1: 470, y0: 100, y1: 230 },
    // Asia
    { x0: 460, x1: 680, y0: 30, y1: 160 },
    { x0: 520, x1: 640, y0: 150, y1: 200 },
    // Australia
    { x0: 620, x1: 700, y0: 210, y1: 250 },
  ];
  for (const r of regions) {
    for (let x = r.x0; x < r.x1; x += 9) {
      for (let y = r.y0; y < r.y1; y += 9) {
        // jitter + sparsify for organic coastline feel
        const noise = Math.sin(x * 0.3) * Math.cos(y * 0.4);
        if (noise > -0.35) {
          dots.push({ x: x + (noise * 3), y: y + (noise * 2) });
        }
      }
    }
  }
  return dots;
}

const landDots = generateLandDots();

function project(lat: number, lng: number) {
  const x = (lng + 180) * (760 / 360);
  const y = (90 - lat) * (300 / 180);
  return { x, y };
}

export default function WorldMap({
  cities,
  metric = "climateRisk",
  onSelect,
}: {
  cities: City[];
  metric?: keyof City;
  onSelect?: (city: City) => void;
}) {
  const [hovered, setHovered] = useState<City | null>(null);

  const colorFor = (v: number) => {
    if (v >= 75) return "var(--color-coral)";
    if (v >= 50) return "var(--color-amber)";
    if (v >= 25) return "var(--color-current)";
    return "var(--color-bio)";
  };

  return (
    <div className="relative w-full">
      <svg viewBox="0 0 760 300" className="w-full h-auto">
        <rect x={0} y={0} width={760} height={300} fill="transparent" />
        {landDots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={1.1} fill="var(--color-line)" />
        ))}
        {cities.map((city) => {
          const { x, y } = project(city.lat, city.lng);
          const value = Number(city[metric]);
          const r = 4 + (value / 100) * 8;
          const color = colorFor(value);
          return (
            <g
              key={city.id}
              onMouseEnter={() => setHovered(city)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onSelect?.(city)}
              className="cursor-pointer"
            >
              <circle cx={x} cy={y} r={r + 6} fill={color} opacity={0.12} />
              <circle cx={x} cy={y} r={r} fill={color} opacity={0.85} stroke="var(--color-abyss)" strokeWidth={1} />
              {value >= 75 && (
                <circle cx={x} cy={y} r={r} fill="none" stroke={color} strokeWidth={1.5} opacity={0.6}>
                  <animate attributeName="r" values={`${r};${r + 10};${r}`} dur="2.2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6;0;0.6" dur="2.2s" repeatCount="indefinite" />
                </circle>
              )}
            </g>
          );
        })}
      </svg>
      {hovered && (
        <div className="absolute top-2 left-2 glass rounded-xl px-3.5 py-2.5 pointer-events-none animate-rise">
          <div className="font-display text-sm font-semibold text-ink">{hovered.name}, {hovered.country}</div>
          <div className="text-xs text-mist font-mono mt-0.5">
            {String(metric)}: <span className="text-ink">{String(hovered[metric])}</span>
          </div>
        </div>
      )}
    </div>
  );
}
