import { getPosts } from "@/lib/posts";
import Posts from "@/components/posts";
import { Suspense } from "react";

const CATEGORY_ORDER = ["PROJECT", "CASE STUDY", "DESIGN SYSTEM", "ESSAY"];

export default async function HomePage() {
  const posts = await getPosts();

  const categorySet = new Set(posts.flatMap((post) => post.categories));
  const allCategories = CATEGORY_ORDER.filter((category) =>
    categorySet.has(category),
  );

  const tabs = ["ALL", ...allCategories];

  return (
    <Suspense>
      <Posts posts={posts} tabs={tabs} />
    </Suspense>
  );
}
