import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../components/Product';
import { ProductContext } from '../contexts/ProductContext';

const PriceFilter = () => {
    const [ProductFilter, setProductFilter] = useState([]);
    const { products } = useContext(ProductContext);
    const { minMaxValues } = useParams();
    const [minValue, maxValue] = minMaxValues.split(',');

    //   console.log('Min Value:', minValue);
    //   console.log('Max Value:', maxValue);
    useEffect(() => {
        const filtered = products.filter((product) => {
            const productPrice = parseFloat(product.price);
            return productPrice >= minValue && productPrice <= maxValue;
        });
        setProductFilter(filtered);
    }, [minValue, maxValue, products]);
    // console.log(ProductFilter)
   
    return (
        <div className='flex justify-center items-center'>
            <section className='py-16'>
                <div className='container mx-auto'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0'>
                        {ProductFilter.map((product) => (
                            <Product product={product} key={product.id} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
};

export default PriceFilter;
