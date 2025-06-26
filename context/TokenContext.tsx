"use client"

import { createContext, useContext, useState } from "react"
import { TRACKED_TOKENS, Token } from "@/lib/tokens"
import { TokenContextType } from "@/types/types"



const TokenContext = createContext<TokenContextType | undefined>(undefined)

export const TokenProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<Token>(TRACKED_TOKENS[0]) // default to WETH
  const [tokenBalance, setTokenBalance] = useState<string>("0")

  return (
    <TokenContext.Provider value={{ token, setToken, tokenBalance, setTokenBalance }}>
      {children}
    </TokenContext.Provider>
  )
}

export const useToken = () => {
  const context = useContext(TokenContext)
  if (!context) throw new Error("useToken must be used within TokenProvider")
  return context
}