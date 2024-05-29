'use client'

import { ConnectButton } from "@mysten/dapp-kit";
import Image from "next/image";
import '../../components/Header/wallet-button.scss';

export default function GetStarted() {
  return (
    <div className="min-h-screen pt-16">
      <h1 className="font-bold text-5xl max-w-[70%] mb-6 max-md:max-w-full max-md:text-center">Get started</h1>
      <p className="text-gr mb-7 font-bold text-2xl max-w-[70%] max-md:max-w-full max-md:text-center">Connect your Sui Wallet</p>

      <div className="w-full flex max-md:justify-center">
        <ConnectButton
          id="wallet-connect-button-2"
          connectText={
            <div className="flex items-center gap-3">
              <Image
                src="/sui.svg"
                alt="SUI"
                height={28}
                width={28}
              />
              Connect your Wallet
            </div>
          }
        />
      </div>
    </div>
  );
}
