import React , {useContext} from 'react';
//  import product context
import {ProductContext} from '../contexts/ProductContext';
// import components  products
import Product from '../components/Product';
// Hero
import Hero from '../components/Hero';
// slider
import Slider from '../components/Slider';

const Home = () => {
  // get productCOntext
  const {products} = useContext(ProductContext);
  // console.log(products);
  // const filteredProducts = products.filter(item => {
  //   return (
  //     item.category === 'Balo' || item.category === 'Shoese'
  //     );  
  // })
  return <div>
    <Hero />
    <Slider />
    <div className='mx-auto flex justify-center items-center p-2'>
    <p
  className='bg-gradient-to-r text-[50px] from-mint to-blue-400 bg-clip-text text-transparent font-semibold border-b-2 border-mint'>
  BEST SALE
</p>
</div>
    <section className='py-16'>
      <div className='container mx-auto' >
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0 '>
          {products.map(product => {
            return <Product product = {product} key={product.id} />;
          })}
        </div>
      </div>
    </section>
    <div className='mx-auto flex justify-center items-center p-2'>
    <p
  class='text-[50px] bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent font-semibold border-b-2 border-mint'>
  Awesome Feedback
</p>
</div>
<section className='py-16'>
      <div className='container mx-auto' >
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0'>
          {products.map(product => {
            return <Product product = {product} key={product.id} />;
          })}
        </div>
      </div>
    </section>
  </div>;
};

export default Home;
