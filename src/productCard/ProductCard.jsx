import React from 'react';

function ProductCard({product:{id,image,title,category,price}}) {
    return (
        <li>
            <img src={image} alt={title}/>
            <div>
                <h3>{title}</h3>
                <p>{`${price}원`}</p>
            </div>
            <p>{category}</p>
        </li>
    );
}

export default ProductCard;