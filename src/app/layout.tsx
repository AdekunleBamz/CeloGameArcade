import type { Metadata } from 'next';
import { Providers } from '@/components/Providers';
import './globals.css';
export const metadata: Metadata = { title: 'Celo Game Arcade', description: 'Play games and win CELO!' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><head><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" /><meta name="theme-color" content="#0f0c29" /></head><body><Providers>{children}</Providers></body></html>);
}
