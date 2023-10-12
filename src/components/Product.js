import React, { useContext } from 'react';
// links
import { Link } from 'react-router-dom';
//  icon
import PropTypes from 'prop-types';
// cart context
import { CartContext } from '../contexts/CartContext';
const Product = ({ product }) => {
  const { addToCart } = useContext(CartContext)
  // console.log(product);
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
        <button onClick={() => addToCart(product, id)} className="px-5 py-2.5 relative rounded group text-white font-medium inline-block">
        <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-mint to-blue-500"></span>
          <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-mint to-blue-500"></span>
          <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-mint to-blue-500"></span>
          <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-mint from-blue-500"></span>
          <span className="relative">Add to cart</span>
        </button>
      </div>
    </div>
  </div>;
};

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
};
export default Product;
