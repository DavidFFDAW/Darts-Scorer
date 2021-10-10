let players = [];
let current = 0;

const getMaxPlayers = () => {
    return players.length;
}

const getPlayers = () => {
    return players;
}

const setPlayers = (passedPlayers) => {
    players = passedPlayers;
}

const next = () => {
    if (current === players.length - 1){
        current = 0;
        return players[current];
    }
    return players[++current];
}

const getCurrentPlayer = _ => players[current];

const setPlayersCurrentCounter = val => {
    current = val;
}

const PlayersService = {
    getMaxPlayers, setPlayers, getPlayers, next, getCurrentPlayer, setPlayersCurrentCounter
}

export default PlayersService;