"use client";

import { useScrambleCustom } from "@/lib/utils/scramble-text";
import { ComponentPropsWithoutRef, ElementType } from "react";

type ScrambleTextProps<T extends ElementType = "span"> = {
  text: string;
  as?: T;
  className?: string;
  playOnMount?: boolean;
  isReplay?: boolean;
  overflow?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

export default function ScrambleText<T extends ElementType = "span">({
  as,
  text,
  className,
  playOnMount = false,
  isReplay = false,
  overflow = true,
  ...props
}: ScrambleTextProps<T>) {
  const Component = as || "span";
  const { ref, replay } = useScrambleCustom({ text, playOnMount, overflow });
  return (
    <Component
      aria-label={text}
      className={className}
      ref={ref}
      onMouseEnter={isReplay ? replay : undefined}
      {...props}
    >
      {text}
    </Component>
  );
}
