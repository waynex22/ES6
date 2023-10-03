import React, { useContext } from 'react';
import { CategoryContext } from '../contexts/CategoryContext';
import { Link } from 'react-router-dom';
import { Button } from 'flowbite-react';

const CategoryList = () => {
  const { categorys } = useContext(CategoryContext);

  if (categorys.length === 0) {
    return <p>Loading categories...</p>;
  }
  return (
    <div className=''>
      <div>
        <h2 className='text-xl font-semibold mb-4 uppercase bg-gradient-to-r  from-mints to-white  bg-clip-text text-transparent'>Filter by price</h2>
      </div>
      <div>
      </div>
      <input id="default-range" type="range" value="1" class="w-[300px] h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
      <div className='w-[300px] flex justify-between items-center'>
  <Button className='text-mint border border-md border-mint mt-4'>Filter</Button>
  <div className='mt-4 flex justify-center items-center mx-auto'>
    <div>
      <p className='text-md font-light text-gray-500'>Price : </p>
    </div>
    <div className='ml-2 font-semibold text-md text-mint flex justify-center items-center'>
      <span>$14</span>
      <div className='w-4 h-[2px] bg-mint mx-2 hidden md:block'></div>
      <span>$200</span>
    </div>
  </div>
</div>
      <div className='p-4 rounded-lg'>
        <h2 className='text-xl font-semibold mb-4 uppercase bg-gradient-to-r  from-mints to-white  bg-clip-text text-transparent'>categories</h2>
        <ul>
          {categorys.map((category) => (
            <li key={category.id} className='mb-2'>
              <Link to={`/shop/${category.name}`} className='hover:underline  bg-gradient-to-r  from-mints to-blue-500 bg-clip-text text-transparent'>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryList;
