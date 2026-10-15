import "../styles/common.css";
import "../styles/variables.css";
import "./globals.css";

import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import localFont from "next/font/local";

import Footer from "@/components/layout/footer/Footer";
import Navbar from "@/components/layout/navbar/Navbar";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const paperMono = localFont({
  src: "../fonts/paper-mono/webfonts/PaperMono[wght].woff2",
  variable: "--font-paper-mono",
  weight: "100 800",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tärpit - Betting tracker",
  description: "Track your bets without annoying Excel sheets",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${outfit.variable}  ${paperMono.variable}`}>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
