import {createContext, useContext} from "react";
import LoginService from "../service/login/login";
import {getInitApp} from "../service/config/firebase";

export const LoginContext = createContext();
const loginService = new LoginService(getInitApp());

export  function LoginProvider({children}) {
    return (
        <LoginContext.Provider
            value = {loginService}
        >
            {children}
        </LoginContext.Provider>
    );
}

export function useLoginApi() {
    return useContext(LoginContext);
}

export default LoginContext;
