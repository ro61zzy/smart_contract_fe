"use client";

import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useWeb3 } from "@/context/Web3Context";
import { useToken } from "@/context/TokenContext";
import { toast } from "react-toastify";

interface TransferEvent {
  from: string;
  to: string;
  value: string;
  timestamp: string;
}

const TokenTransferFeed = () => {
  const { provider } = useWeb3();
  const { token } = useToken();
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

      if (!block) {
        console.warn("Block not found for blockNumber:", event.blockNumber);
        return;
      }

      const time = new Date(block.timestamp * 1000).toLocaleTimeString();

      const formatted = ethers.formatUnits(value, token.decimals);

      setTransfers((prev) => [
        { from, to, value: formatted, timestamp: time },
        ...prev.slice(0, 20),
      ]);
    };

    contract.on("Transfer", handleTransfer);

    return () => {
      contract.off("Transfer", handleTransfer);
    };
  }, [provider, token]);

  return (
    <div className="p-1">
      <div className="bg-[#57064f] text-white p-4 rounded-lg mt-6">
        <h2 className="text-lg font-bold mb-3">Live Transfer Feed</h2>
        <ul className="space-y-2 text-sm max-h-72 overflow-y-auto">
          {transfers.length === 0 ? (
            <p>No transfers yet...</p>
          ) : (
            transfers.map((t, i) => (
              <li key={i} className="bg-[#3a0437] p-2 rounded-md">
                <div>
                  <strong>From:</strong> {t.from}
                </div>
                <div>
                  <strong>To:</strong> {t.to}
                </div>
                <div>
                  <strong>Amount:</strong> {t.value} {token.symbol}
                </div>
                <div className="text-gray-400 text-xs">{t.timestamp}</div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default TokenTransferFeed;
