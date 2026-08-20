"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { easings } from "@/lib/utils/motion-easing";

type RevealEffectProps = {
  children: ReactNode;
  delay?: number;
  key?: string;
  className?: string;
};

const variants = {
  hidden: { opacity: 0, y: -4 },
  visible: { opacity: 1, y: 0 },
};

export default function RevealEffect({
  children,
  delay = 0,
  key,
  className,
}: RevealEffectProps) {
  return (
    <motion.div
      key={key}
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.6, delay, ease: easings.easeOutExpo }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
