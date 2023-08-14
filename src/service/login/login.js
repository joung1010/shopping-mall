import { getAuth,GoogleAuthProvider,signInWithPopup,signOut } from "firebase/auth";
export default class LoginService {
    constructor(app) {
        this.auth = getAuth(app);
    }
    async loginPop() {
        return signInWithPopup(this.auth, this.#getProvider());
    }

    getUserToken(result) {
        return this.#getCredential(result).accessToken;
    }

    async logOut() {
        return signOut(this.auth).then(() => null);
    }

    #getCredential(result) {
        return GoogleAuthProvider.credentialFromResult(result);
    }
    #getProvider() {
        return new GoogleAuthProvider();
    }
};