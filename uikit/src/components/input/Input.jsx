import PropTypes from "prop-types";
import {forwardRef} from "react";
import clsx from "clsx";
import styles from "./Input.module.css";


export const Input = forwardRef(function Input({ type, value, onChange, ...props }, ref) {
    let _format = () => value;
    let _parse = (v) => v;
    let _type = "text";
    let _tag = "input";
    let _props = { ...props };

    switch (type) {
        case "integer":
            _type = "number";
            _format = String;
            _parse = (v) => parseInt(v);
            if (!props.step) _props.step = 1;
            if (props.min !== undefined && props.max !== undefined) _type = "range";
            break;
        case "float":
            _type = "number";
            _format = String;
            _parse = (v) => parseFloat(v);
            if (!props.step) _props.step = 0.1;
            if (props.min !== undefined && props.max !== undefined) _type = "range";
            break;
        case "date":
            _format = (v) => (v instanceof Date)
                ? v.toISOString().split("T")[0]
                : v;
            _type = "date";
            break;
        case "time":
            _format = (v) => (v instanceof Date)
                ? v.toISOString().split("T")[1].split(".")[0]
                : v;
            _type = "time";
            break;
        case "datetime":
            _format = (v) => (v instanceof Date)
                ? v.toISOString().split(".")[0]
                : v;
            _parse = (v) => new Date(v);
            _type = "datetime-local";
            break;
        case "string":
            if (props.options) {
                _tag = "select";
                if (Array.isArray(props.options)) {
                    _props.children = props.options.map((v) => (
                        typeof v === "string"
                            ? <option key={v} value={v}>{v}</option>
                            : <option key={v.value} value={v.value}>{v.label}</option>
                    ));
                } else {
                    _props.children = Object.entries(props.options).map(([k, v]) => (
                        <option key={k} value={k}>{v}</option>
                    ));
                }
                if (props.multiple) {
                    _format = (v) => Array.isArray(v) ? v : [v];
                    _parse = (v) => {
                        console.log(v);
                        return Array.isArray(v) ? v : [v];
                    };
                }
            }
            break;
        case "boolean":
            _type = "checkbox";
            _format = Boolean;
            break;
        default:
            _type = type;
    }

    switch (_tag) {
        case "input":
            return (
                <input
                    {..._props}
                    className={clsx(styles.input, props.className)}
                    ref={ref}
                    type={_type}
                    value={_format(value)}
                    onChange={
                        _type === "checkbox"
                            ? (e) => onChange?.(e.target.checked)
                            : (e) => onChange?.(_parse(e.target.value))
                    }
                />
            );
        case "textarea":
            return (
                <textarea
                    {..._props}
                    className={clsx(styles.input, props.className)}
                    ref={ref}
                    value={_format(value)}
                    onChange={(e) => onChange?.(_parse(e.target.value))}
                />
            );
        case "select":
            return (
                <select
                    {..._props}
                    className={clsx(styles.input, props.className)}
                    ref={ref}
                    value={_format(value)}
                    onChange={
                        props.multiple
                            ? (e) => onChange?.(Array.from(e.target.selectedOptions).map((o) => o.value))
                            : (e) => onChange?.(e.target.value)
                    }
                />
            );
    }
});

Input.propTypes = {
    className: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    type: PropTypes.oneOf(["string", "text", "integer", "boolean", "float", "date", "time", "datetime", "email", "password", "tel", "url"]),
    step: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    options: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.string
        })),
        PropTypes.object
    ]),
    multiple: PropTypes.bool,
}
