import { useCallback, useContext } from 'react';
import UsersContext from "../context/UsersContext";
import { v4 } from 'uuid';

export function usePlayers () {

    const { users, setUsers } = useContext(UsersContext);

    const addNewPlayer = useCallback(playerName => {
        const player = { name: playerName, id: v4() };
        const finalPlayers = [...users, player];
        setUsers(finalPlayers);
    }, [ ]);

    const setArrayPlayers = useCallback(players => {
        console.log('setArrayPlayers: ', players);
        const finalPlayers = players.map(player => ({ name: player, id: v4() }));
        console.log('finalPlayers: ', finalPlayers);
        setUsers(finalPlayers);
    },[ ])    

    const getPlayers = useCallback(_ => users, []);

    /* const getHowManyPlayers = useCallback(_ => users.length, []); */

    return {
        addNewPlayer,
        getPlayers,
        setArrayPlayers
    }
}