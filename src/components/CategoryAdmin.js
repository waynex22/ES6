import React, { useContext} from 'react';
import { Link } from 'react-router-dom'
import { database } from '../firebase';
import { remove , ref} from 'firebase/database'
import LoadingSpinner from './PreLoad';
import { AdminContext } from '../contexts/AdminContext';
const CategoryAdmin = () => {
  const { categorys} = useContext(AdminContext)
    const handleDeleteCategory = (id) => {
      const confirmDelete = window.confirm('Are you sure you want to delete this category?  ' + id);
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
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-4xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Categorys</span> Mananger</h1>
            <div className='mb-8'>
                <Link to='/Admin/AddCategory' className="px-5 py-2.5 relative rounded group text-white font-medium inline-block">
                    <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-mint to-blue-500"></span>
                    <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-mint to-blue-500"></span>
                    <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-mint to-blue-500"></span>
                    <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-mint from-blue-500"></span>
                    <span className="relative">Add Category</span>
                </Link>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                category name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {categorys.map((category) => (
                            <tr key={category.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {category.id}
                                </th>
                                <td className="px-6 py-4">
                                    {category.name}
                                </td>
                                <td className="px-6 py-4 flex justify-between items-center mt-4">
                                    <Link to={`/Admin/editCategory/${category.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                                    <button
                                        onClick={() => handleDeleteCategory(category.key)}
                                        className='font-medium text-red-600 dark:text-blue-500 hover:underline'>
                                        Delete
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
  );
};
export default CategoryAdmin;
