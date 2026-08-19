"use client";

import { AnimatePresence, motion } from "motion/react";
import { easings } from "@/lib/utils/motion-easing";
import { IconComponent } from "../icons/icon";
import { useState } from "react";

type SocialLinkProps = {
  label: string;
  href: string;
  rightIcon?: IconComponent;
  target?: string;
  rel?: string;
};

const iconAnimvariants = {
  hidden: { opacity: 0, x: -12, width: 0, filter: "blur(2px)" },
  visible: { opacity: 1, x: 0, width: "auto", filter: "blur(0px)" },
};

const wrapperClasses = [
  "inline-flex overflow-hidden",
  "items-center py-0.5",
  "text-label text-content-interactive hover:text-content-interactive-hover active:text-content-interactive-active",
  "border-b border-dotted border-stroke-interactive-active active:border-stroke-interactive-active hover:border-stroke-interactive-hover",
].join(" ");

export default function SocialLink({
  label,
  href,
  rightIcon: RightIcon,
  target = "_self",
  rel = undefined,
}: SocialLinkProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={href}
      className={wrapperClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      target={target}
      rel={rel}
    >
      {label}
      <AnimatePresence initial={false}>
        {RightIcon && isHovered && (
          <motion.span
            key="rightIcon"
            variants={iconAnimvariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.25, ease: easings.easeOutCirc }}
            className="relative inline-flex overflow-hidden"
          >
            <RightIcon className="ml-0.5 size-3" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.a>
  );
}
