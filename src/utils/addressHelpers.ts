import { Address } from "config/contracts/types"
import Contracts from "config/contracts"

export const getAddress = (address: Address): string => {
    const chainId = process.env.REACT_APP_CHAIN_ID || 4
    return address[chainId] ? address[chainId] : address[4]
}

export const getXpadAddress = () => {
    return getAddress(Contracts.xpad)
}

export const getFactoryAddress = () => {
    return getAddress(Contracts.factory)
}

export const getMulticallAddress = () => {
    return getAddress(Contracts.multicall)
}