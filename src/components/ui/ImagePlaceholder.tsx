import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

const palettes = [
  "from-navy-700 via-navy-800 to-navy-900",
  "from-royal-600 via-navy-800 to-navy-900",
  "from-navy-800 via-navy-900 to-navy-950",
];

/**
 * ImagePlaceholder — a styled stand-in for real campus photography.
 * Swap for <CldImage> (next-cloudinary) once real photos are uploaded
 * in Phase 7 — the aspect-ratio wrapper and rounding stay the same so
 * layouts don't shift.
 */
export function ImagePlaceholder({
  icon: Icon,
  label,
  index = 0,
  className,
  aspect = "aspect-[4/3]",
}: {
  icon?: LucideIcon;
  label?: string;
  index?: number;
  className?: string;
  aspect?: string;
}) {
  const palette = palettes[index % palettes.length];
  return (
    <div
      className={cn(
        "relative flex items-end overflow-hidden rounded-lg bg-gradient-to-br",
        palette,
        aspect,
        className
      )}
    >
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "18px 18px",
        }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" aria-hidden />
      {Icon && (
        <Icon className="absolute right-4 top-4 size-6 text-white/25" aria-hidden />
      )}
      {label && (
        <span className="relative z-10 p-4 text-caption font-medium text-white/70">{label}</span>
      )}
    </div>
  );
}
