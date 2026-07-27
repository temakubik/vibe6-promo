import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vibe - 6, день рождения в стиле буткемпа",
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
    title: "Vibe - 6, день рождения в стиле буткемпа",
    description: "Три дня, реальное общение, новые знания. Мастер-классы от опытных коллег, темы по ИИ и вайб-кодингу, вечерняя программа.",
    siteName: "Konsol Festival",
    type: "website",
    images: [
      {
        url: "/OG.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vibe - 6, день рождения в стиле буткемпа",
    description: "Три дня, реальное общение, новые знания.",
    images: ["/OG.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
