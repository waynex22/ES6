import React, { useContext } from 'react';
import { CategoryContext } from '../contexts/CategoryContext';
import { Link } from 'react-router-dom';
const CategoryList = () => {
  const { categorys } = useContext(CategoryContext);

  return (
    <div className='p-4 rounded-lg'>
      <h2 className='text-xl font-semibold mb-4 uppercase bg-gradient-to-r  from-mints to-white  bg-clip-text text-transparent'>categories</h2>
      <ul className='w-48 text-md font-medium  bg-white   '>
        {categorys.map((category) => (
          <li key={category.name} className='mb-2'>
            <Link to={`/shop/${category.name}`} className='relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-mint to-blue-200 group-hover:from-mints group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-mint'>
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                {category.name}
              </span>
            </Link>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
