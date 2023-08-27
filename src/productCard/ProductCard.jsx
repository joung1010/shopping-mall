import React from 'react';
import {useNavigate} from "react-router-dom";

function ProductCard({product,product:{id,image,title,category,price}}) {
    const navigate = useNavigate();
    const handleOnClick = (e) => {
        e.preventDefault();
        navigate(`/products/${id}`, {state: {product,}});
    };
    return (
        <li onClick={handleOnClick}
            className='rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:scale-105'
        >
            <img src={image} alt={title} className='w-full'/>
            <div className='mt-2 px-2 text-lg flex justify-between items-center'>
                <h3 className='truncate'>{title}</h3>
                <p>{`${price}원`}</p>
            </div>
            <p className='mb-2 px-2 text-gray-600'>{category}</p>
        </li>
    );
}

export default ProductCard;