"use client";

import { AnimatePresence, motion } from "motion/react";
import { easings } from "@/lib/utils/motion-easing";
import { useState } from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { ArrowTopRightIcon } from "@/components/icons";

export type CareerLinkProps = {
  label: string;
  startedAt: string;
  endedAt?: string;
  href?: string;
  target?: string;
};

const iconAnimvariants = {
  hidden: { opacity: 0, x: -12, width: 0, filter: "blur(2px)" },
  visible: { opacity: 1, x: 0, width: "auto", filter: "blur(0px)" },
};

const wrapperClasses = [
  "flex overflow-hidden w-fit",
  "items-center py-0.75 gap-3",
  "text-label text-content-default",
].join(" ");

const labelClasses = [
  "hover:text-content-interactive-hover active:text-content-interactive-active",
  "border-b border-dotted border-stroke-interactive-active active:border-stroke-interactive-active hover:border-stroke-interactive-hover",
].join(" ");

const periodClasses = "flex text-content-muted gap-2 items-center";

export default function CareerLink({
  label,
  startedAt,
  endedAt,
  href,
  target = "_blank",
}: CareerLinkProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={href}
      className={wrapperClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
    >
      <div className="flex w-28">
        <span className={labelClasses}>
          {label}
          <AnimatePresence initial={false}>
            {isHovered && (
              <motion.span
                key="rightIcon"
                variants={iconAnimvariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ duration: 0.25, ease: easings.easeOutCirc }}
                className="py- relative inline-flex overflow-hidden"
              >
                <ArrowTopRightIcon className="ml-0.5 size-3" />
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </div>
      <div className={periodClasses}>
        <span>{startedAt}</span>
        <ArrowRightIcon className="size-3" />
        <span>{endedAt ?? `....`}</span>
      </div>
    </motion.a>
  );
}
