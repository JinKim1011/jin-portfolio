"use client";

import { Post, PostView } from "@/types/post";
import Link from "next/link";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { cva } from "class-variance-authority";

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
  "flex-col w-[calc(100%+0.75rem)] h-[calc(100%+0.625rem)] px-1.5 -mx-1.5 pt-1.5 -mt-1.5";

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
      list: "gap-2 items-center",
      card: "flex-col gap-0.5",
    },
  },
  defaultVariants: {
    view: "list",
  },
});

const titleStyle = cva(
  "text-label text-content-interactive group-hover:text-content-interactive-hover group-hover:underline",
  {
    variants: {
      view: {
        list: "truncate",
        card: "line-clamp-1",
      },
    },
    defaultVariants: {
      view: "list",
    },
  },
);

function ListView({ post, isExternal, date, view }: ViewTypeProps) {
  return (
    <>
      <div className={viewLayout({ view })}>
        <div className={titleWrapper({ view })}>
          <h2 className={titleStyle({ view })}>{post.title}</h2>
          <h3 className="text-content-muted text-sm">{post.excerpt}</h3>
        </div>
        <div className="flex w-fit gap-2">
          <span className="text-label text-content-interactive">
            {post.categories.join(" · ")}
          </span>
          <span className="text-label-small text-content-muted">{date}</span>
          {isExternal && <ArrowTopRightIcon />}
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
          <h2 className={titleStyle({ view })}>{post.title}</h2>
          <h3 className="text-content-muted text-sm">{post.excerpt}</h3>
        </div>
        <div className="flex w-fit gap-2">
          <span className="text-label text-content-interactive">
            {post.categories.join(" · ")}
          </span>
          <span className="text-label-small text-content-muted">{date}</span>
          {isExternal && <ArrowTopRightIcon />}
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
