import Link from "next/link";
import ScrambleText from "./scramble-text";

export default function Header() {
  return (
    <header className="border-stroke bg-surface/80 sticky top-0 z-50 overflow-hidden border-b-[0.5px] backdrop-blur-xs">
      <span className="pointer-events-none absolute inset-0 z-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,var(--color-header-stripe)_3px,var(--color-header-stripe)_5px)] blur-[1px]" />
      <div
        aria-hidden="true"
        className="relative z-10 mx-auto flex h-14 w-full max-w-3xl items-center justify-between px-5"
      >
        <Link href="/" className="flex flex-col">
          <ScrambleText
            className="text-label text-content-default"
            text="JIN KIM"
            overflow={true}
            playOnMount={true}
            isReplay={true}
          />
          <ScrambleText
            className="text-label text-content-muted"
            text="DESIGN ENGINEER"
            overflow={true}
            playOnMount={true}
            isReplay={false}
          />
        </Link>
      </div>
    </header>
  );
}
