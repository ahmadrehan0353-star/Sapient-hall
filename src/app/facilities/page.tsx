import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { AdmissionsCTA } from "@/components/sections/AdmissionsCTA";
import { CheckCircle2 } from "lucide-react";
import { facilitiesList } from "@/lib/data/facilities";

export const metadata: Metadata = {
  title: "Facilities",
  description:
    "Science and computer laboratories, library, sports complex, swimming pool, transport, security, and more across Sapient Hall's purpose-built campuses.",
};

export default function FacilitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Facilities"
        title="A campus built on purpose, not adapted by accident."
        description="Both campuses were designed as schools from the ground up — every facility exists because it serves how children actually learn, play, and stay safe."
        crumbs={[{ label: "Facilities" }]}
      />

      <section className="container-page section-y space-y-16">
        {facilitiesList.map((f, i) => (
          <Reveal key={f.id} className={`grid grid-cols-1 gap-8 lg:grid-cols-2 ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: Math.min(f.imageCount, 4) }).map((_, j) => (
                <ImagePlaceholder
                  key={j}
                  icon={f.icon}
                  index={i + j}
                  src={j === 0 ? f.image : undefined}
                  alt={f.name}
                  aspect={j === 0 && f.imageCount >= 3 ? "aspect-[4/3] col-span-2" : "aspect-[4/3]"}
                />
              ))}
            </div>
            <div className="flex flex-col justify-center">
              <span className="flex size-12 items-center justify-center rounded-sm bg-navy-900/5 text-navy-900">
                <f.icon className="size-6" />
              </span>
              <h2 className="mt-5 text-display-sm">{f.name}</h2>
              <p className="mt-3 max-w-xl text-body-md text-navy-600">{f.description}</p>
              <ul className="mt-5 space-y-2.5">
                {f.highlights.map((h) => (
                  <li key={h} className="flex gap-2.5 text-body-sm text-navy-600">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-gold-500" /> {h}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </section>

      <div className="pb-16 sm:pb-22">
        <AdmissionsCTA />
      </div>
    </>
  );
}
