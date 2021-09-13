import { getERC20Contract, getFactoryContract, getPresaleContract, getXpadContract } from "./contractHelpers";
import { ethers } from 'ethers'
import multicall from "./multicall";
import presaleABI from "config/abi/presale.json"
import erc20ABI from "config/abi/erc20.json"
import xpadABI from "config/abi/xpad.json"
import factoryABI from "config/abi/factory.json"
import { PoolStatus, PresaleConfig, PresalePoolConfig } from "config/types";
import { PoolModel } from "config/types";
import BigNumber from "bignumber.js";
import { getBalanceNumber, getFullDisplayBalance, getFullDisplayBalance2 } from "./formatBalance";
import web3NoAccount from "./web3";
import { getFactoryAddress, getXpadAddress } from "./addressHelpers";
import { simpleRpcProvider } from "./providers";
import tiers from "config/constants";
import { DEFAULT_TOKEN_DECIMAL, XPAD_TOKEN_DECIMAL } from "config";


export const approve = async (tokenContract, spender, account) => {
    return tokenContract.methods
    .approve(spender, ethers.constants.MaxUint256)
    .send({ from: account })    
}

export const getPresaleCount = async () => {
    const factoryContract = getFactoryContract();
    const presaleTotal = await factoryContract.presaleTotal()
    return presaleTotal;
}

export const getPresaleContracts = async () => {
    const factoryContract = getFactoryContract();
    const presaleTotal = await getPresaleCount();
    for (let idx = 0; idx < presaleTotal; idx++) {
        const presaleAddress = await factoryContract.presaleMap(idx)
    }
}
export const getPresaleAllInfo = async (pools: PoolModel[]) : Promise<PresalePoolConfig[]> => {
    let presales: PresalePoolConfig[] = []

    const currentBlockNumber = await web3NoAccount.eth.getBlockNumber()
    for (let pool of pools) {
        const presale = await getPresaleInfo(pool.pid)

        // const progress = presale.depositAmount.div(presale.hardCap).times(new BigNumber(100))
        const depositAmount = new BigNumber(presale.depositAmount.toString())
        const hardCap = new BigNumber(presale.hardCap.toString())
        const progress = depositAmount.div(hardCap).times(100).toFixed(2)
        const depositBalance = getFullDisplayBalance2(depositAmount, presale.stableCoinDecimals)
        const hardCapBalance = getFullDisplayBalance2(hardCap, presale.stableCoinDecimals)
        const startLimit = `${depositBalance}/${hardCapBalance}`

        let poolStatus = PoolStatus.OPEN
        if (currentBlockNumber < presale.startBlock || currentBlockNumber > presale.endBlock || depositAmount >= hardCap) {
            poolStatus = PoolStatus.CLOSE
        } 
        presales.push({
            pid: pool.pid,
            logo: pool.logo,
            name: presale.tokenSymbol,
            description: pool.description,
            status: poolStatus,
            conversionname: `${presale.stableCoinSymbol}/${presale.tokenSymbol}`,
            conversionRate: `${presale.price.toString()} ${presale.stableCoinSymbol} = 1 ${presale.tokenSymbol}`,
            cap: getFullDisplayBalance2(hardCap,presale.stableCoinDecimals),
            access: pool.access,
            discordLink: pool.discordLink,
            telegramLink: pool.telegramLink,
            twitterLink: pool.twitterLink,
            websiteLink: pool.websiteLink,
            startLimit: startLimit,
            participants: pool.participants,
            progress: progress,
            disabled: pool.disabled,
            stableCoin: presale.stableCoin, 
            stableCoinDecimals: presale.stableCoinDecimals,
            projectOwner: presale.projectOwner,
            tokenAddress: presale.tokenAddress,
            tokenAmount: new BigNumber(presale.tokenAmount.toString()),
            price: new BigNumber(presale.price.toString()),
            startBlock: presale.startBlock,
            endBlock: presale.endBlock,
            softCap: new BigNumber(presale.softCap.toString()),
            hardCap: hardCap,
            allocation: new BigNumber(presale.allocation.toString()),
            address: presale.address,
            depositAmount: depositAmount,
            stableCoinSymbol: presale.stableCoinSymbol,
            tokenDecimal: presale.tokenDecimal,
            tokenSymbol: presale.tokenSymbol            
        })
    }
    return presales
}

