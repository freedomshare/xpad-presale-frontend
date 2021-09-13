import { useCallback} from 'react'
import { usePresaleContract } from './useContracts'



export const useBuy = (address: string) => {
    const presaleContract = usePresaleContract(address)
    const handleBuy = useCallback(async (amount: string) => {
      try {
        const tx = await presaleContract.buy(amount)
        const receipt = await tx.wait()
        return receipt.status
      } catch (e) {
        console.error(e)
        return false
      }
    }, [presaleContract])
  
    return { onBuy: handleBuy }
}
