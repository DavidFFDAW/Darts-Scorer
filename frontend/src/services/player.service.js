export default class UserService {
    
    constructor(){
        this.maxPlayers = 0;
        this.players = [];
    }

    static getMaxPlayers(){
        return this.maxPlayers;
    }

    static getPlayers(){
        return this.players;
    }

    static setPlayers(players){
        this.players = players;
        this.maxPlayers = this.players.length;
    }
}