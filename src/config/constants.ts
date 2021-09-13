export interface TierModel {
    name: string,
    icon: string,
    tokenNumber: number,
    weightNumber: string
}

const tiers: TierModel[] = [
    {
        name: 'Bronze',
        icon: './bronze.svg',
        tokenNumber: 2000,
        weightNumber: '5%'
    },
    {
        name: 'Silver',
        icon: './silver.svg',
        tokenNumber: 5000,
        weightNumber: '10%'
    },
    {
        name: 'Gold',
        icon: './gold.svg',
        tokenNumber: 15000,
        weightNumber: '15%'
    },
    {
        name: 'Diamond',
        icon: './diamond.svg',
        tokenNumber: 25000,
        weightNumber: '20%'
    },
    {
        name: 'Platinum',
        icon: './platinum.svg',
        tokenNumber: 50000,
        weightNumber: '50%'
    }
];

export default tiers