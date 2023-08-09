import useDarts from 'hooks/useDarts';
import { useCallback } from 'react';
import { playCricketTurn } from '../services/games.cricket.service';

export default function useCricket() {
    const { darts, updateDartsGameData, deleteGame } = useDarts();

    const onButtonClick = useCallback(
        (score, realValue) => {
            const newPlayed = playCricketTurn(darts, score, realValue);
            updateDartsGameData({ ...darts, ...newPlayed });
        },
        [darts, updateDartsGameData],
    );

    return {
        darts,
        onButtonClick,
        deleteGame,
    };
}
