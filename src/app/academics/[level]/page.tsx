import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2, BookOpen, ClipboardCheck, Sparkles, Library } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/Badge";
import { AdmissionsCTA } from "@/components/sections/AdmissionsCTA";
import { academicLevels } from "@/lib/data/academics";

export function generateStaticParams() {
  return academicLevels.map((l) => ({ level: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ level: string }> }): Promise<Metadata> {
  const { level } = await params;
  const data = academicLevels.find((l) => l.slug === level);
  if (!data) return {};
  return {
    title: `${data.name} — Academics`,
    description: data.intro,
  };
}

export default async function AcademicLevelPage({ params }: { params: Promise<{ level: string }> }) {
  const { level } = await params;
  const data = academicLevels.find((l) => l.slug === level);
  if (!data) notFound();

  return (
    <>
      <PageHero
        eyebrow={data.ageRange}
        title={data.name}
        description={data.intro}
        crumbs={[{ label: "Academics", href: "/academics" }, { label: data.name }]}
      />

      <section className="container-page section-y grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-12">
          <Reveal>
            <h2 className="flex items-center gap-2.5 text-display-sm"><BookOpen className="size-5 text-gold-600" /> Curriculum</h2>
            <p className="mt-3 text-body-md text-navy-600">{data.curriculum}</p>
          </Reveal>

          <Reveal>
            <h2 className="flex items-center gap-2.5 text-display-sm"><Sparkles className="size-5 text-gold-600" /> How we teach</h2>
            <ul className="mt-4 space-y-3">
              {data.learningMethods.map((m) => (
                <li key={m} className="flex gap-2.5 text-body-md text-navy-600">
                  <CheckCircle2 className="mt-1 size-4 shrink-0 text-emerald-500" /> {m}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <h2 className="flex items-center gap-2.5 text-display-sm"><ClipboardCheck className="size-5 text-gold-600" /> Assessment</h2>
            <p className="mt-3 text-body-md text-navy-600">{data.assessment}</p>
          </Reveal>
        </div>

        <div className="space-y-6">
          <Reveal className="rounded-lg border border-surface-border bg-surface-card p-7 shadow-card">
            <h3 className="text-display-sm">Subjects</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {data.subjects.map((s) => (
                <Badge key={s} variant="navy">{s}</Badge>
              ))}
            </div>
          </Reveal>

          <Reveal className="rounded-lg border border-surface-border bg-surface-card p-7 shadow-card">
            <h3 className="text-display-sm">Activities</h3>
            <ul className="mt-4 space-y-2.5">
              {data.activities.map((a) => (
                <li key={a} className="flex gap-2.5 text-body-sm text-navy-600">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-gold-500" /> {a}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="rounded-lg border border-surface-border bg-surface-card p-7 shadow-card">
            <h3 className="flex items-center gap-2 text-display-sm"><Library className="size-5 text-gold-600" /> Resources</h3>
            <ul className="mt-4 space-y-2.5">
              {data.resources.map((r) => (
                <li key={r} className="flex gap-2.5 text-body-sm text-navy-600">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-royal-500" /> {r}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <div className="pb-16 sm:pb-22">
        <AdmissionsCTA />
      </div>
    </>
  );
}
