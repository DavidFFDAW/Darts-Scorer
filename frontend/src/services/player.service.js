let maxPlayers = 0;
let players = [];

const getMaxPlayers = () => {
    return maxPlayers;
}

const getPlayers = () => {
    return players;
}

const setPlayers = (players) => {
    players = players;
    maxPlayers = players.length;
}

export default {
    getMaxPlayers, setPlayers, getPlayers,
}