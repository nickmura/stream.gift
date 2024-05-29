'use client'

import { ConnectButton } from '@mysten/dapp-kit';
import './wallet-button.scss';

export default function WalletButton() {
    return <ConnectButton
        id="wallet-connect-button"
        connectText="#connect-wallet"
    />
}