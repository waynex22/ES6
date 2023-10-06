import React from 'react';
import ReactPlayer from 'react-player';
import  videobg  from '../img/videobg.mp4';

const Slider = () => {
  return (
    <div className='relative w-[60%] h-[500px] mx-auto mt-10 flex justify-center items-center'>
      <ReactPlayer
        url={videobg} 
        width='100%'
        height='100%'
        playing={true}
        controls
        muted
        loop
      />
      <div className='absolute mb-10 w-full h-full flex justify-center items-center'>
        <p className=' mx-auto mb-20 font-semibold text-[34px] bg-gradient-to-r  from-white to-blue-500 bg-clip-text text-transparent'>Update News Product</p>
      </div>
      <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center'>
        <button className='bg-white py-2 px-4 mx-2 rounded-lg'>
          <a href='/link1' className='text-black'>
            Fanpage
          </a>
        </button>
        <button className='bg-transparent border text-white hover:bg-white hover:text-black border-white py-2 px-4 mx-2 rounded-lg'>
          <a href='/link2'>Instagram</a>
        </button>
      </div>
    </div>
  );
};

export default Slider;
