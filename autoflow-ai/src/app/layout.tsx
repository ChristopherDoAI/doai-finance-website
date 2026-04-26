import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import ChatWidget from "@/components/ChatWidget";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DOAI Systems",
  description:
    "AI automation for UK SMEs and sole traders. Custom CRM systems, AI voice agents, chatbots, and process automation.",
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
    title: "DOAI Systems",
    description:
      "AI automation for UK SMEs and sole traders. Custom CRM systems, AI voice agents, chatbots, and process automation.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="font-body bg-base text-text-primary antialiased">
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
