import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { NewsGrid } from "@/components/shared/NewsGrid";
import { getNews } from "@/lib/content";

export const metadata: Metadata = {
  title: "News",
  description: "Announcements, stories, and results from around Sapient Hall School System.",
};

export const revalidate = 300;

export default async function NewsPage() {
  const newsPosts = await getNews();
  return (
    <>
      <PageHero
        eyebrow="Newsroom"
        title="Stories from around campus."
        description="Announcements, results, and the moments that make the school year."
        crumbs={[{ label: "News" }]}
      />
      <section className="container-page section-y">
        <NewsGrid posts={newsPosts} />
      </section>
    </>
  );
}
