import React from 'react'
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className="max-w-sm md:max-w-xl md:mx-auto lg:max-w-full mx-6 lg:mx-20 mt-20 lg:mt-80 lg:mb-9">
            <div className="lg:flex">
                <div className="flex lg:flex-1">
                    <div className="flex-1 justify-start lg:flex lg:items-end">
                        <img className={styles.footerLogo} src="./smallLogo.png" alt="xpad logo" width="100%" height="auto" />
                    </div>
                    <div className="flex-1 flex justify-center lg:justify-start text-xs lg:text-2xl text-gray-400">
                        <ul>
                            <li className="lg:mb-3">
                                <a href="/#home">Home</a>
                            </li>
                            <li className="lg:mb-3">
                                <a href="/#about">About us</a>
                            </li>
                            <li >
                                <a href="/#tokenomics">Tokenomics</a>
                            </li>
                        </ul>
                    </div>
                    <div className="flex-1 flex justify-end lg:justify-start text-xs lg:text-2xl text-gray-400">
                        <ul>
                            <li className="lg:mb-3">
                                <a href="/#tiers">Tiers</a>
                            </li>
                            <li className="lg:mb-3">
                                <a href="/#features">Features</a>
                            </li>
                            <li >
                                <a href="/#contact">Contact us</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex justify-between my-5 lg:my-0 lg:flex-col lg:justify-end lg:items-center">
                    <div className="flex lg:justify-center">
                        <a href="https://t.me/xpadfinance" target="_blank">
                            <img src="./telegram.svg" alt="telegram link" width="100%" height="auto" className={`mr-3 lg:mr-4 ${styles.socialIcon}`} />
                        </a>
                        <a href="https://twitter.com/xpadfinance" target="_blank" >
                            <img src="./twitter.svg" alt="twitter link" width="100%" height="auto" className={`mr-3 lg:mr-4 ${styles.socialIcon}`} />
                        </a>
                        <a href="https://xpadfi.medium.com/" target="_blank">
                            <img src="./medium.svg" alt="medium link" width="100%" height="auto" className={`${styles.socialIcon}`} />
                        </a>
                    </div>
                    {/* {new Date().getFullYear()} */}
                    <span className="text-gray-400 text-tiniest lg:text-lg lg:mt-6 lg:text-center">&#169; Copyright <span className="text-gray-100">Xpad</span>.<br className="hidden lg:inline-block" /> All rights reserved.</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer
