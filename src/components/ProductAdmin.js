import {  Component , useContext, useEffect, useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { ref,remove} from 'firebase/database';
import { database } from '../firebase';
import 'firebase/database';
import LoadingSpinner from '../components/PreLoad';
import { AdminContext } from '../contexts/AdminContext';
const ProductAdmin  =  () => {
  const { products } = useContext(AdminContext)
  const handleDeleteProduct = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?  ' + id);
    if (confirmDelete) {
        const productRef = ref(database, `products/` + id );
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
  if(products.length === 0){
    return <div className='flex justify-center items-center mx-auto'>
      <LoadingSpinner />
    </div>
  }
    return (
        <div className='container mx-auto py-8'>
            <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-4xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Products</span> Mananger</h1>

            <div className='mb-8'>
                <Link to='/Addproduct' className='bg-mint hover:bg-mints text-white font-semibold py-2 px-6 rounded-full shadow-md'>
                    Add Product
                </Link>
            </div>

            <table className='min-w-full bg-white rounded-lg shadow-md overflow-hidden text-center'>
                <thead className='bg-mint text-white'>
                    <tr>
                        <th className='px-1 py-2'>Id</th>
                        <th className='px-6 py-4'>Product Name</th>
                        <th className='px-6 py-4'>Image</th>
                        <th className='px-6 py-4'>Price</th>
                        <th className='px-6 py-4'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id} className='hover:cursor-auto'>
                            <td className='border px-2 py-4'>{product.id}</td>
                            <td className='border px-6 py-4'>{product.title}</td>
                            <td className='border px-6 py-4 flex'>
                                <img className='w-[50px] h-[60px] mx-auto overflow-hidden flex items-center justify-center duration-300'
                                    src={product.image}
                                    alt=''
                                />
                            </td>
                            <td className='border px-6 py-4'>{`$${product.price}`}</td>
                            <td className='border px-6 py-4'>
                                <Link to={`/updateproduct/${product.id}`} className='bg-yellow-500 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded-full mr-2 shadow-md'>
                                    Edit
                                </Link>
                                <button
                                onClick={() => handleDeleteProduct(product.key)}
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
    )
}

export default ProductAdmin;