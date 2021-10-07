import './CricketPanel.css';
import storageKeys from "constants/storage.keys";
import { useState, useEffect } from "react";
import cricket from "services/cricket.game.service";
import storage from "services/local.storage.service";
import { useHistory } from 'react-router';
import PlayersService from 'services/player.service';

export default function CricketPanel () {

    const history = useHistory();
    const maxShots = 3;
    const players = storage.get(storageKeys.playernames);
    
    if (!players) history.push('/');

    PlayersService.setPlayers(players);
    const scorer = cricket.build(players);

    const [ scoreboard, setScoreboard ] = useState(scorer);
    const [ round, setRound ] = useState(0);
    const [ shots, setShots ] = useState(0);
    const [ currentUser, setCurrentUser ] = useState(PlayersService.getCurrentPlayer());
    const [ isPopUp, setPopUp ] = useState(false);


    // useEffect( _ => {
    //     const previousGame = storage.get(storageKeys.scoreboard);
    //     if (previousGame) {
    //         cricket.setScorer(previousGame);
    //         setScoreboard(previousGame);
    //     }
    // }, []);

    useEffect(_ => {
        setRound(cricket.getCurrentParsedRound());
    }, [ scoreboard ])

    const setNextTurn = _ => {
        const newTurn = PlayersService.next();
        setCurrentUser(newTurn);
        setPopUp(true);
    }

    const addPoints = (pt) => {
        if (shots === maxShots) {
            setShots(0);
            setNextTurn();
            return;
        }
        cricket.addPointToScoreOf(pt,currentUser);
        console.log('puntos: '+pt+', usuario: '+currentUser);
        const scorer = cricket.getScorer();
        console.log(scorer);
        // storage.store(storageKeys.scoreboard,scorer);
        setScoreboard(scorer);
        setShots(shots + 1);
    }

    /* const deleteGame = _ => {
        Object.values(storageKeys).forEach(it => {
            storage.removeByKey(it);
        });
        history.push('/');
    } */

    return (
        <div className="container">
            { isPopUp && <div className="absolute action-block"></div> }
            <div className="flex between">
                <label className="dbug">Turno: { currentUser }</label><br/>
                <label className="dbug">Ronda: { round }/20</label>
                <label className="dbug">Tiro: { shots }/3</label>

            </div>
            {/* <button className="btn green" onClick={ _ => setNextTurn() }>Siguiente</button> */}
            { isPopUp && <div className="box popup flex center vertical form">
                <h4>Turno de: { currentUser }</h4>

               <button className="btn btn-close red" onClick={ _ => setPopUp(false) }>&times;</button>
            </div> }
            <div className="flex between wrap">
                { scoreboard.map((item, index) => {
                    return (<div className="scorer form" key={ index }>
                        <label>{ item.name }</label>
                        <h4>{ item.score }</h4>
                    </div>);
                }) }
            </div>
            <div>
                <button className="btn green" onClick={ _ => addPoints(20) }>Añadir 20 a {currentUser}</button>
            </div>
            {/* <div>
                <button className="btn green" onClick={ deleteGame }>Borrar Partida</button>
            </div> */}
        </div>
    );
}