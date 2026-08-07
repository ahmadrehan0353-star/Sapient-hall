import { ArrowRight, FileDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { siteConfig } from "@/lib/site-config";

export function AdmissionsCTA() {
  return (
    <section className="container-page">
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl bg-navy-900 px-8 py-14 text-white sm:px-14 sm:py-18">
          <div className="absolute inset-0 bg-mesh-navy" aria-hidden />
          <div className="relative flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="eyebrow text-gold-400">{siteConfig.admissionsNote}</p>
              <h2 className="mt-3 text-display-md">Give your child a head start that lasts.</h2>
              <p className="mt-3 text-body-md text-navy-300">
                Applications for both campuses are reviewed on a rolling basis. Start today and
                our admissions team will walk you through every step.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Button href="/admissions" variant="gold" size="lg" icon={<ArrowRight className="size-4" />}>
                Apply Now
              </Button>
              <Button
                href="/admissions#prospectus"
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10"
                icon={<FileDown className="size-4" />}
                iconPosition="left"
              >
                Download Prospectus
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
