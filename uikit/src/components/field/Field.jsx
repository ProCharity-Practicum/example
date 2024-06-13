import {Input} from "../input/Input.jsx";
import PropTypes from "prop-types";
import clsx from "clsx";

import styles from "./Field.module.css";
import {useRef} from "react";

export function Field({ label, hint, hintClassName, ...props }) {
    const ref = useRef();

    return (props.type !== "boolean")
        ? <label>
            <span>{label}</span>
            <Input {...props} ref={ref} />
            {hint && <span className={clsx(styles.hint, hintClassName)}>{hint}</span>}
        </label>
        : <label>
            <Input {...props} ref={ref} />
            <span>{label}</span>
        </label>
}

Field.propTypes = {
    label: PropTypes.string,
    hint: PropTypes.string,
    hintClassName: PropTypes.string,
    ...Input.propTypes
}
