import { getAuth,GoogleAuthProvider,signInWithPopup } from "firebase/auth";
export default class LoginService {
    constructor(app) {
        this.auth = getAuth(app);
    }
    loginPop() {
        return signInWithPopup(this.auth, this.#getProvider());
    }

    getUserToken(result) {
        return this.#getCredential(result).accessToken;
    }

    logOut() {

    }

    #getCredential(result) {
        return GoogleAuthProvider.credentialFromResult(result);
    }
    #getProvider() {
        return new GoogleAuthProvider();
    }
};