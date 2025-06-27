"use client";

import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useToken } from "@/context/TokenContext";
import { useWeb3 } from "@/context/Web3Context";
import { ethers } from "ethers";

const TokenActivityChart = () => {
  const { token } = useToken();
  const { provider } = useWeb3();
  const [chartData, setChartData] = useState<
    { time: string; volume: number }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
  console.log("token:", token);

  if (!token?.address || token.decimals === undefined) {
    console.log("Missing token data, skipping fetch.");
    return;
  }

  const rpcProvider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_SEPOLIA_RPC!);

  const fetchRecentTransfers = async () => {
    try {
      setLoading(true);
      setError(null);

      const latestBlock = await rpcProvider.getBlockNumber();
      const blockRange = 300;
      const fromBlock = Math.max(latestBlock - blockRange, 0);

      console.log("Latest block number:", latestBlock);
      console.log(`Scanning from block ${fromBlock} to ${latestBlock}`);

      const transferTopic = ethers.id("Transfer(address,address,uint256)");

      const logs = await rpcProvider.getLogs({
        fromBlock,
        toBlock: latestBlock,
        address: token.address,
        topics: [transferTopic],
      });

      const limitedLogs = logs.slice(-200);
      console.log("Got", limitedLogs.length, "logs");

      const uniqueBlocks = Array.from(new Set(limitedLogs.map(log => log.blockNumber)));
      const blockTimestamps: Record<number, number> = {};

      for (let block of uniqueBlocks) {
        const blk = await rpcProvider.getBlock(block);
        if (blk) blockTimestamps[block] = blk.timestamp;
        await new Promise((res) => setTimeout(res, 100)); // slow down
      }

      const volumePerMinute: { [minute: string]: number } = {};

      for (let log of limitedLogs) {
        const valueHex = log.data;
        const value = parseFloat(ethers.formatUnits(valueHex, token.decimals));

        const timestamp = blockTimestamps[log.blockNumber];
        if (!timestamp) continue;

        const date = new Date(timestamp * 1000);
        const minuteStr = date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });

        volumePerMinute[minuteStr] = (volumePerMinute[minuteStr] || 0) + value;
      }

      const formattedData = Object.entries(volumePerMinute).map(([time, volume]) => ({
        time,
        volume: Number(volume.toFixed(4)),
      }));

      formattedData.sort((a, b) => a.time.localeCompare(b.time));
      setChartData(formattedData);
     // console.log("Chart data ready:", formattedData.slice(0, 5));
    } catch (err) {
      console.error("Chart error:", err);
      setError("Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  fetchRecentTransfers();

  const interval = setInterval(fetchRecentTransfers, 60_000); //run every 60 seconds

  return () => clearInterval(interval);
}, [token?.address, token?.decimals]);



  return (
    <div className="p-1">
      <div className="bg-[#57064f] text-white p-4 rounded-lg">
        <h2 className="text-lg font-bold mb-3">
          Transfer Volume (Last 20 Minutes)
        </h2>

        {loading ? (
          <p className="text-center text-sm text-gray-300">Loading chart...</p>
        ) : chartData.length === 0 ? (
          <p className="text-center text-sm text-gray-400">
            No recent transfer volume.
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="time" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="volume"
                stroke="#36A2EB"
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default TokenActivityChart;
