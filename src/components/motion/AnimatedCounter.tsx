"use client";

import * as React from "react";
import { useInView, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * AnimatedCounter — counts up to `value` once visible. Uses a spring so the
 * motion feels physical rather than linear. Renders the final value
 * immediately if the user prefers reduced motion.
 */
export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const shouldReduceMotion = useReducedMotion();
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 90 });
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    if (isInView) {
      if (shouldReduceMotion) {
        setDisplay(value);
      } else {
        motionValue.set(value);
      }
    }
  }, [isInView, value, motionValue, shouldReduceMotion]);

  React.useEffect(() => {
    const unsub = springValue.on("change", (v) => setDisplay(Math.round(v)));
    return unsub;
  }, [springValue]);

  return (
    <span ref={ref} className={cn("font-mono tabular-nums", className)}>
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}
