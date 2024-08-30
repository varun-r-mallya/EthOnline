"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { CarTaxiFront, Wallet, LogOut, MessageCircle } from 'lucide-react';
import { useState, useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";
import { useRouter } from "next/navigation";


const Layout = ({ children }: any) => {
  const router = useRouter();
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

  useEffect(() => {
    initWeb3Auth();
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <header className="bg-gray-800 py-4 px-6 flex justify-between items-center">
        <div className="flex items-center">
          <CarTaxiFront size={32} className="text-yellow-400 mr-2" />
          <h1 className="text-xl font-bold">ZeroCabs</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="secondary" className="text-yellow-600 border-yellow-600 hover:bg-yellow-600 hover:text-gray-900">
            <MessageCircle className="mr-2 h-4 w-4" />
            Chats
          </Button>
          <Button variant="outline" className="text-yellow-400 border-yellow-400 hover:bg-yellow-400 hover:text-gray-900" onClick={showWalletUI} >
            <Wallet className="mr-2 h-4 w-4" />
            View Wallet
          </Button>
          <Button variant="ghost" className="text-gray-400 hover:text-black" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>
      <main className="flex-grow p-6">
        {children }
      </main>
      <footer className="bg-gray-800 py-4 px-6 text-center text-gray-400 text-sm">
        © 2024 ZeroCabs. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;