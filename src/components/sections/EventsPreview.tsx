import Link from "next/link";
import { ArrowRight, CalendarDays, Clock, MapPin } from "lucide-react";
import { Reveal, RevealGroup } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/Badge";
import { getEvents } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export async function EventsPreview() {
  const events = (await getEvents()).upcoming.slice(0, 3);
  return (
    <section className="bg-surface-muted/60">
      <div className="container-page section-y">
        <Reveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">What&apos;s coming up</p>
            <h2 className="mt-3 max-w-xl text-display-md">Upcoming events at Sapient Hall.</h2>
          </div>
          <Link href="/events" className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 hover:text-royal-600">
            Full calendar <ArrowRight className="size-4" />
          </Link>
        </Reveal>

        <RevealGroup className="mt-10 flex flex-col divide-y divide-surface-border overflow-hidden rounded-lg border border-surface-border bg-surface-card shadow-card">
          {events.map((e) => {
            const d = new Date(e.date);
            return (
              <Reveal key={e.id} as="div">
                <Link
                  href={`/events/${e.slug}`}
                  className="flex flex-col items-start gap-5 p-6 transition-colors hover:bg-surface-muted/60 sm:flex-row sm:items-center"
                >
                  <div className="flex w-20 shrink-0 flex-col items-center rounded-sm bg-navy-900 py-3 text-white">
                    <span className="font-mono text-xs uppercase tracking-wide text-gold-400">
                      {d.toLocaleDateString("en-GB", { month: "short" })}
                    </span>
                    <span className="font-display text-2xl font-semibold">{d.getDate()}</span>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="royal">{e.category}</Badge>
                      {e.registrationOpen && <Badge variant="emerald">Registration Open</Badge>}
                    </div>
                    <h3 className="mt-2 text-display-sm">{e.title}</h3>
                    <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-body-sm text-navy-500">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="size-3.5" /> {formatDate(e.date)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="size-3.5" /> {e.time}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="size-3.5" /> {e.location}
                      </span>
                    </div>
                  </div>

                  <ArrowRight className="hidden size-5 shrink-0 text-navy-400 sm:block" />
                </Link>
              </Reveal>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
