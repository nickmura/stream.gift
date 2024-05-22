'use client'
import { useState } from 'react';
import { useCurrentAccount, useSignAndExecuteTransactionBlock } from '@mysten/dapp-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';

import { SUI_DECIMALS } from '@mysten/sui.js/utils';
import { IntentScope, messageWithIntent } from '@mysten/sui.js/cryptography';


 
export default function DonateButton({ recipient, amount, message }: {recipient: string, amount: number, message: string}) {
	const { mutate: signTransactionBlock } = useSignAndExecuteTransactionBlock();
	const [digest, setDigest] = useState('');

	const currentAccount = useCurrentAccount();

    function callDonationPTB(amount:number, message:string) {
        console.log(amount, message)


        const txb = new TransactionBlock();
		

        const [coin] = txb.splitCoins(txb.gas, [amount * (10**SUI_DECIMALS)])

        txb.transferObjects([coin], recipient);
		// TODO: Creating user signature that consists of the message argument encoded


		// const enc = new TextEncoder() // .encode() method default UInt8Array 
		// const encodedMessage = enc.encode(message)
		// const intentMessage = messageWithIntent(
		// 	IntentScope.TransactionData,
		// 	encodedMessage,
		// );
		// txb.transferObjects(intentMessage, recipient);

		//TODO: call event module to signify twitch donation has occured (requires written contract)

		

        return txb
    
    }
    


	return (
		<div style={{ padding: 20 }}>

			{currentAccount && (
				<>
					<div>
						<button className='px-3 py-3 rounded-lg bg-white text-black'
							onClick={() => {
								signTransactionBlock(
									{
										transactionBlock: callDonationPTB(amount, message),
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
							Sign and execute donation tx
						</button>
					</div>
					{digest ? <>
                        <div>digest: {digest}</div>
                    </> : <>
                    
                    </>}

				</>
			)}
		</div>
	);
}

