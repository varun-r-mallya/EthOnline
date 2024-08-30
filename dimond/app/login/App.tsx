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

import {
  GoogleLogin,
  CredentialResponse,
  googleLogout,
} from "@react-oauth/google"; //FUCK YOU

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CarFront as Taxi, Mail, Lock, ArrowLeft, ChevronRight } from "lucide-react";

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

function App() {
  const [web3authSFAuth, setWeb3authSFAuth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [pkPlugin, setPkPlugin] = useState<PasskeysPlugin | null>(null);
  const [wsPlugin, setWsPlugin] = useState<WalletServicesPlugin | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const ethereumPrivateKeyProvider = new EthereumPrivateKeyProvider({
          config: { chainConfig },
        });
        // Initialising Web3Auth Single Factor Auth SDK
        const web3authSfa = new Web3Auth({
          clientId, // Get your Client ID from Web3Auth Dashboard
          web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET, // ["sapphire_mainnet", "sapphire_devnet", "mainnet", "cyan", "aqua", and "testnet"]
          usePnPKey: false, // Setting this to true returns the same key as PnP Web SDK, By default, this SDK returns CoreKitKey.
          privateKeyProvider: ethereumPrivateKeyProvider,
        });
        const plugin = new PasskeysPlugin({ buildEnv: "testing" });
        web3authSfa?.addPlugin(plugin);
        setPkPlugin(plugin);
        const wsPlugin = new WalletServicesPlugin({
          walletInitOptions: {
            whiteLabel: {
              logoLight: "https://web3auth.io/images/web3auth-logo.svg",
              logoDark: "https://web3auth.io/images/web3auth-logo.svg",
            },
          },
        });
        web3authSfa?.addPlugin(wsPlugin);
        setWsPlugin(wsPlugin);
        web3authSfa.on(ADAPTER_EVENTS.CONNECTED, (data) => {
          console.log("sfa:connected", data);
          console.log("sfa:state", web3authSfa?.state);
          setProvider(web3authSfa.provider);
        });
        web3authSfa.on(ADAPTER_EVENTS.DISCONNECTED, () => {
          console.log("sfa:disconnected");
          setProvider(null);
        });
        await web3authSfa.init();
        setWeb3authSFAuth(web3authSfa);
        // (window as any).web3auth = web3authSfa;
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const onSuccess = async (response: CredentialResponse) => {
    try {
      if (!web3authSFAuth) {
        uiConsole("Web3Auth Single Factor Auth SDK not initialized yet");
        return;
      }
      setIsLoggingIn(true);
      const idToken = response.credential;
      // console.log(idToken);
      if (!idToken) {
        setIsLoggingIn(false);
        return;
      }
      const { payload } = decodeToken(idToken);
      await web3authSFAuth.connect({
        verifier,
        verifierId: (payload as any)?.email,
        idToken: idToken!,
      });
      setIsLoggingIn(false);
    } catch (err) {
      // Single Factor Auth SDK throws an error if the user has already enabled MFA
      // One can use the Web3AuthNoModal SDK to handle this case
      setIsLoggingIn(false);
      console.error(err);
    }
  };

  const loginWithPasskey = async () => {
    try {
      setIsLoggingIn(true);
      if (!pkPlugin) throw new Error("Passkey plugin not initialized");
      const result = shouldSupportPasskey();
      if (!result.isBrowserSupported) {
        uiConsole("Browser not supported");
        return;
      }
      await pkPlugin.loginWithPasskey();
      uiConsole("Passkey logged in successfully");
    } catch (error) {
      console.error((error as Error).message);
      uiConsole((error as Error).message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const getUserInfo = async () => {
    if (!web3authSFAuth) {
      uiConsole("Web3Auth Single Factor Auth SDK not initialized yet");
      return;
    }
    const getUserInfo = await web3authSFAuth.getUserInfo();
    uiConsole(getUserInfo);
  };

  const logout = async () => {
    if (!web3authSFAuth) {
      uiConsole("Web3Auth Single Factor Auth SDK not initialized yet");
      return;
    }
    googleLogout();
    web3authSFAuth.logout();
    return;
  };

  const getAccounts = async () => {
    if (!provider) {
      uiConsole("No provider found");
      return;
    }
    const rpc = new RPC(provider);
    const userAccount = await rpc.getAccounts();
    uiConsole(userAccount);
  };

  const getBalance = async () => {
    if (!provider) {
      uiConsole("No provider found");
      return;
    }
    const rpc = new RPC(provider);
    const balance = await rpc.getBalance();
    uiConsole(balance);
  };

  const signMessage = async () => {
    if (!provider) {
      uiConsole("No provider found");
      return;
    }
    const rpc = new RPC(provider);
    const result = await rpc.signMessage();
    uiConsole(result);
  };

  const sendTransaction = async () => {
    if (!provider) {
      uiConsole("No provider found");
      return;
    }
    const rpc = new RPC(provider);
    const result = await rpc.signAndSendTransaction();
    uiConsole(result);
  };

  const authenticateUser = async () => {
    if (!web3authSFAuth) {
      uiConsole("Web3Auth Single Factor Auth SDK not initialized yet");
      return;
    }
    try {
      const userCredential = await web3authSFAuth.authenticateUser();
      uiConsole(userCredential);
    } catch (err) {
      uiConsole(err);
    }
  };

  const addChain = async () => {
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
      uiConsole("Polygon Amoy Testnet added successfully");
    } catch (err) {
      uiConsole(err);
    }
  };

  const switchChain = async () => {
    try {
      await web3authSFAuth?.switchChain({ chainId: "0x13882" });
      uiConsole("Chain switched to Polygon Amoy Testnet successfully");
    } catch (err) {
      uiConsole(err);
    }
  };

  const registerPasskey = async () => {
    try {
      if (!pkPlugin || !web3authSFAuth) {
        uiConsole("plugin not initialized yet");
        return;
      }
      const result = shouldSupportPasskey();
      if (!result.isBrowserSupported) {
        uiConsole("Browser not supported");
        return;
      }
      const userInfo = await web3authSFAuth?.getUserInfo();
      const res = await pkPlugin.registerPasskey({
        username: `google|${
          userInfo?.email || userInfo?.name
        } - ${new Date().toLocaleDateString("en-GB")}`,
      });
      if (res) uiConsole("Passkey saved successfully");
    } catch (error: unknown) {
      uiConsole((error as Error).message);
    }
  };

  const listAllPasskeys = async () => {
    if (!pkPlugin) {
      uiConsole("plugin not initialized yet");
      return;
    }
    const res = await pkPlugin.listAllPasskeys();
    uiConsole(res);
  };

  const showCheckout = async () => {
    if (!wsPlugin) {
      uiConsole("wallet services plugin not initialized yet");
      return;
    }
    await wsPlugin.showCheckout();
  };

  const showWalletUI = async () => {
    if (!wsPlugin) {
      uiConsole("wallet services plugin not initialized yet");
      return;
    }
    await wsPlugin.showWalletUi();
  };

  const showWalletScanner = async () => {
    if (!wsPlugin) {
      uiConsole("wallet services plugin not initialized yet");
      return;
    }
    await wsPlugin.showWalletConnectScanner();
  };

  function uiConsole(...args: any[]): void {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
    }
  }

  const loginView = (
    <>
      <div className="flex-container">
        <div>
          <Button onClick={getUserInfo} className="card">
            Get User Info
          </Button>
        </div>
        <div>
          <Button onClick={authenticateUser} className="card">
            Get ID Token
          </Button>
        </div>
        <div>
          <Button onClick={getAccounts} className="card">
            Get Accounts
          </Button>
        </div>
        <div>
          <Button onClick={getBalance} className="card">
            Get Balance
          </Button>
        </div>
        <div>
          <Button onClick={addChain} className="card">
            Add Chain
          </Button>
        </div>
        <div>
          <Button onClick={switchChain} className="card">
            Switch Chain
          </Button>
        </div>
        <div>
          <Button onClick={signMessage} className="card">
            Sign Message
          </Button>
        </div>
        <div>
          <Button onClick={sendTransaction} className="card">
            Send Transaction
          </Button>
        </div>
        <div>
          <Button onClick={registerPasskey} className="card">
            Register passkey
          </Button>
        </div>
        <div>
          <Button onClick={listAllPasskeys} className="card">
            List all Passkeys
          </Button>
        </div>
        <div>
          <Button onClick={showCheckout} className="card">
            (Buy Crypto) Show Checkout
          </Button>
        </div>
        <div>
          <Button onClick={showWalletUI} className="card">
            Show Wallet UI
          </Button>
        </div>
        <div>
          <Button onClick={showWalletScanner} className="card">
            Show Wallet Scanner
          </Button>
        </div>
        <div>
          <Button onClick={logout} className="card">
            Log Out
          </Button>
        </div>
      </div>

      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}></p>
      </div>
    </>
  );

  const logoutView = (
    <>
      <GoogleLogin onSuccess={onSuccess} useOneTap />
      <br />
      <Button className="w-50 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-semibold" onClick={loginWithPasskey}>
        Login with Passkey
        <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col justify-center items-center p-4">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Taxi size={32} className="text-yellow-400 mr-2" />
            <CardTitle className="text-2xl font-bold text-white">
              Dimond Login
            </CardTitle>
          </div>
          <p className="text-sm text-gray-400 text-center">
            Sign in to your account using Google
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoggingIn ? (
            <Loading />
          ) : (
            <div className="grid">
              {web3authSFAuth ? (provider ? loginView : logoutView) : null}
            </div>
          )}
        </CardContent>
      </Card>

      <Button
        variant="link"
        className="mt-4 text-gray-400 hover:text-gray-100"
        asChild
      >
        <a href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </a>
      </Button>

      <footer className="mt-8 text-center text-gray-500 text-sm">
        © 2024 Dimond. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
