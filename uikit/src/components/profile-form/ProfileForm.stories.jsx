import { ProfileForm } from "./ProfileForm.jsx";
import {fn} from "@storybook/test";

export default {
    title: 'Components/ProfileForm',
    component: ProfileForm,
    parameters: {
        layout: 'centered'
    },
    args: {
        onRegister: fn()
    }
}

export const Default = {

};
