import React, { useContext, useEffect, useState } from 'react';
// sidebar context
import { SidebarContext } from '../contexts/SidebarContext';
// cart context
import { CartContext } from '../contexts/CartContext';
// icons
import {BsBag, BsFillTelephoneFill} from 'react-icons/bs'
// logo
import Logo from '../img/logo.png'
// link
import {Link} from 'react-router-dom'

const Header = () => {
  // header state 
  const [isActive, setIsActive] = useState(false);
  const {isOpen, setIsOpen} = useContext(SidebarContext);
  const {itemAmount} = useContext(CartContext);
  // event listener
  useEffect(() => {
   window.addEventListener('scroll', () => {
    window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
   })
  })
  return (
  <header className={`${isActive ? 'bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]'  : 'bg-none py-6' } fixed w-full z-10 transition-all duration-300`}>
    <div className='flex items-center mx-auto w-[90%]'>
  <Link to={`/`} className='mr-4'>
    <div>
    <img src={Logo} className='h-20 mr-3' alt='Zics Store Logo' />
    </div>
  </Link>
  <Link to='/shop' className='text-[20px] ml-4 bg-gradient-to-r  from-black to-mints  bg-clip-text text-transparent'>
    SHOP
  </Link>
  <Link to='/news' className='text-[20px] ml-4 bg-gradient-to-r  from-black to-mints   bg-clip-text text-transparent'>
    NEWS
  </Link>
  <Link to='/contact' className='text-[20px] ml-4 bg-gradient-to-r  from-black to-mints   bg-clip-text text-transparent'>
    CONTACT
  </Link>
  <div className='cursor-pointer flex relative ml-auto max-w-[200px] justify-center items-center'>
    <BsFillTelephoneFill className='text-1xl flex relative text-black  mr-4 items-center justify-center' />
    <p className='mr-4 bg-gradient-to-r  from-black to-mints  bg-clip-text text-transparent'>0394630804</p>
    <div className='w-[1px] h-[30px] bg-mint mr-4'>

    </div>
    <div onClick={() => setIsOpen(!isOpen)} className='flex justify-evenly items-center'>
      <BsBag  className='text-2xl flex relative text-mint mr-30' />
      <div className='bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center'>
        {itemAmount}
      </div>
    </div>
  </div>
</div>

  </header>);
};

export default Header;
