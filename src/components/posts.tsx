"use client";

import { useEffect, useState } from "react";
import type { Post } from "@/types/post";
import CategoryNav from "@/components/category-nav";
import PostList from "@/components/post-list";

type PostsProps = {
  posts: Post[];
  tabs: string[];
};

function readActiveCategory() {
  const params = new URLSearchParams(window.location.search);
  return params.get("category")?.toUpperCase() ?? "ALL";
}

export default function Posts({ posts, tabs }: PostsProps) {
  const [active, setActive] = useState("ALL");

  useEffect(() => {
    const updateActive = () => setActive(readActiveCategory());

    updateActive();
    window.addEventListener("popstate", updateActive);

    return () => window.removeEventListener("popstate", updateActive);
  }, []);

  const filteredPosts =
    active === "ALL"
      ? posts
      : posts.filter((post) => post.categories.includes(active));

  return (
    <div>
      <CategoryNav tabs={tabs} active={active} />
      <PostList posts={filteredPosts} />
    </div>
  );
}
