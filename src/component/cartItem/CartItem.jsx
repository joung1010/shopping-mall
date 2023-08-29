import React from 'react';
import {AiOutlineMinusSquare, AiOutlinePlusSquare} from "react-icons/ai";
import {RiDeleteBin5Fill} from "react-icons/ri";
import useCarts from "../../hooks/useCarts";

const ICON_CLASS = 'transition-all cursor-pointer hover:text-brand hover:scale-105 mx-1';

function CartItem({product, product: {id, image, title, quantity, selected, price}}) {
    const {addOrUpdateCarts, removeCarts} = useCarts();
    const handleMinus = () => {
        if (quantity < 2) return;
        addOrUpdateCarts.mutate({...product, quantity: quantity - 1});
    };
    const handleDelete = () => removeCarts.mutate(id);
    const handlePlus = () => addOrUpdateCarts.mutate({ ...product, quantity: quantity + 1});
    return (
        <li className='flex justify-between my-2 items-center'>
            <img className='w-24 md:w-48 rounded-lg mx-4' src={image} alt={title}/>
            <div className='flex-1 flex justify-between'>
                <div className='basis-3/5'>
                    <p className='text-lg'>{title}</p>
                    <p className='text-xl font-bold text-brand'>{selected}</p>
                    <p>₩{price}</p>
                </div>
                <div className='text-2xl flex items-center'>
                    <AiOutlineMinusSquare className={ICON_CLASS} onClick={handleMinus}/>
                    <span>{quantity}</span>
                    <AiOutlinePlusSquare className={ICON_CLASS} onClick={handlePlus}/>
                    <RiDeleteBin5Fill className={ICON_CLASS} onClick={handleDelete}/>
                </div>
            </div>
        </li>
    );
}

export default CartItem;