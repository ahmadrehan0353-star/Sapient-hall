/**
 * CMS content service — the bridge between the admin panel and the public site.
 *
 * Reads public collections via the Firestore REST API (allowed by
 * firestore.rules: public content is world-readable). Every fetcher:
 *   1. Returns Firestore content when configured AND the collection has docs
 *   2. Falls back to the static seed data in src/lib/data/* otherwise
 *
 * Fetches are cached with `next: { revalidate }` (ISR), so CMS edits appear
 * on the live site within REVALIDATE_SECONDS without a redeploy.
 */
import { newsPosts as seedNews, type NewsPost } from "@/lib/data/news";
import {
  upcomingEvents as seedUpcoming,
  pastEvents as seedPast,
  type SchoolEvent,
} from "@/lib/data/events";
import { testimonials as seedTestimonials, type Testimonial } from "@/lib/data/testimonials";
import { allFaqs as seedFaqs } from "@/lib/data/faqs-full";
import type { Faq } from "@/lib/data/faqs";

export const REVALIDATE_SECONDS = 300;

export type Announcement = { id: string; text: string; link?: string; active: boolean };

/* ------------------------------------------------------------------ */
/* Firestore REST plumbing                                             */
/* ------------------------------------------------------------------ */

type FsValue = {
  stringValue?: string;
  integerValue?: string;
  doubleValue?: number;
  booleanValue?: boolean;
  timestampValue?: string;
};
type FsDoc = { name: string; fields?: Record<string, FsValue> };

function parseDoc(doc: FsDoc): Record<string, unknown> {
  const out: Record<string, unknown> = { id: doc.name.split("/").pop() ?? "" };
  for (const [k, v] of Object.entries(doc.fields ?? {})) {
    if (v.stringValue !== undefined) out[k] = v.stringValue;
    else if (v.integerValue !== undefined) out[k] = Number(v.integerValue);
    else if (v.doubleValue !== undefined) out[k] = v.doubleValue;
    else if (v.booleanValue !== undefined) out[k] = v.booleanValue;
    else if (v.timestampValue !== undefined) out[k] = v.timestampValue;
  }
  return out;
}

async function fetchCollection(collection: string): Promise<Record<string, unknown>[] | null> {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!projectId || !apiKey) return null;

  try {
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${collection}?pageSize=300&key=${apiKey}`;
    const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
    if (!res.ok) return null;
    const json = (await res.json()) as { documents?: FsDoc[] };
    if (!json.documents?.length) return null;
    return json.documents.map(parseDoc);
  } catch {
    return null; // network/rules issue — fall back to seed content
  }
}

const str = (v: unknown): string => (typeof v === "string" ? v : "");
const optStr = (v: unknown): string | undefined => (typeof v === "string" && v ? v : undefined);

/* ------------------------------------------------------------------ */
/* Public fetchers                                                     */
/* ------------------------------------------------------------------ */

export async function getNews(): Promise<NewsPost[]> {
  const docs = await fetchCollection("news");
  if (!docs) return seedNews;
  const posts = docs
    .filter((d) => str(d.title) && str(d.slug))
    .map((d) => ({
      id: str(d.id),
      slug: str(d.slug),
      title: str(d.title),
      category: str(d.category) || "Announcements",
      date: str(d.date) || new Date().toISOString().slice(0, 10),
      excerpt: str(d.excerpt),
      content: str(d.content),
    }))
    .sort((a, b) => b.date.localeCompare(a.date));
  return posts.length ? posts : seedNews;
}

export async function getNewsPost(slug: string): Promise<NewsPost | undefined> {
  return (await getNews()).find((p) => p.slug === slug);
}

export async function getEvents(): Promise<{ upcoming: SchoolEvent[]; past: SchoolEvent[] }> {
  const docs = await fetchCollection("events");
  if (!docs) return { upcoming: seedUpcoming, past: seedPast };
  const events: SchoolEvent[] = docs
    .filter((d) => str(d.title) && str(d.slug) && str(d.date))
    .map((d) => ({
      id: str(d.id),
      slug: str(d.slug),
      title: str(d.title),
      date: str(d.date),
      endDate: optStr(d.endDate),
      time: str(d.time),
      location: str(d.location),
      category: str(d.category) || "Events",
      description: str(d.description),
      registrationOpen: d.registrationOpen === "yes" || d.registrationOpen === true,
    }));
  if (!events.length) return { upcoming: seedUpcoming, past: seedPast };
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = events.filter((e) => (e.endDate ?? e.date) >= today).sort((a, b) => a.date.localeCompare(b.date));
  const past = events.filter((e) => (e.endDate ?? e.date) < today).sort((a, b) => b.date.localeCompare(a.date));
  return { upcoming, past };
}

export async function getEvent(slug: string): Promise<SchoolEvent | undefined> {
  const { upcoming, past } = await getEvents();
  return [...upcoming, ...past].find((e) => e.slug === slug);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const docs = await fetchCollection("testimonials");
  if (!docs) return seedTestimonials;
  const items = docs
    .filter((d) => str(d.name) && str(d.quote))
    .map((d) => ({ id: str(d.id), name: str(d.name), relation: str(d.relation) || "Parent", quote: str(d.quote) }));
  return items.length ? items : seedTestimonials;
}

export async function getFaqs(): Promise<Faq[]> {
  const docs = await fetchCollection("faqs");
  if (!docs) return seedFaqs;
  const items = docs
    .filter((d) => str(d.question) && str(d.answer))
    .map((d) => ({ id: str(d.id), question: str(d.question), answer: str(d.answer), category: optStr(d.category) }));
  return items.length ? items : seedFaqs;
}

export async function getActiveAnnouncements(): Promise<Announcement[]> {
  const docs = await fetchCollection("announcements");
  if (!docs) return [];
  return docs
    .filter((d) => str(d.text) && (d.active === "yes" || d.active === true))
    .map((d) => ({ id: str(d.id), text: str(d.text), link: optStr(d.link), active: true }));
}
