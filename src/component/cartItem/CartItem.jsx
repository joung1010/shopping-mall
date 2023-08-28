import React from 'react';
import {AiOutlineMinusSquare, AiOutlinePlusSquare} from "react-icons/ai";
import {RiDeleteBin5Fill} from "react-icons/ri";
import DatabaseService from "../../service/database/databaseService";


function CartItem({uid,product,product:{id,image,title,quantity,selected,price}}) {
    const handleMinus = () => {
        if(quantity < 2) return;
        new DatabaseService().addOrUpdateCart(uid, {...product, quantity: quantity - 1});
    };
    const handleDelete = () => new DatabaseService().removeCart(uid, id);
    const handlePlus = () => new DatabaseService().addOrUpdateCart(uid, {...product, quantity: quantity + 1});
    return (
        <li>
            <img src={image} alt={title}/>
            <div>
                <p>{title}</p>
                <p>{selected}</p>
                <div>
                    <AiOutlineMinusSquare onClick={handleMinus}/>
                    <span>{quantity}</span>
                    <AiOutlinePlusSquare onClick={handlePlus}/>
                    <RiDeleteBin5Fill onClick={handleDelete}/>
                </div>
            </div>
        </li>
    );
}

export default CartItem;