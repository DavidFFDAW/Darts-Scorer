import { AppSettings } from 'AppSetting';
import React, { useEffect } from 'react';

export default function useHomePage() {
    const [unfinishedGame, setUnfinishedGame] = React.useState({ hasUnfinishedGame: false, url: '' });

    useEffect(() => {
        const storaged = JSON.parse(localStorage.getItem(AppSettings.LOCAL_STORAGE_KEY));

        if (storaged && !storaged.finished) {
            const url = storaged.game === 'cricket' ? '/games/type/cricket/game/board' : `/games/type/301/game/${storaged.game}/board`;
            setUnfinishedGame({ hasUnfinishedGame: true, url });
        }
    }, []);

    return { unfinishedGame };
}
