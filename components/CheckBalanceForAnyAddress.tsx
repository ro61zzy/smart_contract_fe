"use client";

import React, { useState } from "react";
import { ethers } from "ethers";
import { useToken } from "@/context/TokenContext";
import { toast } from "react-toastify";

const CheckBalanceForAnyAddress = () => {
  const { token } = useToken();
  const [inputAddress, setInputAddress] = useState("");
  const [balance, setBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const checkBalance = async () => {
    if (!ethers.isAddress(inputAddress)) {
      toast.error("Please paste a valid Ethereum address.");
      return;
    }

    

    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(token.address, token.abi, provider);

      const rawBalance = await contract.balanceOf(inputAddress);
      const formattedBalance = ethers.formatUnits(rawBalance, token.decimals);
      setBalance(formattedBalance);
    } catch (error) {
      console.error("Error fetching balance:", error);
      toast.error("Failed to fetch balance.");
      setBalance(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-1">
      <div className="bg-gradient-to-br from-[#57064f] via-[#7e2a77] to-[#a34f9a] p-6 rounded-xl shadow-lg text-white font-mono">
        <h2 className="text-xl font-bold mb-4">Check Token Balance</h2>

        {/* Address input */}
        <input
          type="text"
          placeholder="Paste wallet address"
          value={inputAddress}
          onChange={(e) => setInputAddress(e.target.value)}
          className="w-full bg-[#3a0437] text-white border border-gray-600 rounded-md px-4 py-2 mb-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* Check button */}
        <button
          onClick={checkBalance}
          disabled={loading}
          className={`w-full px-4 py-2 rounded-md font-semibold transition ${
            loading ? "bg-gray-500" : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {loading ? "Checking..." : "Check Balance"}
        </button>

        {/* Result display */}
        {balance !== null && (
          <div className="mt-4 p-3 bg-[#3a0437] rounded-md text-sm">
            <p className="text-purple-300 mb-1 font-medium">Balance:</p>
            <p className="text-lg font-bold">
              {parseFloat(balance).toFixed(4)} {token.symbol}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckBalanceForAnyAddress;
