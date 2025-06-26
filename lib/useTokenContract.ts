// hooks/useTokenContract.ts
import { useWeb3 } from "@/context/Web3Context"
import { useToken } from "@/context/TokenContext"
import { Contract } from "ethers"

export const useTokenContract = () => {
  const { signer } = useWeb3()
  const { token } = useToken()

  if (!signer || !token) return null

  const contract = new Contract(token.address, token.abi, signer)
  return { contract }
}
