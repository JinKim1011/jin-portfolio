import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Jin Kim — Design Engineer",
  description:
    "Design engineering work, projects, design systems, and case studies.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const rootClasses =
    "root layout-root mx-auto max-w-190 w-full px-5 antialiased";

  return (
    <html lang="en">
      <body className="antialiased">
        <div className={rootClasses}>
          <Header />
          <main className="container">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
