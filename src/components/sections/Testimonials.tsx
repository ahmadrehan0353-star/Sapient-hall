import { Quote } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { getTestimonials } from "@/lib/content";

export async function Testimonials() {
  const testimonials = await getTestimonials();
  return (
    <section className="bg-surface-muted/60">
      <div className="container-page section-y">
        <Reveal>
          <p className="eyebrow">From our parents</p>
          <h2 className="mt-3 max-w-xl text-display-md">What families say about Sapient Hall.</h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {testimonials.map((t) => (
              <blockquote
                key={t.id}
                className="flex w-[300px] shrink-0 snap-start flex-col rounded-lg border border-surface-border bg-surface-card p-6 shadow-card sm:w-[360px]"
              >
                <Quote className="size-7 text-gold-500" aria-hidden />
                <p className="mt-4 flex-1 text-body-sm text-navy-700">{t.quote}</p>
                <footer className="mt-5 border-t border-surface-border pt-4">
                  <p className="text-sm font-semibold text-navy-900">{t.name}</p>
                  <p className="text-caption text-navy-500">{t.relation}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
