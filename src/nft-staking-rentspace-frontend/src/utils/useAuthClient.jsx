import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthClient } from "@dfinity/auth-client";
import { createActor as createNFTActor } from '../../../declarations/nft-staking-rentspace-backend';
import { createActor as createEXTActor } from '../../../declarations/EXT';
import { Principal } from '@dfinity/principal';

const AuthContext = createContext();

const getCanisterID = (network, canisterID) => network === "ic" ? canisterID.ic : canisterID.local;

export const useAuthClient = () => {
    const [authClient, setAuthClient] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [identity, setIdentity] = useState(null);
    const [principal, setPrincipal] = useState(null);
    const [actors, setActors] = useState(null);
    const [isPlug, setIsPlug] = useState(false);

    const canID = getCanisterID(process.env.DFX_NETWORK, {
        ic: "2cwjm-cyaaa-aaaap-ahi3q-cai",
        local: "bd3sg-teaaa-aaaaa-qaaba-cai"
    });
    
    const EXTCanID = getCanisterID(process.env.DFX_NETWORK, {
        ic: "m2nno-7aaaa-aaaah-adzba-cai",
        local: "bkyz2-fmaaa-aaaaa-qaaaq-cai"
    });

    const clientInfo = async (client) => {
        const isAuthenticated = await client.isAuthenticated();
        const identity = client.getIdentity();
        const principal = identity.getPrincipal();
        
        console.log(principal.toText());

        setAuthClient(client);
        setIsAuthenticated(isAuthenticated);
        setIdentity(identity);
        setPrincipal(principal);

        if (isAuthenticated && identity && !principal.isAnonymous()) {
            const userActor = createNFTActor(canID, { agentOptions: { identity } });
            const EXTActor = createEXTActor(EXTCanID, { agentOptions: { identity } });
            
            setActors({ userActor, EXTActor });
            return userActor;
        }
    };

    useEffect(() => {
        (async () => {
            const authClient = await AuthClient.create();
            await clientInfo(authClient);
        })();
    }, []);

    const iiLogin = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                if (authClient.isAuthenticated() && !authClient.getIdentity().getPrincipal().isAnonymous()) {
                    resolve(await clientInfo(authClient));
                } else {
                    await authClient.login({
                        identityProvider: process.env.DFX_NETWORK === "ic"
                            ? "https://identity.ic0.app/#authorize"
                            : "http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943/",
                        onError: reject,
                        onSuccess: async () => resolve(await clientInfo(authClient)),
                    });
                }
            } catch (error) {
                reject(error);
            }
        });
    };

    const plugLogin = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                if (!window.ic?.plug) {
                    return reject(new Error("Plug not installed"));
                }

                const whiteList = [canID, EXTCanID];
                const isAuthenticated = await window.ic.plug.isConnected();

                if (isAuthenticated && !window.ic.plug.agent) {
                    await window.ic.plug.createAgent({ whiteList });
                }

                const hasAllowed = await window.ic.plug.requestConnect({ whiteList });

                if (!hasAllowed) {
                    return reject(new Error("Connection refused"));
                }

                const principal = await window.ic.plug.agent.getPrincipal();
                const identity = window.ic.plug.agent;

                if (isAuthenticated && identity && !principal.isAnonymous()) {
                    const userActor = await window.ic.plug.createActor({
                        canisterId: canID,
                        interfaceFactory: createNFTActor,
                    });
                    const EXTActor = createEXTActor(EXTCanID, { agentOptions: { identity } });

                    setActors({ userActor, EXTActor });
                    setAuthClient(identity);
                    setIsAuthenticated(isAuthenticated);
                    setIdentity(identity);
                    setPrincipal(principal);
                    setIsPlug(true);

                    resolve(userActor);
                }
            } catch (error) {
                reject(error);
            }
        });
    };

    const login = async (method) => {
        if (method === 'plug') {
            return plugLogin();
        } else {
            return iiLogin();
        }
    };

    const logout = async () => {
        if (isPlug) {
            if (window.ic?.plug) {
                await window.ic.plug.disconnect();
                console.log("Plug disconnected");
            }
        } else {
            await authClient?.logout();
            console.log("AuthClient logged out");
        }
        setIsAuthenticated(false);
        setIdentity(null);
        setPrincipal(null);
        setActors(null);
        setAuthClient(null);
        setIsPlug(false);
    };

    return { login, logout, authClient, isAuthenticated, identity, principal, canID, actors };
};

export const AuthProvider = ({ children }) => {
    const auth = useAuthClient();

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);