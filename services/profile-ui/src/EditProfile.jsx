import {useCallback, useEffect, useState} from "react";
import {ProfileForm} from "uikit";
import {useUserContext} from "common";
import api from "./api.js";

export function EditProfile() {
    const { user, setUser } = useUserContext();
    const [form, setForm] = useState(null);

    const handleEdit = useCallback(async (patch) => {
        const nextUser = await api.updateProfile(user.id, patch);
        setForm(nextUser);
        if (nextUser.email !== user.email) {
            setUser(nextUser);
        }
    }, [setUser, user]);

    useEffect(() => {
        if (user?.id && !form) {
            api.getProfile(user.id).then(setForm);
        }
    }, [user, form]);

    return form && <ProfileForm
        onEdit={handleEdit}
        user={{
            ...form,
            password: ''
        }}
    />
}
