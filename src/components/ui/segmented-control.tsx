"use client";

import type { Icon } from "./icon";
import { cn } from "@/lib/util";

type SegmentOption = {
  value: string;
  iconName: Icon;
};

type SegmentedControlProps = {
  options: SegmentOption[];
  value: string;
  onChange: (selected: string) => void;
  className?: string;
};

export default function SegmentedControl({
  options,
  value,
  onChange,
  className,
}: SegmentedControlProps) {
  return (
    <div
      className={cn("-mx-1.5 flex w-fit gap-0", className)}
      role="radiogroup"
    >
      {options.map((option) => {
        const isActive = option.value === value;
        const IconComponent = option.iconName;

        return (
          <button
            key={option.value}
            role="radio"
            onClick={() => onChange(option.value)}
            aria-checked={isActive}
            aria-label={option.value}
            className={cn(
              "h-fit w-fit cursor-pointer p-1.5",
              "bg-surface-interactive hover:bg-surface-interactive-hover active:bg-surface-interactive-active h-fit w-fit cursor-pointer p-1.5",
              "transition-transform duration-75 active:translate-y-0.5 active:scale-[0.98]",
              isActive
                ? "text-content-interactive-active"
                : "text-content-interactive-muted",
            )}
          >
            <IconComponent aria-hidden className="size-3.5" />
          </button>
        );
      })}
    </div>
  );
}
