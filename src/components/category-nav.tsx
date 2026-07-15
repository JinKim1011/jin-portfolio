"use client";

import Link from "next/link";
import { cva } from "class-variance-authority";

type CategoryNavProps = {
  tabs: string[];
  active: string;
};

const navLinkItem = cva("text-label -ml-1 px-1 hover:bg-gray-900/10", {
  variants: {
    active: {
      true: "",
      false: "",
    },
  },
  defaultVariants: {
    active: false,
  },
});

export default function CategoryNav({ tabs, active }: CategoryNavProps) {
  return (
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
  );
}
