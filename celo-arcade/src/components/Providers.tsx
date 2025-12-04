'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { celo, celoAlfajores } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';
import { useState, useEffect, type ReactNode } from 'react';
const config = createConfig({
  chains: [celo, celoAlfajores],
  transports: { [celo.id]: http('https://forno.celo.org'), [celoAlfajores.id]: http('https://alfajores-forno.celo-testnet.org') },
  connectors: [injected()],
});
export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    const init = async () => {
      try { const sdk = await import('@farcaster/frame-sdk').catch(() => null); if (sdk?.sdk) await sdk.sdk.actions.ready(); } catch {}
      setIsReady(true);
    };
    init();
  }, []);
  if (!isReady) return (<div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ textAlign: 'center' }}><div style={{ fontSize: '48px', marginBottom: '16px' }}>🎮</div><p style={{ color: '#00ff88', fontSize: '18px' }}>Loading...</p></div></div>);
  return (<WagmiProvider config={config}><QueryClientProvider client={queryClient}>{children}</QueryClientProvider></WagmiProvider>);
}
