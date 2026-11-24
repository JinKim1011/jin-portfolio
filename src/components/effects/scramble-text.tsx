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
  overdrive?: boolean | number;
  speed?: number;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export default function ScrambleText<T extends ElementType = "span">({
  as,
  text,
  className,
  playOnMount = false,
  isReplay = false,
  overflow = true,
  overdrive = true,
  speed = 0.6,
  ...props
}: ScrambleTextProps<T>) {
  const Component = as || "span";
  const { ref, replay } = useScrambleCustom({
    text,
    playOnMount,
    overflow,
    overdrive,
    speed,
  });
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
