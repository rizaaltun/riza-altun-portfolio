import type { Metadata } from "next";
import "./globals.css";
import { assetPath } from "./asset-path";

export const metadata: Metadata = {
  title: "Rıza Altun — Art / Design / Technology",
  description:
    "Graphic design, creative development, interactive experiences and games by Rıza Altun.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: assetPath("/favicon.svg"),
    shortcut: assetPath("/favicon.svg"),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
