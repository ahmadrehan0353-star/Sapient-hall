import type { Metadata } from "next";
import { Music4, Trophy, Palette, Users2, Flame, Globe2, Sparkles, HandHeart } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal, RevealGroup } from "@/components/motion/Reveal";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Testimonials } from "@/components/sections/Testimonials";
import { GalleryPreview } from "@/components/sections/GalleryPreview";

export const metadata: Metadata = {
  title: "Student Life",
  description:
    "Houses, societies, sports, traditions, and the everyday campus culture that makes Sapient Hall feel like home.",
};

const pillars = [
  { icon: Trophy, title: "Sports", text: "Inter-house cricket, football, basketball, badminton, swimming, and an annual sports week the whole school looks forward to." },
  { icon: Music4, title: "Performing Arts", text: "Stage performances, the annual bonfire-night talent show, and assembly presentations that build real confidence." },
  { icon: Palette, title: "Arts & Craft", text: "Art rooms, term exhibitions, and creative projects woven into the curriculum from Pre-School upward." },
  { icon: Globe2, title: "Cultural Events", text: "The International Food Festival and cultural days that turn classroom learning about the world into something you can taste and see." },
  { icon: Users2, title: "Societies & Clubs", text: "Debating, science, and computing societies where students find their people and sharpen their strengths." },
  { icon: HandHeart, title: "Community Service", text: "Structured service projects that teach students their advantages come with responsibilities." },
];

const traditions = [
  { icon: Flame, title: "Annual Bonfire Night", text: "Grade 7 and above gather for an evening of performances around the fire — the most anticipated night of the year." },
  { icon: Globe2, title: "International Food Festival", text: "Student-run stalls representing countries from Morocco to Argentina — food, music, and culture in one afternoon." },
  { icon: Sparkles, title: "Farewell Traditions", text: "Every graduating class is sent off with tributes, performances, and a celebration they help design themselves." },
];

export default function StudentLifePage() {
  return (
    <>
      <PageHero
        eyebrow="Student Life"
        title="School should feel like somewhere you belong."
        description="Academics set the standard — but houses, societies, traditions, and friendships are what students remember decades later."
        crumbs={[{ label: "Student Life" }]}
      />

      <section className="container-page section-y">
        <Reveal>
          <p className="eyebrow">Beyond the classroom</p>
          <h2 className="mt-3 text-display-md">Six pillars of campus life</h2>
        </Reveal>
        <RevealGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p) => (
            <Reveal key={p.title} className="rounded-lg border border-surface-border bg-surface-card p-6 shadow-card transition-shadow hover:shadow-lifted">
              <span className="flex size-11 items-center justify-center rounded-sm bg-navy-900/5 text-navy-900"><p.icon className="size-5" /></span>
              <h3 className="mt-5 font-display text-lg font-semibold text-navy-900">{p.title}</h3>
              <p className="mt-2 text-body-sm text-navy-500">{p.text}</p>
            </Reveal>
          ))}
        </RevealGroup>
      </section>

      <section className="bg-navy-900 text-white">
        <div className="container-page section-y">
          <Reveal>
            <p className="eyebrow text-gold-400">Traditions</p>
            <h2 className="mt-3 max-w-xl text-display-md">The moments that make the year.</h2>
          </Reveal>
          <RevealGroup className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {traditions.map((t, i) => (
              <Reveal key={t.title} className="overflow-hidden rounded-lg bg-navy-800/60">
                <ImagePlaceholder icon={t.icon} index={i} aspect="aspect-[16/10]" className="rounded-none" />
                <div className="p-6">
                  <h3 className="font-display text-lg font-semibold text-white">{t.title}</h3>
                  <p className="mt-2 text-body-sm text-navy-300">{t.text}</p>
                </div>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </section>

      <Testimonials />
      <GalleryPreview />
    </>
  );
}
