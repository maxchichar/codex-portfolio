import type { Metadata } from 'next';
import { JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import './globals.css';

const space = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space'
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains'
});

export const metadata: Metadata = {
  title: 'MAXCHICHAR Spatial Portfolio',
  description: 'Living 5D portfolio world built with Next.js + React Three Fiber.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${space.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
