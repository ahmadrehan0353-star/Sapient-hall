"use client";

import * as React from "react";
import { ChevronDown, Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import type { Faq } from "@/lib/data/faqs";

export function FaqBrowser({ faqs }: { faqs: Faq[] }) {
  const categories = ["All", ...Array.from(new Set(faqs.map((f) => f.category ?? "General")))];
  const [category, setCategory] = React.useState("All");
  const [query, setQuery] = React.useState("");
  const [openId, setOpenId] = React.useState<string | null>(null);

  const filtered = faqs.filter((f) => {
    const matchC = category === "All" || (f.category ?? "General") === category;
    const q = query.trim().toLowerCase();
    const matchQ = !q || f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q);
    return matchC && matchQ;
  });

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
        <div className="relative w-full sm:w-60">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-navy-400" aria-hidden />
          <Input
            type="search"
            placeholder="Search questions…"
            aria-label="Search questions"
            className="pl-10"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-14 text-center text-body-md text-navy-500">No questions match your search.</p>
      ) : (
        <div className="mt-8 divide-y divide-surface-border rounded-lg border border-surface-border bg-surface-card shadow-card">
          {filtered.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id}>
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-medium text-navy-900">{faq.question}</span>
                  <ChevronDown className={cn("size-4 shrink-0 text-navy-400 transition-transform", isOpen && "rotate-180")} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-body-sm text-navy-500">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
