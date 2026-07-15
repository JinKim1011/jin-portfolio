import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import { AppProviders } from "./app-providers";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jin Kim — Design Engineer",
  description:
    "Design engineering work, projects, design systems, and case studies.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const rootClasses = "root layout-root antialiased";

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${ibmPlexMono.variable}`}
    >
      <body className="bg-surface font-mono antialiased">
        <AppProviders>
          <div className={rootClasses}>
            <Header />
            <main className="mx-auto w-full max-w-190 px-5">{children}</main>
            <Footer />
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
