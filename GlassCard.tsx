import type { ReactNode } from "react";
import clsx from "clsx";

export default function GlassCard({
  children,
  className,
  glow,
}: {
  children: ReactNode;
  className?: string;
  glow?: "signal" | "coral" | "amber" | "current" | "bio" | "none";
}) {
  const glowMap: Record<string, string> = {
    signal: "shadow-[0_0_40px_-20px_var(--color-signal)]",
    coral: "shadow-[0_0_40px_-20px_var(--color-coral)]",
    amber: "shadow-[0_0_40px_-20px_var(--color-amber)]",
    current: "shadow-[0_0_40px_-20px_var(--color-current)]",
    bio: "shadow-[0_0_40px_-20px_var(--color-bio)]",
    none: "",
  };

  return (
    <div
      className={clsx(
        "glass rounded-2xl",
        glow ? glowMap[glow] : "",
        className
      )}
    >
      {children}
    </div>
  );
}
