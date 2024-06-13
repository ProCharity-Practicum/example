import { AuthForm } from "./AuthForm.jsx";
import {fn} from "@storybook/test";

export default {
    title: 'Components/AuthForm',
    component: AuthForm,
    parameters: {
        layout: 'centered'
    },
    args: {
        onLogin: fn()
    }
}

export const Default = {

};
