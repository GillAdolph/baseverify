import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  metadataBase: new URL('https://baseverify.vercel.app'),
  title: 'BaseVerify - Onchain Verification',
  description: 'One tap onchain verification on Base',
  openGraph: {
    title: 'BaseVerify - Onchain Verification',
    description: 'One tap onchain verification on Base',
    url: 'https://baseverify.vercel.app',
    siteName: 'BaseVerify',
    images: [
      {
        url: '/icon.png',
        width: 512,
        height: 512,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
  manifest: '/manifest.json',
  other: {
    'base:app_id': '__BASE_APP_ID__',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="base:app_id" content="__BASE_APP_ID__" />
        <link rel="canonical" href="https://baseverify.vercel.app" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
