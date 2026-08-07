import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { academicLevels } from "@/lib/data/academics";
import { newsPosts } from "@/lib/data/news";
import { upcomingEvents, pastEvents } from "@/lib/data/events";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticPages = [
    "", "/about", "/academics", "/admissions", "/facilities", "/student-life",
    "/news", "/events", "/gallery", "/careers", "/contact", "/faq", "/privacy", "/terms",
  ].map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: (p === "" ? "weekly" : "monthly") as "weekly" | "monthly",
    priority: p === "" ? 1 : p === "/admissions" ? 0.9 : 0.7,
  }));

  const academics = academicLevels.map((l) => ({
    url: `${base}/academics/${l.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8,
  }));
  const news = newsPosts.map((p) => ({
    url: `${base}/news/${p.slug}`, lastModified: new Date(p.date), changeFrequency: "yearly" as const, priority: 0.6,
  }));
  const events = [...upcomingEvents, ...pastEvents].map((e) => ({
    url: `${base}/events/${e.slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.6,
  }));

  return [...staticPages, ...academics, ...news, ...events];
}
