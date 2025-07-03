"use client";

import { useState } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { useWeb3 } from "@/context/Web3Context";
import { useToken } from "@/context/TokenContext";

export default function SendMyToken() {
  const { signer, address } = useWeb3();
  const { token } = useToken();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!signer || !token.abi || !token.address || !address) {
      toast.error("Wallet not connected or token info missing.");
      return;
    }

    if (!ethers.isAddress(recipient)) {
      toast.error("🚫 Invalid recipient address.");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      toast.error("🚫 Enter a valid amount to send.");
      return;
    }

    try {
      setLoading(true);
      const contract = new ethers.Contract(token.address, token.abi, signer);
      const amountInWei = ethers.parseUnits(amount, token.decimals);

      const tx = await contract.transfer(recipient, amountInWei);
      toast.info("⏳ Sending tokens...");
      await tx.wait();

      toast.success(`✅ Sent ${amount} ${token.symbol} to ${recipient}`);
      setRecipient("");
      setAmount("");
    } catch (err: any) {
      console.error("Send failed:", err);
      toast.error(err.message || "Transaction failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-1">
      <div className="bg-gradient-to-br from-[#57064f] via-[#7e2a77] to-[#a34f9a] p-6 rounded-xl shadow-lg text-white font-mono">
        <h2 className="text-xl font-bold mb-2">Send {token.symbol} Tokens</h2>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Recipient address (0x...)"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full bg-[#3a0437] text-white border border-gray-600 rounded-md px-4 py-2 placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="number"
            placeholder="Amount to send"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-[#3a0437] text-white border border-gray-600 rounded-md px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className={`w-full px-4 py-2 rounded-md font-semibold transition ${
              loading ? "bg-gray-500" : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            Send Tokens
          </button>
        </div>
      </div>
    </div>
  );
}
