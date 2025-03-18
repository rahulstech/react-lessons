import { createContext, useCallback, useContext, useMemo, useState } from "react";

const AppContext = createContext();

const AnotherContext = createContext();

export function useAppContext() {
    return useContext(AppContext);
}

export function useAnotherContext() {
    return useContext(AnotherContext);
}

export function AppContextProvider({ children }) {

    const [name,setNameState] = useState("");
    const [height,setHeightState] = useState(0);

    // function declared inside components must be wrapped in useCallback hook. why? on each render declared functions
    // are recreated. therefore and dependent of those function re-rendered unnecessarily. useCallback hook cache the
    // the function and regenerates only when its dependencies changes.

    const setName = useCallback((value) => {
        setNameState(`${value}(${height})`);
    },[height]);

    const setHeight = useCallback((value) => {
        setHeightState(Number(value));
    },[setHeightState]);

    // const setName = setNameState;

    // const setName = (value) => {
    //     setNameState(value);
    // };

    const contextValue = useMemo(()=>({
        name, setName, height, setHeight
    }),[name,setName, height, setHeight]);

    // const contextValue = { name, setName };

    console.log('redering AppContextProvider');
    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}


export function AnotherContextProvider({ children }) {

    const [age,setAgestate] = useState(0);

    const setAge = useCallback((value) => {
        setAgestate(Number(value));
    },[setAgestate]);

    // const setAge = setAgestate;

    const contextValue = useMemo(()=>({
        age, setAge,
    }),[age,setAge]);

    // const contextValue = { age, setAge };

    console.log('redering AnotherContextProvider');
    return (
        <AnotherContext.Provider value={contextValue}>
            {children}
        </AnotherContext.Provider>
    )
}