import Link from "next/link";

export default function Header() {
  return (
    <header className="border-stroke bg-surface/80 sticky top-0 z-50 overflow-hidden border-b-[0.5px] backdrop-blur-xs">
      <span className="pointer-events-none absolute inset-0 z-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_3px,var(--color-header-stripe)_3px,var(--color-header-stripe)_5px)] blur-[1px]" />
      <div
        aria-hidden="true"
        className="relative z-10 mx-auto flex h-14 w-full max-w-3xl items-center justify-between px-5"
      >
        <Link href="/" className="flex flex-col">
          <span className="text-label text-content-default">JIN KIM</span>
          <span className="text-label text-content-muted">DESIGN ENGINEER</span>
        </Link>
      </div>
    </header>
  );
}
