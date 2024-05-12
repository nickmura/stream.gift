import { error } from "console";
import Server from "next/dist/server/base-server";
import { NextRequest, NextResponse } from "next/server";


const api = `https://api.blockvision.org/v2/sui/nft/collectionActivity`
const objectType = `0xd22b24490e0bae52676651b4f56660a5ff8022a2576e0089f79b3c88d44e08f0::suins_registration::SuinsRegistration`

const pageIndex = 1
const pageLength = 50 


export async function GET(request: NextRequest) {

    console.log('test')
    let res = await fetch(`${api}?objectType=${objectType}&pageIndex=${pageIndex}&pageLength=${pageLength}`, {
        headers: {
            "x-api-key": process.env.BLOCKVISION_APIKEY ?? "",
        }
    });
    if (!res.ok) console.log(res.status, res.statusText)
    res = await res.json()
    console.log(res)
    return NextResponse.json(res)
}