import React, {useState} from 'react';
import {useLocation, } from "react-router-dom";
import Button from "../../component/ui/Button";

function ProductDetail(props) {
    const {state:{product:{image,title,category,price,description,options}}} =useLocation();
    const [selected, setSelected] = useState(options && options[0]);
    const handleChange = (e) => {
        setSelected(e.target.value);
    };
    const handleClick = (e) => {

    };
    return (
        <>
            <p className='mx-12 mt-4 text-gray-700'>{category}</p>
            <section className='flex flex-col md:flex-row p-4'>
                <img className='w-full px-4 basis-7/12' src={image} alt={title}/>
                <div className='w-full basis-5/12 flex flex-col p-4'>
                    <h2 className='text-3xl font-bold py-2'>{title}</h2>
                    <p className='text-2xl font-bold py-2 border-b border-gray-400'>${price}</p>
                    <p className='py-4 text-lg'>{description}</p>
                   <div className='flex items-center mb-2'>
                       <label className='text-brand font-bold' htmlFor='select'>옵션:</label>
                       <select className='p-2 m-3 border-2 flex-1 border-dashed border-brand outline-none' onChange={handleChange} value={selected}>
                           {options &&
                           options.map((option,idx) => (<option key={idx} value={option}>{option}</option>))

                           }
                       </select>
                   </div>
                    <Button text='장바구니 추가' onClick={handleClick}/>
                </div>
            </section>

        </>
    );
}

export default ProductDetail;