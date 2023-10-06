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
        <button onClick={() => addToCart(product, product.id)} className='bg-mint py-4 px-8 text-white rounded-md '>Add to cart</button>
        <Link to="/shop" className="bg-mint ml-5 hover:bg-mints py-4 px-8 text-white rounded-md">
        Back
      </Link>
      </div>
      </div>
    </div>
  </section>
  </div>
  )
};

export default ProductDetails;
