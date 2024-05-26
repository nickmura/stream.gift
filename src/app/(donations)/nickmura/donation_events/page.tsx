'use client'

import { useEffect, useState } from "react";
import Donation from "../../../../components/Donation";
import { EXAMPLE_RECIPIENT_ADDRESS } from "@/lib/config";
import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";
export type Donation = {
  digest: string
  sender: string,
  recipient: string,
  message:string|undefined,
  amount: number
}
export default  function DonationEventListener() {
  //Should we have the event listener here, and then once it triggers, send the event data
  // to a child component? Which will be inherently visible? Otherwise show nothing...

   
  // naming the function unsubscribe may seem counterintuitive here, but you call it later to unsubscribe from the event
  let address = '0x7049901babe076fd05d88f93d3504b6025dab5b15b98fdca921f9ca8e3b52bfb'

  
  const [donation, setDonation ] = useState(false)

  const [params, setParams] = useState<Donation>()


  setInterval(async () => {
    let res = await fetch(`http://localhost:4000/check_new_donations?streamer_address=${address}`)
    if (!res.ok) throw new Error('bad')
    res = await res.json(); // @ts-ignore  
    if (res.length) { // @ts-ignore 
      setParams(res[0])
      console.log(res) 
      setDonation(true)
    } else {
      setDonation(false)
    }
  }, 30000)

  const newDonation = true


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">

      </div>
    
      {newDonation && donation ? <>
        <Donation sender={String(params?.sender)} amount={Number(params?.amount)} message={String(params?.message)} />
      </> : <>
      
      </>}

    </main>
  );
}