import React, { useState , useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { database } from '../../firebase';
import { useContext } from 'react';
import { ref, child, push, update, get } from "firebase/database";
import { ProductContext } from '../../contexts/ProductContext';
import { CategoryContext } from '../../contexts/CategoryContext';

const UpdateProduct = () => {
    const {id} = useParams();
    console.log(id)
    const [products, setProducts] = useState({
        title: '',
        category: '',
        price: '',
        image: '',
        description: '',
      });
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
                // console.log(product)
              });
              const products = productsArray.find(item => {
                return item.id === parseInt(id); 
              });
              setProducts(products);
          }})
          .catch((error) => {
            console.error(error);
          });
      }, []);
//    console.log(products)
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

      // Update the state with the new product
      setProducts((prevProducts) => [...prevProducts]);

      // Push the new product to the database
      await push(productRef);
      console.log('Product added successfully');

      setProducts({
        title: '',
        category: '',
        price: '',
        image: '',
        description: '',
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };
    return (
            <div  className='container mx-auto py-8'> 
            <p className='text-2xl bg-mints text-white text-mint mb-10 font-semibold py-2 px-6 rounded-full shadow-md text-center '>Edit Product</p>
            <form onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label htmlFor='id' className='block text-gray-600 font-medium'>
                  ID
                </label>
                <input
                  type='text'
                  id='id'
                  name='id'
                  value={products.id}
                  onChange={handleChange}
                  className='w-full  px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400'
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='title' className='block text-gray-600 font-medium'>
                  Title
                </label>
                <input
                  type='text'
                  id='title'
                  name='title'
                  value={products.title}
                  onChange={handleChange}
                  className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400'
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='price' className='block text-gray-600 font-medium'>
                  Price
                </label>
                <input
                  type='text'
                  id='price'
                  name='price'
                  value={products.price}
                  onChange={handleChange}
                  className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400'
                />
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='description'
                  className='block text-gray-600 font-medium'
                >
                  Description
                </label>
                <textarea
                  id='description'
                  name='description'
                  value={products.description}
                  onChange={handleChange}
                  className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400'
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='image' className='block text-gray-600 font-medium'>
                  Image URL
                </label>
                <img src={products.image} className='h-[200px] w-[160px] mb-4'/>
                <input
                  type='text'
                  id='image'
                  name='image'
                  value={products.image}
                  onChange={handleChange}
                  className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400'
                />
              </div>
              <button
                type='submit'
                className='bg-mint hover:bg-mints text-white font-semibold py-2 px-6 rounded-full shadow-md'
              >
                Update
              </button>
            </form>
          </div>
        
    );


};

export default UpdateProduct;
