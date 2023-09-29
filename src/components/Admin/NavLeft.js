import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '/./source/asg/src/img/logo.png'
import { FaChartBar, FaUsers, FaBox } from 'react-icons/fa'; // Import icons as needed
const NavLeft = () => {
  return (
    <div className='min-h-screen bg-gray-100 flex'>
      {/* Sidebar */}
      <div className='bg-white w-64 p-4 shadow-lg'>
        {/* Logo */}
        <Link to='/' className='text-2xl font-bold mb-8 text-center'>
        <img src={Logo} class='h-20 mr-3' alt='Zics Store Logo' />
        </Link>

        {/* Navigation links */}
        <ul className='space-y-4'>
          <li>
            <Link to='/admin' className='flex items-center p-2  bg-gradient-to-r  from-mints to-blue-600  bg-clip-text text-transparent'>
              <FaChartBar className='mr-2 text-mint' />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to='/admin/orders' className='flex items-center p-2  bg-gradient-to-r  from-mints to-blue-600  bg-clip-text text-transparent'>
              <FaUsers className='mr-2 text-mint' />
              Orders
            </Link>
          </li>
          <li>
            <Link to='/admin/category' className='flex items-center p-2  bg-gradient-to-r  from-mints to-blue-600  bg-clip-text text-transparent'>
              <FaUsers className='mr-2 text-mint' />
              Category
            </Link>
          </li>
          <li>
            <Link to='/admin/products' className='flex items-center p-2  bg-gradient-to-r from-mints to-blue-600  bg-clip-text text-transparent'>
              <FaBox className='mr-2 text-mint' />
              Products
            </Link>
          </li>
          <li>
            <Link to='/admin/products' className='flex items-center p-2  bg-gradient-to-r from-mints to-blue-600  bg-clip-text text-transparent'>
              <FaBox className='mr-2 text-mint' />
              Chart
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavLeft;
