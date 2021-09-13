import { Link } from 'react-router-dom';
import { PoolStatus, PresalePoolConfig } from 'config/types';
import styles from './Pool.module.css';

const Pool = (props: any) => {

    const pool: PresalePoolConfig = props.pool;
    const { pid, logo, name, description, status, startLimit, participants, conversionname, conversionRate, cap, access, progress, discordLink, telegramLink, twitterLink, websiteLink } = pool;

    return (
        <div className={`${styles.pool} mx-auto mb-5 lg:m-5`}>
            <div className="flex px-5 py-10">
                <div className="flex flex-col flex-1 items-center ">
                    <div>
                        <img src={logo} alt={name} width="148px" height="148px" />
                    </div>
                    { status == PoolStatus.OPEN ?
                        <Link to={ `/pools/${pid}`} className="text-gray-100 mt-3 lg:mt-0 text-xl lg:text-3xl">{name}</Link>
                        : <p className="text-gray-100 mt-3 lg:mt-0 text-xl lg:text-3xl">{name}</p>
                    }
                    
                </div>
                <div className="flex flex-col flex-2 pl-4">
                    <p className="text-tiniest lg:text-sm text-gray-400">{description}</p>
                    <div className="flex mt-5">
                        {(discordLink && discordLink !== '') && <a target="_blank" rel="noreferrer" href={discordLink} className={styles.icon}>
                            <img src="./discordBlack.svg" alt="discord link" width="18px" height="13px" />
                        </a>}
                        {(telegramLink && telegramLink !== '') && <a target="_blank" rel="noreferrer" href={telegramLink} className={styles.icon}>
                            <img src="./telegramBlack.svg" alt="telegram link" width="16px" height="13px" />
                        </a>}
                        {(twitterLink && twitterLink !== '') && <a target="_blank" rel="noreferrer" href={twitterLink} className={styles.icon}>
                            <img src="./twitterBlack.svg" alt="twitter link" width="17px" height="14px" />
                        </a>}
                        {(websiteLink && websiteLink !== '') && <a target="_blank" rel="noreferrer" href={websiteLink} className={styles.icon}>
                            <img src="./website.svg" alt="website link" width="18px" height="13px" />
                        </a>}
                    </div>
                </div>
            </div>
            <div className="relative">
                <p className={`${styles.status} text-base lg:text-2xl w-1/4 py-1 font-bold ` + (status.toLowerCase() !== 'open' ? `${styles.closed} lg:pl-5 pl-3` : 'lg:pl-10 pl-5')}>{status}</p>
                <div className={styles.border}></div>
            </div>
            <div className="px-6 lg:px-16 mt-9 lg:mt-20 pb-9 lg:pb-16">
                <ul >
                    <li className="mb-2">
                        <div className="w-full flex justify-between items-center">
                            <span className="text-gray-400 italic uppercase text-sm lg:text-base">{conversionname}</span>
                            <span className="text-gray-100 font-bold text-lg lg:text-xl">{conversionRate}</span>
                        </div>
                    </li>
                    <li className="mb-2">
                        <div className="w-full flex justify-between items-center">
                            <span className="text-gray-400 italic uppercase text-sm lg:text-base">CAP</span>
                            <span className="text-gray-100 font-bold text-lg lg:text-xl">{cap}</span>
                        </div>
                    </li>
                    <li>
                        <div className="w-full flex justify-between items-center">
                            <span className="text-gray-400 italic uppercase text-sm lg:text-base">ACCESS</span>
                            <span className="text-gray-100 font-bold text-lg lg:text-xl">{access}</span>
                        </div>
                    </li>
                </ul>
                <div className="flex flex-col mt-4 lg:mt-16">
                    <span className="text-gray-400 self-end text-tiniest lg:text-xs pr-1 pb-1">IDO Progress</span>
                    <progress className="w-full" value={progress} max="100"></progress>
                    <div className="flex text-gray-200 justify-between text-xs lg:text-sm mt-1 px-1">
                        <span>{startLimit && startLimit !== '' ? startLimit : 'Undefined'}</span>
                        <span> <span className="text-gray-300">Participants</span> {participants ? participants : ''}</span>
                        <span>100%</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pool
