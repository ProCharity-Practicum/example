import PropTypes from "prop-types";
import {Field} from "../field/Field.jsx";
import clsx from "clsx";
import styles from "./Form.module.css";
import {forwardRef, useRef} from "react";

// @todo: add support for nested objects and groups
export const Form = forwardRef(function Form({
                                                 schema,
                                                 actions,
                                                 value,
                                                 onChange,
                                                 onSubmit,
                                                 className,
                                                 layout = 'vertical'
                                             }, ref) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit?.();
        return false;
    };

    return <form
        ref={ref}
        onSubmit={handleSubmit}
        className={clsx(styles.form, className, {
            [styles.row]: layout === 'horizontal',
            [styles.column]: layout === 'vertical',
        })}
    >
        <InputObject schema={schema} value={value} onChange={onChange} />
        {actions && <div>
            {actions}
        </div>}
    </form>
});

export function InputObject({ schema, value, onChange }) {
    return Object
        .entries(schema)
        .map(([key, { type, label, ...options }]) => <Field
            {...options}
            key={key}
            label={label}
            type={type}
            value={value[key]}
            onChange={v => onChange({...value, [key]: v})}
        />)
}

Form.propTypes = {
    schema: PropTypes.shape({
        [PropTypes.string]: PropTypes.shape({
            type: PropTypes.string,
            label: PropTypes.string,
            hint: PropTypes.string,
            hintClassName: PropTypes.string,
            ...Field.propTypes
        })
    }),
    actions: PropTypes.node,
    className: PropTypes.string,
    layout: PropTypes.oneOf(['horizontal', 'vertical']),
    value: PropTypes.object,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
};
