import './App.css';
import Redirector from './components/Redirector';
import Options from './components/Options';
import PlayerNames from './components/PlayerNames';
import CricketPanel from 'components/CricketPanel';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Header from 'components/Header';

function App() {
  
  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <Redirector/>
        </Route>
        <Route path='/darts/options' exact> 
          <Options/>
        </Route>
        <Route path='/darts/players/:players/game/:game' exact>
          <PlayerNames/>
        </Route>
        <Route path='/darts/game/cricket/:players' exact>
          <Header/>
          <div style={{ marginTop: '60px' }}>
            <CricketPanel/>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
