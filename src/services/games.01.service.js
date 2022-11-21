const buildGame = (players, maxPoints) => {
    return players.map((name) => ({ name: name, score: maxPoints, last: "" }));
};

const isThereWinner = (scoreboard) =>
    scoreboard.some((item) => item.score === 0);

const checkForWinner = (scoreboard) =>
    scoreboard.find((it) => it.score === 0).name;

const willCountPoint = (point, currentplayer, score) => {
    const player = score.find((it) => it.name === currentplayer);

    return player.score - +point >= 0;
};

const substractPoint = (point, currentplayer, scoreboard, lastPoint) => {
    const thisPlayer = scoreboard.find((it) => it.name === currentplayer);
    thisPlayer.score -= point;
    thisPlayer.last = `${lastPoint}`;
    return scoreboard;
};

const Game301Service = {
    buildGame,
    willCountPoint,
    substractPoint,
    checkForWinner,
    isThereWinner,
};

export default Game301Service;
