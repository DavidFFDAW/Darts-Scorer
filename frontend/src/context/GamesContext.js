import React, { useState } from 'react';
import keys from '../constants/storage.keys';

const Context = React.createContext({});

export function GamesContextProvider({ children }){

    const [ scoreboard, setGameScorer ] = useState(_ => JSON.parse(localStorage.getItem(keys.scoreboard)) || []);

    return (<Context.Provider value={{ 
        scoreboard, setGameScorer,
    }}>
        { children }
    </Context.Provider>);
}

export default Context;