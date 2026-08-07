import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

type Crumb = { label: string; href?: string };

export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  crumbs?: Crumb[];
}) {
  return (
    <section className="relative overflow-hidden bg-navy-900 text-white">
      <div className="absolute inset-0 bg-mesh-navy" aria-hidden />
      <div className="container-page relative pb-14 pt-12 sm:pb-18 sm:pt-16">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-caption text-navy-300">
              <li>
                <Link href="/" className="hover:text-gold-400">Home</Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.label} className="flex items-center gap-1.5">
                  <ChevronRight className="size-3" aria-hidden />
                  {c.href ? (
                    <Link href={c.href} className="hover:text-gold-400">{c.label}</Link>
                  ) : (
                    <span aria-current="page" className="text-white">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <Reveal>
          <p className="eyebrow text-gold-400">{eyebrow}</p>
          <h1 className="mt-3 max-w-3xl text-display-lg sm:text-display-xl text-white">{title}</h1>
          {description && <p className="mt-5 max-w-2xl text-body-lg text-navy-200">{description}</p>}
        </Reveal>
      </div>
    </section>
  );
}
