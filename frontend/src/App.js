import './App.css';
import Redirector from './components/Redirector';
import Options from './components/Options';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

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
        </Route>
        <Route path='/darts/cricket/game' exact>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
