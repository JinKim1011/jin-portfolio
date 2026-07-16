"use client";

import { Post, PostView } from "@/types/post";
import Link from "next/link";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";

type PostListItemProps = {
  post: Post;
  view: PostView;
};

type ViewTypeProps = {
  post: Post;
  isExternal: boolean;
  date: string;
};

function getPostLink(post: Post) {
  const isExternal = post.external && !!post.externalUrl;

  return {
    isExternal,
    href: isExternal ? post.externalUrl! : `/posts/${post.slug}`,
  };
}

function ListView({ post, isExternal, date }: ViewTypeProps) {
  return (
    <>
      <div className="border-stroke bg-surface-interactive hover:bg-surface-interactive-hover active:bg-surface-interactive-active flex items-baseline justify-between border-b-[0.5px]">
        <h2 className="text-label-large text-content-interactive group-hover:text-content-interactive-hover group-hover:underline">
          {post.title}
        </h2>
        <div className="flex w-fit gap-2">
          <span className="text-label text-content-interactive">
            {post.categories.join(" · ")}
          </span>
          <span className="text-label-small text-content-muted">{date}</span>
          {isExternal && <ArrowTopRightIcon />}
        </div>
      </div>
      <p className="text-content-muted text-sm">{post.excerpt}</p>
    </>
  );
}

function CardView({ post, isExternal, date }: ViewTypeProps) {
  return (
    <>
      <div className="border-stroke bg-surface-interactive hover:bg-surface-interactive-hover active:bg-surface-interactive-active flex flex-col items-baseline border-b-[0.5px]">
        <h2 className="text-label-large text-content-interactive group-hover:text-content-interactive-hover group-hover:underline">
          {post.title}
        </h2>
        <div className="flex w-fit gap-2">
          <span className="text-label text-content-interactive">
            {post.categories.join(" · ")}
          </span>
          <span className="text-label-small text-content-muted">{date}</span>
          {isExternal && <ArrowTopRightIcon />}
        </div>
      </div>
      <p className="text-content-muted text-sm">{post.excerpt}</p>
    </>
  );
}

export default function PostListItem({ post, view }: PostListItemProps) {
  const { isExternal, href } = getPostLink(post);
  const [y, m, d] = post.publishedAt.split("-");
  const formattedPublishedAt =
    y && m && d ? `${d}.${m}.${y.slice(2)}` : "undefined";

  const inner =
    view === "card" ? (
      <CardView
        post={post}
        isExternal={isExternal}
        date={formattedPublishedAt}
      />
    ) : (
      <ListView
        post={post}
        isExternal={isExternal}
        date={formattedPublishedAt}
      />
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
