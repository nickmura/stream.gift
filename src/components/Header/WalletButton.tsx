'use client'

import Button from "../Button"


import { ConnectButton,  SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui.js/client';
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import input from "postcss/lib/input";

const queryClient = new QueryClient();
const networks = {
	localnet: { url: getFullnodeUrl('localnet') },
	devnet: { url: getFullnodeUrl('devnet') },
	testnet: { url: getFullnodeUrl('testnet') },
	mainnet: { url: getFullnodeUrl('mainnet') },
};

async function callPTB() {

	const txb = new TransactionBlock();
	const [coin] = txb.splitCoins(txb.gas, [txb.pure(100), txb.pure(200)])
	txb.transferObjects([coin], txb.pure(`0x792423f7950d75fa476fd618bc0c647ce1183ceab19059dd00bdf5690e01db78`));
	let s = txb.serialize()

}   

export default function WalletButton() {
    return (
		<>
			<button onClick={callPTB} className=''>test</button>
        	<ConnectButton />
		</>

    )
}