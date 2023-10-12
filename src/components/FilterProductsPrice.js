import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import { ProductContext } from '../contexts/ProductContext';
const FilterProductsPrice = () => {
  const { products } = useContext(ProductContext)
  const [minValue, setMinValue] = useState(50);
  const [maxValue, setMaxValue] = useState(100);
  const priceArray = products.map((product) => {
    return product.price
  })
  const arrayOfArrays = priceArray.map((str) => {
    const [firstNumber, secondNumber] = str.split(',').map(Number);
    return [firstNumber, secondNumber];
  });
  let minValues = [Infinity, Infinity];
  let maxValues = [-Infinity, -Infinity];
  arrayOfArrays.forEach(([num1, num2]) => {
    minValues[0] = Math.min(minValues[0], num1);
    minValues[1] = Math.min(minValues[1], num2);
    maxValues[0] = Math.max(maxValues[0], num1);
    maxValues[1] = Math.max(maxValues[1], num2);
  });
  const handleRangeChange = ([min, max]) => {
    setMinValue(min);
    setMaxValue(max);
  };
  return (
    <div className=''>
      <div>
        <h2 className='text-xl font-semibold mb-4 uppercase bg-gradient-to-r  from-mints to-white  bg-clip-text text-transparent'>Filter by price</h2>
      </div>
      <div>
      </div>
      <div className="flex flex-col items-center max-w-[250px] min-w-[120px]">
        <Slider
          range
          min={parseFloat(minValues)}
          max={parseFloat(maxValues)}
          value={[minValue, maxValue]}
          onChange={handleRangeChange}
          className="w-[250px] mt-4"
        />
        <div className="w-[300px] flex justify-between items-center mt-4">
          <div className="font-semibold text-md text-mint flex justify-center items-center">
            <span>{minValue.toFixed(2)} $</span>
          </div>
          <div className="font-semibold text-md text-mint flex justify-center items-center">
            <span>{maxValue.toFixed(2)} $</span>
          </div>
        </div>
        <Link
          to={`/shop/filterPrice/${minValue},${maxValue}`}
          type='submit'
          className='relative mt-5  p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-white'>
          <span className='absolute inset-0 w-full h-full bg-gradient-to-br from-blue-400 via-mint to-mint'></span>
          <span className='absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-white rounded-full opacity-30 group-hover:rotate-90 ease'></span>
          <span className='relative text-white'>Filter</span>
        </Link>
      </div>
      
    </div>
  );
};

export default FilterProductsPrice;
