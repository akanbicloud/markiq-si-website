import type { Metadata, Viewport } from 'next';
import { spaceGrotesk, ibmPlexSans, ibmPlexMono } from './fonts';
import '@/styles/globals.css';
import MotionProvider from '@/components/MotionProvider';

export const metadata: Metadata = {
  title: 'MarkIQ SI — Market Intelligence · Super Intelligence',
  description:
    'Know what moves the market. Learn to trade it. MarkIQ SI watches economic releases, central banks and world news, explains every move in plain words, and teaches you to build your own trading tools.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/brand/markiq-logo.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: '/brand/markiq-logo.svg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
    >
      <body
        style={{
          backgroundColor: 'var(--bg)',
          color: 'var(--text)',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <MotionProvider>
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
