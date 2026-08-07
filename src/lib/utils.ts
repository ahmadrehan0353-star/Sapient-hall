import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names safely (Tailwind-aware). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a Firestore Timestamp-ish or Date/string into a readable date. */
export function formatDate(input: string | number | Date, opts?: Intl.DateTimeFormatOptions) {
  const d = new Date(input);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    ...opts,
  }).format(d);
}

/** Slugify a string for URLs / IDs. */
export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

/** Truncate text to n characters on a word boundary. */
export function truncate(text: string, max = 160) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(" ")) + "…";
}
