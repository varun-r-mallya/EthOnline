"use client";
import React, { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CarTaxiFront, User, Shield } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { motion } from "framer-motion";
import { Car, Security, Steering } from "@/components/svgs/choicePage";
import { SignProtocolClient, SpMode, EvmChains } from "@ethsign/sp-sdk"; // Ensure these are imported correctly

const RoleChoicePage = () => {
  const {
    web3authSFAuth,
    provider,
    initWeb3Auth,
    getUserInfo,
    getAccounts,
  } = useAppStore();

  const [userInfo, setUserInfo] = useState<any>();
  const [signer, setSigner] = useState<string | null>(null);
  const [attestationResult, setAttestationResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  let signProtocolClient: SignProtocolClient | null = null;

  // Initialize Web3Auth and fetch user info
  useEffect(() => {
    initWeb3Auth();
    if (web3authSFAuth) {
      getUserInfo().then((info) => setUserInfo(info));
    }
  }, [web3authSFAuth, initWeb3Auth]);

  // Initialize SignProtocolClient when web3auth and provider are available
  const initializeClient = async () => {
    if (web3authSFAuth && provider) {
      signProtocolClient = new SignProtocolClient(SpMode.OnChain, {
        chain: EvmChains.sepolia,
        account: undefined,
      });
    } else {
      console.error("Web3Auth or provider is not initialized.");
    }
  };

  // Create attestation function
  const create = async (contractDetails: string, signer: string) => {
    if (!signProtocolClient) {
      console.error("SignProtocolClient is not initialized.");
      return;
    }

    try {
      const res = await signProtocolClient.createAttestation({
        schemaId: "0x1c6",
        data: {
          contractDetails,
          signer,
        },
        indexingValue: signer.toLowerCase(),
      });
      console.log("Attestation created:", res);
      return res;
    } catch (error) {
      console.error("Error creating attestation:", error);
      throw new Error("Failed to create attestation");
    }
  };

  // Call createAttestation when page loads
  useEffect(() => {
    if (web3authSFAuth) {
      getAccounts().then((data) => {
        setSigner(data[0]); // Ensure signer is fetched correctly
        initializeClient();
      });
    }
  }, [web3authSFAuth, getAccounts]);

  // Handle attestation creation
  const handleCreateAttestation = async () => {
    if (!signer) {
      setError("Signer's address is not available.");
      return;
    }

    try {
      const result = await create("Sample Contract Details", signer);
      setAttestationResult(result);
    } catch (err) {
      setError("An error occurred while creating the attestation.");
    }
  };

  // Automatically trigger the attestation creation on page load
  useEffect(() => {
    if (signer) {
      handleCreateAttestation();
    }
  }, [signer]);

  return (
    <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center space-y-12">
      <p className="text-7xl font-semibold text-center text-white mb-16">
        Welcome {userInfo?.name}!
      </p>
      {/* <Card className="w-full max-w-md bg-gray-800 border-gray-700">
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
      </Card> */}
      <div className="flex justify-start items-start gap-[19px]">
      <motion.div
            className="cursor-pointer flex flex-col justify-center items-center h-[250px]  w-[258px] relative gap-[7px] px-[13px] py-[17px] rounded-[11px] bg-gradient-to-b from-[#1b211f] to-[#101517]"
            whileHover={{ scale: 1.05, translateY: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
          <a href="/zerocabs/rider">
            <div
              className="flex flex-col justify-start items-center gap-2"
            >
              <Car />
              <p
                className="text-[32px] font-semibold text-center text-[#bafd02]"
              >
                Book Ride
              </p>
            </div>
            <p
              className="text-lg font-extralight text-center text-[#bcbcbc]"
            >
              Request a ride to your destination.
            </p></a>
        </motion.div>
   

        <motion.div
            className="cursor-pointer flex flex-col justify-center items-center h-[250px]  w-[258px] relative gap-[7px] px-[13px] py-[17px] rounded-[11px] bg-gradient-to-b from-[#1b211f] to-[#101517]"
            whileHover={{ scale: 1.05, translateY: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
          <a href="/zerocabs/driver">

            <div
              className="flex flex-col justify-start items-center gap-2"
            >
              <Steering />            <p
                className="text-[32px] font-semibold text-center text-[#bafd02]"
              >
                Drive
              </p>
            </div>
            <p
              className="text-lg font-extralight text-center text-[#bcbcbc]"
            >
              Offer rides and earn crypto
            </p></a>
        </motion.div>

        <motion.div
            className="cursor-pointer flex flex-col justify-center items-center h-[250px]  w-[258px] relative gap-[7px] px-[13px] py-[17px] rounded-[11px] bg-gradient-to-b from-[#1b211f] to-[#101517]"
            whileHover={{ scale: 1.05, translateY: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
          <a href="/zerocabs/responder">

            <div
              className="flex flex-col justify-start items-center gap-2"
            >
              <Security />            <p
                className="text-2xl font-semibold text-center text-[#bafd02]"
              >
                Emergency Responder
              </p>
            </div>
            <p
              className="text-lg font-extralight text-center text-[#bcbcbc]"
            >
              Provide emergency response services
            </p></a>
        </motion.div>
      </div>

    </main>
  );
};

export default RoleChoicePage;
