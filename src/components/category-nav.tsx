"use client";

import Link from "next/link";
import { cva } from "class-variance-authority";
import type { PostView } from "@/types/post";
import PostViewTypeControl from "./post-view-type-control";

type CategoryNavProps = {
  tabs: string[];
  active: string;
  view: PostView;
  onViewChange: (v: PostView) => void;
};

const navLinkItem = cva(
  "text-label -ml-1 px-1 py-0.5 hover:bg-surface-interactive-hover hover:underline",
  {
    variants: {
      active: {
        true: "text-content-interactive-active",
        false: "text-content-interactive",
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);

export default function CategoryNav({
  tabs,
  active,
  view,
  onViewChange,
}: CategoryNavProps) {
  return (
    <div className="flex h-14 items-center justify-between">
      <nav className="flex flex-wrap gap-2 text-sm">
        {tabs.map((category) => {
          const href =
            category === "ALL"
              ? "/"
              : `/?category=${encodeURIComponent(category)}`;
          const isActive = active === category;
          return (
            <Link
              key={category}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={navLinkItem({ active: isActive })}
            >
              {category}
            </Link>
          );
        })}
      </nav>
      <PostViewTypeControl view={view} onViewChange={onViewChange} />
    </div>
  );
}
