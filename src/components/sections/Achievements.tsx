import { Trophy, Medal, Star } from "lucide-react";
import { Reveal, RevealGroup } from "@/components/motion/Reveal";

// Placeholder — swap in real recent achievements/results.
const achievements = [
  { icon: Trophy, title: "Regional Science Fair", detail: "1st place, Grades 6–8 category, 2026" },
  { icon: Medal, title: "Inter-School Athletics", detail: "Overall champions trophy, 2025–26 season" },
  { icon: Star, title: "Cambridge Outstanding Learner", detail: "3 students recognised at IGCSE level" },
];

export function Achievements() {
  return (
    <section className="container-page section-y">
      <Reveal>
        <p className="eyebrow">Student achievements</p>
        <h2 className="mt-3 max-w-xl text-display-md">Wins our students earned this year.</h2>
      </Reveal>

      <RevealGroup className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {achievements.map((a) => (
          <Reveal key={a.title} className="flex items-start gap-4 rounded-lg border border-surface-border bg-surface-card p-6 shadow-card">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-sm bg-gold-500/15 text-gold-600">
              <a.icon className="size-5" />
            </span>
            <div>
              <h3 className="font-display text-base font-semibold text-navy-900">{a.title}</h3>
              <p className="mt-1 text-body-sm text-navy-500">{a.detail}</p>
            </div>
          </Reveal>
        ))}
      </RevealGroup>
    </section>
  );
}
