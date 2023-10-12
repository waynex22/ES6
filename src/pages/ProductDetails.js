import React, { useContext } from 'react';
// import useParams
import { useParams, Link } from 'react-router-dom';
// cart context
import { CartContext } from '../contexts/CartContext';
// product context
import { ProductContext } from '../contexts/ProductContext';
const ProductDetails = () => {
  // get product id from url
  const {id} = useParams();
  // console.log(id)
  const {products} = useContext(ProductContext);
  const {addToCart} = useContext(CartContext);
  // get product based on id 
  const product = products.find(item => {
    return item.id === parseInt(id); 
  });
  // not found product
  if(!product){
    return <section className='h-screen flex justify-center items-center text-mint'>
      Loading...
    </section>
  }
  const {title , price , description , image} = product;
  return (
    <div>
  <section className='pt-32 pb-12 lg:py-32 h-screen flex items-center border-b border-mint'>
    <div className='container mx-auto'>
    <div className='flex flex-col lg:flex-row items-center'>
      <div className='flex flex-1 justify-center items-center mb-8 lg:mb-0'>
      <img className='max-w-[200px] lg:max-w-sm' src={image} />
      </div>
      <div className='flex-1 text-center  lg:text-left'>
        <h1 className='text-[26px] font-medium mb-2 max-w-[420px] mx-auto text-mint'>{title}</h1>
        <div className='text-xl text-red-500 font-semibold mb-6'>{price} $</div>
        <p className=' mb-8 text-mint opacity-70 '>{description}</p>
        <button onClick={() => addToCart(product, product.id)} className="px-5 py-2.5 relative rounded group text-white font-medium inline-block">
        <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-mint to-blue-500"></span>
          <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-mint to-blue-500"></span>
          <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-mint to-blue-500"></span>
          <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-mint from-blue-500"></span>
          <span className="relative">Add to cart</span>
        </button>
        <Link to='/shop'  className="px-5 mx-5 py-2.5 relative rounded group text-white font-medium inline-block">
        <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-mint to-blue-500"></span>
          <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-mint to-blue-500"></span>
          <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-mint to-blue-500"></span>
          <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-mint from-blue-500"></span>
          <span className="relative">Back</span>
        </Link>
      </div>
      </div>
    </div>
  </section>
  </div>
  )
};

export default ProductDetails;
