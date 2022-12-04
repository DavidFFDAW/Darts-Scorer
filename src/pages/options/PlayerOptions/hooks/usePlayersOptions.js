import { APP_ROUTES } from 'AppSetting';
import useDarts from 'hooks/useDarts';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getInitialGameStateByGame } from 'services/game.chooser.service';
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
                [playerIndex]: value,
            };
        });
    };

    const validatePlayers = playersValues => {
        return playersValues.every(player => player.length > 0);
    };

    const onSubmit = e => {
        e.preventDefault();
        const playersValues = Object.values(players).map(player => player.trim());
        if (!validatePlayers(playersValues)) return;

        const gameRoute = game !== 'cricket' ? APP_ROUTES.GAMES.X01.replace(':game', game) : APP_ROUTES.GAMES.CRICKET.replace(':game', game);
        const gameStep = APP_ROUTES.GAMES.PARENT.replace('/*', gameRoute);
        const gameChooser = getInitialGameStateByGame(game);

        const initialObject = gameChooser(playersValues, game, gameStep);
        updateDartsGameData(initialObject);
        navigate(gameStep);
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
