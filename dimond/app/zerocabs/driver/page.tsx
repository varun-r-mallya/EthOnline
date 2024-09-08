"use client";
import React, { useContext, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Car, DollarSign, Star, MapPin } from "lucide-react";
import Chat from "@/components/svgs/Chat";
import { Web3Context } from "@/store/context/web3context";
import { get } from "http";
import { getVehicleLoc } from "@/store/getVehicledata";
import { useRouter } from "next/router";

const DriverPage = () => {
  const [isOnline, setIsOnline] = React.useState(false);
  const [isAvailable, setIsAvailable] = React.useState(false);
  const [rides, setRides] = React.useState([]);
  const [completedRides, setCompletedRides] = React.useState(false);
  const [currentRide, setCurrentRide] = React.useState({
    rideId: 0,
    driver: "",
    rider: "",
    startLocation: null,
    endLocation: null,
    fare: 0,
  });
  const { account, contract, connectWallet } = useContext(Web3Context);
  useEffect(() => {
    let subscription: any;
  
    const initializeContractAndSubscribe = async () => {
      try {
        await connectWallet();
        
        if (contract && contract.events) {
          subscription = contract.events
            .RideCreated({
              filter: { driver: account }, // Listen only for this specific driver
            })
            .on("data", async (event: any) => {
              console.log("Ride Created Event:", event);
              const { rideId, driver, rider, startLocation, endLocation, fare } =
                event.returnValues;
  
              setCurrentRide({
                rideId,
                driver,
                rider,
                startLocation,
                endLocation,
                fare,
              });
            })
            .on("error", (error: any) => {
              console.error("Error subscribing to event:", error);
            });
        } else {
          console.error("Contract or contract.events is not available");
        }
      } catch (error) {
        console.error("Error initializing contract:", error);
      }
    };
  
    initializeContractAndSubscribe();
  
    // Clean up WebSocket connection when component unmounts
    return () => {
      if (subscription) {
        subscription.unsubscribe((error: any, success: boolean) => {
          if (success) {
            console.log("Successfully unsubscribed from RideCreated event");
          }
        });
      }
    };
  }, [account, contract]);
  
  useEffect(() => {
    if (contract && account) {
      const fetchRides = async () => {
        const currentRide = await contract.methods.getCurrentRide().call({ from: account });
        setCurrentRide(currentRide);
      };
  
      fetchRides();
    }
  }
  , [contract, account]);

  const getAllRides = () => {
    console.log("Getting all rides");
  };
  const getCompletedRides = () => {
    console.log("Getting completed rides");
  };
  const getEarnings = () => {
    console.log("Getting earnings");
  };
  const getTrips = () => {
    console.log("Getting trips");
  };
  const getVehicleDetails = () => {
    console.log("Getting vehicle details");
  };
  const getMessages = () => {
    console.log("Getting messages");
  };
  const acceptRide=()=>{
    console.log("Accepting Ride");

    //[TODO] Add logic to accept the ride 

  }
  return (
    <div className="flex justify-center items-start gap-20 ">
      <div className="flex flex-col w-[608px] px-[18px] py-[32px] items-start gap-[18px] self-stretch">
        <p className="text-[64px] font-semibold text-center text-white">
          Driver Dashboard
        </p>
        <p className="text-[32px] font-medium text-center text-[#848484]">
          Rides{" "}
        </p>
        <div className="flex flex-col justify-start items-start w-[499px] gap-3">
          <div className="flex flex-col justify-center items-start self-stretch flex-grow-0 flex-shrink-0 gap-2.5 px-[31px] py-2 rounded-[10px] border border-white">
            <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-2.5">
              <div className="flex justify-start items-center flex-grow relative gap-5 py-[9px]">
                <p className="flex-grow-0 flex-shrink-0 text-xl text-left text-white">
                  {currentRide.startLocation} to {currentRide.endLocation}
                </p>
              </div>
              <p className="flex-grow-0 flex-shrink-0 text-xl text-center text-[#bafd02] z-10 cursor-pointer  " onClick={acceptRide}>
                Accept
              </p>
            </div>
          </div>
          {rides.map((ride, index) => (
            <div
              key={index}
              className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-2.5 px-[31px] py-2 rounded-[10px] border border-white"
            >
              <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-2.5">
                <div className="flex justify-start items-center flex-grow relative gap-5 py-[9px]">
                  <p className="flex-grow-0 flex-shrink-0 text-xl text-left text-white">
                    A to B
                  </p>
                </div>
                <p className="flex-grow-0 flex-shrink-0 text-xl text-center text-[#bafd02]">
                  Accept
                </p>
              </div>{" "}
            </div>
          ))}
        </div>
        <p className="text-[32px] font-medium text-center text-[#848484]">
          Completed Rides
        </p>
        <div className="flex flex-col justify-start items-center w-[529px] h-[195px] relative gap-1.5 px-[23px] py-[17px] rounded-[11px] bg-gradient-to-b from-[#1b211f] to-[#101517]">
          <div className="flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 relative">
            <p className="flex-grow w-[431px] text-xl font-medium text-left text-[#bababa]">
              City Center to Airport
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
          <div className="flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 relative">
            <p className="flex-grow w-[430px] text-xl font-medium text-left text-[#bababa]">
              City Center to Airport
            </p>
            <p className="flex-grow-0 flex-shrink-0 text-base font-medium text-left text-[#7d7d7d]">
              Aug 18
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-20">
        <div className="flex gap-2 justify-end items-center mb-2 ">
          <div className="flex justify-start items-center relative gap-[8.454545021057129px] ">
            <svg
              width="30"
              height="28"
              viewBox="0 0 30 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-grow-0 flex-shrink-0"
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                d="M15.2182 0L18.6349 10.5155H29.6915L20.7465 17.0144L24.1632 27.5299L15.2182 21.031L6.27316 27.5299L9.68985 17.0144L0.744831 10.5155H11.8015L15.2182 0Z"
                fill="#BAFD02"
              ></path>
            </svg>
            <svg
              width="30"
              height="28"
              viewBox="0 0 30 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-grow-0 flex-shrink-0"
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                d="M15.1091 0L18.5258 10.5155H29.5824L20.6374 17.0144L24.0541 27.5299L15.1091 21.031L6.16406 27.5299L9.58075 17.0144L0.635731 10.5155H11.6924L15.1091 0Z"
                fill="#BAFD02"
              ></path>
            </svg>
            <svg
              width="30"
              height="28"
              viewBox="0 0 30 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-grow-0 flex-shrink-0"
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                d="M15 0L18.4167 10.5155H29.4733L20.5283 17.0144L23.945 27.5299L15 21.031L6.05496 27.5299L9.47165 17.0144L0.52663 10.5155H11.5833L15 0Z"
                fill="#BAFD02"
              ></path>
            </svg>
            <svg
              width="30"
              height="28"
              viewBox="0 0 30 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-grow-0 flex-shrink-0"
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                d="M14.8909 0L18.3076 10.5155H29.3643L20.4192 17.0144L23.8359 27.5299L14.8909 21.031L5.94589 27.5299L9.36258 17.0144L0.417561 10.5155H11.4742L14.8909 0Z"
                fill="#BAFD02"
              ></path>
            </svg>
            <svg
              width="30"
              height="28"
              viewBox="0 0 30 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-grow-0 flex-shrink-0"
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                d="M14.7818 1.36797L17.7965 10.6461L17.8914 10.9382H18.1985H27.9541L20.0617 16.6725L19.8132 16.853L19.9081 17.1451L22.9228 26.4232L15.0303 20.689L14.7818 20.5085L14.5333 20.689L6.64086 26.4232L9.65552 17.1451L9.75043 16.853L9.50196 16.6725L1.60948 10.9382H11.3651H11.6722L11.7672 10.6461L14.7818 1.36797Z"
                stroke="white"
                strokeWidth="0.845455"
              ></path>
            </svg>
          </div>
          (110 reviews)
        </div>
        <div className="flex gap-2 justify-end items-center mb-2 mt-10">
          <div className="flex flex-col justify-start items-center w-[258px] relative px-[13px] py-[17px] rounded-[11px] bg-gradient-to-b from-[#1b211f] to-[#101517]">
            <p className="flex-grow-0 flex-shrink-0 text-5xl text-center text-[#bcbcbc]">
              $120.05
            </p>
            <p className="self-stretch flex-grow-0 flex-shrink-0 w-[232px] text-[32px] font-semibold text-center text-[#bafd02]">
              Earnings
            </p>
            <p className="self-stretch flex-grow-0 flex-shrink-0 w-[232px] text-2xl text-center text-[#bcbcbc]">
              earned today
            </p>
          </div>
          <div className="flex flex-col justify-start items-center w-[258px] relative px-[13px] py-[17px] rounded-[11px] bg-gradient-to-b from-[#1b211f] to-[#101517]">
            <p className="flex-grow-0 flex-shrink-0 text-5xl text-center text-[#bcbcbc]">
              124
            </p>
            <p className="flex-grow-0 flex-shrink-0 w-[180px] text-[32px] font-semibold text-center text-[#bafd02]">
              Trips
            </p>
            <p className="self-stretch flex-grow-0 flex-shrink-0 w-[232px] text-2xl text-center text-[#bcbcbc]">
              with us
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 justify-center items-start mb-2 mt-10">
          <p className="text-[32px] font-medium text-center text-[#9c9c9c]">
            Vehicle Details
          </p>
          <div className="flex flex-col justify-start items-center w-[529px] h-[159px] relative gap-1.5 px-[23px] py-[17px] rounded-[11px] bg-gradient-to-b from-[#1b211f] to-[#101517]">
            <p className="self-stretch flex-grow-0 flex-shrink-0 w-[483px] text-xl font-medium text-left text-[#bababa]">
              ID - 3
            </p>
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
            <p className="self-stretch flex-grow-0 flex-shrink-0 w-[483px] text-xl font-medium text-left text-[#bababa]">
              Model - Maruti Zusuki AB12
            </p>
            <p className="self-stretch flex-grow-0 flex-shrink-0 w-[483px] text-xl font-medium text-left text-[#bababa]">
              Last maintenance - 03 March 2024
            </p>
          </div>
        </div>
        <div className="flex justify-start items-center w-[529px] h-[65px] relative gap-2.5 px-[35px] py-2 rounded-tl-2xl rounded-tr-2xl bg-gradient-to-b from-[#1b211f] to-[#101517]">
          <a href="/messaging">
          <div className="flex justify-start items-center flex-grow relative gap-5 px-[19px] py-[9px]">
            <Chat />
            <p className="flex-grow-0 flex-shrink-0 text-xl text-center text-white">
              Your messages
            </p>
          </div>
          </a>
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
      </div>
    </div>
  );
};

export default DriverPage;
