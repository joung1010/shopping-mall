import React, {useEffect, useState} from 'react';
import {FaPencil} from 'react-icons/fa6'
import {BiShoppingBag} from 'react-icons/bi'
import {Link} from 'react-router-dom'
import {useLoginApi} from "../../context/LoginContext";
import User from "../User";


function Nav(props) {
    const [user, setUser] = useState();
    const loginService = useLoginApi();
    useEffect(() => {
        loginService.onUserStateChange((user) => {
            setUser(user);
        });
    }, []);

    return (
        <header className='flex justify-between border-b border-gray-300 p-2'>
            <Link className='flex items-center text-4xl text-brand' to='/'>
                <BiShoppingBag/>
                <h1>My Shop</h1>
            </Link>
            <nav className='flex items-center gap-4 font-semibold'>
                <Link to='/products'>Products</Link>
                <Link to='/carts'>Carts</Link>
                <Link to='/products/new' className='text-2xl'><FaPencil/></Link>
                {user && <User user={user}/>}
                {!user && <button onClick={loginService.loginPop}>Login</button>}
                {user && <button onClick={loginService.logout}>Logout</button>}
            </nav>

        </header>
    );
}

export default Nav;