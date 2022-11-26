import { useState } from "react";

export default function useGameOptions() {
    const [game, setGame] = useState(0);
    const [players, setPlayers] = useState(0);
    const availableGames = [301, 501, 701, 1001];
    const availablePlayers = [2, 3, 4, 5, 6];

    const validTypes = {
        game: "game",
        players: "players",
    };

    const typesLookup = {
        game: setGame,
        players: setPlayers,
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const { target } = e;
        const finalAction = target.action
            .replace(":game", game)
            .replace(":num", players);
        target.action = finalAction.replace("?", "").replace("&", "");
        e.target.submit();
    };

    const isValidGame = (game) => {
        return availableGames.includes(game);
    };

    const isValidPlayers = (players) => {
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
