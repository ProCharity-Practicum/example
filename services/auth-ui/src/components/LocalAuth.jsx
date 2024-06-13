import {AuthForm} from "uikit";
import {useState} from "react";
import PropTypes from "prop-types";
import api from "../services/AuthApi.js";

export function LocalAuth({ onLoggedIn }) {
    const [error, setError] = useState(null);
    const handleLogin = ({email, password}) => {
        setError(null);
        api.login(email, password)
            .then(onLoggedIn)
            .catch((error) => {
                setError(error.message);
            });
    };

    return (
        <div style={{width: 400}}>
            <h1>Local Auth</h1>
            <AuthForm onLogin={handleLogin} />
            {error && <p>{error}</p>}
        </div>
    );
}

LocalAuth.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
};

