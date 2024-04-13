"use client";
import { WagmiConfig, createConfig, mainnet } from "wagmi";
import { createPublicClient, http } from "viem";

export default function Template({ children }) {
  const config = createConfig({
    autoConnect: true,
    publicClient: createPublicClient({
      chain: mainnet,
      transport: http(),
    }),
  });

  return (
    <>
      <WagmiConfig config={config}>{children}</WagmiConfig>
    </>
  );
}