'use client'
import { ConnectButton, useCurrentAccount, useSignAndExecuteTransactionBlock } from '@mysten/dapp-kit';

import { TransactionBlock } from '@mysten/sui.js/transactions';

import { SUI_DECIMALS } from '@mysten/sui.js/utils';
import { useState } from 'react';
 
export default function PTB() {
	const { mutate: signTransactionBlock } = useSignAndExecuteTransactionBlock();
	const [digest, setDigest] = useState('');
	const currentAccount = useCurrentAccount();

    function callPTB() {

        const txb = new TransactionBlock();
        const [coin] = txb.splitCoins(txb.gas, [5* (10**9)])

        txb.transferObjects([coin], `0x0b14ea45f57e13df1c40425e1d2089649837e72c9920eb25f657c88c14c3e5df`);

        return txb
    
        
    }   
	return (
		<div style={{ padding: 20 }}>
			<ConnectButton />
			{currentAccount && (
				<>
					<div>
						<button
							onClick={() => {
								signTransactionBlock(
									{
										transactionBlock: callPTB(),
										chain: 'sui:devnet',
									},
									{
										onSuccess: (result) => {
											console.log('signed transaction block', result);
											setDigest(result.digest);
										},
									},
								);
							}}
						>
							Sign and execute transaction
						</button>
					</div>
					<div>digest: {digest}</div>
				</>
			)}
		</div>
	);
}