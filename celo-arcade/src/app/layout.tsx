import type { Metadata } from 'next';
import { Providers } from '@/components/Providers';
import './globals.css';
export const metadata: Metadata = {
  title: 'Celo Game Arcade',
  description: 'Play games, climb the leaderboard, and win USDm prizes on Celo!',
  keywords: ['celo', 'web3', 'games', 'arcade', 'minipay', 'USDm', 'crypto', 'prizes'],
  openGraph: {
    type: 'website',
    title: 'Celo Game Arcade',
    description: 'Play games, climb the leaderboard, and win USDm prizes on Celo!',
    siteName: 'Celo Game Arcade',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Celo Game Arcade',
    description: 'Play games, climb the leaderboard, and win USDm prizes on Celo!',
  },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#0f0c29" />
        <meta
          name="talentapp:project_verification"
          content="586e76a697fafb4d5a18950b62f6e4a785769582b0d692f9ba2b85e89bbde4369b84bf85df70990ae9f13c1f64fba1c361a6a9903cf3376e45627236802cc9e4"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
