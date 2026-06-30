import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alex Rivera — Creative Developer",
  description:
    "Full-stack developer and creative technologist crafting elegant digital experiences. Specializing in React, Next.js, and modern web architecture.",
  keywords: ["developer", "portfolio", "full-stack", "React", "Next.js", "TypeScript"],
  authors: [{ name: "Alex Rivera" }],
  openGraph: {
    title: "Alex Rivera — Creative Developer",
    description:
      "Full-stack developer and creative technologist crafting elegant digital experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body className="bg-[#0f0f0f] text-white antialiased font-inter selection:bg-purple-500/30 selection:text-purple-200">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}