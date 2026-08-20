"use client";

import Link from "next/link";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";
import ScrambleText from "../scramble-text";

type NavLinkItemProps = {
  label: string;
  href: string;
  size?: "md" | "sm";
  isActive?: boolean;
  isBadge?: boolean;
  badgeClassName?: string;
  hideLabelOnSmall?: boolean;
  className?: string;
  isReplay?: boolean;
};

const styleClasses = cva(
  "py-0.5 hover:bg-surface-interactive-hoverStrong press-effect-translateY active:bg-surface-interactive-active inline-flex items-center",
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
  hideLabelOnSmall = false,
  className,
  isReplay = false,
}: NavLinkItemProps) {
  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      aria-label={label}
      className={styleClasses({
        active: isActive,
        size,
        isBadge,
        className,
      })}
    >
      {isBadge && <span className={cn("mr-1", badgeClassName)}>•</span>}
      <ScrambleText
        text={label}
        className={cn(hideLabelOnSmall && "hidden sm:inline")}
        playOnMount={false}
        isReplay={isReplay}
      />
    </Link>
  );
}
