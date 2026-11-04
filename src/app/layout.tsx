import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";

// Anton: free condensed display face, the open look-alike of the paid Oblisk typeface in the reference.
const anton = Anton({ variable: "--font-anton", subsets: ["latin"], weight: "400" });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://amankumarchhari.vercel.app"),
  title: { default: "Aman Kumar Chhari · Design Engineer & Applied AI", template: "%s · Aman Kumar Chhari" },
  description: "Design Engineer and applied AI engineer: AI products built end to end with guardrails, then told as a brand story. Selected works 2026.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
