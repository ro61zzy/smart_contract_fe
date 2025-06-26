"use client";

import React from "react";

const WalletCard = () => {
  return (
    <div className="col-span-4 p-1 ">
      <div
        className="relative bg-gradient-to-br from-[#57064f] via-[#7e2a77] to-[#a34f9a]
                    p-6 rounded-xl shadow-lg text-white w-[100%] h-52 flex flex-col justify-between
                    font-mono overflow-hidden"
      >
        <div className="flex flex-col items-start">
          <p className="text-sm font-semibold tracking-wider opacity-90">
            My Wallet
          </p>
          <h3 className="text-l font-bold tracking-widest break-all">
            0x9837...0723
          </h3>
        </div>
        <div className="flex justify-between items-end mt-4">
          <div>
            <p className="text-sm opacity-90">Balance</p>
            <h1 className="text-2xl font-bold">USDT 0.009876</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletCard;
