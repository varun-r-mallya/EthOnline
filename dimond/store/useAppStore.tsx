// /store/useAppStore.ts
"use client";
import { useEffect, useState } from "react";

// Import Single Factor Auth SDK for no redirect flow
import { Web3Auth, decodeToken } from "@web3auth/single-factor-auth";
import {
  ADAPTER_EVENTS,
  CHAIN_NAMESPACES,
  IProvider,
  WEB3AUTH_NETWORK,
} from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { PasskeysPlugin } from "@web3auth/passkeys-sfa-plugin";
import { WalletServicesPlugin } from "@web3auth/wallet-services-plugin";

import { redirect } from "next/navigation";

import {
  GoogleLogin,
  CredentialResponse,
  googleLogout,
} from "@react-oauth/google"; //FUCK YOU

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CarFront as Taxi,
  Mail,
  Lock,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";

// RPC libraries for blockchain calls
// import RPC from "./evm.web3";
// import RPC from "./evm.viem";
import RPC from "./evm.ethers";

import Loading from "./Loading";
import "./App.css";
import { shouldSupportPasskey } from "./utils";

const verifier = "pls-work-or-ill-kms";

const clientId =
  "BGghOL23kS72SpddOkef6Btp2zrWsGa2z860YGYJwU-brZrKJhPyEcN_ZeIj07HdeUiFcaIQIsf2hUSbEhOak98"; // get from https://dashboard.web3auth.io

import { create } from "zustand";

interface AppState {
  web3authSFAuth: Web3Auth | null;
  provider: IProvider | null;
  pkPlugin: PasskeysPlugin | null;
  wsPlugin: WalletServicesPlugin | null;
  isLoggingIn: boolean;
  initWeb3Auth: () => Promise<void>;
  onSuccess: (response: CredentialResponse) => Promise<void>;
  loginWithPasskey: () => Promise<void>;
  getUserInfo: () => Promise<any>;
  logout: () => Promise<void>;
  getAccounts: () => Promise<void>;
  getBalance: () => Promise<void>;
  signMessage: () => Promise<void>;
  sendTransaction: () => Promise<void>;
  authenticateUser: () => Promise<void>;
  addChain: () => Promise<void>;
  switchChain: () => Promise<void>;
  registerPasskey: () => Promise<void>;
  listAllPasskeys: () => Promise<void>;
  showCheckout: () => Promise<void>;
  showWalletUI: () => Promise<void>;
  showWalletScanner: () => Promise<void>;
}

const chainConfig = {
  chainId: "0xaa36a7",
  displayName: "Ethereum Sepolia Testnet",
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  tickerName: "Ethereum",
  ticker: "ETH",
  decimals: 18,
  rpcTarget: "https://rpc.ankr.com/eth_sepolia",
  blockExplorerUrl: "https://sepolia.etherscan.io",
  logo: "https://cryptologos.cc/logos/polygon-matic-logo.png",
};

