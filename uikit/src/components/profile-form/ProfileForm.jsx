import {useCallback, useMemo, useRef, useState} from "react";
import {Form} from "../form/Form.jsx";
import {Button} from "../button/Button.jsx";
import PropTypes from "prop-types";


export function ProfileForm({ onEdit }) {
    const [state, setState] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    });
    /** @type {MutableRefObject<HTMLFormElement>} */
    const ref = useRef();

    const handleSubmit = useCallback(() => {
        onEdit(state);
    },[onEdit, state]);

    const actions = useMemo(() => <Button
        primary={true}
        label="Save"
        type="submit"
        disabled={!state.email || !state.password || !ref.current?.checkValidity()}
    />, [state.email, state.password]);

    return <Form
        ref={ref}
        schema={{
            name: {
                type: 'text',
                label: 'Name',
                required: true,
                autoComplete: 'new-name'
            },
            email: {
                type: 'email',
                label: 'Email',
                required: true,
                autoComplete: 'new-email'
            },
            phone: {
                type: 'tel',
                label: 'Phone',
                autoComplete: 'new-phone'
            },
            password: {
                type: 'password',
                label: 'Password',
                autoComplete: 'new-password',
                required: true,
            }
        }}
        onSubmit={handleSubmit}
        onChange={setState}
        value={state}
        actions={actions}
    />;
}

ProfileForm.propTypes = {
    onEdit: PropTypes.func.isRequired
};
