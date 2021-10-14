import './App.css';
import Redirector from './components/Redirector';
import Options from './components/Options';
import PlayerNames from './components/PlayerNames';
import CricketPanel from 'components/CricketPanel';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Header from 'components/Header';
import Game01Panel from 'components/Games01Panel';
import ls from 'services/local.storage.service';

function App() {

  const savedThemeColor = ls.get('theme');
  const colorTheme = savedThemeColor || '';
  document.body.classList.add(colorTheme);
  
  return (
    <Router>
      <Header/>
      <Switch>
        <Route path='/' exact>
          <Redirector/>
        </Route>
        <Route path='/darts/options' exact>
          <div style={{ marginTop: '60px' }}>
            <Options/>
          </div> 
        </Route>
        <Route path='/darts/players/:players/game/:game' exact>
          <div style={{ marginTop: '60px' }}>
            <PlayerNames/>
          </div> 
        </Route>
        <Route path='/darts/game/cricket/:players' exact>
          <div style={{ marginTop: '60px' }}>
            <CricketPanel maxRounds={ 20 }/>
          </div>
        </Route>
        <Route path='/darts/game/301/:players' exact>          
          <div style={{ marginTop: '60px' }}>
            <Game01Panel game={'301'} maxPoints={301} />
          </div>
        </Route>
        <Route path='/darts/game/501/:players' exact>
          <div style={{ marginTop: '60px' }}>
            <Game01Panel game={'501'} maxPoints={501} />
          </div>
        </Route>
        <Route path='/darts/game/701/:players' exact>
          <div style={{ marginTop: '60px' }}>
            <Game01Panel game={'701'} maxPoints={701} />
          </div>
        </Route>
        <Route path='/darts/game/1001/:players' exact>
          <div style={{ marginTop: '60px' }}>
            <Game01Panel game={'1001'} maxPoints={1001} />
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
