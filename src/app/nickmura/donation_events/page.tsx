'use client'

import Donation from "@/components/Donation";
import { EXAMPLE_RECIPIENT_ADDRESS } from "@/lib/config";

export default function DonationEventListener() {
  //Should we have the event listener here, and then once it triggers, send the event data
  // to a child component? Which will be inherently visible? Otherwise show nothing...

  setInterval(() => {
    //TODO: create a JSON RPC call for a specific contract for events...
    //TODO: or create a websocket or webhook connection for subscribing to events....
    //TODO: once we have the event or data we need, call function to set state
  })
  let message = 'ello, love your streams bro'

  let amount = 1.2

  let sender = 'nicky.sui';
  const newDonation = true


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">

      </div>
    
      {newDonation ? <>
        <Donation sender={sender} amount={amount} message={message} />
      </> : <>
      
      </>}

    </main>
  );
}
