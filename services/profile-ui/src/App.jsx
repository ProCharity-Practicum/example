import { AppContainer } from "uikit";
import { UserContextProvider } from "common";
import { CurrentUser } from "auth/CurrentUser";
import {EditProfile} from "./EditProfile.jsx";

function App() {
    return <UserContextProvider>
        <AppContainer user={<CurrentUser />}>
            <EditProfile />
        </AppContainer>
    </UserContextProvider>
}

export default App
