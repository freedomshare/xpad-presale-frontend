import BigNumber from "bignumber.js";

export enum PoolStatus {
    OPEN = 'OPEN',
    CLOSE = 'CLOSED'
}

export interface PoolModel {
    pid: number,
    logo: string,
    name: string,
    description: string,
    status: string,
    conversionname: string,
    conversionRate: string,
    cap: string,
    access: string,
    discordLink: string,
    telegramLink: string,
    twitterLink: string,
    websiteLink: string,
    startLimit: string,
    participants: string,
    progress: string,
    disabled: boolean
}

export interface PresaleConfig {
    stableCoin: string, 
    stableCoinDecimals: number,
    stableCoinSymbol: string,
    projectOwner: string,
    tokenAddress: string,
    tokenDecimal: number,
    tokenSymbol: string,
    tokenAmount: BigNumber,
    price: BigNumber,
    startBlock: number,
    endBlock: number,
    softCap: BigNumber,
    hardCap: BigNumber,
    allocation: BigNumber,
    address: string,
    depositAmount: BigNumber
}

export interface PresalePoolConfig extends PresaleConfig {
    pid: number,
    logo: string,
    name: string,
    description: string,
    status: string,
    conversionname: string,
    conversionRate: string,
    cap: string,
    access: string,
    discordLink: string,
    telegramLink: string,
    twitterLink: string,
    websiteLink: string,
    startLimit: string,
    participants: string,
    progress: string,
    disabled: boolean
}

export interface PresaleContributionConfig extends PresaleConfig {
    pid: number,
    stableCoinAmount: BigNumber,
    maximumContributeAmount: BigNumber,
    contributedAmount: BigNumber,
    hasClaimed: boolean
}