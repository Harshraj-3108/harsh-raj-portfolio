import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import AmbientBackground from "@/components/AmbientBackground";
import IntroLoader from "@/components/IntroLoader";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Harsh Raj | Full Stack Developer",
  description:
    "Portfolio of Harsh Raj, a Computer Science student and aspiring software developer building thoughtful web experiences and practical software solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${manrope.variable} antialiased`}>
        <ScrollToTop />
        <AmbientBackground />
        <CustomCursor />
        {children}
        <IntroLoader />
      </body>
    </html>
  );
}
