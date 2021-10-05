export default class LocalStorageService {
    constructor(){
        this.storage = window.localStorage;
    }

    store = (key, value) => {
        this.storage.setItem(key, JSON.stringify(value));
    }

    get = key => JSON.parse(this.storage.getItem(key));

    removeByKey = key => {
        if (this.get(key)) {
            this.storage.removeItem(key);
        }
    }
}