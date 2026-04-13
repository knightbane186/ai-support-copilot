import type { Metadata } from "next";
import { IBM_Plex_Sans, Fraunces } from "next/font/google";

import { Nav } from "@/components/Nav";

import "./globals.css";

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"]
});

const serif = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["500", "600", "700"]
});

export const metadata: Metadata = {
  title: "AI Support Copilot",
  description: "Internal knowledge assistant for grounded answers with citations."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${serif.variable}`}>
        <div className="shell">
          <Nav />
          {children}
        </div>
      </body>
    </html>
  );
}

