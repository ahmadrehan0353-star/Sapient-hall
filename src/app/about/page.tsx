import type { Metadata } from "next";
import { Target, Eye, HeartHandshake, Users2, Landmark } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal, RevealGroup } from "@/components/motion/Reveal";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { AdmissionsCTA } from "@/components/sections/AdmissionsCTA";
import { siteConfig, campuses, stats } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The history, mission, vision, and values of Sapient Hall School System — a two-campus Cambridge-aligned school in Rawalpindi and Islamabad.",
};

const timeline = [
  { year: "Founding", text: "Sapient Hall opens its doors on Adyala Road with a small founding cohort and a clear philosophy: quality education for every child, every day." },
  { year: "Growth", text: "The Flagship Campus expands into a purpose-built facility with dedicated science and computer laboratories, a library, and sports grounds." },
  { year: "Cambridge", text: "The school becomes a registered Cambridge centre, extending the pathway through IGCSE and later AS & A Levels." },
  { year: "Second Campus", text: "The Bahria Campus opens in Bahria Town Phase 7, bringing the same programme to families in Islamabad." },
  { year: "Today", text: "Two campuses, a full Pre-School-to-A-Level pathway, and a community of students, alumni, and families that keeps growing." },
];

const leadership = [
  { role: "Principal", focus: "Academic vision, faculty development, and whole-school standards." },
  { role: "Vice Principal — Academics", focus: "Curriculum delivery, Cambridge coordination, and assessment quality." },
  { role: "Vice Principal — Administration", focus: "Campus operations, safety, transport, and parent services." },
  { role: "Head of Early Years", focus: "Pre-School and Primary programme leadership." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Sapient Hall"
        title="A school built on a simple, serious promise."
        description={siteConfig.mission}
        crumbs={[{ label: "About" }]}
      />

      <section className="container-page section-y grid grid-cols-1 gap-12 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow">Our story</p>
          <h2 className="mt-3 text-display-md">History</h2>
          <p className="mt-4 text-body-md text-navy-600">
            Sapient Hall began with a conviction that families in Rawalpindi deserved a school
            that took both academics and character seriously — and that neither should come at
            the expense of a warm, safe environment. From a single campus on Adyala Road, the
            school has grown into a two-campus system serving students from their very first
            classroom to their university applications.
          </p>
          <p className="mt-4 text-body-md text-navy-600">
            Growth has never been the goal in itself. Every expansion — the purpose-built
            facilities, the Cambridge registration, the second campus in Bahria Town — happened
            because it served students better.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <ImagePlaceholder icon={Landmark} label="Flagship Campus, Adyala Road" aspect="aspect-[4/3]" />
        </Reveal>
      </section>

      <section className="bg-surface-muted/60">
        <div className="container-page section-y">
          <RevealGroup className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Reveal className="rounded-lg border border-surface-border bg-surface-card p-8 shadow-card">
              <span className="flex size-11 items-center justify-center rounded-sm bg-navy-900/5 text-navy-900"><Target className="size-5" /></span>
              <h2 className="mt-5 text-display-sm">Mission</h2>
              <p className="mt-3 text-body-md text-navy-600">{siteConfig.mission}</p>
            </Reveal>
            <Reveal className="rounded-lg border border-surface-border bg-surface-card p-8 shadow-card">
              <span className="flex size-11 items-center justify-center rounded-sm bg-navy-900/5 text-navy-900"><Eye className="size-5" /></span>
              <h2 className="mt-5 text-display-sm">Vision</h2>
              <p className="mt-3 text-body-md text-navy-600">{siteConfig.vision}</p>
            </Reveal>
            <Reveal className="rounded-lg border border-surface-border bg-surface-card p-8 shadow-card">
              <span className="flex size-11 items-center justify-center rounded-sm bg-navy-900/5 text-navy-900"><HeartHandshake className="size-5" /></span>
              <h2 className="mt-5 text-display-sm">Our Aim</h2>
              <p className="mt-3 text-body-md text-navy-600">{siteConfig.aim}</p>
            </Reveal>
          </RevealGroup>
        </div>
      </section>

      <section className="container-page section-y">
        <Reveal>
          <p className="eyebrow">What we stand for</p>
          <h2 className="mt-3 text-display-md">Core values</h2>
        </Reveal>
        <RevealGroup className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {siteConfig.values.map((v) => (
            <Reveal key={v} className="rounded-lg border border-surface-border bg-surface-card p-5 text-center shadow-card">
              <p className="font-display font-semibold text-navy-900">{v}</p>
            </Reveal>
          ))}
        </RevealGroup>
      </section>

      <section className="bg-navy-900 text-white">
        <div className="container-page section-y">
          <Reveal>
            <p className="eyebrow text-gold-400">School philosophy</p>
            <h2 className="mt-3 max-w-2xl text-display-md">“{siteConfig.foundingQuote}”</h2>
            <p className="mt-3 text-body-sm text-navy-400">— {siteConfig.foundingQuoteAttribution}</p>
            <p className="mt-6 max-w-2xl text-body-md text-navy-200">
              We take Dewey seriously. School is not a waiting room for adulthood — it is where
              children live a large part of their childhood. So the environment matters, the
              relationships matter, and the standards matter. We hold all three high.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-page section-y">
        <Reveal>
          <p className="eyebrow">Milestones</p>
          <h2 className="mt-3 text-display-md">Our journey so far</h2>
        </Reveal>
        <div className="mt-12 space-y-0">
          {timeline.map((t, i) => (
            <Reveal key={t.year} delay={i * 0.05} className="relative flex gap-6 pb-10 last:pb-0">
              <div className="flex flex-col items-center">
                <span className="flex size-4 shrink-0 rounded-full border-2 border-gold-500 bg-white" />
                {i < timeline.length - 1 && <span className="w-px flex-1 bg-surface-border" />}
              </div>
              <div className="-mt-1.5">
                <p className="font-mono text-sm font-semibold uppercase tracking-wide text-gold-600">{t.year}</p>
                <p className="mt-1.5 max-w-2xl text-body-md text-navy-600">{t.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-surface-muted/60">
        <div className="container-page section-y">
          <Reveal>
            <p className="eyebrow">Leadership</p>
            <h2 className="mt-3 text-display-md">The team behind the school</h2>
          </Reveal>
          <RevealGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {leadership.map((l, i) => (
              <Reveal key={l.role} className="overflow-hidden rounded-lg border border-surface-border bg-surface-card shadow-card">
                <ImagePlaceholder icon={Users2} index={i} aspect="aspect-square" className="rounded-none" />
                <div className="p-5">
                  <h3 className="font-display font-semibold text-navy-900">{l.role}</h3>
                  <p className="mt-1.5 text-body-sm text-navy-500">{l.focus}</p>
                </div>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="container-page section-y">
        <Reveal>
          <p className="eyebrow">Two campuses</p>
          <h2 className="mt-3 text-display-md">Campus information</h2>
        </Reveal>
        <RevealGroup className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {campuses.map((c) => (
            <Reveal key={c.id} className="rounded-lg border border-surface-border bg-surface-card p-7 shadow-card">
              <h3 className="text-display-sm">{c.name}</h3>
              <p className="mt-1 text-body-sm font-medium text-royal-600">{c.grades}</p>
              <p className="mt-3 text-body-sm text-navy-600">{c.address}</p>
              <p className="mt-1 text-body-sm text-navy-600">{c.phone.join(" · ")}</p>
            </Reveal>
          ))}
        </RevealGroup>

        <RevealGroup className="mt-16 grid grid-cols-2 gap-8 rounded-2xl bg-navy-900 p-10 sm:grid-cols-4">
          {stats.map((s) => (
            <Reveal key={s.label} className="text-center">
              <p className="text-display-md text-gold-400"><AnimatedCounter value={s.value} suffix={s.suffix} /></p>
              <p className="mt-1 text-caption text-navy-300">{s.label}</p>
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
