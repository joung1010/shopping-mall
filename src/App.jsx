import './App.css';
import {Outlet} from 'react-router-dom';
import Nav from "./component/nav/Nav";
import {LoginProvider} from "./context/LoginContext";
import {QueryClient, QueryClientProvider,} from '@tanstack/react-query'

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <LoginProvider>
                <Nav/>
                <Outlet/>
            </LoginProvider>
        </QueryClientProvider>
    );
}

export default App;
