import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query"
import DatabaseService from "../service/database/databaseService";
import {useLoginApi} from "../context/LoginContext";

export default function useCarts() {
    const queryClient = useQueryClient();
    const database = new DatabaseService();
    const {uid} = useLoginApi();

    const cartsQuery = useQuery(['carts',uid || ''], () => database.getCarts(uid), {
        enabled:!!uid,
        staleTime: 1000 * 60 ,
    });
    const addOrUpdateCarts = useMutation({
        mutationFn: (product) => database.addOrUpdateCart(uid,product),
        onSuccess: () => queryClient.invalidateQueries(['carts',uid]),
    });
    const removeCarts = useMutation({
        mutationFn: (id) => database.removeCart(uid,id),
        onSuccess: () => queryClient.invalidateQueries(['carts',uid]),
    });
    return {cartsQuery,addOrUpdateCarts,removeCarts}
};