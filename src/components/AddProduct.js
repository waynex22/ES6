import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { database } from '../firebase';
import { useContext } from 'react';
import { ref, push, get } from 'firebase/database';
import { CategoryContext } from '../contexts/CategoryContext';
import { AdminContext } from '../contexts/AdminContext';
const AddProduct = () => {
  const { addProduct } = useContext(AdminContext)
  const { categorys } = useContext(CategoryContext);
  const [products, setProducts] = useState({
    title: '',
    category: '',
    price: '',
    image: '',
    description: '',
  });
  const [lastProductId, setLastProductId] = useState(0);
  useEffect(() => {
    const productRef = ref(database, 'products/');
    
    get(productRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const productsArray = [];
          snapshot.forEach((childSnapshot) => {
            const product = {
              id: childSnapshot.key,
              ...childSnapshot.val(),
            };
            productsArray.push(product);
          });
          // console.log(productsArray)
          // Set the productsArray as the initial state for products
          if (products.length === 0) {
            setProducts(productsArray);
          }

          // Find the last product's ID
          const lastIndex = productsArray.length - 1;
          const lastProduct = productsArray[lastIndex];
          setLastProductId(lastProduct.id);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [products.length]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducts({
      ...products,
      [name]: value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productRef = ref(database, 'products');
      const newProductId = lastProductId + 1;

      const newProduct = {
        id: newProductId,
        ...products,
      };

      // Update the state with the new product
      setProducts((prevProducts) => [...prevProducts, newProduct]);

      // Push the new product to the database
      addProduct(newProduct);
      setProducts({
        title: '',
        category: '',
        price: '',
        image: '',
        description: '',
      });
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1000);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };
  return (
    <div className='container mx-auto py-8'>
      <form onSubmit={handleSubmit} className='mb-8'>
        <div className='mb-4'>
          <label htmlFor='title' className='block text-gray-700 font-bold mb-2'>
            Product Name
          </label>
          <input
            type='text'
            id='name'
            name='title'
            value={products.title}
            onChange={handleChange}
            className='border rounded-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-300 w-full'
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='price' className='block text-gray-700 font-bold mb-2'>
            Price
          </label>
          <input
            type='text'
            id='price'
            name='price'
            onChange={handleChange}
            className='border rounded-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-300 w-full'
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='image' className='block text-gray-700 font-bold mb-2'>
            Image URL
          </label>
          <input
            type='text'
            id='image'
            name='image'
            value={products.image}
            onChange={handleChange}
            className='border rounded-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-300 w-full'
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='category'
            className='block text-gray-700 font-bold mb-2'
          >
            Category
          </label>
          <select
            id='category'
            name='category'
            value={products.category}
            onChange={handleChange}
            className='border rounded-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-300 w-full'
            required
          >
            <option value='' disabled>
              Select a category
            </option>
            {categorys.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className='mb-4'>
          <label
            htmlFor='description'
            className='block text-gray-700 font-bold mb-2'
          >
            Description
          </label>
          <textarea
            id='description'
            name='description'
            value={products.description}
            onChange={handleChange}
            className='border rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-300 w-full h-24 resize-none'
          />
        </div>
        <button
          type='submit'
          className='bg-mint hover:bg-mints text-white font-semibold py-2 px-6 rounded-full shadow-md'
        >
          Add Product
        </button>
      </form>
      <Link to='/admin/products' className='bg-mint hover:bg-mints text-white font-semibold py-2 px-6 rounded-full shadow-md'>
        Back
      </Link>
    </div>

  );
};

export default AddProduct;
