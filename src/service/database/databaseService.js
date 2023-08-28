import {ref, set, remove, onValue, get} from "firebase/database";
import {getFireBaseDatabase} from "../config/firebase";
import {v4 as uuid} from 'uuid';


class DatabaseService {
    #database;

    constructor() {
        this.#database = getFireBaseDatabase();
    }

    async setProduct(product, image) {
        const id = this.#getId();
        const productRef = this.#getRef(`/products/${id}`);
        return this.#write(productRef,{
            ...product,
            price: parseInt(product.price),
            image,
            options: product.options.split(','),
            id,
        });
    }

    async getProducts() {
        const productRef = this.#getRef('/products');
        return this.#read(productRef)
            .then(product => {
                if(!product) return [];
                return product;
            });
    }

    async addOrUpdateCart(userId,product) {
        return this.#write(
            this.#getRef(`/carts/${userId}/${product.id}`)
            , product
        )
    }

    async getCarts(userId) {
        return this.#read(this.#getRef(`/carts/${userId}`))
            .then((carts)=> {
                if(!carts) return {};
                return carts;
            });
    }

    async removeCart(userId,productId) {
        return this.#remove(this.#getRef(`carts/${userId}/${productId}`));
    }


    #remove(ref) {
       return remove(ref);
    }

    #read(ref) {
       return get(ref)
           .then(snapshot => {
           if(snapshot.exists()) return Object.values(snapshot.val());
               return null;
       });
    }

    #write(ref,item) {

        set(ref, {
            ...item,
        });
    }

    #getRef(url) {
        return ref(this.#database, url);
    }

    #getId() {
        return uuid();
    }

}

export default DatabaseService;