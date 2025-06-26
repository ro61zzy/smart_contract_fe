// context/Web3Context.tsx

"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify"

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface Web3ContextType {
  provider: ethers.BrowserProvider | null;
  signer: ethers.Signer | null;
  address: string | null;
  connectWallet: () => Promise<void>;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);


  useEffect(() => {
  const reconnectWallet = async () => {
    if (window.ethereum && !provider) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          const _provider = new ethers.BrowserProvider(window.ethereum);
          const _signer = await _provider.getSigner();
          const _address = await _signer.getAddress();
          setProvider(_provider);
          setSigner(_signer);
          setAddress(_address);
        }
      } catch (err) {
        console.error("Reconnect error:", err);
      }
    }
  };

  reconnectWallet();
}, []);


  const connectWallet = async () => {
    if (isConnecting) return;
    setIsConnecting(true);
    try {
      if (!window.ethereum) throw new Error("MetaMask not found");
      const _provider = new ethers.BrowserProvider(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" }); // ensures prompt
      const _signer = await _provider.getSigner();
      const _address = await _signer.getAddress();
      setProvider(_provider);
      setSigner(_signer);
      setAddress(_address);
    } catch (err: any) {
      console.error("Connect error:", err)

    if (err.code === -32002) {
      toast.info("MetaMask is already asking for permission. Please check your wallet.")
    } else {
      toast.error(err.message || "Connection failed.")
    }
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Web3Context.Provider value={{ provider, signer, address, connectWallet }}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) throw new Error("useWeb3 must be used within Web3Provider");
  return context;
};
