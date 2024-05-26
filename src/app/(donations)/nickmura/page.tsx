'use client'
import DonateUser from "@/components/DonateUser";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex"></div>
 
      <DonateUser address={'0x7049901babe076fd05d88f93d3504b6025dab5b15b98fdca921f9ca8e3b52bfb'} user={'nickmura2'} />
    </main>
  );
}
