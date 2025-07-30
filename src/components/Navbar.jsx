import React, { useContext } from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'


const Navbar = () => {
    const [visible, setVisible] = React.useState(false);
    const { getCartCount } = useContext(ShopContext);
    const cartCount = getCartCount ? getCartCount() : 0;

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <Link to="/" className="select-none">
        <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black font-serif" style={{letterSpacing:'0.04em'}}>
          Aruzz
        </span>
      </Link>


        <ul className='hidden sm:flex gap-5 text-sm  text-gray-700'>

        <NavLink to='/' className='flex flex-col items-center gap-1' >
          <p>HOME</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700  hidden' />
        </NavLink>
        <NavLink to='/collection' className='flex flex-col items-center gap-1' >
          <p>COLLECTION</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1' >
          <p>ABOUT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1' >
          <p>CONTACT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        </ul>


        <div className='flex items-center gap-5    '>

            <img src={assets.search_icon} alt="ARUZZ"  className='w-5 cursor-pointer'/>


          {/* Profile Dropdown with Login/Signup */}
          <div className='group relative'>
            <img src={assets.profile_icon} alt="Profile" className='w-5 cursor-pointer' />
            <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-20'>
              <div className='flex flex-col gap-2 w-40 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-lg'>
                {/* TODO: Replace isLoggedIn with real auth logic */}
                {false ? (
                  <>
                    <p className='cursor-pointer hover:text-black'>My Profile</p>
                    <p className='cursor-pointer hover:text-black'>Order</p>
                    <p className='cursor-pointer hover:text-black'>Logout</p>
                  </>
                ) : (
                  <>
                    <Link to="/login" className='cursor-pointer hover:text-black'>Login / Signup</Link>
                  </>
                )}
              </div>
            </div>
          </div>

           <Link to='/cart' className='relative'>
           <img src={assets.cart_icon} alt="Aruzz Cloth Store " className='w-5 min-w-5' />
          {cartCount > 0 && (
            <span className="absolute -right-1 -bottom-1 w-4 h-4 text-xs flex items-center justify-center bg-black text-white rounded-full">
              {cartCount}
            </span>
          )}
           </Link>
           <img onClick={() => setVisible(true)} src={assets.menu_icon} alt="Menu" className='w-5 cursor-pointer sm:hidden' />
        </div>

        {/*  Site Manu  */}

        {/* Mobile Menu Backdrop */}
        {visible && (
          <div
            className="fixed inset-0 bg-black/40 z-30 transition-opacity duration-300"
            onClick={() => setVisible(false)}
          />
        )}
        {/* Mobile Slide Menu */}
        <div className={`fixed top-0 right-0 h-full z-40 bg-white shadow-2xl transition-all duration-400 ease-in-out ${visible ? 'w-4/5 max-w-xs' : 'w-0'} overflow-hidden rounded-l-2xl`}> 
          <div className={`flex flex-col text-gray-700 h-full ${visible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}> 
            <div className='flex items-center gap-4 p-4 border-b'>
              <img onClick={()=>setVisible(false)} src={assets.dropdown_icon} alt="Close" className='h-5 rotate-180 cursor-pointer' />
              <p className='font-semibold'>BACK</p>
            </div>
            <NavLink to='/' className={({isActive}) => `py-3 pl-8 border-b font-medium transition-colors ${isActive ? 'text-blue-600 bg-blue-50' : ''}`} onClick={()=>setVisible(false)}>HOME</NavLink>
            <NavLink to='/collection' className={({isActive}) => `py-3 pl-8 border-b font-medium transition-colors ${isActive ? 'text-blue-600 bg-blue-50' : ''}`} onClick={()=>setVisible(false)}>COLLECTION</NavLink>
            <NavLink to='/about' className={({isActive}) => `py-3 pl-8 border-b font-medium transition-colors ${isActive ? 'text-blue-600 bg-blue-50' : ''}`} onClick={()=>setVisible(false)}>ABOUT</NavLink>
            <NavLink to='/contact' className={({isActive}) => `py-3 pl-8 border-b font-medium transition-colors ${isActive ? 'text-blue-600 bg-blue-50' : ''}`} onClick={()=>setVisible(false)}>CONTACT</NavLink>
            <div className="flex-1" />
            <div className="p-4 text-xs text-gray-400">&copy; {new Date().getFullYear()} Aruzz Cloth Store</div>
          </div>
        </div>
        
      
    </div>
  )
}
export default Navbar