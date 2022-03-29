import { useState } from 'react';

const Context = React.createContext({});

export function UsersContextProvider({ children }){

    const [ users, getUsers ] = useState([]);

    return (<Context.Provider value={{ 
        users, getUsers,
    }}>
        { children }
    </Context.Provider>);
}

export default Context;