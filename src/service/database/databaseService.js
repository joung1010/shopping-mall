import {ref, set, remove, onValue} from "firebase/database";
import {getFireBaseDatabase} from "../config/firebase";
import {v4 as uuid} from 'uuid';


class DatabaseService {
    #database;

    constructor() {
        this.#database = getFireBaseDatabase();
    }

    setProduct(product, image) {
        this.#write({
            ...product,
            price: parseInt(product.price),
            image,
            options: product.options.split(','),
        });
    }
    remove(item) {
        remove(this.#getRef(item.id));
    }

    read(callback) {
        const readValue = onValue(this.#getRef(), (snapshot => {
            const value = snapshot.val();
            value && callback(value);
        }));
        return readValue;
    }
    #write(item) {
        const id = this.#getId();
        set(this.#getRef(id), {
            ...item,
            id,
        });
    }
    #getRef(id) {
        return ref(this.#database, `/products/${id}`);
    }

    #getId() {
        return uuid();
    }

}

export default DatabaseService;