import {useUserContext} from "auth/Hooks";
import api from "./api.js";
import {useEffect, useState} from "react";
import {ProfileForm} from "uikit";

export function EditProfile() {
    const { user } = useUserContext();
    const [form, setForm] = useState(null);

    useEffect(() => {
        if (user?.id) {
            api.getProfile(user.id).then(setForm);
        }
    }, [user]);

    return form && <ProfileForm
        onEdit={setForm}
        user={form}
    />
}
