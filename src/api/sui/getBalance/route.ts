import { error } from "console";
import Server from "next/dist/server/base-server";
import { NextRequest, NextResponse } from "next/server"; 
import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';


const api = `https://api.blockvision.org/v2/sui/nft/nftList`
const objectType = `0xd22b24490e0bae52676651b4f56660a5ff8022a2576e0089f79b3c88d44e08f0::suins_registration::SuinsRegistration`

const pageIndex = 2
const pageLength = 50 


export async function GET(request: NextRequest) {

    const client = new SuiClient({ url: getFullnodeUrl('mainnet') });
    // get tokens from the DevNet faucet server
    let res = await client.getAllCoins({
        owner: '0x0b14ea45f57e13df1c40425e1d2089649837e72c9920eb25f657c88c14c3e5df',
    });

    // await RecordDataCache(res?.result.data)
    return NextResponse.json(res)
}