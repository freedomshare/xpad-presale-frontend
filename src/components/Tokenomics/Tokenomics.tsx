import React from 'react'
import styles from './Tokenomincs.module.css';

const Tokenomics = () => {
    return (
        <div id="tokenomics" className="max-w-sm md:max-w-xl md:mx-auto lg:max-w-full mx-6 lg:mx-28 mt-20 lg:mt-80">
            <div className="flex flex-col lg:flex-row lg:items-start">
                <div className="lg:flex-1">
                    <h2 className="text-base text-gray-100 pl-10 lg:pl-24 lg:text-5xl font-bold">TOKENOMICS</h2>
                    <ul className="mt-8 lg:mt-16 text-gray-100 text-sm lg:text-3xl pl-10 lg:pl-24 ">
                        <li className={styles.tokenomincList}>
                            <div className={styles.circle}></div>
                            <div>Listing</div>
                            <hr className={styles.dots} />
                            <div className="text-right">2M</div>
                        </li>
                        <li className={styles.tokenomincList}>
                            <div className={styles.circle}></div>
                            <div>Treasury</div>
                            <hr className={styles.dots} />
                            <div className="text-right">2.75M</div>
                        </li>
                        <li className={styles.tokenomincList}>
                            <div className={styles.circle}></div>
                            <div>Ecosystem</div>
                            <hr className={styles.dots} />
                            <div className="text-right">1.75M</div>
                        </li>
                        <li className={styles.tokenomincList}>
                            <div className={styles.circle}></div>
                            <div>Team Tokens</div>
                            <hr className={styles.dots} />
                            <div className="text-right">2.5M</div>
                        </li>
                        <li className={styles.tokenomincList}>
                            <div className={styles.circle}></div>
                            <div>Xpad Presale</div>
                            <hr className={styles.dots} />
                            <div className="text-right">11M</div>
                        </li>
                        <li className={styles.tokenomincList}>
                            <div className={styles.circle}></div>
                            <div>Total Xpad Tokens</div>
                            <hr className={styles.dots} />
                            <div className="text-right">20M</div>
                        </li>
                    </ul>
                </div>
                <figure className="mx-auto pl-10 lg:pl-20 lg:flex-1 lg:-mt-5 lg:flex lg:justify-end">
                    <img src="./mobile-chart.svg" alt="chart for mobile" width="100%" height="auto" style={{ maxWidth: '468px' }} />
                </figure>
            </div>
        </div>
    )
}

export default Tokenomics