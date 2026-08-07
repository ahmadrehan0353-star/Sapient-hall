"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const pages = getPageList(page, totalPages);

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1.5">
      <button
        aria-label="Previous page"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="flex size-10 items-center justify-center rounded-sm border border-surface-border text-navy-600 transition-colors hover:bg-surface-muted disabled:opacity-40 disabled:pointer-events-none"
      >
        <ChevronLeft className="size-4" />
      </button>

      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`dots-${i}`} className="px-2 text-navy-400">
            …
          </span>
        ) : (
          <button
            key={p}
            aria-current={p === page ? "page" : undefined}
            onClick={() => onChange(p as number)}
            className={cn(
              "flex size-10 items-center justify-center rounded-sm text-sm font-medium transition-colors",
              p === page
                ? "bg-navy-900 text-white"
                : "text-navy-600 hover:bg-surface-muted"
            )}
          >
            {p}
          </button>
        )
      )}

      <button
        aria-label="Next page"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="flex size-10 items-center justify-center rounded-sm border border-surface-border text-navy-600 transition-colors hover:bg-surface-muted disabled:opacity-40 disabled:pointer-events-none"
      >
        <ChevronRight className="size-4" />
      </button>
    </nav>
  );
}

function getPageList(page: number, total: number): (number | "…")[] {
  const delta = 1;
  const range: (number | "…")[] = [];
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= page - delta && i <= page + delta)) {
      range.push(i);
    } else if (range[range.length - 1] !== "…") {
      range.push("…");
    }
  }
  return range;
}
