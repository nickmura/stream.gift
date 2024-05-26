import WalletButton from "./WalletButton";
import TwitchButton from "./TwitchButton";

export default function Header() {
    return (
        <header
            className="
                flex items-center justify-end
                border-b-2 border-white px-5 h-24"
        >
            <WalletButton />
            <TwitchButton />
        </header>
    )
}