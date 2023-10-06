import React, { useContext, useState } from 'react';
import { ProductContext } from '../contexts/ProductContext';
import { CategoryContext } from '../contexts/CategoryContext';

import Product from './Product';
const FilterProducts = () => {
    const { products } = useContext(ProductContext);
    const { categorys } = useContext(CategoryContext);
    const [selectedCategory, setSelectedCategory] = useState('');
    const filteredProducts = selectedCategory
        ? products.filter((item) => item.category === selectedCategory)
        : products;

    return (
        <div className='flex justify-center items-center'>
            <section className='py-16'>
                <div className='container mx-auto'>
                    <div className='mb-4'>
                        <label htmlFor='categorySelect' className='mr-2 uppercase bg-gradient-to-r  from-mints to-blue-600  bg-clip-text text-transparent'>
                            Select a Category :
                        </label>
                        <select
                            id='categorySelect'
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            value={selectedCategory}
                        >
                            <option value='' className=''>All Categories</option>
                            {categorys.map((category) => (
                                <option value={category.name} key={category.id} className=''>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0'>
                        {filteredProducts.map((product) => (
                            <Product product={product} key={product.id} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FilterProducts;