import { useCallback, useEffect, useState } from 'react'
import { useFactoryContract } from './useContracts'


export const useUnStake = () => {
    const factoryContract = useFactoryContract()
    const handleUnStake = useCallback(async (amount: string) => {
      try {
        const tx = await factoryContract.unstake(amount)
        const receipt = await tx.wait()
        return receipt.status
      } catch (e) {
        console.error(e)
        return false
      }
    }, [factoryContract])
  
    return { onUnStake: handleUnStake }
}
