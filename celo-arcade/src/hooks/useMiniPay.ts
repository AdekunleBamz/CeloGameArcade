'use client';

import { useEffect, useRef, useState } from 'react';
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

const DETECTION_INTERVAL_MS = 250;
const DETECTION_TIMEOUT_MS = 5000;

export function useMiniPay() {
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const [isMiniPay, setIsMiniPay] = useState(false);
  const attemptedAutoConnect = useRef(false);

  useEffect(() => {
    const detectMiniPay = () => {
      setIsMiniPay(isMiniPayProviderAvailable());
    };

    detectMiniPay();

    // Some injected wallets initialize shortly after page load.
    const intervalId = window.setInterval(detectMiniPay, DETECTION_INTERVAL_MS);
    const timeoutId = window.setTimeout(() => {
      window.clearInterval(intervalId);
    }, DETECTION_TIMEOUT_MS);

    window.addEventListener('ethereum#initialized', detectMiniPay as EventListener);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(timeoutId);
      window.removeEventListener('ethereum#initialized', detectMiniPay as EventListener);
    };
  }, []);

  useEffect(() => {
    if (!isMiniPay || isConnected || attemptedAutoConnect.current) return;

    const injectedConnector = connectors.find((connector) => connector.id === 'injected');
    if (!injectedConnector) return;

    attemptedAutoConnect.current = true;
    connect({ connector: injectedConnector });
  }, [connect, connectors, isConnected, isMiniPay]);

  return {
    isMiniPay,
    hideConnectWalletButton: isMiniPay,
  };
}
