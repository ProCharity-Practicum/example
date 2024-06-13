import {Button} from "../button/Button.jsx";
import PropTypes from "prop-types";
import styles from "./User.module.scss";

export function User({ user = null, onLogin, onLogout }) {
    return user ? (
        <div className={styles.user}>
            <span className={styles.welcome}>
              Welcome, <b>{user}</b>!
            </span>
            <Button size="small" onClick={onLogout} label="Log out" />
        </div>
    ) : (
        <div className="user">
            <Button size="small" onClick={onLogin} label="Log in" />
        </div>
    )
}

User.propTypes = {
    user: PropTypes.string,
    onLogin: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
};
