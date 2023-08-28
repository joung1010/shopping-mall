import {FaPencil} from 'react-icons/fa6'
import {BiShoppingBag} from 'react-icons/bi'
import {Link} from 'react-router-dom'
import {useLoginApi} from "../../context/LoginContext";
import User from "../user/User";
import Button from "../ui/Button";
import CartsStatus from "../carts/CartsStatus";


function Nav(props) {
    const {user,login,logout} = useLoginApi();

    return (
        <header className='flex justify-between border-b border-gray-300 p-2'>
            <Link className='flex items-center text-4xl text-brand' to='/'>
                <BiShoppingBag/>
                <h1>My Shop</h1>
            </Link>
            <nav className='flex items-center gap-4 font-semibold'>
                <Link to='/products'>Products</Link>
                {user && <Link to='/carts'><CartsStatus/></Link>}
                {user && user.isAdmin && <Link to='/products/new' className='text-2xl'><FaPencil/></Link>}
                {user && <User user={user}/>}
                {!user && <Button text='Login' onClick={login}/>}
                {user && <Button text='Logout' onClick={logout}/>}
            </nav>

        </header>
    );
}

export default Nav;