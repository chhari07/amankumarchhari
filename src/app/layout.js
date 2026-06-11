import { JetBrains_Mono } from 'next/font/google';
import './globals.css';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['300', '400', '500', '700'],
});

export const metadata = {
  title: 'Aman Kumar Chhari | Portfolio Studio',
  description: 'Agentic AI & Full Stack Developer Environment',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${jetbrainsMono.variable} font-mono bg-[#121212] text-[#e0e0e0] antialiased`}>
        {children}
      </body>
    </html>
  );
}