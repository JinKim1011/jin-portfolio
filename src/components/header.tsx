import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b-[0.5px] border-stroke">
      <div className="flex h-14 items-center justify-between max-w-190 w-full px-5 mx-auto">
        <Link href="/" className="flex flex-col">
          <span className="text-label text-content-default">JIN KIM</span>
          <span className="text-label text-content-muted">DESIGN ENGINEER</span>
        </Link>
      </div>
    </header>
  );
}
