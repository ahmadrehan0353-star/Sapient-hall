import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, MapPin, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Countdown } from "@/components/shared/Countdown";
import { EventRegistrationForm } from "@/components/forms/EventRegistrationForm";
import { upcomingEvents as seedUp, pastEvents as seedPast } from "@/lib/data/events";
import { getEvent } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export const revalidate = 300;

export function generateStaticParams() {
  return [...seedUp, ...seedPast].map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) return {};
  return { title: `${event.title} — Events`, description: event.description };
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) notFound();

  const isUpcoming = new Date(event.date).getTime() > Date.now();

  return (
    <>
      <PageHero
        eyebrow={event.category}
        title={event.title}
        crumbs={[{ label: "Events", href: "/events" }, { label: event.title }]}
      />

      <section className="container-page section-y grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <div className="flex flex-wrap gap-2">
            <Badge variant="royal">{event.category}</Badge>
            {event.registrationOpen && isUpcoming && <Badge variant="emerald">Registration Open</Badge>}
            {!isUpcoming && <Badge variant="navy">Past Event</Badge>}
          </div>
          <div className="mt-5 space-y-2.5 text-body-md text-navy-600">
            <p className="flex items-center gap-2.5"><CalendarDays className="size-4 text-navy-400" /> {formatDate(event.date)}{event.endDate ? ` – ${formatDate(event.endDate)}` : ""}</p>
            <p className="flex items-center gap-2.5"><Clock className="size-4 text-navy-400" /> {event.time}</p>
            <p className="flex items-center gap-2.5"><MapPin className="size-4 text-navy-400" /> {event.location}</p>
          </div>
          <p className="mt-6 max-w-xl text-body-lg text-navy-700">{event.description}</p>

          {isUpcoming && (
            <div className="mt-8">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-navy-500">Starts in</p>
              <Countdown target={`${event.date}T08:00:00+05:00`} />
            </div>
          )}

          <Link href="/events" className="mt-10 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 hover:text-royal-600">
            <ArrowLeft className="size-4" /> Back to all events
          </Link>
        </Reveal>

        {event.registrationOpen && isUpcoming && (
          <Reveal delay={0.1} className="h-fit rounded-lg border border-surface-border bg-surface-card p-7 shadow-card">
            <h2 className="text-display-sm">Register for this event</h2>
            <p className="mt-2 text-body-sm text-navy-500">We&apos;ll confirm your spot by email.</p>
            <div className="mt-6">
              <EventRegistrationForm eventTitle={event.title} />
            </div>
          </Reveal>
        )}
      </section>
    </>
  );
}
