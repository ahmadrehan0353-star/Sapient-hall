import Link from "next/link";
import { ArrowRight, Camera } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

export function GalleryPreview() {
  return (
    <section className="container-page section-y">
      <Reveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow">Campus life</p>
          <h2 className="mt-3 max-w-xl text-display-md">A look inside Sapient Hall.</h2>
        </div>
        <Link href="/gallery" className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 hover:text-royal-600">
          Open full gallery <ArrowRight className="size-4" />
        </Link>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <ImagePlaceholder key={i} icon={Camera} index={i} aspect="aspect-square" />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
