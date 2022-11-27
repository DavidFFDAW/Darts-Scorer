import useDarts from 'hooks/useDarts';
import { useCallback } from 'react';
import { playTurn } from '../service/games.01.service';

export default function useGames01Type() {
    const { darts, updateDartsGameData, deleteGame } = useDarts();

    const onButtonClick = useCallback(
        score => {
            const newPlayed = playTurn(darts, score);
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
