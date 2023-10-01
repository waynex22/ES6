import {  useEffect, useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { ref,remove, onValue } from 'firebase/database';
import { database } from '../../firebase';
import 'firebase/database';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [productId, setProductID] = useState([]);
  useEffect(() => {
    const productRef = ref(database, 'products/');
    onValue(productRef , (snapshot) => {
      const dataProducts = snapshot.val();
      const productsArray = Object.values(dataProducts);
      setProducts(productsArray)
      const idArray = Object.keys(dataProducts).map((key) => ({
        id: key,
        ...products[key],
      }))
      setProductID(idArray)
    })
  }, []);
  // console.log(productId)
  const handleDeleteProduct = (id) => {
    const productIndex = products.findIndex(item => {
      return item.id === parseInt(id);
    });
      const key = productId[productIndex];
      const keyId = key.id;
    const confirmDelete = window.confirm('Are you sure you want to delete this product?  ' + id);
    if (confirmDelete) {
        const productRef = ref(database, `products/` + keyId );
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
    return (
        <div className='container mx-auto py-8'>
            <div className='mb-8'>
                <Link to='/admin/addproduct' className='bg-mint hover:bg-mints text-white font-semibold py-2 px-6 rounded-full shadow-md'>
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
                                onClick={() => handleDeleteProduct(product.id)}
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

export default Products;