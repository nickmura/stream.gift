'use client'

import Image from "next/image"

export default function Search() {
    return (
        <div
            className="
                relative flex items-center justify-center w-[60%]"
        >
            <input
                className="w-full"
                placeholder="Search .sui name or portfolio..."
            />

            <Image
                src="/icons/search.svg"
                alt="Search Icon"
                height={25}
                width={25}
                className="absolute right-3"
            />
        </div>
    )
}