'use client'

import { useEffect, useState } from "react";
import Donation from "@/components/Donation";
import { EXAMPLE_RECIPIENT_ADDRESS } from "@/lib/config";
import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";

export default  function DonationEventListener() {
  //Should we have the event listener here, and then once it triggers, send the event data
  // to a child component? Which will be inherently visible? Otherwise show nothing...

   
  // naming the function unsubscribe may seem counterintuitive here, but you call it later to unsubscribe from the event
  

  const [donation, setDonation ] = useState(true)

  useEffect(() => {
   
  }, )
  

  let message = 'ello, love your streams bro'

  let amount = 1.2

  let sender = 'nicky.sui'
  const newDonation = true


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">

      </div>
    
      {newDonation && donation ? <>
        <Donation sender={sender} amount={amount} message={message} />
      </> : <>
      
      </>}

    </main>
  );
}
