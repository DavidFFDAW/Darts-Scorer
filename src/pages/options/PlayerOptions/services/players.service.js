const getPlayersInitialState = num => {
    const emptyPlayers = Array.from({ length: num }).map((_, i) => i + 1);

    return emptyPlayers.reduce((acc, current) => {
        return { ...acc, [current]: '' };
    }, {});
};

const PlayerService = {
    getPlayersInitialState,
};

export default PlayerService;
