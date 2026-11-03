import clsx from "clsx";

const styles: Record<string, string> = {
  Critical: "bg-coral/15 text-coral border-coral/30",
  Warning: "bg-amber/15 text-amber border-amber/30",
  Watch: "bg-current/15 text-current border-current/30",
};

export default function RiskBadge({ level }: { level: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-mono uppercase tracking-wider",
        styles[level] ?? "bg-line/40 text-mist border-line"
      )}
    >
      <span
        className={clsx(
          "w-1.5 h-1.5 rounded-full animate-pulse-dot",
          level === "Critical" && "bg-coral",
          level === "Warning" && "bg-amber",
          level === "Watch" && "bg-current"
        )}
      />
      {level}
    </span>
  );
}
