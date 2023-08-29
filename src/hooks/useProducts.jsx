import {useMutation, useQueryClient,useQuery} from "@tanstack/react-query";
import DatabaseService from "../service/database/databaseService";

const dbService = new DatabaseService();

export  default function useProducts() {
    const queryClient = useQueryClient();

    const productsQuery = useQuery(
        ['products'], () => dbService.getProducts()
        , {
            staleTime: 1000 * 60 * 1,
        }
    );

    const addProduct =  useMutation(
        {
            mutationFn: ({products, url}) => dbService.setProduct(products, url),
            onSuccess: () => queryClient.invalidateQueries(['products']),/*기본적인 해동을 정의*/
        });
    return {productsQuery, addProduct};
}