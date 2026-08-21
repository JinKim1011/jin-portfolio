"use client";

import { Post, PostView } from "@/types/post";
import { cva } from "class-variance-authority";
import { easings } from "@/lib/utils/motion-easing";
import PostListItem from "@/components/post-list-item";
import { motion } from "motion/react";
import { useSearchParams } from "next/navigation";

type PostListProps = {
  posts: Post[];
  view: PostView;
};

const postLayout = cva("pb-10", {
  variants: {
    view: {
      list: "flex flex-col gap-0",
      card: "grid grid-cols-2 md:grid-cols-3 gap-2.5",
    },
  },
  defaultVariants: {
    view: "list",
  },
});

const revealEffect = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, ease: easings.easeOutExpo } },
};

export default function PostList({ posts, view }: PostListProps) {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? "ALL";
  return (
    <motion.ul
      key={`${category}-${view}`}
      variants={revealEffect}
      initial="hidden"
      animate="visible"
      className={postLayout({ view })}
    >
      {posts.map((post) => (
        <PostListItem post={post} key={post.id} view={view} />
      ))}
    </motion.ul>
  );
}
