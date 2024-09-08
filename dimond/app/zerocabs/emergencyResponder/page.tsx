"use client";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Web3Context } from "@/store/context/web3context";
import AcceptEmergencyButton from "@/components/basic/AcceptEmergency";

// DriverPage component
const DriverPage = () => {
  const { account, contract, connectWallet } = useContext(Web3Context);
  const [emergencies, setEmergencies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeContractAndFetchEmergencies = async () => {
      try {
        await connectWallet();

        if (!contract || !account) {
          console.error("Contract or account is not initialized");
          return;
        }

        setLoading(true);
        const allEmergencies = await contract.methods.getAllEmergencies().call();
        setEmergencies(allEmergencies);
      } catch (error) {
        console.error("Error fetching emergencies:", error);
        setError("Failed to fetch emergencies. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    initializeContractAndFetchEmergencies();
  }, [account, contract]);

  const handleEmergency = async (rideId: number) => {
    try {
      setLoading(true);
      await contract.methods.acceptEmergency(rideId).send({ from: account });
      console.log(`Accepted emergency for ride ID: ${rideId}`);
    } catch (err) {
      console.error("Error accepting emergency:", err);
      setError("Failed to accept emergency. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-start gap-20 ">
      <div className="flex flex-col w-[608px] px-[18px] py-[32px] items-start gap-[18px] self-stretch">
        <p className="text-[64px] font-semibold text-center text-white">
          Emergency Dashboard
        </p>
      <AcceptEmergencyButton rideId={0} />
        </div>
    </div>
  );
};

export default DriverPage;