export const useAppStore = create<AppState>((set) => ({
  web3authSFAuth: null,
  provider: null,
  pkPlugin: null,
  wsPlugin: null,
  isLoggingIn: false,

  initWeb3Auth: async () => {
    // Implement initialization logic here
    try {
      const ethereumPrivateKeyProvider = new EthereumPrivateKeyProvider({
        config: { chainConfig },
      });

      const web3authSfa = new Web3Auth({
        clientId,
        web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
        usePnPKey: false,
        privateKeyProvider: ethereumPrivateKeyProvider,
      });

      const pkPlugin = new PasskeysPlugin({ buildEnv: "testing" });
      web3authSfa?.addPlugin(pkPlugin);
      const wsPlugin = new WalletServicesPlugin({
        walletInitOptions: {
          whiteLabel: {
            logoLight: "https://web3auth.io/images/web3auth-logo.svg",
            logoDark: "https://web3auth.io/images/web3auth-logo.svg",
          },
        },
      });
      web3authSfa?.addPlugin(wsPlugin);

      web3authSfa.on(ADAPTER_EVENTS.CONNECTED, (data) => {
        set({ provider: web3authSfa.provider });
      });
      web3authSfa.on(ADAPTER_EVENTS.DISCONNECTED, () => {
        set({ provider: null });
      });

      await web3authSfa.init();
      set({ web3authSFAuth: web3authSfa, pkPlugin, wsPlugin });
    } catch (error) {
      console.error(error);
    }
  },

  onSuccess: async (response) => {
    try {
      const { web3authSFAuth } = useAppStore.getState();
      if (!web3authSFAuth) {
        console.error("Web3Auth Single Factor Auth SDK not initialized yet");
        return;
      }
      set({ isLoggingIn: true });
      const idToken = response.credential;
      if (!idToken) {
        set({ isLoggingIn: false });
        return;
      }
      const { payload } = decodeToken(idToken);
      await web3authSFAuth.connect({
        verifier,
        verifierId: (payload as any)?.email,
        idToken: idToken!,
      });
      set({ isLoggingIn: false });
    } catch (err) {
      set({ isLoggingIn: false });
      console.error(err);
    }
  },

  loginWithPasskey: async () => {
    const { pkPlugin } = useAppStore.getState();
    try {
      set({ isLoggingIn: true });
      if (!pkPlugin) throw new Error("Passkey plugin not initialized");
      const result = shouldSupportPasskey();
      if (!result.isBrowserSupported) {
        console.error("Browser not supported");
        return;
      }
      await pkPlugin.loginWithPasskey();
      console.log("Passkey logged in successfully");
    } catch (error) {
      console.error((error as Error).message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  getUserInfo: async (): Promise<any> => {
    const { web3authSFAuth }: { web3authSFAuth: Web3Auth | null } = useAppStore.getState();
    if (!web3authSFAuth) {
      console.error("Web3Auth Single Factor Auth SDK not initialized yet");
      return;
    }
    const getUserInfo: any = await web3authSFAuth.getUserInfo();
    console.log(getUserInfo);
    return getUserInfo;
  },

  logout: async () => {
    const { web3authSFAuth } = useAppStore.getState();
    if (!web3authSFAuth) {
      console.error("Web3Auth Single Factor Auth SDK not initialized yet");
      return;
    }
    googleLogout();
    web3authSFAuth.logout();
  },

  getAccounts: async () => {
    const { provider } = useAppStore.getState();
    if (!provider) {
      console.error("No provider found");
      return;
    }
    const rpc = new RPC(provider);
    const userAccount = await rpc.getAccounts();
    console.log(userAccount);
  },

  getBalance: async () => {
    const { provider } = useAppStore.getState();
    if (!provider) {
      console.error("No provider found");
      return;
    }
    const rpc = new RPC(provider);
    const balance = await rpc.getBalance();
    console.log(balance);
  },

  signMessage: async () => {
    const { provider } = useAppStore.getState();
    if (!provider) {
      console.error("No provider found");
      return;
    }
    const rpc = new RPC(provider);
    const result = await rpc.signMessage();
    console.log(result);
  },

  sendTransaction: async () => {
    const { provider } = useAppStore.getState();
    if (!provider) {
      console.error("No provider found");
      return;
    }
    const rpc = new RPC(provider);
    const result = await rpc.signAndSendTransaction();
    console.log(result);
  },

  authenticateUser: async () => {
    const { web3authSFAuth } = useAppStore.getState();
    if (!web3authSFAuth) {
      console.error("Web3Auth Single Factor Auth SDK not initialized yet");
      return;
    }
    try {
      const userCredential = await web3authSFAuth.authenticateUser();
      console.log(userCredential);
    } catch (err) {
      console.error(err);
    }
  },

  addChain: async () => {
    const { web3authSFAuth } = useAppStore.getState();
    try {
      const newChain = {
        chainId: "0x13882",
        displayName: "Sepolia Testnet ETH",
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        rpcTarget: "https://rpc.ankr.com/polygon_amoy",
        blockExplorerUrl: "https://amoy.polygonscan.com/",
        ticker: "MATIC",
        tickerName: "MATIC",
        logo: "https://cryptologos.cc/logos/polygon-matic-logo.png",
      };
      await web3authSFAuth?.addChain(newChain);
      console.log("Polygon Amoy Testnet added successfully");
    } catch (err) {
      console.error(err);
    }
  },

  switchChain: async () => {
    const { web3authSFAuth } = useAppStore.getState();
    try {
      await web3authSFAuth?.switchChain({ chainId: "0x13882" });
      console.log("Chain switched to Polygon Amoy Testnet successfully");
    } catch (err) {
      console.error(err);
    }
  },

  registerPasskey: async () => {
    const { pkPlugin, web3authSFAuth } = useAppStore.getState();
    try {
      if (!pkPlugin || !web3authSFAuth) {
        console.error("Plugin not initialized yet");
        return;
      }
      const result = shouldSupportPasskey();
      if (!result.isBrowserSupported) {
        console.error("Browser not supported");
        return;
      }
      const userInfo = await web3authSFAuth?.getUserInfo();
      const res = await pkPlugin.registerPasskey({
        username: `google|${
          userInfo?.email || userInfo?.name
        } - ${new Date().toLocaleDateString("en-GB")}`,
      });
      if (res) console.log("Passkey saved successfully");
    } catch (error: unknown) {
      console.error((error as Error).message);
    }
  },

  listAllPasskeys: async () => {
    const { pkPlugin } = useAppStore.getState();
    if (!pkPlugin) {
      console.error("Plugin not initialized yet");
      return;
    }
    const res = await pkPlugin.listAllPasskeys();
    console.log(res);
  },

  showCheckout: async () => {
    const { wsPlugin } = useAppStore.getState();
    if (!wsPlugin) {
      console.error("Wallet services plugin not initialized yet");
      return;
    }
    await wsPlugin.showCheckout();
  },

  showWalletUI: async () => {
    const { wsPlugin } = useAppStore.getState();
    if (!wsPlugin) {
      console.error("Wallet services plugin not initialized yet");
      return;
    }
    await wsPlugin.showWalletUi();
  },

  showWalletScanner: async () => {
    const { wsPlugin } = useAppStore.getState();
    if (!wsPlugin) {
      console.error("Wallet services plugin not initialized yet");
      return;
    }
    await wsPlugin.showWalletConnectScanner();
  },
}));
