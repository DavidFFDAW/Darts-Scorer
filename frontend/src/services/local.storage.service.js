const storage = window.localStorage;
    
const store = (key, value) => {
    storage.setItem(key, JSON.stringify(value));
}

const get = key => JSON.parse(storage.getItem(key));

const removeByKey = key => {
    if (get(key)) {
        storage.removeItem(key);
    }
}

const LocalStorageService = {
    get, store, removeByKey
}

export default LocalStorageService;