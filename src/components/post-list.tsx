"use client";

import { Post } from "@/types/post";
import PostListItem from "@/components/post-list-item";

type PostListProps = {
  posts: Post[];
};

export default function PostList({ posts }: PostListProps) {
  return (
    <ul className="flex flex-col gap-0">
      {posts.map((post) => (
        <PostListItem post={post} key={post.id} />
      ))}
    </ul>
  );
}
