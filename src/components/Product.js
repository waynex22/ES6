import React, { useContext } from 'react';
// links
import { Link } from 'react-router-dom';
//  icon
// cart context
import { CartContext } from '../contexts/CartContext';
import { Button } from 'flowbite-react';
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
      </div>
    </div>

    {/* category & title */}
    <Link to={`/product/${id}`}>
      <h2 className='font-semibold mb-1 bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent'>
        {title}
      </h2>
    </Link>
    <div className='flex justify-between items-center'>
      <div>
        <div className="text-sm capitalize bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent mb-1">
          {category}
        </div>
        <div className='font-semibold mb-1'>${price}</div>
      </div>
      <div>
        <Button
          onClick={() => addToCart(product, id)}
          className='relative inline-flex items-center justify-center p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-white'
        >
          <span className='absolute inset-0 w-full h-full bg-gradient-to-br from-blue-400 via-mint to-mint'></span>
          <span className='absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-white rounded-full opacity-30 group-hover:rotate-90 ease'></span>
          <span className='relative text-white'>Add To Cart</span>
        </Button>
      </div>
    </div>
  </div>;
};
export default Product;
