import React, {useEffect, useState} from 'react';
import {FaPencil} from 'react-icons/fa6'
import {BiShoppingBag} from 'react-icons/bi'
import {Link} from 'react-router-dom'
import {useLoginApi} from "../../context/LoginContext";
import User from "../user/User";
import Button from "../ui/Button";


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
                {user && user.isAdmin && <Link to='/products/new' className='text-2xl'><FaPencil/></Link>}
                {user && <User user={user}/>}
                {!user && <Button text='Login' onClick={loginService.loginPop}/>}
                {user && <Button text='Logout' onClick={loginService.logout}/>}
            </nav>

        </header>
    );
}

export default Nav;