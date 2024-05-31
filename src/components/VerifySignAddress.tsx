'use client'

import { useState } from 'react';
import { useCurrentAccount, useSignAndExecuteTransaction, useSignPersonalMessage } from '@mysten/dapp-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';

import { SUI_DECIMALS } from '@mysten/sui.js/utils';
import { IntentScope, messageWithIntent } from '@mysten/sui.js/cryptography';
import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client'
import React from 'react';
import { useModalStore } from '@/lib/states';

type SignedMessageResult = { // should import type SuiSignPersonalMessageOutput instead (line 102 result type)...
	signature: string,
	bytes: string
}

export default function VerifySignAddress({ streamer, address, _signature }: {streamer:string, address:string, _signature:string}) {

    const setModal = useModalStore(state => state.setModal);

	const { mutate: signAndExecuteTransactionBlock } = useSignAndExecuteTransaction();
	const { mutate: signPersonalMessage } = useSignPersonalMessage(); // message

	const [digest, setDigest] = useState('');
	const [signedMessageResult, setSignedMessageResult] = useState<SignedMessageResult>()
	const [signature, setSignature] = useState('');
	const [serialTx, setSerialTx] = useState('');
	const [bytes, setBytes] = useState('');
	const currentAccount = useCurrentAccount();
	const client = new SuiClient({ url: getFullnodeUrl('devnet')});

    async function sendIncomingDonation(digest:string, bytes:string) {
		console.log(bytes)
		const streamer_address = '0x7049901babe076fd05d88f93d3504b6025dab5b15b98fdca921f9ca8e3b52bfb'
		console.log('fetching for ', digest)
		let res = await fetch(`/api/sendIncomingDonation?digest=${digest}&streamer=${streamer_address}&sender=${currentAccount?.address}
		&message=${bytes}`)
		if (!res.ok) throw Error('bad')
		res = await res.json();
		console.log(res)
	}

    async function verifySignedAddress(streamer:string, address:string, signature: string) {
        console.log('calling api...')
        let res = await fetch('/api/verifySignedAddress', {
            method: "POST",  
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ streamer, address, signature })
        })
        if (!res.ok) throw Error('bad request')
        res = await res.json()
        console.log(res)
    }
    async function changeStreamerAddress() {

    }

	return (
        <div className='w-full flex justify-between px-1'>
            {currentAccount && !signedMessageResult && !signature && !bytes && (
                <>
                    <div className='truncate w-1/2 my-auto ml-2 text-lg font-semibold'>
                        {address}
                    </div>
                    {!_signature ? <>
                        <button className='px-3 py-2 rounded-lg bg-[#4da2ff] text-white'
                            onClick={() => {
                                signPersonalMessage(
                                    {
                                        message: new TextEncoder().encode(address),
                                    },
                                        {
                                            onSuccess: async (result) => {
                                                console.log('messaged signed, ', result.signature)
                                                setSignedMessageResult(result)
                                                setSignature(result.signature)
                                                setBytes(result.bytes)
                                                await verifySignedAddress(streamer, address, result.signature)
                                            
                                            }
                                        },
                                    );
                                }
                            }
                        >
                            Sign & verify address
                        </button>
                    
                    </>
                    : (
                        <button
                            className='px-3 py-2 rounded-lg border-[#4da2ff] border text-white'
                            onClick={() => {
                                setModal("custom", {
                                    content: (
                                        <div
                                            className="h-full flex flex-col"
                                        >
                                            <div>
                                                <label className="text-md text-gr mb-1 block max-md:text-center">Donation Address</label>
                                                <div className="
                                                    max-w-[768px] h-12 border-[1px] border-gr rounded-md py-2 flex items-center
                                                    max-md:mx-auto"
                                                >
                                                    <input
                                                        type="text"
                                                        className="w-full px-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex-1 flex items-end justify-end gap-2">
                                                <button
                                                    className='px-3 py-2 rounded-lg border-[#4da2ff] border text-white'
                                                    onClick={() => setModal("", null)}
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    className='px-3 py-2 rounded-lg bg-[#4da2ff] text-white'
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })
                            }}
                        >
                            Edit
                        </button>
                    )}
                </>
            )}
        </div>
	);
}