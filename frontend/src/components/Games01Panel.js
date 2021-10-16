import './CricketPanel.css';
import storageKeys from "constants/storage.keys";
import { useState, useEffect } from "react";
import game301 from 'services/games.01.service';
import storage from "services/local.storage.service";
import { useHistory } from 'react-router';
import PlayersService from 'services/player.service';
import PopUp from './PopUp/PopUp';
import Scorer from './Scorer/Scorer';
import GameInfo from './GameInfo/GameInfo';

export default function Game01Panel ({ game, maxPoints, maxShots = 3 }) {
    document.title = `${game} Game`;
    
    const players = storage.get(storageKeys.playernames);

    const history = useHistory();
    if (!players) history.push('/');
    
    const pointboard = [...Array(20).keys()].map(it => it+1);
    storage.store(storageKeys.maxshots,maxShots);
    

    PlayersService.setPlayers(players);    
    const localScorer = storage.getScoreboardByGame(game);
    const scorer =  localScorer || game301.buildGame(players,maxPoints);

    const [ scoreboard, setScoreboard ] = useState(scorer);
    const [ round, setRound ] = useState(storage.get(storageKeys.round) || 0);
    const [ shots, setShots ] = useState(storage.get(storageKeys.shot) || 0);
    const [ currentUser, setCurrentUser ] = useState(PlayersService.getCurrentPlayer());
    const [ customPopUp, setCustomPopUp ] = useState({ stat: false, content: '' });

    useEffect(_ => {
        storage.store(storageKeys.round, round);
    }, [ round ]);

    useEffect(_ => {
        storage.store(storageKeys.shot, shots);
    }, [ shots ]);

    const showPopUpWithMessage = message => {
        setCustomPopUp({ stat: true, content: message });
    }

    const setNextTurn = _ => {
        setShots(0);
        const newTurn = PlayersService.next();
        setCurrentUser(newTurn);
        showPopUpWithMessage(`Turno de ${currentUser}`);
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
            <PopUp toggled={ customPopUp.stat } toggler={ setCustomPopUp } content={ customPopUp.content } stat={ true } />
            <GameInfo user={ currentUser } round={ round } shots={ shots } players={ players } maxShots={ maxShots } maxRounds={ 15 } />
            <Scorer scoreboard={ scoreboard } lastShot={ true } />

            <div className="down">
                <div className="grid points">
                    <div className="flex center" style={{ padding: '5px' }}>
                        <button className="pt-btn" onClick={ _ => substractPoint(0,`0`) }>0</button>
                    </div>
                    { pointboard.map((it,ind) => {
                        return (<div key={ ind } className="">
                            <div className="flex center" style={{ padding: '5px' }}>
                                <button className="pt-btn double" onClick={ _ => substractPoint(it*2,`D${ it }`) }>D{ it }</button>
                                <button className="pt-btn" onClick={ _ => substractPoint(it) }>{ it }</button>
                                <button className="pt-btn triple" onClick={ _ => substractPoint(it*3,`T${ it }`) }>T{ it }</button>
                            </div>
                        </div>
                        )
                    }) }
                    <div className="flex center" style={{ padding: '5px' }}>
                        <button className="pt-btn" onClick={ _ => substractPoint(25,`25`) }>25</button>
                        <button className="pt-btn double" onClick={ _ => substractPoint(25*2,`D25`) }>D25</button>
                    </div>
                    <div className="flex center" style={{ padding: '5px' }}>
                        <button className="pt-btn triple" onClick={ _ => substractPoint(0,`OUT`) }>OUT</button>
                    </div>
                </div>
            </div>

            <div className="down">
                <button className="btn green" onClick={ resetGame }>Reiniciar partida</button>
            </div>
        </div>
    );
}