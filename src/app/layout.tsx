import type { Metadata, Viewport } from "next";
import {
  Inter,
  Space_Grotesk,
  Instrument_Serif,
  Cormorant_Garamond,
} from "next/font/google";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import CursorGlow from "@/components/ui/CursorGlow";
import ScrollProgress from "@/components/ui/ScrollProgress";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rsmobilecorner.vercel.app"), // Change if using another domain

  verification: {

    google: "qledBtheGekXwGQ3mpuFlpVNRDtiWWnSqLG0hLyVaUc",

  },
  title: {
    default: "RS Mobile Corner",
    template: "%s | RS Mobile Corner",
  },

  description:
    "Every phone deserves a second life. Premium mobile repair, restoration, and accessories in Dighi, Pune — personally handled by Rahim Bhai since 2021.",

  applicationName: "RS Mobile Corner",

  keywords: [
    "RS Mobile Corner",
    "Rahim Bhai",
    "Mobile Repair",
    "iPhone Repair",
    "Samsung Repair",
    "Motherboard Repair",
    "Screen Replacement",
    "Battery Replacement",
    "Water Damage Recovery",
    "Mobile Accessories",
    "Dighi",
    "Pune",
  ],

  authors: [
    {
      name: "Rahim Bhai",
    },
  ],

  creator: "RS Mobile Corner",

  publisher: "RS Mobile Corner",

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://rsmobilecorner.in",

    siteName: "RS Mobile Corner",

    title: "RS Mobile Corner",

    description:
      "Every phone deserves a second life. Premium mobile repair and restoration by Rahim Bhai.",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "RS Mobile Corner",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "RS Mobile Corner",

    description:
      "Every phone deserves a second life.",

    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#F8F5F0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable} ${cormorant.variable}`}
    >
      <body>
        {/* Film grain */}
        <GoogleAnalytics />
        <div className="noise-overlay" aria-hidden="true" />

        {/* Ambient lighting */}
        <div className="ambient-light" aria-hidden="true">
          <div className="ambient-orb ambient-orb--primary" />
          <div className="ambient-orb ambient-orb--secondary" />
          <div className="ambient-orb ambient-orb--tertiary" />
        </div>

        {/* Background texture */}
        <div className="grid-texture" aria-hidden="true" />

        {/* Vignette */}
        <div className="vignette" aria-hidden="true" />

        <SmoothScrollProvider>
          <ScrollProgress />
          <CursorGlow />
          <Navigation />

          <main id="main-content">{children}</main>

          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}