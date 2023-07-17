import "./globals.css";
import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-family-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-family-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NB!",
  description:
    "Welcome to my digital flat (I'm renting it). Please take off your cyber shoes before entering. Thank you",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${inter.variable}`}>
        <header className="wrapper">
          <h1>nicklasbekkevold.com</h1>
        </header>
        {children}
        <footer className="wrapper flow">&copy; 2023 Nicklas Bekkevold</footer>
      </body>
    </html>
  );
}
