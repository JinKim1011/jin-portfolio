import ThemeControl from "./theme-control";

export default async function Footer() {
  "use cache";
  return (
    <footer className="border-stroke flex h-14 items-center border-t-[0.5px]">
      <div className="mx-auto flex w-full max-w-3xl justify-between px-5">
        <span className="text-caption text-content-muted">
          © {new Date().getFullYear()} JINSU KIM
        </span>
        <ThemeControl />
      </div>
    </footer>
  );
}
