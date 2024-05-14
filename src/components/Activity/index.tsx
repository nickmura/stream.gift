'use client'

import Link from "next/link";
import type { MouseEventHandler } from "react";

// connect to Devnet

import './activity.scss';
import Button from "../Button"; // Make this a table

export default function Activity() {
    async function TestAPI() {
        let res = await fetch('/api/sui/getBalance');

        if (!res.ok) console.log(res.status, res.statusText)
        res = await res.json();
        console.log(res)
        
    }
    return (
        <button onClick={TestAPI} className='text-white px-8 py-2 border rounded-lg border-white'>Test</button>
    )


}