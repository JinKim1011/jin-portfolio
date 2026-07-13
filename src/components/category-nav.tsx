"use client";

import Link from "next/link";

type CategoryNavProps = {
  tabs: string[];
  active: string;
};

export default function CategoryNav({ tabs, active }: CategoryNavProps) {
  return (
    <nav className="flex flex-wrap gap-1.5 text-sm">
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
            className={
              isActive
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }
          >
            {category}
          </Link>
        );
      })}
    </nav>
  );
}