export const getPresaleInfo = async (pid: number): Promise<PresaleConfig> => {
    const factoryContract = getFactoryContract()
    const presaleAddress = await factoryContract.presaleMap(pid)
    const presaleContract = getPresaleContract(presaleAddress)

    const calls = [
        {
            address: presaleAddress,
            name: 'stablecoin'
        },
        {
            address: presaleAddress,
            name: 'projectOwner'
        },
        {
            address: presaleAddress,
            name: 'tokenAddress'
        },
        {
            address: presaleAddress,
            name: 'tokenAmount'
        },
        {
            address: presaleAddress,
            name: 'price'
        },
        {
            address: presaleAddress,
            name: 'startBlock'
        },
        {
            address: presaleAddress,
            name: 'endBlock'
        }, 
        {
            address: presaleAddress,
            name: 'softCap'
        },
        {
            address: presaleAddress,
            name: 'hardCap'
        },
        {
            address: presaleAddress,
            name: 'allocation'
        },
    ]

    const [
        stableCoin,
        projectOwner,
        tokenAddress,
        tokenAmount,
        price,
        startBlock,
        endBlock,
        softCap,
        hardCap,
        allocation
    ] = await multicall(presaleABI, calls)


    const balanceCalls = [
        {   
            address: stableCoin[0],
            name: 'balanceOf',
            params: [presaleAddress]
        },
        {
            address: stableCoin[0],
            name: 'decimals'
        },
        {
            address: stableCoin[0],
            name: 'symbol'
        },
        {
            address: tokenAddress[0],
            name: 'decimals'
        },
        {
            address: tokenAddress[0],
            name: 'symbol'
        }                
    ]
    const [
        stableCoinBalance,
        stableCoinDecimals,
        stableCoinSymbol,
        tokenDecimal,
        tokenSymbol
    ] = await multicall(erc20ABI, balanceCalls)

    return {
        stableCoin: stableCoin[0],
        projectOwner: projectOwner[0],
        tokenAddress: tokenAddress[0],
        tokenAmount: tokenAmount[0],
        price: price[0],
        startBlock: startBlock[0].toNumber(),
        endBlock: endBlock[0].toNumber(),
        softCap: softCap[0],
        hardCap: hardCap[0],
        allocation: allocation[0],
        address: presaleAddress,
        depositAmount: stableCoinBalance[0],
        stableCoinDecimals: stableCoinDecimals[0],
        stableCoinSymbol: stableCoinSymbol[0],
        tokenDecimal: tokenDecimal[0],
        tokenSymbol: tokenSymbol[0]
    }
}

export const getXpadBalance = async (account : string) => {
    const xPadAddress = getXpadAddress()
    const calls = [
        {   
            address: xPadAddress,
            name: 'balanceOf',
            params: [account]
        },
        {
            address: xPadAddress,
            name: 'decimals'
        },
    ]

    const [balance, decimal] = await multicall(xpadABI, calls)
    return getBalanceNumber(balance, decimal)
}

export const getXpadAlloance = async (account : string) => {
    const xPadAddress = getXpadAddress()
    const factoryAddress = getFactoryAddress()
    const calls = [
        {   
            address: xPadAddress,
            name: 'allowance',
            params: [account, factoryAddress]
        },
        {
            address: xPadAddress,
            name: 'decimals'
        },        
    ]

    const [allowance, decimal] = await multicall(xpadABI, calls)
    return getBalanceNumber(new BigNumber(allowance[0].toString()), decimal)
}

export const getXpadStakedAmount = async (account : string) => {
    const xPadAddress = getXpadAddress()
    const factoryAddress = getFactoryAddress()
    const calls = [
        {   
            address: factoryAddress,
            name: 'stakedAmount',
            params: [account]
        }       
    ]

    const stakedAmount = await multicall(factoryABI, calls)
    const xPadContract = getXpadContract()
    const decimal = await xPadContract.decimals()
    return getBalanceNumber(new BigNumber(stakedAmount[0].toString()), decimal)
}

