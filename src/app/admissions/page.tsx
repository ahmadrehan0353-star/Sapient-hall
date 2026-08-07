import type { Metadata } from "next";
import { FileText, ClipboardList, Users, CheckCircle2, FileDown, BadgeCheck } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal, RevealGroup } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { FAQSection } from "@/components/sections/FAQSection";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Admissions",
  description:
    "How to apply to Sapient Hall School System — process, required documents, fee guidance, and online inquiry.",
};

const steps = [
  { icon: FileText, title: "Submit an inquiry", text: "Fill the form below or visit either campus during visiting hours (9:00 AM – 12:00 PM, Mon–Thu)." },
  { icon: ClipboardList, title: "Assessment", text: "Age-appropriate assessment — informal observation for early years, written assessment for older grades." },
  { icon: Users, title: "Family meeting", text: "A short meeting with the section head so we understand your child and you understand us." },
  { icon: BadgeCheck, title: "Offer & enrolment", text: "Successful applicants receive an offer; enrolment completes on fee submission and document verification." },
];

const documents = [
  "Copy of the child's B-Form / birth certificate",
  "Copies of both parents' / guardians' CNICs",
  "Recent passport-size photographs of the child",
  "School leaving certificate & last report card (Grade 1 and above)",
  "Vaccination record (early years)",
];

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Admissions"
        title="Joining Sapient Hall is deliberately simple."
        description={siteConfig.admissionsNote}
        crumbs={[{ label: "Admissions" }]}
      />

      <section className="container-page section-y">
        <Reveal>
          <p className="eyebrow">The process</p>
          <h2 className="mt-3 text-display-md">Four steps, start to finish.</h2>
        </Reveal>
        <RevealGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.title} className="relative rounded-lg border border-surface-border bg-surface-card p-6 shadow-card">
              <span className="absolute right-5 top-5 font-mono text-sm font-semibold text-navy-300">0{i + 1}</span>
              <span className="flex size-11 items-center justify-center rounded-sm bg-navy-900/5 text-navy-900"><s.icon className="size-5" /></span>
              <h3 className="mt-5 font-display text-lg font-semibold text-navy-900">{s.title}</h3>
              <p className="mt-2 text-body-sm text-navy-500">{s.text}</p>
            </Reveal>
          ))}
        </RevealGroup>
      </section>

      <section className="bg-surface-muted/60">
        <div className="container-page section-y grid grid-cols-1 gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Paperwork</p>
            <h2 className="mt-3 text-display-md">Required documents</h2>
            <ul className="mt-6 space-y-3.5">
              {documents.map((d) => (
                <li key={d} className="flex gap-3 text-body-md text-navy-600">
                  <CheckCircle2 className="mt-1 size-4 shrink-0 text-emerald-500" /> {d}
                </li>
              ))}
            </ul>
          </Reveal>
          <div id="prospectus"><Reveal delay={0.1} className="rounded-lg border border-surface-border bg-surface-card p-8 shadow-card">
            <h2 className="text-display-sm">Fee information & prospectus</h2>
            <p className="mt-3 text-body-md text-navy-600">
              Fee structures vary by level and campus, and are shared in person or on request so
              we can walk you through exactly what&apos;s included. The prospectus covers the
              curriculum, campus facilities, and school policies in detail.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/contact" variant="primary" size="md">Request Fee Details</Button>
              <Button href="/contact" variant="outline" size="md" icon={<FileDown className="size-4" />} iconPosition="left">
                Request Prospectus
              </Button>
            </div>
            <p className="mt-4 text-caption text-navy-400">
              Sibling discounts and merit considerations are available — ask our admissions team.
            </p>
          </Reveal></div>
        </div>
      </section>

      <section className="container-page section-y" id="inquiry">
        <Reveal className="mx-auto max-w-3xl">
          <p className="eyebrow">Start here</p>
          <h2 className="mt-3 text-display-md">Online admission inquiry</h2>
          <p className="mt-3 text-body-md text-navy-600">
            Tell us a little about your child and our admissions team will reach out within two
            working days.
          </p>
          <div className="mt-8 rounded-lg border border-surface-border bg-surface-card p-7 shadow-card sm:p-9">
            <InquiryForm />
          </div>
        </Reveal>
      </section>

      <FAQSection />
    </>
  );
}
