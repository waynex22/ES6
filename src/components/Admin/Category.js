import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom'

import {CategoryContext} from '../../contexts/CategoryContext';

const Category = () => {
  const { categorys } = useContext(CategoryContext);
  return (
    <div className='container mx-auto py-8'>
      <div className='mb-8'>
                <Link to='/admin/addcategory' className='bg-mint hover:bg-mints text-white font-semibold py-2 px-6 rounded-full shadow-md'>
                    Add New Category
                </Link>
                </div>
            <table className='min-w-full bg-white rounded-lg shadow-md overflow-hidden text-center'>
                <thead className='bg-mint text-white'>
                    <tr>
                        <th className='px-1 py-2'>Id</th>
                        <th className='px-6 py-4'>Name</th>
                        <th className='px-6 py-4'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categorys.map((category) => (
                        <tr key={category.id} className='hover:cursor-auto'>
                            <td className='border px-2 py-4'>{category.id}</td>
                            <td className='border px-6 py-4'>{category.name}</td>  
                            <td className='border px-6 py-4'>
                                <Link to={`/admin/editCategory`} className='bg-yellow-500 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded-full mr-2 shadow-md'>
                                    Edit
                                </Link>
                                <Link to={`/admin/deleteCategory/`} className='bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full shadow-md'>
                                    Delete
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    
  );
};
export default Category;
