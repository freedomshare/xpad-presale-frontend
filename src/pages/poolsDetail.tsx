import { PresalePoolConfig } from 'config/types';
import { useParams } from 'react-router-dom';
import Header from '../components/Header/Header';
import PoolDetail from '../components/PoolDetail/PoolDetail';
import PoolTransaction from '../components/PoolTransaction/PoolTransaction';
import Tiers from '../components/Tiers/Tiers';

interface PoolsDetailProps {
    presales: PresalePoolConfig[]
}

const PoolsDetail: React.FC<PoolsDetailProps> = (configs) => {

    let params: any = useParams();
    const poolId = params.poolId;
    const { presales } = configs
    const presale = presales.find((item) => item.pid == poolId)

    

    const header = 'COLLATERALIZED ASSETS ON BSC';
    const description = presale?.description;
    const logo = presale?.logo;

    return (
        <div>
            <Header header={header} description={description} logo={logo} />
            <PoolDetail 
                startDate={presale?.startBlock}
                endDate={presale?.endBlock}
                salePrice={presale?.conversionRate}
                tokenTicker={presale?.tokenSymbol}
                hardCap={presale?.cap}
                participants={presale?.startLimit}
            />
            <Tiers /> 
            { presale ? 
                <PoolTransaction pool={presale} /> : null
            }
        </div>
    )
}
 
export default PoolsDetail
