import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KONSOL / VIBE-6 — Три дня, реальное общение, новые знания.",
  description:
    "VIBE-6 — трёхдневная встреча с мастер-классами от опытных коллег, темами по вайб-кодингу и ИИ, вечерней программой и живым общением. Les Art Resort, 2026.",
  icons: {
    icon: "/icon.svg",
  },
  keywords: [
    "Konsol",
    "Vibe-6",
    "корпоратив",
    "мастер-классы",
    "ИИ",
    "вайб-кодинг",
  ],
  authors: [{ name: "Konsol Festival" }],
  openGraph: {
    title: "KONSOL / VIBE-6",
    description: "Три дня, реальное общение, новые знания. Мастер-классы от опытных коллег, темы по ИИ и вайб-кодингу, вечерняя программа.",
    siteName: "Konsol Festival",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KONSOL / VIBE-6",
    description: "Три дня, реальное общение, новые знания.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrains.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
