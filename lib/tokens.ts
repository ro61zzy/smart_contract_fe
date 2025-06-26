
import { ERC20_ABI, WETH_ABI, USDC_ABI } from "./abis"

export interface Token {
  name: string
  symbol: string
  address: string
  decimals: number
  abi: any
}

export const TRACKED_TOKENS: Token[] = [
  {
    name: "Wrapped ETH",
    symbol: "WETH",
    address: "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9",
    decimals: 18,
     abi: WETH_ABI,
  },
  {
    name: "USDC (Testnet)",
    symbol: "USDC",
    address: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
    decimals: 6,
    abi: USDC_ABI,
  },
  {
    name: "Tether USD (Testnet)",
    symbol: "USDT",
    address: "0x7169D38820dfd117C3FA1f22a697dBA58d90BA06",
    decimals: 6,
    abi: ERC20_ABI, 
  },
  {
    name: "OKB (Testnet)",
    symbol: "OKB",
    address: "0x3F4B6664338F23d2397c953f2AB4Ce8031663f80",
    decimals: 18,
    abi: ERC20_ABI,
  },
  {
    name: "ChainLink Token (Testnet)",
    symbol: "LINK",
    address: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
    decimals: 18,
    abi: ERC20_ABI,
  },
]
