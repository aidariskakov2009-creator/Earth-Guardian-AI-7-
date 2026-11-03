import { GraduationCap, BookOpen, Award } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import GlassCard from "@/components/ui/GlassCard";
import StatCard from "@/components/ui/StatCard";
import { learningModules } from "@/data/mockData";

const levelColor: Record<string, string> = {
  Beginner: "text-bio border-bio/30 bg-bio/10",
  Intermediate: "text-amber border-amber/30 bg-amber/10",
  Advanced: "text-coral border-coral/30 bg-coral/10",
};

export default function LearningHub() {
  return (
    <PageShell title="Sustainability Learning Hub" subtitle="Interactive lessons, climate education and awareness challenges">
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard label="Learning Modules" value={String(learningModules.length)} icon={GraduationCap} tone="signal" />
        <StatCard label="Total Lessons" value={String(learningModules.reduce((s, m) => s + m.lessons, 0))} icon={BookOpen} tone="current" />
        <StatCard label="Learners Enrolled" value="184K+" icon={Award} tone="bio" />
        <StatCard label="Avg Completion" value="67" unit="%" icon={GraduationCap} tone="amber" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {learningModules.map((m) => (
          <GlassCard key={m.title} className="p-5 flex flex-col gap-3">
            <div className="flex items-start justify-between">
              <h3 className="font-display text-base font-semibold text-ink leading-snug">{m.title}</h3>
              <span className={`shrink-0 px-2 py-0.5 rounded-full border text-[10px] font-mono ${levelColor[m.level]}`}>
                {m.level}
              </span>
            </div>
            <div className="text-xs text-mist">{m.lessons} lessons</div>
            <div className="h-1.5 rounded-full bg-panel-hi overflow-hidden">
              <div className="h-full bg-signal rounded-full" style={{ width: `${30 + (m.lessons * 5) % 60}%` }} />
            </div>
            <button className="mt-1 text-xs font-mono text-signal hover:underline text-left">Continue learning →</button>
          </GlassCard>
        ))}
      </div>
    </PageShell>
  );
}
