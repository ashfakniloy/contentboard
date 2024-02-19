import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import { SessionProvider } from "@/components/providers/session";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { BASE_URL } from "@/config";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Contentboard",
    template: `%s | Contentboard`,
  },
  description: "Write blogs and manage contact for your website.",
  openGraph: {
    images: {
      url: "/images/contentboard-cover.webp",
      width: 1200,
      height: 630,
      alt: "contentboard",
    },
    title: {
      default: "Contentboard",
      template: `%s | Contentboard`,
    },
    description: "Write blogs and manage contact for your website.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`text-black dark:text-gray-200 ${inter.className} ${manrope.variable}`}
      >
        <ThemeProvider>
          <SessionProvider>{children}</SessionProvider>
        </ThemeProvider>
        <Toaster />

        <Analytics />
      </body>
    </html>
  );
}
