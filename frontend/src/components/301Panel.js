import './CricketPanel.css';
import storageKeys from "constants/storage.keys";
import { useState, useEffect } from "react";
import game301 from 'services/301.game.service';
import storage from "services/local.storage.service";
import { useHistory } from 'react-router';
import PlayersService from 'services/player.service';

export default function Game301Panel () {
    document.title = '301 Game';
    
    const players = storage.get(storageKeys.playernames);

    const history = useHistory();
    if (!players) history.push('/');
    
    const pointboard = [...Array(21).keys()];
    
    const maxShots = 3;
    storage.store(storageKeys.maxshots,maxShots);
    

    PlayersService.setPlayers(players);    
    const localScorer = storage.getScoreboardByGame('301');
    const scorer =  localScorer || game301.buildGame(players);

    const [ scoreboard, setScoreboard ] = useState(scorer);
    const [ round, setRound ] = useState(storage.get(storageKeys.round) || 0);
    const [ shots, setShots ] = useState(storage.get(storageKeys.shot) || 0);
    const [ currentUser, setCurrentUser ] = useState(PlayersService.getCurrentPlayer());
    const [ isPopUp, setPopUp ] = useState(false);
    const [ customPopUp, setCustomPopUp ] = useState({ stat: false, content: '' });

    useEffect(_ => {
        storage.store(storageKeys.round, round);
    }, [ round ]);

    useEffect(_ => {
        storage.store(storageKeys.shot, shots);
    }, [ shots ]);

    const setNextTurn = _ => {
        setShots(0);
        const newTurn = PlayersService.next();
        setCurrentUser(newTurn);
        setPopUp(true);
    }

    const checkWinner = _ => {
        const winnerName = game301.checkForWinner(scoreboard);
        setCustomPopUp({ stat: true, content: `¡Felicidades ${winnerName}! ¡Has ganado!` });        
    }

    const substractPoint = (pt, strPoint = pt) => {
        if (game301.isThereWinner(scoreboard)) {
            return checkWinner();
        }
        if (!game301.willCountPoint(pt,currentUser,scoreboard)) {
            setShots(0);
            const newTurn = PlayersService.next();
            setCurrentUser(newTurn);
            return setCustomPopUp({ stat: true, content: `¡Te has pasado! turno para ${newTurn}`  });
        }
        setScoreboard(game301.substractPoint(pt, currentUser, scoreboard, strPoint));
        storage.store(storageKeys.scoreboard, scoreboard);
        setRound(round + 1);
        setShots(shots + 1);

        if (game301.isThereWinner(scoreboard)) return checkWinner();
        return shots >= (maxShots - 1) ? setNextTurn() : null;
    }

    const resetGame = _ => {
        storage.removeByKey('scoreboard');
        setRound(0);
        setShots(0);
        setScoreboard(game301.buildGame(players));
        PlayersService.setPlayersCurrentCounter(0);
        setCurrentUser(PlayersService.getCurrentPlayer());
    } 


    return (
        <div className="container">
            { isPopUp && <div className="absolute action-block"></div> }
            { customPopUp.stat && <div className="absolute action-block"></div> }
            <div className="flex between">
                <label className="dbug">Turno: { currentUser }</label><br/>
                <label className="dbug">Ronda: { Math.floor(+round / +maxShots / +players.length) }/15</label>
                <label className="dbug">Tiro: { shots }/3</label>

            </div>
            { customPopUp.stat && <div className="box popup flex center vertical form">
                <h4>{ customPopUp.content || '' }</h4>

               <button className="btn btn-close red" onClick={ _ => setCustomPopUp({ stat: false }) }>&times;</button>
            </div> }
            { isPopUp && <div className="box popup flex center vertical form">
                <h4>Turno de: { currentUser }</h4>

               <button className="btn btn-close red" onClick={ _ => setPopUp(false) }>&times;</button>
            </div> }
            <div className="flex between wrap">
                { scoreboard.map((item, index) => {
                    return (<div className="scorer score" key={ index }>
                        <label className="title">{ item.name }</label>
                        <h4 className="point">{ item.score }</h4>
                        <label>Last: { item.last || 'None' }</label>
                    </div>
                    );
                }) }
            </div>

            <div className="down">
                <div className="flex between wrap">
                    { pointboard.map((it,ind) => {
                        return (<div key={ ind } className="flex center vertical">
                            <button className="pt-btn double" style={{ display:'block' }} onClick={ _ => substractPoint(it*2,`D${ it }`) }>D{ it }</button>
                            <button className="pt-btn" style={{ display:'block' }} onClick={ _ => substractPoint(it) }>{ it }</button>
                            <button className="pt-btn triple" style={{ display:'block' }} onClick={ _ => substractPoint(it*3,`T${ it }`) }>T{ it }</button>
                        </div>
                        )
                    }) }
                </div>
            </div>

            <div className="down">
                <button className="btn green" onClick={ resetGame }>Reiniciar partida</button>
            </div>
        </div>
    );
}