"use client";

import { Post, PostView } from "@/types/post";
import PostListItem from "@/components/post-list-item";

type PostListProps = {
  posts: Post[];
  view: PostView;
};

export default function PostList({ posts, view }: PostListProps) {
  return (
    <ul className="flex flex-col gap-0 pb-10">
      {posts.map((post) => (
        <PostListItem post={post} key={post.id} view={view} />
      ))}
    </ul>
  );
}
