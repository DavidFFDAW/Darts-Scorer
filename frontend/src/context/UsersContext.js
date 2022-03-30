import React, { useState } from 'react';
import keys from '../constants/storage.keys';


const Context = React.createContext({});

export function UsersContextProvider({ children }){

    const [ users, setUsers ] = useState(_ => JSON.parse(localStorage.getItem(keys.playernames)) || []);
    console.log('Users en contexto: ',users);

    return (<Context.Provider value={{ 
        users, setUsers,
    }}>
        { children }
    </Context.Provider>);
}

export default Context;