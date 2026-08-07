import { ShieldCheck, GraduationCap, Users2, Heart } from "lucide-react";
import { Reveal, RevealGroup } from "@/components/motion/Reveal";

const reasons = [
  {
    icon: GraduationCap,
    title: "Cambridge, End to End",
    description:
      "One continuous curriculum from Pre-School through A Levels — no jarring transitions, no need to change schools.",
  },
  {
    icon: ShieldCheck,
    title: "A Genuinely Safe Campus",
    description:
      "Purpose-built facilities, CCTV monitoring throughout, and controlled access at every entry point on both campuses.",
  },
  {
    icon: Users2,
    title: "Small-Class Attention",
    description:
      "Class sizes kept deliberately small so every student gets noticed — academically and personally.",
  },
  {
    icon: Heart,
    title: "Character, Not Just Grades",
    description:
      "Respect, honesty, and confidence are built into daily school life, not bolted on as an afterthought.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="container-page section-y">
      <Reveal>
        <p className="eyebrow">Why families choose us</p>
        <h2 className="mt-3 max-w-2xl text-display-md">
          An education built on structure, safety, and genuine care.
        </h2>
      </Reveal>

      <RevealGroup className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {reasons.map((r) => (
          <Reveal key={r.title} className="rounded-lg border border-surface-border bg-surface-card p-6 shadow-card transition-shadow hover:shadow-lifted">
            <span className="flex size-11 items-center justify-center rounded-sm bg-navy-900/5 text-navy-900">
              <r.icon className="size-5" />
            </span>
            <h3 className="mt-5 text-display-sm">{r.title}</h3>
            <p className="mt-2 text-body-sm text-navy-500">{r.description}</p>
          </Reveal>
        ))}
      </RevealGroup>
    </section>
  );
}
