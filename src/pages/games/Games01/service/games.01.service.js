export const randomKey = '019438ac-0522-4b0e-';

export const getPlayersKeys = names => {
    return names.map((item, ind) => {
        const id = randomKey + (ind + 1);

        return {
            id: id,
            name: item,
        };
    });
};

export const initialGameObject = (players, game, url, rounds = 21) => {
    const playersKeys = getPlayersKeys(players);

    return {
        url: url,
        game: game,
        round: 0,
        maxRound: playersKeys.length * 3 * rounds,
        players: playersKeys,
        scorer: {
            userId: playersKeys[0].id,
            board: playersKeys.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    turn: 1,
                    score: Number(game),
                };
            }),
        },
        currentUser: playersKeys[0],
        isThereWinner: false,
        winner: {},
        finished: false,
    };
};

// const setupGame = game => {
//     game.currentUser = game.players.d_next();
//     game.scorer.userId = game.currentUser.id;
//     game.scorer.board = game.players.map(item => {
//         return {
//             id: item.id,
//             name: item.name,
//             turn: 1,
//             score: 301,
//         };
//     });

//     return game;
// };
