import React, {useState , useEffect , useContext} from 'react';
import { Link } from 'react-router-dom'
import { database } from '../firebase';
import { remove , ref} from 'firebase/database'
import LoadingSpinner from './PreLoad';
import { AdminContext } from '../contexts/AdminContext';
const CategoryAdmin = () => {
  const { categorys} = useContext(AdminContext)
    const handleDeleteCategory = (id) => {
      const confirmDelete = window.confirm('Are you sure you want to delete this product?  ' + id);
      if (confirmDelete) {
          const categoryRef = ref(database, `categorys/` + id );
          remove(categoryRef)
            .then(() => {
              console.log('category deleted successfully', categoryRef);
            })
            .catch((error) => {
              console.error('Error deleting category:', error);
            });
        } else {
          console.error('category not found');
        }
    };
    if(categorys.length === 0){
      return <div className='flex justify-center items-center mx-auto'>
        <LoadingSpinner />
      </div>
    }
  return (
    <div className='container mx-auto py-8'>
      <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-4xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Categories</span> Mananger</h1>

      <div className='mb-8'>
                <Link to='/AddCategory' className='bg-mint hover:bg-mints text-white font-semibold py-2 px-6 rounded-full shadow-md'>
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
                            <Link to={`/categoryUpdate/${category.id}`} className='bg-yellow-500 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded-full mr-2 shadow-md'>
                                    Edit
                                </Link>
                                <button
                                onClick={() => handleDeleteCategory(category.key)}
                                className='bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full shadow-md'
                            >
                                Delete
                            </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    
  );
};
export default CategoryAdmin;
