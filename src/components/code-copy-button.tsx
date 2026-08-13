"use client";

import { useRef, useState, useEffect } from "react";
import { SquaresIcon, CheckIcon } from "./icons";
import { AnimatePresence, motion } from "motion/react";
import { easings } from "@/lib/utils/motion-easing";
import { copyCodeFromElement } from "@/lib/utils/copy-text";
import { createRoot } from "react-dom/client";

const iconAnimvariants = {
  hidden: { opacity: 0, scale: 0.75, filter: "blur(2px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
};

const wrapperClasses =
  "group press-effect-translateY hover:bg-surface-interactive-hoverStrong cursor-pointer bg-transparent p-1";

const iconClasses =
  "size-4 text-content-interactive-muted group-hover:text-content-interactive-hover group-active:text-content-interactive-active";

export function CodeCopyButton() {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [done, setDone] = useState(false);

  const handleClick = async () => {
    const element = buttonRef.current?.closest(
      ".notion-code",
    ) as HTMLElement | null;
    const ok = await copyCodeFromElement(element);

    if (ok) {
      setDone(true);
      window.setTimeout(() => setDone(false), 1200);
    }
  };

  return (
    <button
      ref={buttonRef}
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

export function CodeCopyHydrator() {
  useEffect(() => {
    const roots: Array<ReturnType<typeof createRoot>> = [];

    const containers = Array.from(
      document.querySelectorAll<HTMLElement>(".notion-code"),
    );

    containers.forEach((container) => {
      const mount = container.querySelector<HTMLElement>(".code-copy-mount");
      if (!mount) return;

      const computed = getComputedStyle(container).position;
      if (!computed || computed === "static")
        container.style.position = "relative";

      try {
        const root = createRoot(mount);
        root.render(<CodeCopyButton />);
        roots.push(root);
      } catch (event) {
        console.warn("Code copy mount failed", event);
      }
    });

    return () => {
      roots.forEach((root) => root.unmount());
    };
  }, []);

  return null;
}
