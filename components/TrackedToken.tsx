"use client";

import React, { useEffect, useState } from "react";
import { useToken } from "@/context/TokenContext";
import { useWeb3 } from "@/context/Web3Context";
import { TRACKED_TOKENS } from "@/lib/tokens";
import { toast } from "react-toastify";
import { ethers } from "ethers";

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56"];

const TrackedToken = () => {
const { token, setToken, setTokenBalance } = useToken();
  const { provider, address } = useWeb3();
  const [totalSupply, setTotalSupply] = useState<string | null>(null);


  const [distributionData, setDistributionData] = useState<
    { name: string; value: number }[]
  >([]);

  const formatNumber = (num: number) =>
    new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 4,
    }).format(num);

  useEffect(() => {
    const fetchTokenData = async () => {
      if (!provider || !address || !token?.address || !token?.abi) {
        console.warn("Missing inputs:", { provider, address, token });
        return;
      }

      try {
        const contract = new ethers.Contract(token.address, token.abi, provider);

        const userBalance = await contract.balanceOf(address);
        const totalSupply = await contract.totalSupply();

        const userBalanceFormatted = parseFloat(
          ethers.formatUnits(userBalance, token.decimals)
        );
        setTokenBalance(userBalanceFormatted.toString());
      const totalSupplyFormatted = parseFloat(
  ethers.formatUnits(totalSupply, token.decimals)
);
setTotalSupply(totalSupplyFormatted.toString());
        const othersFormatted = totalSupplyFormatted - userBalanceFormatted;

        setDistributionData([
          { name: "You", value: userBalanceFormatted },
          { name: "Others", value: othersFormatted },
        ]);
      } catch (err) {
        console.error("Fetch failed:", err);
        toast.error("Error interacting with token contract.");
      }
    };

    fetchTokenData();
  }, [provider, address, token]);

  const totalValue = distributionData.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="text-white rounded-lg  p-1">
      {/* LEFT: Token Picker */}
      <div className="bg-[#57064f] p-4 rounded-lg shadow-md">
  <h2 className="text-xl font-bold mb-3 text-white">Tracked Tokens</h2>
  <hr className="border-t border-gray-600 mb-4" />


  <div className="mb-4">
    <label
      htmlFor="token-select"
      className="block text-gray-300 text-sm font-medium mb-2"
    >
      Select a Token:
    </label>
    <select
      id="token-select"
      value={token.symbol}
      onChange={(e) => {
        const selected = TRACKED_TOKENS.find(
          (t) => t.symbol === e.target.value
        );
        if (selected) setToken(selected);
      }}
      className="block w-full bg-white border border-gray-600 rounded-lg py-3 px-4  text-black focus:ring-purple-500 focus:border-purple-500"
    >
      {TRACKED_TOKENS.map((t) => (
        <option key={t.symbol} value={t.symbol}>
          {t.name}
        </option>
      ))}
    </select>
    
  </div>

  <div className="bg-[#3a0437] p-3 rounded-md text-sm text-gray-200 transition-all duration-200 ease-in-out">
    <p className="text-purple-300 mb-1 font-medium">Selected Token Details:</p>

    <div className="space-y-1 text-xs text-gray-300">
      <div className="flex justify-between">
        <span className="text-gray-400">Name:</span>
        <span className="font-semibold">{token.name || "—"}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-400">Symbol:</span>
        <span className="font-semibold">{token.symbol || "—"}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-400">Decimals:</span>
        <span className="font-semibold">{token.decimals || "—"}</span>
      </div>
       <div className="flex justify-between">
        <span className="text-gray-400">Total Suppky:</span>
        <span className="font-semibold">{totalSupply ? `${parseFloat(totalSupply).toLocaleString()} ${token.symbol}` : "—"}
</span>
      </div>
      <div className="flex justify-between items-start">
        <span className="text-gray-400">Contract:</span>
        <span className="font-mono break-all text-right">
          {token.address}
          <button
            onClick={() => {
              navigator.clipboard.writeText(token.address);
            }}
            className="ml-2 text-xs bg-gray-600 px-1 py-0.5 rounded hover:bg-gray-500 transition"
          >
            Copy
          </button>
        </span>
      </div>
    </div>
  </div>
</div>

    </div>
  );
};

export default TrackedToken;
