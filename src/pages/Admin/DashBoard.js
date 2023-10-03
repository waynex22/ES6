import React from 'react';
import BarChart from '../../components/Chart';


const DashBoard = () => {
    return (
        <div className='w-full h-full'>
            <div className='bg-white shadow-lg p-4 rounded-md'>
                <h1 className='text-[30px] font-semibold bg-gradient-to-r from-mints to-blue-600  bg-clip-text text-transparent text-center'>Dashboard</h1>
            </div>

            <div className='container mx-auto mt-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>

                    <div className='bg-white p-4 shadow-md rounded-md'>
                        <h2 className='text-xl font-semibold bg-gradient-to-r from-mints to-blue-600  bg-clip-text text-transparent'>User Statistics</h2>
                        <p className=' mt-2 bg-gradient-to-r from-mints to-blue-600  bg-clip-text text-transparent'>Total Users: 1000</p>
                        <p className=' bg-gradient-to-r from-mints to-blue-600  bg-clip-text text-transparent'>Active Users: 800</p>
                    </div>


                    <div className='bg-white p-4 shadow-md rounded-md '>
                        <h2 className='text-xl font-semibold bg-gradient-to-r from-mints to-blue-600  bg-clip-text text-transparent'>Sales Data</h2>
                        <p className=' mt-2 bg-gradient-to-r from-mints to-blue-600  bg-clip-text text-transparent'>Total Sales: $50,000</p>
                        <p className=' bg-gradient-to-r from-mints to-blue-600  bg-clip-text text-transparent'>Last Month: $10,000</p>
                    </div>


                    <div className='bg-white p-4 shadow-md rounded-md'>
                        <h2 className='text-xl font-semibold bg-gradient-to-r from-mints to-blue-600  bg-clip-text text-transparent'>Recent Activity</h2>
                        <ul className='mt-2'>
                            <li className=' bg-gradient-to-r from-mints to-blue-600  bg-clip-text text-transparent'>User registration</li>
                            <li className=' bg-gradient-to-r from-mints to-blue-600  bg-clip-text text-transparent'>New orders placed</li>
                            <li className=' bg-gradient-to-r from-mints to-blue-600  bg-clip-text text-transparent'>Product updates</li>
                        </ul>
                    </div>
                </div>
                <div className='flex flex-row mx-auto mt-10'>
                <BarChart />
                <BarChart />
                <BarChart />
                </div>
            </div>
        </div>
    )
}

export default DashBoard;