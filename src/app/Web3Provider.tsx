'use client'

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { PropsWithChildren, useEffect, useState } from "react";
import { WagmiProvider } from "wagmi";
import { arbitrum, mainnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string

// 2. Create wagmiConfig
const metadata = {
    name: "Web3Modal",
    description: "Web3Modal Example",
    url: "https://web3modal.com",
    icons: ["https://avatars.githubusercontent.com/u/37784886"],
    verifyUrl: '', // Should be optional  
};

const chains = [mainnet, arbitrum] as any;
const wagmiConfig = defaultWagmiConfig({
    chains,
    projectId,
    metadata,
});

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains });

export function Web3Provider(props: PropsWithChildren) {
    const [ready, setReady] = useState(false)

    useEffect(() => {
        setReady(true)
    }, [])

    return (
        <>
            {ready && (
                <WagmiProvider config={wagmiConfig}>
                    <QueryClientProvider client={queryClient}>
                        {props.children}
                    </QueryClientProvider>
                </WagmiProvider>
            )}
        </>
    );
}
