import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import { ref, push, get } from 'firebase/database';
import { database } from '../../firebase'; // Import Firebase
import 'firebase/database';

const AddCategory = () => {
  const [category, setCategory] = useState({
    name: ''
  });
  const [lastCategoryId, setLastCategoryId] = useState(0);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({
      ...category,
      [name]: value,
    });
  };


  useEffect(() => {
    const categoryRef = ref(database, 'categorys/');

    get(categoryRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const categorysArray = [];
          snapshot.forEach((childSnapshot) => {
            const category = {
              id: childSnapshot.key,
              ...childSnapshot.val(),
            };
            categorysArray.push(category);
          });
          if (category.length === 0) {
            setCategory(categorysArray);
          }
          const lastIndex = categorysArray.length - 1;
          const lastCategory = categorysArray[lastIndex];
          setLastCategoryId(lastCategory.id);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [category.length]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       const categoryRef = ref(database, 'categorys');
       const newcategoryId = lastCategoryId + 1;
       const newCategory = {
        id: newcategoryId,
        ...category,
      };
      setCategory((prevCategory) => [...prevCategory, newCategory]);

      await push(categoryRef, newCategory);
      console.log('category data:', category);
      setCategory({
        name: ''
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
      <form onSubmit={handleSubmit} className='mb-8'>
        <div className='mb-4'>
          <label htmlFor='name' className='block text-gray-700 font-bold mb-2'>
            Category Name
          </label>
          <input
            type='text'
            id='name'
            name='name'
            value={category.name}
            onChange={handleChange}
            className='border rounded-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-300 w-full'
            required
          />
        </div>
        <button
          type='submit'
          className='bg-mint mr-5 hover:bg-mints text-white font-semibold py-2 px-6 rounded-full shadow-md'>
          Add Category
        </button>
        <Link to='/admin/category' className='bg-mint hover:bg-mints text-white font-semibold py-2 px-6 rounded-full shadow-md'>
        Back
      </Link>
      </form>
    </div>
  );
};

export default AddCategory;
