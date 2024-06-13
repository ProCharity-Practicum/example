import { AppContainer } from "uikit";
import { CurrentUser } from "auth/CurrentUser";
import { UserContextProvider } from "auth/UserContext";
import {EditProfile} from "./EditProfile.jsx";

function App() {
    return <UserContextProvider>
        <AppContainer user={<CurrentUser />}>
            <EditProfile />
        </AppContainer>
    </UserContextProvider>
}

export default App
