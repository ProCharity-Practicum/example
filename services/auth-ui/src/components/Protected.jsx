import {useUserContext} from "common";


export function Protected({ children, fallback}) {
    const {user} = useUserContext();
    if (!user) {
        return fallback;
    } else {
        return children;
    }
}