export const getContributedInfo = async (account : string, presaleConfig: PresaleConfig) => {

    const factoryAddress = getFactoryAddress()
    const stableCoinContract = getERC20Contract(presaleConfig.stableCoin)
    const presaleContract = getPresaleContract(presaleConfig.address)
    const rawTokensBought = await presaleContract.tokensBought(account)
    const tokensBought = new BigNumber(rawTokensBought.toString())
    const rawStableCoinBalance = await stableCoinContract.balanceOf(account)

    const calls = [
        {
            address: factoryAddress,
            name: 'stakedAmount',
            params: [account]
        },
        {
            address: factoryAddress,
            name: 'stakedBlock',
            params: [account]
        },
        {
            address: factoryAddress,
            name: 'minBlocksStaked'            
        }
    ]
    const [rawStakedAmount, rawStakedBlockNumber, rawMintBlockStaked] = await multicall(factoryABI, calls)

    const calls2 = [
        {   
            address: presaleConfig.stableCoin,
            name: 'allowance',
            params: [account, presaleConfig.address]
        },
        {   
            address: presaleConfig.stableCoin,
            name: 'balanceOf',
            params: [presaleConfig.address]
        }        
        
    ]

    const [rawAllowance, rawPresaleStableBalance] = await multicall(erc20ABI, calls2) 
    const allowance = new BigNumber(rawAllowance[0].toString())
    const presaleStableBalance = new BigNumber(rawPresaleStableBalance[0].toString())


    const stableCoinBalance = getBalanceNumber(new BigNumber(rawStableCoinBalance.toString()), presaleConfig.stableCoinDecimals)
    const stakedAmount = getBalanceNumber(new BigNumber(rawStakedAmount[0].toString()), XPAD_TOKEN_DECIMAL)
    const stakedBlockNumber = (new BigNumber(rawStakedBlockNumber[0].toString())).toNumber()
    const mintBlockStaked = (new BigNumber(rawMintBlockStaked[0].toString())).toNumber()
    const blockNumber = await simpleRpcProvider.getBlockNumber()

    
    let tierIdx = -1
    let tierAmount = new BigNumber(0)
    if (stakedBlockNumber + mintBlockStaked > presaleConfig.startBlock) {
        // Tier.NONE
        tierIdx = -1
    } else {
        for (let idx = 0; idx < tiers.length; idx++) {
            if (stakedAmount >= tiers[idx].tokenNumber) {
                tierIdx = idx
            }
        }
    }

    if (tierIdx == -1) {
        tierAmount = new BigNumber(0)
    } else if (tierIdx == 0) {
        tierAmount = presaleConfig.allocation
    } else if (tierIdx == 1) {
        tierAmount = presaleConfig.allocation.times(2)
    } else if (tierIdx == 2) {
        tierAmount = presaleConfig.allocation.times(3)
    } else if (tierIdx == 3) {
        tierAmount = presaleConfig.allocation.times(4.5)
    } else if (tierIdx == 4) {
        tierAmount = presaleConfig.allocation.times(9)
    }

    const buyAmount = tierAmount.times(presaleConfig.price)
    const maxContributionAmount = tierAmount.times(presaleConfig.price).times(presaleConfig.price)
    const maxContributionAmountFormatted = getBalanceNumber(maxContributionAmount, presaleConfig.stableCoinDecimals)

    const contributionAmount = tokensBought.times(presaleConfig.price)
    const contributedAmountFormatted = getBalanceNumber(contributionAmount, presaleConfig.stableCoinDecimals)

    return {
        allowance: allowance,
        stableCoinBalance: stableCoinBalance,
        stakedAmount: stakedAmount,
        stakedBlockNumber: stakedBlockNumber,
        mintBlockStaked: mintBlockStaked,
        blockNumber: blockNumber,
        buyAmount: buyAmount,
        maxContributionAmount: maxContributionAmountFormatted,
        contributionAmount: contributedAmountFormatted,
        presaleStableBalance: presaleStableBalance
    }
}

