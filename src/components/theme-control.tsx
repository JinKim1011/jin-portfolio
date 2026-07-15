"use client";

import { cn } from "@/lib/util";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeControl() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const options = ["system", "light", "dark"] as const;

  return (
    <div className="flex w-fit gap-1" role="radiogroup" aria-label="theme">
      {options.map((option) => {
        const isActive = theme === option;
        return (
          <button
            key={option}
            role="radio"
            onClick={() => setTheme(option)}
            aria-checked={isActive}
            className={cn(
              "text-label-small",
              isActive
                ? "bg-surface-interactive-active text-content-interactive-active"
                : "bg-surface-interactive text-content-interactive",
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
