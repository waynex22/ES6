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
          <Link to='/Storecatalog' className='self-start uppercase font-semibold border-b-2 border-black text-white'>
            View More
          </Link>
      </div>
      <div className='hidden lg:block'>
        <img src='' alt='' />
      </div>
    </div>
  </section>);
};

export default Hero;
