import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { siteConfig, contactInfo } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Sapient Hall School System collects, uses, and protects personal information.",
};

const sections = [
  {
    title: "Information we collect",
    body: "When you use this website's forms, we collect the information you provide: names, contact details, and — for admissions inquiries — basic details about the applying child. We do not collect more than we need to respond to you.",
  },
  {
    title: "How we use it",
    body: "Form submissions are used only to respond to your inquiry, process an admission, register you for an event, or send the newsletter you subscribed to. We do not sell, rent, or trade personal information with third parties.",
  },
  {
    title: "Children's information",
    body: "Information about children submitted through admissions forms is treated with heightened care, accessed only by admissions and academic staff who need it, and retained only as long as the admission process or enrolment requires.",
  },
  {
    title: "Data storage & security",
    body: "Submissions are stored on access-controlled systems. Only authorised staff can view them, and campus-level records are governed by school record-keeping policies.",
  },
  {
    title: "Cookies & analytics",
    body: "This site uses only the cookies necessary for it to function. If analytics are enabled, they are configured to measure aggregate usage, not to identify individuals.",
  },
  {
    title: "Your choices",
    body: "You may ask us to correct or delete information you have submitted through this website at any time by contacting us. Newsletter emails include an unsubscribe option.",
  },
  {
    title: "Contact",
    body: `Questions about this policy can be sent to ${contactInfo.generalEmail} or raised at either campus during visiting hours.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" crumbs={[{ label: "Privacy Policy" }]} />
      <section className="container-page section-y">
        <Reveal className="mx-auto max-w-3xl">
          <p className="text-body-md text-navy-600">
            This policy explains how {siteConfig.fullName} handles personal information collected
            through this website. It is written to be read, not to be skipped.
          </p>
          <div className="mt-10 space-y-9">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="text-display-sm">{s.title}</h2>
                <p className="mt-2.5 text-body-md text-navy-600">{s.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-12 text-caption text-navy-400">Last updated: August 2026</p>
        </Reveal>
      </section>
    </>
  );
}
