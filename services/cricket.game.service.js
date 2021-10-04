const UsersService = require('./player.service.js');

class CricketGame {
    constructor(maxPlayers){
        this.round = 0;
        this.maxRounds = 20 * maxPlayers;
        this.isGameOver = false;
        this.maxPlayers = maxPlayers;
        this.scorer = [];
    }

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

    _isNumberClosedForEveryone = (number) => {
        return this.scorer.every(item => item.points[number] >= 3);
    }

    _isNumberClosedFor = (number, player) => {
        return this.scorer.find(item => item.name === player).points[number] >= 3;
    }

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
                pointer.scorer += point;
            }
            pointer.points[point] + 1;
            this._addNewRound();
        }
    }

    getScorer = () => {
        return this.scorer;
    }

    getRound = () => this.round;
    

    getMaxRounds = () => this.maxRounds;

}

const players = ['Alvaro','Dani','Alexa','David'];

UsersService.setMaxPlayers(4);
UsersService.setPlayers(players);
const cricket = new CricketGame(UsersService.getMaxPlayers());

cricket.build(UsersService.getPlayers());
cricket.addPointToScoreOf(20,'David');
cricket.addPointToScoreOf(20,'David');
cricket.addPointToScoreOf(20,'David');

const scorer = cricket.getScorer();
console.log(cricket.getRound());
console.log(cricket.getMaxRounds());



