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

const getDirectWinner = game => {
    return game.scorer.board.find(item => item.score === 0);
};

const getCalculatedWinner = game => {
    const scores = game.scorer.board.map(item => item.score);
    const minimumScore = Math.min(...scores);
    const winners = game.scorer.board.filter(item => item.score === minimumScore);

    if (winners.length === 1) return winners[0];
    return winners;
};

const calculateWinner = game => {
    const directWinner = getDirectWinner(game);
    if (directWinner) return directWinner;

    if (game.round >= game.maxRound) {
        const calculatedWinner = getCalculatedWinner(game);
        console.log('calculatedWinner', calculatedWinner);

        return calculatedWinner;
    }
};

const isViableScore = (game, score) => {
    const playingUser = game.scorer.board.find(item => item.id === game.currentUser.id);
    const isViable = playingUser.score - score >= 0;

    return isViable;
};

const setNextPlayer = game => {
    const currentUser = game.players.findIndex(item => item.id === game.currentUser.id);
    console.log('index', currentUser);
    const user = game.players[currentUser + 1] || game.players[0];
    console.log('user', user);
    game.currentUser = user;
    game.scorer.userId = game.currentUser.id;
};

export const playTurn = (game, score) => {
    if (game.round >= game.maxRound) {
        game.isThereWinner = true;
        game.winner = calculateWinner(game);
        game.finished = true;

        return game;
    }

    const playingUser = game.scorer.board.find(item => item.id === game.currentUser.id);

    if (playingUser.turn >= 3) {
        playingUser.turn = 0;
        setNextPlayer(game);
        game.round += 1;
        return game;
    }

    if (isViableScore(game, score)) {
        playingUser.score -= score;
    }
    console.log('userTurn', playingUser.score);
    console.log('userTurn', score);
    playingUser.turn += 1;

    const winner = calculateWinner(game);
    if (winner) {
        game.isThereWinner = true;
        game.winner = winner;
        game.finished = true;
    }

    return game;
};
