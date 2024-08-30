import { useAppStore } from "@/store/useAppStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

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