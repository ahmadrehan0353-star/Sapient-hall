import Link from "next/link";
import { Megaphone, ArrowRight } from "lucide-react";
import { getActiveAnnouncements } from "@/lib/content";

/**
 * Slim banner above the navbar showing active announcements from the CMS.
 * Renders nothing when there are none (which is the default until Firebase
 * is configured and an announcement is marked active).
 */
export async function AnnouncementBar() {
  const announcements = await getActiveAnnouncements();
  const a = announcements[0];
  if (!a) return null;

  const inner = (
    <span className="inline-flex items-center gap-2.5">
      <Megaphone className="size-3.5 shrink-0 text-gold-400" aria-hidden />
      <span className="truncate">{a.text}</span>
      {a.link && <ArrowRight className="size-3.5 shrink-0" aria-hidden />}
    </span>
  );

  return (
    <div className="bg-navy-950 text-white">
      <div className="container-page flex h-9 items-center justify-center text-[0.8rem] font-medium">
        {a.link ? (
          <Link href={a.link} className="truncate transition-colors hover:text-gold-400">{inner}</Link>
        ) : (
          inner
        )}
      </div>
    </div>
  );
}
