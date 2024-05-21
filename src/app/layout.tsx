
import type { Metadata } from "next";
import { Ubuntu_Mono } from "next/font/google";

import Header from "@/components/Header";
import Wrapper from "@/components/Wrapper";
import Modals from "@/components/Modal/Modals";

import "./globals.css";
import '@mysten/dapp-kit/dist/index.css';

const ubuntu_mono = Ubuntu_Mono({ weight: "400", variable: "--ubuntu", subsets: ["latin"] });

export const metadata: Metadata = {
    title: 'ns-dev',
    description: 'SUI',
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
                    <Header />
                    <Modals />
                    <main>{children}</main>
                </Wrapper>
            </body>
        </html>
    );
}
