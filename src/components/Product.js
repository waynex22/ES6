import React, { useContext } from 'react';
// links
import { Link } from 'react-router-dom';
//  icon
import { BsPlus, BsEyeFill } from 'react-icons/bs'
// cart context
import { CartContext } from '../contexts/CartContext';
const Product = ({ product }) => {
  const { addToCart } = useContext(CartContext)
  // console.log(product);
  // destructure product
  const { id, image, category, title, price } = product;
  return <div>
    <div className='border border-[#82B3C2] shadow-md rounded-md h-[300px] mb-4 relative overflow-hidden group transition'>
      <div className='w-full h-full flex justify-center items-center'>
        {/* image container */}
        <div className='w-[490px] h-[490px] mx-auto overflow-hidden flex items-center justify-center'>
          <img
            className='max-w-full max-h-full group-hover:scale-110 transition duration-300'
            src={image}
            alt=''
          />
        </div>
      </div>
      {/* button */}
      <div className='absolute top-6 -right-11 group-hover:right-5 p-2 flex flex-col justify-center items-center grap-y-2 opacity-0 group-hover:opacity-100 transation-all duration-300'>
        <button onClick={() => addToCart(product, id)}>
          <div className='flex justify-center items-center text-white w-12 h-12 bg-mint'>
            <BsPlus className='text-3xl' />
          </div>
        </button>
        <Link to={`/product/${id}`} className='w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl' >
          <BsEyeFill />
        </Link>
      </div>
    </div>
    {/* category & title */}

    <div>
      <div className="test-sm capitalize bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent mb-1  ">{category}</div>
      <Link to={`product/${id}`}>
        <h2 className='font-semibold mb-1 bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent'>{title}</h2>
      </Link>
      <div className='font-semibold mb-1'>${price}</div>
    </div>
  </div>;
};

export default Product;
