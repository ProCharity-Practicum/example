import { Counter } from "uikit";
import { useCounterContext } from "common";

export function TestRemoteCounter() {
    const { state, setState } = useCounterContext();

    return <div>
        <h2>Remote counter</h2>
        <Counter
            value={state?.count || 0}
            onChange={v => setState({ count: v })}
        />
    </div>
}
