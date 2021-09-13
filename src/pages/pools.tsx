import Pool from '../components/Pool/Pool'
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import PoolsDetail from './poolsDetail';
import { PresalePoolConfig } from 'config/types';

interface PoolsProps {
    presales?: PresalePoolConfig[]
}
const Pools:React.FC<PoolsProps> = (presales) => {
    let { path, url } = useRouteMatch();
    const presalePools = presales.presales
    const activePresalePools = presalePools?.filter(item => !item.disabled)
    return (
        <div>
            <Switch>
                <Route exact path={path}>
                    <div className="max-w-sm md:max-w-xl md:mx-auto lg:max-w-full mx-6 lg:mx-28 mt-20 lg:mt-52">
                        <h1 className="text-gray-100 font-base uppercase font-bold text-center lg:text-5xl">Pools</h1>
                        <div className="flex flex-col lg:flex-row lg:mt-24 items-start justify-center">
                            { activePresalePools ?
                                activePresalePools.map(
                                    (pool: PresalePoolConfig, index) => <Pool key={index} pool={pool} />
                                ) : null
                            }
                        </div>
                    </div>
                </Route>
                <Route path={`${path}/:poolId`}>
                    <PoolsDetail presales={presalePools || []}/>
                </Route>
            </Switch>
        </div>
    )
}

export default Pools
