import WalletButton from "./WalletButton";

export default function Header() {
    return (
        <header
            className="
                flex items-center justify-end
                border-b-2 border-white p-5"
        >
            <WalletButton />
        </header>
    )
}