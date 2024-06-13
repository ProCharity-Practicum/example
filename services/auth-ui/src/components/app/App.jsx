import {AppContainer} from "uikit";
import './App.css'
import {UserContextProvider} from "../../contexts/UserContext.jsx";
import {CurrentUser} from "../CurrentUser.jsx";
import {Protected} from "../Protected.jsx";

function GoHome() {
    window.location.href = '/';
    return <p>Redirecting...</p>
}

function App() {
  return <UserContextProvider>
      <AppContainer user={<CurrentUser />}>
          <Protected fallback={<p>Auth required!</p>}>
              <GoHome />
          </Protected>
      </AppContainer>
  </UserContextProvider>
}

export default App
