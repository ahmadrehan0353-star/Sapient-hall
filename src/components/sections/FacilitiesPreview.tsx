import Link from "next/link";
import { ArrowRight, FlaskConical, Monitor, BookMarked, Waves, ShieldCheck, Bus } from "lucide-react";
import { Reveal, RevealGroup } from "@/components/motion/Reveal";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { siteImages } from "@/lib/site-images";

const facilities = [
  { icon: FlaskConical, name: "Science Laboratories", image: siteImages.facilities.teaching },
  { icon: Monitor, name: "Computer Laboratories", image: siteImages.facilities.computerLabs },
  { icon: BookMarked, name: "Library", image: siteImages.facilities.library },
  { icon: Waves, name: "Swimming Pool & Gym", image: siteImages.facilities.pool },
  { icon: ShieldCheck, name: "CCTV & Security", image: siteImages.facilities.cctv },
  { icon: Bus, name: "Transport", image: siteImages.facilities.campus },
];

export function FacilitiesPreview() {
  return (
    <section className="container-page section-y">
      <Reveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow">On campus</p>
          <h2 className="mt-3 max-w-xl text-display-md">Facilities built for how children actually learn.</h2>
        </div>
        <Link href="/facilities" className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 hover:text-royal-600">
          Explore all facilities <ArrowRight className="size-4" />
        </Link>
      </Reveal>

      <RevealGroup className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
        {facilities.map((f, i) => (
          <Reveal key={f.name}>
            <div className="group relative overflow-hidden rounded-lg">
              <ImagePlaceholder index={i} src={f.image} alt={f.name} aspect="aspect-square" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-3 text-center">
                <f.icon className="size-6 text-gold-400" />
                <span className="text-caption font-semibold text-white">{f.name}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </RevealGroup>
    </section>
  );
}
