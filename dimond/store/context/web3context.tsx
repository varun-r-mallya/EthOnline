"use client";
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import abi from "@/abi/driver_rider.json"
import { useAppStore } from '../useAppStore';
// Define the type for the context
interface Web3ContextProps {
  web3: Web3 | null;
  account: string | null;
  contract: any | null;
  connectWallet: () => Promise<void>;
}

// Create the Web3 Context
export const Web3Context = createContext<Web3ContextProps>({
  web3: null,
  account: null,
  contract: null,
  connectWallet: async () => {},
});

interface Web3ProviderProps {
  children: ReactNode;
}

export const Web3Provider = ({ children }: Web3ProviderProps) => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [contract, setContract] = useState<any | null>(null);
const {provider,initWeb3Auth}=useAppStore();

  const contractABI = abi;
  const contractAddress = '0xb92297Fc47A5088401473CdCa7aae4E3D08e70B6';

  // Connect to MetaMask wallet
  const connectWallet = async () => {
    const provider: any = window.ethereum;
    if (provider) {
      const web3Instance = new Web3(provider);
      setWeb3(web3Instance);

      const accounts = await web3Instance.eth.requestAccounts();
      setAccount(accounts[0]);

      const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
      setContract(contractInstance);
    } else {
      console.error('MetaMask is not installed.');
    }
  };

  useEffect(() => {
    const init = async () => {
      // const provider: any = await detectEthereumProvider();
      if (provider) {
        const web3Instance = new Web3(provider);
        setWeb3(web3Instance);

        const accounts = await web3Instance.eth.getAccounts();
        if (accounts.length > 0) {
          setAccount(accounts[0]);

          const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
          setContract(contractInstance);
        }
      }
    };
    initWeb3Auth()
    init();
  }, []);

  return (
    <Web3Context.Provider value={{ web3, account, contract, connectWallet }}>
      {children}
    </Web3Context.Provider>
  );
};
