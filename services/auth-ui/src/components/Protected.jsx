import {useUserContext} from "../hooks/useUserContext.jsx";


export function Protected({ children, fallback}) {
    const {user} = useUserContext();
    if (!user) {
        return fallback;
    } else {
        return children;
    }
}
