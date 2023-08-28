import React from 'react';
import {useQuery} from "@tanstack/react-query";
import DatabaseService from "../../service/database/databaseService";
import {useLoginApi} from "../../context/LoginContext";
import CartItem from "../../component/cartItem/CartItem";
import Price from "../../component/price/Price";
import {BsFillPlusCircleFill} from "react-icons/bs";
import {FaEquals} from "react-icons/fa";
import Button from "../../component/ui/Button";

const SHIPPING = 3000;

function Carts(props) {
    const {uid} = useLoginApi();
    const {isLoading, data: products} = useQuery(['carts'], () => new DatabaseService().getCarts(uid), {
        staleTime: 1000 * 60 * 5,
    });
    const hasProducts = products && products.length > 0;
    const totalPrice = hasProducts && products.reduce((pre, acc) => pre + parseInt(acc.price) * acc.quantity, 0);


    return (
        <section className='p-8 flex-col'>
            {isLoading && <p>Loading...</p>}
            <p className='text-2xl text-center font-bold pb-4 border-b border-gray-300'>내 장바구니</p>
            {!hasProducts && <p>등록된 물품이 없습니다.</p>}
            {hasProducts && <>
                <ul className='border-b border-gray-300 mb-8 p-4'>
                    {products &&
                    products.map(product => (<CartItem key={product.id} product={product} uid={uid}/>))
                    }
                </ul>
            </>}
            <div className='flex justify-between mb-4 items-center p-2 md:px-8 lg:px-16'>
                <Price text='상품 총액' price={totalPrice}/>
                <BsFillPlusCircleFill className='shrink-0'/>
                <Price text='배송액' price={SHIPPING}/>
                <FaEquals className='shrink-0'/>
                <Price text='총가격' price={SHIPPING + totalPrice}/>
            </div>
            <Button text='주문하기'/>
        </section>
    );
}

export default Carts;