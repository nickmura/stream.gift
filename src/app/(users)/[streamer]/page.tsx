/**
 * Streamers donate page
 */

'use client'

import StreamerExists from '@/action/streamerExists';
import GetStreamer from '@/action/getStreamer';
import DonateButton from '@/components/DonateButton';
import DonateButtonWithMessage from '@/components/DonateButtonWithMessage';
import { useCurrentAccount } from '@mysten/dapp-kit';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function Donate({ params }: { params: { streamer: string } }) {

    const streamer: string = params.streamer;
    const currentAccount = useCurrentAccount()

    const [exists, setExists] = useState<Boolean | null>(null);

    // Form
    const [amount, setAmount] = useState<number>(0);
    const [ user, setUser] = useState<any>()
    const [message, setMessage] = useState<string>("");
    const [submitting, setSubmitting] = useState<boolean>(false);

    useEffect(() => {
        (async() => {
            const streamerExists: Boolean = (await StreamerExists(streamer)).status;
            setExists(streamerExists);

            const getStreamer = (await GetStreamer(streamer))
            console.log(getStreamer)
            setUser(getStreamer)
                
        })()
    }, [])

    function donate() {
        toast.success("Donation is successful");
    }

    if (exists === null) return <></>

    if (!exists) return (
        <div className="min-h-screen w-full pt-16">
            <p className="text-gr font-bold mt-7 text-2xl max-w-[70%] max-md:max-w-full text-center">
                Hmmm... It seems this streamer does not have a <Link href="/">stream.gift</Link> account yet.
            </p>
        </div>
    )

    return (
        <div className="min-h-screen w-full pt-16 flex flex-col items-center">
            <h1 className="font-semibold text-5xl max-w-[70%] mb-6 max-md:max-w-full text-center">
                Donate to {streamer} on Twitch
            </h1>
            <p className="text-gr font-medium mb-7 text-2xl max-w-[70%] max-md:max-w-full text-center">
                <a href={`https://www.twitch.tv/${streamer}`}>{streamer}</a> will receive a donation notifications!
            </p>

            {/* Form */}
            <div className="max-w-[600px] w-full flex flex-col mx-auto">
                <label
                    htmlFor="donation-amount"
                    className="text-md text-gr block max-md:text-center"
                >
                    Amount
                </label>
                <div className="w-full mb-7 h-12 border-[1px] border-gr rounded-md p-2 flex items-center">
                    <input
                        id="donation-amount"
                        type="number"
                        onChange={e => setAmount(Number(e.target.value))}
                        defaultValue={amount}
                        placeholder="Donation amount"
                        className="flex-1 border-none placeholder:text-gr font-bold text-xl"
                    />
                </div>

                <label
                    htmlFor="donation-message"
                    className="text-md text-gr block max-md:text-center"
                >
                    Message
                </label>
                <textarea
                    id="donation-message"
                    onChange={e => setMessage(e.target.value)}
                    placeholder="I love your streams!"
                    className="
                        flex-1 min-h-[220px] mb-7 font-bold text-xl placeholder:text-gr
                        resize-none border-[1px] border-gr rounded-md p-2 text-gr"
                ></textarea>

                {currentAccount && amount && message ? (
                    <>
                        <DonateButtonWithMessage recipient={user.streamer_address} amount={amount} message={message}/>
                    </>
                ) : currentAccount && amount && !message ? (
                    <>
                        <DonateButton recipient={user.streamer_address} amount={amount} message={message}/>
                    </>
                ) : (
                    <>
                        <div style={{ padding: 20 }}>
                            <button  disabled className=' px-3 py-3 rounded-lg bg-white text-black opacity-60'>Sign and execute donation tx</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}