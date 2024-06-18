export function Counter({ value, onChange }) {
    return <div>
        <button onClick={() => onChange(value - 1)}>-</button>
        <input
            type="text"
            value={value}
            onChange={(e) => {
                const value = parseInt(e.target.value);
                if (!isNaN(value)) {
                    onChange(value);
                }
            }} />
        <button onClick={() => onChange(value + 1)}>+</button>
    </div>;
}
