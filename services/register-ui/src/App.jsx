import {AppContainer, RegisterForm} from "uikit";
import api from "./api.js";
import {useState} from "react";


function App() {
    const [message, setMessage] = useState("");
    const onRegister = (user) => {
        api.register(user).then(() => {
            window.location.href = "/auth/";
        }).catch((error) => {
            setMessage(error.message);
        });
    }

    return <AppContainer>
        <div style={{width: 400}}>
            <h1>Local Auth</h1>
            <RegisterForm onRegister={onRegister}/>
            {message && <p>{message}</p>}
        </div>
    </AppContainer>
}

export default App
