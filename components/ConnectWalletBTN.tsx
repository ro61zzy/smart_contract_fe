"use client"
import React, { useState } from "react"
import { useWeb3 } from "@/context/Web3Context"

const ConnectWalletBTN = () => {
  const { connectWallet, address } = useWeb3()
  const [loading, setLoading] = useState(false)

  const handleConnect = async () => {
    setLoading(true)
    await connectWallet()
    setLoading(false)
  }

  return (
    <button
      onClick={handleConnect}
      disabled={loading}
      className={`bg-[#89087c] p-2 w-64 rounded-lg ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <p className="text-white font-bold">
        {address
          ? `Connected: ${address.slice(0, 6)}...${address.slice(-4)}`
          : loading
          ? "Connecting..."
          : "Connect Wallet"}
      </p>
    </button>
  )
}

export default ConnectWalletBTN
