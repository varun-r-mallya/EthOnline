"use client";
import React, { useContext, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Clock, CreditCard, User } from "lucide-react";
import Chat from "@/components/svgs/Chat";
import { Location, MyLocation } from "@/components/svgs/Location";
import ChatComponent from "@/components/basic/ChatComponent";
import { Web3Context } from "@/store/context/web3context";
import { Location as TypeLocation, Ride } from "@/lib/types";
import LocationPicker from "@/components/basic/LocationPicker";
import CurrentRideMapModal from "@/components/basic/LocationTracker";
import { getVehicleLoc } from "@/store/getVehicledata";

export const getLocationString = async (location: TypeLocation) => {
  //[TODO ] get the location string from the location object
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${location.latitude}&lon=${location.longitude}&format=json`;
  const response = await fetch(url);
  console.log(response.json());

  return "not figured";
};

const ClientPage = () => {
  interface RideData {
    driver: string;
    rider: string;
    startLocation: { latitude: number; longitude: number };
    endLocation: { latitude: number; longitude: number };
    currentLocation: { latitude: number; longitude: number };
  }
  const [driverLocation, setDriverLocation] = useState<TypeLocation>({
    latitude: 0,
    longitude: 0,
  });

  const [pickupLocation, setPickupLocation] = useState<TypeLocation>({
    latitude: 0,
    longitude: 0,
  });
  //[TODO ] set the destination location initially to pickup location
  const [destination, setDestination] = useState<TypeLocation>({
    latitude: 0,
    longitude: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRideData, setCurrentRideData] = useState<RideData>({
    driver: "John Doe",
    rider: "Jane Smith",
    startLocation: { latitude: 40.7128, longitude: -74.006 },
    endLocation: { latitude: 40.7484, longitude: -73.9857 },
    currentLocation: { latitude: 40.7306, longitude: -73.9352 },
  });

  const [rides, setRides] = React.useState<Ride[]>([]);
  const [driver, setDriver] = React.useState(
    "0xb92297Fc47A5088401473CdCa7aae4E3D08e70B6"
  );
  const { account, contract, connectWallet } = useContext(Web3Context);
  const [rideCount, setRideCount] = React.useState(20);
  const [amountSaved, setAmountSaved] = React.useState(29.04);
  useEffect(() => {
    setPickupLocation({
      latitude: 12.9,
      longitude: 84.23,
    });
  }, []);
  const fetchVehicleLoc = async (tokenId: number) => {
    const response = await fetch("/api/getVehicle/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tokenId }),
    });

    const data = await response.json();
    console.log(data);
    setDriverLocation({
      latitude: data.lat,
      longitude: data.long,
    });
    setPickupLocation({
      latitude: parseFloat((data.lat + Math.random() * 0.01).toFixed(2)),
      longitude: parseFloat((data.long + Math.random() * 0.01).toFixed(2)),
    });
  };
  useEffect(() => {
    fetchVehicleLoc(3);
  }, []);
  useEffect(() => {
    console.log("Driver location:", driverLocation);
  }, [driverLocation]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentRideData((prevData) => ({
        ...prevData,
        currentLocation: {
          latitude:
            prevData.currentLocation.latitude + (Math.random() - 0.5) * 0.001,
          longitude:
            prevData.currentLocation.longitude + (Math.random() - 0.5) * 0.001,
        },
      }));
    }, 5000); // Update every 5 seconds
    return () => clearInterval(intervalId);
  }, []);
  const handleCurrentRide = () => {
    setIsModalOpen(true);
  };
  const findDrivers = async () => {
    console.log("Finding drivers");
    const fare = 80;
    console.log(contract, account);

    //[TODO] fucniton to get the driver address from contract and dimo
    if (contract && account) {
      const result = await contract.methods
        .createRide(
          driver,
          [
            pickupLocation.latitude ? pickupLocation.latitude.toString() : "",
            pickupLocation.longitude ? pickupLocation.longitude.toString() : "",
          ],
          [
            destination.latitude ? destination.latitude.toString() : "",
            destination.longitude ? destination.longitude.toString() : "",
          ],
          fare
        )
        .send({ from: account });
      console.log("Contract result:", result);
    }
  };

  return (
    <div className="flex justify-center items-start gap-20 ">
      <div className="flex flex-col w-[608px] px-[18px] py-[32px] items-start gap-[18px] self-stretch">
        <p className="text-[64px] font-semibold text-center text-white">
          Welcome rider
        </p>
        <div className="flex flex-col justify-start items-start w-[521px] gap-4">
          <div className="flex flex-col justify-center items-start self-stretch flex-grow-0 flex-shrink-0 gap-2.5 p-2 rounded-[10px] border border-white">
            <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-5 px-[19px] py-[9px] ">
              <MyLocation />
              <input
                className="flex-grow text-lg text-white bg-transparent border-none focus:outline-none"
                type="text"
                value={
                  (pickupLocation.latitude
                    ? pickupLocation.latitude.toString()
                    : "") +
                  "," +
                  (pickupLocation.longitude
                    ? pickupLocation.longitude.toString()
                    : "")
                }
                disabled
                placeholder="Pickup location"
              />
            </div>
          </div>
          <LocationPicker
            center={pickupLocation}
            destination={destination}
            setDestination={setDestination}
          />

          <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 gap-4">
            <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-[19px] px-6 py-3 rounded-[10px] bg-[#bafd02] hover:bg-[#87b509] cursor-pointer">
              <p
                className="flex-grow-0 flex-shrink-0 text-xl font-medium text-left text-black"
                onClick={findDrivers}
              >
                Find Drivers
              </p>
              <svg
                width={12}
                height={18}
                viewBox="0 0 12 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-grow-0 flex-shrink-0"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 1.5L9 9L2 16.5"
                  stroke="black"
                  strokeWidth={3}
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-[19px] px-6 py-3 rounded-[10px] border border-white hover:bg-[#87b509] cursor-pointer text-[#ccc] hover:text-black">
              <p className="flex-grow-0 flex-shrink-0 text-xl font-medium text-left ">
                or Schedule a ride
              </p>
            </div>
          </div>
        </div>
        <p className="text-[32px] font-medium text-center text-[#848484] gap-2">
          Completed Rides
        </p>
        <Button
          className="flex items-center gap-2.5 p-4 rounded-lg border border-gray-200 bg-white shadow-sm cursor-pointer hover:bg-gray-50 cursor-pointer z-10 text-black"
          onClick={handleCurrentRide}
        >
          Current Ride
        </Button>
        <CurrentRideMapModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          rideData={currentRideData}
        />{" "}
        <div className="flex flex-col justify-start items-center w-[529px] h-[195px] relative gap-1.5 px-[23px] py-[17px] rounded-[11px] bg-gradient-to-b from-[#1b211f] to-[#101517]">
          {rides.map((ride) => (
            <>
              <div className="flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 relative">
                <p className="flex-grow w-[431px] text-xl font-medium text-left text-[#bababa]">
                  {getLocationString(ride.startLocation)} to{" "}
                  {getLocationString(ride.endLocation)}
                </p>
                <p className="flex-grow-0 flex-shrink-0 text-base font-medium text-left text-[#7d7d7d]">
                  Aug 21
                </p>
              </div>
              <svg
                width="483"
                height="2"
                viewBox="0 0 483 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-grow-0 flex-shrink-0"
                preserveAspectRatio="none"
              >
                <path
                  d="M1 1L482 1.00004"
                  stroke="#3F3F3F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="1 8"
                ></path>
              </svg>
            </>
          ))}
        </div>{" "}
      </div>
      <div className="flex flex-col mt-20">
        <div className="flex gap-2 justify-end items-center mb-2 mt-10">
          <div className="flex flex-col justify-start items-center w-[258px] relative px-[13px] py-[17px] rounded-[11px] bg-gradient-to-b from-[#1b211f] to-[#101517]">
            <p className="flex-grow-0 flex-shrink-0 text-5xl text-center text-[#bcbcbc]">
              {rideCount}
            </p>
            <p className="self-stretch flex-grow-0 flex-shrink-0 w-[232px] text-[32px] font-semibold text-center text-[#bafd02]">
              Rides Taken!
            </p>
            <p className="self-stretch flex-grow-0 flex-shrink-0 w-[232px] text-2xl text-center text-[#bcbcbc]">
              with ZeroCabs
            </p>
          </div>

          <div className="flex flex-col justify-start items-center w-[258px] relative px-[13px] py-[17px] rounded-[11px] bg-gradient-to-b from-[#1b211f] to-[#101517]">
            <p className="flex-grow-0 flex-shrink-0 text-5xl text-center text-[#bcbcbc]">
              ${amountSaved}
            </p>
            <p className="flex-grow-0 flex-shrink-0 w-[180px] text-[32px] font-semibold text-center text-[#bafd02]">
              Saved!
            </p>
            <p className="self-stretch flex-grow-0 flex-shrink-0 w-[232px] text-2xl text-center text-[#bcbcbc]">
              with us
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 justify-center items-start mb-2 mt-10">
          <p className="text-[32px] font-medium text-center text-[#9c9c9c]">
            Scheduled Rides
          </p>
          <div className="flex flex-col justify-start items-center w-[529px] h-[195px] relative gap-1.5 px-[23px] py-[17px] rounded-[11px] bg-gradient-to-b from-[#1b211f] to-[#101517]">
            <div className="flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 relative">
              <p className="flex-grow w-[404px] text-xl font-medium text-left text-[#bababa]">
                City Center to Airport
              </p>
              <p className="flex-grow-0 flex-shrink-0 text-base font-medium text-left text-[#7d7d7d]">
                in 3 hours
              </p>
            </div>
            <svg
              width={483}
              height={2}
              viewBox="0 0 483 2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-grow-0 flex-shrink-0"
              preserveAspectRatio="none"
            >
              <path
                d="M1 1L482 1.00004"
                stroke="#3F3F3F"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="1 8"
              />
            </svg>
            <div className="flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 relative">
              <p className="flex-grow w-[404px] text-xl font-medium text-left text-[#bababa]">
                City Center to Airport
              </p>
              <p className="flex-grow-0 flex-shrink-0 text-base font-medium text-left text-[#7d7d7d]">
                in 8 hours
              </p>
            </div>
          </div>
        </div>
        <a href="/messaging">
        <div className="flex justify-start items-center w-[529px] h-[65px] relative gap-2.5 px-[35px] py-2 rounded-tl-2xl rounded-tr-2xl bg-gradient-to-b from-[#1b211f] to-[#101517]">
          {/* <div className="flex justify-start items-center flex-grow relative gap-5 px-[19px] py-[9px] cursor-pointer">
            <Chat />
            <p className="flex-grow-0 flex-shrink-0 text-xl text-center text-white">Your messages</p>
          </div> */}
          <ChatComponent />
          <svg
            width={18}
            height={11}
            viewBox="0 0 18 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-grow-0 flex-shrink-0"
            preserveAspectRatio="none"
          >
            <path
              d="M17 9.5L9 1.5L1 9.5"
              stroke="white"
              strokeWidth={2}
              strokeLinecap="round"
            />
          </svg>
        </div>
        </a>
      </div>
    </div>
  );
};

export default ClientPage;
