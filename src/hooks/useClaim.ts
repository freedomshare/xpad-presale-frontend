import { useCallback} from 'react'
import { usePresaleContract } from './useContracts'



export const useClaim = (address: string) => {
    const presaleContract = usePresaleContract(address)
    const handleClaim = useCallback(async () => {
      try {
        const tx = await presaleContract.claimTokens()
        const receipt = await tx.wait()
        return receipt.status
      } catch (e) {
        console.error(e)
        return false
      }
    }, [presaleContract])
  
    return { onClaim: handleClaim }
}
 