'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, createConfig, http, useAccount, useChainId, useSwitchChain } from 'wagmi';
import { celo } from 'wagmi/chains';
import { farcasterMiniApp } from '@farcaster/miniapp-wagmi-connector';
import { injected, walletConnect } from 'wagmi/connectors';
import { useState, useEffect, type ReactNode } from 'react';
import { CELO_MAINNET_CHAIN_ID, DEFAULT_CELO_RPC_URL, CELO_EXPLORER_URL } from 'celo-arcade-sdk';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '';

const config = createConfig({
  chains: [celo],
  transports: {
    [celo.id]: http(DEFAULT_CELO_RPC_URL),
  },
  connectors: [
    farcasterMiniApp(),
    injected(),
    walletConnect({ 
      projectId,
      metadata: {
        name: 'Celo Game Arcade',
        description: 'Play games and win USDm!',
        url: typeof window !== 'undefined' ? window.location.origin : '',
        icons: ['https://celo.org/favicon.ico'],
      },
    }),
  ],
});

const CELO_MAINNET_ID = 42220;

function NetworkGuard({ children }: { children: ReactNode }) {
  const { isConnected, address } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const [wrongNetwork, setWrongNetwork] = useState(false);
  const [currentChainName, setCurrentChainName] = useState('Unknown');

  useEffect(() => {
    if (!isConnected || !address) {
      setWrongNetwork(false);
      return;
    }
    const isOnCeloMainnet = chainId === CELO_MAINNET_ID;
    if (!isOnCeloMainnet) {
      setWrongNetwork(true);
      const chainNames: { [key: number]: string } = { 1: 'Ethereum', 137: 'Polygon', 56: 'BNB Chain', 8453: 'Base', 42161: 'Arbitrum', 10: 'Optimism', 44787: 'Celo Alfajores' };
      setCurrentChainName(chainNames[chainId] || `Chain ${chainId}`);
    } else {
      setWrongNetwork(false);
    }
  }, [isConnected, address, chainId]);

  const handleSwitchNetwork = async () => {
    try {
      switchChain({ chainId: CELO_MAINNET_ID });
    } catch {
      try {
        await window.ethereum?.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: '0xA4EC',
            chainName: 'Celo',
            nativeCurrency: { name: 'CELO', symbol: 'CELO', decimals: 18 },
            rpcUrls: ['https://forno.celo.org'],
            blockExplorerUrls: ['https://celoscan.io'],
          }],
        });
      } catch (e) {
        console.error('Failed to add Celo:', e);
      }
    }
  };

  if (isConnected && wrongNetwork) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '30px', maxWidth: '360px', width: '100%', textAlign: 'center', border: '1px solid rgba(255,215,0,0.3)' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
          <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: '700', margin: '0 0 10px' }}>Wrong Network</h2>
          <p style={{ color: '#888', fontSize: '14px', margin: '0 0 8px' }}>Current: <strong style={{ color: '#fff' }}>{currentChainName}</strong></p>
          <p style={{ color: '#888', fontSize: '14px', margin: '0 0 20px' }}>Switch to <strong style={{ color: '#00ff88' }}>Celo Mainnet</strong> to continue.</p>
          <button onClick={handleSwitchNetwork} style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #00ff88, #00aa55)', border: 'none', borderRadius: '12px', color: '#000', fontSize: '16px', fontWeight: '700', cursor: 'pointer' }}>🔄 Switch to Celo Mainnet</button>
        </div>
      </div>
    );
  }
  return <>{children}</>;
}

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const { sdk } = await import('@farcaster/miniapp-sdk');
        await sdk.actions.ready();
        console.log('Farcaster SDK ready');
      } catch (e) {
        console.log('Not in Farcaster context:', e);
      }
      setIsReady(true);
    };
    init();
  }, []);

  if (!isReady) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎮</div>
          <p style={{ color: '#00ff88', fontSize: '18px' }}>Loading Celo Arcade...</p>
        </div>
      </div>
    );
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <NetworkGuard>{children}</NetworkGuard>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
