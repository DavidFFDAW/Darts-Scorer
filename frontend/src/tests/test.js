const scoreboard = [
    {
          name: 'David',
          points: { 15: 3, 16: 3, 17: 3, 18: 3, 19: 3, 20: 3, 25: 3 },
          score: 150,
    },
    {
          name: 'Pedro',
          points: { 15: 0, 16: 0, 17: 0, 18: 0, 19: 0, 20: 0, 25: 0 },
          score: 0,
    },
    {
          name: 'Alvaro',
          points: { 15: 3, 16: 3, 17: 3, 18: 0, 19: 3, 20: 3, 25: 3 },
          score: 50,
    },
];


const getInitialObject = () => {
    return {
          15: 0,
          16: 0,
          17: 0,
          18: 0,
          19: 0,
          20: 0,
          25: 0,
    }
}

const _isNumberClosedForEveryone = (number) => scorer.every(item => item.points[number] >= 3);

const _isNumberClosedFor = (number, player) => scorer.find(item => item.name === player).points[number] >= 3;

const _addNewRound = _ => {
      if (round >= maxRounds) {
            isGameOver = true;
            return;
      }
      round++;        
}

const addPointToScoreOf = (point, playerName) => {
      if (isGameOver) throw new Error('The game is over');

      if (!_isNumberClosedForEveryone(point)) {
            const pointer = scorer.find(item => item.name === playerName);
            if (_isNumberClosedFor(point,playerName)){
                  pointer.score += point;
            }
            if (pointer.points.hasOwnProperty(`${point}`)) {
                  pointer.points[`${point}`] = pointer.points[`${point}`] + 1;
            }
            _addNewRound();
      }
}

const parser = {
      0: ' ',
      1: '/',
      2: 'X',
      3: '⦻'
}

const parseOutput = points => {
      if (Array.isArray(points)) {
            return points.map(point => point > 3 ? parser[3] : parser[point]);
      }
      return points > 3 ? parser[3] : parser[points];                  
}

const getPoints = scorer => scorer.map(i => i.points);

const getScorePoints = scoreboard => {
    const keys = Object.keys(getInitialObject());
    const points = getPoints(scoreboard);

    return keys.map(key => {
        return [key, points.map(pt => parseOutput(pt[key])) ];
    });
}


console.log(getScorePoints(scoreboard));