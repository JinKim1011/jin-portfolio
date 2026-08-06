"use client";

import { cn } from "@/lib/utils/cn";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { easings } from "@/lib/utils/motion-easing";
import { cva } from "class-variance-authority";
import { copyText } from "@/lib/utils/copy-text";

type ShareButtonProps = {
  text?: string;
  className?: string;
};

const wrapperBase = [
  "group cursor-pointer",
  "flex items-center overflow-hidden relative",
  "h-7 w-14",
  "border-[0.5px]",
  "press-effect-scale",
].join(" ");

const wrapperVariants = cva(`${wrapperBase}`, {
  variants: {
    done: {
      true: "bg-surface-feedback-success border-stroke-feedback-success",
      false:
        "bg-surface border-stroke-interactive hover:bg-surface-interactive-hoverWeak hover:border-stroke-interactive-hover",
    },
  },
  defaultVariants: {
    done: false,
  },
});

const labelBase = [
  "absolute inset-0 flex items-center justify-center",
  "text-label-small",
].join(" ");

const labelVariants = cva(`${labelBase}`, {
  variants: {
    done: {
      true: "text-content-feedback-success",
      false: "text-content-interactive",
    },
  },
  defaultVariants: {
    done: false,
  },
});

const idleVariants = {
  initial: { y: -32 },
  animate: { y: 0 },
  exit: { y: -32 },
};
const successVariants = {
  initial: { y: 32 },
  animate: { y: 0 },
  exit: { y: 32 },
};

const buttonCopy = {
  idle: "SHARE",
  success: "COPIED",
};

export function ShareButton({ text, className }: ShareButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [done, setDone] = useState(false);

  const handleClick = async () => {
    const value = text ?? window.location.href;
    const ok = await copyText(value);

    if (ok) {
      setDone(true);
      window.setTimeout(() => setDone(false), 1200);
    }
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label="Copy link"
      disabled={done}
      onClick={handleClick}
      className={wrapperVariants({ done })}
    >
      <AnimatePresence mode="sync" initial={false}>
        {done ? (
          <motion.span
            key="success"
            variants={successVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={labelVariants({ done })}
            transition={{ duration: 0.2, ease: easings.easeInOutCirc }}
          >
            {buttonCopy["success"]}
          </motion.span>
        ) : (
          <motion.span
            key="idle"
            variants={idleVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={labelVariants({ done })}
            transition={{ duration: 0.2, ease: easings.easeInOutCirc }}
          >
            {buttonCopy["idle"]}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
