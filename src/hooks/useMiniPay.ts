'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useAccount, useConnect } from 'wagmi';

type MaybeMiniPayProvider = {
  isMiniPay?: boolean;
  providers?: Array<{ isMiniPay?: boolean }>;
};

const isMiniPayProviderAvailable = () => {
  if (typeof window === 'undefined') return false;

  const provider = (window as Window & { ethereum?: MaybeMiniPayProvider }).ethereum;
  if (!provider) return false;
  if (provider.isMiniPay) return true;

  if (Array.isArray(provider.providers)) {
    return provider.providers.some((injectedProvider: { isMiniPay?: boolean }) => Boolean(injectedProvider?.isMiniPay));
  }

  return false;
};

export function useMiniPay() {
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const [isMiniPay, setIsMiniPay] = useState(false);
  const attemptedAutoConnect = useRef(false);

  const refreshDetection = useCallback(() => {
    setIsMiniPay(isMiniPayProviderAvailable());
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    refreshDetection();

    // Some injected wallets initialize shortly after page load.
    const intervalId = window.setInterval(refreshDetection, 250);
    const timeoutId = window.setTimeout(() => {
      window.clearInterval(intervalId);
    }, 5000);

    window.addEventListener('ethereum#initialized', refreshDetection as EventListener);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(timeoutId);
      window.removeEventListener('ethereum#initialized', refreshDetection as EventListener);
    };
  }, [refreshDetection]);

  useEffect(() => {
    if (!isMiniPay || isConnected || attemptedAutoConnect.current) return;

    const injectedConnector = connectors.find(
      (connector) => connector.id === 'injected' || connector.type === 'injected',
    );
    if (!injectedConnector) return;

    attemptedAutoConnect.current = true;
    connect({ connector: injectedConnector });
  }, [connect, connectors, isConnected, isMiniPay]);

  return {
    isMiniPay,
    hideConnectWalletButton: isMiniPay,
    refreshDetection,
    isAutoConnectAttempted: attemptedAutoConnect.current,
  };
}
