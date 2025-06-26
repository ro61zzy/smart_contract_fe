"use client";

import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useWeb3 } from "@/context/Web3Context";
import { useToken } from "@/context/TokenContext";
import { ArrowDownUp } from "lucide-react";
import { toast } from "react-toastify";


interface TransferEvent {
  from: string;
  to: string;
  value: string;
  timestamp: string;
}

const shorten = (addr: string) =>
  addr.slice(0, 8) + "..." + addr.slice(-5);

const TokenTransferFeed = () => {
  const { provider } = useWeb3();
  const { token } = useToken();
  const [loading, setLoading] = useState(true);
  const [transfers, setTransfers] = useState<TransferEvent[]>([]);

  useEffect(() => {
    if (!provider || !token?.address || !token?.abi) return;

    const contract = new ethers.Contract(token.address, token.abi, provider);

    const handleTransfer = async (
      from: string,
      to: string,
      value: bigint,
      event: any
    ) => {
      const block = await provider.getBlock(event.blockNumber);
      if (!block) return;

      const time = new Date(block.timestamp * 1000).toLocaleTimeString();
      const formatted = ethers.formatUnits(value, token.decimals);

      setTransfers((prev) => [
        { from, to, value: formatted, timestamp: time },
        ...prev.slice(0, 20),
      ]);

      setLoading(false);
    };

    contract.on("Transfer", handleTransfer);
    const fallback = setTimeout(() => setLoading(false), 5000);

    return () => {
      contract.off("Transfer", handleTransfer);
      clearTimeout(fallback);
    };
  }, [provider, token]);

  return (
    <div className="p-1">
      <div className="bg-[#57064f] text-white p-4 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <ArrowDownUp className="text-purple-300" size={20} />
            Live Transfer Feed
          </h2>
        </div>

        <ul className="space-y-2 text-sm max-h-72 overflow-y-auto">
          {loading ? (
            <div className="text-center py-6">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
              <p className="text-sm text-gray-300">Listening for transfers...</p>
            </div>
          ) : transfers.length === 0 ? (
            <p className="text-gray-300">No transfers yet...</p>
          ) : (
            transfers.map((t, i) => (
              <li
                key={i}
                className="bg-[#3a0437] p-3 rounded-lg hover:bg-[#4d0452] transition duration-150 ease-in-out shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <div className="text-xs text-gray-400">{t.timestamp}</div>
                  <div className="text-right text-sm font-semibold text-purple-200">
                    {t.value} {token.symbol}
                  </div>
                </div>

                <div className="mt-2 text-xs space-y-1 font-mono">
                  <div className="flex items-center gap-5">
                    <p>
                      <span className="text-purple-300 font-semibold">From:</span>{" "}
                      {shorten(t.from)}
                    </p>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(t.from);
                        toast.success("From address copied!");
                      }}
                      className="text-xs text-gray-400 hover:text-white"
                      title="Copy From Address"
                    >
                      📋
                    </button>
                  </div>

                  <div className="flex items-center gap-5">
                    <p>
                      <span className="text-pink-300 font-semibold">To:</span>{" "}
                      {shorten(t.to)}
                    </p>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(t.to);
                        toast.success("To address copied!");
                      }}
                      className="text-xs text-gray-400 hover:text-white"
                      title="Copy To Address"
                    >
                      📋
                    </button>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default TokenTransferFeed;
