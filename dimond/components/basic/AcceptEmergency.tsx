"use client";
import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Web3Context } from "@/store/context/web3context";

// AcceptEmergencyButton component
const AcceptEmergencyButton = ({ rideId }: { rideId: number }) => {
  const { account, contract } = useContext(Web3Context);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAcceptEmergency = async () => {
    if (!contract) {
      console.error("Contract is not initialized");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await contract.methods.acceptEmergency(0).send({ from: account });

      console.log("Emergency accepted successfully");
    } catch (err) {
      console.error("Error accepting emergency:", err);
      setError("Failed to accept emergency. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <Button
        onClick={handleAcceptEmergency}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {loading ? "Accepting..." : "Accept Emergency"}
      </Button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default AcceptEmergencyButton;
