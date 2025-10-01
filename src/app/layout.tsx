import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NuqsProvider } from "@/components/providers/nuqs-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
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
  title: "Hades 2 Planner",
  description: "Hades 2 build planner to help you plan and share your builds",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased6`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <NuqsProvider>{children}</NuqsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
