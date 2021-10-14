import './App.css';
import Redirector from './components/Redirector';
import Options from './components/Options';
import PlayerNames from './components/PlayerNames';
import CricketPanel from 'components/CricketPanel';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Header from 'components/Header';
import Game01Panel from 'components/Games01Panel';

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
            <CricketPanel maxRounds={ 20 }/>
          </div>
        </Route>
        <Route path='/darts/game/301/:players' exact>
          <Header/>
          <div style={{ marginTop: '60px' }}>
            <Game01Panel game={'301'} maxPoints={301} />
          </div>
        </Route>
        <Route path='/darts/game/501/:players' exact>
          <Header/>
          <div style={{ marginTop: '60px' }}>
            <Game01Panel game={'501'} maxPoints={501} />
          </div>
        </Route>
        <Route path='/darts/game/701/:players' exact>
          <Header/>
          <div style={{ marginTop: '60px' }}>
            <Game01Panel game={'701'} maxPoints={701} />
          </div>
        </Route>
        <Route path='/darts/game/1001/:players' exact>
          <Header/>
          <div style={{ marginTop: '60px' }}>
            <Game01Panel game={'1001'} maxPoints={1001} />
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
