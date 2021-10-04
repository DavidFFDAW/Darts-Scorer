class UserService {
    
    constructor(){
        this.maxPlayers = 0;
        this.players = [];
    }

    static setMaxPlayers(maxPlayers){
        this.maxPlayers = maxPlayers;
    }

    static getMaxPlayers(){
        return this.maxPlayers;
    }

    static getPlayers(){
        return this.players;
    }

    static setPlayers(players){
        this.players = players;
    }

}
module.exports = UserService;