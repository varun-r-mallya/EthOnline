import { useAppStore } from "@/store/useAppStore";
import { CarFront, Menu, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";

import React, { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { Web3Context } from "@/store/context/web3context";
export const NavBar: React.FC = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const { account, contract, connectWallet } = useContext(Web3Context);
  const navItems = ["Home", "About", "Contact"];
  const sliderWidth = 50;
  const router = useRouter();
  const {
    web3authSFAuth,
    provider,
    logout,
    showWalletUI,
    initWeb3Auth,
    getUserInfo,
  } = useAppStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleLogout = async () => {
    await logout();
    router.push("/");
  };
  const [userInfo, setUserInfo] = useState<any>();
  useEffect(() => {
    initWeb3Auth();
  }, []);

  const handleConnect = async () => {
    console.log("wokginocne n");

    await connectWallet();
  };

  const interactWithContract = async () => {
    if (contract && account) {
      const result = await contract.methods
        .yourMethod()
        .call({ from: account });
      console.log("Contract result:", result);
    }
  };
  //   useEffect(() => {
  //     if (web3authSFAuth) {
  //       try {
  //         getUserInfo().then((info) => {
  //           setUserInfo(info);
  //         });
  //       } catch (e) {
  //         console.log(e);
  //       }
  //     }
  //   }, [web3authSFAuth]);

  return (
    <>
      <nav className="p-4">
        <div className="flex w-100% px-[138px] py-[40px] items-center justify-between">
          <a href="/">
            <div className="flex items-center">
              <CarFront size={32} className="text-yellow-400 mr-2" />
              <svg
                width="167"
                height="25"
                viewBox="0 0 167 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M16.5781 21.625V24H0.25V22.0312L13.375 3.85938H0.46875V1.48438H16.5312V3.48438L3.67188 21.625H16.5781ZM21.2812 1.48438H36.2812V3.85938H24V11.0781H34.4375V13.4219H24V21.625H36.3281V24H21.2812V1.48438ZM57.6875 24H54.9375L53.6719 18.2031C53.4219 17.0573 53.1146 16.1927 52.75 15.6094C52.3958 15.0156 51.8906 14.6042 51.2344 14.375C50.5885 14.1354 49.6667 14.0156 48.4688 14.0156H43.9688V24H41.25V1.48438H48.6719C50.8177 1.48438 52.4844 1.67708 53.6719 2.0625C54.8594 2.44792 55.7083 3.08854 56.2188 3.98438C56.7292 4.88021 56.9844 6.13542 56.9844 7.75C56.9844 9.19792 56.6198 10.3281 55.8906 11.1406C55.1719 11.9531 53.974 12.5104 52.2969 12.8125C53.2969 13.0312 54.0365 13.3177 54.5156 13.6719C55.0052 14.0156 55.3542 14.4583 55.5625 15C55.7708 15.5312 56 16.3906 56.25 17.5781C56.2708 17.6615 56.2917 17.7604 56.3125 17.875C56.3438 17.9896 56.375 18.125 56.4062 18.2812L57.6875 24ZM48.4688 11.7344C52.3958 11.7344 54.3594 10.4062 54.3594 7.75C54.3594 6.72917 54.1823 5.9375 53.8281 5.375C53.474 4.8125 52.8854 4.41146 52.0625 4.17188C51.2396 3.92188 50.0885 3.79688 48.6094 3.79688H43.9688V11.7344H48.4688ZM71.6719 24.5938C69.1823 24.5938 67.1927 24.1458 65.7031 23.25C64.2135 22.3438 63.1406 21.0208 62.4844 19.2812C61.8385 17.5312 61.5156 15.3177 61.5156 12.6406C61.5156 10.0156 61.849 7.85417 62.5156 6.15625C63.1927 4.44792 64.276 3.16146 65.7656 2.29688C67.2552 1.43229 69.224 1 71.6719 1C74.1198 1 76.0885 1.4375 77.5781 2.3125C79.0677 3.17708 80.1458 4.46354 80.8125 6.17188C81.4792 7.86979 81.8125 10.0208 81.8125 12.625C81.8125 15.3125 81.4896 17.5312 80.8438 19.2812C80.1979 21.0208 79.1302 22.3438 77.6406 23.25C76.151 24.1458 74.1615 24.5938 71.6719 24.5938ZM71.6719 22.2812C73.6406 22.2812 75.1562 21.9271 76.2188 21.2188C77.2812 20.5 78.0104 19.4531 78.4062 18.0781C78.8125 16.6927 79.0156 14.8698 79.0156 12.6094C79.0156 10.4115 78.8073 8.65104 78.3906 7.32812C77.9844 5.99479 77.25 4.99479 76.1875 4.32812C75.125 3.66146 73.6198 3.32812 71.6719 3.32812C69.7031 3.32812 68.1875 3.67188 67.125 4.35938C66.0625 5.03646 65.3281 6.04688 64.9219 7.39062C64.5156 8.72396 64.3125 10.5052 64.3125 12.7344C64.3125 14.9844 64.5156 16.7917 64.9219 18.1562C65.3281 19.5104 66.0625 20.5365 67.125 21.2344C68.1979 21.9323 69.7135 22.2812 71.6719 22.2812ZM95.5625 24.6094C92.1354 24.6094 89.599 23.6562 87.9531 21.75C86.3073 19.8438 85.4844 16.901 85.4844 12.9219C85.4844 8.88021 86.3385 5.88542 88.0469 3.9375C89.7552 1.97917 92.3854 1 95.9375 1C97.7708 1 99.3281 1.26562 100.609 1.79688C101.891 2.32812 102.859 3.10938 103.516 4.14062C104.172 5.16146 104.49 6.40104 104.469 7.85938H101.828C101.828 6.41146 101.318 5.29688 100.297 4.51562C99.276 3.73438 97.8229 3.34375 95.9375 3.34375C94.0833 3.34375 92.599 3.66146 91.4844 4.29688C90.3802 4.93229 89.5729 5.94271 89.0625 7.32812C88.5521 8.70312 88.2969 10.5417 88.2969 12.8438C88.2969 15.1354 88.5365 16.9688 89.0156 18.3438C89.4948 19.7083 90.25 20.7083 91.2812 21.3438C92.3229 21.9688 93.7135 22.2812 95.4531 22.2812C97.4948 22.2812 99.0677 21.8906 100.172 21.1094C101.276 20.3177 101.828 19.1979 101.828 17.75H104.469C104.49 19.2083 104.156 20.4531 103.469 21.4844C102.792 22.5052 101.781 23.2812 100.438 23.8125C99.1042 24.3438 97.4792 24.6094 95.5625 24.6094ZM114.922 1.48438H118.062L126.672 24H123.922L121.781 18.3594H111.312L109.188 24H106.422L114.922 1.48438ZM121.031 16.1562L116.5 3.78125L112.047 16.1562H121.031ZM142.344 11.9688C143.938 12.2292 145.12 12.8229 145.891 13.75C146.661 14.6771 147.047 15.9531 147.047 17.5781C147.047 19.0573 146.776 20.2708 146.234 21.2188C145.703 22.1562 144.875 22.8542 143.75 23.3125C142.625 23.7708 141.167 24 139.375 24H130.656V1.48438H138.453C140.38 1.48438 141.88 1.66146 142.953 2.01562C144.026 2.35938 144.792 2.9375 145.25 3.75C145.708 4.5625 145.938 5.69792 145.938 7.15625C145.938 8.55208 145.656 9.625 145.094 10.375C144.542 11.1146 143.625 11.6458 142.344 11.9688ZM133.312 10.9844H138.969C140.052 10.9844 140.922 10.8594 141.578 10.6094C142.234 10.349 142.708 9.9375 143 9.375C143.302 8.8125 143.453 8.06771 143.453 7.14062C143.453 6.27604 143.297 5.60417 142.984 5.125C142.682 4.64583 142.172 4.30208 141.453 4.09375C140.745 3.88542 139.75 3.78125 138.469 3.78125H133.312V10.9844ZM139.359 21.7188C140.63 21.7188 141.615 21.5938 142.312 21.3438C143.01 21.0833 143.51 20.6615 143.812 20.0781C144.115 19.4844 144.266 18.6562 144.266 17.5938C144.266 16.5312 144.089 15.6823 143.734 15.0469C143.38 14.401 142.818 13.9323 142.047 13.6406C141.276 13.349 140.25 13.2031 138.969 13.2031H133.312V21.7188H139.359ZM158.891 24.4531C156.953 24.4531 155.396 24.25 154.219 23.8438C153.052 23.4271 152.193 22.7708 151.641 21.875C151.089 20.9688 150.812 19.7708 150.812 18.2812H153.391C153.391 19.2604 153.568 20.026 153.922 20.5781C154.276 21.1198 154.854 21.5104 155.656 21.75C156.458 21.9792 157.573 22.0938 159 22.0938C160.302 22.0938 161.333 21.9531 162.094 21.6719C162.854 21.3906 163.401 20.9479 163.734 20.3438C164.078 19.7292 164.25 18.9062 164.25 17.875C164.25 16.9479 164.052 16.1979 163.656 15.625C163.26 15.0521 162.589 14.5885 161.641 14.2344C160.693 13.8698 159.359 13.5625 157.641 13.3125C155.286 12.9688 153.568 12.276 152.484 11.2344C151.411 10.1823 150.875 8.72396 150.875 6.85938C150.875 4.83854 151.542 3.34375 152.875 2.375C154.208 1.40625 156.26 0.921875 159.031 0.921875C160.802 0.921875 162.219 1.11458 163.281 1.5C164.344 1.875 165.12 2.47917 165.609 3.3125C166.099 4.14583 166.344 5.25521 166.344 6.64062H163.859C163.859 5.77604 163.703 5.10417 163.391 4.625C163.078 4.14583 162.557 3.80729 161.828 3.60938C161.109 3.40104 160.099 3.29688 158.797 3.29688C157.536 3.29688 156.526 3.41667 155.766 3.65625C155.016 3.88542 154.464 4.25521 154.109 4.76562C153.766 5.27604 153.594 5.95312 153.594 6.79688C153.594 7.68229 153.776 8.39062 154.141 8.92188C154.505 9.44271 155.141 9.875 156.047 10.2188C156.953 10.5521 158.266 10.8542 159.984 11.125C162.411 11.5 164.182 12.224 165.297 13.2969C166.411 14.3698 166.969 15.8542 166.969 17.75C166.969 20.0417 166.318 21.7344 165.016 22.8281C163.714 23.9115 161.672 24.4531 158.891 24.4531Z"
                  fill="#BAFD02"
                ></path>
              </svg>
            </div>
          </a>
          <ul className="flex space-x-[2.93rem] font-mono text-lg">
            <li className="relative navitem group cursor-pointer ">
              <a href="/" className="relative">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-transparent transition-all duration-700 ease-in-out group-hover:w-full group-hover:bg-[#bafd02]"></span>
              </a>
            </li>
            <li className="relative navitem group cursor-pointer  ">
              <a href="/about" className="relative">
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-transparent transition-all duration-700 ease-in-out group-hover:w-full group-hover:bg-[#bafd02]"></span>
              </a>
            </li>
            <li className="relative navitem group cursor-pointer">
              <a href="/contact" className="relative">
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-transparent transition-all duration-700 ease-in-out group-hover:w-full group-hover:bg-[#bafd02]"></span>
              </a>
            </li>
          </ul>
          {account ? (
            <div>
              <p>Connected Account: {account}</p>
            </div>
          ) : (
            <div
              className="w-[146px] h-14 overflow-hidden rounded-[9px] bg-[#bafd02] items-center flex justify-center cursor-pointer  z-10"
              onClick={connectWallet}
            >
              <button
                onClick={handleConnect}
                className="  text-xl font-medium text-left text-black"
              >
                Connect Wallet
              </button>
            </div>
          )}
          {web3authSFAuth ? (
            provider ? (
              <>
                <div className="flex items-center space-x-1">
                  <div className="relative">
                    <button
                      onClick={handleDropdownToggle}
                      className="flex items-center"
                    >
                      <img
                        src="https://avatars.githubusercontent.com/u/81866624?v=4"
                        alt="Profile"
                        className="w-10 h-10 object-cover rounded-full" // Adjust size as needed
                      />{" "}
                      <svg
                        width="18"
                        height="10"
                        viewBox="0 0 18 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                      >
                        <path d="M1 1L9 9L17 1" stroke="white"></path>
                      </svg>
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute top-full right-0 mt-2 w-48  border border-gray-300 shadow-lg rounded-l">
                        <Button
                          onClick={showWalletUI}
                          className="block w-full px-4 py-2 text-left text-white hover:bg-gray-800"
                        >
                          <div className="flex row-auto">
                            <Wallet className="mr-2 h-4 w-4" /> View Wallet
                          </div>
                        </Button>
                        <Button
                          onClick={handleLogout}
                          className="block w-full px-4 py-2 text-left text-white hover:bg-gray-800"
                        >
                          Logout
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : null
          ) : null}

          <div className="md:hidden">
            <Menu className="text-gray-100 cursor-pointer" />
          </div>
        </div>
      </nav>
    </>
  );
};
