"use client";

import Link from "next/link";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

type NavLinkItemProps = {
  label: string;
  href: string;
  size?: "md" | "sm";
  isActive?: boolean;
  isBadge?: boolean;
  badgeClassName?: string;
};

const styleClasses = cva(
  "py-0.5 hover:bg-surface-interactive-hoverStrong press-effect-translateY active:bg-surface-interactive-active",
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
      isBadge: {
        true: "-mr-1 pr-1",
        false: "-mx-1 px-1",
      },
    },
    defaultVariants: {
      active: false,
      isBadge: false,
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
  badgeClassName,
}: NavLinkItemProps) {
  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={styleClasses({
        active: isActive,
        size: size,
        isBadge: isBadge,
      })}
    >
      {isBadge && <span className={cn("mr-1", badgeClassName)}>•</span>}
      <span>{label}</span>
    </Link>
  );
}
