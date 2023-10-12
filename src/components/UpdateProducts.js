import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { database } from '../firebase';
import { ref, update, get } from "firebase/database";
import { CategoryContext } from '../contexts/CategoryContext';

const UpdateProduct = () => {
  const [isSuccessPopupVisible, setIsSuccessPopupVisible] = useState(false);
  const { categorys } = useContext(CategoryContext);
  const [productWithKey, setProductWithKey] = useState(null);
  const { id } = useParams();
  // console.log(id)
  const [products, setProducts] = useState({
    id: 0,
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
        setIsSuccessPopupVisible(true);

        setTimeout(() => {
          setIsSuccessPopupVisible(false);
        }, 1000);
        console.log('Product updated successfully');
      } else {
        console.error('Product with key not found');
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
  return (
    <div className='container mx-auto py-8 relative'>
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-4xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Edit</span> Products</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
          <div className="sm:col-span-2">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID</label>
            <input type='text'
              id='id'
              name='id'
              value={products.id} disabled
              onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required="" />
          </div>
          <div className="w-full">
            <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name Product</label>
            <input type='text'
              id='title'
              name='title'
              value={products.title}
              onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Product brand" required="" />
          </div>
          <div className="w-full">
            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
            <input type='text'
              id='price'
              name='price'
              value={products.price}
              onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$299" required="" />
          </div>
          <div>
            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
            <select id='category'
              name='category'
              value={products.category}
              onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
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
          <div>
            <label htmlFor="item-weight" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image</label>
            <input type='text'
              id='image'
              name='image'
              value={products.image}
              onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ex. 12" required="" />
            <img src={products.image} className='h-[200px] w-[160px] mb-4' />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
            <textarea id='description'
              name='description'
              value={products.description}
              onChange={handleChange} rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Write a product description here..."></textarea>
          </div>
        </div>
        <button type='sumit' className="px-5 py-2.5 relative rounded group text-white font-medium inline-block">
          <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-mint to-blue-500"></span>
          <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-mint to-blue-500"></span>
          <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-mint to-blue-500"></span>
          <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-mint from-blue-500"></span>
          <span className="relative">Update</span>
        </button>
      </form>
      {isSuccessPopupVisible && (
        <div className="p-4 mb-4 text-sm text-white absolute top-0 mx-auto rounded-lg bg-green-600 dark:bg-gray-800 dark:text-green-400" role="alert">
          <span className="font-medium">Update Success</span>
        </div>
      )}
    </div>

  );


};

export default UpdateProduct;