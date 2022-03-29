import './Options.css';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { useParams } from 'react-router';
import storage from 'services/local.storage.service';
import strgKeys from 'constants/storage.keys';
import logo from '../darts-logo.svg';
import { usePlayers } from 'hooks/usePlayers';

export default function PlayerNames() {
    document.title = 'Choosing Names';

    const { game, players } = useParams();
    const { setArrayPlayers, getPlayers } = usePlayers();
    const previousOrEmptyNames = getPlayers() || Array.from({ length: players },_ => 0);
    const [ playerNames, setPlayerNames ] = useState(previousOrEmptyNames);
    const history = useHistory();

    /* useEffect(_ => {
        const storedPreviousPlayers = storage.get(strgKeys.playernames);
        if (storedPreviousPlayers) {
            setPlayerNames(storedPreviousPlayers);
        }
    },[]) */

    const storeNameInArray = (ev, index) => {
        const newArray = playerNames;
        const newPlayer = ev.target.value || `Jugador ${ index+1 }`;
        newArray[index] = newPlayer;
        setPlayerNames(newArray);
    }

    const storeConfigAndContinue = () => {
        const parsedNames = playerNames.map( (it,ix) => it === 0 ? `Jugador ${ ix+1 }` : it);
        setPlayerNames(parsedNames);
        setArrayPlayers(parsedNames);
        storage.store(strgKeys.playernames, parsedNames);
        history.push(`/darts/game/${game}/${players}`);
    }

    return (
        <div className="container">
            <div className="flex between options">
                <img src={logo} alt="" className="options-logo" />
                <h4>Darts Scorer</h4>
            </div>
            <div className="flex center vertical">
                <div className="box">
                    { playerNames.map((el, index) => {
                        return (<div className="form" key={ index }>
                            <label>Nombre Jugador {index + 1}</label>
                            <input type="text" defaultValue={ el === 0 ? '' : el } placeholder="Nombre de jugador" onChange={ ev => storeNameInArray(ev,index) }/>
                        </div>
                        );
                    })}
                </div>

                <button className="btn green" onClick={ storeConfigAndContinue }>Continuar</button>
            </div>
        </div>
    );
}