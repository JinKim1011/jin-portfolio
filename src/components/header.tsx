import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b-[0.5]">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/">Jin Kim</Link>
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
