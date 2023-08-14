import {createContext, useContext} from "react";
import LoginService from "../service/login/login";
import {getFireBaseAuth, getFireBaseDatabase} from "../service/config/firebase";

export const LoginContext = createContext();
const database = getFireBaseDatabase();
const auth = getFireBaseAuth();

const loginService = new LoginService(auth,database);
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
