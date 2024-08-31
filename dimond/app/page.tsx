"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CarFront, ChevronRight, Eye, Menu, Network, Shield } from "lucide-react";
import DecentralizedNetwork from "@/components/svgs/DecentralizedNetwork";
import Secure from "@/components/svgs/Secure";
import Opacity from "@/components/svgs/Opacity";
import { ElipseCentre, ElipseLeft, ElipseRight } from "@/components/svgs/Elipse";
import { NavBar } from "@/components/basic/NavBar";
import { Footer } from "@/components/basic/Footer";

const HomePage = () => {
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

        <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center space-y-12">
        <p className="text-7xl font-semibold text-center text-white">
          <span className="text-7xl font-semibold text-center text-white">Welcome to the future</span
          ><br /><span className="text-7xl font-semibold text-center text-white">of ride sharing.</span>
        </p>
        <p className="text-2xl font-light text-center text-[#8d8d8d]">
          <span className="text-2xl font-light text-center text-[#8d8d8d]"
          >Experience decentralized transportation</span
          ><br /><span className="text-2xl font-light text-center text-[#8d8d8d]"
          >powered by blockchain technology.</span
          >
        </p>
        <div className="w-[259px] h-[63px] relative overflow-hidden rounded-[10px] bg-[#bafd02] cursor-pointer">
          <a href="/login">

            <p className="absolute left-14 top-[17px] text-xl font-medium text-left text-black cursor-pointer">Get Started</p>
            <svg
              width="12"
              height="19"
              viewBox="0 0 12 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-[210px] top-[22px]"
              preserveAspectRatio="none"
            >
              <path d="M2 2L9 9.5L2 17" stroke="black" strokeWidth="3" strokeLinecap="round"></path>
            </svg>
          </a>
        </div>
        <div className="flex gap-8">
          <div
            className="flex flex-col justify-start items-center w-[258px] relative gap-[7px] px-[13px] py-[17px] rounded-[11px] bg-gradient-to-b from-[#1b211f] to-[#101517]"
          >
            <div
              className="flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 w-[139px] relative gap-[7px]"
            >
              <DecentralizedNetwork />

              <p
                className="self-stretch flex-grow-0 flex-shrink-0 w-[139px] text-xl font-medium text-left text-[#bafd02]"
              >
                Decentralized
              </p>
            </div>
            <p
              className="self-stretch flex-grow-0 flex-shrink-0 w-[232px] text-base font-light text-center text-[#bcbcbc]"
            >
              No central authority. Every transaction is peer-to-peer, ensuring security in ride.    </p>
          </div>
          <div
            className="flex flex-col justify-start items-center w-[258px] relative gap-[7px] px-[13px] py-[17px] rounded-[11px] bg-gradient-to-b from-[#1b211f] to-[#101517]"
          >
            <div
              className="flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 w-[139px] relative gap-[7px]"
            >
              <Secure />

              <p
                className="self-stretch flex-grow-0 flex-shrink-0 w-[139px] text-xl font-medium text-center text-[#bafd02]"
              >
                Secure
              </p>
            </div>
            <p
              className="self-stretch flex-grow-0 flex-shrink-0 w-[232px] text-base font-light text-center text-[#bcbcbc]"
            >
              Ride with confidence. Your data is securely encrypted on the blockchain.     </p>
          </div>
          <div
            className="flex flex-col justify-start items-center w-[258px] relative gap-[7px] px-[13px] py-[17px] rounded-[11px] bg-gradient-to-b from-[#1b211f] to-[#101517]"
          >
            <div
              className="flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 w-[139px] relative gap-[7px]"
            >
              <Opacity />
              <p
                className="self-stretch flex-grow-0 flex-shrink-0 w-[139px] text-xl font-medium text-left text-[#bafd02]"
              >
                Transparent
              </p>
            </div>
            <p
              className="self-stretch flex-grow-0 flex-shrink-0 w-[232px] text-base font-light text-center text-[#bcbcbc]"
            >
              No hidden fees. Fair pricing that benefits both drivers and riders.     </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
