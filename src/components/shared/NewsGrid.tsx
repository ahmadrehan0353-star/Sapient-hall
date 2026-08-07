"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Newspaper, Search } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Pagination } from "@/components/ui/Pagination";
import { Input } from "@/components/ui/Input";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { formatDate, cn } from "@/lib/utils";
import type { NewsPost } from "@/lib/data/news";

const PER_PAGE = 6;

export function NewsGrid({ posts }: { posts: NewsPost[] }) {
  const categories = React.useMemo(
    () => ["All", ...Array.from(new Set(posts.map((p) => p.category)))],
    [posts]
  );
  const [category, setCategory] = React.useState("All");
  const [query, setQuery] = React.useState("");
  const [page, setPage] = React.useState(1);

  const filtered = posts.filter((p) => {
    const matchCat = category === "All" || p.category === category;
    const q = query.trim().toLowerCase();
    const matchQ = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
          {categories.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={category === c}
              onClick={() => { setCategory(c); setPage(1); }}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                category === c ? "bg-navy-900 text-white" : "bg-surface-muted text-navy-600 hover:bg-navy-900/10"
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-navy-400" aria-hidden />
          <Input
            type="search"
            placeholder="Search news…"
            aria-label="Search news"
            className="pl-10"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
          />
        </div>
      </div>

      {pageItems.length === 0 ? (
        <p className="mt-14 text-center text-body-md text-navy-500">No stories match your search.</p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pageItems.map((post, i) => (
            <Link
              key={post.id}
              href={`/news/${post.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-lg border border-surface-border bg-surface-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lifted"
            >
              <ImagePlaceholder icon={Newspaper} index={i} aspect="aspect-[16/10]" />
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-2">
                  <Badge variant="gold">{post.category}</Badge>
                  <span className="text-caption text-navy-400">{formatDate(post.date)}</span>
                </div>
                <h3 className="mt-3 text-display-sm leading-snug">{post.title}</h3>
                <p className="mt-2 flex-1 text-body-sm text-navy-500">{post.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 group-hover:text-royal-600">
                  Read story <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-12">
        <Pagination page={safePage} totalPages={totalPages} onChange={setPage} />
      </div>
    </div>
  );
}
