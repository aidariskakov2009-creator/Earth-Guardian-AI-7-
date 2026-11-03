export default function GaugeRadial({
  value,
  size = 180,
  label,
  sublabel,
}: {
  value: number; // 0-100
  size?: number;
  label: string;
  sublabel?: string;
}) {
  const stroke = size * 0.07;
  const radius = (size - stroke) / 2;
  const circumference = radius * 2 * Math.PI;
  const arcFraction = 0.75; // 270deg gauge
  const arcLength = circumference * arcFraction;
  const offset = arcLength - (value / 100) * arcLength;

  const color = value >= 70 ? "var(--color-coral)" : value >= 45 ? "var(--color-amber)" : "var(--color-bio)";

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-[225deg]">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-line)"
          strokeWidth={stroke}
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeLinecap="round"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.16,1,0.3,1)" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-display text-4xl font-semibold tabular-nums" style={{ color }}>
          {value}
        </span>
        <span className="text-[11px] uppercase tracking-widest text-mist mt-1">{label}</span>
        {sublabel && <span className="text-[10px] text-ash mt-0.5">{sublabel}</span>}
      </div>
    </div>
  );
}
