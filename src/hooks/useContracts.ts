import { useMemo } from "react"
import { getERC20Contract, getFactoryContract, getPresaleContract, getXpadContract } from "utils/contractHelpers"
import useWeb3Provider from "./useWeb3Provider"

export const useERC20 = (address: string) => {
    const provider = useWeb3Provider()
    return useMemo(() => getERC20Contract(address, provider.getSigner()), [address, provider.getSigner()])
}

export const useFactoryContract = () => {
    const provider = useWeb3Provider()
    return useMemo(() => getFactoryContract(provider.getSigner()), [provider])
}

export const useXpadContract = () => {
    const provider = useWeb3Provider()
    return useMemo(() => getXpadContract(provider.getSigner()), [provider])
}

export const usePresaleContract = (address: string) => {
    const provider = useWeb3Provider()
    return useMemo(() => getPresaleContract(address, provider.getSigner()), [provider, address])
}