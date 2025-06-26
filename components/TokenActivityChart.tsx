"use client";

import React from "react";
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

const TokenActivityChart = () => {
  const { token } = useToken();

  // Simulated 7-day volume
  const data = [
    { date: "Mon", volume: 1500 },
    { date: "Tue", volume: 2100 },
    { date: "Wed", volume: 1800 },
    { date: "Thu", volume: 3000 },
    { date: "Fri", volume: 1200 },
    { date: "Sat", volume: 2800 },
    { date: "Sun", volume: 3500 },
  ];

  return (
    <div className="p-1">

    <div className="bg-[#57064f] text-white p-4 rounded-lg">
      <h2 className="text-lg font-bold mb-3">7-Day Transfer Volume (Mocked)</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="date" stroke="#ccc" />
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
    </div>
    </div>
  );
};

export default TokenActivityChart;
