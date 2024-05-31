'use client'
import { useState } from 'react';
import { useCurrentAccount, useSignAndExecuteTransaction, useSignPersonalMessage } from '@mysten/dapp-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';

import { SUI_DECIMALS } from '@mysten/sui.js/utils';
import { IntentScope, messageWithIntent } from '@mysten/sui.js/cryptography';
import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client'

type SignedMessageResult = { // should import type SuiSignPersonalMessageOutput instead (line 102 result type)...
	signature: string,
	bytes: string
}


export default function DonateButtonWithMessage({ recipient, amount, message }: {recipient: string, amount: number, message: string}) {
	const { mutate: signAndExecuteTransactionBlock } = useSignAndExecuteTransaction();
	const { mutate: signPersonalMessage } = useSignPersonalMessage(); // message

	const [digest, setDigest] = useState('');
	console.log(recipient, 'DonateButtonWithMessage')

	const [signedMessageResult, setSignedMessageResult] = useState<SignedMessageResult>()
	const [signature, setSignature] = useState('');
	const [serialTx, setSerialTx] = useState('');
	const [bytes, setBytes] = useState('');
	const currentAccount = useCurrentAccount();
	const client = new SuiClient({ url: getFullnodeUrl('devnet')})

	function callDonationPTB(amount:number, message:string, signature:string, bytes:string) {
        console.log(amount, message)
		console.log(recipient)

        let txb = new TransactionBlock();
		
		txb.setSender(currentAccount?.address ?? '')
        const [coin] = txb.splitCoins(txb.gas, [amount * (10**SUI_DECIMALS)])

        txb.transferObjects([coin], recipient)
		setSerialTx(txb.serialize())
		// TODO: Creating user signature that consists of the message argument encoded
		
		// Sponsored tx??? :hmm:
		
 
        return txb.serialize()
    
    }
    async function sendIncomingDonation(digest:string, bytes:string) {
		console.log(bytes)

		console.log('fetching for ', digest)
		let res = await fetch(`/api/sendIncomingDonation?digest=${digest}&streamer=${recipient}&sender=${currentAccount?.address}
		&message=${bytes}`)
		if (!res.ok) throw Error('bad')
		res = await res.json();
		console.log(res)
	}


	return (
		<div>
			{currentAccount && signedMessageResult && signature && bytes &&(
				<>
					<div>
						<button id="wallet-connect-button-3" className='px-3 py-3 rounded-lg  text-white'
							onClick={() => {
								signAndExecuteTransactionBlock(
									{
										transaction: callDonationPTB(amount, message, signature, bytes),
									},
									{
										onSuccess: async (result) => {
											console.log('signed transaction block', result);
											
											setDigest(result.digest);
											await sendIncomingDonation(result.digest, bytes)
										},
									},
								);
							}}
						>
							Sign and execute donation tx (& msg)
						</button>
					</div>
					<div>Signature: {signature}</div>
					<div>Base64 representation of message: {bytes}</div>
					{digest ? <>
                        <div>digest: {digest}</div>
                    </> : <>
                    
                    </>}

				</>
			)}
			<div className='mt-5'>
				{currentAccount && message && !signedMessageResult && !signature && !bytes && (
					<>
					<button id='wallet-connect-button-3' className='px-3 py-3 rounded-lg  text-white'
						onClick={() => {
							signPersonalMessage(
								{
									message: new TextEncoder().encode(message),
								},
									{
										onSuccess: (result) => {
											console.log('messaged signed, ', result.signature)
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

					</>
				)}

			</div>




		</div>
	);
}