'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, createConfig, http, useAccount, useSwitchChain } from 'wagmi';
import { celo, celoAlfajores } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';
import { useState, useEffect, type ReactNode } from 'react';

const config = createConfig({
  chains: [celo, celoAlfajores],
  transports: {
    [celo.id]: http('https://forno.celo.org'),
    [celoAlfajores.id]: http('https://alfajores-forno.celo-testnet.org'),
  },
  connectors: [injected()],
});

function NetworkGuard({ children }: { children: ReactNode }) {
  const { isConnected, chain, isConnecting } = useAccount();
  const { switchChain } = useSwitchChain();
  const [showNetworkPrompt, setShowNetworkPrompt] = useState(false);

  useEffect(() => {
    // Only check network AFTER wallet is connected and chain is detected
    if (!isConnected || isConnecting || !chain) {
      setShowNetworkPrompt(false);
      return;
    }

    // Check if on Celo mainnet (42220) or Alfajores (44787)
    const isOnCelo = chain.id === celo.id || chain.id === celoAlfajores.id;
    setShowNetworkPrompt(!isOnCelo);
  }, [isConnected, isConnecting, chain]);

  // Show switch network prompt ONLY if connected AND on wrong network
  if (isConnected && showNetworkPrompt && chain) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '20px',
          padding: '30px',
          maxWidth: '360px',
          width: '100%',
          textAlign: 'center',
          border: '1px solid rgba(255,215,0,0.3)',
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
          <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: '700', margin: '0 0 10px' }}>
            Wrong Network
          </h2>
          <p style={{ color: '#888', fontSize: '14px', margin: '0 0 8px' }}>
            You're on <strong style={{ color: '#f44' }}>{chain.name}</strong>
          </p>
          <p style={{ color: '#888', fontSize: '14px', margin: '0 0 20px' }}>
            Please switch to <strong style={{ color: '#00ff88' }}>Celo</strong> to play!
          </p>
          <button
            onClick={() => switchChain({ chainId: celo.id })}
            style={{
              width: '100%',
              padding: '14px',
              background: 'linear-gradient(135deg, #00ff88, #00aa55)',
              border: 'none',
              borderRadius: '12px',
              color: '#000',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer',
              marginBottom: '10px',
            }}
          >
            🔄 Switch to Celo
          </button>
          <button
            onClick={async () => {
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
                console.error(e);
              }
            }}
            style={{
              width: '100%',
              padding: '12px',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            ➕ Add Celo Network
          </button>
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
        const sdk = await import('@farcaster/miniapp-sdk').catch(() => null);
        if (sdk?.sdk) {
          await sdk.sdk.actions.ready();
        }
      } catch (e) {
        console.log('Farcaster SDK not available');
      }
      setIsReady(true);
    };
    init();
  }, []);

  if (!isReady) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
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