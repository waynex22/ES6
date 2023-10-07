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
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };
  return (
    <div className='container mx-auto py-8'>
      <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-4xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Add</span> Product</h1>
      <form onSubmit={handleSubmit} className='mb-8'>
      <div class="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
          <div class="w-full">
            <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name Product</label>
            <input type='text'
              id='title'
              name='title'
              value={products.title}
              onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Product name" required="" />
          </div>
          <div class="w-full">
            <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
            <input type='text'
              id='price'
              name='price'
              value={products.price}
              onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$299" required="" />
          </div>
          <div>
            <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
            <select id='category'
              name='category'
              value={products.category}
              onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
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
            <label for="item-weight" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image</label>
            <input type='text'
              id='image'
              name='image'
              value={products.image}
              onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="URL Image" required="" />
          </div>
          <div class="sm:col-span-2">
            <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
            <textarea id='description'
              name='description'
              value={products.description}
              onChange={handleChange} rows="8" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Write a product description here..."></textarea>
          </div>
        </div>
        <button type='sumit' class="px-5 py-2.5 relative rounded group text-white font-medium inline-block">
          <span class="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-mint to-blue-500"></span>
          <span class="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-mint to-blue-500"></span>
          <span class="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-mint to-blue-500"></span>
          <span class="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-mint from-blue-500"></span>
          <span class="relative">Add Product</span>
        </button>
      </form>
      <Link to='/ProductAdmin'class="px-5 py-2.5 relative rounded group text-white font-medium inline-block">
      <span class="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-mint to-blue-500"></span>
          <span class="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-mint to-blue-500"></span>
          <span class="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-mint to-blue-500"></span>
          <span class="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-mint from-blue-500"></span>
          <span class="relative">Back to dashBoardt</span>
      </Link>
    </div>

  );
};

export default AddProduct;
