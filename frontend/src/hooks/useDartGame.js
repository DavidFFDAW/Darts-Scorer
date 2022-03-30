import { useContext, useCallback } from 'react';
import Context from 'context/GamesContext';

export function useDartGame() {
    
    const { scoreboard, setGameScorer } = useContext(Context);

    const checkCricketGame = useCallback(_ => {

    }, [])

    return {
        scoreboard, setGameScorer, checkCricketGame
    }
}