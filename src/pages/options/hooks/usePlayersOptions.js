import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function usePlayersOptions() {
    const { num, game } = useParams();
    const navigate = useNavigate();

    const emptyPlayers = Array.from({ length: num }).map((_, i) => i + 1);
    const initialPlayersState = emptyPlayers.reduce((acc, current) => {
        return { ...acc, [current]: "" };
    }, {});
    const [players, setPlayers] = useState(initialPlayersState);

    const curriedOnChange = (playerIndex) => (event) => {
        const { value } = event.target;
        setPlayers((prevPlayers) => {
            return {
                ...prevPlayers,
                [playerIndex]: value.trim().toUpperCase(),
            };
        });
    };

    const validatePlayers = (playersValues) => {
        return playersValues.every((player) => player.length > 0);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (!validatePlayers(Object.values(players))) return;

        window.localStorage.setItem(
            "scorer",
            JSON.stringify({
                game: game,
                rounds: 20,
                scorer: Object.values(players),
            })
        );
        navigate("/game");
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
