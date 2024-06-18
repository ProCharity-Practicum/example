import {createContext, useContext, useState} from "react";

export const UserContext = createContext({});

export function UserContextProvider({children}) {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{
            setUser,
            user,
        }}>
            {children}
        </UserContext.Provider>
    );
}

/**
 * @returns {{setUser: (user) => void, user: {id,role,account}}}
 */
export function useUserContext() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppContextProvider");
    }
    return context;
}
