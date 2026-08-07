import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { siteConfig, contactInfo } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms governing the use of the Sapient Hall School System website.",
};

const sections = [
  {
    title: "Use of this website",
    body: "This website exists to give families accurate information about the school and a simple way to reach us. You may browse, share links, and submit forms in good faith. You may not misuse the site — including attempting to disrupt it, submitting false information, or scraping content for commercial purposes.",
  },
  {
    title: "Content & accuracy",
    body: "We work to keep information current, but details such as events, timings, and programmes can change. Formal matters — fees, admission decisions, policies — are governed by official school documents and communications, not by this website.",
  },
  {
    title: "Intellectual property",
    body: `The name ${siteConfig.fullName}, its logo, and the original content of this website belong to the school. They may not be reused or reproduced for commercial purposes without written permission.`,
  },
  {
    title: "Third-party links",
    body: "Where this site links to external services (such as maps or social platforms), those services operate under their own terms and privacy policies, which we do not control.",
  },
  {
    title: "Form submissions",
    body: "By submitting a form, you confirm the information provided is accurate and that you are authorised to provide it. Submissions are handled as described in our Privacy Policy.",
  },
  {
    title: "Changes to these terms",
    body: "We may update these terms as the website evolves. Continued use of the site after an update constitutes acceptance of the revised terms.",
  },
  {
    title: "Contact",
    body: `Questions about these terms can be sent to ${contactInfo.generalEmail}.`,
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Use" crumbs={[{ label: "Terms of Use" }]} />
      <section className="container-page section-y">
        <Reveal className="mx-auto max-w-3xl">
          <div className="space-y-9">
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
