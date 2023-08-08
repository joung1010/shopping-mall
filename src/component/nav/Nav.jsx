import React from 'react';
import {FaPencil} from 'react-icons/fa6'
import {BiShoppingBag} from 'react-icons/bi'
import  {useNavigate} from 'react-router-dom'
function Nav(props) {
    const navigate = useNavigate();
    const handleOnclick = (e) => {
        e.preventDefault();
        console.log(e.currentTarget.id);
        let target = e.currentTarget.id;
        let url = '';
        switch (target) {
            case 'home':
                url = '/';
                break;
            case 'products':
            case 'carts':
                url = `/${target}`;
                break;
            case 'new':
                url = `products/${target}`;
                break;
            default:
                url = `/${target}`;
        }
        navigate(url);
    };

    return (
        <nav>
            <div id='home' onClick={(e)=> {handleOnclick(e)}}>
                <BiShoppingBag/>
                <h1>My Shop</h1>
            </div>
            <ul>
                <li id='products' onClick={(e)=> handleOnclick(e)}>Products</li>
                <li id='carts' onClick={(e)=> handleOnclick(e)}>Carts</li>
                <li id='new' onClick={(e)=> handleOnclick(e)}><FaPencil/></li>
                <li>Login</li>
            </ul>

        </nav>
    );
}

export default Nav;