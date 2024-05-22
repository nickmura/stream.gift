'use client'
import { useState } from 'react';
import { useCurrentAccount, useSignAndExecuteTransactionBlock, useSignPersonalMessage } from '@mysten/dapp-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';

import { SUI_DECIMALS } from '@mysten/sui.js/utils';
import { IntentScope, messageWithIntent } from '@mysten/sui.js/cryptography';


type SignedMessageResult = { // should import type SuiSignPersonalMessageOutput instead (line 102 result type)...
	signature: string,
	bytes: string
}
export default function DonateButton({ recipient, amount, message }: {recipient: string, amount: number, message: string}) {
	const { mutate: signTransactionBlock } = useSignAndExecuteTransactionBlock(); // tx
	const { mutate: signPersonalMessage } = useSignPersonalMessage(); // message

	const [digest, setDigest] = useState('');


	const [signedMessageResult, setSignedMessageResult] = useState<SignedMessageResult>()
	const [signature, setSignature] = useState('');
	const [bytes, setBytes] = useState('');
	const currentAccount = useCurrentAccount();


    function callDonationPTB(amount:number, message:string) {
        console.log(amount, message)


        const txb = new TransactionBlock();
		

        const [coin] = txb.splitCoins(txb.gas, [amount * (10**SUI_DECIMALS)])

        txb.transferObjects([coin], recipient);
		// TODO: Creating user signature that consists of the message argument encoded
		
		
		

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

