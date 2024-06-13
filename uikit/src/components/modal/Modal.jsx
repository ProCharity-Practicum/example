import { createPortal } from "react-dom";
import styles from './Modal.module.scss';
import PropTypes from "prop-types";

export function Modal({
                          children,
                          container = document.body,
                          onClose }) {
    return createPortal(
        <div className={styles.modal}>
            <div className={styles.container}>
                <button onClick={onClose} className={styles.close}>×</button>
                {children}
            </div>
        </div>,
        container
    );
}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    container: PropTypes.instanceOf(HTMLElement),
    onClose: PropTypes.func
}
