import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { Providers } from "./providers";
import { Inter } from "next/font/google";
import { getMessages, setRequestLocale } from "next-intl/server";
import "./globals.css";
import { ScrollbarController } from "../components/ui/scrollbar-controller";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Nkengbeza Derick - Full-Stack Developer",
  description:
    "Portfolio of Nkengbeza Derick, a full-stack developer specializing in React, Node.js, and modern web technologies.",
  keywords: [
    "Full-Stack Developer",
    "React Developer",
    "Node.js",
    "Web Developer Cameroon",
    "Buea Developer",
  ],
  authors: [{ name: "Nkengbeza Derick" }],
  creator: "Nkengbeza Derick",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nkengbezaderick.com",
    siteName: "Nkengbeza Derick Portfolio",
    title: "Nkengbeza Derick - Full-Stack Developer",
    description:
      "Portfolio of Nkengbeza Derick, a full-stack developer specializing in React, Node.js, and modern web technologies.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nkengbeza Derick - Full-Stack Developer",
    description:
      "Portfolio of Nkengbeza Derick, a full-stack developer specializing in React, Node.js, and modern web technologies.",
    creator: "@nkengderick",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

type Params = Promise<{ locale: string }>;

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }];
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: Params;
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <ScrollbarController />
            {children}
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
