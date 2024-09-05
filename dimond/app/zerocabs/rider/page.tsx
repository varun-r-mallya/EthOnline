import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Clock, CreditCard, User } from 'lucide-react';
import Chat from '@/components/svgs/Chat';
import { Location, MyLocation } from '@/components/svgs/Location';
import ChatComponent from '@/components/basic/ChatComponent';

const ClientPage = () => {
  return (
    <div className='flex justify-center items-start gap-20 '>
      <div className='flex flex-col w-[608px] px-[18px] py-[32px] items-start gap-[18px] self-stretch'>
        <p className="text-[64px] font-semibold text-center text-white">Welcome rider</p>
        <div className="flex flex-col justify-start items-start w-[521px] gap-4">
          <div className="flex flex-col justify-center items-start self-stretch flex-grow-0 flex-shrink-0 gap-2.5 p-2 rounded-[10px] border border-white">
            <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-5 px-[19px] py-[9px] ">
              <MyLocation />
              <p className="flex-grow-0 flex-shrink-0 text-xl text-center text-[#6c6c6c]">
                Pickup location
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-start self-stretch flex-grow-0 flex-shrink-0 gap-2.5 p-2 rounded-[10px] border border-white">
            <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-5 px-[19px] py-[9px]">
              <Location />              <p className="flex-grow-0 flex-shrink-0 text-xl text-center text-[#6c6c6c]">Destination</p>
            </div>
          </div>
          <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 gap-4">
            <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-[19px] px-6 py-3 rounded-[10px] bg-[#bafd02] hover:bg-[#87b509] cursor-pointer">
              <p className="flex-grow-0 flex-shrink-0 text-xl font-medium text-left text-black">
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
                <path d="M2 1.5L9 9L2 16.5" stroke="black" stroke-width={3} stroke-linecap="round" />
              </svg>
            </div>
            <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-[19px] px-6 py-3 rounded-[10px] border border-white hover:bg-[#87b509] cursor-pointer text-[#ccc] hover:text-black">
              <p className="flex-grow-0 flex-shrink-0 text-xl font-medium text-left ">
                or Schedule a ride
              </p>
            </div>
          </div>
        </div>


        <p className="text-[32px] font-medium text-center text-[#848484]">Completed Rides</p>
        <div
          className="flex flex-col justify-start items-center w-[529px] h-[195px] relative gap-1.5 px-[23px] py-[17px] rounded-[11px] bg-gradient-to-b from-[#1b211f] to-[#101517]"
        >
          <div className="flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 relative">
            <p className="flex-grow w-[431px] text-xl font-medium text-left text-[#bababa]">
              City Center to Airport
            </p>
            <p className="flex-grow-0 flex-shrink-0 text-base font-medium text-left text-[#7d7d7d]">Aug 21</p>
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
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-dasharray="1 8"
            ></path>
          </svg>
          <div className="flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 relative">
            <p className="flex-grow w-[430px] text-xl font-medium text-left text-[#bababa]">
              City Center to Airport
            </p>
            <p className="flex-grow-0 flex-shrink-0 text-base font-medium text-left text-[#7d7d7d]">Aug 18</p>
          </div>
        </div>
      </div>
      <div className='flex flex-col mt-20'>

        <div className='flex gap-2 justify-end items-center mb-2 mt-10'>

          <div className="flex flex-col justify-start items-center w-[258px] relative px-[13px] py-[17px] rounded-[11px] bg-gradient-to-b from-[#1b211f] to-[#101517]">
            <p className="flex-grow-0 flex-shrink-0 text-5xl text-center text-[#bcbcbc]">20</p>
            <p className="self-stretch flex-grow-0 flex-shrink-0 w-[232px] text-[32px] font-semibold text-center text-[#bafd02]">
              Rides Taken!
            </p>
            <p className="self-stretch flex-grow-0 flex-shrink-0 w-[232px] text-2xl text-center text-[#bcbcbc]">
              with ZeroCabs
            </p>
          </div>

          <div className="flex flex-col justify-start items-center w-[258px] relative px-[13px] py-[17px] rounded-[11px] bg-gradient-to-b from-[#1b211f] to-[#101517]">
            <p className="flex-grow-0 flex-shrink-0 text-5xl text-center text-[#bcbcbc]">$29.04</p>
            <p className="flex-grow-0 flex-shrink-0 w-[180px] text-[32px] font-semibold text-center text-[#bafd02]">
              Saved!
            </p>
            <p className="self-stretch flex-grow-0 flex-shrink-0 w-[232px] text-2xl text-center text-[#bcbcbc]">
              with us
            </p>
          </div>
        </div>
        <div className='flex flex-col gap-2 justify-center items-start mb-2 mt-10'>

          <p className="text-[32px] font-medium text-center text-[#9c9c9c]">Scheduled Rides</p>
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
                stroke-width={2}
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-dasharray="1 8"
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
        <div className="flex justify-start items-center w-[529px] h-[65px] relative gap-2.5 px-[35px] py-2 rounded-tl-2xl rounded-tr-2xl bg-gradient-to-b from-[#1b211f] to-[#101517]">
          {/* <div className="flex justify-start items-center flex-grow relative gap-5 px-[19px] py-[9px] cursor-pointer">
            <Chat />
            <p className="flex-grow-0 flex-shrink-0 text-xl text-center text-white">Your messages</p>
          </div> */}
          <ChatComponent/>
          <svg
            width={18}
            height={11}
            viewBox="0 0 18 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-grow-0 flex-shrink-0"
            preserveAspectRatio="none"
          >
            <path d="M17 9.5L9 1.5L1 9.5" stroke="white" stroke-width={2} stroke-linecap="round" />
          </svg>
        </div>

      </div>

    </div>
  );
};

export default ClientPage;