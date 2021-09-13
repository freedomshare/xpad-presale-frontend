import React from 'react'
import Tier from './Feature'

const tiers: FeatureModel[] = [
    {
        name: 'Screening Projects',
        icon: './product.svg',
        description: 'All projects we choose to launch will be fully examined by our team. We do our homework before bringing these projects to you!',
        iconWidth: '39',
        iconHeight: '35'
    },
    {
        name: 'Community Interaction',
        icon: './chip.svg',
        description: 'We give you our investors the ability to vote on projects we should launch. This project belongs to us all.',
        iconWidth: '39',
        iconHeight: '39'
    },
    {
        name: 'Insurance Fund',
        icon: './database.svg',
        description: `All projects launching through us will pay into an insurance fund to protect our investors. We're all part of the system.`,
        iconWidth: '27',
        iconHeight: '35'
    },
    {
        name: 'Pre-Launch Raising',
        icon: './lock.svg',
        description: 'We introduce project we believe in to our community and help them get to term.',
        iconWidth: '32',
        iconHeight: '39'
    }
]


const Features = () => {
    return (
        <div id="features" className="max-w-sm md:max-w-xl md:mx-auto lg:max-w-full mx-6 lg:mx-28 mt-20 lg:mt-80">
            <h2 className="text-base text-center text-gray-100 pl-10 mb-8 lg:mb-20 lg:text-5xl font-bold">FEATURES</h2>
            <div className="pl-10 lg:pl-0 lg:flex ">
                {
                    tiers.map(
                        (tier: FeatureModel, index: number) => {
                            return <Tier tier={tier} index={index} key={index} />
                        }
                    )
                }
            </div>
        </div>
    )
}

export interface FeatureModel {
    name: string,
    icon: string,
    description: string,
    iconWidth: string,
    iconHeight: string
}

export default Features
