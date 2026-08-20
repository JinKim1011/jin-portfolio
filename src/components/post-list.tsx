"use client";

import { Post, PostView } from "@/types/post";
import { cva } from "class-variance-authority";
import PostListItem from "@/components/post-list-item";

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
  visible: { transition: { staggerChildren: 0.06 } },
};

export default function PostList({ posts, view }: PostListProps) {
  return (
    <motion.ul
      key={pathname}
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
