import {ref, set, remove, onValue, get} from "firebase/database";
import {getFireBaseDatabase} from "../config/firebase";
import {v4 as uuid} from 'uuid';


class DatabaseService {
    #database;

    constructor() {
        this.#database = getFireBaseDatabase();
    }

    async setProduct(product, image) {
        return this.#write({
            ...product,
            price: parseInt(product.price),
            image,
            options: product.options.split(','),
        });
    }

    async getProducts() {
        return this.#read(this.#getRef());
    }


    remove(item) {
        remove(this.#getRef(item.id));
    }

    #read(ref) {
       return get(ref)
           .then(snapshot => {
           if(snapshot.exists()) return Object.values(snapshot.val());
               return [];
       });
    }

    #write(item) {
        const id = this.#getId();
        set(this.#getRef(id), {
            ...item,
            id,
        });
    }

    #getRef(id) {
        return ref(this.#database, id ? `/products/${id}` : `/products`);
    }

    #getId() {
        return uuid();
    }

}

export default DatabaseService;