import styles from './PoolDetail.module.css';

interface PoolDetailProps {
    startDate? : number,
    endDate? : number,
    salePrice? : string,
    tokenTicker?: string,
    hardCap?: string,
    participants? : string 
}
const PoolDetail: React.FC<PoolDetailProps> = ({startDate, endDate, salePrice, tokenTicker, hardCap, participants}) => {

    const poolStartDate = startDate;
    const poolEndDate = endDate;
    const poolSalePrice = salePrice;
    const poolTokenTicker = tokenTicker;
    const poolHardCap = hardCap;
    const poolParticipants = participants;

    // const poolStartDate = new Date().toLocaleDateString();
    // const poolEndDate = new Date().toLocaleDateString();
    // const poolSalePrice = '1 BUSD = 100 TWIN';
    // const poolTokenTicker = 'TWIN';
    // const poolHardCap = '350K';
    // const poolParticipants = '340/502';


    return (
        <div className="max-w-xs md:max-w-sm lg:max-w-md mx-auto mt-20 lg:mt-80 pl-4">
            <ul className="px-5">
                <li>
                    <div className="w-full flex justify-between items-center">
                        <span className="text-gray-400 uppercase text-sm lg:text-base">Start Date</span>
                        <span className="text-gray-100 font-bold text-lg lg:text-xl">{startDate}</span>
                    </div>
                </li>
                <li>
                    <div className="w-full flex justify-between items-center">
                        <span className="text-gray-400 uppercase text-sm lg:text-base">End Date</span>
                        <span className="text-gray-100 font-bold text-lg lg:text-xl">{endDate}</span>
                    </div>
                </li>
            </ul>

            <div className={styles.startSeparator}></div>

            <ul className="px-5">
                <li>
                    <div className="w-full flex justify-between items-center">
                        <span className="text-gray-400 uppercase text-sm lg:text-base">Sale Price</span>
                        <span className="text-gray-100 font-bold text-lg lg:text-xl">{salePrice}</span>
                    </div>
                </li>
                <li>
                    <div className="w-full flex justify-between items-center">
                        <span className="text-gray-400 uppercase text-sm lg:text-base">Token Ticker</span>
                        <span className="text-gray-100 font-bold text-lg lg:text-xl">{tokenTicker}</span>
                    </div>
                </li>
                <li>
                    <div className="w-full flex justify-between items-center">
                        <span className="text-gray-400 uppercase text-sm lg:text-base">IDO Harcap</span>
                        <span className="text-gray-100 font-bold text-lg lg:text-xl">{poolHardCap}</span>
                    </div>
                </li>
                <li>
                    <div className="w-full flex justify-between items-center">
                        <span className="text-gray-400 uppercase text-sm lg:text-base">Participants</span>
                        <span className="text-gray-100 font-bold text-lg lg:text-xl">{participants}</span>
                    </div>
                </li>
            </ul>

            <div className={styles.endSeparator}></div>
        </div>
    )
}

export default PoolDetail
