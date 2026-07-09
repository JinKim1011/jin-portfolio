export default async function Footer() {
  "use cache";
  return (
    <footer className="border-t-[0.5px]">
      <div className="container flex h-14 items-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Jin Kim
      </div>
    </footer>
  );
}
