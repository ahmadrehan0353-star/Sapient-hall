import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal, RevealGroup } from "@/components/motion/Reveal";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Badge } from "@/components/ui/Badge";
import { AdmissionsCTA } from "@/components/sections/AdmissionsCTA";
import { academicLevels } from "@/lib/data/academics";

export const metadata: Metadata = {
  title: "Academics",
  description:
    "One continuous Cambridge-aligned pathway from Pre-School through A Levels at Sapient Hall School System.",
};

export default function AcademicsPage() {
  return (
    <>
      <PageHero
        eyebrow="Academics"
        title="One continuous pathway, Pre-School to A Levels."
        description="Every stage builds on the last — same standards, same values, no jarring transitions between schools."
        crumbs={[{ label: "Academics" }]}
      />

      <section className="container-page section-y">
        <RevealGroup className="grid grid-cols-1 gap-8">
          {academicLevels.map((level, i) => (
            <Reveal key={level.slug}>
              <Link
                href={`/academics/${level.slug}`}
                className="group grid grid-cols-1 gap-6 overflow-hidden rounded-lg border border-surface-border bg-surface-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lifted lg:grid-cols-[0.85fr_1.15fr]"
              >
                <ImagePlaceholder icon={BookOpen} index={i} aspect="aspect-[16/9] lg:aspect-auto lg:h-full" className="rounded-none" />
                <div className="flex flex-col justify-center p-7 lg:py-9">
                  <Badge variant="royal" className="w-fit">{level.ageRange}</Badge>
                  <h2 className="mt-3 text-display-sm">{level.name}</h2>
                  <p className="mt-3 max-w-xl text-body-md text-navy-600">{level.intro}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 group-hover:text-royal-600">
                    Explore {level.name} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </RevealGroup>
      </section>

      <div className="pb-16 sm:pb-22">
        <AdmissionsCTA />
      </div>
    </>
  );
}
