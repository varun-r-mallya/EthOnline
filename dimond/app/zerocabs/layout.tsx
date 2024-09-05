"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { CarTaxiFront, Wallet, LogOut, MessageCircle } from 'lucide-react';
import { useState, useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";
import { useRouter } from "next/navigation";
import { Footer } from '@/components/basic/Footer';
import { ElipseCentre, ElipseLeft, ElipseRight } from "@/components/svgs/Elipse";
import { NavBar } from "@/components/basic/NavBar";

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
    <div className="relative min-h-screen bg-[#070C0F] text-gray-100 flex flex-col overflow-hidden">
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
        <ElipseCentre />
      </div>
      <div className="absolute right-0 flex items-center">
        <ElipseRight />
      </div>

      <div className="absolute top-0 left-0 flex items-center">
        <ElipseLeft />
      </div>

      <NavBar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;