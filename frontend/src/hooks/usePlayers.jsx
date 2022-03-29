import { useCallback, useContext } from 'react';
import UsersContext from "../context/UsersContext";
import { uuid as v4 } from 'uuid';

export function usePlayers () {

    const { users, setUsers } = useContext(UsersContext);

    const addNewPlayer = useCallback(playerName => {
        const player = { name: playerName, id: uuid };
        const finalPlayers = [...users, player];
        setUsers(finalPlayers);
    }, [ ]);

    const getPlayers = useCallback(_ => users, []);

    /* const getHowManyPlayers = useCallback(_ => users.length, []); */

    return {
        addNewPlayer,
        getPlayers
    }
}