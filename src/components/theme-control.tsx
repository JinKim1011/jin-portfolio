"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import SegmentedControl from "./ui/segmented-control";
import { LaptopIcon, MoonIcon, SunIcon } from "./icons";

type ThemeMode = "light" | "dark" | "system";

export default function ThemeControl() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const options = [
    { value: "system", iconName: LaptopIcon },
    { value: "light", iconName: SunIcon },
    { value: "dark", iconName: MoonIcon },
  ];

  const handleThemeChange = (selected: string) => {
    if (selected === "light" || selected === "dark" || selected === "system") {
      setTheme(selected as ThemeMode);
    }
  };

  return (
    <SegmentedControl
      options={options}
      onChange={handleThemeChange}
      value={theme ?? "system"}
      ariaLabel="theme-control"
    />
  );
}
