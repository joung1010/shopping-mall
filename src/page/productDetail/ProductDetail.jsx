import React, {useState} from 'react';
import {useLocation,} from "react-router-dom";
import Button from "../../component/ui/Button";
import useCarts from "../../hooks/useCarts";

function ProductDetail(props) {
    const {state: {product: {id, image, title, category, price, description, options}}} = useLocation();
    const [selected, setSelected] = useState(options && options[0]);
    const [success, setSuccess] = useState();
    const handleChange = (e) => {
        setSelected(e.target.value);
    };
    const {addOrUpdateCarts} = useCarts();
    const handleClick = (e) => {
        const product = {
            id,
            image,
            title,
            price,
            selected,
            quantity: 1,
        };
        addOrUpdateCarts.mutate({product}, {
            onSuccess: () => {
                setSuccess('장바구니에 추가되었습니다.');
                setTimeout(() => {
                    setSuccess(null);
                }, 3000);
            },

        });
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
                        <select className='p-2 m-3 border-2 flex-1 border-dashed border-brand outline-none'
                                onChange={handleChange} value={selected}>
                            {options &&
                            options.map((option, idx) => (<option key={idx} value={option}>{option}</option>))

                            }
                        </select>
                    </div>
                    {success && <p className='my-2'>✅{success}</p>}
                    <Button text='장바구니 추가' onClick={handleClick}/>
                </div>
            </section>

        </>
    );
}

export default ProductDetail;