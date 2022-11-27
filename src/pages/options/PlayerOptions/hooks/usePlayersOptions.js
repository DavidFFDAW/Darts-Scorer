import useDarts from 'hooks/useDarts';
import { initialGameObject } from 'pages/games/Games01/service/games.01.service';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import playerService from '../services/players.service';

export default function usePlayersOptions() {
    const { num, game } = useParams();
    const navigate = useNavigate();
    const { updateDartsGameData } = useDarts();
    const initialPlayersState = playerService.getPlayersInitialState(num);

    const [players, setPlayers] = useState(initialPlayersState);

    const curriedOnChange = playerIndex => event => {
        const { value } = event.target;
        setPlayers(prevPlayers => {
            return {
                ...prevPlayers,
                [playerIndex]: value.trim(),
            };
        });
    };

    const validatePlayers = playersValues => {
        return playersValues.every(player => player.length > 0);
    };

    const onSubmit = e => {
        e.preventDefault();
        const playersValues = Object.values(players);
        if (!validatePlayers(playersValues)) return;

        const url = `/games/type/301/game/${game}/board`;
        const initialObject = initialGameObject(playersValues, game, url);
        updateDartsGameData(initialObject);
        navigate(url);
    };

    return {
        players: Object.entries(players).map(([key, value]) => ({
            index: key,
            name: value,
        })),
        curriedOnChange,
        validatePlayers,
        onSubmit,
    };
}
