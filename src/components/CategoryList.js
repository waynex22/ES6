import React, { useContext } from 'react';
import { CategoryContext } from '../contexts/CategoryContext';
import { Link } from 'react-router-dom';

const CategoryList = () => {
  const { categorys } = useContext(CategoryContext);

  if (categorys.length === 0) {
    return <p>Loading categories...</p>;
  }

  return (
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
  );
};

export default CategoryList;
