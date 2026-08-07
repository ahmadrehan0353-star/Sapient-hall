import Image from "next/image";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

const palettes = [
  "from-navy-700 via-navy-800 to-navy-900",
  "from-royal-600 via-navy-800 to-navy-900",
  "from-navy-800 via-navy-900 to-navy-950",
];

/**
 * ImagePlaceholder — renders a real photo when `src` is provided, otherwise a
 * branded gradient stand-in. Same wrapper either way, so layouts never shift
 * as real photography gets wired in.
 */
export function ImagePlaceholder({
  icon: Icon,
  label,
  index = 0,
  className,
  aspect = "aspect-[4/3]",
  src,
  alt,
}: {
  icon?: LucideIcon;
  label?: string;
  index?: number;
  className?: string;
  aspect?: string;
  src?: string;
  alt?: string;
}) {
  if (src) {
    return (
      <div className={cn("relative overflow-hidden rounded-lg bg-navy-900", aspect, className)}>
        <Image
          src={src}
          alt={alt ?? label ?? ""}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
        {label && (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" aria-hidden />
            <span className="absolute bottom-0 left-0 z-10 p-4 text-caption font-medium text-white/90">{label}</span>
          </>
        )}
      </div>
    );
  }

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
