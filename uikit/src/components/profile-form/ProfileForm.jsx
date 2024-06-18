import {useCallback, useMemo, useRef, useState} from "react";
import {Form} from "../form/Form.jsx";
import {Button} from "../button/Button.jsx";
import PropTypes from "prop-types";


export function ProfileForm({ onEdit, user }) {
    const [changed, setChanged] = useState({
        name: user.name,
        email: user.email,
        phone: user.phone,
        password: ''
    });
    /** @type {MutableRefObject<HTMLFormElement>} */
    const ref = useRef();

    const getPatch = useCallback(() => {
        return Object.keys(changed).reduce((acc, key) => {
            if (changed[key] !== user[key]) {
                acc[key] = changed[key];
            }
            return acc;
        }, {});
    }, [changed, user]);

    const handleSubmit = useCallback(() => {
        onEdit(getPatch());
    },[onEdit, getPatch]);

    const actions = useMemo(() => <Button
        primary={true}
        label="Save"
        type="submit"
        disabled={!Object.keys(getPatch()).length || !ref.current?.checkValidity()}
    />, [getPatch]);

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
                autoComplete: 'new-password'
            }
        }}
        onSubmit={handleSubmit}
        onChange={setChanged}
        value={changed}
        actions={actions}
    />;
}

ProfileForm.propTypes = {
    onEdit: PropTypes.func.isRequired,
    user: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
        phone: PropTypes.string,
        password: PropTypes.string
    })
};
