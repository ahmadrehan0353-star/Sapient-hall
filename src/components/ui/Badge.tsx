import * as React from "react";
import { cn } from "@/lib/utils";

const variants = {
  navy: "bg-navy-900/8 text-navy-800",
  royal: "bg-royal-500/10 text-royal-700",
  gold: "bg-gold-500/15 text-gold-700",
  emerald: "bg-emerald-50 text-emerald-600",
  amber: "bg-amber-50 text-amber-600",
  crimson: "bg-crimson-50 text-crimson-600",
  outline: "border border-navy-900/15 text-navy-700",
} as const;

export function Badge({
  variant = "navy",
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: keyof typeof variants }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-caption font-medium",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
