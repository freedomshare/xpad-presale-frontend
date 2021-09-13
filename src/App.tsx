import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './pages/home';
import Navbar from './components/Navbar/Navbar';
import Pools from './pages/pools';
import Footer from './components/Footer/Footer';
import Staking from './pages/staking';
import useEagerConnect from 'hooks/useEagerConnect';
import { PoolModel, PresalePoolConfig } from 'config/types';
import { PoolsData } from 'data/poolsData';
import useRefresh from 'hooks/useRefresh';
import { useEffect, useState } from 'react';
import { getPresaleAllInfo } from 'utils/callHelpers';



const App = () => {

  useEagerConnect()

  const pools: PoolModel[] = PoolsData;
  const { slowRefresh} = useRefresh()
  const [presalePools, setPresalePools] = useState<PresalePoolConfig[]>()

  useEffect(() => {
      getPresaleAllInfo(pools).then((preslaes) =>{
          console.log('presales = ', preslaes)
          setPresalePools(preslaes)
      })
      .catch(e => {
          console.error(e)
      })
  }, [pools, slowRefresh])
  

  return (
    <Router>
      <div className="relative">
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/pools">
            <Pools presales={presalePools} />
          </Route>
          <Route path="/staking">
            <Staking />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
