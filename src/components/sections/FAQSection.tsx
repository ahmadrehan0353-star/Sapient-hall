"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";
import { homeFaqs } from "@/lib/data/faqs";

export function FAQSection() {
  const [openId, setOpenId] = React.useState<string | null>(homeFaqs[0]?.id ?? null);

  return (
    <section className="container-page section-y">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="eyebrow justify-center">Common questions</p>
        <h2 className="mt-3 text-display-md">Answers before you apply.</h2>
      </Reveal>

      <Reveal delay={0.1} className="mx-auto mt-10 max-w-2xl divide-y divide-surface-border rounded-lg border border-surface-border bg-surface-card shadow-card">
        {homeFaqs.map((faq) => {
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
      </Reveal>
    </section>
  );
}
