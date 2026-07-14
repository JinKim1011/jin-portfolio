export default async function Footer() {
  "use cache";
  return (
    <footer className="border-t-[0.5px] h-14 items-center flex">
      <span className="text-caption">
        © {new Date().getFullYear()} JINSU KIM
      </span>
    </footer>
  );
}
