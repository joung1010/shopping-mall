import React from 'react';
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {useQuery} from "@tanstack/react-query";
import DatabaseService from "../../service/database/databaseService";
import {useLoginApi} from "../../context/LoginContext";

function CartsStatus(props) {
    const {uid} = useLoginApi();
    const {data:products} = useQuery(['carts'],()=>new DatabaseService().getCarts(uid), {
        staleTime: 1000 * 60 * 5,
    });
    const hasProducts = Object.keys(products).length > 0;
    return (
        <div className='relative'>
            <AiOutlineShoppingCart className='text-4xl'/>
            {hasProducts && <p className='w-6 h-6 text-center bg-brand text-white font-bold rounded-full absolute -top-1 -right-2'>{products.length}</p>}
        </div>
    );
}

export default CartsStatus;