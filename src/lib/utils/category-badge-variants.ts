import { cva } from "class-variance-authority";

const categoryVariantMap = {
  PROJECT: "project",
  DESIGNSYSTEM: "designSystem",
  CASESTUDY: "caseStudy",
  ESSAY: "essay",
} as const;

export const badgeColor = cva("", {
  variants: {
    tag: {
      project: "text-[var(--base-cyan-500)]",
      designSystem: "text-[var(--base-teal-500)]",
      caseStudy: "text-[var(--base-orange-500)]",
      essay: "text-[var(--base-pink-500)]",
      none: "text-[var(--base-neutral-400)]",
    },
  },
  defaultVariants: {
    tag: "none",
  },
});

export function getCategoryVariant(category: string) {
  const normalized = category.replace(/\s+/g, "");

  return normalized in categoryVariantMap
    ? categoryVariantMap[normalized as keyof typeof categoryVariantMap]
    : "none";
}
