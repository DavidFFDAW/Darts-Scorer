import LocalStorageService from "./local.storage.service";

const cricketRounds = 20;
const shots = 3;

let round = 0;
let maxRounds = 0;// rounds * shots * players
let isGameOver = false;
let maxPlayers = 0;
let scorer = [];

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
      maxPlayers = players.length;
      maxRounds = cricketRounds * shots * maxPlayers;

      const objects = players.map(item => {
            return {
                  name: item,
                  points: getInitialObject(),
                  score: 0,
            };
      });

      scorer = objects;
      return scorer;
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

const addPointToScoreOf = (point, playerName, value, quantity = 1) => {
      // if (isGameOver) throw new Error('The game is over');

      if (!_isNumberClosedForEveryone(point)) {
            console.log(point);
            console.log(playerName);
            console.log(quantity);
            const pointer = scorer.find(item => item.name === playerName);
            if (_isNumberClosedFor(point,playerName)){
                  pointer.score += +value;
            }
            if (pointer.points.hasOwnProperty(`${point}`)) {
                  pointer.points[`${point}`] += +quantity;
            }
            _addNewRound();
      }
      return getScorer();
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

const getScorer = () => {
      return scorer
};    
const setScorer = (passedScorer) => {
      scorer = passedScorer
};  

const getScoreByPlayerName = (player) => scorer.find(({ name }) => name === player).score;

const getRound = () => round;
// const setRound = (round) => { round = round; }

const getMaxRounds = () => maxRounds;
const isOver = () => isGameOver;
const getMaxPlayers = () => maxPlayers;

const getCurrentParsedRound = (round) => {
      const players = +LocalStorageService.get('numPlayers');
      const shots = +LocalStorageService.get('maxShots');
      return Math.floor(round / shots / players);
}

const CricketGameService = {
      getScorePoints, getRound, getMaxRounds, isOver, getMaxPlayers, build, getScorer, setScorer, addPointToScoreOf, getScoreByPlayerName, getCurrentParsedRound
}

// --------------------- HOW IT WORKS --------------------- //

/*
      cricket.build(['Davis', 'Alvaro']);

      cricket.addPointToScoreOf(18, 'Davis');
      cricket.addPointToScoreOf(15, 'Davis');
      cricket.addPointToScoreOf(20, 'Davis');

      cricket.addPointToScoreOf(1, 'Alvaro');
      cricket.addPointToScoreOf(16, 'Alvaro');
      cricket.addPointToScoreOf(16, 'Alvaro');

      cricket.addPointToScoreOf(20, 'Davis');
      cricket.addPointToScoreOf(20, 'Davis');
      cricket.addPointToScoreOf(20, 'Davis');

      cricket.addPointToScoreOf(1, 'Alvaro');
      cricket.addPointToScoreOf(7, 'Alvaro');
      cricket.addPointToScoreOf(10, 'Alvaro');

      console.log('Max players: ', cricket.getMaxPlayers());
      console.log('Max rounds: ', cricket.getMaxRounds());
      console.log('Current round: ', cricket.getRound());
      console.log('Scorer: ', cricket.getScorer());
      console.log('Current Round Parsed: ', cricket.getCurrentParsedRound());

*/

export default CricketGameService;
