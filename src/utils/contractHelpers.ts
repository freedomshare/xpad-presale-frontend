import { ethers } from 'ethers'
import { DEFAULT_GAS_PRICE } from "config"
import { simpleRpcProvider } from 'utils/providers'

import xpadABI from 'config/abi/xpad.json'
import factoryABI from 'config/abi/factory.json'
import presaleABI from 'config/abi/presale.json'
import erc20ABI from 'config/abi/erc20.json'
import multicallABI from 'config/abi/multicall.json'
import { getFactoryAddress, getMulticallAddress, getXpadAddress } from './addressHelpers'

export const getDefaultGasPrice = () => {
    const chainId = process.env.REACT_APP_CHAIN_ID
    return DEFAULT_GAS_PRICE
}

const getContract = (abi: any, address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
    const signerOrProvider = signer ?? simpleRpcProvider
    return new ethers.Contract(address, abi, signerOrProvider)
}

export const getERC20Contract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
    return getContract(erc20ABI, address, signer)
}

export const getXpadContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
    return getContract(xpadABI, getXpadAddress(), signer)
}

export const getFactoryContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
    return getContract(factoryABI, getFactoryAddress(), signer)
}

export const getPresaleContract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
    return getContract(presaleABI, address, signer)
}

export const getMulticallContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
    return getContract(multicallABI, getMulticallAddress(), signer)
}

