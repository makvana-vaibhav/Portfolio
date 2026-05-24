import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Vaibhav Makvana | Python Backend & AI Systems Developer',
  description: 'Python Backend & AI Systems Developer. Building production AI pipelines, distributed workers, backend APIs, and cloud infrastructure. Currently at Rishvi Ltd.',
  keywords: ['Vaibhav Makvana', 'Python Backend Developer', 'AI Systems', 'Backend Engineer', 'DevOps', 'AWS', 'Docker', 'SQS', 'PostgreSQL', 'Node.js'],
  authors: [{ name: 'Vaibhav Makvana' }],
  creator: 'Vaibhav Makvana',
  metadataBase: new URL('https://vaibhavmakvana.in'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vaibhavmakvana.in',
    title: 'Vaibhav Makvana | Python Backend & AI Systems Developer',
    description: 'Building production AI pipelines, distributed workers, backend APIs, and cloud infrastructure.',
    siteName: 'Vaibhav Makvana',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vaibhav Makvana | Python Backend & AI Systems Developer',
    description: 'Building production AI pipelines, distributed workers, backend APIs, and cloud infrastructure.',
    creator: '@vaibhav_makvana',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-bg-base text-white font-body antialiased overflow-x-hidden">
        <div className="scanline" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
