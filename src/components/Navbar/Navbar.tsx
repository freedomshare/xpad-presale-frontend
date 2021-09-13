import React, { useState } from 'react'
import styles from './Navbar.module.css'

import {
    Link,
} from "react-router-dom";
import Connect from '../ConnectWallet/Connect';
import { shorter } from '../../utils/getHelper';
import { useWeb3React } from '@web3-react/core';

const Navbar = () => {

    const [showConnectOptions, setShowConnectOptions] = useState(false);
    const { account } = useWeb3React()

    return (
        <nav className={`z-10 fixed left-0 right-0 top-0 w-full pb-10`}>
            <div className={`${styles.navBg}`} style={{ backgroundImage: `${process.env.PUBLIC_URL}/background.svg` }}></div>
            <div className="max-w-sm md:max-w-xl md:mx-auto lg:max-w-full mx-6 lg:mx-28 flex justify-between items-start font-bold relative">
                <Link to="/" className={`${styles.logoBorder} px-8 py-1 bg-xpad-grad text-sm lg:px-12 lg:py-2 lg:text-3xl`}>XPad</Link>
                <div className="text-gray-100 flex justify-between items-center self-end text-xs lg:text-2xl">
                    <Link to="/pools" className=" hover:bg-xpad-grad hover:text-black rounded-md px-3 lg:px-5 py-1">Pools</Link>
                    <Link to="/staking" className=" hover:bg-xpad-grad hover:text-black rounded-md px-3 lg:px-5 py-1">Staking</Link>
                    {account ? <button className=" hover:bg-xpad-grad hover:text-black rounded-md px-3 lg:px-5 py-1">{shorter(account)}</button> : 
                    <button onClick={() => setShowConnectOptions(!showConnectOptions)} className=" hover:bg-xpad-grad hover:text-black rounded-md px-3 lg:px-5 py-1">Connect</button>}
                </div>
            </div>
            <div className="relative ">
                <div className={showConnectOptions ? 'w-48 lg:w-64 absolute top-4 right-8 lg:right-28 block border-gray-100 border-2 rounded-lg' : 'hidden'}>
                    <Connect onDismiss={() => {setShowConnectOptions(false)}}/>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
