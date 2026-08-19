"use client";

import { useScrambleCustom } from "@/lib/utils/scramble-text";

type ScrambleTextProps = {
  text: string;
  className?: string;
  playOnMount?: boolean;
  isReplay?: boolean;
  overflow?: boolean;
};

export default function ScrambleText({
  text,
  className,
  playOnMount = false,
  isReplay = false,
  overflow = true,
}: ScrambleTextProps) {
  const { ref, replay } = useScrambleCustom({ text, playOnMount, overflow });
  return (
    <span
      aria-label={text}
      className={className}
      ref={ref}
      onMouseOver={isReplay ? replay : undefined}
      onFocus={isReplay ? replay : undefined}
    >
      {text}
    </span>
  );
}
