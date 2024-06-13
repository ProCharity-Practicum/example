import { AppContainer } from "uikit";
import { CurrentUser } from "auth/CurrentUser";
import { UserContextProvider } from "auth/UserContext";

function App() {
  return <UserContextProvider>
      <AppContainer user={<CurrentUser />}>
          Hello
      </AppContainer>
  </UserContextProvider>
}

export default App
