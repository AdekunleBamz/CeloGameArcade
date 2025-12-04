import type { Metadata } from 'next';
import { Providers } from '@/components/Providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'Celo Game Arcade',
  description: 'Play games and win CELO!',
  other: {
    'fc:frame': 'vNext',
    'fc:frame:name': 'Celo Game Arcade',
    'fc:frame:icon': 'https://celogamearcade.vercel.app/icon.png',
    'fc:frame:image': 'https://celogamearcade.vercel.app/splash.png',
    'fc:frame:manifest': 'https://celogamearcade.vercel.app/.well-known/farcaster.json',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#0f0c29" />
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:name" content="Celo Game Arcade" />
        <meta property="fc:frame:icon" content="https://celogamearcade.vercel.app/icon.png" />
        <meta property="fc:frame:image" content="https://celogamearcade.vercel.app/splash.png" />
        <meta property="fc:frame:manifest" content="https://celogamearcade.vercel.app/.well-known/farcaster.json" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
