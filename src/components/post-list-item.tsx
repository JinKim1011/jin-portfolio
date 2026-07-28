"use client";

import { Post, PostView } from "@/types/post";
import Link from "next/link";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { cva } from "class-variance-authority";
import NavLinkItem from "./ui/nav-link-item";

type PostListItemProps = {
  post: Post;
  view: PostView;
};

type ViewTypeProps = {
  view: PostView;
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

const listItemBase =
  "items-center justify-between px-2.5 -mx-2.5 w-[calc(100%+1.25rem)]";

const listItemDivider =
  "relative after:content-[''] after:absolute after:inset-x-2.5 after:bottom-0 after:border-b-[0.5px] after:border-stroke";

const carddItemBase =
  "flex-col w-[calc(100%+0.75rem)] h-[calc(100%+1.5rem)] px-1.5 -mx-1.5 pt-1.5 -mt-1.5 pb-3 -mb-3";

const dateStyle = "text-label-small text-content-muted";

const viewLayout = cva(
  "flex bg-surface-interactive hover:bg-surface-interactive-hover active:bg-surface-interactive-active press-effect",
  {
    variants: {
      view: {
        list: `${listItemBase} ${listItemDivider}`,
        card: `${carddItemBase}`,
      },
    },
    defaultVariants: {
      view: "list",
    },
  },
);

const titleWrapper = cva("flex", {
  variants: {
    view: {
      list: "gap-3 items-center",
      card: "flex-col gap-0.5",
    },
  },
  defaultVariants: {
    view: "list",
  },
});

const titleStyle =
  "text-label text-content-interactive group-hover:text-content-interactive-hover group-hover:underline truncate";

const subTitleStyle = cva(
  "text-label-small group-hover:text-content-interactive-hover",
  {
    variants: {
      view: {
        list: "text-content-interactive-muted",
        card: "text-content-interactive line-clamp-1",
      },
    },
    defaultVariants: {
      view: "list",
    },
  },
);

const tagWrapper = cva("flex w-fit items-center", {
  variants: { view: { list: "gap-3", card: "gap-1" } },
  defaultVariants: { view: "list" },
});

function ListView({ post, isExternal, date, view }: ViewTypeProps) {
  return (
    <>
      <div className={viewLayout({ view })}>
        <div className={titleWrapper({ view })}>
          <h2 className={titleStyle}>
            {post.title}
            {isExternal && <ArrowTopRightIcon />}
          </h2>
          <h3 className={subTitleStyle({ view })}>{post.excerpt}</h3>
        </div>
        <div className={tagWrapper({ view })}>
          {post.categories.map((category) => (
            <NavLinkItem
              key={category}
              href={`/?category=${encodeURIComponent(category)}`}
              label={category}
              size="sm"
            />
          ))}
          <span className={dateStyle}>{date}</span>
        </div>
      </div>
    </>
  );
}

function CardView({ post, isExternal, date, view }: ViewTypeProps) {
  return (
    <>
      <div className={viewLayout({ view })}>
        <div className={titleWrapper({ view })}>
          <h2 className={titleStyle}>
            {post.title}
            {isExternal && <ArrowTopRightIcon />}
          </h2>
          <h3 className={subTitleStyle({ view })}>{post.excerpt}</h3>
        </div>
        <div className={tagWrapper({ view })}>
          <span className={dateStyle}>{date}</span>
          {post.categories.map((category) => (
            <NavLinkItem
              key={category}
              href={`/?category=${encodeURIComponent(category)}`}
              label={category}
              size="sm"
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default function PostListItem({ post, view }: PostListItemProps) {
  const { isExternal, href } = getPostLink(post);
  const [y, m, d] = post.publishedAt.split("-");
  const day = d?.slice(0, 2);
  const formattedPublishedAt = y && m && d ? `${day}.${m}.${y.slice(2)}` : "";

  const inner =
    view === "card" ? (
      <CardView
        post={post}
        isExternal={isExternal}
        date={formattedPublishedAt}
        view={view}
      />
    ) : (
      <ListView
        post={post}
        isExternal={isExternal}
        date={formattedPublishedAt}
        view={view}
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
