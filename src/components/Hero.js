import React from 'react';
//  image slide

//  Link
import { Link } from 'react-router-dom';
const Hero = () => {
  return (
    <section className='bg-mint h-[800px] bg-hero bg-no-repeat bg-cover bg-center py-24 '>
      <div className='container mx-auto flex justify-around h-full'>
        <div className='flex flex-col'>
          <div className='font-semibold flex items-center uppercase'>
            <div className='w-10 h-[2px] bg-black mr3'></div><p className='text-white'>New Trend</p>
          </div>
          <h1 className='text-[99px] leading-[1.1] font-light mb-4 uppercase bg-gradient-to-r  from-mints to-white  bg-clip-text text-transparent'>Vietnam Style<br />
            <span className=' text-[180px] font-semibold'>
              2023
            </span>
          </h1>
          <div className='flex px-auto'>
          <Link to='/shop' className='relative mr-6 inline-flex items-center justify-center p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-white'>
              <span className='absolute inset-0 w-full h-full bg-gradient-to-br from-blue-400 via-mint to-mints'></span>
              <span className='absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-white rounded-full opacity-30 group-hover:rotate-90 ease'></span>
              <span className='relative text-white'>Shop Now</span>
            </Link>
            <Link to='/shop' className='relative mr-6 inline-flex items-center justify-center p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-white'>
              <span className='absolute inset-0 w-full h-full bg-gradient-to-br from-blue-400 via-mint to-mints'></span>
              <span className='absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-white rounded-full opacity-30 group-hover:rotate-90 ease'></span>
              <span className='relative text-white'>View More</span>
            </Link>
          </div>
        </div>
        <div className='hidden lg:block'>
          <img src='' alt='' />
        </div>
      </div>
    </section>);
};

export default Hero;
