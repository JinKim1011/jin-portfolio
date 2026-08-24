import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type ButtonProps = {
  label: string;
  href?: string;
  className?: string;
};

const buttonClasses = [
  "group cursor-pointer",
  "flex items-center justify-center overflow-hidden relative",
  "h-7 w-14",
  "border-[0.5px]",
  "bg-surface border-stroke-interactive",
  "hover:bg-surface-interactive-hoverWeak hover:border-stroke-interactive-hover",
  "press-effect-scale",
].join(" ");

export default function Button({ label, href, className }: ButtonProps) {
  const content = (
    <span className="text-label-small text-content-interactive">{label}</span>
  );
  const classes = cn(buttonClasses, className);

  if (href) {
    return (
      <Link href={href} aria-label={label} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" aria-label={label} className={classes}>
      {content}
    </button>
  );
}
