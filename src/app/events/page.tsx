import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { EventsList } from "@/components/shared/EventsList";
import { getEvents } from "@/lib/content";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming and past events at Sapient Hall — open houses, sports weeks, exhibitions, and school traditions.",
};

export const revalidate = 300;

export default async function EventsPage() {
  const { upcoming: upcomingEvents, past: pastEvents } = await getEvents();
  return (
    <>
      <PageHero
        eyebrow="Events"
        title="The school calendar, at a glance."
        description="Open houses, sports weeks, exhibitions, and the traditions that shape the year."
        crumbs={[{ label: "Events" }]}
      />
      <section className="container-page section-y">
        <EventsList upcoming={upcomingEvents} past={pastEvents} />
      </section>
    </>
  );
}
