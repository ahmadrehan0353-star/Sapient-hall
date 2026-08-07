import { Reveal } from "@/components/motion/Reveal";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export function NewsletterSection() {
  return (
    <section className="bg-surface-muted/60">
      <div className="container-page section-y !py-16">
        <Reveal className="mx-auto max-w-lg text-center">
          <p className="eyebrow justify-center">Stay in the loop</p>
          <h2 className="mt-3 text-display-md">Campus news, straight to your inbox.</h2>
          <p className="mt-3 text-body-sm text-navy-500">
            Admissions deadlines, event announcements, and school stories — a few emails a term, never more.
          </p>
          <div className="mx-auto mt-2 max-w-sm">
            <NewsletterForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
