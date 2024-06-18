import {Modal, User} from "uikit";
import {useEffect, useState} from "react";
import {LocalAuth} from "./LocalAuth.jsx";

import { useUserContext } from "common";
import api from "../services/AuthApi.js";

export function CurrentUser() {
    const {user, setUser} = useUserContext();
    const [isOpened, setIsOpened] = useState(false);

    useEffect(() => {
        if (!user) {
            api.me()
                .then(({user}) => setUser(user))
                .catch(() => {});
        }
    }, [user, setUser]);

    return <>
        <User
            onLogin={() => setIsOpened(true)}
            onLogout={async () => {
                await api.logout();
                setUser(null);
            }}
            user={user?.account}
        />
        {isOpened && <Modal onClose={() => setIsOpened(false)}>
            <LocalAuth onLoggedIn={(result) => {
                setIsOpened(false);
                setUser(result);
            }} />
        </Modal>}
    </>;
}
