import React, { useContext } from 'react';
// link
import { Link } from 'react-router-dom';
import { IoMdArrowForward } from 'react-icons/io'
import { FiTrash2 } from 'react-icons/fi'

// component
import CartItem from './CartItem'
// sidebar context 
import {SidebarContext} from '../contexts/SidebarContext'
// cart context
import { CartContext } from '../contexts/CartContext';

const Sidebar = () => {
  const {cart , deleteAllCart, total, itemAmount} = useContext(CartContext);
  const {isOpen , handleClose} = useContext(SidebarContext)
  return <div className={`${isOpen ? 'right-0' : '-right-full'} w-full z-20 bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] xl:max-w-[30vw] transition-all duration-300
  z-20px px-4 lf:px-[35vw]`}>
  <div className='flex justify-between py-6 border-b'>
    <div className='uppercase text-sm font-semibold bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent'>My bag ({itemAmount})</div>
    <div onClick={handleClose} className='cursor-pointer w-8 h-8 flex justify-center items-center'>
      <IoMdArrowForward className='text-2xl text-mint' />
    </div>
  </div>
  <div className='flex flex-col gap-y-2 h-[520px] lg:h-[940px] overflow-y-auto overflow-x-hidden'>{cart.map(item => {
    return <CartItem item={item} key={item.id} />
  })}
  </div>
  <div className='flex flex-col gap-y-4 py-4 mt-auto'> {/* Use mt-auto to push the content to the bottom */}
  <div className='flex justify-between items-center h-[50px]'>
    {/* total */}
    <div className='uppercase font-semibold text-mint'>
      <span className='bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent'>Total : {parseFloat(total).toFixed(2)} $</span>
    </div>
    {/* remove all items */}
    <div onClick={deleteAllCart}  className='cursor-pointer bg-red-600 h-[50px] w-[50px] flex justify-center items-center text-2xl rounded-md'>
      <FiTrash2 className='text-white' />
    </div>
  </div>
  <Link to='/Checkout' onClick={handleClose} className='bg-mint flex p-4 justify-center items-center text-primary w-full font-medium rounded-md'>
    <span className='bg-gradient-to-l from-white to-black bg-clip-text text-transparent'>CheckOut</span>
  </Link>
</div>
</div>

};

export default Sidebar;
