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


export default function DonateButton({recipient, amount}: {recipient: string, amount: number, message: string}) {
	const { mutate: signAndExecuteTransactionBlock } = useSignAndExecuteTransaction();
	const { mutate: signPersonalMessage } = useSignPersonalMessage(); // message

	const [digest, setDigest] = useState('');
	console.log(recipient, 'DonateButton')

	const [signedMessageResult, setSignedMessageResult] = useState<SignedMessageResult>()
	const [signature, setSignature] = useState('');
	const [serialTx, setSerialTx] = useState('');
	const [bytes, setBytes] = useState('');
	const currentAccount = useCurrentAccount();
	const client = new SuiClient({ url: getFullnodeUrl('devnet')})

	function callDonationPTB(amount:number) {
        console.log(amount);
		console.log(recipient);

        let txb = new TransactionBlock();
		
		txb.setSender(currentAccount?.address ?? '0x792423f7950d75fa476fd618bc0c647ce1183ceab19059dd00bdf5690e01db78')
        const [coin] = txb.splitCoins(txb.gas, [amount * (10**SUI_DECIMALS)]);

        txb.transferObjects([coin], recipient)
		setSerialTx(txb.serialize())
		// TODO: Creating user signature that consists of the message argument encoded
		// Sponsored tx??? :hmm:
        return txb.serialize()
    }
    async function sendIncomingDonation(digest:string ) {
		console.log('fetching for ', digest)
		let res = await fetch(`/api/sendIncomingDonation?digest=${digest}&streamer=${recipient}
		&sender=${currentAccount?.address}`)

		if (!res.ok) throw Error('bad')
		res = await res.json();
		console.log(res)
	}



	return (
		<div>
			{currentAccount && (
				<>
					<div>
						<button className='px-3 py-3 rounded-lg bg-white text-black'
							onClick={() => {
								signAndExecuteTransactionBlock(
									{
										transaction: callDonationPTB(amount),
									},
									{
										onSuccess: async (result) => {
											console.log('signed transaction block', result);
											
											setDigest(result.digest);
											await sendIncomingDonation(result.digest)
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
				

			</div>




		</div>
	);
}