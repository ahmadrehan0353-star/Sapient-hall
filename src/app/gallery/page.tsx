import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { GalleryGrid } from "@/components/shared/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos from campus life at Sapient Hall — classrooms, sports, events, and more.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Campus life, in pictures."
        description="Browse by album — classrooms, sports, laboratories, and the events that shape the year."
        crumbs={[{ label: "Gallery" }]}
      />
      <section className="container-page section-y">
        <GalleryGrid />
      </section>
    </>
  );
}
