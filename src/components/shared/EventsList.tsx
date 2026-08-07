"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock, MapPin, Search } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { formatDate, cn } from "@/lib/utils";
import type { SchoolEvent } from "@/lib/data/events";

export function EventsList({ upcoming, past }: { upcoming: SchoolEvent[]; past: SchoolEvent[] }) {
  const [tab, setTab] = React.useState<"upcoming" | "past">("upcoming");
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState("All");

  const source = tab === "upcoming" ? upcoming : past;
  const categories = ["All", ...Array.from(new Set([...upcoming, ...past].map((e) => e.category)))];

  const filtered = source.filter((e) => {
    const q = query.trim().toLowerCase();
    const matchQ = !q || e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q);
    const matchC = category === "All" || e.category === category;
    return matchQ && matchC;
  });

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex rounded-sm border border-surface-border bg-surface-card p-1 shadow-soft w-fit" role="tablist" aria-label="Event timeframe">
          {(["upcoming", "past"] as const).map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={cn(
                "rounded-xs px-5 py-2 text-sm font-medium capitalize transition-colors",
                tab === t ? "bg-navy-900 text-white" : "text-navy-600 hover:text-navy-900"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                  category === c ? "bg-navy-900 text-white" : "bg-surface-muted text-navy-600 hover:bg-navy-900/10"
                )}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-56">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-navy-400" aria-hidden />
            <Input
              type="search"
              placeholder="Search events…"
              aria-label="Search events"
              className="pl-10"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-14 text-center text-body-md text-navy-500">No events match your filters.</p>
      ) : (
        <div className="mt-10 flex flex-col divide-y divide-surface-border overflow-hidden rounded-lg border border-surface-border bg-surface-card shadow-card">
          {filtered.map((e) => {
            const d = new Date(e.date);
            return (
              <Link
                key={e.id}
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
                    {e.registrationOpen && tab === "upcoming" && <Badge variant="emerald">Registration Open</Badge>}
                  </div>
                  <h3 className="mt-2 text-display-sm">{e.title}</h3>
                  <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-body-sm text-navy-500">
                    <span className="flex items-center gap-1.5"><CalendarDays className="size-3.5" /> {formatDate(e.date)}{e.endDate ? ` – ${formatDate(e.endDate)}` : ""}</span>
                    <span className="flex items-center gap-1.5"><Clock className="size-3.5" /> {e.time}</span>
                    <span className="flex items-center gap-1.5"><MapPin className="size-3.5" /> {e.location}</span>
                  </div>
                </div>
                <ArrowRight className="hidden size-5 shrink-0 text-navy-400 sm:block" />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
