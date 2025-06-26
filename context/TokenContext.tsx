"use client"

import { createContext, useContext, useState } from "react"
import { TRACKED_TOKENS, Token } from "@/lib/tokens"

interface TokenContextType {
  token: Token
  setToken: (token: Token) => void
}

const TokenContext = createContext<TokenContextType | undefined>(undefined)

export const TokenProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<Token>(TRACKED_TOKENS[0]) // default to WETH

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  )
}

export const useToken = () => {
  const context = useContext(TokenContext)
  if (!context) throw new Error("useToken must be used within TokenProvider")
  return context
}
