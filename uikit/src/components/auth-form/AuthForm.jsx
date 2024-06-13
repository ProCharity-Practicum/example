import {useCallback, useMemo, useRef, useState} from "react";
import {Form} from "../form/Form.jsx";
import {Button} from "../button/Button.jsx";
import PropTypes from "prop-types";


export function AuthForm({ onLogin }) {
    const [state, setState] = useState({
        email: '',
        password: ''
    });
    /** @type {MutableRefObject<HTMLFormElement>} */
    const ref = useRef();

    const handleSubmit = useCallback(() => {
        onLogin(state);
    },[onLogin, state]);

    const actions = useMemo(() => <Button
        primary={true}
        label="Sign In"
        type="submit"
        disabled={!state.email || !state.password || !ref.current?.checkValidity()}
    />, [state.email, state.password]);

    return <Form
        ref={ref}
        schema={{
            email: {
                type: 'email',
                label: 'Email',
                required: true,
                autoComplete: 'new-email'
            },
            password: {
                type: 'password',
                label: 'Password',
                required: true,
                autoComplete: 'new-password'
            }
        }}
        onSubmit={handleSubmit}
        onChange={setState}
        value={state}
        actions={actions}
    />;
}

AuthForm.propTypes = {
    onLogin: PropTypes.func.isRequired
};
