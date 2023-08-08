import React from 'react';
import {FaPencil} from 'react-icons/fa6'
import {BiShoppingBag} from 'react-icons/bi'
import  {Link} from 'react-router-dom'
function Nav(props) {

    return (
        <header>
            <Link to='/'>
                <BiShoppingBag/>
                <h1>My Shop</h1>
            </Link>
            <nav>
                <Link to='/products'>Products</Link>
                <Link to='/carts'>Carts</Link>
                <Link to='/products/new'><FaPencil/></Link>
                <button>Login</button>
            </nav>

        </header>
    );
}

export default Nav;