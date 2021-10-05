// const UsersService = require('./player.service.js');
export default class CricketGameService {
    constructor(maxPlayers){
        this.round = 0;
        this.maxRounds = 20 * 3 * maxPlayers; // rounds * shots * players
        this.isGameOver = false;
        this.maxPlayers = maxPlayers;
        this.scorer = [];
    }
    /**
     * Gets cricket points
     * @method
     * @returns {Object} Cricket points
     */
    getInitialObject = () => {
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

    build = (players) => {
        const objects = players.map(item => {
            const obj = {
                name: item,
                points: this.getInitialObject(),
                score: 0,
            };
            return obj;
        });
        this.scorer = objects;
        // return this.scorer;
    }

    _isNumberClosedForEveryone = (number) => this.scorer.every(item => item.points[number] >= 3);

    _isNumberClosedFor = (number, player) => this.scorer.find(item => item.name === player).points[number] >= 3;

    _addNewRound = _ => {
        if (this.round >= this.maxRounds) {
            this.isGameOver = true;
            return;
        }
        this.round++;        
    }

    addPointToScoreOf = (point, playerName) => {
        if (this.isGameOver) throw new Error('The game is over');

        if (!this._isNumberClosedForEveryone(point)) {
            const pointer = this.scorer.find(item => item.name === playerName);
            if (this._isNumberClosedFor(point,playerName)){
                pointer.score += point;
            }
            pointer.points[point] += 1;
            this._addNewRound();
        }
    }

    getScorer = () => this.scorer;    

    getScoreByPlayerName = (player) => this.scorer.find(({ name }) => name === player).score;

    getRound = () => this.round;
    setRound = (round) => { this.round = round; }

    getMaxRounds = () => this.maxRounds;

}



// -------------------- TESTS ------------------------- //
/* 
const players = ['Alvaro','Dani','Alexa','David'];

UsersService.setPlayers(players);
const cricket = new CricketGame(UsersService.getMaxPlayers());

cricket.build(UsersService.getPlayers());

cricket.addPointToScoreOf(20,'David');
cricket.addPointToScoreOf(20,'David');
cricket.addPointToScoreOf(20,'David');

cricket.addPointToScoreOf(20,'Alexa');
cricket.addPointToScoreOf(20,'Alexa');
cricket.addPointToScoreOf(20,'Alexa');

cricket.addPointToScoreOf(20,'Dani');
cricket.addPointToScoreOf(20,'Dani');
cricket.addPointToScoreOf(20,'Dani');

cricket.addPointToScoreOf(20,'Alvaro');
cricket.addPointToScoreOf(20,'Alvaro');
cricket.addPointToScoreOf(20,'Alvaro');

// David has 20 points
cricket.addPointToScoreOf(20,'David');
// David must remain with 20 points

console.log('David Score: ',cricket.getScoreByPlayerName('David'));
console.log(cricket.getRound());
console.log(cricket.getMaxRounds());


 */
