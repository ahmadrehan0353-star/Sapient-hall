import { ArrowRight, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { Reveal, RevealGroup } from "@/components/motion/Reveal";
import { siteConfig, stats } from "@/lib/site-config";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-900 text-white">
      <div className="absolute inset-0 bg-mesh-navy" aria-hidden />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />

      <div className="container-page relative flex flex-col items-start pb-20 pt-16 sm:pt-24 lg:pb-28 lg:pt-28">
        <Reveal>
          <Badge variant="gold">{siteConfig.admissionsNote}</Badge>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="mt-6 max-w-3xl text-display-xl sm:text-display-2xl text-white">
            {siteConfig.tagline}.
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-6 max-w-xl text-body-lg text-navy-200">
            {siteConfig.description}
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="/admissions" variant="gold" size="lg" icon={<ArrowRight className="size-4" />}>
              Start an Application
            </Button>
            <Button
              href="/about"
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white/10"
              icon={<PlayCircle className="size-4" />}
              iconPosition="left"
            >
              Meet the Principal
            </Button>
          </div>
        </Reveal>

        <RevealGroup className="mt-16 grid w-full grid-cols-2 gap-8 border-t border-white/10 pt-10 sm:grid-cols-4">
          {stats.map((s) => (
            <Reveal key={s.label}>
              <p className="text-display-md text-gold-400">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-caption text-navy-300">{s.label}</p>
            </Reveal>
          ))}
        </RevealGroup>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-surface to-transparent" aria-hidden />
    </section>
  );
}
