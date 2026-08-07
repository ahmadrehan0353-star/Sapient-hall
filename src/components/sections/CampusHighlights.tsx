import { MapPin, Phone } from "lucide-react";
import { Reveal, RevealGroup } from "@/components/motion/Reveal";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { siteImages } from "@/lib/site-images";
import { Button } from "@/components/ui/Button";
import { campuses } from "@/lib/site-config";

export function CampusHighlights() {
  return (
    <section className="container-page section-y">
      <Reveal>
        <p className="eyebrow">Two campuses</p>
        <h2 className="mt-3 max-w-xl text-display-md">Choose the campus that fits your family.</h2>
      </Reveal>

      <RevealGroup className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {campuses.map((c, i) => (
          <Reveal key={c.id} className="overflow-hidden rounded-lg border border-surface-border bg-surface-card shadow-card">
            <ImagePlaceholder src={c.id === "flagship" ? siteImages.campuses.flagship : siteImages.campuses.bahria} alt={c.name} label={c.name} index={i} aspect="aspect-[16/9]" className="rounded-none" />
            <div className="p-7">
              <h3 className="text-display-sm">{c.name}</h3>
              <p className="mt-1 text-body-sm font-medium text-royal-600">{c.grades}</p>
              <div className="mt-4 space-y-2.5 text-body-sm text-navy-600">
                <p className="flex gap-2.5">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-navy-400" /> {c.address}
                </p>
                <p className="flex gap-2.5">
                  <Phone className="mt-0.5 size-4 shrink-0 text-navy-400" /> {c.phone.join(" · ")}
                </p>
              </div>
              <Button href="/contact" variant="outline" size="md" className="mt-6">
                Get Directions
              </Button>
            </div>
          </Reveal>
        ))}
      </RevealGroup>
    </section>
  );
}
