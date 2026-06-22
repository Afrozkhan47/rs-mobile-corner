import type { Metadata } from 'next';
import { Inter, Space_Grotesk, Instrument_Serif } from 'next/font/google';
import SmoothScrollProvider from '@/providers/SmoothScrollProvider';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import CursorGlow from '@/components/ui/CursorGlow';
import ScrollProgress from '@/components/ui/ScrollProgress';
import './globals.css';

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

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-instrument-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'RS Mobile Corner — Premium Mobile Repair by Rahim Bhai',
  description:
    'High-precision mobile repair and restoration in Dighi, Pune. iPhone, Samsung, motherboard surgery, and water damage recovery — personally handled by Rahim Bhai Shaikh since 2021.',
  keywords: [
    'mobile repair Dighi Pune',
    'iPhone repair',
    'Samsung repair',
    'screen replacement',
    'motherboard repair',
    'water damage recovery',
    'RS Mobile Corner',
    'Rahim Bhai Shaikh',
  ],
  openGraph: {
    title: 'RS Mobile Corner — Premium Mobile Repair by Rahim Bhai',
    description:
      'Every phone deserves a second life. High-precision mobile repair in Dighi, Pune — personally handled by Rahim Bhai Shaikh.',
    type: 'website',
  },
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
      className={`${inter.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable}`}
    >
      <body>
        {/* Animated film grain texture */}
        <div className="noise-overlay" aria-hidden="true" />

        {/* Ambient floating light orbs */}
        <div className="ambient-light" aria-hidden="true">
          <div className="ambient-orb ambient-orb--primary" />
          <div className="ambient-orb ambient-orb--secondary" />
          <div className="ambient-orb ambient-orb--tertiary" />
        </div>

        {/* Subtle dot grid texture */}
        <div className="grid-texture" aria-hidden="true" />

        {/* Cinematic vignette */}
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
