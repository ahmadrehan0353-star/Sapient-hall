import { Quote } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { siteConfig } from "@/lib/site-config";

export function PrincipalMessage() {
  return (
    <section className="bg-navy-900 text-white">
      <div className="container-page section-y grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <ImagePlaceholder label="Principal, Sapient Hall" aspect="aspect-[4/5]" />
        </Reveal>

        <Reveal delay={0.1}>
          <Quote className="size-9 text-gold-400" aria-hidden />
          <blockquote className="mt-5 text-display-sm font-normal leading-snug text-white sm:text-display-md">
            “{siteConfig.foundingQuote}”
          </blockquote>
          <p className="mt-3 text-body-sm text-navy-400">— {siteConfig.foundingQuoteAttribution}, quoted in our founding philosophy</p>

          <p className="mt-8 max-w-xl text-body-md text-navy-200">
            {siteConfig.vision} Every decision on this campus — from class sizes to the way we
            train our teachers — is made in service of that belief. We don&apos;t just want our
            students to do well on exam day; we want them to leave here as confident, capable
            people.
          </p>
          <p className="mt-5 font-display text-lg text-white">The Principal</p>
          <p className="text-caption text-navy-400">Sapient Hall School System</p>
        </Reveal>
      </div>
    </section>
  );
}
