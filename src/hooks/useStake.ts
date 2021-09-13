import { useCallback, useEffect, useState } from 'react'
import { useFactoryContract } from './useContracts'


export const useStake = () => {
    const factoryContract = useFactoryContract()
    const handleStake = useCallback(async (amount: string) => {
      try {
        const tx = await factoryContract.stake(amount)
        const receipt = await tx.wait()
        return receipt.status
      } catch (e) {
        console.error(e)
        return false
      }
    }, [factoryContract])
  
    return { onStake: handleStake }
}
