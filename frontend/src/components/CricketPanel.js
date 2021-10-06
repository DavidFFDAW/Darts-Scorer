import './CricketPanel.css';
import storageKeys from "constants/storage.keys";
import { useState, useEffect } from "react";
import cricket from "services/cricket.game.service";
import storage from "services/local.storage.service";
import { useHistory } from 'react-router';

export default function CricketPanel () {

    const players = storage.get(storageKeys.playernames);
    const scorer = players ? cricket.build(players) : [0,0,0,0];
    const history = useHistory();
    const [ scoreboard, setScoreboard ] = useState(scorer);

    useEffect( _ => {
        const previousGame = storage.get(storageKeys.scoreboard);
        if (previousGame) {
            cricket.setScorer(previousGame);
            setScoreboard(previousGame);
        }
    }, []);

    const deleteGame = _ => {
        Object.values(storageKeys).forEach(it => {
            storage.removeByKey(it);
        });
        history.push('/');
    }

    return (
        <div className="container">
            <div className="flex between wrap">
                { scoreboard.map((item, index) => {
                    return (<div className="scorer form" key={ index }>
                        <label>{ item.name }</label>
                        <h4>{ item.score }</h4>
                    </div>);
                }) }
            </div>
            <div>
                <button className="btn green" onClick={ deleteGame }>Borrar Partida</button>
            </div>
        </div>
    );
}