export class CricketService {

    constructor(dartsGame) {
        this.game = dartsGame;
        this.maxValidPoint = 2;
        console.log('-------------------------------------');
        console.log('__Game Controller Class Initialized__');
        console.log('-------------------------------------');
    }

    _getDirectWinner() {
        return this.game.scorer.board.find(board => {
            return Object.values(board.valid_points).every(point => point >= this.maxValidPoint);
        });
    }

    _getCalculatedWinner() { 
        const scores = this.game.scorer.board.map(item => item.score);
        const maximumScore = Math.min(...scores);

        const winners = this.game.scorer.board.filter(item => item.score === maximumScore);
        return winners[0];
    }

    
    _setNextPlayer = _ => {
        const currentUser = this.game.players.findIndex(item => item.id === this.game.currentUser.id);
        const user = this.game.players[currentUser + 1] || this.game.players[0];
        this.game.currentUser = user;
        this.game.scorer.userId = this.game.currentUser.id;
    };

    _calculateWinner(game) {
        const directWinner = this._getDirectWinner(game);
        if (directWinner) return directWinner;
    
        if (game.round >= game.maxRound) {
            const calculatedWinner = this._getCalculatedWinner(game);
    
            return calculatedWinner;
        }
    };

    _isEveryValidPointClosedFor(player) {
        return Object.values(player.valid_points).every(point => point >= this.maxValidPoint);
    }

    _isEveryValidPointClosedForEveryone() {
        return this.game.scorer.board.filter(item => Object.values(item.valid_points).every(point => point >= this.maxValidPoint)).length > 0;
    }

    _isNumberClosedForEveryone(score) {
        return this.game.scorer.board.every(playerBoard => {
            return playerBoard.valid_points[score] >= this.maxValidPoint
        });
    }

    _isNumberClosedFor(player, score) {
        const point = player.valid_points[score];
        if (!point) return false;

        return point >= this.maxValidPoint;
    }

    _scorePoints = (user, score,) => {
        const { simpleValue, times } = score;
        
        for (let i = 1; i <= Number(times); i++) {
            if (!this._isNumberClosedForEveryone(simpleValue) && this._isNumberClosedFor(user, simpleValue)) {
                user.score += Number(simpleValue);
            }
            user.valid_points[simpleValue] += 1;
        }

    };
    
    _score(user, score, strVal) {
        const { simpleValue } = score;

        if (strVal) {
            user.throws = [...user.throws, strVal];
        }

        if (this._isValidPoint(simpleValue) && !this._isEveryValidPointClosedForEveryone()) {
            this._scorePoints(user, score);
        }

        user.turn += 1;
    }

    _checkUserTurn(player) {
        if (player.turn >= 3) {
            player.turn = 0;
            this._setNextPlayer();
            this.game.round += 1;
        }
    }

    _setWinner(winner) {
        this.game.isThereWinner = true;
        this.game.winner = winner;
        this.game.finished = true;
    }

    _isValidPoint(score) { 
        const validOnes = Object.keys(this.game.scorer.board[0].valid_points);
        return validOnes.includes(score);
    }

    playCricketTurn(darts, score, realValue) {
        this.game = darts;

        if (this.game.round >= this.game.maxRound) {
            const winner = this._calculateWinner(this.game);
            this._setWinner(winner);
    
            return this.game;
        }

        const { simple, times } = realValue.datas;
        const stringValue = realValue.label || score;
        const playingUser = this.game.scorer.board.find(item => item.id === this.game.currentUser.id);
        this._checkUserTurn(playingUser);
        
        this._score(playingUser, {
            total: score,
            simpleValue: simple,
            times: times,
        }, stringValue);
        

        const winner = this._getDirectWinner();
        if (winner) this._setWinner(winner);

        return this.game;
    }
}