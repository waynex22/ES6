import React from 'react';
import Statistics from '../../components/Statistics';

const DashBoard = () => {
    return (
        <div className='w-full h-full'>
            <div className='bg-white shadow-lg p-4 rounded-md'>
                <h1 className='text-[30px] font-semibold bg-gradient-to-r from-mints to-blue-600  bg-clip-text text-transparent text-center'>Dashboard</h1>
            </div>
            <div className='container mx-auto mt-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                <Statistics />
                </div>
                <div className='flex flex-row mx-auto mt-10'>
                </div>
            </div>
        </div>
    )
}

export default DashBoard;