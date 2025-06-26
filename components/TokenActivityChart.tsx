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
    const fetchRecentTransfers = async () => {
      if (!provider || !token?.address || !token?.abi) return;

      try {
        setLoading(true);
        setError(null);

        const latestBlock = await provider.getBlockNumber();
        const latestBlockData = await provider.getBlock(latestBlock);
if (!latestBlockData) {
  setError("Could not fetch latest block data.");
  setLoading(false);
  return;
}
const now = latestBlockData.timestamp;


        const minutesBack = 20;
        const secondsBack = minutesBack * 60;
        const targetTimestamp = now - secondsBack;

        // Estimate block range to scan (e.g., ~4s per block on Sepolia)
        const estimatedBlocks = Math.ceil(secondsBack / 4);
        const fromBlock = Math.max(latestBlock - estimatedBlocks, 0);

        const contract = new ethers.Contract(token.address, token.abi, provider);

        const logs = await contract.queryFilter("Transfer", fromBlock, latestBlock);

        console.log("Fetched logs:", logs.length);

        const volumePerMinute: { [minute: string]: number } = {};

        for (let log of logs) {
          if (!("args" in log) || !log.args?.value) continue;

          const block = await provider.getBlock(log.blockNumber);
          if (!block || block.timestamp < targetTimestamp) continue;

          const value = parseFloat(
            ethers.formatUnits(log.args.value, token.decimals)
          );

          const date = new Date(block.timestamp * 1000);
          const minuteStr = `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;

          if (!volumePerMinute[minuteStr]) volumePerMinute[minuteStr] = 0;
          volumePerMinute[minuteStr] += value;
        }

        const formattedData = Object.entries(volumePerMinute).map(
          ([time, volume]) => ({
            time,
           volume,
          })
        );

        

        formattedData.sort(
          (a, b) => new Date(`1970-01-01T${a.time}:00Z`).getTime() - new Date(`1970-01-01T${b.time}:00Z`).getTime()
        );

        setChartData(formattedData);
      } catch (err) {
        console.error("Chart error:", err);
        setError("Could not load recent transfers.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecentTransfers();
  }, [provider, token]);

  return (
    <div className="p-1">
      <div className="bg-[#57064f] text-white p-4 rounded-lg">
        <h2 className="text-lg font-bold mb-3">Transfer Volume (Last 20 Minutes)</h2>

        {loading ? (
          <p className="text-center text-sm text-gray-300">Loading chart...</p>
        ) : chartData.length === 0 ? (
          <p className="text-center text-sm text-gray-400">No recent transfer volume.</p>
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
