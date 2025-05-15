import { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";
import ChatwootWidget from "@/components/widgets/chatwoot-widget/ChatwootWidget";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

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

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ChatwootWidget />
      <NextTopLoader
        shadow="0 0 10px #4743c9,0 0 5px #4743c3"
        color="#2659b1"
        height={4}
      />
      <Toaster position="top-center" richColors />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
