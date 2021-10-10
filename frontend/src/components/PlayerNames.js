import './Options.css';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { useParams } from 'react-router';
import storage from 'services/local.storage.service';
import strgKeys from 'constants/storage.keys';
import logo from '../darts-logo.svg';

export default function PlayerNames() {
    document.title = 'Choosing Names';

    const { game, players } = useParams();
    const [ playerNames, setPlayerNames ] = useState(Array.from({ length: players },_ => 0));
    const history = useHistory();

    /* useEffect(_ => {
        const storedPreviousPlayers = storage.get(strgKeys.playernames);
        if (storedPreviousPlayers) {
            setPlayerNames(storedPreviousPlayers);
        }
    },[]) */

    const storeNameInArray = (ev, index) => {
        const newArray = playerNames;
        newArray[index] = ev.target.value;
        setPlayerNames(newArray);
    }

    const storeConfigAndContinue = () => {
        storage.store(strgKeys.playernames,playerNames);
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