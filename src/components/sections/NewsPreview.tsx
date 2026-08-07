import Link from "next/link";
import { ArrowRight, Newspaper } from "lucide-react";
import { Reveal, RevealGroup } from "@/components/motion/Reveal";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Badge } from "@/components/ui/Badge";
import { getNews } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export async function NewsPreview() {
  const posts = (await getNews()).slice(0, 3);
  return (
    <section className="container-page section-y">
      <Reveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow">Latest news</p>
          <h2 className="mt-3 max-w-xl text-display-md">Stories from around campus.</h2>
        </div>
        <Link href="/news" className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 hover:text-royal-600">
          Visit the newsroom <ArrowRight className="size-4" />
        </Link>
      </Reveal>

      <RevealGroup className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {posts.map((post, i) => (
          <Reveal key={post.id}>
            <Link
              href={`/news/${post.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-lg border border-surface-border bg-surface-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lifted"
            >
              <ImagePlaceholder icon={Newspaper} index={i} aspect="aspect-[16/10]" />
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-2">
                  <Badge variant="gold">{post.category}</Badge>
                  <span className="text-caption text-navy-400">{formatDate(post.date)}</span>
                </div>
                <h3 className="mt-3 text-display-sm leading-snug">{post.title}</h3>
                <p className="mt-2 flex-1 text-body-sm text-navy-500">{post.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 group-hover:text-royal-600">
                  Read story <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </RevealGroup>
    </section>
  );
}
