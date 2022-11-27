import { AppSettings } from 'AppSetting';
import React, { useEffect } from 'react';

export default function useHomePage() {
    const [unfinishedGame, setUnfinishedGame] = React.useState({ hasUnfinishedGame: false, url: '' });

    useEffect(() => {
        const storaged = JSON.parse(localStorage.getItem(AppSettings.LOCAL_STORAGE_KEY));
        const isEmpty = storaged && Object.keys(storaged).length === 0;

        if (storaged && !isEmpty && !storaged.finished) {
            const url = storaged.game === 'cricket' ? '/games/type/cricket/game/board' : `/games/type/301/game/${storaged.game}/board`;
            const finalURL = storaged.url || url;
            setUnfinishedGame({ hasUnfinishedGame: true, url: finalURL });
        }
    }, []);

    return { unfinishedGame };
}
