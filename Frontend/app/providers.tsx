'use client';

import * as React from 'react';
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  mainnet,
  goerli,
  polygon,
  polygonMumbai,
  filecoin,
  filecoinCalibration,
  arbitrum,
  arbitrumGoerli,
  arbitrumNova,
  base,
  baseGoerli,
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { alchemyProvider } from 'wagmi/providers/alchemy'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    polygon,
    polygonMumbai,
    filecoin,
    filecoinCalibration,
    arbitrum,
    arbitrumGoerli,
    arbitrumNova,
    base,
    baseGoerli,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : []),
  ],
  [ alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || ''}),
    publicProvider()
  ]
);

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "";

const { wallets } = getDefaultWallets({
  appName: 'Teach AI',
  projectId,
  chains,
});

const demoAppInfo = {
  appName: 'Teach AI',
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} appInfo={demoAppInfo}>
        {mounted && children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}