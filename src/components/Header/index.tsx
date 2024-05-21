import WalletButton from "./WalletButton";

import PTB from "./PTB";


export default function Header() {
    return (
        <header
            className="
                flex items-center justify-end
                border-b-2 border-white px-5 h-24"
        >
            <PTB/>
            <WalletButton />
        </header>
    )
}