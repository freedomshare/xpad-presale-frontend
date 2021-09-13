import React from 'react'
import styles from './Feature.module.css';
import { FeatureModel } from './Features';

const Feature = (props: any) => {
    const feature: FeatureModel = props.tier;

    return (
        <div className={`${styles.feature} mb-5 p-6 flex flex-col`}>
            <div className={`${styles.iconCircle} p-4 self-start`}>
                <img src={feature.icon} alt={feature.name} width={feature.iconWidth} height={feature.iconHeight} />
            </div>
            <p className="text-gray-100 text-sm lg:text-xl font-bold mt-3 lg:w-2/3">{feature.name}</p>
            <p className="mt-3 text-gray-400 text-xs lg:text-sm pb-5">{feature.description}</p>
        </div>
    )
}



export default Feature
