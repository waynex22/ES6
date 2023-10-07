import React from 'react';
// logo img
import logo from '../img/logo.png'
// Link
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
      <footer className='bg-white rounded-lg shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] dark:bg-gray-900 m-4 mt-auto '>
          <div className='w-full max-w-screen-xl mx-auto p-4 md:py-8'>
              <div className='sm:flex sm:items-center sm:justify-between'>
                  <Link  to='/' className='flex items-center mb-4 sm:mb-0'>
                      <img src={logo} className='h-20 mr-3' alt='Zics Store Logo' />
                  </Link>
                  <ul className='flex flex-wrap items-center mb-6 text-sm font-medium bg-gradient-to-r  from-black to-blue-500 bg-clip-text text-transparent'>
                      <li>
                          <Link to='/' className='mr-4 hover:underline md:mr-6 '>About</Link>
                      </li>
                      <li>
                          <Link to='/' className='mr-4 hover:underline md:mr-6'>Privacy Policy</Link>
                      </li>
                      <li>
                          <Link to='/' className='mr-4 hover:underline md:mr-6 '>Licensing</Link>
                      </li>
                      <li>
                          <Link to='/' className='hover:underline'>Contact</Link>
                      </li>
                  </ul>
              </div>
              <hr className='my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8' />
              <span className='block text-sm sm:text-center bg-gradient-to-r  from-black to-blue-500 bg-clip-text text-transparent'>© 2023 <a href='https://www.facebook.com/gol.dw2012' className='hover:underline'>Wayne</a>. All Rights Reserved.</span>
          </div>
      </footer>
);
};

export default Footer;
