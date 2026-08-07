import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { FaqBrowser } from "@/components/shared/FaqBrowser";
import { getFaqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about admissions, academics, campus safety, fees, and policies at Sapient Hall.",
};

export const revalidate = 300;

export default async function FaqPage() {
  const allFaqs = await getFaqs();
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Questions parents actually ask."
        description="Grouped by topic. If yours isn't here, the contact page routes straight to the right department."
        crumbs={[{ label: "FAQ" }]}
      />
      <section className="container-page section-y">
        <FaqBrowser faqs={allFaqs} />
      </section>
    </>
  );
}
