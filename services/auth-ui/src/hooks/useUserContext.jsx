import {useContext} from "react";
import {UserContext} from "../contexts/UserContext.jsx";

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
