import React from 'react'
import styles from './Tier.module.css';
// import { TierModel } from './Tiers';
import { TierModel } from 'config/constants';

const Tier = (props: any) => {
    const tier: TierModel = props.tier;
    const index = props.index;


    return (
        <div className={`${styles.tier} mb-5 lg:mb-28 lg:flex-1`}>
            <div className={styles.tierTop}>
                <div className="flex py-8 justify-center">
                    <img src={tier.icon} alt={tier.name} className="mr-2"></img>
                    <h3 className=" text-xl lg:text-2xl font-bold">{tier.name}</h3>
                </div>
            </div>
            <div className="text-center">
                <p className="text-xl lg:text-2xl font-bold mt-3">{tier.tokenNumber}</p>
                <p className="text-sm lg:text-base mt-1">Xpad Tokens</p>
                <div className="flex items-center justify-center my-5">
                    <div className={styles.smallCircle}></div>
                    <div className={styles.bigCircle}></div>
                    <div className={styles.smallCircle}></div>
                </div>
                <p className="text-xl lg:text-2xl font-bold">{tier.weightNumber}</p>
                <p className="text-sm lg:text-base mt-1 pb-5">Pool Weight</p>
            </div>
            <div className={styles.tierLabel}>Tier {index + 1}</div>
        </div>
    )
}



export default Tier
