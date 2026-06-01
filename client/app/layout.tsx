import type { Metadata } from "next";
import { Inter, Space_Grotesk } from 'next/font/google';
import "./globals.css";
import PageLoader from "@/components/common/PageLoader";
import ScrollProgress from "@/components/common/ScrollProgress";
import AnnouncementBar from "@/components/common/AnnouncementBar";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "AVATAR — The Operating System for the AI Era",
  description: "From AI education and automation to enterprise infrastructure — Avatar is the centralized platform powering AI transformation for individuals and businesses worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth`}>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
      </head>
      <body className="font-body bg-white text-avatar-dark antialiased">
        <PageLoader />
        <ScrollProgress />
        <AnnouncementBar />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
