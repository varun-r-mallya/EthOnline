"use client";
// Note to other team
// Use this component to learn how to include all the wallet functionalities you need in your app.
import { useAppStore } from "@/store/useAppStore";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Example = () => {
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

  return (
    <div>
        {loginView}
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Example;
