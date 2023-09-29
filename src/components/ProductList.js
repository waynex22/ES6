import React, { useContext } from 'react';
import { ProductContext } from '../contexts/ProductContext';
import Product from './Product';

const ProductList = () => {
  const { products } = useContext(ProductContext);
  return (
    <div className='flex justify-center items-center'>
      <section className='py-16'>
        <div className='container mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0'>
            {products.map((products) => {
              return <Product product={products} key={products.id} />;
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductList;
