const parser = {
      0: ' ',
      1: '/',
      2: 'X',
      3: '⦻'
  }
  
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
  
  const build = (players) => {
        return players.map(item => {
            return {
                  name: item,
                  points: getInitialObject(),
                  score: 0,
                  out: 0,
                  valid: 0,
            };
        });
  }

  const calculateAverage = scoreboard => {
        return scoreboard.map( it => {
              const total = +it.valid + +it.out;
              const average = total === 0 ? 1 : (( it.valid / total ) * 3).toFixed(2);
              return {
                    ...it,
                    average,
              }
        });
  }
  
  const _isNumberClosedForEveryone = (scorer, number) => scorer.every(item => item.points[number] >= 3);
  
  const _isNumberClosedFor = (scorer, number, player) => scorer.find(item => item.name === player).points[number] >= 3;
  
  const addPointToScoreOf = (scorer, point, playerName) => {
      const pointer = scorer.find(item => item.name === playerName);

      if (_isNumberClosedForEveryone(scorer, point)) return scorer;

      if (_isNumberClosedFor(scorer, point, playerName)){
            pointer.score += +point;
      }

      if (pointer.points.hasOwnProperty(`${point}`)) {
            pointer.points[`${point}`] += 1;
      }       

      if (Object.keys(getInitialObject()).includes(point)) {
            pointer.valid++;
      } else {
            pointer.out++;
      }

      // console.log(calculateAverage(scorer))

      return calculateAverage(scorer);
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
  
  
  const getScoreByPlayerName = (scorer, player) => scorer.find(({ name }) => name === player).score;

  const someoneHasEverythingClosed = scoreboard => scoreboard.some(it => Object.values(it.points).every(it => it >= 3));

  const getPlayersWithAllClosed = scorer => scorer.filter(il => Object.values(il.points).every(il => il >= 3));

  const getJustScores = scorer => scorer.map(i => i.score);

  const getMaxFromScore = scores => Math.max(...scores);

  const getPlayersWithMaxScore = (scorer, max) => scorer.filter(ilm => ilm.score === max);



  const winnerByRoundsAndScores = scoreboard => {
       const maxScore = getMaxFromScore(getJustScores(scoreboard));
       const playersWithMaxScore = getPlayersWithMaxScore(scoreboard, maxScore);

       if (playersWithMaxScore.length === 1) {
              return playersWithMaxScore[0].name;
       }

       return false;
   }



  const checkForWinner = (scoreboard) => {
       if (someoneHasEverythingClosed(scoreboard)) {
            const playersClosed = getPlayersWithAllClosed(scoreboard);
            const maxScored = getMaxFromScore(playersClosed.map(element => element.score));
            return playersClosed.find(element => element.score === maxScored).name;
       }
       return false;
  }
  
  
  const CricketGameService = {
        getScorePoints, build, addPointToScoreOf, getScoreByPlayerName, checkForWinner, someoneHasEverythingClosed, winnerByRoundsAndScores
  }
  
  export default CricketGameService;
  
