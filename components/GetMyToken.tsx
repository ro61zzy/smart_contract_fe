"use client";

import { useState } from "react";
import { useWeb3 } from "@/context/Web3Context";
import { useToken } from "@/context/TokenContext";
import { ethers } from "ethers";
import { toast } from "react-toastify";

export default function GetMyToken() {
  const { signer, address } = useWeb3();
  const { token } = useToken();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const isMyToken = token.symbol === "MTN";

  const handleMint = async () => {
    if (!signer || !address || !token.abi || !token.address) {
      toast.error("Wallet not connected or token info missing.");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      toast.error("Please enter a valid amount greater than 0.");
      return;
    }

    if (Number(amount) > 100) {
      toast.error("🚫 Max mint amount is 100 tokens.");
      return;
    }

    try {
      setLoading(true);
      const contract = new ethers.Contract(token.address, token.abi, signer);
      const amountInWei = ethers.parseUnits(amount, token.decimals);
      const tx = await contract.mint(address, amountInWei);
      toast.info("Minting in progress...");
      await tx.wait();
      toast.success(`Successfully minted ${amount} MTN!`);
    } catch (err: any) {
      console.error("Minting failed:", err);
      toast.error(err.message || "Minting failed");
    }  finally {
      setLoading(false);
    }
  };

  if (!isMyToken) return null;

  return (
    <div className="p-1">
      <div className="bg-gradient-to-br from-[#57064f] via-[#7e2a77] to-[#a34f9a] p-6 rounded-xl shadow-lg text-white font-mono">
        <h3 className="text-lg font-semibold mb-2">
          Get some MyToken (MTN) for yourself
        </h3>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount - max (100)"
          className="w-full bg-[#3a0437] text-white border border-gray-600 rounded-md px-4 py-2 mb-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={handleMint}
            disabled={loading}
           className={`w-full px-4 py-2 rounded-md font-semibold transition ${
            loading ? "bg-gray-500" : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          Mint Tokens
        </button>
      </div>
    </div>
  );
}
