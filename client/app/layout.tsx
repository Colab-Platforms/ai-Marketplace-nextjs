import type { Metadata } from "next";
import { Inter, Space_Grotesk, Syne } from 'next/font/google';
import Script from "next/script";
import "./globals.css";
import PageLoader from "@/components/common/PageLoader";
import RootChrome from "@/components/common/RootChrome";
import Providers from './providers';

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

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '700', '800'],
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
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${syne.variable} scroll-smooth`}>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
      </head>
      <body className="font-body bg-white text-avatar-dark antialiased">
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1593452955528348');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img height="1" width="1" style={{display: "none"}}
            src="https://www.facebook.com/tr?id=1593452955528348&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <Providers>
          <PageLoader />
          <RootChrome>
            {children}
          </RootChrome>
        </Providers>
      </body>
    </html>
  );
}
