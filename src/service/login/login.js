import { getAuth,GoogleAuthProvider,signInWithPopup,signOut,onAuthStateChanged  } from "firebase/auth";
export default class LoginService {
    constructor(app) {
        this.auth = getAuth(app);
    }
    async loginPop() {
        return signInWithPopup(this.auth, this.#getProvider());
    }
    async logout() {
        return signOut(this.auth).then(() => null);
    }

    onUserStateChange(callback) {
        onAuthStateChanged(this.auth, (user) => {
            callback && callback(user);
        });
    }

    getUserToken(result) {
        return this.#getCredential(result).accessToken;
    }
    #getCredential(result) {
        return GoogleAuthProvider.credentialFromResult(result);
    }
    #getProvider() {
        return new GoogleAuthProvider();
    }
};