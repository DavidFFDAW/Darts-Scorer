import { AppSettings } from 'AppSetting';
import DartsContext from 'context/DartsContext';
import { useCallback, useContext } from 'react';

export default function useDarts() {
    const { darts, setDarts } = useContext(DartsContext);

    const updateDartsGameData = useCallback(
        game => {
            setDarts(game);
            window.localStorage.setItem(AppSettings.LOCAL_STORAGE_KEY, JSON.stringify(game));
        },
        [setDarts],
    );

    const deleteGame = useCallback(
        _ => {
            localStorage.removeItem(AppSettings.LOCAL_STORAGE_KEY);
            setDarts({});
        },
        [setDarts],
    );

    return {
        darts,
        deleteGame,
        updateDartsGameData,
    };
}
