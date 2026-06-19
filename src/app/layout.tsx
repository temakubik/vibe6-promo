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
  title: "KONSOL FESTIVAL / VIBE.6 — Три дня. Команды. Реальные проекты.",
  description:
    "KONSOL FESTIVAL — корпоратив в формате буткемпа. ~80 участников, 10–12 команд, мастер-классы, демо, костёр и живая музыка. Три дня, 2026.",
  keywords: [
    "Konsol Festival",
    "Vibe.6",
    "хакатон",
    "корпоратив",
    "фестиваль",
    "команды",
    "мастер-классы",
    "bootcamp",
  ],
  authors: [{ name: "Konsol Festival" }],
  openGraph: {
    title: "KONSOL FESTIVAL / VIBE.6",
    description: "Три дня. Команды. Реальные проекты. Корпоратив в формате буткемпа с мастер-классами и вечерним костром.",
    siteName: "Konsol Festival",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KONSOL FESTIVAL / VIBE.6",
    description: "Три дня. Команды. Реальные проекты.",
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
