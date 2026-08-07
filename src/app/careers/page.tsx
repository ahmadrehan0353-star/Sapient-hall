import type { Metadata } from "next";
import { GraduationCap, HeartHandshake, TrendingUp, Mail } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal, RevealGroup } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { contactInfo } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Careers",
  description: "Teach at Sapient Hall — open positions, what we look for, and how to apply.",
};

const openings = [
  { title: "Cambridge Mathematics Teacher (IGCSE / A Level)", campus: "Flagship Campus", type: "Full-time" },
  { title: "Primary Class Teacher", campus: "Bahria Campus", type: "Full-time" },
  { title: "Early Years Teacher", campus: "Both Campuses", type: "Full-time" },
  { title: "Physics Lab Assistant", campus: "Flagship Campus", type: "Full-time" },
  { title: "Admissions Officer", campus: "Flagship Campus", type: "Full-time" },
];

const benefits = [
  { icon: GraduationCap, title: "Professional development", text: "Structured training, Cambridge-focused workshops, and support for further qualifications." },
  { icon: TrendingUp, title: "Real growth paths", text: "Section-head and coordinator roles are filled from within wherever possible." },
  { icon: HeartHandshake, title: "A culture of respect", text: "The same values we teach students — respect, honesty, cooperation — apply to how we treat staff." },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Teach where teaching is taken seriously."
        description="We hire people who hold high standards and genuinely like children — both matter equally."
        crumbs={[{ label: "Careers" }]}
      />

      <section className="container-page section-y">
        <Reveal>
          <p className="eyebrow">Open positions</p>
          <h2 className="mt-3 text-display-md">Current openings</h2>
        </Reveal>
        <RevealGroup className="mt-10 flex flex-col divide-y divide-surface-border overflow-hidden rounded-lg border border-surface-border bg-surface-card shadow-card">
          {openings.map((o) => (
            <Reveal key={o.title} as="div">
              <div className="flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-display text-lg font-semibold text-navy-900">{o.title}</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge variant="royal">{o.campus}</Badge>
                    <Badge variant="navy">{o.type}</Badge>
                  </div>
                </div>
                <Button
                  href={`mailto:${contactInfo.generalEmail}?subject=Application: ${encodeURIComponent(o.title)}`}
                  external
                  variant="outline"
                  size="md"
                  icon={<Mail className="size-4" />}
                  iconPosition="left"
                >
                  Apply by Email
                </Button>
              </div>
            </Reveal>
          ))}
        </RevealGroup>
        <Reveal delay={0.1}>
          <p className="mt-6 text-body-sm text-navy-500">
            Don&apos;t see your role? Send a CV and cover note to{" "}
            <a href={`mailto:${contactInfo.generalEmail}`} className="font-medium text-royal-600 hover:underline">{contactInfo.generalEmail}</a>{" "}
            — we keep strong applications on file.
          </p>
        </Reveal>
      </section>

      <section className="bg-surface-muted/60">
        <div className="container-page section-y">
          <Reveal>
            <p className="eyebrow">Why work here</p>
            <h2 className="mt-3 text-display-md">What we offer our team</h2>
          </Reveal>
          <RevealGroup className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {benefits.map((b) => (
              <Reveal key={b.title} className="rounded-lg border border-surface-border bg-surface-card p-7 shadow-card">
                <span className="flex size-11 items-center justify-center rounded-sm bg-navy-900/5 text-navy-900"><b.icon className="size-5" /></span>
                <h3 className="mt-5 font-display text-lg font-semibold text-navy-900">{b.title}</h3>
                <p className="mt-2 text-body-sm text-navy-500">{b.text}</p>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
