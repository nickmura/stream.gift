import type { Metadata } from "next";
import { Ubuntu_Mono } from "next/font/google";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import Wrapper from "@/components/Wrapper";
import Modals from "@/components/Modal/Modals";

import "./globals.css";
import '@mysten/dapp-kit/dist/index.css';

const ubuntu_mono = Ubuntu_Mono({ weight: "400", variable: "--ubuntu", subsets: ["latin"] });

export const metadata: Metadata = {
    title: 'stream.gift - Twitch donates on SUI network',
    description: 'Donate to your favorite Twitch streamer on SUI network.',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={ubuntu_mono.className}>
                <Wrapper>
                    <Modals />
                    <div className="flex pr-48 max-xl:pr-0">
                        <Sidebar />
                        <div className="flex-1 flex flex-col">
                            <Header />
                            <main className="mt-10 p-2">{children}</main>
                        </div>
                    </div>
                    <Footer />
                </Wrapper>
            </body>
        </html>
    );
}
