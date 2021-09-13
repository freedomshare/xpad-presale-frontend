import { useWeb3React } from '@web3-react/core';
import { BigNumber } from 'ethers';
import { useStake } from 'hooks/useStake';
import { useState } from 'react';
import { toast } from 'react-toastify';
import styles from './StakingTxnButton.module.css';


const StakingTxnButton = (props: any) => {

    const { src, name, tokenNumber, onSelect, isActive } = props;

    const [pendingTx, setPendingTx] = useState(false)
    const { account } = useWeb3React()
    const { onStake } = useStake()
    const handleStake = async (amount : string) => {
        if (account) {
            const result = await onStake(amount)
            return result
        }

        return false
    }

    return (
        <button disabled={pendingTx}  onClick={async () => { 
            setPendingTx(true)
            try {
                const tokenAmount = BigNumber.from(tokenNumber).mul(BigNumber.from(10).pow(18))
                const stakeStatus = await handleStake(tokenAmount.toString())
                if (stakeStatus)
                    toast.success(`Your ${name} funds have been staked in the farm`)
                else
                    toast.error('Please try again. Confirm the transaction and make sure you are paying enough gas!')
            } catch (e) {
                toast.error('Please try again. Confirm the transaction and make sure you are paying enough gas!')
            } finally {
                setPendingTx(false)
            }
        }} className={`txnButton text-lg lg:text-xl font-bold px-3 py-1 flex justify-center items-center ` + (isActive ? `${styles.activeButton}` : '')}>
            <img src={src} alt={name} width="16px" height="16px" className="mr-3" />
            {name}
        </button>
    )
}

export default StakingTxnButton
