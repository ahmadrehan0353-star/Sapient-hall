"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { cn } from "@/lib/utils";
import { galleryAlbums, galleryImages, type GalleryImage } from "@/lib/data/gallery";

const BATCH = 12;

const aspectClass: Record<GalleryImage["aspect"], string> = {
  square: "aspect-square",
  tall: "aspect-[3/4]",
  wide: "aspect-[4/3]",
};

export function GalleryGrid() {
  const [album, setAlbum] = React.useState("all");
  const [visible, setVisible] = React.useState(BATCH);
  const [lightbox, setLightbox] = React.useState<number | null>(null);
  const sentinelRef = React.useRef<HTMLDivElement>(null);

  const filtered = album === "all" ? galleryImages : galleryImages.filter((g) => g.album === album);
  const shown = filtered.slice(0, visible);

  // Infinite scroll via IntersectionObserver
  React.useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setVisible((v) => Math.min(v + BATCH, filtered.length));
      },
      { rootMargin: "400px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [filtered.length]);

  React.useEffect(() => {
    if (lightbox === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => (i === null ? null : (i + 1) % shown.length));
      if (e.key === "ArrowLeft") setLightbox((i) => (i === null ? null : (i - 1 + shown.length) % shown.length));
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, shown.length]);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by album">
        {[{ id: "all", name: "All" }, ...galleryAlbums].map((a) => (
          <button
            key={a.id}
            role="tab"
            aria-selected={album === a.id}
            onClick={() => { setAlbum(a.id); setVisible(BATCH); }}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              album === a.id ? "bg-navy-900 text-white" : "bg-surface-muted text-navy-600 hover:bg-navy-900/10"
            )}
          >
            {a.name}
          </button>
        ))}
      </div>

      <div className="mt-8 columns-2 gap-4 sm:columns-3 lg:columns-4 [&>button]:mb-4">
        {shown.map((img, i) => (
          <button
            key={img.id}
            onClick={() => setLightbox(i)}
            aria-label={`Open image: ${img.caption}`}
            className="block w-full break-inside-avoid overflow-hidden rounded-lg transition-transform duration-300 hover:scale-[1.02]"
          >
            <ImagePlaceholder icon={Camera} src={img.url} alt={img.caption} index={i} label={img.caption} aspect={aspectClass[img.aspect]} />
          </button>
        ))}
      </div>

      {visible < filtered.length && <div ref={sentinelRef} className="h-10" aria-hidden />}

      <AnimatePresence>
        {lightbox !== null && shown[lightbox] && (
          <motion.div
            className="fixed inset-0 z-[95] flex items-center justify-center bg-navy-950/90 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={shown[lightbox].caption}
            onClick={() => setLightbox(null)}
          >
            <button
              aria-label="Close lightbox"
              className="absolute right-5 top-5 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20"
              onClick={() => setLightbox(null)}
            >
              <X className="size-5" />
            </button>
            <button
              aria-label="Previous image"
              className="absolute left-4 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20"
              onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i! - 1 + shown.length) % shown.length); }}
            >
              <ChevronLeft className="size-5" />
            </button>
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <ImagePlaceholder icon={Camera} src={shown[lightbox].url} alt={shown[lightbox].caption} index={lightbox} aspect="aspect-[16/10]" />
              <p className="mt-4 text-center text-body-sm text-white/80">{shown[lightbox].caption}</p>
            </motion.div>
            <button
              aria-label="Next image"
              className="absolute right-4 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20"
              onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i! + 1) % shown.length); }}
            >
              <ChevronRight className="size-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
