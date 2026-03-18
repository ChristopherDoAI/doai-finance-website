import type { Metadata } from "next";
import { Syne, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import ChatWidget from "@/components/ChatWidget";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-ibm-plex",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AutoFlow AI — Stop Missing Calls. Start Winning More Work.",
  description:
    "AI automation that answers your calls, qualifies your leads, and books your diary — 24 hours a day, 7 days a week. Built for business owners who are too busy to miss a single opportunity.",
  keywords: [
    "AI automation",
    "voice agent",
    "AI chatbot",
    "lead generation",
    "missed calls",
    "business automation",
    "AI phone answering",
  ],
  openGraph: {
    title: "AutoFlow AI — Stop Missing Calls. Start Winning More Work.",
    description:
      "AI automation that answers your calls, qualifies your leads, and books your diary 24/7.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${ibmPlexSans.variable}`}>
      <body className="font-body bg-base text-text-primary antialiased">
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
