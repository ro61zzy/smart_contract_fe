"use client"

import React from "react";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}

const ConnectWalletBTN = () => {
  let signer = null;

  let provider;

  const connectWallet = async () => {
    if (window.ethereum == null) {
      console.log("MetaMask not installed, make sure Metamask is installed");
      provider = ethers.getDefaultProvider();
    } else {
      provider = new ethers.BrowserProvider(window.ethereum);
      signer = await provider.getSigner();
      console.log("Wallet connected:", await signer.getAddress());
    }
  };

  return (
    <div>
      <button className="bg-[#89087c] p-2 w-64 rounded-lg" onClick={connectWallet}>
        <p className=" text-white font-bold">
Connect Wallet
          </p>
      </button>
    </div>
  );
};

export default ConnectWalletBTN;
