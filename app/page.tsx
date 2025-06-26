import CheckBalanceForAnyAddress from "@/components/CheckBalanceForAnyAddress";
import ConnectWalletBTN from "@/components/ConnectWalletBTN";
import TokenActivity from "@/components/TokenActivity";
import TrackedToken from "@/components/TrackedToken";
import WalletCard from "@/components/WalletCard";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <div className="flex justify-between p-2 pt-[1rem]">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-2 sm:mb-0 drop-shadow-lg">
          Testnet Token Dashboard
        </h1>
        <ConnectWalletBTN />
      </div>
      <div className="grid grid-cols-2 gap-2 pt-10">
        <WalletCard />
        <div>
          <TrackedToken />
          <CheckBalanceForAnyAddress />
          <TokenActivity />
        </div>
      </div>
    </div>
  );
}
