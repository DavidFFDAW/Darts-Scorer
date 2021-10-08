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
    storage.store(storageKeys.maxshots,maxShots);
    const players = storage.get(storageKeys.playernames);
    
    if (!players) history.push('/');

    PlayersService.setPlayers(players);
    const localScorer = storage.get(storageKeys.scoreboard)
    const scorer =  localScorer || cricket.build(players);


    const [ scoreboard, setScoreboard ] = useState(scorer);
    const [ round, setRound ] = useState(storage.get(storageKeys.round) || 0);
    const [ shots, setShots ] = useState(storage.get(storageKeys.shot) || 0);
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
        storage.store(storageKeys.round, round);
    }, [ round ]);

    useEffect(_ => {
        storage.store(storageKeys.shot, shots);
    }, [ shots ]);

    const setNextTurn = _ => {
        const newTurn = PlayersService.next();
        setCurrentUser(newTurn);
        setPopUp(true);
    }

    const addPoints = (pt, value = pt, quantity = 1) => {
        if (shots >= maxShots) {
            setShots(0);
            setNextTurn();
            return;
        }        
        setScoreboard(cricket.addPointToScoreOf(pt, currentUser, value, quantity));        
        storage.store(storageKeys.scoreboard, scoreboard);
        setShots(shots + 1);
        setRound(round + 1);
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
                <label className="dbug">Ronda: { Math.floor(+round / +maxShots / +players.length) }/20</label>
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
                    </div>
                    );
                }) }
            </div>

            <div className="down">
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            { players.map((it,index) => <th key={ index }>{ it }</th>)}
                        </tr>
                    </thead>
                    <tbody>
                    {
                        cricket.getScorePoints(scoreboard).map(([key,value],ind) => {
                            return (
                                <tr key={ind}>
                                    <td>
                                        <button onClick={ _ => addPoints(key) } className="pt-btn">{ key }</button>
                                        <button onClick={ _ => addPoints(key, key*2, 2) } className="pt-btn double">D{ key }</button>
                                        { key !== '25' && <button onClick={ _ => addPoints(key, key*3, 3) } className="pt-btn triple">T{ key }</button> }
                                    </td>
                                    { value.map((pt,ix) => <td key={ ix }>{ pt }</td>) }
                                </tr>
                            );
                        })
                    }
                    <tr>
                        <td colSpan={ players.length + 1 }>
                            <button onClick={ _ => addPoints(0) } className="pt-btn">0</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            {/* <div>
                <button className="btn green" onClick={ deleteGame }>Borrar Partida</button>
            </div> */}
        </div>
    );
}