"use client";

import * as React from "react";

function diffParts(target: Date) {
  const now = Date.now();
  const delta = Math.max(0, target.getTime() - now);
  const days = Math.floor(delta / 86_400_000);
  const hours = Math.floor((delta % 86_400_000) / 3_600_000);
  const minutes = Math.floor((delta % 3_600_000) / 60_000);
  const seconds = Math.floor((delta % 60_000) / 1000);
  return { days, hours, minutes, seconds, done: delta === 0 };
}

export function Countdown({ target }: { target: string }) {
  const targetDate = React.useMemo(() => new Date(target), [target]);
  const [parts, setParts] = React.useState(() => diffParts(targetDate));

  React.useEffect(() => {
    const id = setInterval(() => setParts(diffParts(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  if (parts.done) {
    return <p className="font-display text-lg font-semibold text-emerald-600">This event is underway or has passed.</p>;
  }

  const cells = [
    { label: "Days", value: parts.days },
    { label: "Hours", value: parts.hours },
    { label: "Minutes", value: parts.minutes },
    { label: "Seconds", value: parts.seconds },
  ];

  return (
    <div className="flex gap-3" role="timer" aria-label="Countdown to event">
      {cells.map((c) => (
        <div key={c.label} className="flex w-18 flex-col items-center rounded-sm bg-navy-900 py-3 text-white">
          <span className="font-mono text-2xl font-semibold tabular-nums text-gold-400">
            {String(c.value).padStart(2, "0")}
          </span>
          <span className="text-[0.65rem] uppercase tracking-wider text-navy-300">{c.label}</span>
        </div>
      ))}
    </div>
  );
}
