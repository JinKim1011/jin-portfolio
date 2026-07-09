import { getPosts } from "@/lib/posts";
import PostList from "@/components/post-list";
import CategoryNav from "@/components/category-nav";
import { Suspense } from "react";

type HomePageProps = {
  searchParams: Promise<{ category?: string }>;
};

async function HomeContent({ searchParams }: HomePageProps) {
  const posts = await getPosts();

  const allCategories = Array.from(
    new Set(posts.flatMap((p) => p.categories)),
  ).sort();
  const tabs = ["ALL", ...allCategories];

  const { category } = await searchParams;
  const active = category?.toUpperCase() ?? "ALL";

  const filtered =
    active === "ALL"
      ? posts
      : posts.filter((p) => p.categories.includes(active));

  return (
    <div className="space-y-10">
      <CategoryNav tabs={tabs} active={active} />
      <PostList posts={filtered} />
    </div>
  );
}

export default function HomePage(props: HomePageProps) {
  return (
    <Suspense fallback={null}>
      <HomeContent {...props} />
    </Suspense>
  );
}
