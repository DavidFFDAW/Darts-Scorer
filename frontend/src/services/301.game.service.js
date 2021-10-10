const buildGame = (players) => {
    return players.map(name => ({ name: name, score: 301 }));
}

const isThereWinner = scoreboard => scoreboard.some( item => item.score === 0);

const checkForWinner = scoreboard => {
    return { status: true, name: scoreboard.find(it => it.score === 0).name };
}

const willCountPoint = (point,currentplayer,score) => {
    const player = score.find(it => it.name === currentplayer);
    
    return player.score - +point >= 0;
}

const substractPoint = (point, currentplayer, scoreboard) => {
    const thisPlayer = scoreboard.find(it => it.name === currentplayer);
    thisPlayer.score -= point;
    return scoreboard;
}


const Game301Service = {
    buildGame,
    willCountPoint,
    substractPoint,
    checkForWinner,
    isThereWinner
}

module.exports = Game301Service;