"use client";

import { Post } from "@/types/post";
import Link from "next/link";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";

type PostListItemProps = {
  post: Post;
};

export default function PostListItem({ post }: PostListItemProps) {
  const isExternal = post.external && !!post.externalUrl;
  const href = isExternal ? post.externalUrl! : `/posts/${post.slug}`;
  const [y, m, d] = post.publishedAt.split("-");
  const formattedPublishedAt = y && m && d ? `${d}.${m}.${y.slice(2)}` : null;

  const inner = (
    <>
      <div className="flex items-baseline justify-between">
        <h2 className="text-label-large group-hover:underline">
          {post.title}
          {isExternal && <ArrowTopRightIcon />}
        </h2>
        <div className="flex w-fit gap-2">
          <span className="text-label">{post.categories.join(" · ")}</span>
          <span className="text-label-small">{formattedPublishedAt}</span>
        </div>
      </div>
      <p className="text-sm">{post.excerpt}</p>
    </>
  );

  return (
    <li key={post.id}>
      {isExternal ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          {inner}
        </a>
      ) : (
        <Link href={href} className="group block">
          {inner}
        </Link>
      )}
    </li>
  );
}
