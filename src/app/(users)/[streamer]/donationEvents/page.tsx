"use client";

import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";

import Donation from "@/components/Donation";
import CheckDonations from "@/action/checkDonations";
import { b64DecodeUnicode, truncateWalletAddress } from "@/lib/helper";

export default function DonationEventListener() {
  // Should we have the event listener here, and then once it triggers, send the event data
  // to a child component? Which will be inherently visible? Otherwise show nothing...
  // naming the function unsubscribe may seem counterintuitive here, but you call it later to unsubscribe from the event

  const pathname = usePathname();
  const username = pathname.split("/")[1];

  const [donation, setDonation] = useState<any>(false);

  useEffect(() => {
    if (username) {
      const interval = setInterval(async () => {
        try {
          const res = await CheckDonations(username);
          if (res) console.log(res);

          if (res?.status !== false && res?.[0]?.sender) {
            setDonation(res[0]);
          } else {
            setDonation(false);
          }
        } catch(e) {}
      }, 30000);
  
      return () => clearInterval(interval);
    }
  }, [username]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex"></div>
        {donation && (
          <Donation
            sender={donation.sender_suins ?? truncateWalletAddress(donation.sender)}
            amount={donation.amount}
            message={b64DecodeUnicode(donation.message)}
          />
        )}
    </main>
  );
}
