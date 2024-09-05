import { useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google"; //FUCK YOU

import { useAppStore } from "@/store/useAppStore";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CarFront as Taxi, ArrowLeft, ChevronRight, LogIn } from "lucide-react";
import { ElipseCentre, ElipseLeft, ElipseRight } from "@/components/svgs/Elipse";
import { NavBar } from "@/components/basic/NavBar";
import { Footer } from "@/components/basic/Footer";
import Loading from "./Loading";
import "./App.css";

import { useRouter } from "next/navigation";
import ZeroCabs from "@/components/svgs/ZeroCabs";
import Divider from "@/components/svgs/Divider";


const verifier = "pls-work-or-ill-kms";

const clientId =
  "BGghOL23kS72SpddOkef6Btp2zrWsGa2z860YGYJwU-brZrKJhPyEcN_ZeIj07HdeUiFcaIQIsf2hUSbEhOak98"; // get from https://dashboard.web3auth.io

function App() {
  const {
    web3authSFAuth,
    provider,
    isLoggingIn,
    initWeb3Auth,
    onSuccess,
    loginWithPasskey,
  } = useAppStore();

  const router = useRouter();

  useEffect(() => {
    initWeb3Auth();
  }, [initWeb3Auth]);

  const logoutView = (
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
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center space-y-12">

        <div
          className="flex flex-col justify-start items-center w-[448px] h-[590px] relative gap-[39px] px-[13px] py-6 rounded-[11px] bg-gradient-to-b from-[#1b211f]/50 to-[#101517]/50"
        >
          <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-[22px]">
            <div
              className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 h-9 w-9 relative gap-[3.495145797729492px] px-[9.436893463134766px] py-[12.233010292053223px] rounded-[18px] border-[4.89px] border-[#bafd02]"
            >
              <ZeroCabs />
            </div>
            <p className="flex-grow-0 flex-shrink-0 text-4xl font-medium text-center text-[#bafd02]">Sign In</p>
          </div>
          <Divider />
          <div
            className="flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 relative gap-[18px]"
          >
            <p className="flex-grow-0 flex-shrink-0 text-base font-light text-left text-[#919191]">
              Sign In with your Google Account
            </p>
            <div
              className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-3 px-16 py-[13px] "
            >
              {isLoggingIn ? (
                <Loading />
              ) : (
                <GoogleLogin onSuccess={onSuccess} useOneTap />)}
            </div>
          </div>
          <Divider />
          <div
            className="flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 relative gap-[18px]"
          >
            <p className="flex-grow-0 flex-shrink-0 text-base font-light text-left text-[#919191]">
              Or login with a passkey u already have
            </p>
            <Button
              className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-[19px] px-6 py-3 rounded-[10px] bg-[#bafd02]"
              onClick={loginWithPasskey}
            >
              <p className="flex-grow-0 flex-shrink-0 text-xl font-medium text-left text-black">
                Login with Passkey
              </p>
              <svg
                width="12"
                height="18"
                viewBox="0 0 12 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-grow-0 flex-shrink-0"
                preserveAspectRatio="none"
              >
                <path d="M2 1.5L9 9L2 16.5" stroke="black" strokeWidth="3" strokeLinecap="round"></path>
              </svg>
            </Button>
          </div>
          <Divider />
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
        </div>
      </main>

      <Footer />

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
