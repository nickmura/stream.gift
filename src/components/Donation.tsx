'use client'
import { useState } from "react";
import { useCurrentAccount } from '@mysten/dapp-kit';

import { EXAMPLE_RECIPIENT_ADDRESS } from "@/lib/config";

import DonateButton from './DonateButton';


export default function Donation({sender, amount, message}: {sender: string, amount:number, message: string}) {
    //Basically the 'streamer' who is getting a donation

    const recipientAddress = EXAMPLE_RECIPIENT_ADDRESS
    const [handleInput, setHandleInput] = useState<number>();
    const [handleMessage, setHandleMessage] = useState<string>("");

    const currentAccount = useCurrentAccount()



    function changeHandle(value: number) {
        setHandleInput(value);

    }


    function changeMessage(value: string) {
        setHandleMessage(value);

    }



  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full p-24">
      <div className="w-1/2">
        <h1 className='text-2xl'>You just received a donation for {amount} SUI from {sender}! </h1>
        <p className='pt-5'>
            {message}
        </p>




      </div> 
    </main>
  );
}
