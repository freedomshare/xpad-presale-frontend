import { PoolModel } from 'config/types'

export enum PoolStatus {
    OPEN = "OPEN",
    CLOSED = "CLOSED"
}
export const PoolsData: PoolModel[] = [
    {
        pid: 0,
        logo: './twin.png',
        name: '',
        description: 'Twin2 is a DeFi protocol powered by smart contracts on the Binance Smart Chain network that enables the creation of synthetic assets called Twin Assets (T-Assets).',
        status: PoolStatus.OPEN,
        conversionname: '',
        conversionRate: '',
        cap: '',
        access: 'PRIVATE',
        discordLink: 'https://discord.com/',
        telegramLink: 'www.discord.com',
        twitterLink: 'www.discord.com',
        websiteLink: 'www.discord.com',
        startLimit: '',
        participants: '',
        progress: '0',
        disabled: false,
    },
    {
        pid: 1,
        logo: './twin.png',
        name: '',
        description: 'Twin2 is a DeFi protocol powered by smart contracts on the Binance Smart Chain network that enables the creation of synthetic assets called Twin Assets (T-Assets).',
        status: PoolStatus.OPEN,
        conversionname: '',
        conversionRate: '',
        cap: '',
        access: 'PRIVATE',
        discordLink: 'https://discord.com/',
        telegramLink: 'www.discord.com',
        twitterLink: 'www.discord.com',
        websiteLink: 'www.discord.com',
        startLimit: '',
        participants: '',
        progress: '0',
        disabled: false,
    },    
];
