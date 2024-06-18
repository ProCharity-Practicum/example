import { ProfileForm } from "./ProfileForm.jsx";
import {fn} from "@storybook/test";

export default {
    title: 'Components/ProfileForm',
    component: ProfileForm,
    parameters: {
        layout: 'centered'
    },
    args: {
        user: {
            name: 'John Doe',
            email: 'test@test.ru',
            phone: '+7 999 123 45 67',
            password: ''
        },
        onEdit: fn()
    }
}

export const Default = {

};
