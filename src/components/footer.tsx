export default async function Footer() {
  "use cache";
  return (
    <footer className="border-t-[0.5px] border-stroke h-14 items-center flex">
      <div className="max-w-190 w-full px-5 mx-auto">
        <span className="text-caption text-content-muted">
          © {new Date().getFullYear()} JINSU KIM
        </span>
      </div>
    </footer>
  );
}
