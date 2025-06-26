//types/types.tsx

import { Token } from "@/lib/tokens"

export interface TokenContextType {
  token: Token
  setToken: (token: Token) => void
  tokenBalance: string
  setTokenBalance: (balance: string) => void
}