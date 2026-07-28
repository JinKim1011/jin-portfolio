"use client";

import Link from "next/link";
import { cva } from "class-variance-authority";

type navLinkItemProps = {
  label: string;
  href: string;
  size?: "md" | "sm";
  isActive?: boolean;
  isBadge?: boolean;
  badgeColor?: string;
};

const styleClasses = cva(
  "-mx-1 px-1 py-0.5 hover:bg-surface-interactive-hover hover:underline press-effect",
  {
    variants: {
      active: {
        true: "text-content-interactive-active",
        false: "text-content-interactive",
      },
      size: {
        md: "text-label",
        sm: "text-label-small",
      },
    },
    defaultVariants: {
      active: false,
      size: "md",
    },
  },
);

export default function NavLinkItem({
  label,
  href,
  size,
  isActive,
  isBadge,
  badgeColor,
}: navLinkItemProps) {
  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={styleClasses({ active: isActive, size: size })}
    >
      {label}
    </Link>
  );
}
