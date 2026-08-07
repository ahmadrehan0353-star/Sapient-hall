import { ArrowLeft, Compass } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-navy-900 text-white">
      <div className="absolute inset-0 bg-mesh-navy" aria-hidden />
      <div className="container-page relative flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <Compass className="size-12 text-gold-400" aria-hidden />
        <p className="mt-6 font-mono text-sm uppercase tracking-widest text-gold-400">Error 404</p>
        <h1 className="mt-3 max-w-xl text-display-lg text-white">This page seems to have skipped class.</h1>
        <p className="mt-4 max-w-md text-body-md text-navy-300">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back somewhere useful.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/" variant="gold" size="lg" icon={<ArrowLeft className="size-4" />} iconPosition="left">
            Back to Home
          </Button>
          <Button href="/contact" variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}
