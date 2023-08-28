import React from 'react';
import {useQuery} from "@tanstack/react-query";
import DatabaseService from "../../service/database/databaseService";
import {useLoginApi} from "../../context/LoginContext";
import CartItem from "../../component/cartItem/CartItem";
import Price from "../../component/price/Price";
import {BsFillPlusCircleFill} from "react-icons/bs";
import {FaEquals} from "react-icons/fa";

const SHIPPING = 3000;

function Carts(props) {
    const {uid} = useLoginApi();
    const {isLoading, data: products} = useQuery(['carts'], () => new DatabaseService().getCarts(uid), {
        staleTime: 1000 * 60 * 5,
    });
    const hasProducts = products && products.length > 0;
    const totalPrice = hasProducts && products.reduce((pre, acc) => pre + parseInt(acc.price) + acc.quantity, 0);


    return (
        <section>
            {isLoading && <p>Loading...</p>}
            <p>내 장바구니</p>
            {!hasProducts && <p>등록된 물품이 없습니다.</p>}
            {hasProducts && <>
                <ul>
                    {products &&
                    products.map(product => (<CartItem key={product.id} product={product} uid={uid}/>))
                    }
                </ul>
            </>}
            <div>
                <Price text='상품 총액' price={totalPrice}/>
                <BsFillPlusCircleFill/>
                <Price text='배송액' price={SHIPPING}/>
                <FaEquals/>
                <Price text='총가격' price={SHIPPING + totalPrice}/>
            </div>
        </section>
    );
}

export default Carts;