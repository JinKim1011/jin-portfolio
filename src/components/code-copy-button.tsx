"use client";

import { useRef, useState } from "react";
import { CopyIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils/cn";
import { AnimatePresence, motion } from "motion/react";
import { easings } from "@/lib/utils/motion-easing";
import { copyCodeFromElement, copyText } from "@/lib/utils/copy-text";

type CodeCopyButtonProps = {
  text?: string;
  className?: string;
};

const iconAnimvariants = {
  hidden: { opacity: 0, scale: 0.75, filter: "blur(2px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
};

const wrapperClasses =
  "group press-effect-translateY hover:bg-surface-interactive-hoverStrong cursor-pointer bg-transparent p-1.5";

const iconClasses =
  "size-3.5 text-content-interactive-muted group-hover:text-content-interactive-hover group-active:text-content-interactive-active";

export default function CodeCopyButton({
  text,
  className,
}: CodeCopyButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [done, setDone] = useState(false);

  const handleClick = async () => {
    let ok = false;

    if (text) {
      ok = await copyText(text);
    } else {
      const element = buttonRef.current?.closest(
        ".notion-code",
      ) as HTMLElement | null;
      ok = await copyCodeFromElement(element);
    }

    if (ok) {
      setDone(true);
      window.setTimeout(() => setDone(false), 1500);
    }
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label="Copy code snippet"
      disabled={done}
      onClick={handleClick}
      className={cn(wrapperClasses, className)}
    >
      <AnimatePresence mode="wait" initial={false}>
        {done ? (
          <motion.span
            key="checkmark"
            variants={iconAnimvariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.25, ease: easings.easeInOutCirc }}
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
            transition={{ duration: 0.25, ease: easings.easeInOutCirc }}
          >
            <CopyIcon aria-hidden className={iconClasses} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
