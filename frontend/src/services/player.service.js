let maxPlayers = 0;
let players = [];
let current = 0;

const getMaxPlayers = () => {
    return maxPlayers;
}

const getPlayers = () => {
    return players;
}

const setPlayers = (passedPlayers) => {
    players = passedPlayers;
    maxPlayers = players.length;
}

const next = () => {
    if (current === players.length - 1){
        current = 0;
        return players[current];
    }
    return players[++current];
}

const getCurrentPlayer = _ => players[current];

const PlayersService = {
    getMaxPlayers, setPlayers, getPlayers, next, getCurrentPlayer
}

export default PlayersService;