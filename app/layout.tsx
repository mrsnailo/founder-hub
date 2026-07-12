import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shahid Parvez — Founder Log",
  description:
    "Building practical software tools, one product at a time. Subly Store, Inventory Pro, ClawMate — and backend systems at TubeOnAI.",
  keywords: [
    "Shahid Parvez",
    "founder",
    "software",
    "Subly Store",
    "Inventory Pro",
    "ClawMate",
    "Next.js",
    "indie hacker",
    "TubeOnAI",
  ],
  authors: [{ name: "Shahid Parvez" }],
  openGraph: {
    title: "Shahid Parvez — Founder Log",
    description:
      "Building practical software tools, one product at a time.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Shahid Parvez — Founder Log",
    description: "Building practical software tools, one product at a time.",
    creator: "@mrsnailo",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect for Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
