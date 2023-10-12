import { useContext} from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { ref, remove } from 'firebase/database';
import { database } from '../firebase';
import 'firebase/database';
import LoadingSpinner from '../components/PreLoad';
import { AdminContext } from '../contexts/AdminContext';

const ProductAdmin = () => {
    const { products } = useContext(AdminContext)
    const handleDeleteProduct = (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this product?  ' + id);
        if (confirmDelete) {
            const productRef = ref(database, `products/` + id);
            remove(productRef)
                .then(() => {
                    console.log('Product deleted successfully', productRef);
                })
                .catch((error) => {
                    console.error('Error deleting product:', error);
                });
        } else {
            console.error('Product not found');
        }
    };
    if (products.length === 0) {
        return <div className='flex justify-center items-center mx-auto'>
            <LoadingSpinner />
        </div>
    }
    return (
        <div className='container mx-auto py-8'>
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-4xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Products</span> Mananger</h1>
            <div className='mb-8'>
                <Link to='/Admin/Addproduct' className="px-5 py-2.5 relative rounded group text-white font-medium inline-block">
                    <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-mint to-blue-500"></span>
                    <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-mint to-blue-500"></span>
                    <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-mint to-blue-500"></span>
                    <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-mint from-blue-500"></span>
                    <span className="relative">Add Product</span>
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
                                Product name
                            </th>
                            <th scope="col" className="px-2 py-3">
                                image
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {product.id}
                                </th>
                                <td className="px-6 py-4">
                                    {product.title}
                                </td>
                                <td className="px-6 py-4">
                                    <img className='w-[60px] h-[60px] overflow-hidden  duration-300' src={product.image} />
                                </td>
                                <td className="px-6 py-4">
                                    {product.category}
                                </td>
                                <td className="px-6 py-4">
                                    ${product.price}
                                </td>
                                <td className="px-6 py-4 flex justify-between items-center mt-4">
                                    <Link to={`/Admin/editProduct/${product.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                                    <button
                                        onClick={() => handleDeleteProduct(product.key)}
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
    )
}

export default ProductAdmin;