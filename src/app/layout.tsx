'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Header from "@/components/Header";
import Modals from "@/components/Modal/Modals";

import "./globals.css";
import '@mysten/dapp-kit/dist/index.css';

const inter = Inter({ subsets: ["latin"] });


import { SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui.js/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();


const networks = {
	localnet: { url: getFullnodeUrl('localnet') },
	devnet: { url: getFullnodeUrl('devnet') },
	testnet: { url: getFullnodeUrl('testnet') },
	mainnet: { url: getFullnodeUrl('mainnet') },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <QueryClientProvider client={queryClient}>
                    <SuiClientProvider networks={networks} defaultNetwork="devnet">
                        <WalletProvider>
                            <Header />
                            <Modals />
                            <main>{children}</main>
                        </WalletProvider>
                    </SuiClientProvider>
                </QueryClientProvider>
            </body>
        </html>
    );
}
