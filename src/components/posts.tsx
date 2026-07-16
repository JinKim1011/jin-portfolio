"use client";

import type { Post } from "@/types/post";
import CategoryNav from "@/components/category-nav";
import PostList from "@/components/post-list";
import { useSearchParams } from "next/navigation";

type PostsProps = {
  posts: Post[];
  tabs: string[];
};

export default function Posts({ posts, tabs }: PostsProps) {
  const searchParams = useSearchParams();
  const active = (searchParams.get("category") || "ALL").toUpperCase();
  const filteredPosts =
    active === "ALL"
      ? posts
      : posts.filter((post) => post.categories.includes(active));

  return (
    <div>
      <CategoryNav
        tabs={tabs}
        active={active}
        view={view}
        onViewChange={setView}
      />
      <PostList posts={filteredPosts} view={view} />
    </div>
  );
}
