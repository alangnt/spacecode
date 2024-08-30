import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SpaceCode",
  description: "SpaceCode - Redefining the Future of Code in the Space Industry",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white flex flex-col min-h-screen`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
