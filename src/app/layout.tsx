import type { Metadata } from 'next';
import { Providers } from '@/components/Providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'Celo Game Arcade',
  description: 'Play classic arcade games and compete for CELO prizes! 0.5 CELO entry, daily prizes for top scorers.',
  openGraph: {
    title: 'Celo Game Arcade',
    description: 'Play classic arcade games and compete for CELO prizes!',
    images: ['https://celogamearcade.vercel.app/og-image.png'],
    url: 'https://celogamearcade.vercel.app',
    siteName: 'Celo Game Arcade',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Celo Game Arcade',
    description: 'Play classic arcade games and compete for CELO prizes!',
    images: ['https://celogamearcade.vercel.app/og-image.png'],
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': 'https://celogamearcade.vercel.app/image-3-2.png',
    'fc:frame:image:aspect_ratio': '3:2',
    'fc:frame:button:1': 'Play Now',
    'fc:frame:button:1:action': 'link',
    'fc:frame:button:1:target': 'https://celogamearcade.vercel.app',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#0f0c29" />
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://celogamearcade.vercel.app/image-3-2.png" />
        <meta property="fc:frame:image:aspect_ratio" content="3:2" />
        <meta property="fc:frame:button:1" content="Play Now" />
        <meta property="fc:frame:button:1:action" content="link" />
        <meta property="fc:frame:button:1:target" content="https://celogamearcade.vercel.app" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
