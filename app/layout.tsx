import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Manrope } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-display' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio-sepia-phi-42.vercel.app'),
  title: 'MDB | Matondo Domingos Bunga',
  description: 'Full Stack Developer com foco em backend, mobile com Flutter e product engineering.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'MDB | Matondo Domingos Bunga',
    description: 'Full Stack Developer com foco em backend, mobile com Flutter e product engineering.',
    type: 'website',
    images: ['/og-image.svg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-pt" suppressHydrationWarning>
      <body className={`${inter.variable} ${manrope.variable} ${jetbrainsMono.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}