'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react';

export default function Home() {

  const router = useRouter();

  const [search, setSearch] = useState<string>("");

  return (
    <div className="min-h-screen pt-16">
      <h1 className="font-bold text-5xl max-w-[70%] mb-6 max-md:max-w-full max-md:text-center">Receive donations in SUI for streaming</h1>
      <p className="text-gr font-bold text-2xl max-w-[70%] max-md:max-w-full max-md:text-center">Sign in with Twitch and connect your wallet</p>

      <input
        placeholder="Search for streamer"
        onChange={e => setSearch(e.target.value)}
        onKeyDown={e => {
          if (e.key === "Enter")
            router.push(`/${search}`);
        }}
        className="
          w-full max-w-[800px] block mx-auto p-2
          border-[1px] border-gr font-bold text-xl mt-16 rounded-md
          placeholder:text-gr"
      />
    </div>
  );
}
