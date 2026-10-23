import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { site } from "@/content/site";
import "./globals.css";

// Inter with optical sizing: the closest open look-alike to the macOS system font
const sans = Inter({ variable: "--font-inter", subsets: ["latin"], axes: ["opsz"] });
const mono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} · ${site.role}`, template: `%s · ${site.name}` },
  description: site.tagline,
  openGraph: { title: `${site.name} · ${site.role}`, description: site.tagline, type: "website" },
  twitter: { card: "summary_large_image", title: `${site.name} · ${site.role}`, description: site.tagline },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} h-full antialiased`}>
      <body className="min-h-full font-sans">
        <Nav />
        <div className="flex min-h-[calc(100vh-4rem)] w-full flex-col px-4 sm:px-8 lg:px-14 2xl:px-20">
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
