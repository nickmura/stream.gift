import { SuiClient, getFullnodeUrl, SuiHTTPTransport,  } from "@mysten/sui.js/client";
import pkg from 'ws';
const { WebSocket } = pkg;
async function subscribeEvent() {

    console.log(123)

    const client = new SuiClient({
      transport: new SuiHTTPTransport({
        url: getFullnodeUrl('devnet'),
        // The typescript definitions may not match perfectly, casting to never avoids these minor incompatibilities
        WebSocketConstructor: WebSocket ,
      }),
    });

    const unsubscribe = await client.subscribeEvent({
      filter: {
        MoveModule: {
          module: 'transfer_to_sender',
          package: '0xb400ca81863faa543c058aaadc8d8299413f59b7f05feef1726a1f720c8419dc'
        }
      },
      onMessage(event) {
        console.log(event)
        // handle subscription notification message here. This function is called once per subscription message.
      },
    });
     
  } subscribeEvent()