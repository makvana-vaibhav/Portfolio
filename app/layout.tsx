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
  title: 'Vaibhav Makvana | AI Backend & Infrastructure Engineer',
  description: 'Engineering production AI systems, distributed backends, and scalable infrastructure. Based in India.',
  keywords: ['AI Engineer', 'Backend Engineer', 'Infrastructure', 'Python', 'Node.js', 'Full Stack', 'Vaibhav Makvana'],
  authors: [{ name: 'Vaibhav Makvana' }],
  creator: 'Vaibhav Makvana',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vaibhavmakvana.in',
    title: 'Vaibhav Makvana | AI Backend & Infrastructure Engineer',
    description: 'Engineering production AI systems, distributed backends, and scalable infrastructure.',
    siteName: 'Vaibhav Makvana',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vaibhav Makvana | AI Backend & Infrastructure Engineer',
    description: 'Engineering production AI systems, distributed backends, and scalable infrastructure.',
  },
  robots: {
    index: true,
    follow: true,
  },
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
