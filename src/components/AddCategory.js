import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { ref, push } from 'firebase/database';
import { database } from '../firebase';
import 'firebase/database';
import { AdminContext } from '../contexts/AdminContext';

const AddCategory = () => {
  const history = useNavigate();
  const {categorys} = useContext(AdminContext)
  const [category, setCategory] = useState({
    name: ''
  });
  const [id, setId] = useState(0);
  useEffect(() => {
    if(categorys === 0 ) {
      setId(1);
    }else {
      const index = categorys.length - 1;
      const lastCategory = categorys[index];
      setId(lastCategory ? lastCategory.id : 1);
    }
  },[categorys])
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({
      ...category,
      [name]: value,
    });
  };
  // console.log(categorys)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const categoryRef = ref(database, 'categorys');
      const newcategoryId = id + 1;
      const newCategory = {
        id: newcategoryId,
        ...category,
      };
      await push(categoryRef, newCategory);
      console.log('category data:', category);
      setCategory({
        name: ''
      });
     history('/Admin/Categories')
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };
  return (  
    <div className='container mx-auto py-8'>
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-4xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Add</span> Category</h1>
      <form onSubmit={handleSubmit} className='mb-8 mt-10'>
        <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
          <div className="w-full">
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
            <input type='text'
              id='name'
              name='name'
              value={category.name}
              onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Category name" required="" />
          </div>
        </div>
        <button type='sumit' className="px-5 py-2.5 relative rounded group text-white font-medium inline-block">
          <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-mint to-blue-500"></span>
          <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-mint to-blue-500"></span>
          <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-mint to-blue-500"></span>
          <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-mint from-blue-500"></span>
          <span className="relative">Add Category</span>
        </button>
      </form>
      <Link to='/Admin/Categories'className="px-5 py-2.5 relative rounded group text-white font-medium inline-block">
      <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-mint to-blue-500"></span>
          <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-mint to-blue-500"></span>
          <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-mint to-blue-500"></span>
          <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-mint from-blue-500"></span>
          <span className="relative">Back to dashBoard</span>
      </Link>
    </div>
  );
};

export default AddCategory;
