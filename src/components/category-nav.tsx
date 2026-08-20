"use client";

import type { PostView } from "@/types/post";
import PostViewTypeControl from "./post-view-type-control";
import NavLinkItem from "./ui/nav-link-item";

type CategoryNavProps = {
  tabs: string[];
  active: string;
  view: PostView;
  onViewChange: (v: PostView) => void;
};

export default function CategoryNav({
  tabs,
  active,
  view,
  onViewChange,
}: CategoryNavProps) {
  return (
    <div className="flex h-14 items-center justify-between">
      <nav className="nav-scroll flex min-w-0 flex-1 gap-4 overflow-x-visible whitespace-nowrap max-sm:overflow-x-auto">
        {tabs.map((category) => {
          const href =
            category === "ALL"
              ? "/"
              : `/?category=${encodeURIComponent(category)}`;
          const isActive = active === category;
          return (
            <NavLinkItem
              key={category}
              href={href}
              label={category}
              isActive={isActive}
              size="md"
              isReplay={true}
              className="hover:text-content-interactive-hover active:text-content-interactive-active"
            />
          );
        })}
      </nav>
      <PostViewTypeControl view={view} onViewChange={onViewChange} />
    </div>
  );
}
