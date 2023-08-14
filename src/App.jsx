import './App.css';
import {Outlet} from 'react-router-dom';
import Nav from "./component/nav/Nav";
import {LoginProvider} from "./context/LoginContext";

function App() {
    return (
        <>
            <LoginProvider>
                <Nav/>
                <Outlet/>
            </LoginProvider>
        </>
    );
}

export default App;
