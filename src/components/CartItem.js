import React, { useContext } from 'react';
//  link
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
// icons
import {IoMdAdd, IoMdClose, IoMdRemove} from 'react-icons/io'
// cart context 
import { CartContext } from '../contexts/CartContext';
const CartItem = ({item}) => {
  const {removeFromCart , plusAmountItems, minusAmountItems } = useContext(CartContext);
  const {id , title , image , price, amount} = item;
  item.price = parseFloat(item.price);
  return (
  <div className='flex gap-x-4 py-2 lg:px-6 border-b w-full font-light text-gray-600'>
    <div className='w-full min-h-[150px] flex items-center gap-x-4'>
      <Link to={`/product/${id}`}>
        <img className='max-w-[80px]' src={image} alt='' />
      </Link>
      <div className='w-full flex flex-col'>
        <div className='flex justify-between items-center mb-2'>
          <Link to={`/product/${id}`} className='text-sm uppercase font-medium m-w-[240px] bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent hover:underline'>{title}</Link>
          <div onClick={() => removeFromCart(id)} className='text-xl cursor-pointer'>
            <IoMdClose className='text-red-600 transition' />
          </div>
        </div>
        <div className='flex gap-x-2 h-[36px] text-sm'>
          <div className='flex flex-1  max-w-[100px] justify-between items-center h-full  text-mint font-medium px-2'>
            {/* - icon*/}
            <div onClick={() =>minusAmountItems(id)} className='cursor-pointer text-red-600'>
            <IoMdRemove />
            </div>
            <div>{amount}</div>
            {/* + icons */}
            <div onClick={() => plusAmountItems(id)} className='cursor-pointer text-black'>
              <IoMdAdd />
            </div>
          </div>
          <div className='flex flex-1 items-center justify-around text-black'>${price}</div>
          <div className='flex-1 flex justify-end items-center font-medium text-black'>{`$ ${parseFloat(item.price * amount).toFixed(2)}`}</div>
        </div>
      </div>
    </div>
  </div>
  
)};
CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired,
  }).isRequired,
};

export default CartItem;
