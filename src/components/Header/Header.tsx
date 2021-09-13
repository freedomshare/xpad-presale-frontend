import { useRouteMatch } from 'react-router-dom';
import styles from './Header.module.css';

const Header = (props: any) => {
    let { path } = useRouteMatch();
    const { header, description, logo } = props;
    const isPoolsPath = path.includes('pools');

    return (
        <header id="home" className="max-w-sm md:max-w-xl md:mx-auto lg:max-w-full mx-6 lg:mx-28 mt-20 lg:mt-52">
            {!isPoolsPath && <p className="text-gray-100 pl-10 lg:pl-24 pr-2 mb-3 text-tiniest lg:text-lg">Welcome</p>}
            <h1 className={`${styles.header} py-2 pl-10 lg:py-6 lg:leading-tight lg:pr-32 lg:pl-24 pr-4 bg-xpad-grad text-xs lg:text-3xl font-bold uppercase`}>{header}</h1>
            <div className="flex mt-5 lg:mt-14">
                <p className="text-gray-400 pl-10 lg:pl-24 text-tiny lg:text-xl lg:flex-1 lg:pr-24">{description}</p>
                <div className="lg:flex lg:flex-1 lg:justify-center">
                    <img src={logo} className={`mx-2 ` + (!isPoolsPath ? `my-4` : ``)} width="100%" height="auto" style={{ maxWidth: !isPoolsPath ? '266px' : '342px' }} alt="xpad large logo" />
                </div>
            </div>
            <div className={"flex flex-col lg:flex-row " + (!isPoolsPath ? `mt-5 lg:mt-16` : `mt-2 lg:mt-8`)}>
                <div className={`${styles.headerBottom} bg-xpad-grad lg:h-24 w-8/12 self-end lg:order-2 lg:flex-1 ` + (!isPoolsPath ? 'h-12' : 'h-8')} ></div>

                <div className="text-gray-100 uppercase text-tiny mt-5 lg:mt-0 flex justify-end lg:justify-start lg:pl-24 lg:self-start lg:order-1 lg:flex-1 lg:text-xl">
                    {!isPoolsPath && <>
                        <a className="mr-2 lg:mr-3 border border-gray-100 rounded-md px-3 lg:px-4 py-1 hover:bg-xpad-an-grad hover:text-black cursor-pointer">Buy xpad</a>
                        <a className="mr-2 lg:mr-3 border border-gray-100 rounded-md px-3 lg:px-4 py-1 hover:bg-xpad-an-grad hover:text-black cursor-pointer">Lightpaper</a>
                        <a className="border border-gray-100 rounded-md px-3 lg:px-4 py-1 hover:bg-xpad-an-grad hover:text-black cursor-pointer">Pitch deck</a>
                    </>}
                </div>
            </div>
        </header>
    )
}

Header.defaultProps = {
    header: 'Bridging the gap between investors and projects one variable at a time',
    description: 'XPAD is a new decentralised funding platform aiming to solve many of the core problems associated with previous iterations. Completely chain agnostic, bringing real projects to our investors and providing real value to projects launching through us, these are some of our core tenants we stick by and never compromise on. Welcome and delve into the code with us.',
    logo: "/logoLarge.png"
}

export default Header
