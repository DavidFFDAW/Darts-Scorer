import { AppSettings } from 'AppSetting';
import React from 'react';

const Context = React.createContext();

export function DartsContextProvider({ children }) {
    const localStorageDarts = JSON.parse(localStorage.getItem(AppSettings.LOCAL_STORAGE_KEY));
    const [darts, setDarts] = React.useState(_ => localStorageDarts || {});

    return <Context.Provider value={{ darts, setDarts }}>{children}</Context.Provider>;
}

export default Context;
