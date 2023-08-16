import {createContext, useContext, useEffect, useState} from "react";
import LoginService from "../service/login/login";
import {getFireBaseAuth, getFireBaseDatabase} from "../service/config/firebase";

export const LoginContext = createContext();
const database = getFireBaseDatabase();
const auth = getFireBaseAuth();

const loginService = new LoginService(auth,database);
export  function LoginProvider({children}) {
    const [user, setUser] = useState();
    useEffect(() => {
        loginService.onUserStateChange((user) => {
            setUser(user);
        });
    }, []);
    return (
        <LoginContext.Provider
            value = {{user,login:loginService.loginPop,logout:loginService.logout}}
        >
            {children}
        </LoginContext.Provider>
    );
}

export function useLoginApi() {
    return useContext(LoginContext);
}

export default LoginContext;
