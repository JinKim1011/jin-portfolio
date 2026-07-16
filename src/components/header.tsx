import Link from "next/link";

export default function Header() {
  return (
    <header className="border-stroke sticky top-0 z-50 border-b-[0.5px]">
      <div className="mx-auto flex h-14 w-full max-w-190 items-center justify-between px-5">
        <Link href="/" className="flex flex-col">
          <span className="text-label text-content-default">JIN KIM</span>
          <span className="text-label text-content-muted">DESIGN ENGINEER</span>
        </Link>
      </div>
    </header>
  );
}
