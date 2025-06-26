"use client";

import { useState, useEffect } from "react";
import CheckBalanceForAnyAddress from "@/components/CheckBalanceForAnyAddress";
import ConnectWalletBTN from "@/components/ConnectWalletBTN";
import TokenActivityChart from "@/components/TokenActivityChart";
import TokenTransferFeed from "@/components/TokenTransferFeed";
import TrackedToken from "@/components/TrackedToken";
import WalletCard from "@/components/WalletCard";
import { Sun, Moon } from "lucide-react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setDarkMode(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div
      className={`${
        darkMode ? "bg-[#0c0c0c] text-white" : "bg-white text-black"
      } min-h-screen px-4 md:px-8 py-6 transition-colors duration-300`}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 drop-shadow-lg">
          Testnet Token Dashboard
        </h1>
        <div className="flex items-center gap-3">
          <ConnectWalletBTN />
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-gray-300 dark:bg-gray-800 text-black dark:text-white px-3 py-3 rounded-md hover:opacity-80 transition"
            title="Toggle Theme"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 ">
        <div className="md:col-span-4">
          <WalletCard />
          <CheckBalanceForAnyAddress />
        </div>

        <div className="md:col-span-8">
          <TrackedToken />
          <TokenTransferFeed />
          <TokenActivityChart />
        </div>
      </div>
    </div>
  );
}
