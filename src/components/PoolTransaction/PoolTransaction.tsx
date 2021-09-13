import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import { PresaleConfig } from 'config/types';
import { useApprove } from 'hooks/useApprove';
import { useBuy } from 'hooks/useBuy';
import { useClaim } from 'hooks/useClaim';
import { useERC20 } from 'hooks/useContracts';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getFactoryAddress } from 'utils/addressHelpers';
import { getContributedInfo } from 'utils/callHelpers';
import styles from './PoolTransaction.module.css';

interface PoolTransactionProps {
    pool : PresaleConfig
}
const PoolTransaction: React.FC<PoolTransactionProps> = (props) => {

    const [isBuyingModal, setIsBuyingModal] = useState(false);
    const [isClaimingModal, setIsClaimingModal] = useState(false);
    const poolData = props.pool

    const { account } = useWeb3React()
    const [stableCoinBalance, setStableCoinBalance] = useState(0)
    const [maxContibutionAmount, setMaxContributionAmount] = useState(0)
    const [contributedAmount, setContributedAmount] = useState(0)
    const [currentBlockNumber, setCurrentBlockNumber] = useState(0)
    const [buyAmount, setBuyAmount] = useState(new BigNumber(0))
    const [stablePresaleBalance, setStablePresaleBalance] = useState(new BigNumber(0))
    const [allowance, setAllowance] = useState(new BigNumber(0))
    const [pendingTx, setPendingTx] = useState(false)

    const stableCoinContract = useERC20(poolData?.stableCoin || '')
    const { onApprove } = useApprove(stableCoinContract, poolData.address)
    const handleApprove = useCallback(async () => {
        try {
          setPendingTx(true)
          await onApprove()
          setPendingTx(false)
        } catch (e) {
          console.error(e)
        }
      }, [onApprove, account])    

    useEffect(() => {
        if (account && poolData) {
            getContributedInfo(account, poolData).then( contributedInfo => {
                console.log(contributedInfo)
                setStableCoinBalance(contributedInfo.stableCoinBalance)
                setMaxContributionAmount(contributedInfo.maxContributionAmount)
                setContributedAmount(contributedInfo.contributionAmount)
                setAllowance(contributedInfo.allowance)
                setCurrentBlockNumber(contributedInfo.blockNumber)
                setStablePresaleBalance(contributedInfo.presaleStableBalance)
                setBuyAmount(contributedInfo.buyAmount)

            })
            .catch(e => {

            })
        }
    },[account, poolData])

    const { onBuy } = useBuy(poolData.address)
    const handleBuy = useCallback(async (amount: string) => {
        try {
            setPendingTx(true)
            setIsBuyingModal(true);
            await onBuy(amount)
            setPendingTx(false)
            setIsBuyingModal(false)
          } catch (e) {
            console.error(e)
          }
    },[onBuy, account])

    const { onClaim } = useClaim(poolData.address)
    const handleClaim = useCallback(async () => {
        try {
            setPendingTx(true)
            setIsClaimingModal(true);
            await onClaim()
            setPendingTx(false)
            setIsClaimingModal(false);
          } catch (e) {
            console.error(e)
          }        
    }, [onClaim, account])
    const handleClose = () => {
        isBuyingModal ? setIsBuyingModal(false) : setIsClaimingModal(false);
    }

    return (
        <div className="mx-3 max-w-2xl lg:mx-auto mt-20 lg:mt-80 relative">
            <div className={`px-6 lg:px-24 py-16 ${styles.poolTxnContainer}`}>
                <div>
                    <ul >
                        <li className="mb-2">
                            <div className="w-full flex justify-between items-center">
                                <span className="text-gray-400 italic uppercase text-sm lg:text-base">Your BALANCE</span>
                                <span className="text-gray-100 font-bold text-lg lg:text-xl">{stableCoinBalance} {poolData?.stableCoinSymbol}</span>
                            </div>
                        </li>
                        <li className="mb-2">
                            <div className="w-full flex justify-between items-center">
                                <span className="text-gray-400 italic uppercase text-sm lg:text-base">Your maximum Contribution</span>
                                <span className="text-gray-100 font-bold text-lg lg:text-xl">{maxContibutionAmount} {poolData?.stableCoinSymbol}</span>
                            </div>
                        </li>
                        <li className="mb-2">
                            <div className="w-full flex justify-between items-center">
                                <span className="text-gray-400 italic uppercase text-sm lg:text-base">Your Contribution</span>
                                <span className="text-gray-100 font-bold text-lg lg:text-xl">{contributedAmount} {poolData?.stableCoinSymbol}</span>
                            </div>
                        </li>
                        <li className="mb-2">
                            <div className="w-full flex justify-between items-center">
                                <span className="text-gray-400 italic uppercase text-sm lg:text-base">Remaining Contribution</span>
                                <span className="text-gray-100 font-bold text-lg lg:text-xl">{maxContibutionAmount - contributedAmount} {poolData?.stableCoinSymbol}</span>
                            </div>
                        </li>
                    </ul>
                    <form className="mt-10">
                        <div className="grid grid-rows-4 grid-cols-poolTxnSm grid-flow-col lg:grid-flow-row lg:grid-rows-2 lg:grid-cols-poolTxnLg">
                            {/* <input className={`${styles.poolDetailInput} font-sm mb-3`} type="text" name="amount" id="amound" placeholder="Enter Amount in BUSD" />
                            <div className="lg:row-span-3 col-start-2 grid justify-center content-start" >
                                <button className="text-gray-100 border-2 px-6 py-1.5 border-gray-400 rounded-lg ">MAX</button>
                            </div> */}
                            { allowance.gt(0) ?
                                ( maxContibutionAmount > 0 && contributedAmount == 0 && currentBlockNumber >= poolData.startBlock && currentBlockNumber < poolData.endBlock ?
                                    <button type="button" disabled={pendingTx} onClick={async () => {
                                        await handleBuy(buyAmount.toString())
                                    }} className={`${styles.poolDetailButton} px-8 font-bold mb-3`}>BUY</button>
                                : (currentBlockNumber > poolData.endBlock && contributedAmount > 0 && stablePresaleBalance.gte(poolData.softCap)) ?   
                                <button type="button" disabled={pendingTx} onClick={async () => {
                                    await handleClaim()
                                }} className={`${styles.poolDetailButton} px-6 font-bold mb-3`}>CLAIM</button>
                                : null)
                             : 
                                <button type="button" disabled={pendingTx} onClick={handleApprove} className={`${styles.poolDetailButton} px-6 font-bold mb-3`}>APPROVE</button>
                            }
                        </div>
                    </form>
                </div>
            </div>
            {(isBuyingModal || isClaimingModal) && <div className={`absolute flex justify-center items-center inset-0 w-full h-full ${styles.modal}`}>
                <div className="bg-black rounded-xl flex justify-center items-start w-8/12 p-10 relative">
                    <button type="button" onClick={() => { handleClose() }}><img src="/close.svg" alt="close modal" width="11px" height="11px" className="absolute right-4 top-4" /></button>
                    <p className="text-gray-100 text-center text-sm lg:text-lg">The <span>{isBuyingModal ? 'Buying' : 'Claiming'}</span> is on Progress</p>
                </div>
            </div>}
        </div>
    )
}

export default PoolTransaction
