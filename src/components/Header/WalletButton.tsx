'use client'

import Button from "../Button"


import { ConnectButton,  SuiClientProvider, WalletProvider, useCurrentAccount, useCurrentWallet } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui.js/client';
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import input from "postcss/lib/input";
import { useEffect } from "react";

const queryClient = new QueryClient();
const networks = {
	localnet: { url: getFullnodeUrl('localnet') },
	devnet: { url: getFullnodeUrl('devnet') },
	testnet: { url: getFullnodeUrl('testnet') },
	mainnet: { url: getFullnodeUrl('mainnet') },
};	


export default function WalletButton() {


	const currentAccount = useCurrentAccount();
	const currentWallet = useCurrentWallet();


	// TODO: NEED TO BE PERSISTENT WALLET STATE ON RE-RENDER, KEEPS DC/ing on refresh
	useEffect(() => { 
		console.log(currentAccount)
	}, [currentAccount])
    return (
		<>

        	<ConnectButton />
		</>

    )
}