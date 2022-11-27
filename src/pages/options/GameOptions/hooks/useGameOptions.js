import { AppSettings, APP_ROUTES } from 'AppSetting';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useGameOptions() {
    const navigate = useNavigate();
    const [game, setGame] = useState(0);
    const [players, setPlayers] = useState(0);
    const availableGames = AppSettings.AVAILABLE_GAMES;
    const availablePlayers = AppSettings.AVAILABLE_PLAYERS;
    const validTypes = AppSettings.AVAILABLE_TYPES;

    const typesLookup = {
        game: setGame,
        players: setPlayers,
    };

    const onSubmit = e => {
        e.preventDefault();
        const url = APP_ROUTES.OPTIONS.PLAYERS.replace(':num', players).replace(':game', game);
        const nextStep = `/options/${url}`;
        navigate(nextStep);
    };

    const isValidGame = game => {
        return availableGames.includes(game);
    };

    const isValidPlayers = players => {
        return availablePlayers.includes(players);
    };

    const onClickChip = (type, value) => {
        typesLookup[type](value);
    };

    return {
        game,
        players,
        onSubmit,
        onClickChip,
        validTypes,
        availableGames,
        availablePlayers,
        isValidGame,
        isValidPlayers,
    };
}
