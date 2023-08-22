import React from 'react';
import {useQuery} from "@tanstack/react-query";
import DatabaseService from "../../service/database/databaseService";
import ProductCard from "../../productCard/ProductCard";

function Products(props) {
    const {isLoading, error, data: products} = useQuery(
        ['products'], () => new DatabaseService().getProducts()
        , {
            staleTime: 1000 * 60 * 5,
        }
    );

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <ul>
                {products &&
                products.map(product => <ProductCard key={product.id} product={product}/>)
                }
            </ul>
        </>
    );
}

export default Products;