import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { Reveal, RevealGroup } from "@/components/motion/Reveal";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Badge } from "@/components/ui/Badge";
import { programs } from "@/lib/data/programs";

export function Programs() {
  return (
    <section className="bg-surface-muted/60">
      <div className="container-page section-y">
        <Reveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">Academic pathway</p>
            <h2 className="mt-3 max-w-xl text-display-md">One school, one continuous journey.</h2>
          </div>
          <Link href="/academics" className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 hover:text-royal-600">
            View full academics <ArrowRight className="size-4" />
          </Link>
        </Reveal>

        <RevealGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {programs.map((p, i) => (
            <Reveal key={p.id}>
              <Link
                href={p.href}
                className="group flex h-full flex-col overflow-hidden rounded-lg border border-surface-border bg-surface-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lifted"
              >
                <ImagePlaceholder icon={BookOpen} index={i} aspect="aspect-[4/3]" />
                <div className="flex flex-1 flex-col p-5">
                  <Badge variant="royal" className="w-fit">{p.ageRange}</Badge>
                  <h3 className="mt-3 text-display-sm">{p.name}</h3>
                  <p className="mt-2 flex-1 text-body-sm text-navy-500">{p.summary}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 group-hover:text-royal-600">
                    Learn more <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
