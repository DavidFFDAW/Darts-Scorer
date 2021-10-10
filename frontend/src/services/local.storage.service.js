const storage = window.localStorage;
    
const store = (key, value) => {
    storage.setItem(key, JSON.stringify(value));
}

const get = key => JSON.parse(storage.getItem(key));

const removeByKey = key => {
    storage.removeItem(key);    
}

const getScoreboardByGame = game => {
    if (get('gameType') === game){
        return get('scoreboard');
    }
    return false;
}

const LocalStorageService = {
    get, store, removeByKey, getScoreboardByGame
}

export default LocalStorageService;