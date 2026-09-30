import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const description = "Installable skills for coding agents.";

export const metadata: Metadata = {
  title: "skills",
  description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://skills.sam1.space"),
  openGraph: { title: "skills", description, siteName: "skills", type: "website" },
  twitter: { card: "summary_large_image", title: "skills", description },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${mono.variable} dark`}>
      <body>{children}</body>
    </html>
  );
}
