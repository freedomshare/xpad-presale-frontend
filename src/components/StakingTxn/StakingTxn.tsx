import { useWeb3React } from '@web3-react/core'
import { useCallback, useEffect, useState } from 'react'
import { getXpadAlloance, getXpadBalance, getXpadStakedAmount } from 'utils/callHelpers'
import StakingTxnButton from '../StakingTxnButton/StakingTxnButton'
import styles from './StakingTxn.module.css'
import tiers, { TierModel } from 'config/constants';
import { useApprove } from 'hooks/useApprove'
import { useERC20, useXpadContract } from 'hooks/useContracts'
import { getFactoryAddress} from 'utils/addressHelpers'
import useRefresh from 'hooks/useRefresh'
import { useUnStake } from 'hooks/useUnStake'
import { toast } from 'react-toastify'
import { BigNumber } from 'ethers'

const StakingTxn = () => {

    const { account } = useWeb3React()

    const [xPadBalance, setXPadBalance] = useState('')
    const [allowance, setAllowance] = useState(0)
    const { slowRefresh } = useRefresh()
    const { onUnStake } = useUnStake()
    const [pendingTx, setPendingTx] = useState(false)
    const [amount, setAmount] = useState(0)

    useEffect(() => {
        if (account) {
            getXpadBalance(account).then(balance => {
                setXPadBalance(balance.toFixed(2))
            })
            .catch(e => {
                console.error(e)
            })
            getXpadAlloance(account).then(allowedAmount => {
                setAllowance(allowedAmount)
            })
            .catch(e => {
                console.error(e)
            })
        }
    },[account, slowRefresh])

    const [requestedApproval, setRequestedApproval] = useState(false)
    const tokenContract = useXpadContract()
    const { onApprove } = useApprove(tokenContract, getFactoryAddress())


    const handleApprove = useCallback(async () => {
        try {
            console.log('handleApprove clicked')
          setRequestedApproval(true)
          await onApprove()
          setRequestedApproval(false)
        } catch (e) {
          console.error(e)
        }
      }, [onApprove, account])

    const [selectedToken, setSelectedToken] = useState('');
    const [selectedTxnMethod, setSelectedTxnMethod] = useState('deposit');
    const [stakedAmount, setStakedAmount] = useState(0)
    
    useEffect(() => {
        if (account) {
            getXpadStakedAmount(account).then(amount => {
                setStakedAmount(amount)
            })
            .catch(e => {
                console.error(e)
            })
        }
    }, [account])

    const handleWithdraw = useCallback(async () => {
        if (account) {
            if (amount > stakedAmount) {
                toast.warning('Invalid unstake amount')
                setAmount(0)
            } else {
                const unstakeAmount = BigNumber.from(amount).mul(BigNumber.from(10).pow(18))
                setPendingTx(true)
                const unstakeStatus = await onUnStake(unstakeAmount.toString())
                setPendingTx(false)
                if (unstakeStatus) {
                    toast.success(`Unstaked successfully`)
                } else {
                    toast.error(`Please try again. Confirm the transaction and make sure you are paying enough gas!`)
                }
            }
        } else {
            toast.warning('Please connect your wallet first')
        }
    },[onUnStake, account, stakedAmount, amount])    

    return (
        <div className="max-w-sm md:max-w-md lg:max-w-3xl mx-4 md:mx-auto mt-36 lg:mt-52">
            <div className="flex text-base lg:text-3xl text-gray-100 font-bold justify-center items-center mb-12">
                <button onClick={() => { setSelectedTxnMethod('deposit') }} className={"focus:outline-none mx-5 lg:hover:border-b-8 hover:border-b-4 pb-1 rounded-md " + (selectedTxnMethod === 'deposit' ? 'lg:border-b-8 border-b-4 pb-1' : '')}>Deposit</button>
                <button onClick={() => { setSelectedTxnMethod('withdraw') }} className={"focus:outline-none mx-5 lg:hover:border-b-8 hover:border-b-4 pb-1 rounded-md " + (selectedTxnMethod === 'withdraw' ? 'lg:border-b-8 border-b-4 pb-1' : '')}>Withdraw</button>
            </div>

            <div className={`${styles.txnCard} px-5 py-10 lg:p-16`}>
                {selectedTxnMethod === 'deposit' && <div>
                    <p className="text-base lg:text-2xl text-center mb-10 text-gray-300 italic">Deposit XPAD token To <br className="lg:hidden" /> get listed</p>
                    <div className="flex">
                        <div className="flex-1">
                            <div className="py-20 flex flex-col justify-center items-center border-2 border-gray-200 rounded-xl h-full mx-2 lg:mx-8">
                                <p className="text-base lg:text-2xl text-gray-200 italic mb-5">Your Balance</p>
                                <p className="text-lg lg:text-3xl text-gray-100 font-bold underline mb-4">{xPadBalance} XPAD</p>
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="flex flex-col px-2 lg:px-20 w-full h-full justify-between">
                                { tiers.map((tier: TierModel, index: number) => {
                                    return <StakingTxnButton isActive={allowance > 50000} onSelect={(value: string) => { setSelectedToken(value) }} src={tier.icon} name={tier.name} tokenNumber={tier.tokenNumber} />
                                })}
                            </div>
                        </div>
                    </div>
                    { allowance == 0 ?
                        <button className="txnButton text-xl font-bold px-8 mx-auto mt-10 py-1 flex justify-center items-center" disabled={requestedApproval} onClick={handleApprove}>Approve</button> : null}
                </div>}
                {
                    selectedTxnMethod === 'withdraw' && <div className="max-w-xs mx-auto">
                        <ul >
                            <li className="mb-2">
                                <div className="w-full flex justify-between items-center">
                                    <span className="text-gray-400 italic uppercase text-sm lg:text-base">Total Staked Amount</span>
                                    <span className="text-gray-100 font-bold text-lg lg:text-xl">{stakedAmount.toString()} XPAD</span>
                                </div>
                            </li>
                        </ul>
                        { account && stakedAmount > 0 ?
                            <>
                                <input className={`${styles.WithdrawAmountInput} font-sm mb-3`} type="number" name="amount" id="amount" placeholder="Enter Amount in XPAD" value={amount} 
                                onChange={(e) => {
                                    setAmount(parseInt(e.target.value))
                                }} />
                                <button className="txnButton text-xl font-bold px-8 mx-auto mt-10 py-1 flex justify-center items-center" 
                                disabled={pendingTx} onClick={handleWithdraw}>Withdraw</button>
                            </> : 
                            null
                        }
                        
                    </div>
                }
            </div>

        </div>
    )
}

export default StakingTxn
