'use client'

import Image from "next/image"

export default function Search() {
    return (
        <div
            className="
                relative flex items-center justify-center w-[60%]"
        >
            <input
                className="w-full text-3xl p-3"
                placeholder="Search .sui name or portfolio..."
                spellCheck={false}
            />

            <Image
                src="/icons/search.svg"
                alt="Search Icon"
                height={35}
                width={35}
                className="absolute right-3"
            />
        </div>
    )
}