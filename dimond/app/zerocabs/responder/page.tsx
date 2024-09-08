"use client";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Web3Context } from "@/store/context/web3context";

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

        {/* Display loading message */}
        {loading && <p>Loading emergencies...</p>}

        {/* Display error message */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Render emergencies */}
        {emergencies.length > 0 ? (
          <div className="flex flex-col gap-4">
            {emergencies.map((emergency, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg">
                <p className="text-white">
                  <strong>Ride ID:</strong> {emergency.ride.rideId}
                </p>
                <p className="text-white">
                  <strong>Driver:</strong> {emergency.ride.driver}
                </p>
                <p className="text-white">
                  <strong>Rider:</strong> {emergency.ride.rider}
                </p>
                <p className="text-white">
                  <strong>Start Location:</strong> {emergency.ride.startLocation}
                </p>
                <p className="text-white">
                  <strong>End Location:</strong> {emergency.ride.endLocation}
                </p>
                <p className="text-white">
                  <strong>Fare:</strong> {emergency.ride.fare}
                </p>

                {/* Accept Emergency Button */}
                <Button
                  onClick={() => handleEmergency(emergency.ride.rideId)}
                  disabled={loading}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                >
                  {loading ? "Processing..." : "Handle Emergency"}
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white">No emergencies found.</p>
        )}
      </div>
    </div>
  );
};

export default DriverPage;
