"use client";
import React, { use } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CarTaxiFront, User, Shield, ArrowLeft } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { useEffect, useState } from "react";
const RoleChoicePage = () => {
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
  } = useAppStore();

  const [userInfo, setUserInfo] = useState<any>();
  useEffect(() => {
    initWeb3Auth();
  }, []);

  useEffect(() => {
    if (web3authSFAuth) {
      getUserInfo().then((info) => {
        setUserInfo(info);
      });
    }
  }, [web3authSFAuth]);

  

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col justify-center items-center p-4">
      <h1 className="text-4xl font-bold text-gray-50 mb-4">
        Welcome {userInfo?.name}!
      </h1>
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <CarTaxiFront size={32} className="text-yellow-400 mr-2" />
            <CardTitle className="text-2xl font-bold text-gray-50 ">
              Choose Your Role
            </CardTitle>
          </div>
          <p className="text-sm text-gray-400 text-center">
            Select how you'd like to use ZeroCabs today
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <br />
          <a href="/zerocabs/rider">
          <Button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-semibold h-16 flex items-center justify-start px-4">
            <User size={24} className="mr-4" />
            <div className="text-left">
              <div className="font-bold">Rider</div>
              <div className="text-xs opacity-75">
                Request a ride to your destination
              </div>
            </div>
          </Button>
          </a>
          <br />
          <a href="/zerocabs/driver">
          <Button className="w-full bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-gray-900 font-semibold h-16 flex items-center justify-start px-4">
            <CarTaxiFront size={24} className="mr-4" />
            <div className="text-left">
              <div className="font-bold">Driver</div>
              <div className="text-xs opacity-75">
                Offer rides and earn crypto
              </div>
            </div>
          </Button>
          </a>
          <br />
          <a href="/zerocabs/responder">
          <Button className="w-full bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600 text-gray-900 font-semibold h-16 flex items-center justify-start px-4">
            <Shield size={24} className="mr-4" />
            <div className="text-left">
              <div className="font-bold">Emergency Responder</div>
              <div className="text-xs opacity-75">
                Provide emergency response services
              </div>
            </div>
          </Button>
          </a>
        </CardContent>
      </Card>
  

      <footer className="mt-8 text-center text-gray-500 text-sm">
        © 2024 ZeroCabs. All rights reserved.
      </footer>
    </div>
  );
};

export default RoleChoicePage;
