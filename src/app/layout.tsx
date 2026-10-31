import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AS-Salam Cosmetics | Premium skincare & beauty essentials",
    template: "%s | AS-Salam Cosmetics",
  },
  description:
    "Premium skincare and beauty essentials rooted in nourishing rituals and modern self-care.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "AS-Salam Cosmetics",
    description:
      "Premium skincare and beauty essentials rooted in nourishing rituals.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#F8FAF9] text-slate-900">{children}</body>
    </html>
  );
}
