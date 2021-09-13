import BigNumber from "bignumber.js";

export interface PresaleConfig {
    stableCoin: string, 
    projectOwner: string,
    tokenAddress: string,
    tokenAmount: BigNumber,
    price: BigNumber,
    startBlock: BigNumber,
    endBlock: BigNumber,
    softCap: BigNumber,
    hardCap: BigNumber,
    allocation: BigNumber,
    userData: {
        tokensBought: BigNumber,
        hasClaimed: boolean
    }
}