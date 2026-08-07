import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Newspaper } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Badge } from "@/components/ui/Badge";
import { newsPosts as seedNews } from "@/lib/data/news";
import { getNews, getNewsPost } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export const revalidate = 300;

export function generateStaticParams() {
  return seedNews.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: "article", publishedTime: post.date },
  };
}

export default async function NewsPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const allPosts = await getNews();
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = allPosts.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 2);
  const fallbackRelated = related.length ? related : allPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <PageHero
        eyebrow={post.category}
        title={post.title}
        description={`${formatDate(post.date)}`}
        crumbs={[{ label: "News", href: "/news" }, { label: post.title }]}
      />

      <article className="container-page section-y">
        <Reveal className="mx-auto max-w-3xl">
          <ImagePlaceholder icon={Newspaper} aspect="aspect-[16/8]" />
          <div className="prose prose-lg mt-10 max-w-none prose-headings:font-display prose-p:text-navy-700">
            <p className="text-body-lg text-navy-700">{post.content}</p>
          </div>
          <Link href="/news" className="mt-10 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 hover:text-royal-600">
            <ArrowLeft className="size-4" /> Back to all news
          </Link>
        </Reveal>
      </article>

      <section className="bg-surface-muted/60">
        <div className="container-page section-y !py-16">
          <Reveal>
            <h2 className="text-display-sm">Related stories</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {fallbackRelated.map((p, i) => (
                <Link key={p.id} href={`/news/${p.slug}`} className="group flex gap-5 rounded-lg border border-surface-border bg-surface-card p-4 shadow-card transition-shadow hover:shadow-lifted">
                  <ImagePlaceholder icon={Newspaper} index={i} aspect="aspect-square" className="w-24 shrink-0" />
                  <div className="min-w-0">
                    <Badge variant="gold">{p.category}</Badge>
                    <h3 className="mt-2 font-display font-semibold leading-snug text-navy-900">{p.title}</h3>
                    <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-royal-600">
                      Read <ArrowRight className="size-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
