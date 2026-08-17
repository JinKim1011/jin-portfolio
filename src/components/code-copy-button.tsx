"use client";

import { useState } from "react";
import { SquaresIcon, CheckIcon } from "./icons";
import { AnimatePresence, motion } from "motion/react";
import { easings } from "@/lib/utils/motion-easing";
import { copyText } from "@/lib/utils/copy-text";

const iconAnimvariants = {
  hidden: { opacity: 0, scale: 0.75, filter: "blur(2px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
};

const wrapperClasses =
  "group press-effect-translateY hover:bg-surface-interactive-hoverStrong cursor-pointer bg-transparent p-1";

const iconClasses =
  "size-4 text-content-interactive-muted group-hover:text-content-interactive-hover group-active:text-content-interactive-active";

export function CodeCopyButton({ raw }: { raw: string }) {
  const [done, setDone] = useState(false);

  const handleClick = async () => {
    const ok = await copyText(raw);

    if (ok) {
      setDone(true);
      window.setTimeout(() => setDone(false), 1200);
    }
  };

  return (
    <button
      type="button"
      aria-label="Copy code snippet"
      disabled={done}
      onClick={handleClick}
      className={wrapperClasses}
    >
      <AnimatePresence mode="wait" initial={false}>
        {done ? (
          <motion.span
            key="checkmark"
            variants={iconAnimvariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2, ease: easings.easeInOutCirc }}
          >
            <CheckIcon aria-hidden className={iconClasses} />
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            variants={iconAnimvariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2, ease: easings.easeInOutCirc }}
          >
            <SquaresIcon aria-hidden className={iconClasses} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
