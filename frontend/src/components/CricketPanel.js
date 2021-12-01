import './CricketPanel.css';
import storageKeys from "constants/storage.keys";
import { useState, useEffect } from "react";
import cricket from "services/cricket.game.service";
import storage from "services/local.storage.service";
import { useHistory } from 'react-router';
import PlayersService from 'services/player.service';
import PopUp from './PopUp/PopUp';
import Scorer from './Scorer/Scorer';
import GameInfo from './GameInfo/GameInfo';
import CricketBoard from './Boards/CricketBoard';
import NewCricketBoard from './Boards/NewCricketBoard';

export default function CricketPanel ({ maxRounds }) {
    document.title = 'Cricket Game';

    const history = useHistory();
    const maxShots = 3;
    storage.store(storageKeys.maxshots,maxShots);
    const players = storage.get(storageKeys.playernames);
    
    if (!players) history.push('/');

    PlayersService.setPlayers(players);
    const localScorer = storage.getScoreboardByGame('cricket');
    const scorer =  localScorer || cricket.build(players);


    const [ scoreboard, setScoreboard ] = useState(scorer);
    const [ round, setRound ] = useState(storage.get(storageKeys.round) || 0);
    const [ shots, setShots ] = useState(storage.get(storageKeys.shot) || 0);
    const [ currentUser, setCurrentUser ] = useState(PlayersService.getCurrentPlayer());
    const [ winner, setWinner ] = useState(false);
    const [ isPopUp, setPopUp ] = useState({stat: false});
    
    useEffect(_ => {
        storage.store(storageKeys.round, round);
        console.log('round: ', round);
    }, [ round ]);

    useEffect(_ => {
        storage.store(storageKeys.shot, shots);
        console.log('shots: ', shots);
    }, [ shots ]);    

    const showPopUpMessage = msg => {
        setPopUp({ stat: true, content: msg });
    }

    useEffect(_ => {
        console.log('winner?: ', winner);        
        if(winner){
            return showPopUpMessage(`¡Felicidades ${winner}! ¡Has ganado!`);
        }
    }, [ winner ]);

    const setNextTurn = _ => {
        setShots(0);
        console.log('new_shots: ', shots);        
        console.log('turn: ', currentUser);        
        const newTurn = PlayersService.next();
        setCurrentUser(newTurn);
        console.log('newturn: ', currentUser);        
        showPopUpMessage(`Turno de ${ newTurn }`);
    }

    const addPoints = (pt, quantity = 1) => {
        if (winner) return showPopUpMessage(`¡Felicidades ${winner}! ¡Has ganado!`);

        if (cricket.someoneHasEverythingClosed(scoreboard)) {
            return setWinner(cricket.checkForWinner(scoreboard));
        }

        if ( round >= maxRounds ) {
            if (cricket.someoneHasEverythingClosed(scoreboard)) {
                return setWinner(cricket.checkForWinner(scoreboard));
            }
            return setWinner(cricket.winnerByRoundsAndScores(scoreboard));
        }

        if (quantity > 1) {
            [...Array(quantity).keys()].forEach(_ => {
                setScoreboard(cricket.addPointToScoreOf(scoreboard, pt, currentUser)); 
            });
        } else {
            setScoreboard(cricket.addPointToScoreOf(scoreboard, pt, currentUser));        
        }
        storage.store(storageKeys.scoreboard, scoreboard);
        setShots(shots + 1);
        setRound(round + 1);
        return shots >= (maxShots - 1) ? setNextTurn() : null;
    }

    const resetGame = _ => {
        setScoreboard(cricket.build(players));
        setRound(0);
        setShots(0);
        PlayersService.setPlayersCurrentCounter(0);
        setCurrentUser(PlayersService.getCurrentPlayer());
        storage.removeByKey('scoreboard');
    } 

    return (
        <div className="container">            
            <PopUp 
                toggled={ isPopUp.stat } toggler={ setPopUp } 
                content={ isPopUp.content } stat={ true } 
            />
            
            <GameInfo 
                user={ currentUser } round={ round } 
                shots={ shots } players={ players } 
                maxShots={ maxShots } maxRounds={ maxRounds } 
            />
            
            <Scorer scoreboard={ scoreboard } average={ true } />

            <CricketBoard 
                players={ players }
                scoreboard={ scoreboard } 
                cricketService={ cricket } 
                addPoints={ addPoints }
            />

            <div className="down">
                <button className="btn green" onClick={ resetGame }>Reiniciar Partida</button>
            </div>
        </div>
    );
}
