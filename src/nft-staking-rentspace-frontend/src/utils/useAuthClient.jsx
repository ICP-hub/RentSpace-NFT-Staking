import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { idlFactory } from '../../../declarations/nft-staking-rentspace-backend';
import { createActor } from '../../../declarations/nft-staking-rentspace-backend';
import { createActor as createEXTActor } from '../../../declarations/EXT';
import { Principal } from '@dfinity/principal';

const AuthContext = createContext();

const canID = process.env.DFX_NETWORK === "ic" ? "2cwjm-cyaaa-aaaap-ahi3q-cai" : "bd3sg-teaaa-aaaaa-qaaba-cai";
const EXTCanID = process.env.DFX_NETWORK === "ic" ? "m2nno-7aaaa-aaaah-adzba-cai" : "bkyz2-fmaaa-aaaaa-qaaaq-cai";

export const useAuthClient = () => {
  const [authClient, setAuthClient] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState({ ii: false, plug: false });
  const [identity, setIdentity] = useState(null);
  const [principal, setPrincipal] = useState(null);
  const [actors, setActors] = useState(null);

  const initializeClient = async () => {
    const client = await AuthClient.create();
    setAuthClient(client);
  };

  useEffect(() => {
    initializeClient();
  }, []);

  const clientInfo = async (client) => {
    const isAuthenticated = await client.isAuthenticated();
    const identity = client.getIdentity();
    const principal = identity.getPrincipal();
    console.log(principal.toText())

    setAuthClient(client);
    setIsAuthenticated(isAuthenticated);
    setIdentity(identity);
    setPrincipal(principal);

    if (isAuthenticated && identity && principal && principal.isAnonymous() === false) {
        let userActor = createActor(canID, { agentOptions: { identity: identity } });
        let EXTActor = createEXTActor(EXTCanID, { agentOptions: { identity: identity } });
        console.log(EXTActor)
        setActors({
            userActor:userActor,
            EXTActor:EXTActor
        })
        return userActor
    }
}

  const handleIIlogin = async () => {
    return new Promise(async (resolve, reject) => {
      try {
          if (authClient.isAuthenticated() && ((await authClient.getIdentity().getPrincipal().isAnonymous()) === false)) {
              resolve(clientInfo(authClient));
          } else {
              await authClient.login({
                  identityProvider :process.env.DFX_NETWORK === "ic"
                  ? "https://identity.ic0.app/#authorize"
                  : `http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943/`,
                  onError: (error) => reject((error)),
                  onSuccess: () => resolve(clientInfo(authClient)),
              });
          }
      } catch (error) {
          reject(error);
      }
  });
  };

  const handlePlugLogin = async () => {
    if (!window.ic?.plug) throw new Error("Plug not installed");

    const whitelist = [canID, EXTCanID];
    const host = process.env.DFX_NETWORK === "ic" ? "https://mainnet.dfinity.network" : "http://127.0.0.1:4943";
    console.log("Host : ", host)
    const isConnected = await window.ic.plug.requestConnect({ whitelist,host });
    console.log("isconnected : ", isConnected)

    if (isConnected) {
      const principal = await window.ic.plug.agent.getPrincipal();
      const identity = window.ic.plug.agent;

      setIsAuthenticated(prev => ({ ...prev, plug: true }));
      setIdentity(identity);
      setPrincipal(principal);

      const userActor = await window.ic.plug.createActor({
        canisterId: canID,
        interfaceFactory: idlFactory
      });
      const EXTActor = createEXTActor(EXTCanID, { agentOptions: { identity } });
      setActors({ userActor, EXTActor });
      return userActor
    } else {
      throw new Error("Plug connection refused");
    }
  };

  const logout = async () => {
    await authClient.logout();
    setIsAuthenticated({ ii: false, plug: false });
    setIdentity(null);
    setPrincipal(null);
    setActors(null);
  };

  return {
    login: async (method) => {
      if (method === "ii") {
        return handleIIlogin();
      } else if (method === "plug") {
        return handlePlugLogin();
      }
    },
    logout,
    isAuthenticated,
    identity,
    principal,
    actors,
  };
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
