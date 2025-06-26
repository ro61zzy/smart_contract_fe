"use client";

import { useWeb3 } from "@/context/Web3Context"
import { useToken } from "@/context/TokenContext"

const WalletCard = () => {
  const { address } = useWeb3();
  const { token, tokenBalance } = useToken();

  const shortenAddress = (addr: string | null) =>
    addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : "—";

  return (
    <div className=" p-1">
      <div className="relative bg-gradient-to-br from-[#57064f] via-[#7e2a77] to-[#a34f9a]
          p-6 rounded-xl shadow-lg text-white w-full h-52 flex flex-col justify-between
          font-mono overflow-hidden">
        <div className="flex flex-col items-start">
          <p className="text-sm font-semibold tracking-wider opacity-80">
            My Wallet
          </p>
          <h3 className="text-l font-bold tracking-widest break-all">
            {shortenAddress(address)}
          </h3>
        </div>
        <div className="flex justify-between items-end mt-4">
          <div>
            <p className="text-sm opacity-90">Balance</p>
            <h1 className="text-2xl font-bold">
              {token.symbol} {parseFloat(tokenBalance).toFixed(4)}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletCard;

