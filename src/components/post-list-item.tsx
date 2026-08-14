"use client";

import { Post, PostView } from "@/types/post";
import Link from "next/link";
import { ArrowTopRightIcon } from "./icons";
import { cva } from "class-variance-authority";
import NavLinkItem from "./ui/nav-link-item";
import CoverImage from "./ui/cover-image";
import {
  badgeColor,
  getCategoryVariant,
} from "../lib/utils/category-badge-variants";

type PostListItemProps = {
  post: Post;
  view: PostView;
  isFirst?: boolean;
};

type ViewTypeProps = PostListItemProps & {
  href: string;
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

const ItemBase =
  "relative isolate flex bg-surface-interactive hover:bg-surface-interactive-hoverStrong active:bg-surface-interactive-active press-effect-translateY has-[.tag-wrapper:hover]:!bg-surface-interactive has-[.tag-wrapper:active]:!bg-surface-interactive has-[.tag-wrapper:active]:!transform-none";

const listItemBase =
  "items-center justify-between px-2.5 -mx-2.5 w-[calc(100%+1.25rem)] py-2.5";

const listItemBottomDivider =
  "relative after:content-[''] after:absolute after:inset-x-2.5 after:bottom-0 after:border-b-[0.5px] after:border-stroke group-hover:after:hidden";

const listItemTopDivider =
  "relative before:content-[''] before:absolute before:inset-x-2.5 before:top-0 before:border-t-[0.5px] before:border-stroke group-hover:before:hidden";

const cardItemBase =
  "flex-col w-[calc(100%+0.625rem)] h-[calc(100%+0.625rem)] px-[0.3125rem] -mx-[0.3125rem] pt-[0.3125rem] -mt-[0.3125rem] pb-[0.3125rem] -mb-[0.3125rem]";

const dateStyle = "text-label-small text-content-muted";

const viewLayout = cva(`${ItemBase}`, {
  variants: {
    view: {
      list: `${listItemBase}`,
      card: `${cardItemBase}`,
    },
    isFirst: {
      true: "",
      false: "",
    },
  },
  defaultVariants: {
    view: "list",
    isFirst: false,
  },
  compoundVariants: [
    {
      view: "list",
      isFirst: true,
      class: `${listItemBottomDivider} ${listItemTopDivider}`,
    },
    {
      view: "list",
      isFirst: false,
      class: `${listItemBottomDivider}`,
    },
  ],
});

const coverStyle = cva("shrink-0  object-cover border-[0.5px] border-stroke", {
  variants: {
    view: {
      list: "h-9 w-[64px]",
      card: "mb-2.5 w-full aspect-video",
    },
  },
  defaultVariants: {
    view: "list",
  },
});

const coverSizes = cva(" ", {
  variants: {
    view: {
      list: "64px",
      card: "(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw",
    },
  },
  defaultVariants: {
    view: "list",
  },
});

const titleWrapper = cva("flex", {
  variants: {
    view: {
      list: "gap-3 items-center flex-1",
      card: "flex-col",
    },
  },
  defaultVariants: {
    view: "list",
  },
});

const titleStyle =
  "text-label text-content-interactive group-hover:text-content-interactive-hover group-hover:underline group-has-[.tag-wrapper:hover]:!text-content-interactive group-has-[.tag-wrapper:hover]:!no-underline truncate";

const subTitleStyle = cva(
  "text-label-small text-content-interactive-muted truncate",
  {
    variants: {
      view: {
        list: "hidden sm:inline",
        card: "mt-0.5",
      },
    },
    defaultVariants: {
      view: "list",
    },
  },
);

const rightAdorn = cva("flex w-fit items-center", {
  variants: { view: { list: "gap-3", card: "gap-1 mt-[0.3125rem]" } },
  defaultVariants: { view: "list" },
});

const tagWrapper = "tag-wrapper relative z-10 flex w-fit items-center gap-1";

function ListView({
  post,
  isExternal,
  date,
  view,
  href,
  isFirst,
}: ViewTypeProps) {
  return (
    <>
      <div className={viewLayout({ view, isFirst })}>
        <div className={titleWrapper({ view })}>
          <CoverImage
            src={post.cover ?? null}
            alt={post.title}
            width={64}
            height={36}
            sizes={coverSizes({ view })}
            className={coverStyle({ view })}
          />
          <h2 className={titleStyle}>
            {isExternal ? (
              <a href={href} target="_blank" rel="noopener noreferrer">
                {post.title}
                <ArrowTopRightIcon />
                <span className="absolute inset-0 z-10" />
              </a>
            ) : (
              <Link href={href}>
                {post.title}
                <span className="absolute inset-0" />
              </Link>
            )}
          </h2>
          <h3 className={subTitleStyle({ view })}>{post.excerpt}</h3>
        </div>
        <div className={rightAdorn({ view })}>
          <div className={tagWrapper}>
            {post.categories.map((category) => (
              <NavLinkItem
                key={category}
                href={`/?category=${encodeURIComponent(category)}`}
                label={category}
                size="sm"
                isBadge={true}
                badgeClassName={badgeColor({
                  tag: getCategoryVariant(category),
                })}
              />
            ))}
          </div>
          <span className={dateStyle}>{date}</span>
        </div>
      </div>
    </>
  );
}

function CardView({ post, isExternal, date, view, href }: ViewTypeProps) {
  return (
    <>
      <div className={viewLayout({ view })}>
        <div className={titleWrapper({ view })}>
          <CoverImage
            src={post.cover ?? null}
            alt={post.title}
            width={640}
            height={360}
            sizes={coverSizes({ view })}
            className={coverStyle({ view })}
          />
          <h2 className={titleStyle}>
            {isExternal ? (
              <a href={href} target="_blank" rel="noopener noreferrer">
                {post.title}
                <ArrowTopRightIcon />
                <span className="absolute inset-0 z-10" />
              </a>
            ) : (
              <Link href={href}>
                {post.title}
                <span className="absolute inset-0 z-10" />
              </Link>
            )}
          </h2>
          <h3 className={subTitleStyle({ view })}>{post.excerpt}</h3>
        </div>
        <div className={rightAdorn({ view })}>
          <span className={dateStyle}>{date}</span>
          <div className={tagWrapper}>
            {post.categories.map((category) => (
              <NavLinkItem
                key={category}
                href={`/?category=${encodeURIComponent(category)}`}
                label={category}
                size="sm"
                isBadge={true}
                badgeClassName={badgeColor({
                  tag: getCategoryVariant(category),
                })}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default function PostListItem({
  post,
  view,
  isFirst,
}: PostListItemProps) {
  const { isExternal, href } = getPostLink(post);
  const [y, m, d] = post.publishedAt.split("-");
  const day = d?.slice(0, 2);
  const formattedPublishedAt = y && m && d ? `${day}.${m}.${y.slice(2)}` : "";

  const inner =
    view === "card" ? (
      <CardView
        post={post}
        isExternal={isExternal}
        href={href}
        date={formattedPublishedAt}
        view={view}
      />
    ) : (
      <ListView
        post={post}
        isExternal={isExternal}
        href={href}
        date={formattedPublishedAt}
        view={view}
        isFirst={isFirst}
      />
    );

  return (
    <li key={post.id} className="group">
      {inner}
    </li>
  );
}
