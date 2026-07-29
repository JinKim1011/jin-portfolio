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

export default function PostList({ posts, view }: PostListProps) {
  return (
    <ul className={postLayout({ view })}>
      {posts.map((post, index) => (
        <PostListItem
          post={post}
          key={post.id}
          view={view}
          isFirst={index === 0}
        />
      ))}
    </ul>
  );
}
