import React from 'react';

export const CounterContext = React.createContext({
    count: 0
});

export function CounterContextProvider({ children }) {
    const [state, setState] = React.useState({
        count: 0
    });

    return <CounterContext.Provider value={{ state, setState }}>
        {children}
    </CounterContext.Provider>;
}

export function useCounterContext() {
    return React.useContext(CounterContext);
}
