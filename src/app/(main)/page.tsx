'use client'

import TwitchButton from "@/components/Header/TwitchButton";
import { useAccountStore } from "@/lib/states";
import Checkbox from "@/components/Checkbox";
import { useEffect, useState } from "react";
import TwitchAccountUpdate from "@/action/twitchAccountUpdate";
import toast from "react-hot-toast";
import { useCurrentAccount } from "@mysten/dapp-kit";
import VerifySignAddress from '@/components/VerifySignAddress'
import RecentDonations from "@/action/recentDonations";
import { truncateWalletAddress } from "@/lib/helper";
import Logout from "@/action/logout";

export default function Dashboard() {

  const setUser = useAccountStore(state => state.setUser);
  const user = useAccountStore(state => state.user);
  const currentAccount = useCurrentAccount();
  const [recentDonations, setRecentDonations] = useState([]);
  const [submitting, setSubmitting] = useState<boolean>(false);

  function settingChange() {
    if (!user) return;

    setSubmitting(true);

    TwitchAccountUpdate({ ...user })
      .then((res: any) => {
        if (res.status !== false) {
          setSubmitting(false);
          toast.success("Handle is successfully changed");
        }
      })
      .catch(err => {
        if (err?.error_message) toast.error(err.error_message);
        setSubmitting(false);
      })
  }

  const [eventURL, setEventURL] = useState<string>()
  useEffect(() => {
    if (user) setEventURL(`https://stream.gift/${user?.preferred_username}/donationEvents`);

    else {
      RecentDonations()
        .then(res => {
          if (res?.status !== false) {
            setRecentDonations(res);
          }
        })
    }
  }, [user])

  return (
    <div className="min-h-screen pt-16">
      {user ? (
        <>
        <div className="w-full flex items-center justify-between mb-6">
          <h1 className="font-bold text-5xl max-w-[70%] max-md:max-w-full max-md:text-center">
            {user.preferred_username}&#39;s dashboard
          </h1>
          <button
            className="text-red-600 text-lg font-bold"
            onClick={() => {
              Logout();
              window.location.reload();
            }}
          >
            Logout
          </button>
        </div>

        <button className="text-gr font-bold text-2xl max-w-[70%] max-md:max-w-full max-md:text-center">
          Stream Connection Instructions 
        </button>

        { user.signature ? <>
          <p className="text-gr font-bold mt-2 mb-5 text-lg max-w-[70%] max-md:max-w-full max-md:text-center">
          Need to change your address? You can link another wallet and sign & verify a message with another address.
          Click &quot;Stream Connection Instructions&quot; for help.
          </p>
          
          <p className='text-gr font-bold mt-2 mb-5 text-lg max-w-[70%] max-md:max-w-full max-md:text-center'>Donation event listener: {eventURL}</p>
        </> : <>
          <p className="text-gr font-bold mt-2 mb-5 text-lg max-w-[70%] max-md:max-w-full max-md:text-center">
            In order to receive donations, you must sign and verify your address. Click &quot;Sign and verify address&quot; to continue.
          </p>
        </> }

        {/* Form */}
        <label htmlFor="handle-input" className="text-md text-gr block max-md:text-center">SUI Identifier
          {user?.signature ? <>
            <span className='text-green-500'> (Verified)</span>
          </> : <>
            <span className='text-yellow-500'> (Unverified)</span>
          </>} 
        </label>

        <div className="
          max-w-[768px] mb-7 h-12 border-[1px] border-gr rounded-md py-2 flex items-center
          max-md:mx-auto"
        >
          {currentAccount && user ?
            <VerifySignAddress
              streamer={user.preferred_username}
              address={currentAccount.address}
              _signature={user?.signature || ""}
            />
          :(
            <button></button>
          )}
        </div>

        <label className="text-md text-gr block max-md:text-center">Settings</label>
        <div className="
          max-w-[768px] mb-7 border-[1px] border-gr rounded-md py-3 px-4 flex flex-col gap-2
          max-md:mx-auto max-md"
        >
          <div className="flex items-center gap-2">
            <Checkbox
              checked={user.notificationsound}
              onChange={
                checked => {
                  setUser({ ...user, notificationsound: checked })
                }
              }
            />
            <label className="text-gr font-bold text-xl">Play a notification sound when you get a donation</label>
          </div>
        </div>

        <button
          disabled={submitting}
          onClick={settingChange}
          className="
            bg-blue rounded-md font-bold h-full text-md px-4 py-[6px] flex items-center
            disabled:bg-transparent disabled:border-[1px] disabled:border-blue
            max-md:w-full max-md:max-w-[768px] max-md:mx-auto max-md:justify-center"
        >
          { submitting ? 'Submitting' : 'Submit' }
        </button>
        </>
      ) : (
        <>
          <h1 className="font-bold text-5xl max-w-[70%] mb-6 max-md:max-w-full max-md:text-center">
            Receive donations in SUI for streaming
          </h1>
          <p className="text-gr font-bold mb-7 text-2xl max-w-[70%] max-md:max-w-full max-md:text-center">
            Sign in with Twitch and connect your wallet
          </p>
          <TwitchButton />

          <div className="mt-24">
            <p className="text-gr font-bold mb-7 text-2xl max-w-[70%] max-md:max-w-full max-md:text-center">
              Recent Donations
            </p>

            { recentDonations?.length && (
              <table>
                <thead>
                  <tr>
                    <th>From</th>
                    <th>Message</th>
                    <th>Donation</th>
                    <th>Receiver</th>
                  </tr>
                </thead>
                <tbody>
                  {recentDonations.map((d: any, i: number) => {
                    return (
                      <tr key={i}>
                        <td>{d.sender_suins ?? truncateWalletAddress(d.sender)}</td>
                        <td>{d.message !== "null" ? d.message : "-"}</td>
                        <td>{parseFloat(d.amount)?.toFixed(3)}</td>
                        <td>{truncateWalletAddress(d.recipient)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
}
