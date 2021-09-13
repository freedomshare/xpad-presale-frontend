import React from 'react'
import { useRouteMatch } from 'react-router-dom';
import Tier from './Tier'
import tiers, { TierModel } from 'config/constants';




const Tiers = () => {

    let { path } = useRouteMatch();
    const isPoolsPath = path.includes('pools');

    return (
        <div id="tiers" className="max-w-sm md:max-w-xl md:mx-auto lg:max-w-full mx-6 lg:mx-28 mt-20 lg:mt-80">
            <h2 className="text-base text-center text-gray-100 pl-10 mb-8 lg:text-5xl font-bold">{isPoolsPath ? 'ALLOCATION LIMIT' : 'TIERS'}</h2>
            <div className="pl-10 lg:flex lg:flex-wrap lg:max-w-screen-lg lg:justify-center lg:mx-auto">
                {
                    tiers.map(
                        (tier: TierModel, index: number) => {
                            return <Tier tier={tier} index={index} key={index} />
                        }
                    )
                }
            </div>
        </div>
    )
}

export default Tiers
