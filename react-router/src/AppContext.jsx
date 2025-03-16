import { createContext, useContext, useState } from "react";
/**
 * context values are stored in memory. therefore on page reload the context value is lost.
 * to persis content value accross page reload just store the data in localStorage.
 */
export const AppContext = createContext();

export default function useAppContext() {
    return useContext(AppContext);
}

export function AppContextProvider({ children }) {

    const [name, setName] = useState('');

    function updateName(newName) {
        setName(newName);
    }

    return (
        <AppContext.Provider value={{ name, updateName }}>
            {children}
        </AppContext.Provider>
    )
}