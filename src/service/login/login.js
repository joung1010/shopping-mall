import {GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged} from "firebase/auth";
import {ref, child, get} from "firebase/database";

export default class LoginService {
    constructor(auth, database) {
        this.auth = auth;
        this.database = database;
    }

    loginPop =  () => {
        const provider = this.#getProvider();
        provider.setCustomParameters({
            prompt: 'select_account'
        });
        signInWithPopup(this.auth,provider ).catch(console.error);

    }
    logout = () => {
        signOut(this.auth).catch(console.error);
    }

    onUserStateChange(callback) {
        onAuthStateChanged(this.auth, async (user) => {
            const updatedUser = user ? await this.#checkAdmin(user) : null;
            callback && callback(updatedUser);
        });
    }


    async #checkAdmin(user) {
        return await get(child(ref(this.database), 'admins'))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const admins = snapshot.val();
                    return {...user, isAdmin: admins.includes(user.uid)};
                }
                return user;
            }).catch((error) => {
            console.error(error);
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