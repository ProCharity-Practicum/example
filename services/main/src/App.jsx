import {AppContainer, Counter} from "uikit";
import { CounterContextProvider, useCounterContext, UserContextProvider, useUserContext } from "common";
import { CurrentUser } from "auth/CurrentUser";
import { TestRemoteCounter } from "auth/TestRemoteCounter";

function TestSharedUser() {
    const { user } = useUserContext();

    return <div>
        <h2>Shared user</h2>
        <div>
            <span>Username: {user?.account || ""}</span>
        </div>
    </div>
}

function TestSharedCounter() {
    const { state, setState } = useCounterContext();

    return <div>
        <h2>Shared counter</h2>
        <Counter
            value={state?.count || 0}
            onChange={v => setState({ count: v })}
        />
    </div>
}

function App() {
  return <UserContextProvider>
      <AppContainer user={<CurrentUser />}>
          <h1>Hello</h1>
          <TestSharedUser />
          <CounterContextProvider>
              <TestSharedCounter />
              <TestRemoteCounter />
          </CounterContextProvider>
      </AppContainer>
  </UserContextProvider>
}

export default App
