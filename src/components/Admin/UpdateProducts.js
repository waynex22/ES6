import React, { useState , useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { database } from '../../firebase';
import { ref, push, update, get } from "firebase/database";
import { CategoryContext } from '../../contexts/CategoryContext';

const UpdateProduct = () => {
    const {categorys} = useContext(CategoryContext);
    const [productWithKey, setProductWithKey] = useState(null);
    const {id} = useParams();
    // console.log(id)
    const [products, setProducts] = useState({
        id:0,
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
              const keysArray = [];
              snapshot.forEach((childSnapshot) => {
                const product = {
                  id: childSnapshot.key,
                  ...childSnapshot.val(),
                };
                productsArray.push(product);
                keysArray.push(childSnapshot.key);
              });
              const productIndex = productsArray.findIndex(item => {
                return item.id === parseInt(id);
              });
      
              if (productIndex !== -1) {
                const products = productsArray[productIndex];
                const key = keysArray[productIndex];
                setProductWithKey({ products, key });
                setProducts(products)
              } else {
                console.log('deo thay');
              }
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }, [id]);
//    console.log(products)
// console.log(productWithKey)
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
      if (productWithKey) {
        const { key } = productWithKey;
        const productRef = ref(database, 'products/' + key);
        const updatedProduct = {
          id: products.id,
          title: products.title,
          category: products.category,
          price: products.price,
          image: products.image,
          description: products.description,
        };
        await update(productRef, updatedProduct);
        console.log('Product updated successfully');
        // setTimeout(() => {
        //   window.location.reload();
        // }, 1000);
      } else {
        console.error('Product with key not found');
      }
    } catch (error) {
      console.error('Error updating product:', error);
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
                  value={products.id} disabled
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
