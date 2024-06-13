import {createContext, useCallback, useEffect, useState} from "react";

export const UserContext = createContext({});

export function UserContextProvider({children}) {
    const [user, _setUser] = useState(null);

    const setUser = useCallback((user) => {
        localStorage.setItem('user', JSON.stringify(user));
        _setUser(user);
    }, [_setUser]);

    useEffect(() => {
        const raw = localStorage.getItem('user');
        if (raw) setUser(JSON.parse(raw));
    }, []);

    return (
        <UserContext.Provider value={{
            setUser,
            user,
        }}>
            {children}
        </UserContext.Provider>
    );
}
