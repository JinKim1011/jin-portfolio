import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b-[0.5px]">
      <div className="flex h-14 items-center justify-between max-w-190 w-full px-5 mx-auto">
        <Link href="/" className="flex flex-col">
          <span className="text-label">JIN KIM</span>
          <span className="text-label">DESIGN ENGINEER</span>
        </Link>
        <a
          href="mailto:jinsu.kim1011@gmail.com"
          className="text-muted-foreground hover:text-foreground"
        >
          Contact
        </a>
      </div>
    </header>
  );
}
