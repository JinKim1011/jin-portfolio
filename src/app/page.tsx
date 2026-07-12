import { getPosts } from "@/lib/posts";
import Posts from "@/components/posts";

export default async function HomePage() {
  const posts = await getPosts();

  const allCategories = Array.from(
    new Set(posts.flatMap((post) => post.categories)),
  ).sort();
  const tabs = ["ALL", ...allCategories];

  return <Posts posts={posts} tabs={tabs} />;
}
