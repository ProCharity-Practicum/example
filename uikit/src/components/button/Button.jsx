import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './Button.module.scss';

/**
 * Primary UI component for user interaction
 */
export const Button = ({
                           primary = false,
                           className,
                           size = 'medium',
                           type = 'button',
                           label,
                           ...props
                       }) => {
    const mode = primary ? styles.primary : styles.secondary;
    return (
        <button
            {...props}
            className={clsx(styles.button, styles[size], mode, className)}
        >
            {label}
        </button>
    );
};

Button.propTypes = {
    primary: PropTypes.bool,
    className: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

