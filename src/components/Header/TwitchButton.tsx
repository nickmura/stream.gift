'use client'

import toast from "react-hot-toast";
import { fromB64 } from "@mysten/bcs";
import { useEffect, useState } from "react";
import { SuiClient } from "@mysten/sui.js/client";
import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
import { generateNonce, generateRandomness } from '@mysten/zklogin';
import TwitchLogin from "@/action/twitchLogin";
import TwitchAccount from "@/action/twitchAccount";
import { TwitchUserStore, useAccountStore } from "@/lib/states";

import './wallet-button.scss';

const suiClient = new SuiClient({ url: "https://fullnode.devnet.sui.io" });
const client_id = process.env.NEXT_PUBLIC_OPENID_CLIENT_ID ?? ''

export default function TwitchButton() {

    const user = useAccountStore(state => state.user);
    const setUser = useAccountStore(state => state.setUser);

    const [loading, setLoading] = useState(true);

    const [ephemeralKeyPair, setEphemeralKeyPair] = useState<Ed25519Keypair | null>(null);
    const [maxEpoch, setMaxEpoch] = useState<number | null>(0);
    const [randomness, setRandomness] = useState<string | null>(null);
    const [nonce, setNonce] = useState<string | null>(null);

    useEffect(() => {
        (async() => {
            // Check if user is trying to login
            // After redirection
            const id_token = window.location.href.split("=")[1];

            if (id_token) {
                TwitchLogin(id_token)
                    .then(response => {
                        TwitchAccount(response as string)
                            .then(resp => {
                                setUser(resp as TwitchUserStore);
                                setLoading(false);
                            })
                    })
                    .catch(err => console.error(err));
            }

            // Before redirection
            else {
                const privateKey = window.sessionStorage.getItem('KEY_PAIR_SESSION_STORAGE_KEY');
                let ephemeralKeyPair_: Ed25519Keypair;
                if (privateKey) {
                    ephemeralKeyPair_ = Ed25519Keypair.fromSecretKey(fromB64(privateKey));
                    setEphemeralKeyPair(ephemeralKeyPair_);
                } else {
                    // Generate ephemeral key pair
                    ephemeralKeyPair_ = new Ed25519Keypair();
                    setEphemeralKeyPair(ephemeralKeyPair_);
        
                    // Set as session storage variable
                    window.sessionStorage.setItem(
                        'KEY_PAIR_SESSION_STORAGE_KEY',
                        ephemeralKeyPair_.export().privateKey
                    );
                }
        
                let randomness_ = window.sessionStorage.getItem('RANDOMNESS_SESSION_STORAGE_KEY');
                if (randomness_) setRandomness(randomness_);
                else {
                    // Generate randomness
                    randomness_ = generateRandomness();
                    setRandomness(randomness_);
        
                    // Set as session storage variable
                    window.sessionStorage.setItem(
                        'RANDOMNESS_SESSION_STORAGE_KEY',
                        randomness_
                    );
                }
        
                let maxEpoch_: number = parseInt(window.localStorage.getItem('MAX_EPOCH_LOCAL_STORAGE_KEY') ?? '0');
                if (maxEpoch_) setMaxEpoch(Number(maxEpoch_));
                else {
                    // Find maximum epoch
                    const { epoch } = await suiClient.getLatestSuiSystemState();
                    maxEpoch_ = Number(epoch);
                    setMaxEpoch(maxEpoch_);
    
                    // Set as session storage variable
                    window.localStorage.setItem(
                        'MAX_EPOCH_LOCAL_STORAGE_KEY',
                        maxEpoch_.toString()
                    );
                }
    
                // Generate nonce
                let nonce_ = generateNonce(
                    ephemeralKeyPair_.getPublicKey(),
                    maxEpoch_,
                    randomness_
                );
    
                setNonce(nonce_);
            }
        })()
    }, []);

    useEffect(() => {
        TwitchAccount()
            .then(resp => {
                setUser(resp as TwitchUserStore);
                setLoading(false);
            })
            .catch(e => setLoading(false))
    }, []);

    function login_twitch() {
        if (!ephemeralKeyPair || !maxEpoch || !randomness) toast.error("An error occured");

        let nonce_;
        if (!nonce) {
            nonce_ = generateNonce(
                (ephemeralKeyPair as Ed25519Keypair).getPublicKey(),
                (maxEpoch || 0),
                (randomness || "")
            );
    
            setNonce(nonce_);
        }

        // Redirect to the login page
        const params = new URLSearchParams({
            client_id,
            force_verify: 'true',
            lang: 'en',
            login_type: 'login',
            redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URL ?? 'https://test2.stream.gift', // <-- TODO: Change later
            response_type: 'id_token',
            scope: 'openid',
            nonce: nonce ? nonce : (nonce_ || "")
        });

        const loginURL = `https://id.twitch.tv/oauth2/authorize?${params}`;
        window.location.replace(loginURL);
    }

    if (loading) return <></>

    return (
        <>
        { user ? (
            <p
                className="wallet-connect-button"
                style={{ color: "#6441a5" }}
            >
                {user.preferred_username}
            </p>
        ) : (
            <button
                onClick={login_twitch}
                className="wallet-connect-button"
                style={{ color: "#6441a5" }}
            >
                #twitch-login
            </button>
        )}
        </>
    )
}