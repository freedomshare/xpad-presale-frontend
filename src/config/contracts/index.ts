import multicall from 'utils/multicall'
import { NETWORK } from './types'

export default {
    xpad : {
        [NETWORK.Ethereum]: '',
        [NETWORK.Rinkeby]: '0xa74fdCd7E17203b837747E6F3fd9ebd022529787', 
        [NETWORK.Fantom]: '', 
    }, 
    factory : {
        [NETWORK.Ethereum]: '',
        [NETWORK.Rinkeby]: '0x3d6b1727E9Ec9176E5f4Cae6ACed66C10D217049',
        [NETWORK.Fantom]: '', 
    },
    multicall : {
        [NETWORK.Ethereum]: '',
        [NETWORK.Rinkeby]: '0xbfc380Bdcd610B431E6B5EEC8Fc4c2C67BbDcB90',
        [NETWORK.Fantom]: '', 
    }
}