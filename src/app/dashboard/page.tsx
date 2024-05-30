'use client'

import TwitchButton from "@/components/Header/TwitchButton";
import { useAccountStore } from "@/lib/states";
import Checkbox from "@/components/Checkbox";
import { useState } from "react";
import TwitchAccountUpdate from "@/action/twitchAccountUpdate";
import toast from "react-hot-toast";

export default function Dashboard() {

  const setUser = useAccountStore(state => state.setUser);
  const user = useAccountStore(state => state.user);

  const [handle, setHandle] = useState<string>(user?.handle || "");
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

  return (
    <div className="min-h-screen pt-16">
      {user ? (
        <>
        <h1 className="font-bold text-5xl max-w-[70%] mb-6 max-md:max-w-full max-md:text-center">
          {user.username}&#39;s dashboard
        </h1>
        <p className="text-gr font-bold mb-7 text-2xl max-w-[70%] max-md:max-w-full max-md:text-center">
          Stream Connection Instructions
        </p>

        {/* Form */}
        <label htmlFor="handle-input" className="text-md text-gr block max-md:text-center">SUI Handle</label>
        <div className="
          max-w-[768px] mb-7 h-12 border-[1px] border-gr rounded-md p-2 flex items-center
          max-md:mx-auto"
        >
          <input
            id="handle-input"
            readOnly={true}
            onChange={e => setHandle(e.target.value)}
            defaultValue={handle}
            placeholder="Your SUI handler"
            className="flex-1 border-none placeholder:text-gr font-bold text-xl"
          />
          {/*
          <button
            disabled={submitting}
            onClick={saveHandle}
            className="
              bg-blue rounded-md font-bold h-full text-md px-4 py-[6px] pt-1
              disabled:bg-transparent disabled:border-[1px] disabled:border-blue"
          >
            { submitting ? 'Saving' : 'Save' }
          </button>
          */}
        </div>

        <label className="text-md text-gr block max-md:text-center">Settings</label>
        <div className="
          max-w-[768px] mb-7 border-[1px] border-gr rounded-md py-3 px-4 flex flex-col gap-2
          max-md:mx-auto max-md"
        >
          <div className="flex items-center gap-2">
            <Checkbox
              checked={user.notificationSound}
              onChange={
                checked => {
                  setUser({ ...user, notificationSound: checked })
                }
              }
            />
            <label className="text-gr font-bold text-xl">Play a notification sound when you get a donation</label>
          </div>
          {/*
          <div className="flex items-center gap-2">
            <Checkbox
              checked={user.preferences?.textToSpeech}
              onChange={
                checked => {
                  setUser({ ...user, textToSpeech: checked })
                }
              }
            />
            <label className="text-gr font-bold text-xl">TTS (text-to-speech) messages when donation</label>
          </div>
          */}
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
          Sign in your Twitch account
        </h1>
        <p className="text-gr font-bold mb-7 text-2xl max-w-[70%] max-md:max-w-full max-md:text-center">
          To get access to your streamer dashboard, you must log in.
        </p>
        <TwitchButton />
        </>
      )}
    </div>
  );
}