'use client'

import { useSearchParams } from 'next/navigation'
import Bids from "@/components/Bids/Bids";

export default function Bid() {

    const searchParams = useSearchParams();
    const search = searchParams.get('s') || "";

    return (
        <div
            className="flex flex-col items-center justify-center py-20"
        >
            <h1 className="text-white font-normal text-7xl mb-10">Create an bid</h1>

            <Bids search={search} />
        </div>
    )
}