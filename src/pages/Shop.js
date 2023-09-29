import React from 'react';
import CategoryList from '../components/CategoryList';
import ProductList from '../components/ProductList';

const Shop = () => {
  return (
    <div className='flex flex-row lg:flex-row justify-center w-[90%] h-[auto] mx-auto mt-20'>
      <div className='w-full lg:w-[20%] h-[auto] lg:h-[500px] mt-4 py-12 lg:mr-4'>
        <p className='uppercase bg-gradient-to-r from-mint to-blue-400 bg-clip-text text-transparent mb-4'>
          Home / shop
        </p>
        <CategoryList />
      </div>
      <div className='w-full lg:w-[80%]'>
        <ProductList />
      </div>
    </div>
  );
};

export default Shop;
