import { useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google"; //FUCK YOU

import { useAppStore } from "@/store/useAppStore";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CarFront as Taxi, ArrowLeft, ChevronRight, LogIn } from "lucide-react";

import Loading from "./Loading";
import "./App.css";

import { useRouter } from "next/navigation";


const verifier = "pls-work-or-ill-kms";

const clientId =
  "BGghOL23kS72SpddOkef6Btp2zrWsGa2z860YGYJwU-brZrKJhPyEcN_ZeIj07HdeUiFcaIQIsf2hUSbEhOak98"; // get from https://dashboard.web3auth.io

function App() {
  const {
    web3authSFAuth,
    provider,
    pkPlugin,
    wsPlugin,
    isLoggingIn,
    initWeb3Auth,
    onSuccess,
    loginWithPasskey,
    getUserInfo,
    logout,
    getAccounts,
    getBalance,
    signMessage,
    sendTransaction,
    authenticateUser,
    addChain,
    switchChain,
    registerPasskey,
    listAllPasskeys,
    showCheckout,
    showWalletUI,
    showWalletScanner,
    // isAuthenticated,
    // login
  } = useAppStore();

  const router = useRouter();

  useEffect(() => {
    initWeb3Auth();
  }, [initWeb3Auth]);

  const logoutView = (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col justify-center items-center p-4">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Taxi size={32} className="text-yellow-400 mr-2" />
            <CardTitle className="text-2xl font-bold text-white">
              ZeroCabs Login
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
              <GoogleLogin onSuccess={onSuccess} useOneTap />
              <br />
              <Button
                className="w-50 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-semibold"
                onClick={loginWithPasskey}
              >
                Login with Passkey
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
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
        © 2024 ZeroCabs. All rights reserved.
      </footer>
    </div>
  );

  const loggedInLogic = () => {
    router.push("/zerocabs/choice")
  };

  return (
    <>{web3authSFAuth ? (provider ? loggedInLogic() : logoutView) : null}</>
  );
}

export default App;
