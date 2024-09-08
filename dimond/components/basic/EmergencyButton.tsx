"use client";
import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Web3Context } from "@/store/context/web3context";

// EmergencyButton component
const EmergencyButton = () => {
  const { account, contract } = useContext(Web3Context);
  const [loading, setLoading] = useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleEmergency = async () => {
    if (!contract) {
      console.error("Contract is not initialized");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      await contract.methods.triggerEmergency(0).send({ from: account });

      console.log("Emergency alert sent successfully");
    } catch (err) {
      console.error("Error sending emergency alert:", err);
      setError("Failed to send emergency alert. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <Button
        onClick={handleEmergency}
        disabled={loading}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        {loading ? "Sending..." : "Emergency Alert"}
      </Button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default EmergencyButton;
