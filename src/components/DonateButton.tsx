'use client'
import { useState } from 'react';
import { useCurrentAccount, useSignAndExecuteTransactionBlock, useSignPersonalMessage } from '@mysten/dapp-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';

import { SUI_DECIMALS } from '@mysten/sui.js/utils';
import { IntentScope, messageWithIntent } from '@mysten/sui.js/cryptography';
import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client'

type SignedMessageResult = { // should import type SuiSignPersonalMessageOutput instead (line 102 result type)...
	signature: string,
	bytes: string
}


export default function DonateButton({ recipient, amount, message }: {recipient: string, amount: number, message: string}) {
	const { mutate: signAndExecuteTransactionBlock } = useSignAndExecuteTransactionBlock();
	const { mutate: signPersonalMessage } = useSignPersonalMessage(); // message

	const [digest, setDigest] = useState('');


	const [signedMessageResult, setSignedMessageResult] = useState<SignedMessageResult>()
	const [signature, setSignature] = useState('');
	const [bytes, setBytes] = useState('');
	const currentAccount = useCurrentAccount();
	const client = new SuiClient({ url: getFullnodeUrl('devnet')})

    function callDonationPTB(amount:number, message:string) {
        console.log(amount, message)


        const txb = new TransactionBlock();
		
		txb.setSender(currentAccount?.address ?? '0x792423f7950d75fa476fd618bc0c647ce1183ceab19059dd00bdf5690e01db78')
        const [coin] = txb.splitCoins(txb.gas, [amount * (10**SUI_DECIMALS)])

        txb.transferObjects([coin], recipient);
		txb.serialize()
		// TODO: Creating user signature that consists of the message argument encoded
		
		// Sponsored tx??? :hmm:
		

        return txb
    
    }
    async function callAPI(digest:string) {
		const streamer_address = '0x7049901babe076fd05d88f93d3504b6025dab5b15b98fdca921f9ca8e3b52bfb'
		console.log('fetching for ', digest)
		let res = await fetch(`http://localhost:4000/incoming_donation?digest	=${digest}&streamer=${streamer_address}`)
		if (!res.ok) throw Error('bad')
		res = await res.json();
		console.log(res)
	}


	return (
		<div style={{ padding: 20 }}>

			{currentAccount && (
				<>
					<div>
						<button className='px-3 py-3 rounded-lg bg-white text-black'
							onClick={() => {
								signAndExecuteTransactionBlock(
									{
										transactionBlock: callDonationPTB(amount, message),

									},
									{
										onSuccess: async (result) => {
											console.log('signed transaction block', result);
											
											setDigest(result.digest);
											await callAPI(result.digest)
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
			<div className='mt-5'>
				{currentAccount && (
					<>
					<button className='px-3 py-3 rounded-lg bg-white text-black'
						onClick={() => {
							signPersonalMessage(
								{
									message: new TextEncoder().encode(message),
								},
									{
										onSuccess: (result) => {
											setSignedMessageResult(result)
											setSignature(result.signature)
											setBytes(result.bytes)
										
										}
									},
								);
							}}
						>
							Sign message
						</button>
						<div>Signature: {signature}</div>
						<div>Base64 representation of message: {bytes}</div>
					</>
				)}

			</div>



		</div>
	);
}

